import { useLiveSiteSettings } from "@/hooks/useLiveSiteSettings";
import { useSeo } from "@/hooks/useSeo";
import { Link } from "@/lib/router";
import {
  AlertTriangle,
  CheckCircle,
  ChevronRight,
  Globe,
  HeartHandshake,
  Lock,
  Shield,
  TrendingUp,
  Zap,
} from "lucide-react";
import { useEffect, useRef } from "react";

const trustBadges = [
  { icon: Shield, label: "High-risk merchant specialists" },
  { icon: Globe, label: "Domestic & international options" },
  { icon: CheckCircle, label: "Structured approval process" },
  { icon: TrendingUp, label: "Long-term payment stability" },
];

const whyCards = [
  {
    icon: CheckCircle,
    title: "Clear Approval Guidance",
    desc: "We help prepare your business for approval and long-term stability with a structured, transparent process.",
  },
  {
    icon: Globe,
    title: "Global Payment Access",
    desc: "Domestic and international payment options for complex industries operating across borders.",
  },
  {
    icon: Shield,
    title: "Built for High-Risk Industries",
    desc: "Designed specifically for industries traditional providers avoid or shut down without warning.",
  },
  {
    icon: HeartHandshake,
    title: "Long-Term Support",
    desc: "Ongoing guidance before, during, and after onboarding — not just a one-time setup.",
  },
];

const industries = [
  "Research Peptides",
  "Seeds & Clones",
  "CBD & Botanicals",
  "Nutraceuticals",
  "Telemedicine",
  "Digital Health",
  "High-Volume E-Commerce",
  "Subscription Businesses",
  "Specialty Retail",
  "Firearms & Ammunition",
  "Adult Entertainment",
  "Travel & Booking",
  "Online Gaming",
  "Kratom & Ethnobotanicals",
  "Debt Collection",
  "Forex & Crypto",
  "Legal Services",
  "Emerging Regulated Markets",
  "Tobacco & Vape",
  "Financial Services",
  "Coaching & Consulting",
  "Supplements & Wellness",
];

const solutions = [
  { icon: Zap, title: "Online Payments" },
  { icon: Shield, title: "Retail Payments" },
  { icon: Globe, title: "Mobile Payments" },
  { icon: TrendingUp, title: "Recurring Billing" },
  { icon: Lock, title: "Multi-Channel Commerce" },
  { icon: CheckCircle, title: "International Processing" },
];

// Network animation component
function NetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrameId: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    type Node = { x: number; y: number; vx: number; vy: number };
    const nodes: Node[] = Array.from({ length: 28 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(0, 212, 184, ${0.12 * (1 - dist / 140)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      for (const node of nodes) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 212, 184, 0.35)";
        ctx.fill();
      }

      animFrameId = requestAnimationFrame(draw);
    };

    draw();

    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animFrameId);
      } else {
        draw();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        opacity: 0.6,
        pointerEvents: "none",
      }}
    />
  );
}

