import { useTheme } from "@/contexts/ThemeContext";
import { useLiveImageSettings } from "@/hooks/useLiveImageSettings";
import { useLiveSiteSettings } from "@/hooks/useLiveSiteSettings";
import { Link, useLocation } from "@/lib/router";
import {
  ChevronRight,
  Cookie,
  Mail,
  Menu,
  Moon,
  Phone,
  Sun,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import logoImg from "/assets/cybin-logo.png";

interface CookieCategories {
  necessary: boolean;
  analytics: boolean;
  preferences: boolean;
  timestamp: string;
}

const navLinks = [
  { label: "Home", href: "/", ocid: "nav.home.link" },
  {
    label: "Payment Solutions",
    href: "/payment-solutions",
    ocid: "nav.payment_solutions.link",
  },
  { label: "Hardware", href: "/hardware", ocid: "nav.hardware.link" },
  { label: "Industries", href: "/industries", ocid: "nav.industries.link" },
  { label: "About", href: "/about", ocid: "nav.about.link" },
  { label: "Insights", href: "/insights", ocid: "nav.insights.link" },
  { label: "Contact", href: "/contact", ocid: "nav.contact.link" },
];

interface LayoutProps {
  children: React.ReactNode;
}

function ThemeToggle() {
  const { resolved, toggle } = useTheme();
  const isLight = resolved === "light";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      title={isLight ? "Switch to dark mode" : "Switch to light mode"}
      data-ocid="nav.theme.toggle"
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 34,
        height: 34,
        borderRadius: "8px",
        border: isLight
          ? "1px solid rgba(0,0,0,0.12)"
          : "1px solid rgba(255,255,255,0.1)",
        backgroundColor: isLight
          ? "rgba(0,0,0,0.06)"
          : "rgba(255,255,255,0.04)",
        color: isLight ? "#1a2040" : "rgba(232,237,248,0.6)",
        cursor: "pointer",
        flexShrink: 0,
        transition: "all 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "rgba(0,212,184,0.12)";
        e.currentTarget.style.borderColor = "rgba(0,212,184,0.35)";
        e.currentTarget.style.color = isLight ? "#007a6a" : "#00d4b8";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = isLight
          ? "rgba(0,0,0,0.06)"
          : "rgba(255,255,255,0.04)";
        e.currentTarget.style.borderColor = isLight
          ? "rgba(0,0,0,0.12)"
          : "rgba(255,255,255,0.1)";
        e.currentTarget.style.color = isLight
          ? "#1a2040"
          : "rgba(232,237,248,0.6)";
      }}
    >
      {isLight ? <Moon size={15} /> : <Sun size={15} />}
    </button>
  );
}

