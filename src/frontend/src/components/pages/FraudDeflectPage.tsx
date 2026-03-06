import { Link } from "@/lib/router";
import {
  AlertTriangle,
  Bell,
  CheckCircle,
  ChevronRight,
  Lock,
  Shield,
  TrendingDown,
  Zap,
} from "lucide-react";
import { useEffect } from "react";

const benefits = [
  {
    icon: TrendingDown,
    title: "Reduce Chargebacks",
    desc: "Resolve disputes before they escalate to chargebacks, protecting your chargeback ratio.",
  },
  {
    icon: Shield,
    title: "Protect Payment Accounts",
    desc: "Keep your merchant account in good standing by proactively managing dispute activity.",
  },
  {
    icon: Lock,
    title: "Lower Fraud Risk",
    desc: "Early alerts allow you to identify and respond to fraud patterns before they cause damage.",
  },
  {
    icon: AlertTriangle,
    title: "Reduce Friendly Fraud",
    desc: "Address cardholder misunderstandings early before they file formal disputes.",
  },
  {
    icon: CheckCircle,
    title: "Improve Long-Term Account Stability",
    desc: "Consistent dispute management leads to stronger processor relationships and better terms.",
  },
];

export default function FraudDeflectPage() {
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
        style={{
          background:
            "linear-gradient(135deg, #0d1025 0%, #1a0a2e 50%, #0d1025 100%)",
          padding: "80px 0 60px",
          borderBottom: "1px solid rgba(124,92,191,0.15)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 80% 80% at 50% 0%, rgba(124, 92, 191, 0.12) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <span className="text-sm" style={{ color: "#a87ef5" }}>
                Fraud Deflect
              </span>
            </div>
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-5"
              style={{
                backgroundColor: "rgba(124, 92, 191, 0.15)",
                border: "1px solid rgba(124, 92, 191, 0.3)",
                color: "#a87ef5",
              }}
            >
              <Shield size={12} /> Chargeback Prevention
            </div>
            <h1
              className="text-4xl sm:text-5xl font-bold mb-5"
              style={{
                fontFamily: "Sora, system-ui, sans-serif",
                color: "#e8edf8",
                lineHeight: 1.15,
              }}
            >
              Fraud Deflect:{" "}
              <span style={{ color: "#a87ef5" }}>Early Dispute Alerts</span>{" "}
              That Help Prevent Chargebacks
            </h1>
            <p
              className="text-lg"
              style={{ color: "rgba(232, 237, 248, 0.65)", lineHeight: 1.7 }}
            >
              Fraud Deflect provides early alerts when a customer disputes a
              transaction, allowing businesses to resolve the issue before it
              becomes a chargeback.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ backgroundColor: "#0a0f1e", padding: "72px 0" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-up">
            <span
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: "#a87ef5" }}
            >
              Process
            </span>
            <h2
              className="text-3xl font-bold mt-3"
              style={{
                fontFamily: "Sora, system-ui, sans-serif",
                color: "#e8edf8",
              }}
            >
              How Fraud Deflect Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 animate-fade-up">
            <div
              className="text-center p-8 rounded-2xl"
              style={{
                backgroundColor: "rgba(124, 92, 191, 0.07)",
                border: "1px solid rgba(124, 92, 191, 0.2)",
              }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{
                  backgroundColor: "rgba(124, 92, 191, 0.15)",
                  border: "2px solid rgba(124, 92, 191, 0.4)",
                }}
              >
                <span
                  className="text-2xl font-bold"
                  style={{ color: "#a87ef5", fontFamily: "Sora, sans-serif" }}
                >
                  1
                </span>
              </div>
              <h3
                className="font-bold mb-2"
                style={{ fontFamily: "Sora, sans-serif", color: "#e8edf8" }}
              >
                Customer Disputes
              </h3>
              <p
                className="text-sm"
                style={{ color: "rgba(232,237,248,0.6)", lineHeight: 1.6 }}
              >
                A cardholder contacts their bank to dispute a transaction on
                their statement.
              </p>
            </div>

            <div
              className="text-center p-8 rounded-2xl"
              style={{
                backgroundColor: "rgba(0, 212, 184, 0.07)",
                border: "1px solid rgba(0, 212, 184, 0.2)",
              }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{
                  backgroundColor: "rgba(0, 212, 184, 0.15)",
                  border: "2px solid rgba(0, 212, 184, 0.4)",
                }}
              >
                <Bell size={28} style={{ color: "#00d4b8" }} />
              </div>
              <h3
                className="font-bold mb-2"
                style={{ fontFamily: "Sora, sans-serif", color: "#e8edf8" }}
              >
                Alert Networks Notify
              </h3>
              <p
                className="text-sm"
                style={{ color: "rgba(232,237,248,0.6)", lineHeight: 1.6 }}
              >
                Alert networks notify you in near real-time — before the
                chargeback is officially filed.
              </p>
            </div>

            <div
              className="text-center p-8 rounded-2xl"
              style={{
                backgroundColor: "rgba(124, 92, 191, 0.07)",
                border: "1px solid rgba(124, 92, 191, 0.2)",
              }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{
                  backgroundColor: "rgba(124, 92, 191, 0.15)",
                  border: "2px solid rgba(124, 92, 191, 0.4)",
                }}
              >
                <Zap size={28} style={{ color: "#a87ef5" }} />
              </div>
              <h3
                className="font-bold mb-2"
                style={{ fontFamily: "Sora, sans-serif", color: "#e8edf8" }}
              >
                You Resolve It
              </h3>
              <p
                className="text-sm"
                style={{ color: "rgba(232,237,248,0.6)", lineHeight: 1.6 }}
              >
                You contact the customer and resolve the issue before it
                escalates to a formal chargeback.
              </p>
            </div>
          </div>

          {/* Network Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              className="animate-fade-up cybin-glass-card p-8"
              style={{ border: "1px solid rgba(0, 212, 184, 0.2)" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: "rgba(0, 212, 184, 0.1)" }}
                >
                  <Shield size={20} style={{ color: "#00d4b8" }} />
                </div>
                <div>
                  <h3
                    className="font-bold"
                    style={{ fontFamily: "Sora, sans-serif", color: "#e8edf8" }}
                  >
                    Ethoca Network
                  </h3>
                  <p
                    className="text-xs"
                    style={{ color: "rgba(232,237,248,0.45)" }}
                  >
                    Mastercard Collaboration Network
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle
                    size={15}
                    style={{
                      color: "#00d4b8",
                      flexShrink: 0,
                      marginTop: "2px",
                    }}
                  />
                  <p
                    className="text-sm"
                    style={{ color: "rgba(232,237,248,0.65)", lineHeight: 1.6 }}
                  >
                    Provides near real-time alerts through its global
                    collaboration network.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle
                    size={15}
                    style={{
                      color: "#00d4b8",
                      flexShrink: 0,
                      marginTop: "2px",
                    }}
                  />
                  <p
                    className="text-sm"
                    style={{ color: "rgba(232,237,248,0.65)", lineHeight: 1.6 }}
                  >
                    Helps merchants reduce fraud and prevent chargebacks across
                    Mastercard's network.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle
                    size={15}
                    style={{
                      color: "#00d4b8",
                      flexShrink: 0,
                      marginTop: "2px",
                    }}
                  />
                  <p
                    className="text-sm"
                    style={{ color: "rgba(232,237,248,0.65)", lineHeight: 1.6 }}
                  >
                    Covers a broad range of issuers and card types globally.
                  </p>
                </div>
              </div>
            </div>

            <div
              className="animate-fade-up cybin-glass-card p-8"
              style={{ border: "1px solid rgba(124, 92, 191, 0.2)" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: "rgba(124, 92, 191, 0.1)" }}
                >
                  <Lock size={20} style={{ color: "#a87ef5" }} />
                </div>
                <div>
                  <h3
                    className="font-bold"
                    style={{ fontFamily: "Sora, sans-serif", color: "#e8edf8" }}
                  >
                    Verifi Network
                  </h3>
                  <p
                    className="text-xs"
                    style={{ color: "rgba(232,237,248,0.45)" }}
                  >
                    Visa Direct Network
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle
                    size={15}
                    style={{
                      color: "#a87ef5",
                      flexShrink: 0,
                      marginTop: "2px",
                    }}
                  />
                  <p
                    className="text-sm"
                    style={{ color: "rgba(232,237,248,0.65)", lineHeight: 1.6 }}
                  >
                    Connected directly to the Visa network for immediate dispute
                    alerts.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle
                    size={15}
                    style={{
                      color: "#a87ef5",
                      flexShrink: 0,
                      marginTop: "2px",
                    }}
                  />
                  <p
                    className="text-sm"
                    style={{ color: "rgba(232,237,248,0.65)", lineHeight: 1.6 }}
                  >
                    Provides immediate dispute alerts for Visa transactions
                    globally.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle
                    size={15}
                    style={{
                      color: "#a87ef5",
                      flexShrink: 0,
                      marginTop: "2px",
                    }}
                  />
                  <p
                    className="text-sm"
                    style={{ color: "rgba(232,237,248,0.65)", lineHeight: 1.6 }}
                  >
                    Allows merchants to respond before Visa's chargeback process
                    begins.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="cybin-section-divider" />

      {/* Benefits */}
      <section style={{ backgroundColor: "#0c1020", padding: "72px 0" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-up">
            <span
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: "#00d4b8" }}
            >
              Benefits
            </span>
            <h2
              className="text-3xl font-bold mt-3"
              style={{
                fontFamily: "Sora, system-ui, sans-serif",
                color: "#e8edf8",
              }}
            >
              Benefits of Fraud Deflect
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
            {benefits.map(({ icon: Icon, title, desc }, i) => (
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

          {/* Availability */}
          <div
            className="animate-fade-up text-center p-8 rounded-2xl"
            style={{
              backgroundColor: "rgba(0, 212, 184, 0.05)",
              border: "1px solid rgba(0, 212, 184, 0.15)",
            }}
          >
            <h3
              className="text-xl font-bold mb-3"
              style={{ fontFamily: "Sora, sans-serif", color: "#e8edf8" }}
            >
              Availability
            </h3>
            <p
              className="text-sm mb-6"
              style={{ color: "rgba(232, 237, 248, 0.6)" }}
            >
              Fraud Deflect is available as an optional add-on with your payment
              setup through Cybin Enterprises.
            </p>
            <Link
              to="/contact"
              className="cybin-btn-primary"
              data-ocid="fraud_deflect.cta.button"
            >
              Request Fraud Deflect Information <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
