import { useLiveImageSettings } from "@/hooks/useLiveImageSettings";
import { useLiveSiteSettings } from "@/hooks/useLiveSiteSettings";
import { Link, useLocation } from "@/lib/router";
import { ChevronRight, Cookie, Mail, Menu, Phone, X } from "lucide-react";
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
  { label: "Industries", href: "/industries", ocid: "nav.industries.link" },
  {
    label: "Fraud Deflect",
    href: "/fraud-deflect",
    ocid: "nav.fraud_deflect.link",
  },
  { label: "About", href: "/about", ocid: "nav.about.link" },
  { label: "Insights", href: "/insights", ocid: "nav.insights.link" },
  { label: "Contact", href: "/contact", ocid: "nav.contact.link" },
];

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { style: logoStyle, config: logoCfg } = useLiveImageSettings("logo");
  const site = useLiveSiteSettings();
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

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "#0a0f1e" }}
    >
      {/* Skip to main content — accessible keyboard shortcut */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] cybin-btn-primary text-sm"
        style={{ padding: "0.5rem 1rem" }}
      >
        Skip to main content
      </a>

      {/* Header */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled
            ? "rgba(10, 15, 30, 0.97)"
            : "rgba(10, 15, 30, 0.92)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: scrolled
            ? "1px solid rgba(0, 212, 184, 0.12)"
            : "1px solid transparent",
          boxShadow: scrolled ? "0 4px 32px rgba(0, 0, 0, 0.5)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="flex items-center justify-between h-18"
            style={{ height: "72px" }}
          >
            {/* Logo */}
            <Link
              to="/"
              className="flex-shrink-0"
              style={{ display: "flex", alignItems: "center" }}
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
                  mixBlendMode: "screen",
                  ...logoStyle,
                }}
              />
            </Link>

            {/* Desktop Nav */}
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
                        ? "#00d4b8"
                        : "rgba(232, 237, 248, 0.75)",
                    backgroundColor:
                      location.pathname === link.href
                        ? "rgba(0, 212, 184, 0.08)"
                        : "transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (location.pathname !== link.href) {
                      e.currentTarget.style.color = "#e8edf8";
                      e.currentTarget.style.backgroundColor =
                        "rgba(255,255,255,0.05)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (location.pathname !== link.href) {
                      e.currentTarget.style.color = "rgba(232, 237, 248, 0.75)";
                      e.currentTarget.style.backgroundColor = "transparent";
                    }
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-3">
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
                  color: "#e8edf8",
                  backgroundColor: "rgba(255,255,255,0.05)",
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

        {/* Mobile Menu */}
        {mobileOpen && (
          <div
            id="mobile-navigation"
            className="lg:hidden"
            style={{
              backgroundColor: "rgba(10, 15, 30, 0.98)",
              borderTop: "1px solid rgba(0, 212, 184, 0.1)",
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
                      location.pathname === link.href ? "#00d4b8" : "#e8edf8",
                    backgroundColor:
                      location.pathname === link.href
                        ? "rgba(0, 212, 184, 0.08)"
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

      {/* Main content */}
      <main id="main-content" className="flex-1 pt-[72px]">
        {children}
      </main>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: "#06090f",
          borderTop: "1px solid rgba(0, 212, 184, 0.1)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Brand */}
            <div>
              <img
                src={logoImg}
                alt="Cybin Enterprises"
                style={{
                  width: `${logoCfg.containerHeight}px`,
                  height: `${logoCfg.containerHeight}px`,
                  display: "block",
                  marginBottom: "12px",
                  mixBlendMode: "screen",
                  ...logoStyle,
                }}
              />
              <p
                className="text-sm leading-relaxed"
                style={{
                  color: "rgba(232, 237, 248, 0.55)",
                  maxWidth: "260px",
                }}
              >
                Trusted payment solutions for high-risk and hard-to-place
                businesses.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h4
                className="text-sm font-semibold mb-4"
                style={{
                  color: "#00d4b8",
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
                    className="text-sm transition-colors hover:text-teal"
                    style={{ color: "rgba(232, 237, 248, 0.55)" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#00d4b8";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "rgba(232, 237, 248, 0.55)";
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact & Legal */}
            <div>
              <h4
                className="text-sm font-semibold mb-4"
                style={{
                  color: "#00d4b8",
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
                  style={{ color: "rgba(232, 237, 248, 0.55)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#00d4b8";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(232, 237, 248, 0.55)";
                  }}
                >
                  <Mail size={13} style={{ flexShrink: 0 }} />
                  {site.contact.email}
                </a>
                <a
                  href={`tel:${site.contact.phone1.replace(/\D/g, "")}`}
                  className="flex items-center gap-2 text-sm transition-colors"
                  style={{ color: "rgba(232, 237, 248, 0.55)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#00d4b8";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(232, 237, 248, 0.55)";
                  }}
                >
                  <Phone size={13} style={{ flexShrink: 0 }} />
                  {site.contact.phone1Label}: {site.contact.phone1}
                </a>
                <a
                  href={`tel:${site.contact.phone2.replace(/\D/g, "")}`}
                  className="flex items-center gap-2 text-sm transition-colors"
                  style={{ color: "rgba(232, 237, 248, 0.55)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#00d4b8";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(232, 237, 248, 0.55)";
                  }}
                >
                  <Phone size={13} style={{ flexShrink: 0 }} />
                  {site.contact.phone2Label}: {site.contact.phone2}
                </a>
              </div>
              <h4
                className="text-sm font-semibold mb-3"
                style={{
                  color: "#00d4b8",
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
                    style={{ color: "rgba(232, 237, 248, 0.55)" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#00d4b8";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "rgba(232, 237, 248, 0.55)";
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
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <p
                className="text-xs text-center"
                style={{ color: "rgba(232, 237, 248, 0.35)" }}
              >
                © {currentYear} Cybin Enterprises. All rights reserved. Built
                with ♥ using{" "}
                <a
                  href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#00d4b8" }}
                >
                  caffeine.ai
                </a>
              </p>
              <span
                className="hidden sm:block text-xs"
                style={{ color: "rgba(232,237,248,0.2)" }}
              >
                ·
              </span>
              <button
                type="button"
                data-ocid="footer.cookie_settings.button"
                onClick={handleCookieSettingsReset}
                className="text-xs transition-colors"
                style={{
                  color: "rgba(232, 237, 248, 0.35)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#00d4b8";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "rgba(232, 237, 248, 0.35)";
                }}
              >
                Cookie Settings
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Granular Cookie Consent Banner — GDPR/CCPA compliant */}
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
            {/* Header row */}
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

            {/* Cookie categories */}
            <div
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5 p-3 rounded-xl"
              style={{
                backgroundColor: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {/* Necessary — always on */}
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

              {/* Analytics — toggleable */}
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

              {/* Preferences — toggleable */}
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

            {/* Action buttons */}
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

            {/* Legal notice at collection */}
            <p
              className="text-xs mt-3 text-center"
              style={{ color: "rgba(232,237,248,0.3)" }}
            >
              Notice at Collection (Cal. Civ. Code § 1798.100). Consent can be
              withdrawn at any time via "Cookie Settings" in the footer.
            </p>
          </div>
        </section>
      )}
    </div>
  );
}
