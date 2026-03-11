import { JsonLd } from "@/components/JsonLd";
import { useTheme } from "@/contexts/ThemeContext";
import { useSeo } from "@/hooks/useSeo";
import { Link } from "@/lib/router";
import {
  CheckCircle,
  ChevronRight,
  CreditCard,
  Monitor,
  Shield,
  Smartphone,
  Wifi,
} from "lucide-react";
import { useEffect } from "react";

const categories = [
  {
    icon: Monitor,
    title: "Point of Sale Terminals",
    image: "/assets/generated/hardware-pos-terminal.dim_600x450.jpg",
    desc: "We support a wide range of point-of-sale terminals from leading manufacturers. Whether you need a countertop all-in-one with a large touchscreen or a compact unit for high-volume checkout, we can likely support what you have or help you source the right fit.",
  },
  {
    icon: CreditCard,
    title: "Card Readers & Countertop Devices",
    image: "/assets/generated/hardware-card-reader.dim_600x450.jpg",
    desc: "From classic PIN pad terminals to modern NFC-ready countertop devices, we work with most major card readers. Dual communication, EMV chip, and contactless support are standard across the hardware we integrate with.",
  },
  {
    icon: Smartphone,
    title: "Mobile & Wireless Readers",
    image: "/assets/generated/hardware-mobile-reader.dim_600x450.jpg",
    desc: "On-the-go merchants, delivery businesses, and tableside service operations all need reliable mobile payment hardware. We work with most wireless and handheld readers — 4G, WiFi, and Bluetooth-based devices across all major form factors.",
  },
];

const perks = [
  { icon: CheckCircle, label: "Most major brands supported" },
  { icon: Wifi, label: "Wired, wireless & mobile" },
  { icon: Shield, label: "High-risk processor compatible" },
  { icon: CreditCard, label: "EMV, NFC & magstripe" },
];

