import NeuronCanvas from "@/components/NeuronCanvas";
import TickerBar from "@/components/TickerBar";
import { Link, useSearchParams } from "@/lib/router";
import {
  CheckCircle,
  ChevronRight,
  Clock,
  Globe,
  Lock,
  Shield,
  Zap,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useActor } from "../../hooks/useActor";

// ─── Types ─────────────────────────────────────────────────────────────────────

type NewStep = 1 | 2 | 3 | "reviewing" | "success";

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
  "Crystals & New Age Products",
  "Psychic & Spiritual Services",
  "Coaching & Life Consulting",
  "Business Opportunity & MLM",
  "Work From Home Programs",
  "Lead Generation",
  "Affiliate Marketing",
  "Credit Repair & Counseling",
  "Debt Settlement",
  "Loan Brokerage",
  "Financial Education",
  "Cryptocurrency & NFTs",
  "Forex & Trading Education",
  "Investment Newsletters",
  "Insurance Lead Generation",
  "Telemarketing",
  "Continuity Programs",
  "Free Trial Marketing",
  "Infomercial & DRTV",
  "Online Pharmacy (non-controlled)",
  "Pet Medications",
  "Compounding Pharmacy",
  "Medical Devices",
  "Laboratory Equipment",
  "Research Chemicals (compliant)",
  "Mushrooms & Spores",
  "Seeds & Clones",
  "Legal Cannabis Accessories",
  "Hemp Products",
  "Firearms Training & Safety",
  "Security Services",
  "Private Investigation",
  "Bail Recovery",
  "Process Serving",
  "Background Checks",
  "Alcohol & Spirits (online)",
  "Cigar Clubs",
  "Wine Subscription",
  "Hunting & Outdoor Sports",
  "Archery & Shooting Sports",
  "Martial Arts Supplies",
  "Tattoo & Body Modification",
  "Body Jewelry",
  "Vehicle Accessories",
  "Auto Warranties (aftermarket)",
  "Extended Service Contracts",
  "Rental Car & Peer-to-Peer Car",
  "Luxury Goods Resale",
  "Electronics Resale",
  "Software Licensing",
  "Digital Downloads",
  "Online Courses & Coaching",
  "Webinars & Masterclasses",
  "High-Value Jewelry",
  "Rare Coins & Precious Metals",
  "Legal Services",
  "Charitable Organizations",
  "Nonprofit Fundraising",
  "Political Campaigns",
  "Religious Organizations",
  "Weight Loss Programs",
  "Cosmetic Procedures",
  "Stem Cell Therapy",
  "Hormone Replacement",
  "Anti-Aging Clinics",
  "Skin Care & Aesthetics",
  "Hair Restoration",
  "Tattoo Removal",
  "Compounded Medications",
  "Specialty Pharmaceuticals",
  "Animal Health Products",
  "Veterinary Compounding",
  "Exotic Pet Sales",
  "Hunting Outfitters",
  "Fishing Charters",
  "Adventure Tourism",
  "High-Risk Sports",
  "Extreme Sports Equipment",
  "Firearms Instruction",
  "Concealed Carry Training",
  "Other",
];

// ─── Field styles ───────────────────────────────────────────────────────────────

const fieldBase: React.CSSProperties = {
  width: "100%",
  padding: "13px 16px",
  borderRadius: 10,
  border: "1px solid rgba(255,255,255,0.1)",
  backgroundColor: "rgba(255,255,255,0.05)",
  color: "#e8edf8",
  fontSize: "0.9rem",
  fontFamily: '"DM Sans", "Cabinet Grotesk", sans-serif',
  outline: "none",
  transition: "border-color 0.2s, background-color 0.2s, box-shadow 0.2s",
  boxSizing: "border-box" as const,
};

function applyFocusStyle(el: HTMLInputElement | HTMLSelectElement) {
  el.style.borderColor = "rgba(77,163,255,0.6)";
  el.style.backgroundColor = "rgba(110,247,212,0.05)";
  el.style.boxShadow = "0 0 0 3px rgba(110,247,212,0.15)";
}
function removeFocusStyle(el: HTMLInputElement | HTMLSelectElement) {
  el.style.borderColor = "rgba(255,255,255,0.1)";
  el.style.backgroundColor = "rgba(255,255,255,0.05)";
  el.style.boxShadow = "none";
}

