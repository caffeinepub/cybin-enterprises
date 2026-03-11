import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type ThemeMode = "light" | "dark";
export type ResolvedTheme = "light" | "dark";

interface ThemeContextValue {
  mode: ThemeMode;
  resolved: ResolvedTheme;
  setMode: (mode: ThemeMode) => void;
  toggle: () => void;
  // Keep cycle for any legacy callers
  cycle: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  mode: "dark",
  resolved: "dark",
  setMode: () => {},
  toggle: () => {},
  cycle: () => {},
});

const STORAGE_KEY = "cybin-theme-mode";

function detectDefaultTheme(): ThemeMode {
  try {
    const stored = localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
    if (stored === "light" || stored === "dark") return stored;
  } catch {}
  if (typeof window !== "undefined") {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    if (prefersDark) return "dark";
    const prefersLight = window.matchMedia(
      "(prefers-color-scheme: light)",
    ).matches;
    if (prefersLight) return "light";
  }
  return "dark";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>(detectDefaultTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", mode);
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch {}
  }, [mode]);

  const setMode = useCallback((m: ThemeMode) => {
    setModeState(m);
  }, []);

  const toggle = useCallback(() => {
    setModeState((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  return (
    <ThemeContext.Provider
      value={{ mode, resolved: mode, setMode, toggle, cycle: toggle }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
