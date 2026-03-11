import NeuronCanvas from "@/components/NeuronCanvas";
import { useTheme } from "@/contexts/ThemeContext";
import { useSeo } from "@/hooks/useSeo";
import { Link } from "@/lib/router";
import {
  CheckCircle,
  ChevronRight,
  Globe,
  Phone,
  RefreshCw,
  Shield,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

export default function SolutionsEnterprisePage() {
  useSeo({
    canonical: "https://cybinenterprises.com/solutions/enterprise",
    title: "Enterprise Payment Solutions | Cybin Enterprises",
    description:
      "Enterprise high-risk merchant accounts for businesses processing $250K+ monthly. Multi-MID structuring, international acquiring, backup redundancy, and dedicated account management.",
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
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-8"
            style={{
              backgroundColor: "rgba(201,168,76,0.12)",
              border: "1px solid rgba(201,168,76,0.35)",
              color: "#C9A84C",
            }}
          >
            <Zap size={12} /> Enterprise Accounts
          </div>
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
            High-Volume Merchant Accounts Built for{" "}
            <span style={{ color: "#C9A84C" }}>Scale</span>
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
            For merchants processing $250,000+ monthly. Dedicated review team,
            multi-MID structuring, international acquiring, and backup processor
            redundancy.
          </p>
          <Link
            to="/apply?tier=enterprise"
            data-ocid="enterprise.apply.button"
            className="cybin-btn-blue"
          >
            Request My Enterprise Review <ChevronRight size={15} />
          </Link>
          <p
            style={{
              marginTop: 12,
              fontSize: "0.8rem",
              color: "rgba(155,150,198,0.5)",
            }}
          >
            High-volume accounts receive dedicated review and a direct point of
            contact.
          </p>
        </div>
      </section>

      {/* Features */}
      <section
        style={{
          backgroundColor: isLight ? "#ffffff" : "#0a0f1e",
          padding: "80px 0",
        }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: "2rem",
                fontWeight: 700,
                color: isLight ? "#0a0f1e" : "#E8EDF8",
                marginBottom: 12,
              }}
            >
              What\u2019s Included in Enterprise
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: Users,
                title: "Dedicated Review Team",
                desc: "Your account is reviewed by a dedicated enterprise team \u2014 not a standard underwriter. Volume, industry, and structure are all reviewed personally.",
              },
              {
                icon: RefreshCw,
                title: "Multi-MID Structuring",
                desc: "Multiple merchant IDs across different processors for volume distribution and risk management. Standard for enterprise-level accounts.",
              },
              {
                icon: Globe,
                title: "International Acquiring",
                desc: "Access to international acquiring banks for merchants with cross-border customers and multi-currency needs.",
              },
              {
                icon: Shield,
                title: "Backup Processor Redundancy",
                desc: "Structured backup processing relationships so your business never goes dark if one processor makes changes to terms or policies.",
              },
              {
                icon: TrendingUp,
                title: "Volume Scaling Support",
                desc: "As your volume grows, we manage the account scaling process and help you maintain compliance at every level.",
              },
              {
                icon: Phone,
                title: "Direct Point of Contact",
                desc: "A named contact at Cybin Enterprises who knows your account. Not a ticketing system. Not a shared inbox.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                style={{
                  padding: 28,
                  borderRadius: 14,
                  backgroundColor: isLight
                    ? "#F0F4FF"
                    : "rgba(255,255,255,0.03)",
                  border: `1px solid ${isLight ? "rgba(99,102,241,0.12)" : "rgba(255,255,255,0.07)"}`,
                  display: "flex",
                  gap: 16,
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 10,
                    backgroundColor: "rgba(201,168,76,0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon size={18} style={{ color: "#C9A84C" }} />
                </div>
                <div>
                  <h3
                    style={{
                      fontWeight: 700,
                      color: isLight ? "#0a0f1e" : "#E8EDF8",
                      marginBottom: 6,
                    }}
                  >
                    {title}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: isLight ? "rgba(10,22,40,0.65)" : "#D4E0F5",
                      lineHeight: 1.65,
                    }}
                  >
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Qualification */}
      <section
        style={{
          backgroundColor: isLight ? "#F0F4FF" : "#110F22",
          padding: "60px 0",
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2
                style={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontSize: "1.75rem",
                  fontWeight: 700,
                  color: isLight ? "#0a0f1e" : "#E8EDF8",
                  marginBottom: 16,
                }}
              >
                Enterprise Qualification
              </h2>
              <p
                style={{
                  color: isLight ? "rgba(10,22,40,0.7)" : "#D4E0F5",
                  lineHeight: 1.75,
                  marginBottom: 20,
                }}
              >
                Enterprise review is appropriate for merchants who meet one or
                more of these criteria:
              </p>
              {[
                "Processing $250,000+ monthly or targeting that volume",
                "Needing multiple merchant IDs for volume distribution",
                "Operating across multiple jurisdictions or internationally",
                "Requiring backup processor redundancy for business continuity",
                "High-volume recurring billing or subscription models",
              ].map((item) => (
                <div key={item} className="flex gap-3 mb-3">
                  <CheckCircle
                    size={16}
                    style={{ color: "#00d4b8", flexShrink: 0, marginTop: 2 }}
                  />
                  <p
                    style={{
                      fontSize: "0.9rem",
                      color: isLight
                        ? "rgba(10,22,40,0.75)"
                        : "rgba(232,240,255,0.75)",
                      lineHeight: 1.6,
                    }}
                  >
                    {item}
                  </p>
                </div>
              ))}
            </div>
            <div
              style={{
                padding: 32,
                borderRadius: 16,
                background:
                  "linear-gradient(135deg, rgba(201,168,76,0.08), rgba(99,102,241,0.05))",
                border: "1px solid rgba(201,168,76,0.25)",
              }}
            >
              <h3
                style={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontSize: "1.3rem",
                  fontWeight: 700,
                  color: isLight ? "#0a0f1e" : "#E8EDF8",
                  marginBottom: 12,
                }}
              >
                Ready to Get Started?
              </h3>
              <p
                style={{
                  color: isLight ? "rgba(10,22,40,0.65)" : "#D4E0F5",
                  lineHeight: 1.7,
                  fontSize: "0.9rem",
                  marginBottom: 24,
                }}
              >
                Our enterprise team will contact you directly \u2014 not an
                automated system \u2014 within one business day to discuss your
                account structure.
              </p>
              <Link
                to="/apply?tier=enterprise"
                data-ocid="enterprise.final.button"
                className="cybin-btn-blue"
                style={{ width: "100%", justifyContent: "center" }}
              >
                Request My Enterprise Review <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
