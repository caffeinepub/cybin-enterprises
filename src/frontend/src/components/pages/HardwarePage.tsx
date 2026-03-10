import { JsonLd } from "@/components/JsonLd";
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
  Zap,
} from "lucide-react";
import { useEffect } from "react";

const devices = [
  {
    name: "PAX A920",
    category: "Countertop + Mobile",
    desc: "Android-based touchscreen terminal combining countertop stability with portable flexibility. Supports NFC contactless, EMV chip, and magnetic stripe in a sleek handheld form factor — ideal for retail, restaurants, and high-risk merchants needing a premium device.",
    features: [
      "NFC / Contactless",
      "EMV Chip",
      "Magnetic Stripe",
      "Android OS",
      "WiFi + 4G",
    ],
    highlight: true,
  },
  {
    name: "Ingenico DESK 3500",
    category: "Countertop Terminal",
    desc: "A high-performance countertop terminal built for high-volume retail environments. Integrated PIN pad, dual communication (Ethernet + dial), EMV and NFC capable. Trusted by merchants in nearly every high-risk vertical for its reliability.",
    features: [
      "Integrated PIN Pad",
      "Dual Comm",
      "EMV + NFC",
      "High Volume",
      "Retail Ready",
    ],
    highlight: false,
  },
  {
    name: "Ingenico MOVE 5000",
    category: "Mobile / Handheld",
    desc: "Wireless handheld terminal designed for tableside service, delivery, and on-the-go payment acceptance. 4G LTE and WiFi connectivity with a full-day battery, making it the go-to choice for mobile merchants and delivery-forward businesses.",
    features: [
      "4G LTE",
      "WiFi",
      "Full-Day Battery",
      "Tableside",
      "Delivery-Ready",
    ],
    highlight: false,
  },
  {
    name: "Dejavoo Z11",
    category: "Countertop Terminal",
    desc: "A reliable all-in-one countertop terminal with wide processor compatibility — an important factor for high-risk merchants who may transition between processors. Supports all card types and payment methods with a simple setup.",
    features: [
      "Wide Compatibility",
      "EMV + NFC",
      "Color Display",
      "Easy Setup",
      "All Card Types",
    ],
    highlight: false,
  },
  {
    name: "VeriFone VX520",
    category: "Industry Workhorse",
    desc: "One of the most widely deployed terminals in high-risk processing. Dual communication (dial + IP), EMV, and NFC support. Merchants switching processors appreciate its near-universal compatibility across acquiring networks.",
    features: [
      "Dual Comm",
      "EMV Certified",
      "NFC Ready",
      "Universal",
      "Proven Reliability",
    ],
    highlight: false,
  },
  {
    name: "Mobile Card Readers",
    category: "Smartphone / Tablet",
    desc: "Bluetooth and audio-jack card readers that transform any iOS or Android smartphone or tablet into a payment terminal. Ideal for mobile businesses, pop-up shops, markets, and field sales reps who need to accept payments anywhere.",
    features: [
      "Bluetooth",
      "iOS + Android",
      "No Counter Needed",
      "Lightweight",
      "Anywhere",
    ],
    highlight: false,
  },
];

const categories = [
  {
    icon: Monitor,
    title: "Countertop Terminals",
    desc: "Fixed terminals for brick-and-mortar retail, dispensaries, and high-volume checkout environments. Stable, fast, and processor-compatible.",
  },
  {
    icon: Smartphone,
    title: "Mobile & Handheld",
    desc: "Wireless and smartphone-based readers for delivery, tableside, and on-the-go merchants who can't be tethered to a counter.",
  },
  {
    icon: Wifi,
    title: "Wireless POS Systems",
    desc: "Full wireless point-of-sale setups with receipt printing, inventory basics, and multi-device support for growing businesses.",
  },
  {
    icon: Zap,
    title: "Integrated Systems",
    desc: "Hardware + gateway bundles that connect your physical checkout to your online store, CRM, or business software.",
  },
];