export default function HomePage() {
  const site = useLiveSiteSettings();

  useSeo({
    title: "High-Risk Payment Solutions | Cybin Enterprises",
    description:
      "Trusted payment processing for high-risk businesses. MATCH list merchants, CBD, nutraceuticals, telemedicine, and more. Domestic & international options.",
    canonical: "/",
  });

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
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
      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center network-bg"
        style={{
          background:
            "linear-gradient(135deg, #0a0f1e 0%, #120820 40%, #0d1525 70%, #0a0f1e 100%)",
        }}
      >
        <NetworkCanvas />

        {/* Gradient overlays */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 80% 60% at 30% 50%, rgba(124, 92, 191, 0.15) 0%, transparent 60%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 60% 80% at 80% 30%, rgba(0, 212, 184, 0.07) 0%, transparent 50%)",
            pointerEvents: "none",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-3xl">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-8"
              style={{
                backgroundColor: "rgba(0, 212, 184, 0.1)",
                border: "1px solid rgba(0, 212, 184, 0.25)",
                color: "#00d4b8",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              <span
                className="w-2 h-2 rounded-full animate-pulse-teal"
                style={{ backgroundColor: "#00d4b8" }}
              />
              High-Risk Payment Specialists
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              style={{
                fontFamily: "Sora, system-ui, sans-serif",
                color: site.colors.textPrimary,
                letterSpacing: "-0.02em",
              }}
            >
              {site.hero.headline.split("High-Risk").length > 1 ? (
                <>
                  {site.hero.headline.split("High-Risk")[0]}
                  <span style={{ color: site.colors.accentTeal }}>
                    High-Risk
                  </span>
                  {site.hero.headline.split("High-Risk")[1]}
                </>
              ) : (
                site.hero.headline
              )}
            </h1>

            <p
              className="text-lg mb-4"
              style={{ color: "rgba(232, 237, 248, 0.7)", lineHeight: 1.7 }}
            >
              {site.hero.subheadline}
            </p>
            <p
              className="text-base mb-4"
              style={{ color: "rgba(232, 237, 248, 0.55)", lineHeight: 1.7 }}
            >
              {site.hero.body}
            </p>

            <p
              className="text-xs mb-8 italic"
              style={{ color: "rgba(232, 237, 248, 0.4)", lineHeight: 1.6 }}
            >
              Payment solutions facilitated through our network of licensed
              acquiring banks and processors. Approval is not guaranteed.
              Results vary by business type, history, and underwriting criteria.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/apply"
                data-ocid="hero.primary.button"
                className="cybin-btn-primary text-base"
              >
                {site.hero.primaryCta}
                <ChevronRight size={16} />
              </Link>
              <Link
                to="/payment-solutions"
                data-ocid="hero.secondary.button"
                className="cybin-btn-secondary text-base"
              >
                {site.hero.secondaryCta}
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "120px",
            background: "linear-gradient(to bottom, transparent, #0a0f1e)",
            pointerEvents: "none",
          }}
        />
      </section>

      {/* Industries Ticker — immediately after hero */}
      <section style={{ backgroundColor: "#0c1020", padding: "80px 0" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <div className="text-center animate-fade-up">
            <span
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: "#00d4b8" }}
            >
              Industries
            </span>
            <h2
              className="text-3xl sm:text-4xl font-bold mt-3 mb-3"
              style={{
                fontFamily: "Sora, system-ui, sans-serif",
                color: "#e8edf8",
              }}
            >
              We Support{" "}
              <span style={{ color: "#00d4b8" }}>All Legal Industries</span>
            </h2>
            <p
              style={{
                color: "rgba(232, 237, 248, 0.55)",
                maxWidth: "600px",
                margin: "0 auto",
              }}
            >
              If your business operates legally, we can work with you —
              including industries that have been previously declined or flagged
              as high-risk.
            </p>
          </div>
        </div>

        {/* Scrolling ticker */}
        <div
          style={{
            overflow: "hidden",
            position: "relative",
            padding: "12px 0",
            borderTop: "1px solid rgba(0, 212, 184, 0.08)",
            borderBottom: "1px solid rgba(0, 212, 184, 0.08)",
          }}
        >
          {/* Fade edges */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: "80px",
              zIndex: 2,
              background: "linear-gradient(to right, #0c1020, transparent)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              bottom: 0,
              width: "80px",
              zIndex: 2,
              background: "linear-gradient(to left, #0c1020, transparent)",
              pointerEvents: "none",
            }}
          />

          <div className="ticker-track">
            {[
              ...industries.map((ind) => ({ label: ind, key: `a-${ind}` })),
              ...industries.map((ind) => ({ label: ind, key: `b-${ind}` })),
            ].map(({ label, key }) => (
              <div
                key={key}
                className="inline-flex items-center gap-2 px-5 py-2.5 mx-2 rounded-full text-sm font-medium flex-shrink-0"
                style={{
                  backgroundColor: "rgba(0, 212, 184, 0.07)",
                  border: "1px solid rgba(0, 212, 184, 0.18)",
                  color: "rgba(232, 237, 248, 0.8)",
                  whiteSpace: "nowrap",
                }}
              >
                <span style={{ color: "#00d4b8", fontSize: "8px" }}>◆</span>
                {label}
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 text-center">
          <Link
            to="/industries"
            className="cybin-btn-primary"
            data-ocid="industries.qualify.button"
          >
            Explore Supported Industries <ChevronRight size={16} />
          </Link>
          <p
            className="text-xs mt-4 italic"
            style={{ color: "rgba(232,237,248,0.35)", lineHeight: 1.6 }}
          >
            * Approval not guaranteed. Cybin Enterprises is a payment
            intermediary only. Not investment advice. Each merchant is
            responsible for their own regulatory compliance.
          </p>
        </div>
      </section>

      <div className="cybin-section-divider" />

      {/* Pain-Point Section */}
      <section style={{ backgroundColor: "#0a0f1e", padding: "80px 0" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-up">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle size={22} style={{ color: "#ff6b6b" }} />
                <span
                  className="text-sm font-semibold uppercase tracking-widest"
                  style={{ color: "#ff6b6b" }}
                >
                  Urgent Situation?
                </span>
              </div>
              <h2
                className="text-3xl sm:text-4xl font-bold mb-6"
                style={{
                  fontFamily: "Sora, system-ui, sans-serif",
                  color: "#e8edf8",
                  lineHeight: 1.25,
                }}
              >
                When Payment Processing Stops,{" "}
                <span style={{ color: "#ff8e53" }}>Business Stops</span>
              </h2>
              <p
                className="text-base mb-4"
                style={{ color: "rgba(232, 237, 248, 0.65)", lineHeight: 1.75 }}
              >
                Many businesses discover us during urgent moments — when a
                processor shuts down their account, places funds on hold, or
                suddenly stops supporting their industry.
              </p>
              <p
                className="text-base mb-8"
                style={{ color: "rgba(232, 237, 248, 0.65)", lineHeight: 1.75 }}
              >
                If you're here because something changed overnight, you're not
                alone. Cybin Enterprises helps businesses stabilize their
                payment infrastructure quickly and move forward with clarity and
                confidence.
              </p>
              <Link to="/contact" className="cybin-btn-primary">
                Get Help Now <ChevronRight size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {trustBadges.map(({ icon: Icon, label }, i) => (
                <div
                  key={label}
                  className="animate-fade-up cybin-glass-card p-5"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                    style={{ backgroundColor: "rgba(0, 212, 184, 0.12)" }}
                  >
                    <Icon size={20} style={{ color: "#00d4b8" }} />
                  </div>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: "#e8edf8" }}
                  >
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="cybin-section-divider" />

      {/* Why Choose Cybin */}
      <section style={{ backgroundColor: "#0a0f1e", padding: "80px 0" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 animate-fade-up">
            <span
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: "#00d4b8" }}
            >
              Why Cybin
            </span>
            <h2
              className="text-3xl sm:text-4xl font-bold mt-3"
              style={{
                fontFamily: "Sora, system-ui, sans-serif",
                color: "#e8edf8",
              }}
            >
              Why Businesses Choose Cybin Enterprises
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyCards.map(({ icon: Icon, title, desc }, i) => (
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
          <p
            className="text-xs mt-6 italic"
            style={{ color: "rgba(232,237,248,0.35)", lineHeight: 1.6 }}
          >
            † Guidance and support are provided on a consultation basis. Payment
            account approval, approval timelines, and long-term stability are
            determined by acquiring banks and processors, not Cybin Enterprises.
          </p>
        </div>
      </section>

      <div className="cybin-section-divider" />

      {/* MATCH / Previously Denied Section */}
      <section style={{ backgroundColor: "#0a0f1e", padding: "80px 0" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="animate-fade-up cybin-glass-card p-8 sm:p-12"
            style={{
              background:
                "linear-gradient(135deg, rgba(255, 107, 107, 0.05), rgba(10, 15, 30, 0.8))",
              border: "1px solid rgba(255, 107, 107, 0.15)",
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-5"
                  style={{
                    backgroundColor: "rgba(255, 142, 83, 0.12)",
                    border: "1px solid rgba(255, 142, 83, 0.3)",
                    color: "#ff8e53",
                  }}
                >
                  <AlertTriangle size={12} /> Previously Denied?
                </div>
                <h2
                  className="text-3xl sm:text-4xl font-bold mb-5"
                  style={{
                    fontFamily: "Sora, system-ui, sans-serif",
                    color: "#e8edf8",
                  }}
                >
                  On the MATCH List or{" "}
                  <span style={{ color: "#ff8e53" }}>Previously Denied?</span>
                </h2>
                <p
                  className="text-base mb-4"
                  style={{
                    color: "rgba(232, 237, 248, 0.65)",
                    lineHeight: 1.75,
                  }}
                >
                  Being placed on the MATCH (Member Alert to Control High-Risk)
                  list or having a merchant account terminated doesn't have to
                  be the end of the road. Many businesses in this situation
                  still have viable paths to payment processing.
                </p>
                <p
                  className="text-base mb-8"
                  style={{
                    color: "rgba(232, 237, 248, 0.65)",
                    lineHeight: 1.75,
                  }}
                >
                  Cybin Enterprises works with merchants who have been denied,
                  terminated, or flagged — helping them understand their options
                  and navigate a structured path toward processing stability.
                </p>
                <Link
                  to="/contact"
                  className="cybin-btn-primary"
                  data-ocid="match.cta.button"
                >
                  Discuss Your Situation <ChevronRight size={16} />
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {[
                  {
                    title: "MATCH List Merchants",
                    desc: "We understand the MATCH list and can help you explore available options.",
                  },
                  {
                    title: "Terminated Accounts",
                    desc: "Previous account terminations don't automatically disqualify you from processing.",
                  },
                  {
                    title: "Declined Applications",
                    desc: "A denial from one processor is not a denial from all. We work across multiple networks.",
                  },
                  {
                    title: "High Chargeback History",
                    desc: "Businesses with elevated chargeback ratios can often be stabilized with the right tools.",
                  },
                ].map(({ title, desc }) => (
                  <div
                    key={title}
                    className="flex gap-4 p-4 rounded-xl"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255, 142, 83, 0.1)",
                    }}
                  >
                    <CheckCircle
                      size={18}
                      style={{
                        color: "#00d4b8",
                        flexShrink: 0,
                        marginTop: "2px",
                      }}
                    />
                    <div>
                      <p
                        className="text-sm font-semibold mb-1"
                        style={{ color: "#e8edf8" }}
                      >
                        {title}
                      </p>
                      <p
                        className="text-xs"
                        style={{
                          color: "rgba(232, 237, 248, 0.55)",
                          lineHeight: 1.6,
                        }}
                      >
                        {desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="cybin-section-divider" />

      {/* Payment Solutions Preview */}
      <section style={{ backgroundColor: "#0a0f1e", padding: "80px 0" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-up">
            <span
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: "#00d4b8" }}
            >
              Solutions
            </span>
            <h2
              className="text-3xl sm:text-4xl font-bold mt-3 mb-4"
              style={{
                fontFamily: "Sora, system-ui, sans-serif",
                color: "#e8edf8",
              }}
            >
              Payment Solutions Preview
            </h2>
            <p style={{ color: "rgba(232, 237, 248, 0.55)" }}>
              Cybin Enterprises supports businesses across multiple payment
              environments.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
            {solutions.map(({ icon: Icon, title }, i) => (
              <div
                key={title}
                className="animate-fade-up cybin-glass-card p-5 text-center"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-3"
                  style={{ backgroundColor: "rgba(0, 212, 184, 0.1)" }}
                >
                  <Icon size={18} style={{ color: "#00d4b8" }} />
                </div>
                <p
                  className="text-xs font-semibold"
                  style={{ color: "#e8edf8" }}
                >
                  {title}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/payment-solutions"
              className="cybin-btn-primary"
              data-ocid="payment_solutions.cta.button"
            >
              Explore Payment Solutions <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <div className="cybin-section-divider" />

      {/* Fraud Deflect Preview */}
      <section style={{ backgroundColor: "#0c1020", padding: "80px 0" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="animate-fade-up cybin-glass-card p-8 sm:p-12"
            style={{
              background:
                "linear-gradient(135deg, rgba(22, 30, 58, 0.8), rgba(26, 10, 46, 0.6))",
              border: "1px solid rgba(124, 92, 191, 0.2)",
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-5"
                  style={{
                    backgroundColor: "rgba(124, 92, 191, 0.15)",
                    border: "1px solid rgba(124, 92, 191, 0.3)",
                    color: "#a87ef5",
                  }}
                >
                  <Shield size={12} /> Fraud Protection
                </div>
                <h2
                  className="text-3xl sm:text-4xl font-bold mb-5"
                  style={{
                    fontFamily: "Sora, system-ui, sans-serif",
                    color: "#e8edf8",
                  }}
                >
                  Prevent Chargebacks{" "}
                  <span style={{ color: "#a87ef5" }}>Before They Happen</span>
                </h2>
                <p
                  className="text-base mb-6"
                  style={{
                    color: "rgba(232, 237, 248, 0.65)",
                    lineHeight: 1.75,
                  }}
                >
                  Fraud Deflect provides early dispute alerts that allow
                  businesses to resolve issues before they become chargebacks.
                  Powered by two global dispute networks.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <div
                    className="flex-1 p-4 rounded-xl"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <p
                      className="text-sm font-bold mb-1"
                      style={{ color: "#00d4b8" }}
                    >
                      Visa Network
                    </p>
                    <p
                      className="text-xs"
                      style={{ color: "rgba(232,237,248,0.55)" }}
                    >
                      Direct Visa dispute monitoring
                    </p>
                  </div>
                  <div
                    className="flex-1 p-4 rounded-xl"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <p
                      className="text-sm font-bold mb-1"
                      style={{ color: "#00d4b8" }}
                    >
                      Mastercard Network
                    </p>
                    <p
                      className="text-xs"
                      style={{ color: "rgba(232,237,248,0.55)" }}
                    >
                      Global Mastercard collaboration
                    </p>
                  </div>
                </div>
                <Link
                  to="/fraud-deflect"
                  className="cybin-btn-primary"
                  data-ocid="fraud_deflect.cta.button"
                >
                  Learn About Fraud Deflect <ChevronRight size={16} />
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {[
                  "Reduce Chargebacks",
                  "Protect Payment Accounts",
                  "Lower Fraud Risk",
                  "Reduce Friendly Fraud",
                  "Improve Long-Term Account Stability",
                ].map((b) => (
                  <div key={b} className="flex items-center gap-3">
                    <CheckCircle
                      size={16}
                      style={{ color: "#00d4b8", flexShrink: 0 }}
                    />
                    <span
                      className="text-sm"
                      style={{ color: "rgba(232, 237, 248, 0.75)" }}
                    >
                      {b}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="cybin-section-divider" />

      {/* About Preview */}
      <section style={{ backgroundColor: "#0a0f1e", padding: "80px 0" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-up max-w-2xl mx-auto text-center">
            <span
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: "#00d4b8" }}
            >
              About
            </span>
            <h2
              className="text-3xl sm:text-4xl font-bold mt-3 mb-5"
              style={{
                fontFamily: "Sora, system-ui, sans-serif",
                color: "#e8edf8",
              }}
            >
              Built for Businesses That Need More
            </h2>
            <p
              className="text-base mb-8"
              style={{ color: "rgba(232, 237, 248, 0.6)", lineHeight: 1.75 }}
            >
              Cybin Enterprises was created to bring clarity and stability to
              businesses that struggle to find reliable payment solutions. Led
              by experienced professionals across regulated industries, we help
              businesses access payment infrastructure designed for long-term
              success.
            </p>
            <Link to="/about" className="cybin-btn-secondary">
              Meet the Founders <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Snippets / AI Q&A Block */}
      <section style={{ backgroundColor: "#080d1a", padding: "80px 0" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: "#00d4b8" }}
            >
              Quick Answers
            </span>
            <h2
              className="text-3xl sm:text-4xl font-bold mt-3"
              style={{
                fontFamily: "Sora, system-ui, sans-serif",
                color: "#e8edf8",
              }}
            >
              High-Risk Payment Processing — Explained
            </h2>
          </div>
          <div className="space-y-6">
            {[
              {
                q: "What is a high-risk merchant account?",
                a: "A high-risk merchant account is a payment processing account for businesses that banks and standard processors consider elevated risk — due to industry type, chargeback history, or business model. Cybin Enterprises specializes in securing these accounts for merchants who cannot access standard processing.",
              },
              {
                q: "Who can help merchants on the MATCH list?",
                a: "Cybin Enterprises works directly with MATCH list merchants to explore domestic and international payment processing alternatives. Being on the MATCH list does not mean you cannot accept card payments — it means you need a specialist.",
              },
              {
                q: "What businesses does Cybin Enterprises work with?",
                a: "Cybin Enterprises works with all legal businesses including CBD, nutraceuticals, telemedicine, research peptides, online gaming, firearms, tobacco, adult entertainment, forex, debt collection, subscription businesses, and any merchant previously denied or operating in a regulated industry.",
              },
              {
                q: "How do you prevent chargebacks as a high-risk merchant?",
                a: "The most effective approach is early dispute alerts — Cybin Enterprises offers Fraud Deflect, which integrates with the Ethoca and Verifi networks to notify you the moment a cardholder opens a dispute, giving you the chance to resolve it before it becomes a chargeback.",
              },
              {
                q: "Can a business get payment processing after being denied?",
                a: "Yes. Many merchants denied by Stripe, PayPal, Square, or traditional banks can still access payment processing through specialized high-risk processors. Cybin Enterprises reviews your situation and structures an approach to get your account approved.",
              },
            ].map((item) => (
              <div
                key={item.q}
                itemScope
                itemType="https://schema.org/Question"
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(0,212,184,0.1)",
                  borderRadius: 12,
                  padding: "24px 28px",
                }}
              >
                <h3
                  itemProp="name"
                  className="text-base font-bold mb-3"
                  style={{
                    color: "#00d4b8",
                    fontFamily: "Sora, system-ui, sans-serif",
                  }}
                >
                  {item.q}
                </h3>
                <div itemScope itemType="https://schema.org/Answer">
                  <p
                    itemProp="text"
                    style={{
                      color: "rgba(232,237,248,0.72)",
                      lineHeight: 1.8,
                      fontSize: "0.97rem",
                      margin: 0,
                    }}
                  >
                    {item.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/faq" className="cybin-btn-secondary">
              View Full FAQ <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section
        style={{
          background:
            "linear-gradient(135deg, #0d1a30 0%, #120820 50%, #0d1a30 100%)",
          padding: "80px 0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 80% 80% at 50% 50%, rgba(0, 212, 184, 0.07) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center animate-fade-up">
          <h2
            className="text-3xl sm:text-4xl font-bold mb-5"
            style={{
              fontFamily: "Sora, system-ui, sans-serif",
              color: "#e8edf8",
            }}
          >
            Ready to Stabilize Your{" "}
            <span style={{ color: "#00d4b8" }}>Payment Setup?</span>
          </h2>
          <p
            className="text-base mb-8"
            style={{ color: "rgba(232, 237, 248, 0.6)" }}
          >
            Start the process today and explore the payment options available
            for your business.
          </p>
          <Link
            to="/apply"
            className="cybin-btn-primary text-base"
            style={{ padding: "1rem 2.5rem" }}
          >
            Start Your Approval Process <ChevronRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
