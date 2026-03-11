import NeuronCanvas from "@/components/NeuronCanvas";
import { useTheme } from "@/contexts/ThemeContext";
import { useSeo } from "@/hooks/useSeo";
import { Link } from "@/lib/router";
import {
  CheckCircle,
  ChevronRight,
  Clock,
  FileText,
  Globe,
  Phone,
  Shield,
  Zap,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: FileText,
    headline: "Tell Us Your Situation",
    body: "Free, secure, and no commitment. Tell us your industry, your monthly volume, and what\u2019s gone wrong \u2014 or what you\u2019re trying to build. The initial review takes about 90 seconds.",
    details: [
      "Submit your industry and monthly volume",
      "Describe the primary challenge you\u2019re facing",
      "Provide basic contact info so we can reach you",
      "No payment, no credit check, no commitment",
    ],
    timeline: "Day 0",
  },
  {
    number: "02",
    icon: Globe,
    headline: "We Structure Your Options",
    body: "We match your business to the best-fit processors across our network. You see your options before anything is submitted \u2014 no surprises. Our team reviews your situation personally.",
    details: [
      "Our team reviews your business type and volume",
      "We identify processors from our network that match your profile",
      "You receive a summary of available options",
      "No automatic submissions \u2014 you remain in control",
    ],
    timeline: "Day 1\u20132",
  },
  {
    number: "03",
    icon: CheckCircle,
    headline: "Application & Approval",
    body: "We manage the full application process. Approvals typically take 3 to 10 business days depending on your volume and vertical. We handle the underwriting coordination so you don\u2019t have to.",
    details: [
      "We guide you through required documentation",
      "Application submitted to best-fit processor",
      "Underwriting review managed by our team",
      "Typical approval: 3\u201310 business days",
    ],
    timeline: "Day 2\u201310",
  },
  {
    number: "04",
    icon: Zap,
    headline: "Process With Confidence",
    body: "Ongoing account monitoring, chargeback support, and scaling assistance as your business grows. We don\u2019t disappear after approval \u2014 we\u2019re here for the long run.",
    details: [
      "Live merchant account with your processor",
      "Chargeback monitoring and dispute support",
      "Account scaling guidance as volume grows",
      "Direct point of contact for any issues",
    ],
    timeline: "Ongoing",
  },
];

