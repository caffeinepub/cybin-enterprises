import {
  ArrowRight,
  Building2,
  CheckCircle,
  ChevronRight,
  CreditCard,
  Globe,
  RefreshCw,
  ShoppingBag,
  Smartphone,
} from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const capabilities = [
  {
    icon: Building2,
    title: "Domestic Payment Processing",
    desc: "Reliable domestic merchant accounts for US-based businesses across all risk tiers.",
  },
  {
    icon: Globe,
    title: "International Payment Processing",
    desc: "Cross-border solutions for businesses operating in multiple countries and currencies.",
  },
  {
    icon: CreditCard,
    title: "Retail POS Payments",
    desc: "In-store payment terminals and point-of-sale solutions tailored to your industry.",
  },
  {
    icon: Globe,
    title: "Online Payment Gateways",
    desc: "Secure, high-converting checkout experiences for e-commerce and digital businesses.",
  },
  {
    icon: Smartphone,
    title: "Mobile Payment Acceptance",
    desc: "Accept payments anywhere with mobile-optimized processing solutions.",
  },
  {
    icon: RefreshCw,
    title: "Subscription & Recurring Billing",
    desc: "Automated billing infrastructure for subscription models and recurring revenue businesses.",
  },
];

const steps = [
  {
    num: "01",
    title: "Business Review",
    desc: "We assess your business model, processing history, and industry to understand your needs.",
  },
  {
    num: "02",
    title: "Payment Infrastructure Planning",
    desc: "We map the right payment solutions for your specific business requirements and risk profile.",
  },
  {
    num: "03",
    title: "Approval Preparation",
    desc: "We help you prepare documentation and structure your account for the best approval outcome.",
  },
  {
    num: "04",
    title: "Account Activation",
    desc: "We guide you through activation and ensure your payment infrastructure is fully operational.",
  },
  {
    num: "05",
    title: "Ongoing Stability Support",
    desc: "Continued monitoring and guidance to maintain long-term account health and stability.",
  },
];

export default function PaymentSolutionsPage() {
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
                Payment Solutions
              </span>
            </div>
            <h1
              className="text-4xl sm:text-5xl font-bold mb-5"
              style={{
                fontFamily: "Sora, system-ui, sans-serif",
                color: "#e8edf8",
                lineHeight: 1.15,
              }}
            >
              Payment Solutions for{" "}
              <span style={{ color: "#00d4b8" }}>High-Risk and Complex</span>{" "}
              Businesses
            </h1>
            <p
              className="text-lg"
              style={{ color: "rgba(232, 237, 248, 0.65)", lineHeight: 1.7 }}
            >
              Cybin Enterprises helps businesses access reliable payment
              infrastructure across domestic and international markets.
            </p>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section style={{ backgroundColor: "#0a0f1e", padding: "72px 0" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-up">
            <span
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: "#00d4b8" }}
            >
              Capabilities
            </span>
            <h2
              className="text-3xl font-bold mt-3"
              style={{
                fontFamily: "Sora, system-ui, sans-serif",
                color: "#e8edf8",
              }}
            >
              Payment Capabilities
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map(({ icon: Icon, title, desc }, i) => (
              <div
                key={title}
                className="animate-fade-up cybin-glass-card p-6"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{
                    backgroundColor: "rgba(0, 212, 184, 0.1)",
                    border: "1px solid rgba(0, 212, 184, 0.2)",
                  }}
                >
                  <Icon size={22} style={{ color: "#00d4b8" }} />
                </div>
                <h3
                  className="text-base font-bold mb-2"
                  style={{ fontFamily: "Sora, sans-serif", color: "#e8edf8" }}
                >
                  {title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "rgba(232, 237, 248, 0.6)" }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="cybin-section-divider" />

      {/* Complex Business Models */}
      <section style={{ backgroundColor: "#0c1020", padding: "72px 0" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-up">
              <span
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: "#00d4b8" }}
              >
                Built For You
              </span>
              <h2
                className="text-3xl font-bold mt-3 mb-5"
                style={{
                  fontFamily: "Sora, system-ui, sans-serif",
                  color: "#e8edf8",
                }}
              >
                Built for Complex Business Models
              </h2>
              <p
                className="text-base mb-6"
                style={{ color: "rgba(232, 237, 248, 0.65)", lineHeight: 1.75 }}
              >
                Many businesses require more than a standard payment setup.
                Cybin Enterprises helps structure solutions designed for:
              </p>
              <div className="space-y-3">
                {[
                  "High transaction volume",
                  "Subscription models",
                  "Cross-border commerce",
                  "Multi-channel sales",
                  "Regulated industries",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle
                      size={16}
                      style={{ color: "#00d4b8", flexShrink: 0 }}
                    />
                    <span style={{ color: "rgba(232, 237, 248, 0.75)" }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div
              className="animate-fade-in cybin-glass-card p-8"
              style={{
                background:
                  "linear-gradient(135deg, rgba(0, 212, 184, 0.05), rgba(22, 30, 58, 0.8))",
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <ShoppingBag size={28} style={{ color: "#00d4b8" }} />
                <h3
                  className="text-xl font-bold"
                  style={{ fontFamily: "Sora, sans-serif", color: "#e8edf8" }}
                >
                  Not sure what you need?
                </h3>
              </div>
              <p
                className="text-sm mb-5"
                style={{ color: "rgba(232, 237, 248, 0.6)", lineHeight: 1.7 }}
              >
                Our team will assess your specific business model, transaction
                volume, and industry requirements to recommend the best payment
                infrastructure for your situation.
              </p>
              <Link
                to="/contact"
                className="cybin-btn-primary text-sm"
                data-ocid="payment_solutions.cta.button"
              >
                Start Your Approval Process <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="cybin-section-divider" />

      {/* Process */}
      <section style={{ backgroundColor: "#0a0f1e", padding: "72px 0" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 animate-fade-up">
            <span
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: "#00d4b8" }}
            >
              Our Process
            </span>
            <h2
              className="text-3xl font-bold mt-3"
              style={{
                fontFamily: "Sora, system-ui, sans-serif",
                color: "#e8edf8",
              }}
            >
              How We Get You Approved
            </h2>
          </div>

          <div className="relative">
            {/* Connecting line */}
            <div
              className="hidden lg:block absolute top-8 left-[10%] right-[10%] h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(0, 212, 184, 0.3), transparent)",
              }}
            />
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
              {steps.map(({ num, title, desc }, i) => (
                <div
                  key={num}
                  className="animate-fade-up relative text-center"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 relative"
                    style={{
                      backgroundColor: "rgba(0, 212, 184, 0.1)",
                      border: "2px solid rgba(0, 212, 184, 0.4)",
                    }}
                  >
                    <span
                      className="text-lg font-bold"
                      style={{
                        color: "#00d4b8",
                        fontFamily: "Sora, sans-serif",
                      }}
                    >
                      {num}
                    </span>
                  </div>
                  <h3
                    className="text-sm font-bold mb-2"
                    style={{ fontFamily: "Sora, sans-serif", color: "#e8edf8" }}
                  >
                    {title}
                  </h3>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: "rgba(232, 237, 248, 0.55)" }}
                  >
                    {desc}
                  </p>
                  {i < steps.length - 1 && (
                    <ArrowRight
                      size={16}
                      className="hidden sm:block absolute top-8 -right-3 lg:right-[-12px] transform -translate-y-1/2"
                      style={{ color: "rgba(0, 212, 184, 0.3)" }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-14">
            <Link
              to="/contact"
              className="cybin-btn-primary"
              data-ocid="payment_solutions.cta.button"
            >
              Start Your Approval Process <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
