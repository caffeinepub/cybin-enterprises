import NeuronCanvas from "@/components/NeuronCanvas";
import { useTheme } from "@/contexts/ThemeContext";
import { useLiveSiteSettings } from "@/hooks/useLiveSiteSettings";
import { useSeo } from "@/hooks/useSeo";
import { Link } from "@/lib/router";
import {
  AlertTriangle,
  CheckCircle,
  ChevronRight,
  FileX,
  Globe,
  Landmark,
  Layers,
  Lock,
  Scale,
  Shield,
  XCircle,
  Zap,
} from "lucide-react";

// Comprehensive industry list
const ALL_INDUSTRIES = [
  "Research Peptides",
  "CBD & Botanicals",
  "Cannabis (state-legal)",
  "Firearms & Ammunition",
  "Online Gaming & iGaming",
  "Nutraceuticals & Supplements",
  "Kratom & Ethnobotanicals",
  "Telemedicine & Digital Health",
  "E-Cigarettes & Vaping",
  "Debt Collection",
  "Subscription Businesses",
  "Travel & Timeshare",
  "High-Volume E-Commerce",
  "Firearms Parts & Accessories",
  "Adult Entertainment",
  "Dating & Relationship Apps",
  "Pawn Shops & Secondhand",
  "Check Cashing & Money Services",
  "Bail Bonds",
  "Moving & Relocation",
  "Ticket Brokers & Resellers",
  "Auction Houses",
  "Tobacco & Cigars",
  "Dietary Supplements",
  "Herbal Remedies",
  "Essential Oils & Aromatherapy",
  "Crystals & New Age",
  "Coaching & Consulting",
  "Business Opportunity & MLM",
  "Lead Generation",
  "Affiliate Marketing",
  "Credit Repair & Counseling",
  "Debt Settlement",
  "Loan Brokerage",
  "Financial Education",
  "Cryptocurrency & NFTs",
  "Forex & Trading Education",
  "Insurance Lead Generation",
  "Telemarketing",
  "Continuity Programs",
  "Online Pharmacy",
  "Pet Medications",
  "Compounding Pharmacy",
  "Medical Devices",
  "Laboratory Equipment",
  "Research Chemicals",
  "Mushrooms & Spores",
  "Seeds & Clones",
  "Hemp Products",
  "Firearms Training",
  "Security Services",
  "Private Investigation",
  "Background Checks",
  "Alcohol & Spirits",
  "Wine Subscription",
  "Hunting & Outdoor Sports",
  "Martial Arts Supplies",
  "Tattoo & Body Modification",
  "Auto Warranties",
  "Rental Car & Peer-to-Peer",
  "Luxury Goods Resale",
  "Electronics Resale",
  "Software Licensing",
  "Digital Downloads",
  "Online Courses & Coaching",
  "High-Value Jewelry",
  "Rare Coins & Precious Metals",
  "Legal Services",
  "Nonprofit Fundraising",
  "Weight Loss Programs",
  "Cosmetic Procedures",
  "Anti-Aging Clinics",
  "Skin Care & Aesthetics",
  "Compounded Medications",
  "Animal Health Products",
  "Exotic Pet Sales",
  "Adventure Tourism",
  "Extreme Sports Equipment",
  "Other High-Risk",
];

const painPoints = [
  {
    icon: XCircle,
    headline: "Account Terminated.",
    copy: "Your processor shut you down without warning. We’ve seen it happen thousands of times — and we know exactly how to respond.",
  },
  {
    icon: FileX,
    headline: "Application Rejected.",
    copy: "Stripe, PayPal, Square — they’re not built for your industry. We are. Rejection from them is not a verdict on your business.",
  },
  {
    icon: Lock,
    headline: "Reserves Holding Your Cash.",
    copy: "Rolling reserves don’t have to be permanent. We structure accounts that reduce reserve requirements as your account history builds.",
  },
  {
    icon: Globe,
    headline: "International Sales Blocked.",
    copy: "Global customers are ready to buy. Your payment processor shouldn’t be the reason they can’t reach checkout.",
  },
  {
    icon: AlertTriangle,
    headline: "Chargeback Pressure.",
    copy: "High chargeback ratios don’t have to end your processing. We build chargeback protection and dispute support into every account structure.",
  },
  {
    icon: Scale,
    headline: "Compliance Uncertainty.",
    copy: "Operating in a regulated vertical? We understand the compliance landscape and structure your account accordingly.",
  },
];