export default function Layout({ children }: LayoutProps) {
  const { style: logoStyle, config: logoCfg } = useLiveImageSettings("logo");
  const site = useLiveSiteSettings();
  const { resolved } = useTheme();
  const isLight = resolved === "light";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cookieConsent, setCookieConsent] = useState<CookieCategories | null>(
    () => {
      if (typeof window !== "undefined") {
        const raw = localStorage.getItem("cybin-cookie-consent");
        if (!raw) return null;
        try {
          return JSON.parse(raw) as CookieCategories;
        } catch {
          return null;
        }
      }
      return null;
    },
  );
  const [cookieAnalytics, setCookieAnalytics] = useState(false);
  const [cookiePreferences, setCookiePreferences] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleCookieSave = (analytics: boolean, preferences: boolean) => {
    const consent: CookieCategories = {
      necessary: true,
      analytics,
      preferences,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("cybin-cookie-consent", JSON.stringify(consent));
    setCookieConsent(consent);
  };

  const handleCookieSettingsReset = () => {
    localStorage.removeItem("cybin-cookie-consent");
    setCookieConsent(null);
    setCookieAnalytics(false);
    setCookiePreferences(false);
  };

  const currentYear = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  // Theme-aware color tokens
  const headerBg = isLight
    ? scrolled
      ? "rgba(248,249,252,0.97)"
      : "rgba(248,249,252,0.94)"
    : scrolled
      ? "rgba(10, 15, 30, 0.97)"
      : "rgba(10, 15, 30, 0.92)";
  const navLinkColor = isLight
    ? "rgba(20,30,60,0.7)"
    : "rgba(232, 237, 248, 0.75)";
  const navLinkHover = isLight ? "#0a1020" : "#e8edf8";
  const navLinkHoverBg = isLight
    ? "rgba(0,0,0,0.04)"
    : "rgba(255,255,255,0.05)";
  const activeNavBg = isLight
    ? "rgba(0,122,106,0.1)"
    : "rgba(0, 212, 184, 0.08)";
  const footerBg = isLight ? "#f0f2f7" : "#06090f";
  const footerText = isLight
    ? "rgba(20,30,60,0.55)"
    : "rgba(232, 237, 248, 0.55)";
  const footerHeading = isLight ? "#007a6a" : "#00d4b8";
  const footerDivider = isLight ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.06)";
  const footerCopyright = isLight
    ? "rgba(20,30,60,0.4)"
    : "rgba(232, 237, 248, 0.35)";
  const footerBorder = isLight
    ? "rgba(0,122,106,0.15)"
    : "rgba(0, 212, 184, 0.1)";
  const accentTeal = isLight ? "#007a6a" : "#00d4b8";
  const mobileIconColor = isLight ? "#1a2040" : "#e8edf8";
  const mobileIconBg = isLight ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.05)";

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: isLight ? "#f8f9fc" : "#0a0f1e" }}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] cybin-btn-primary text-sm"
        style={{ padding: "0.5rem 1rem" }}
      >
        Skip to main content
      </a>

      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: headerBg,
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: scrolled
            ? `1px solid ${isLight ? "rgba(0,122,106,0.15)" : "rgba(0, 212, 184, 0.12)"}`
            : "1px solid transparent",
          boxShadow: scrolled
            ? isLight
              ? "0 4px 32px rgba(0,0,0,0.08)"
              : "0 4px 32px rgba(0,0,0,0.5)"
            : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="flex items-center justify-between"
            style={{ height: "72px" }}
          >
            <Link
              to="/"
              className="flex-shrink-0"
              style={{
                display: "flex",
                alignItems: "center",
                background: "transparent",
                border: "none",
                boxShadow: "none",
                outline: "none",
              }}
            >
              <img
                src={logoImg}
                alt="Cybin Enterprises"
                loading="eager"
                // @ts-ignore fetchpriority is a valid HTML attribute
                fetchpriority="high"
                style={{
                  width: `${logoCfg.containerHeight}px`,
                  height: `${logoCfg.containerHeight}px`,
                  display: "block",
                  flexShrink: 0,
                  background: "transparent",
                  border: "none",
                  boxShadow: "none",
                  objectFit: "contain",
                  ...logoStyle,
                }}
              />
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  data-ocid={link.ocid}
                  className="px-3 py-2 text-sm font-medium rounded-md transition-all duration-200"
                  style={{
                    color:
                      location.pathname === link.href
                        ? accentTeal
                        : navLinkColor,
                    backgroundColor:
                      location.pathname === link.href
                        ? activeNavBg
                        : "transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (location.pathname !== link.href) {
                      e.currentTarget.style.color = navLinkHover;
                      e.currentTarget.style.backgroundColor = navLinkHoverBg;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (location.pathname !== link.href) {
                      e.currentTarget.style.color = navLinkColor;
                      e.currentTarget.style.backgroundColor = "transparent";
                    }
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Link
                to="/apply"
                data-ocid="nav.cta.button"
                className="hidden sm:inline-flex cybin-btn-primary text-sm"
                style={{ padding: "0.6rem 1.25rem" }}
              >
                Start Your Approval Process
                <ChevronRight size={14} />
              </Link>
              <button
                type="button"
                className="lg:hidden p-2 rounded-md"
                style={{
                  color: mobileIconColor,
                  backgroundColor: mobileIconBg,
                }}
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={
                  mobileOpen ? "Close navigation menu" : "Open navigation menu"
                }
                aria-expanded={mobileOpen}
                aria-controls="mobile-navigation"
                data-ocid="nav.mobile_menu.toggle"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {mobileOpen && (
          <div
            id="mobile-navigation"
            className="lg:hidden"
            style={{
              backgroundColor: isLight
                ? "rgba(248,249,252,0.99)"
                : "rgba(10, 15, 30, 0.98)",
              borderTop: `1px solid ${isLight ? "rgba(0,122,106,0.12)" : "rgba(0, 212, 184, 0.1)"}`,
            }}
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  data-ocid={link.ocid}
                  className="px-4 py-3 text-sm font-medium rounded-lg transition-all"
                  style={{
                    color:
                      location.pathname === link.href
                        ? accentTeal
                        : isLight
                          ? "#1a2040"
                          : "#e8edf8",
                    backgroundColor:
                      location.pathname === link.href
                        ? activeNavBg
                        : "transparent",
                  }}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/apply"
                data-ocid="nav.cta.button"
                className="mt-3 cybin-btn-primary text-sm justify-center"
              >
                Start Your Approval Process
              </Link>
            </div>
          </div>
        )}
      </header>

      <main id="main-content" className="flex-1 pt-[72px]">
        {children}
      </main>

      <footer
        style={{
          backgroundColor: footerBg,
          borderTop: `1px solid ${footerBorder}`,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
              <div
                style={{ background: "transparent", display: "inline-block" }}
              >
                <img
                  src={logoImg}
                  alt="Cybin Enterprises"
                  style={{
                    width: `${logoCfg.containerHeight}px`,
                    height: `${logoCfg.containerHeight}px`,
                    display: "block",
                    marginBottom: "12px",
                    background: "transparent",
                    border: "none",
                    boxShadow: "none",
                    ...logoStyle,
                  }}
                />
              </div>
              <p
                className="text-sm leading-relaxed"
                style={{ color: footerText, maxWidth: "260px" }}
              >
                Trusted payment solutions for high-risk and hard-to-place
                businesses.
              </p>
            </div>

            <div>
              <h4
                className="text-sm font-semibold mb-4"
                style={{
                  color: footerHeading,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                Resources
              </h4>
              <div className="flex flex-col gap-2">
                {[
                  ...navLinks,
                  { label: "FAQ", href: "/faq" },
                  { label: "Knowledge Base", href: "/knowledge" },
                  { label: "Partners", href: "/partners" },
                  { label: "Compliance", href: "/compliance" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="text-sm transition-colors"
                    style={{ color: footerText }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = accentTeal;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = footerText;
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h4
                className="text-sm font-semibold mb-4"
                style={{
                  color: footerHeading,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                Contact
              </h4>
              <div className="flex flex-col gap-3 mb-6">
                <a
                  href={`mailto:${site.contact.email}`}
                  className="flex items-center gap-2 text-sm transition-colors"
                  style={{ color: footerText }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = accentTeal;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = footerText;
                  }}
                >
                  <Mail size={13} style={{ flexShrink: 0 }} />
                  {site.contact.email}
                </a>
                {site.contact.phone2 && (
                  <a
                    href={`tel:${site.contact.phone2.replace(/\D/g, "")}`}
                    className="flex items-center gap-2 text-sm transition-colors"
                    style={{ color: footerText }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = accentTeal;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = footerText;
                    }}
                  >
                    <Phone size={13} style={{ flexShrink: 0 }} />
                    {site.contact.phone2Label}: {site.contact.phone2}
                  </a>
                )}
              </div>
              <h4
                className="text-sm font-semibold mb-3"
                style={{
                  color: footerHeading,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                Legal
              </h4>
              <div className="flex flex-col gap-2">
                {[
                  { label: "Privacy Policy", href: "/privacy-policy" },
                  { label: "Terms of Service", href: "/terms-of-service" },
                  { label: "Cookie Policy", href: "/cookie-policy" },
                  {
                    label: "Do Not Sell or Share My Info",
                    href: "/do-not-sell",
                  },
                  { label: "Accessibility Statement", href: "/accessibility" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="text-sm transition-colors"
                    style={{ color: footerText }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = accentTeal;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = footerText;
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div
            className="mt-10 pt-6"
            style={{ borderTop: `1px solid ${footerDivider}` }}
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <p
                className="text-xs text-center"
                style={{ color: footerCopyright }}
              >
                © {currentYear} Cybin Enterprises. All rights reserved. Built
                with ♥ using{" "}
                <a
                  href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: accentTeal }}
                >
                  caffeine.ai
                </a>
              </p>
              <span
                className="hidden sm:block text-xs"
                style={{
                  color: isLight
                    ? "rgba(20,30,60,0.2)"
                    : "rgba(232,237,248,0.2)",
                }}
              >
                ·
              </span>
              <button
                type="button"
                data-ocid="footer.cookie_settings.button"
                onClick={handleCookieSettingsReset}
                className="text-xs transition-colors"
                style={{
                  color: footerCopyright,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = accentTeal;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = footerCopyright;
                }}
              >
                Cookie Settings
              </button>
            </div>
          </div>
        </div>
      </footer>

      {cookieConsent === null && (
        <section
          aria-label="Cookie consent"
          data-ocid="cookie.toast"
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 60,
            background: "rgba(8, 12, 24, 0.98)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            borderTop: "1px solid rgba(0, 212, 184, 0.18)",
            boxShadow: "0 -8px 40px rgba(0, 0, 0, 0.6)",
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
            <div className="flex items-start gap-3 mb-4">
              <Cookie
                size={18}
                style={{ color: "#00d4b8", flexShrink: 0, marginTop: "2px" }}
              />
              <div className="flex-1">
                <p
                  className="text-sm font-semibold mb-1"
                  style={{ color: "#e8edf8" }}
                >
                  Your Privacy Choices
                </p>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "rgba(232, 237, 248, 0.6)" }}
                >
                  We use cookies to operate this site and, with your consent, to
                  analyze usage. Under GDPR and CCPA you have the right to
                  manage these choices.{" "}
                  <Link
                    to="/cookie-policy"
                    style={{ color: "#00d4b8", textDecoration: "underline" }}
                  >
                    Cookie Policy
                  </Link>
                  {" · "}
                  <Link
                    to="/do-not-sell"
                    style={{ color: "#00d4b8", textDecoration: "underline" }}
                  >
                    Do Not Sell My Info
                  </Link>
                </p>
              </div>
            </div>
            <div
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5 p-3 rounded-xl"
              style={{
                backgroundColor: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div
                className="flex items-start gap-3 p-3 rounded-lg"
                style={{ backgroundColor: "rgba(0,212,184,0.04)" }}
              >
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className="text-xs font-semibold"
                      style={{ color: "#e8edf8" }}
                    >
                      Necessary
                    </span>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{
                        backgroundColor: "rgba(0,212,184,0.15)",
                        color: "#00d4b8",
                      }}
                    >
                      Always On
                    </span>
                  </div>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: "rgba(232,237,248,0.5)" }}
                  >
                    Required for site functionality. Cannot be disabled.
                  </p>
                </div>
              </div>
              <div
                className="flex items-start gap-3 p-3 rounded-lg"
                style={{ backgroundColor: "rgba(255,255,255,0.02)" }}
              >
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className="text-xs font-semibold"
                      style={{ color: "#e8edf8" }}
                    >
                      Analytics
                    </span>
                    <button
                      type="button"
                      data-ocid="cookie.analytics.toggle"
                      role="switch"
                      aria-checked={cookieAnalytics}
                      onClick={() => setCookieAnalytics(!cookieAnalytics)}
                      style={{
                        width: "36px",
                        height: "20px",
                        borderRadius: "10px",
                        backgroundColor: cookieAnalytics
                          ? "#00d4b8"
                          : "rgba(255,255,255,0.15)",
                        position: "relative",
                        border: "none",
                        cursor: "pointer",
                        flexShrink: 0,
                        transition: "background-color 0.2s",
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          top: "2px",
                          left: cookieAnalytics ? "18px" : "2px",
                          width: "16px",
                          height: "16px",
                          borderRadius: "50%",
                          backgroundColor: "#fff",
                          transition: "left 0.2s",
                        }}
                      />
                    </button>
                  </div>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: "rgba(232,237,248,0.5)" }}
                  >
                    Privacy-first, device-local page analytics. Never shared
                    with third parties.
                  </p>
                </div>
              </div>
              <div
                className="flex items-start gap-3 p-3 rounded-lg"
                style={{ backgroundColor: "rgba(255,255,255,0.02)" }}
              >
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className="text-xs font-semibold"
                      style={{ color: "#e8edf8" }}
                    >
                      Preferences
                    </span>
                    <button
                      type="button"
                      data-ocid="cookie.preferences.toggle"
                      role="switch"
                      aria-checked={cookiePreferences}
                      onClick={() => setCookiePreferences(!cookiePreferences)}
                      style={{
                        width: "36px",
                        height: "20px",
                        borderRadius: "10px",
                        backgroundColor: cookiePreferences
                          ? "#00d4b8"
                          : "rgba(255,255,255,0.15)",
                        position: "relative",
                        border: "none",
                        cursor: "pointer",
                        flexShrink: 0,
                        transition: "background-color 0.2s",
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          top: "2px",
                          left: cookiePreferences ? "18px" : "2px",
                          width: "16px",
                          height: "16px",
                          borderRadius: "50%",
                          backgroundColor: "#fff",
                          transition: "left 0.2s",
                        }}
                      />
                    </button>
                  </div>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: "rgba(232,237,248,0.5)" }}
                  >
                    Stores your display preferences and wizard progress locally.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-end gap-3">
              <button
                type="button"
                data-ocid="cookie.necessary_only.button"
                onClick={() => handleCookieSave(false, false)}
                className="text-xs font-medium px-4 py-2 rounded-md w-full sm:w-auto transition-all"
                style={{
                  color: "rgba(232, 237, 248, 0.45)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  backgroundColor: "transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#e8edf8";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "rgba(232, 237, 248, 0.45)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                }}
              >
                Necessary Only
              </button>
              <button
                type="button"
                data-ocid="cookie.save_preferences.button"
                onClick={() =>
                  handleCookieSave(cookieAnalytics, cookiePreferences)
                }
                className="text-xs font-medium px-4 py-2 rounded-md w-full sm:w-auto transition-all"
                style={{
                  color: "#e8edf8",
                  border: "1px solid rgba(255,255,255,0.18)",
                  backgroundColor: "rgba(255,255,255,0.06)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(255,255,255,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(255,255,255,0.06)";
                }}
              >
                Save Preferences
              </button>
              <button
                type="button"
                data-ocid="cookie.accept_all.button"
                onClick={() => handleCookieSave(true, true)}
                className="cybin-btn-primary text-xs w-full sm:w-auto"
                style={{ padding: "0.5rem 1.25rem" }}
              >
                Accept All
              </button>
            </div>
            <p
              className="text-xs mt-3 text-center"
              style={{ color: "rgba(232,237,248,0.3)" }}
            >
              Notice at Collection (Cal. Civ. Code § 1798.100). Consent can be
              withdrawn at any time via “Cookie Settings” in the footer.
            </p>
          </div>
        </section>
      )}
    </div>
  );
}