function FieldLabel({
  label,
  completed,
}: { label: string; completed?: boolean }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 6,
      }}
    >
      <span
        style={{
          fontSize: "0.82rem",
          fontWeight: 600,
          color: "rgba(232,240,255,0.7)",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
        }}
      >
        {label}
      </span>
      {completed && (
        <CheckCircle
          size={14}
          style={{ color: "#00d4b8", animation: "scaleIn 0.3s ease" }}
        />
      )}
    </div>
  );
}

// ─── Progress Bar ───────────────────────────────────────────────────────────────

function ProgressBar({ pct }: { pct: number }) {
  return (
    <div data-ocid="apply.progress.panel" style={{ marginBottom: 28 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        <span
          style={{
            fontSize: "0.65rem",
            fontWeight: 700,
            color: "rgba(232,240,255,0.45)",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}
        >
          Application Progress
        </span>
        <span
          style={{
            fontSize: "0.8rem",
            fontWeight: 700,
            color: "rgba(232,245,242,0.8)",
          }}
        >
          {pct}%
        </span>
      </div>
      <div
        style={{
          height: 6,
          borderRadius: 3,
          backgroundColor: "rgba(255,255,255,0.08)",
        }}
      >
        <div
          style={{
            height: "100%",
            borderRadius: 3,
            background: "linear-gradient(90deg, #00d4b8, #00b89e)",
            width: `${pct}%`,
            transition: "width 0.6s cubic-bezier(0.4,0,0.2,1)",
            boxShadow: "0 0 8px rgba(110,247,212,0.4)",
          }}
        />
      </div>
    </div>
  );
}

// ─── Step Completion Tag ────────────────────────────────────────────────────────

function StepCompletedTag({ label }: { label: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        padding: "6px 12px",
        borderRadius: 8,
        backgroundColor: "rgba(52,211,153,0.1)",
        border: "1px solid rgba(52,211,153,0.25)",
        marginBottom: 8,
      }}
    >
      <CheckCircle size={13} style={{ color: "#00d4b8" }} />
      <span style={{ fontSize: "0.78rem", color: "#00d4b8", fontWeight: 600 }}>
        {label} — complete
      </span>
    </div>
  );
}

// ─── Enterprise Banner ──────────────────────────────────────────────────────────

function EnterpriseBanner() {
  return (
    <div
      data-ocid="apply.enterprise.banner"
      style={{
        padding: "14px 16px",
        borderRadius: 10,
        backgroundColor: "rgba(201,168,76,0.12)",
        border: "1px solid rgba(201,168,76,0.35)",
        display: "flex",
        gap: 10,
        alignItems: "flex-start",
        marginTop: 12,
        animation: "fadeRise 0.3s ease",
      }}
    >
      <Zap
        size={16}
        style={{ color: "#C9A84C", flexShrink: 0, marginTop: 1 }}
      />
      <div>
        <p
          style={{
            fontSize: "0.85rem",
            fontWeight: 700,
            color: "#C9A84C",
            marginBottom: 2,
          }}
        >
          High-Volume Account Eligible
        </p>
        <p style={{ fontSize: "0.78rem", color: "rgba(201,168,76,0.8)" }}>
          Our enterprise team will personally review your account.
        </p>
      </div>
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────────

export default function WizardPage() {
  const [searchParams] = useSearchParams();
  const { actor } = useActor();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const tierParam = searchParams.get("tier");
  const [isEnterprise, setIsEnterprise] = useState(tierParam === "enterprise");

  // New simplified 3-step state
  const [step, setStep] = useState<NewStep>(1);
  const [step1Complete, setStep1Complete] = useState(false);
  const [step2Complete, setStep2Complete] = useState(false);

  // Step 1 fields
  const [industry, setIndustry] = useState("");
  const [volume, setVolume] = useState("");
  const [issue, setIssue] = useState("");

  // Step 2 fields
  const [businessName, setBusinessName] = useState("");
  const [website, setWebsite] = useState("");
  const [businessAge, setBusinessAge] = useState("");

  // Step 3 fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Field completion states
  const [industryDone, setIndustryDone] = useState(false);
  const [volumeDone, setVolumeDone] = useState(false);
  const [issueDone, setIssueDone] = useState(false);
  const [bnameDone, setBnameDone] = useState(false);
  const [emailDone, setEmailDone] = useState(false);
  const [nameDone, setNameDone] = useState(false);
  const [phoneDone, setPhoneDone] = useState(false);

  // Enterprise check
  useEffect(() => {
    if (volume === "1M–5M" || volume === "5M+") {
      setIsEnterprise(true);
    } else if (volume) {
      setIsEnterprise(false);
    }
  }, [volume]);

  const step1Valid = industry !== "" && volume !== "" && issue !== "";
  const step2Valid = businessName.trim() !== "";
  const step3Valid =
    name.trim() !== "" && email.trim() !== "" && phone.trim() !== "";

  // Progress percentage
  const progress =
    step === 1
      ? 15
      : step === 2
        ? 40
        : step === 3
          ? 70
          : step === "reviewing"
            ? 90
            : 100;

  const handleSubmit = useCallback(async () => {
    if (!actor) {
      setSubmitError("Service unavailable. Please try again shortly.");
      return;
    }
    setSubmitError(null);
    setIsSubmitting(true);
    setStep("reviewing");

    await new Promise((r) => setTimeout(r, 2000)); // deliberate 2s "reviewing" delay

    try {
      await actor.submitWizardApplication(
        industry,
        issue,
        name,
        email,
        phone,
        businessName,
        "", // fein not collected
        false, // feinVerified
      );
      setStep("success");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setSubmitError(
        "Something went wrong. Please try again or contact us directly.",
      );
      setStep(3);
    } finally {
      setIsSubmitting(false);
    }
  }, [actor, industry, issue, name, email, phone, businessName]);

  const advanceStep1 = () => {
    setStep1Complete(true);
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const advanceStep2 = () => {
    setStep2Complete(true);
    setStep(3);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0a0f1e" }}>
      {/* Ticker */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 60 }}>
        <TickerBar />
      </div>

      {/* Header */}
      <header
        style={{
          position: "fixed",
          top: 38,
          left: 0,
          right: 0,
          zIndex: 50,
          backgroundColor: "rgba(10,22,40,0.97)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          height: 64,
          display: "flex",
          alignItems: "center",
          padding: "0 24px",
          justifyContent: "space-between",
        }}
      >
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            textDecoration: "none",
          }}
        >
          <img
            src="/assets/cybin-logo.png"
            alt="Cybin Enterprises"
            style={{ width: 36, height: 36, objectFit: "contain" }}
          />
          <span
            style={{
              fontWeight: 700,
              color: "rgba(232,237,248,0.9)",
              fontSize: "0.9rem",
            }}
          >
            Cybin Enterprises
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-4">
          {[
            ["/#solutions", "Solutions"],
            ["/industries", "Industries"],
            ["/about", "About"],
            ["/contact", "Contact"],
          ].map(([href, label]) => (
            <Link
              key={href}
              to={href}
              style={{
                fontSize: "0.8rem",
                color: "rgba(232,237,248,0.55)",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color =
                  "rgba(232,237,248,0.9)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color =
                  "rgba(232,237,248,0.55)";
              }}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Lock size={13} style={{ color: "#00d4b8" }} />
          <span style={{ fontSize: "0.75rem", color: "rgba(52,211,153,0.8)" }}>
            Secure Application
          </span>
        </div>
      </header>

      {/* Main layout */}
      <div style={{ paddingTop: 102, minHeight: "100vh", display: "flex" }}>
        {/* Left Trust Column */}
        <div
          data-ocid="apply.trust.panel"
          className="hidden lg:flex"
          style={{
            width: "46%",
            flexShrink: 0,
            position: "sticky",
            top: 102,
            alignSelf: "flex-start",
            height: "calc(100vh - 102px)",
            backgroundColor: "#0a0f1e",
            borderRight: "1px solid rgba(255,255,255,0.06)",
            overflow: "hidden",
            padding: "48px 40px",
          }}
        >
          <NeuronCanvas mode="dark" />
          <div style={{ position: "relative", zIndex: 1 }}>
            {/* Free pill */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 14px",
                borderRadius: 100,
                backgroundColor: "rgba(99,102,241,0.12)",
                border: "1px solid rgba(99,102,241,0.3)",
                marginBottom: 28,
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  backgroundColor: "#00d4b8",
                  display: "inline-block",
                }}
              />
              <span
                style={{
                  fontSize: "0.78rem",
                  color: "rgba(232,245,242,0.8)",
                  fontWeight: 600,
                }}
              >
                Free · No Commitment
              </span>
            </div>

            <h1
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: "1.9rem",
                fontWeight: 700,
                color: "#e8edf8",
                lineHeight: 1.25,
                marginBottom: 16,
              }}
            >
              Your processor shut you down.{" "}
              <span style={{ color: "#00d4b8" }}>We get you approved.</span>
            </h1>

            <p
              style={{
                color: "rgba(232,245,242,0.8)",
                lineHeight: 1.7,
                fontSize: "0.92rem",
                marginBottom: 32,
              }}
            >
              Tell us your situation. We’ll structure the right account across
              our processor network — and you’ll see your options before
              anything gets submitted.
            </p>

            {/* Trust rows */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 18,
                marginBottom: 32,
              }}
            >
              {[
                {
                  icon: Shield,
                  title: "Your data is protected",
                  sub: "256-bit encryption. Never shared without your consent.",
                },
                {
                  icon: Clock,
                  title: "Reviewed within 24 hours",
                  sub: "By a real person. Not an automated system.",
                },
                {
                  icon: Zap,
                  title: "100+ industries approved",
                  sub: "From CBD and firearms to peptides and crypto.",
                },
                {
                  icon: Globe,
                  title: "Domestic & international",
                  sub: "Multi-processor access gives you more options.",
                },
              ].map(({ icon: Icon, title, sub }) => (
                <div key={title} style={{ display: "flex", gap: 14 }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 9,
                      backgroundColor: "rgba(99,102,241,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon
                      size={16}
                      style={{ color: "rgba(232,245,242,0.8)" }}
                    />
                  </div>
                  <div>
                    <p
                      style={{
                        fontWeight: 600,
                        color: "#e8edf8",
                        fontSize: "0.875rem",
                        marginBottom: 2,
                      }}
                    >
                      {title}
                    </p>
                    <p
                      style={{
                        color: "rgba(232,245,242,0.8)",
                        fontSize: "0.8rem",
                      }}
                    >
                      {sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                height: 1,
                background: "rgba(255,255,255,0.06)",
                marginBottom: 20,
              }}
            />

            <p
              style={{
                color: "rgba(232,245,242,0.45)",
                fontSize: "0.8rem",
                lineHeight: 1.65,
              }}
            >
              Cybin Enterprises represents multiple acquiring processors. Your
              submission is reviewed across our full network to find the
              best-fit solution for your industry and volume.
            </p>
          </div>
        </div>

        {/* Right Form Column */}
        <div style={{ flex: 1, padding: "48px 40px 80px", minWidth: 0 }}>
          <div style={{ maxWidth: 540, margin: "0 auto" }}>
            {/* Progress Bar */}
            <ProgressBar pct={progress} />

            {/* Step completion tags */}
            {step1Complete && <StepCompletedTag label="Your Situation" />}
            {step2Complete && <StepCompletedTag label="Your Business" />}

            {/* ─── STEP 1 ─── */}
            {step === 1 && (
              <div>
                <h2
                  style={{
                    fontFamily: '"Playfair Display", Georgia, serif',
                    fontSize: "1.75rem",
                    fontWeight: 700,
                    color: "#e8edf8",
                    marginBottom: 6,
                  }}
                >
                  Tell us your situation
                </h2>
                <p
                  style={{
                    color: "rgba(232,245,242,0.8)",
                    fontSize: "0.875rem",
                    marginBottom: 28,
                  }}
                >
                  This takes about 90 seconds. No commitment required.
                </p>

                {/* Industry */}
                <div style={{ marginBottom: 20 }}>
                  <FieldLabel
                    label="What industry are you in?"
                    completed={industryDone}
                  />
                  <select
                    data-ocid="apply.step1.industry.select"
                    value={industry}
                    onChange={(e) => {
                      setIndustry(e.target.value);
                      setIndustryDone(e.target.value !== "");
                    }}
                    onFocus={(e) => applyFocusStyle(e.target)}
                    onBlur={(e) => removeFocusStyle(e.target)}
                    style={{ ...fieldBase, appearance: "none" as const }}
                  >
                    <option value="">Select your industry</option>
                    {ALL_INDUSTRIES.map((ind) => (
                      <option key={ind} value={ind}>
                        {ind}
                      </option>
                    ))}
                  </select>
                  <p
                    style={{
                      marginTop: 6,
                      fontSize: "0.75rem",
                      color: "rgba(232,245,242,0.45)",
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <Lock size={11} style={{ color: "#00d4b8" }} />
                    Your info is encrypted and never shared without your
                    consent.
                  </p>
                </div>

                {/* Volume */}
                <div style={{ marginBottom: 20 }}>
                  <FieldLabel
                    label="Approximate monthly processing volume"
                    completed={volumeDone}
                  />
                  <select
                    data-ocid="apply.step1.volume.select"
                    value={volume}
                    onChange={(e) => {
                      setVolume(e.target.value);
                      setVolumeDone(e.target.value !== "");
                    }}
                    onFocus={(e) => applyFocusStyle(e.target)}
                    onBlur={(e) => removeFocusStyle(e.target)}
                    style={{ ...fieldBase, appearance: "none" as const }}
                  >
                    <option value="">Select volume range</option>
                    <option value="Under $10K">Under $10K</option>
                    <option value="$10K–$50K">$10K–$50K</option>
                    <option value="$50K–$250K">$50K–$250K</option>
                    <option value="$250K–$1M">$250K–$1M</option>
                    <option value="1M–5M">$1M–$5M</option>
                    <option value="5M+">$5M+</option>
                  </select>
                  {isEnterprise && <EnterpriseBanner />}
                </div>

                {/* Issue */}
                <div style={{ marginBottom: 28 }}>
                  <FieldLabel
                    label="What's the primary issue you're facing?"
                    completed={issueDone}
                  />
                  <select
                    data-ocid="apply.step1.issue.select"
                    value={issue}
                    onChange={(e) => {
                      setIssue(e.target.value);
                      setIssueDone(e.target.value !== "");
                    }}
                    onFocus={(e) => applyFocusStyle(e.target)}
                    onBlur={(e) => removeFocusStyle(e.target)}
                    style={{ ...fieldBase, appearance: "none" as const }}
                  >
                    <option value="">Select your situation</option>
                    <option>My account was terminated or suspended</option>
                    <option>I was rejected by Stripe, PayPal, or Square</option>
                    <option>My reserves are too high</option>
                    <option>Chargebacks are threatening my account</option>
                    <option>I need international processing</option>
                    <option>
                      I’m launching a new business in a high-risk vertical
                    </option>
                    <option>I need higher volume capacity</option>
                    <option>Other</option>
                    <option>Not sure yet</option>
                  </select>
                </div>

                <button
                  type="button"
                  data-ocid="apply.step1.continue.button"
                  disabled={!step1Valid}
                  onClick={advanceStep1}
                  className="cybin-btn-blue"
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    opacity: step1Valid ? 1 : 0.4,
                    cursor: step1Valid ? "pointer" : "not-allowed",
                  }}
                >
                  Continue <ChevronRight size={15} />
                </button>
              </div>
            )}

            {/* ─── STEP 2 ─── */}
            {step === 2 && (
              <div>
                <h2
                  style={{
                    fontFamily: '"Playfair Display", Georgia, serif',
                    fontSize: "1.75rem",
                    fontWeight: 700,
                    color: "#e8edf8",
                    marginBottom: 6,
                  }}
                >
                  About your business
                </h2>
                <p
                  style={{
                    color: "rgba(232,245,242,0.8)",
                    fontSize: "0.875rem",
                    marginBottom: 28,
                  }}
                >
                  A few quick details help us match you to the right processors.
                </p>

                <div style={{ marginBottom: 20 }}>
                  <FieldLabel label="Business name" completed={bnameDone} />
                  <input
                    type="text"
                    data-ocid="apply.step2.business_name.input"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    onBlur={(e) => {
                      setBnameDone(e.target.value.trim() !== "");
                      removeFocusStyle(e.target);
                    }}
                    onFocus={(e) => applyFocusStyle(e.target)}
                    placeholder="Legal business name or DBA"
                    style={fieldBase}
                  />
                  <p
                    style={{
                      marginTop: 6,
                      fontSize: "0.75rem",
                      color: "rgba(232,245,242,0.45)",
                    }}
                  >
                    Legal business name or DBA — used for processor matching
                    only.
                  </p>
                </div>

                <div style={{ marginBottom: 20 }}>
                  <FieldLabel label="Website URL (optional)" />
                  <input
                    type="text"
                    data-ocid="apply.step2.website.input"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    onFocus={(e) => applyFocusStyle(e.target)}
                    onBlur={(e) => removeFocusStyle(e.target)}
                    placeholder="https://"
                    style={fieldBase}
                  />
                </div>

                <div style={{ marginBottom: 28 }}>
                  <FieldLabel label="How long have you been in business?" />
                  <select
                    data-ocid="apply.step2.age.select"
                    value={businessAge}
                    onChange={(e) => setBusinessAge(e.target.value)}
                    onFocus={(e) => applyFocusStyle(e.target)}
                    onBlur={(e) => removeFocusStyle(e.target)}
                    style={{ ...fieldBase, appearance: "none" as const }}
                  >
                    <option value="">Select</option>
                    <option>Not yet launched</option>
                    <option>Less than 6 months</option>
                    <option>6–12 months</option>
                    <option>1–3 years</option>
                    <option>3–5 years</option>
                    <option>5+ years</option>
                  </select>
                </div>

                <div style={{ display: "flex", gap: 12 }}>
                  <button
                    type="button"
                    data-ocid="apply.step2.back.button"
                    onClick={() => setStep(1)}
                    className="cybin-btn-ghost-white"
                    style={{ flex: 1, justifyContent: "center" }}
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    data-ocid="apply.step2.continue.button"
                    disabled={!step2Valid}
                    onClick={advanceStep2}
                    className="cybin-btn-blue"
                    style={{
                      flex: 2,
                      justifyContent: "center",
                      opacity: step2Valid ? 1 : 0.4,
                      cursor: step2Valid ? "pointer" : "not-allowed",
                    }}
                  >
                    Continue <ChevronRight size={15} />
                  </button>
                </div>
              </div>
            )}

            {/* ─── STEP 3 ─── */}
            {step === 3 && (
              <div>
                <h2
                  style={{
                    fontFamily: '"Playfair Display", Georgia, serif',
                    fontSize: "1.75rem",
                    fontWeight: 700,
                    color: "#e8edf8",
                    marginBottom: 6,
                  }}
                >
                  How should we reach you?
                </h2>
                <p
                  style={{
                    color: "rgba(232,245,242,0.8)",
                    fontSize: "0.875rem",
                    marginBottom: 28,
                  }}
                >
                  A real person will review this and contact you — not an
                  automated system.
                </p>

                <div style={{ marginBottom: 20 }}>
                  <FieldLabel label="Your name" completed={nameDone} />
                  <input
                    type="text"
                    data-ocid="apply.step3.name.input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={(e) => {
                      setNameDone(e.target.value.trim() !== "");
                      removeFocusStyle(e.target);
                    }}
                    onFocus={(e) => applyFocusStyle(e.target)}
                    placeholder="Full name"
                    style={fieldBase}
                  />
                </div>

                <div style={{ marginBottom: 20 }}>
                  <FieldLabel label="Email address" completed={emailDone} />
                  <input
                    type="email"
                    data-ocid="apply.step3.email.input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={(e) => {
                      setEmailDone(e.target.value.includes("@"));
                      removeFocusStyle(e.target);
                    }}
                    onFocus={(e) => applyFocusStyle(e.target)}
                    placeholder="you@example.com"
                    style={fieldBase}
                  />
                  <p
                    style={{
                      marginTop: 6,
                      fontSize: "0.75rem",
                      color: "rgba(232,245,242,0.45)",
                    }}
                  >
                    We’ll send your review summary here. Never used for spam.
                  </p>
                </div>

                <div style={{ marginBottom: 24 }}>
                  <FieldLabel label="Phone number" completed={phoneDone} />
                  <input
                    type="tel"
                    data-ocid="apply.step3.phone.input"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    onBlur={(e) => {
                      setPhoneDone(e.target.value.trim().length > 6);
                      removeFocusStyle(e.target);
                    }}
                    onFocus={(e) => applyFocusStyle(e.target)}
                    placeholder="(555) 000-0000"
                    style={fieldBase}
                  />
                  <p
                    style={{
                      marginTop: 6,
                      fontSize: "0.75rem",
                      color: "rgba(232,245,242,0.45)",
                    }}
                  >
                    Best number for a quick follow-up call. All info stays
                    private.
                  </p>
                </div>

                {/* Privacy box */}
                <div
                  style={{
                    padding: "14px 16px",
                    borderRadius: 10,
                    backgroundColor: "rgba(99,102,241,0.06)",
                    border: "1px solid rgba(99,102,241,0.12)",
                    display: "flex",
                    gap: 10,
                    marginBottom: 24,
                  }}
                >
                  <Lock
                    size={14}
                    style={{
                      color: "rgba(232,245,242,0.8)",
                      flexShrink: 0,
                      marginTop: 1,
                    }}
                  />
                  <p
                    style={{
                      fontSize: "0.78rem",
                      color: "rgba(232,240,255,0.55)",
                      lineHeight: 1.6,
                    }}
                  >
                    Your information is submitted securely and reviewed only by
                    the Cybin Enterprises team. We never share, sell, or
                    distribute your details to third parties without your
                    explicit consent.
                  </p>
                </div>

                {submitError && (
                  <div
                    data-ocid="apply.error.panel"
                    style={{
                      padding: "12px 16px",
                      borderRadius: 10,
                      backgroundColor: "rgba(239,68,68,0.1)",
                      border: "1px solid rgba(239,68,68,0.3)",
                      marginBottom: 16,
                    }}
                  >
                    <p style={{ color: "#f87171", fontSize: "0.85rem" }}>
                      {submitError}
                    </p>
                  </div>
                )}

                <div style={{ display: "flex", gap: 12 }}>
                  <button
                    type="button"
                    data-ocid="apply.step3.back.button"
                    onClick={() => setStep(2)}
                    className="cybin-btn-ghost-white"
                    style={{ flex: 1, justifyContent: "center" }}
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    data-ocid="apply.step3.submit.button"
                    disabled={!step3Valid || isSubmitting}
                    onClick={handleSubmit}
                    className="cybin-btn-blue"
                    style={{
                      flex: 2,
                      justifyContent: "center",
                      opacity: step3Valid && !isSubmitting ? 1 : 0.5,
                      cursor:
                        step3Valid && !isSubmitting ? "pointer" : "not-allowed",
                    }}
                  >
                    {isEnterprise
                      ? "Request My Enterprise Review"
                      : "Submit My Application"}
                    <ChevronRight size={15} />
                  </button>
                </div>
                <p
                  style={{
                    textAlign: "center",
                    fontSize: "0.72rem",
                    color: "rgba(232,245,242,0.45)",
                    marginTop: 10,
                  }}
                >
                  Free · Secure · No commitment required.
                </p>
              </div>
            )}

            {/* ─── REVIEWING STATE ─── */}
            {step === "reviewing" && (
              <div style={{ textAlign: "center", padding: "60px 0" }}>
                <div
                  data-ocid="apply.loading_state"
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    border: "3px solid rgba(110,247,212,0.2)",
                    borderTopColor: "#00d4b8",
                    animation: "spin 1s linear infinite",
                    margin: "0 auto 24px",
                  }}
                />
                <p
                  style={{
                    color: "rgba(232,245,242,0.8)",
                    fontSize: "0.95rem",
                    animation: "breathe 2s ease-in-out infinite",
                  }}
                >
                  Reviewing your situation...
                </p>
              </div>
            )}

            {/* ─── SUCCESS STATE ─── */}
            {step === "success" && (
              <div
                data-ocid="apply.success.panel"
                style={{ animation: "fadeRise 0.5s ease" }}
              >
                {/* Checkmark */}
                <div style={{ textAlign: "center", marginBottom: 32 }}>
                  <div
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: "50%",
                      background:
                        "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(110,247,212,0.2))",
                      border: "2px solid #00d4b8",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 20px",
                      animation: "scaleIn 0.4s ease",
                    }}
                  >
                    <CheckCircle size={36} style={{ color: "#00d4b8" }} />
                  </div>
                  <h2
                    style={{
                      fontFamily: '"Playfair Display", Georgia, serif',
                      fontSize: "2rem",
                      fontWeight: 700,
                      color: "#e8edf8",
                      marginBottom: 16,
                    }}
                  >
                    {isEnterprise
                      ? "Enterprise Review Requested"
                      : "Application Received"}
                  </h2>
                  <p
                    style={{
                      color: "rgba(232,245,242,0.8)",
                      lineHeight: 1.7,
                      maxWidth: 420,
                      margin: "0 auto",
                    }}
                  >
                    {isEnterprise
                      ? "Our enterprise team will contact you directly — not an automated system — within one business day to discuss your account structure."
                      : "You’ll hear from us within 24 hours. Not a form letter — a real person who has reviewed your situation and your options."}
                  </p>
                </div>

                {/* What Happens Next */}
                <div
                  style={{
                    padding: 28,
                    borderRadius: 14,
                    backgroundColor: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color: "rgba(232,245,242,0.8)",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      marginBottom: 20,
                    }}
                  >
                    What Happens Next
                  </h3>
                  {[
                    {
                      time: "Within 24 hours",
                      desc: "A member of our team reviews your situation personally and reaches out by phone or email.",
                    },
                    {
                      time: "Day 1–2",
                      desc: "We identify the best-fit processor options from our network for your industry and volume.",
                    },
                    {
                      time: "Day 2–3",
                      desc: "We walk you through your options. No surprises, no commitments until you’re ready.",
                    },
                    {
                      time: "Day 3–10",
                      desc: "If you’re ready to proceed, we manage the application and approval process end to end.",
                    },
                  ].map(({ time, desc }) => (
                    <div
                      key={time}
                      style={{ display: "flex", gap: 16, marginBottom: 16 }}
                    >
                      <span
                        style={{
                          fontWeight: 800,
                          color: "#C9A84C",
                          fontSize: "0.82rem",
                          flexShrink: 0,
                          minWidth: 100,
                        }}
                      >
                        {time}
                      </span>
                      <p
                        style={{
                          color: "rgba(232,245,242,0.8)",
                          fontSize: "0.85rem",
                          lineHeight: 1.6,
                        }}
                      >
                        {desc}
                      </p>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: 24, textAlign: "center" }}>
                  <Link
                    to="/"
                    style={{
                      color: "rgba(232,245,242,0.8)",
                      fontSize: "0.85rem",
                    }}
                  >
                    ← Return to Homepage
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes scaleIn { from { transform: scale(0.7); } to { transform: scale(1); } }
        @keyframes breathe { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }
        @keyframes fadeRise { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        select option { background: #0a0f1e; color: #e8edf8; }
      `}</style>
    </div>
  );
}