const steps = [
  {
    n: "1",
    headline: "Tell Us Your Situation",
    copy: "Free, secure, and no commitment. Tell us your industry, your monthly volume, and what’s gone wrong — or what you’re trying to build.",
  },
  {
    n: "2",
    headline: "We Structure Your Options",
    copy: "We match your business to the best-fit processors across our network. You see your options before anything is submitted — no surprises.",
  },
  {
    n: "3",
    headline: "Application & Approval",
    copy: "We manage the full application process. Approvals typically take 3 to 10 business days depending on your volume and vertical.",
  },
  {
    n: "4",
    headline: "Process With Confidence",
    copy: "Ongoing account monitoring, chargeback support, and scaling assistance as your business grows. We don’t disappear after approval.",
  },
];

const industryTiles = [
  { label: "Cannabis & CBD", href: "/industries/cannabis-cbd", icon: "🌿" },
  {
    label: "Firearms & Ammo",
    href: "/industries/firearms-ammunition",
    icon: "🎯",
  },
  {
    label: "Nutraceuticals",
    href: "/industries/nutraceuticals-supplements",
    icon: "💊",
  },
  {
    label: "Telemedicine",
    href: "/industries/telemedicine-healthcare",
    icon: "⚕️",
  },
  { label: "Online Gaming", href: "/industries/online-gaming", icon: "🎮" },
  {
    label: "E-Cigarettes",
    href: "/industries/e-cigarettes-vaping",
    icon: "💨",
  },
  {
    label: "Kratom & Spores",
    href: "/industries/kratom-spores-ethnobotanicals",
    icon: "🌱",
  },
  { label: "Debt Collection", href: "/industries/debt-collection", icon: "📋" },
  {
    label: "Subscription",
    href: "/industries/subscription-businesses",
    icon: "♻️",
  },
  {
    label: "Travel & Timeshare",
    href: "/industries/travel-timeshare",
    icon: "✈️",
  },
  { label: "Peptides", href: "/industries/peptides", icon: "🔬" },
  { label: "View All", href: "/industries", icon: "→" },
];

const testimonials = [
  {
    tag: "NUTRACEUTICALS",
    problem:
      "We were processing $280K/month when our processor terminated us without warning, citing chargeback ratios that never exceeded 0.8%.",
    outcome:
      "Cybin had us approved with a new processor in 9 days. Rates were competitive and we haven’t had an issue since.",
    attribution: "Michael T., Ohio",
  },
  {
    tag: "CBD & BOTANICALS",
    problem:
      "PayPal shut us down on a Friday afternoon with 48 hours notice. We had no backup and $60K in pending orders.",
    outcome:
      "Cybin found us a domestic processor and had us live again in under two weeks. We’ve been processing without issue for eight months.",
    attribution: "Verified Merchant — CBD & Botanicals",
  },
  {
    tag: "FIREARMS",
    problem:
      "Two processors terminated us in the same quarter — both citing ‘policy changes’ with no explanation.",
    outcome:
      "Cybin structured a dual-processor setup that’s given us redundancy we never had before. Best decision we made.",
    attribution: "James R., Texas",
  },
];

