import NeuronCanvas from "@/components/NeuronCanvas";
import { useTheme } from "@/contexts/ThemeContext";
import { useSeo } from "@/hooks/useSeo";
import { Link } from "@/lib/router";
import {
  ChevronRight,
  Globe,
  RefreshCw,
  Shield,
  TrendingDown,
  TrendingUp,
  Zap,
} from "lucide-react";

const solutions = [
  {
    icon: Shield,
    title: "High-Risk Merchant Accounts",
    desc: "Full merchant account approval for businesses in 100+ high-risk verticals. We work across a network of acquiring banks to find the best fit for your industry and volume.",
    cta: "Apply Now",
    href: "/apply",
  },
  {
    icon: TrendingUp,
    title: "Enterprise Accounts",
    desc: "For merchants processing $250K+ monthly. Dedicated underwriting team, multi-MID structuring, backup processor redundancy, and a direct point of contact.",
    cta: "Enterprise Review",
    href: "/apply/enterprise",
  },
  {
    icon: Globe,
    title: "International Processing",
    desc: "Access to international acquiring banks for merchants with cross-border customers. Domestic and international account structures available.",
    cta: "Learn More",
    href: "/apply",
  },
  {
    icon: TrendingDown,
    title: "Chargeback Protection",
    desc: "Dispute management tools, early alert systems, and chargeback mitigation strategies built into every account structure. Protect your processing ratios.",
    cta: "Get Protected",
    href: "/apply",
  },
  {
    icon: RefreshCw,
    title: "Multi-MID Structuring",
    desc: "Multiple merchant IDs across different processors for volume distribution and risk management. Essential for high-volume merchants who need redundancy.",
    cta: "Explore Options",
    href: "/apply/enterprise",
  },
  {
    icon: Zap,
    title: "Backup Processor Redundancy",
    desc: "No single point of failure. We structure backup processing relationships so your business never goes dark if one processor makes changes.",
    cta: "Get Redundancy",
    href: "/apply/enterprise",
  },
];

export default function SolutionsPage() {
  useSeo({
    canonical: "https://cybinenterprises.com/solutions",
    title: "Payment Solutions | Cybin Enterprises",
    description:
      "High-risk merchant accounts, enterprise processing, international acquiring, chargeback protection, and multi-MID structuring. Solutions for every high-risk business type.",
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
            Payment Solutions Built for{" "}
            <span style={{ color: "#7c5cbf" }}>Every High-Risk Vertical</span>
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
            From standard high-risk merchant accounts to enterprise multi-MID
            structures \u2014 we match the solution to your business.
          </p>
          <Link
            to="/apply"
            data-ocid="solutions.apply.button"
            className="cybin-btn-blue"
          >
            Get a Free Account Review <ChevronRight size={15} />
          </Link>
        </div>
      </section>

      {/* Solutions grid */}
      <section
        style={{
          backgroundColor: isLight ? "#ffffff" : "#0a0f1e",
          padding: "80px 0",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutions.map(({ icon: Icon, title, desc, cta, href }, i) => (
              <div
                key={title}
                className={`animate-fade-rise animate-delay-${(i % 5) * 80}`}
                style={{
                  padding: 32,
                  borderRadius: 16,
                  backgroundColor: isLight
                    ? "#F0F4FF"
                    : "rgba(255,255,255,0.03)",
                  border: `1px solid ${isLight ? "rgba(99,102,241,0.12)" : "rgba(255,255,255,0.07)"}`,
                  transition: "border-color 0.2s, box-shadow 0.2s",
                  display: "flex",
                  flexDirection: "column",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor =
                    "rgba(99,102,241,0.35)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    "0 4px 24px rgba(99,102,241,0.12)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor =
                    isLight
                      ? "rgba(99,102,241,0.12)"
                      : "rgba(255,255,255,0.07)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    backgroundColor: "rgba(99,102,241,0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 16,
                  }}
                >
                  <Icon size={22} style={{ color: "#D4E0F5" }} />
                </div>
                <h3
                  style={{
                    fontFamily: '"Playfair Display", Georgia, serif',
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    color: isLight ? "#0a0f1e" : "#E8EDF8",
                    marginBottom: 12,
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    color: isLight ? "rgba(10,22,40,0.65)" : "#D4E0F5",
                    lineHeight: 1.7,
                    fontSize: "0.9rem",
                    flex: 1,
                  }}
                >
                  {desc}
                </p>
                <Link
                  to={href}
                  data-ocid={`solutions.item.${i + 1}`}
                  className="cybin-btn-blue"
                  style={{ marginTop: 20, justifyContent: "center" }}
                >
                  {cta} <ChevronRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise callout */}
      <section
        style={{
          background: "#0a0f1e",
          padding: "80px 0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <NeuronCanvas mode="dark" />
        <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
          <h2
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: "2rem",
              fontWeight: 700,
              color: "#E8EDF8",
              marginBottom: 16,
            }}
          >
            Processing millions per month? We build accounts that scale.
          </h2>
          <p style={{ color: "#D4E0F5", lineHeight: 1.7, marginBottom: 32 }}>
            Our enterprise team personally reviews high-volume accounts.
            Multi-MID structuring, international acquiring, and backup
            redundancy \u2014 built for stability at scale.
          </p>
          <Link
            to="/solutions/enterprise"
            data-ocid="solutions.enterprise.button"
            className="cybin-btn-blue"
          >
            Explore Enterprise Solutions <ChevronRight size={15} />
          </Link>
        </div>
      </section>
    </div>
  );
}