export default function HardwarePage() {
  const { resolved } = useTheme();
  const isLight = resolved === "light";

  useSeo({
    title: "Payment Hardware for High-Risk Businesses | Cybin Enterprises",
    description:
      "Payment terminals and POS hardware for high-risk merchants. We work with most major brands — countertop, handheld, and mobile readers for every industry.",
    canonical: "/hardware",
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            observer.unobserve(e.target);
          }
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
    );
    for (const el of document.querySelectorAll(
      ".animate-fade-up, .animate-fade-in",
    )) {
      observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  const bg1 = isLight ? "#F9FAFF" : "#0a0f1e";
  const bg2 = isLight ? "#EEF0FA" : "#0c1020";
  const textPrimary = isLight ? "#1a2040" : "#e8edf8";
  const textSecondary = isLight
    ? "rgba(20,30,60,0.65)"
    : "rgba(232,237,248,0.65)";
  const cardBorder = isLight ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.07)";

  return (
    <div style={{ backgroundColor: bg1 }}>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Payment Hardware for High-Risk Merchants",
          description:
            "Payment terminals and POS hardware for high-risk businesses",
        }}
      />

      {/* Hero */}
      <section
        className="page-hero-bg"
        style={{
          padding: "80px 0 60px",
          borderBottom: `1px solid ${isLight ? "rgba(0,0,0,0.06)" : "rgba(110,247,212,0.08)"}`,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl animate-fade-up">
            <div className="flex items-center gap-2 mb-4">
              <Link to="/" className="text-sm" style={{ color: textSecondary }}>
                Home
              </Link>
              <ChevronRight
                size={14}
                style={{
                  color: isLight
                    ? "rgba(20,30,60,0.3)"
                    : "rgba(232,237,248,0.3)",
                }}
              />
              <span className="text-sm" style={{ color: "#00d4b8" }}>
                Hardware
              </span>
            </div>
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
              style={{
                backgroundColor: "rgba(110,247,212,0.1)",
                border: "1px solid rgba(110,247,212,0.2)",
                color: "#00d4b8",
              }}
            >
              <CreditCard size={11} />
              Payment Hardware
            </div>
            <h1
              className="text-4xl sm:text-5xl font-bold mb-5"
              style={{
                fontFamily: "Sora, system-ui, sans-serif",
                color: textPrimary,
                lineHeight: 1.15,
              }}
            >
              Hardware That Works for{" "}
              <span style={{ color: "#00d4b8" }}>Your Business</span>
            </h1>
            <p
              className="text-lg mb-4"
              style={{ color: textSecondary, lineHeight: 1.7 }}
            >
              We work with most major payment hardware. Whatever terminal or
              reader you have or prefer, we can likely support it — no need to
              start from scratch.
            </p>
            <p
              className="text-base mb-8"
              style={{ color: textSecondary, lineHeight: 1.7 }}
            >
              From countertop POS systems to mobile card readers, our acquiring
              network is compatible with the equipment you already own or plan
              to use.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/apply"
                data-ocid="hardware.cta.primary_button"
                className="cybin-btn-primary"
              >
                Get Your Hardware Solution
                <ChevronRight size={16} />
              </Link>
              <Link
                to="/contact"
                data-ocid="hardware.cta.secondary_button"
                className="cybin-btn-secondary"
              >
                Ask a Question
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Perks row */}
      <section
        style={{
          backgroundColor: bg2,
          padding: "28px 0",
          borderBottom: `1px solid ${cardBorder}`,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
            {perks.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon size={16} style={{ color: "#00d4b8", flexShrink: 0 }} />
                <span
                  className="text-sm font-medium"
                  style={{ color: textSecondary }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hardware Categories with Images */}
      <section style={{ backgroundColor: bg1, padding: "72px 0" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 animate-fade-up">
            <span
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: "#00d4b8" }}
            >
              What We Support
            </span>
            <h2
              className="text-3xl font-bold mt-3"
              style={{
                fontFamily: "Sora, system-ui, sans-serif",
                color: textPrimary,
              }}
            >
              All Major Hardware Categories
            </h2>
            <p
              className="mt-3 max-w-xl mx-auto"
              style={{ color: textSecondary }}
            >
              We work with most major payment hardware across every category.
              Contact us to confirm compatibility with your preferred device.
            </p>
          </div>

          <div className="space-y-12">
            {categories.map((cat, idx) => {
              const Icon = cat.icon;
              const reverse = idx % 2 === 1;
              return (
                <div
                  key={cat.title}
                  data-ocid={`hardware.category.item.${idx + 1}`}
                  className="animate-fade-up"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "48px",
                    alignItems: "center",
                    direction: reverse ? "rtl" : "ltr",
                  }}
                >
                  <div
                    style={{
                      direction: "ltr",
                      borderRadius: "20px",
                      overflow: "hidden",
                      border: `1px solid ${cardBorder}`,
                      boxShadow: isLight
                        ? "0 8px 32px rgba(0,0,0,0.08)"
                        : "0 8px 32px rgba(0,0,0,0.3)",
                      aspectRatio: "4/3",
                    }}
                  >
                    <img
                      src={cat.image}
                      alt={cat.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  </div>
                  <div style={{ direction: "ltr" }}>
                    <div
                      className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
                      style={{
                        backgroundColor: "rgba(110,247,212,0.1)",
                        border: "1px solid rgba(110,247,212,0.2)",
                        color: "#00d4b8",
                      }}
                    >
                      <Icon size={11} />
                      Hardware Category
                    </div>
                    <h3
                      className="text-2xl sm:text-3xl font-bold mb-4"
                      style={{
                        fontFamily: "Sora, system-ui, sans-serif",
                        color: textPrimary,
                      }}
                    >
                      {cat.title}
                    </h3>
                    <p
                      className="text-base leading-relaxed mb-6"
                      style={{ color: textSecondary }}
                    >
                      {cat.desc}
                    </p>
                    <Link
                      to="/contact"
                      className="cybin-btn-secondary"
                      style={{ display: "inline-flex" }}
                    >
                      Ask About Compatibility <ChevronRight size={15} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile fallback grid */}
          <style>
            {
              "@media (max-width: 768px) { .hardware-grid { grid-template-columns: 1fr !important; direction: ltr !important; } }"
            }
          </style>
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: bg2, padding: "64px 0" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center animate-fade-up">
          <Shield
            size={32}
            style={{ color: "#00d4b8", margin: "0 auto 16px" }}
          />
          <h3
            className="text-2xl font-bold mb-3"
            style={{ fontFamily: "Sora, sans-serif", color: textPrimary }}
          >
            Have existing hardware?
          </h3>
          <p
            className="text-base mb-8"
            style={{ color: textSecondary, lineHeight: 1.7 }}
          >
            In most cases, we can reprogram or integrate with what you already
            own. Reach out and we'll confirm compatibility — no commitment
            required.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/apply"
              data-ocid="hardware.bottom.primary_button"
              className="cybin-btn-primary"
            >
              Start Your Application <ChevronRight size={16} />
            </Link>
            <Link
              to="/contact"
              data-ocid="hardware.bottom.secondary_button"
              className="cybin-btn-secondary"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