export default function HomePage() {
  const _site = useLiveSiteSettings();
  const { resolved } = useTheme();
  const isLight = resolved === "light";

  useSeo({
    canonical: "https://cybinenterprises.com/",
    title:
      "High-Risk Merchant Accounts | Payment Solutions for Every Industry | Cybin Enterprises",
    description:
      "Cybin Enterprises structures high-risk merchant accounts for businesses in 100+ industries — from CBD and firearms to peptides and enterprise e-commerce. Free account review, no commitment.",
  });

  const accentColor = isLight ? "#7c5cbf" : "#00d4b8";
  const textPrimary = isLight ? "#0a0f1e" : "#E8EDF8";
  const textSecondary = isLight
    ? "rgba(10,22,40,0.65)"
    : "rgba(232,245,242,0.8)";
  const bgPrimary = isLight ? "#ffffff" : "#0a0f1e";
  const bgSecondary = isLight ? "#F0F4FF" : "#110F22";
  const cardBg = isLight ? "rgba(240,244,255,0.8)" : "rgba(255,255,255,0.03)";
  const cardBorder = isLight
    ? "rgba(99,102,241,0.12)"
    : "rgba(255,255,255,0.07)";

  return (
    <div>
      {/* ── Hero ───────────────────────────────────────────── */}
      <section
        style={{
          background: "#0a0f1e",
          position: "relative",
          overflow: "hidden",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <NeuronCanvas mode="dark" />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 80% 60% at 30% 50%, rgba(99,102,241,0.1) 0%, transparent 60%)",
            pointerEvents: "none",
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left column */}
            <div>
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-8"
                style={{
                  backgroundColor: "rgba(99,102,241,0.12)",
                  border: "1px solid rgba(99,102,241,0.3)",
                  color: "rgba(232,245,242,0.8)",
                }}
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    backgroundColor: "#00d4b8",
                    display: "inline-block",
                    animation: "pulse 2s infinite",
                  }}
                />
                High-Risk Payment Specialists
              </div>
              <h1
                style={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
                  fontWeight: 700,
                  color: "#E8EDF8",
                  lineHeight: 1.15,
                  marginBottom: 24,
                }}
              >
                Your processor shut you down.{" "}
                <span style={{ color: "#00d4b8" }}>We get you approved.</span>
              </h1>
              <p
                style={{
                  fontSize: "1.1rem",
                  color: "rgba(232,245,242,0.8)",
                  lineHeight: 1.7,
                  marginBottom: 32,
                  maxWidth: 520,
                }}
              >
                Cybin Enterprises structures domestic and international merchant
                accounts for high-risk businesses — from startups processing
                their first transaction to enterprises handling millions
                monthly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Link
                  to="/apply"
                  data-ocid="hero.primary.button"
                  className="cybin-btn-blue"
                >
                  Get a Free Account Review <ChevronRight size={15} />
                </Link>
                <Link
                  to="/industries"
                  data-ocid="hero.secondary.button"
                  className="cybin-btn-ghost-white"
                >
                  See All Industries
                </Link>
              </div>
              <div
                className="flex items-center gap-2"
                style={{ color: "rgba(232,245,242,0.45)", fontSize: "0.78rem" }}
              >
                <Lock size={12} style={{ color: "#00d4b8" }} />
                No commitment. Secure. Reviewed within 24 hours.
              </div>
            </div>
            {/* Right column — abstract tech visual */}
            <div className="hidden lg:flex items-center justify-center">
              <div
                style={{
                  position: "relative",
                  width: 400,
                  height: 400,
                }}
              >
                {/* Outer ring */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "50%",
                    border: "1px solid rgba(99,102,241,0.15)",
                    animation: "spin 20s linear infinite",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 24,
                    borderRadius: "50%",
                    border: "1px solid rgba(99,102,241,0.2)",
                    animation: "spin 15s linear infinite reverse",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 48,
                    borderRadius: "50%",
                    border: "1px solid rgba(99,102,241,0.3)",
                  }}
                />
                {/* Center glow */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      width: 140,
                      height: 140,
                      borderRadius: "50%",
                      background:
                        "radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #7c5cbf, #00d4b8)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 0 40px rgba(99,102,241,0.5)",
                      }}
                    >
                      <Shield size={36} style={{ color: "white" }} />
                    </div>
                  </div>
                </div>
                {/* Orbiting dots */}
                {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                  <div
                    key={deg}
                    style={{
                      position: "absolute",
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      backgroundColor: i % 2 === 0 ? "#7c5cbf" : "#00d4b8",
                      top: `calc(50% + ${176 * Math.sin((deg * Math.PI) / 180)}px - 5px)`,
                      left: `calc(50% + ${176 * Math.cos((deg * Math.PI) / 180)}px - 5px)`,
                      boxShadow: `0 0 12px ${i % 2 === 0 ? "rgba(99,102,241,0.8)" : "rgba(52,211,153,0.8)"}`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Trust bar */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            borderTop: "1px solid rgba(255,255,255,0.06)",
            backgroundColor: "rgba(15,32,64,0.5)",
            backdropFilter: "blur(8px)",
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div
              className="flex flex-wrap justify-center gap-6 text-xs"
              style={{ color: "rgba(232,245,242,0.45)" }}
            >
              {[
                "Access to multiple acquiring banks & processors",
                "100+ industries served",
                "Domestic & international accounts",
                "Free to apply — no obligation",
              ].map((item, i) => (
                <span key={item} className="flex items-center gap-2">
                  {i > 0 && (
                    <span style={{ color: "rgba(255,255,255,0.15)" }}>|</span>
                  )}
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Industry Ticker ──────────────────────────────────── */}
      <section
        style={{
          backgroundColor: isLight ? "#eef1f8" : "#0c1020",
          padding: "80px 0",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <div className="text-center">
            <span
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: accentColor }}
            >
              Industries
            </span>
            <h2
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                fontWeight: 700,
                color: textPrimary,
                marginTop: 12,
                marginBottom: 12,
              }}
            >
              If Banks Said No,{" "}
              <span style={{ color: accentColor }}>We Say Yes</span>
            </h2>
            <p
              style={{ color: textSecondary, maxWidth: 600, margin: "0 auto" }}
            >
              Cybin Enterprises works with businesses across every industry —
              including those labeled high-risk, hard-to-place, or previously
              declined.
            </p>
          </div>
        </div>

        {/* Scrolling ticker */}
        <div
          style={{
            overflow: "hidden",
            position: "relative",
            padding: "12px 0",
            borderTop: `1px solid ${cardBorder}`,
            borderBottom: `1px solid ${cardBorder}`,
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: 80,
              zIndex: 2,
              background: isLight
                ? "linear-gradient(to right, #eef1f8, transparent)"
                : "linear-gradient(to right, #0c1020, transparent)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              bottom: 0,
              width: 80,
              zIndex: 2,
              background: isLight
                ? "linear-gradient(to left, #eef1f8, transparent)"
                : "linear-gradient(to left, #0c1020, transparent)",
              pointerEvents: "none",
            }}
          />
          <div className="ticker-track">
            {[
              ...ALL_INDUSTRIES.map((ind) => ({ label: ind, key: `a-${ind}` })),
              ...ALL_INDUSTRIES.map((ind) => ({ label: ind, key: `b-${ind}` })),
            ].map(({ label, key }) => (
              <div
                key={key}
                className="inline-flex items-center gap-2 px-5 py-2.5 mx-2 rounded-full text-sm font-medium flex-shrink-0"
                style={{
                  backgroundColor: isLight
                    ? "rgba(99,102,241,0.06)"
                    : "rgba(99,102,241,0.08)",
                  border: `1px solid ${isLight ? "rgba(99,102,241,0.15)" : "rgba(99,102,241,0.2)"}`,
                  color: textSecondary,
                  whiteSpace: "nowrap",
                }}
              >
                <span style={{ color: accentColor, fontSize: 8 }}>◆</span>
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pain Points ──────────────────────────────────────── */}
      <section style={{ backgroundColor: bgPrimary, padding: "80px 0" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: accentColor }}
            >
              Common Situations
            </span>
            <h2
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                fontWeight: 700,
                color: textPrimary,
                marginTop: 12,
                marginBottom: 12,
              }}
            >
              We’ve Seen Every Problem. We Know Every Solution.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {painPoints.map(({ icon: Icon, headline, copy }, i) => (
              <div
                key={headline}
                className={`animate-fade-rise${i > 0 ? ` animate-delay-${i * 80}` : ""}`}
                style={{
                  padding: 28,
                  borderRadius: 16,
                  backgroundColor: isLight ? "#F0F4FF" : "#110F22",
                  border: `1px solid ${cardBorder}`,
                  transition: "border-color 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor =
                    "rgba(99,102,241,0.35)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    "0 0 20px rgba(99,102,241,0.12)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor =
                    cardBorder;
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    backgroundColor: "rgba(99,102,241,0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 16,
                  }}
                >
                  <Icon size={18} style={{ color: "rgba(232,245,242,0.8)" }} />
                </div>
                <h3
                  style={{
                    fontFamily: '"Playfair Display", Georgia, serif',
                    fontSize: "1.15rem",
                    fontWeight: 700,
                    color: textPrimary,
                    marginBottom: 10,
                  }}
                >
                  {headline}
                </h3>
                <p
                  style={{
                    color: textSecondary,
                    fontSize: "0.875rem",
                    lineHeight: 1.7,
                  }}
                >
                  {copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: bgSecondary,
          padding: "80px 0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {!isLight && <NeuronCanvas mode="dark" />}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <span
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: accentColor }}
            >
              Process
            </span>
            <h2
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                fontWeight: 700,
                color: textPrimary,
                marginTop: 12,
              }}
            >
              How We Get You Approved
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Connecting line (desktop) */}
            <div
              className="hidden lg:block absolute top-8 left-0 right-0 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(99,102,241,0.3), transparent)",
              }}
            />
            {steps.map(({ n, headline, copy }, i) => (
              <div
                key={n}
                className={`animate-fade-rise${i > 0 ? ` animate-delay-${i * 80}` : ""}`}
                style={{
                  padding: 24,
                  borderRadius: 14,
                  backgroundColor: cardBg,
                  border: `1px solid ${cardBorder}`,
                  position: "relative",
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #7c5cbf, #00d4b8)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 800,
                    color: "white",
                    fontSize: "0.875rem",
                    marginBottom: 16,
                    position: "relative",
                    zIndex: 1,
                    boxShadow: "0 0 16px rgba(99,102,241,0.35)",
                  }}
                >
                  {n}
                </div>
                <h3
                  style={{
                    fontWeight: 700,
                    color: textPrimary,
                    marginBottom: 8,
                    fontSize: "1rem",
                  }}
                >
                  {headline}
                </h3>
                <p
                  style={{
                    color: textSecondary,
                    fontSize: "0.85rem",
                    lineHeight: 1.7,
                  }}
                >
                  {copy}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/how-it-works"
              data-ocid="howitworks.link.button"
              style={{
                color: accentColor,
                fontSize: "0.9rem",
                fontWeight: 600,
              }}
            >
              Learn more about our process →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Industry Grid ──────────────────────────────────── */}
      <section style={{ backgroundColor: bgPrimary, padding: "80px 0" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: accentColor }}
            >
              Common Industries
            </span>
            <h2
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                fontWeight: 700,
                color: textPrimary,
                marginTop: 12,
              }}
            >
              Industries We Serve
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {industryTiles.map(({ label, href, icon }) => (
              <Link
                key={href}
                to={href}
                data-ocid={`industries.item.${label === "View All" ? "link" : "1"}`}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 8,
                  padding: "20px 12px",
                  borderRadius: 12,
                  backgroundColor: cardBg,
                  border: `1px solid ${cardBorder}`,
                  textDecoration: "none",
                  transition:
                    "transform 0.2s, border-color 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.transform =
                    "scale(1.03)";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor =
                    "rgba(99,102,241,0.4)";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                    "0 4px 20px rgba(99,102,241,0.12)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.transform =
                    "scale(1)";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor =
                    cardBorder;
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                    "none";
                }}
              >
                <span style={{ fontSize: "1.5rem" }}>{icon}</span>
                <span
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: textPrimary,
                    textAlign: "center",
                    lineHeight: 1.3,
                  }}
                >
                  {label}
                </span>
              </Link>
            ))}
          </div>
          <p className="text-center mt-6">
            <Link
              to="/industries"
              data-ocid="industries.all.link"
              style={{ color: accentColor, fontWeight: 600 }}
            >
              View All 100+ Industries →
            </Link>
          </p>
        </div>
      </section>

      {/* ── Enterprise Callout ───────────────────────────────── */}
      <section
        style={{
          background: "#0a0f1e",
          padding: "80px 0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <NeuronCanvas mode="dark" />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(99,102,241,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
          <h2
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: 700,
              color: "#E8EDF8",
              marginBottom: 20,
            }}
          >
            Processing millions per month?{" "}
            <span style={{ color: "#00d4b8" }}>
              We build accounts that scale.
            </span>
          </h2>
          <p
            style={{
              color: "rgba(232,245,242,0.8)",
              lineHeight: 1.75,
              marginBottom: 32,
              fontSize: "1rem",
            }}
          >
            From multi-MID structuring to international acquiring and backup
            processor redundancy, Cybin Enterprises supports high-volume
            merchants who need stability and reliability — not surprises. Our
            enterprise team reviews large-volume accounts personally.
          </p>
          <Link
            to="/apply/enterprise"
            data-ocid="enterprise.callout.button"
            className="cybin-btn-blue"
          >
            Request a Volume Review <ChevronRight size={15} />
          </Link>
          <p
            style={{
              marginTop: 12,
              fontSize: "0.8rem",
              color: "rgba(232,245,242,0.45)",
            }}
          >
            High-volume accounts receive dedicated review and a direct point of
            contact.
          </p>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────── */}
      <section style={{ backgroundColor: bgPrimary, padding: "80px 0" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: accentColor }}
            >
              Results
            </span>
            <h2
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                fontWeight: 700,
                color: textPrimary,
                marginTop: 12,
              }}
            >
              Merchants We’ve Helped
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Metric block 1 */}
            <div
              style={{
                padding: 28,
                borderRadius: 16,
                backgroundColor: cardBg,
                border: "1px solid rgba(201,168,76,0.2)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontSize: "2.5rem",
                  fontWeight: 800,
                  color: "#C9A84C",
                  fontFamily: '"Playfair Display", Georgia, serif',
                  marginBottom: 8,
                }}
              >
                $240M+
              </p>
              <p style={{ color: textSecondary, fontSize: "0.9rem" }}>
                processed across our merchant network
              </p>
              <p
                style={{
                  color: textSecondary,
                  fontSize: "0.75rem",
                  marginTop: 8,
                  fontStyle: "italic",
                }}
              >
                [PLACEHOLDER — replace with real figure]
              </p>
            </div>

            {testimonials.map(({ tag, problem, outcome, attribution }) => (
              <div
                key={tag}
                style={{
                  padding: 28,
                  borderRadius: 16,
                  backgroundColor: cardBg,
                  border: `1px solid ${cardBorder}`,
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    fontSize: "0.65rem",
                    fontWeight: 800,
                    letterSpacing: "0.12em",
                    color: "#C9A84C",
                    textTransform: "uppercase",
                    marginBottom: 12,
                    padding: "4px 10px",
                    borderRadius: 6,
                    backgroundColor: "rgba(201,168,76,0.1)",
                    border: "1px solid rgba(201,168,76,0.25)",
                  }}
                >
                  {tag}
                </span>
                <p
                  style={{
                    color: textSecondary,
                    fontSize: "0.875rem",
                    lineHeight: 1.65,
                    marginBottom: 12,
                    fontStyle: "italic",
                  }}
                >
                  “{problem}”
                </p>
                <p
                  style={{
                    color: textPrimary,
                    fontSize: "0.875rem",
                    lineHeight: 1.65,
                    marginBottom: 16,
                  }}
                >
                  “{outcome}”
                </p>
                <p
                  style={{
                    color: accentColor,
                    fontSize: "0.8rem",
                    fontWeight: 600,
                  }}
                >
                  — {attribution}
                </p>
              </div>
            ))}

            {/* Metric block 2 */}
            <div
              style={{
                padding: 28,
                borderRadius: 16,
                backgroundColor: cardBg,
                border: "1px solid rgba(201,168,76,0.2)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontSize: "2.5rem",
                  fontWeight: 800,
                  color: "#C9A84C",
                  fontFamily: '"Playfair Display", Georgia, serif',
                  marginBottom: 8,
                }}
              >
                7 Days
              </p>
              <p style={{ color: textSecondary, fontSize: "0.9rem" }}>
                average approval timeline
              </p>
              <p
                style={{
                  color: textSecondary,
                  fontSize: "0.75rem",
                  marginTop: 8,
                  fontStyle: "italic",
                }}
              >
                [PLACEHOLDER — replace with real figure]
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────── */}
      <section
        style={{
          background: "#0a0f1e",
          padding: "80px 0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <NeuronCanvas mode="dark" />
        <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
          <h2
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: 700,
              color: "#E8EDF8",
              marginBottom: 16,
            }}
          >
            Ready to Get <span style={{ color: "#00d4b8" }}>Approved?</span>
          </h2>
          <p style={{ color: "rgba(232,245,242,0.8)", marginBottom: 32 }}>
            Free review, no commitment. A real person reviews your situation
            within 24 hours.
          </p>
          <Link
            to="/apply"
            data-ocid="final.apply.button"
            className="cybin-btn-blue"
          >
            Get a Free Account Review <ChevronRight size={15} />
          </Link>
        </div>
      </section>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