export default function HowItWorksPage() {
  useSeo({
    canonical: "https://cybinenterprises.com/how-it-works",
    title: "How It Works | Cybin Enterprises",
    description:
      "Learn how Cybin Enterprises helps high-risk businesses get approved for merchant accounts. Four steps: tell us your situation, we structure options, application & approval, then process with confidence.",
  });
  const { resolved } = useTheme();
  const isLight = resolved === "light";

  return (
    <div>
      {/* Hero */}
      <section
        style={{
          background: "#0a0f1e",
          position: "relative",
          overflow: "hidden",
          padding: "100px 0 80px",
        }}
      >
        <NeuronCanvas mode="dark" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: "clamp(2rem, 5vw, 3.25rem)",
              fontWeight: 700,
              color: "#E8EDF8",
              lineHeight: 1.2,
              marginBottom: 20,
            }}
          >
            From Application to{" "}
            <span style={{ color: "#7c5cbf" }}>Active Processing</span>
          </h1>
          <p
            style={{
              fontSize: "1.1rem",
              color: "#D4E0F5",
              lineHeight: 1.7,
              maxWidth: 580,
              margin: "0 auto 32px",
            }}
          >
            A transparent, four-step process that takes you from inquiry to
            approved merchant account \u2014 with no surprises at any stage.
          </p>
          <Link
            to="/apply"
            data-ocid="howitworks.apply.button"
            className="cybin-btn-blue"
          >
            Start Your Free Review <ChevronRight size={15} />
          </Link>
        </div>
      </section>

      {/* Steps */}
      {steps.map((step, i) => {
        const Icon = step.icon;
        const isDark = i % 2 === 0;
        return (
          <section
            key={step.number}
            style={{
              backgroundColor: isDark
                ? isLight
                  ? "#ffffff"
                  : "#0a0f1e"
                : isLight
                  ? "#F0F4FF"
                  : "#110F22",
              padding: "80px 0",
              position: "relative",
              overflow: isDark ? "visible" : "hidden",
            }}
          >
            {!isDark && !isLight && <NeuronCanvas mode="dark" />}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? "" : ""}`}
              >
                <div>
                  <div
                    style={{
                      fontSize: "4rem",
                      fontFamily: '"Playfair Display", Georgia, serif',
                      fontWeight: 900,
                      color: "rgba(99,102,241,0.15)",
                      lineHeight: 1,
                      marginBottom: 8,
                    }}
                  >
                    {step.number}
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 12,
                        backgroundColor: "rgba(99,102,241,0.12)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Icon size={20} style={{ color: "#D4E0F5" }} />
                    </div>
                    <span
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        color: "#C9A84C",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                      }}
                    >
                      {step.timeline}
                    </span>
                  </div>
                  <h2
                    style={{
                      fontFamily: '"Playfair Display", Georgia, serif',
                      fontSize: "2rem",
                      fontWeight: 700,
                      color: isLight ? "#0a0f1e" : "#E8EDF8",
                      marginBottom: 16,
                    }}
                  >
                    {step.headline}
                  </h2>
                  <p
                    style={{
                      color: isLight ? "rgba(10,22,40,0.7)" : "#D4E0F5",
                      lineHeight: 1.75,
                      fontSize: "1rem",
                    }}
                  >
                    {step.body}
                  </p>
                </div>
                <div
                  style={{
                    padding: 32,
                    borderRadius: 16,
                    backgroundColor: isLight
                      ? "rgba(99,102,241,0.04)"
                      : "rgba(255,255,255,0.03)",
                    border: `1px solid ${isLight ? "rgba(99,102,241,0.12)" : "rgba(255,255,255,0.07)"}`,
                  }}
                >
                  <p
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color: "#D4E0F5",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      marginBottom: 16,
                    }}
                  >
                    What happens at this stage
                  </p>
                  <div className="space-y-3">
                    {step.details.map((detail) => (
                      <div key={detail} className="flex gap-3">
                        <CheckCircle
                          size={15}
                          style={{
                            color: "#00d4b8",
                            flexShrink: 0,
                            marginTop: 2,
                          }}
                        />
                        <p
                          style={{
                            fontSize: "0.9rem",
                            color: isLight
                              ? "rgba(10,22,40,0.7)"
                              : "rgba(232,240,255,0.75)",
                            lineHeight: 1.6,
                          }}
                        >
                          {detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Trust signals */}
      <section
        style={{
          background: "#0a0f1e",
          padding: "80px 0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <NeuronCanvas mode="dark" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                title: "Bank-Level Security",
                desc: "All submitted data is encrypted and handled with bank-level security protocols.",
              },
              {
                icon: Clock,
                title: "24-Hour Review",
                desc: "A real person reviews your submission within 24 hours. Not an automated system.",
              },
              {
                icon: Phone,
                title: "Direct Contact",
                desc: "You get a direct point of contact at Cybin \u2014 not a ticketing system.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                style={{
                  padding: 32,
                  borderRadius: 16,
                  backgroundColor: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    backgroundColor: "rgba(99,102,241,0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 16,
                  }}
                >
                  <Icon size={20} style={{ color: "#D4E0F5" }} />
                </div>
                <h3
                  style={{ fontWeight: 700, color: "#E8EDF8", marginBottom: 8 }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    color: "#D4E0F5",
                    fontSize: "0.875rem",
                    lineHeight: 1.6,
                  }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/apply"
              data-ocid="howitworks.final.button"
              className="cybin-btn-blue"
            >
              Get Started Now <ChevronRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