export default function HardwarePage() {
  useSeo({
    title:
      "Payment Hardware & POS Terminals for High-Risk Businesses | Cybin Enterprises",
    description:
      "Payment terminals and POS hardware for high-risk merchants — PAX A920, Ingenico, Dejavoo, VeriFone, and mobile readers. Countertop, handheld, and wireless options for every industry.",
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

  return (
    <div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Payment Hardware for High-Risk Merchants",
          description:
            "Payment terminals and POS hardware for high-risk businesses",
          itemListElement: devices.map((d, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: d.name,
            description: d.desc,
          })),
        }}
      />

      {/* Hero */}
      <section
        className="page-hero-bg"
        style={{
          padding: "80px 0 60px",
          borderBottom: "1px solid rgba(0,212,184,0.08)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl animate-fade-up">
            <div className="flex items-center gap-2 mb-4">
              <Link
                to="/"
                className="text-sm"
                style={{ color: "rgba(232,237,248,0.45)" }}
              >
                Home
              </Link>
              <ChevronRight
                size={14}
                style={{ color: "rgba(232,237,248,0.3)" }}
              />
              <span className="text-sm" style={{ color: "#00d4b8" }}>
                Hardware
              </span>
            </div>
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
              style={{
                backgroundColor: "rgba(0, 212, 184, 0.1)",
                border: "1px solid rgba(0, 212, 184, 0.2)",
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
                color: "#e8edf8",
                lineHeight: 1.15,
              }}
            >
              Hardware Built for{" "}
              <span style={{ color: "#00d4b8" }}>High-Risk Commerce</span>
            </h1>
            <p
              className="text-lg mb-6"
              style={{ color: "rgba(232,237,248,0.65)", lineHeight: 1.7 }}
            >
              Every terminal type, every industry. Cybin works with PAX,
              Ingenico, Dejavoo, VeriFone, and mobile readers — ensuring your
              business gets hardware compatible with high-risk acquiring
              networks.
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

      {/* Hardware Categories */}
      <section style={{ backgroundColor: "#0a0f1e", padding: "72px 0" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-up">
            <span
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: "#00d4b8" }}
            >
              Form Factors
            </span>
            <h2
              className="text-3xl font-bold mt-3"
              style={{
                fontFamily: "Sora, system-ui, sans-serif",
                color: "#e8edf8",
              }}
            >
              Every Type of Payment Hardware
            </h2>
            <p
              className="mt-3"
              style={{
                color: "rgba(232,237,248,0.55)",
                maxWidth: 560,
                margin: "12px auto 0",
              }}
            >
              Whether you run a storefront, deliver to customers, or operate
              fully online, there's a hardware solution for your business.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.title}
                  className="cybin-glass-card p-6 animate-fade-up"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(0,212,184,0.05), rgba(22,30,58,0.7))",
                    border: "1px solid rgba(0,212,184,0.12)",
                    borderRadius: "16px",
                  }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: "rgba(0,212,184,0.1)" }}
                  >
                    <Icon size={20} style={{ color: "#00d4b8" }} />
                  </div>
                  <h3
                    className="text-base font-bold mb-2"
                    style={{ fontFamily: "Sora, sans-serif", color: "#e8edf8" }}
                  >
                    {cat.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "rgba(232,237,248,0.55)" }}
                  >
                    {cat.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Device Showcase */}
      <section style={{ backgroundColor: "#0c1020", padding: "72px 0" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-up">
            <span
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: "#00d4b8" }}
            >
              Device Lineup
            </span>
            <h2
              className="text-3xl font-bold mt-3"
              style={{
                fontFamily: "Sora, system-ui, sans-serif",
                color: "#e8edf8",
              }}
            >
              Supported Terminals
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {devices.map((device, idx) => (
              <div
                key={device.name}
                data-ocid={`hardware.device.item.${idx + 1}`}
                className="animate-fade-up"
                style={{
                  background: device.highlight
                    ? "linear-gradient(135deg, rgba(0,212,184,0.1), rgba(0,212,184,0.04))"
                    : "rgba(255,255,255,0.025)",
                  border: device.highlight
                    ? "1px solid rgba(0,212,184,0.35)"
                    : "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "16px",
                  padding: "24px",
                  position: "relative",
                }}
              >
                {device.highlight && (
                  <div
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-3"
                    style={{
                      backgroundColor: "rgba(0,212,184,0.12)",
                      border: "1px solid rgba(0,212,184,0.3)",
                      color: "#00d4b8",
                    }}
                  >
                    ◆ Most Popular
                  </div>
                )}
                <div className="flex items-start justify-between mb-1">
                  <h3
                    className="text-lg font-bold"
                    style={{ fontFamily: "Sora, sans-serif", color: "#e8edf8" }}
                  >
                    {device.name}
                  </h3>
                </div>
                <span
                  className="text-xs font-semibold uppercase tracking-widest"
                  style={{ color: "#00d4b8" }}
                >
                  {device.category}
                </span>
                <p
                  className="text-sm leading-relaxed mt-3 mb-4"
                  style={{ color: "rgba(232,237,248,0.6)" }}
                >
                  {device.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {device.features.map((f) => (
                    <span
                      key={f}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs"
                      style={{
                        backgroundColor: "rgba(0,212,184,0.06)",
                        border: "1px solid rgba(0,212,184,0.15)",
                        color: "rgba(232,237,248,0.7)",
                      }}
                    >
                      <CheckCircle
                        size={10}
                        style={{ color: "#00d4b8", flexShrink: 0 }}
                      />
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Note about compatibility */}
      <section style={{ backgroundColor: "#0a0f1e", padding: "48px 0" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center animate-fade-up">
          <Shield
            size={32}
            style={{ color: "#00d4b8", margin: "0 auto 16px" }}
          />
          <h3
            className="text-xl font-bold mb-3"
            style={{ fontFamily: "Sora, sans-serif", color: "#e8edf8" }}
          >
            Hardware That Works With Your Processor
          </h3>
          <p
            className="text-sm leading-relaxed mb-6"
            style={{ color: "rgba(232,237,248,0.6)" }}
          >
            High-risk merchants often need to change processors. We help you
            select hardware with the broadest acquiring-network compatibility so
            you're never locked out of accepting payments if your situation
            changes.
          </p>
          <Link
            to="/apply"
            data-ocid="hardware.bottom.cta.button"
            className="cybin-btn-primary"
          >
            Start Your Approval Process
            <ChevronRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
