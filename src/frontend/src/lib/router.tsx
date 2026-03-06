/**
 * React Router DOM compatibility shim using native browser APIs + React.
 * This replaces the react-router-dom dependency which is not in package.json.
 */

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface RouteContextValue {
  pathname: string;
  navigate: (to: string, opts?: { replace?: boolean }) => void;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const RouteContext = createContext<RouteContextValue>({
  pathname: "/",
  navigate: () => {},
});

// ─── BrowserRouter ────────────────────────────────────────────────────────────

export function BrowserRouter({ children }: { children: ReactNode }) {
  const [pathname, setPathname] = useState(() => window.location.pathname);

  useEffect(() => {
    const handler = () => setPathname(window.location.pathname);
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, []);

  const navigate = useCallback((to: string, opts?: { replace?: boolean }) => {
    if (opts?.replace) {
      window.history.replaceState(null, "", to);
    } else {
      window.history.pushState(null, "", to);
    }
    // Scroll to top instantly on every navigation so users always start at top
    window.scrollTo({ top: 0, behavior: "instant" });
    setPathname(to.split("?")[0]);
    window.dispatchEvent(new PopStateEvent("popstate"));
  }, []);

  return (
    <RouteContext.Provider value={{ pathname, navigate }}>
      {children}
    </RouteContext.Provider>
  );
}

// ─── Routes & Route ───────────────────────────────────────────────────────────

interface RouteProps {
  path: string;
  element: ReactNode;
}

interface RoutesProps {
  children: ReactNode;
}

export function Routes({ children }: RoutesProps) {
  const { pathname } = useContext(RouteContext);

  // Collect all Route children
  const routes: RouteProps[] = [];
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child) && child.props) {
      const props = child.props as RouteProps;
      if (props.path !== undefined) {
        routes.push(props);
      }
    }
  });

  // Find matching route — support wildcard "/*"
  for (const route of routes) {
    const pattern = route.path;
    if (pattern === "/*" || pattern === "*") {
      return <>{route.element}</>;
    }
    if (matchPath(pattern, pathname)) {
      return <>{route.element}</>;
    }
  }
  return null;
}

export function Route(_props: RouteProps) {
  // Route is consumed by Routes — it renders nothing on its own
  return null;
}

function matchPath(pattern: string, pathname: string): boolean {
  if (pattern === pathname) return true;
  if (pattern.endsWith("/*")) {
    const base = pattern.slice(0, -2);
    return pathname === base || pathname.startsWith(`${base}/`);
  }
  return false;
}

// ─── Link ─────────────────────────────────────────────────────────────────────

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  children?: ReactNode;
  replace?: boolean;
}

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ to, children, replace, onClick, ...rest }, ref) => {
    const { navigate } = useContext(RouteContext);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (onClick) onClick(e);
      if (e.defaultPrevented) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      // External links
      if (to.startsWith("http://") || to.startsWith("https://")) return;
      e.preventDefault();
      navigate(to, { replace });
    };

    return (
      <a ref={ref} href={to} onClick={handleClick} {...rest}>
        {children}
      </a>
    );
  },
);
Link.displayName = "Link";

// ─── Hooks ────────────────────────────────────────────────────────────────────

export function useLocation() {
  const { pathname } = useContext(RouteContext);
  return {
    pathname,
    search: window.location.search,
    hash: window.location.hash,
  };
}

export function useNavigate() {
  const { navigate } = useContext(RouteContext);
  return navigate;
}

export function useSearchParams(): [
  URLSearchParams,
  (
    updater: URLSearchParams | Record<string, string>,
    opts?: { replace?: boolean },
  ) => void,
] {
  const { navigate, pathname } = useContext(RouteContext);
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    const handler = () => forceUpdate((n) => n + 1);
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, []);

  const params = new URLSearchParams(window.location.search);

  const setParams = useCallback(
    (
      updater: URLSearchParams | Record<string, string>,
      opts?: { replace?: boolean },
    ) => {
      const newParams =
        updater instanceof URLSearchParams
          ? updater
          : new URLSearchParams(updater);
      const newUrl = `${pathname}?${newParams.toString()}`;
      navigate(newUrl, { replace: opts?.replace ?? false });
    },
    [navigate, pathname],
  );

  return [params, setParams];
}
