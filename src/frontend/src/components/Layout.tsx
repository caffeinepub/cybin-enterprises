import { Link, useLocation } from "@/lib/router";
import { ChevronRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

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
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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

  const currentYear = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "#0a0f1e" }}
    >
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
                src="/assets/uploads/Untitled-design-1.png"
                alt="Cybin Enterprises"
                style={{
                  width: "64px",
                  height: "64px",
                  objectFit: "contain",
                  display: "block",
                  flexShrink: 0,
                  mixBlendMode: "screen",
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
                aria-label="Toggle menu"
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
      <main className="flex-1 pt-[72px]">{children}</main>

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
                src="/assets/uploads/Untitled-design-1.png"
                alt="Cybin Enterprises"
                style={{
                  width: "64px",
                  height: "64px",
                  objectFit: "contain",
                  display: "block",
                  marginBottom: "12px",
                  mixBlendMode: "screen",
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
                {navLinks.map((link) => (
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

            {/* Legal */}
            <div>
              <h4
                className="text-sm font-semibold mb-4"
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
            <p
              className="text-xs text-center"
              style={{ color: "rgba(232, 237, 248, 0.35)" }}
            >
              © {currentYear} Cybin Enterprises. All rights reserved. Built with
              ♥ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#00d4b8" }}
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
