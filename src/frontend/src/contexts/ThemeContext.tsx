import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type ThemeMode = "auto" | "light" | "dark";
export type ResolvedTheme = "light" | "dark";

interface ThemeContextValue {
  mode: ThemeMode;
  resolved: ResolvedTheme;
  setMode: (mode: ThemeMode) => void;
  cycle: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  mode: "auto",
  resolved: "dark",
  setMode: () => {},
  cycle: () => {},
});

const STORAGE_KEY = "cybin-theme-mode";

function resolveTheme(mode: ThemeMode): ResolvedTheme {
  if (mode === "light") return "light";
  if (mode === "dark") return "dark";
  // Auto: check prefers-color-scheme first
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const prefersLight = window.matchMedia(
    "(prefers-color-scheme: light)",
  ).matches;
  if (prefersDark) return "dark";
  if (prefersLight) return "light";
  // Fallback: time of day (6am–8pm = light, 8pm–6am = dark)
  const hour = new Date().getHours();
  return hour >= 6 && hour < 20 ? "light" : "dark";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
      if (stored === "auto" || stored === "light" || stored === "dark")
        return stored;
    } catch {}
    return "dark";
  });

  const [resolved, setResolved] = useState<ResolvedTheme>(() =>
    resolveTheme(mode),
  );

  // Re-resolve on mode change or system preference change
  useEffect(() => {
    const update = () => {
      const r = resolveTheme(mode);
      setResolved(r);
      document.documentElement.setAttribute("data-theme", r);
    };
    update();

    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    mql.addEventListener("change", update);

    // For auto mode, also check time changes every minute
    let interval: ReturnType<typeof setInterval> | undefined;
    if (mode === "auto") {
      interval = setInterval(update, 60_000);
    }

    return () => {
      mql.removeEventListener("change", update);
      if (interval) clearInterval(interval);
    };
  }, [mode]);

  const setMode = useCallback((m: ThemeMode) => {
    setModeState(m);
    try {
      localStorage.setItem(STORAGE_KEY, m);
    } catch {}
  }, []);

  const cycle = useCallback(() => {
    setMode(mode === "auto" ? "light" : mode === "light" ? "dark" : "auto");
  }, [mode, setMode]);

  return (
    <ThemeContext.Provider value={{ mode, resolved, setMode, cycle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
