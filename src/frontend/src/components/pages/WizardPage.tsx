import { Link, useSearchParams } from "@/lib/router";
import {
  AlertTriangle,
  CheckCircle,
  ChevronRight,
  Dna,
  Flame,
  Gamepad2,
  Globe,
  Leaf,
  Lock,
  Pill,
  Shield,
  Smartphone,
  TrendingDown,
  TrendingUp,
  Video,
  Zap,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useActor } from "../../hooks/useActor";

// ─── Types ────────────────────────────────────────────────────────────────────

type Step = 1 | 2 | 3 | 4 | "success";

interface WizardState {
  step: Step;
  industry: string;
  hurdle: string;
  name: string;
  email: string;
  phone: string;
  website: string;
  businessName: string;
  fein: string;
  feinSkipped: boolean;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const industryCards = [
  {
    id: "research-peptides",
    label: "Research Peptides",
    icon: Dna,
    desc: "Peptide compounds for research",
    pulse:
      "Cybin navigates the 2026 DEA scheduling updates for research compound merchants.",
  },
  {
    id: "cbd-botanicals",
    label: "CBD & Botanicals",
    icon: Leaf,
    desc: "Farm Bill-compliant plant products",
    pulse:
      "Cybin specializes in Farm Bill-compliant processing for botanical businesses.",
  },
  {
    id: "telemedicine",
    label: "Telemedicine / Digital Health",
    icon: Video,
    desc: "Remote healthcare & telehealth",
    pulse:
      "Cybin structures compliant payment rails for telehealth platforms in 2026.",
  },
  {
    id: "online-gaming",
    label: "Online Gaming",
    icon: Gamepad2,
    desc: "Gaming platforms & digital assets",
    pulse:
      "Cybin specializes in the 2026 jurisdictional updates for digital assets and gaming.",
  },
  {
    id: "firearms",
    label: "Firearms & Ammunition",
    icon: Shield,
    desc: "FFL dealers & ammo retailers",
    pulse:
      "Cybin works with FFL dealers and ammo retailers across domestic acquiring networks.",
  },
  {
    id: "forex-crypto",
    label: "Forex & Crypto",
    icon: Globe,
    desc: "Currency exchange & digital assets",
    pulse:
      "Cybin structures compliant forex and digital asset merchant accounts in 2026.",
  },
  {
    id: "tobacco-vape",
    label: "Tobacco & Vape",
    icon: Flame,
    desc: "Age-verified tobacco & vaping",
    pulse:
      "Cybin supports compliant age-verified payment processing for vape and tobacco merchants.",
  },
  {
    id: "adult-entertainment",
    label: "Adult Entertainment",
    icon: Smartphone,
    desc: "Compliant adult content platforms",
    pulse:
      "Cybin navigates acquiring bank requirements for compliant adult content platforms.",
  },
  {
    id: "nutraceuticals",
    label: "Supplements & Nutraceuticals",
    icon: Pill,
    desc: "Health supplements & wellness",
    pulse:
      "Cybin structures nutraceutical merchant accounts with chargeback protection built in.",
  },
  {
    id: "other-high-risk",
    label: "Other High-Risk",
    icon: Zap,
    desc: "Any legal high-risk industry",
    pulse:
      "Cybin works with all legal high-risk industries. We'll find the right path for you.",
  },
];

const hurdleCards = [
  {
    id: "match-list",
    label: "MATCH List History",
    icon: AlertTriangle,
    desc: "Previously terminated or listed on MATCH",
    booster: true,
  },
  {
    id: "chargeback",
    label: "Chargeback Management",
    icon: TrendingDown,
    desc: "High dispute ratios or chargeback risk",
    booster: true,
  },
  {
    id: "bank-freeze",
    label: "Bank-Side Freezes",
    icon: Lock,
    desc: "Funds held or accounts frozen by processors",
    booster: false,
  },
  {
    id: "general-scaling",
    label: "General Scaling",
    icon: TrendingUp,
    desc: "Growing business needing stable infrastructure",
    booster: false,
  },
];

// ─── Progress Bar ─────────────────────────────────────────────────────────────

const stepLabels = ["Industry", "Challenges", "Contact", "Verification"];

function ProgressBar({ step }: { step: number }) {
  return (
    <nav
      className="w-full mb-8"
      data-ocid="wizard.progress.tab"
      aria-label="Wizard progress"
    >
      <div className="flex items-center justify-between relative">
        {/* Track line */}
        <div
          className="absolute top-4 left-0 right-0 h-px"
          style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
        />
        <div
          className="absolute top-4 left-0 h-px transition-all duration-500"
          style={{
            backgroundColor: "#00d4b8",
            width: `${((Math.min(step, 4) - 1) / 3) * 100}%`,
          }}
        />

        {stepLabels.map((label, i) => {
          const num = i + 1;
          const isCompleted = step > num;
          const isActive = step === num;
          return (
            <div
              key={label}
              className="relative flex flex-col items-center"
              style={{ flex: 1 }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold z-10 transition-all duration-300"
                style={{
                  backgroundColor: isCompleted
                    ? "#00d4b8"
                    : isActive
                      ? "rgba(0, 212, 184, 0.15)"
                      : "rgba(255,255,255,0.06)",
                  border: isCompleted
                    ? "2px solid #00d4b8"
                    : isActive
                      ? "2px solid #00d4b8"
                      : "2px solid rgba(255,255,255,0.12)",
                  color: isCompleted
                    ? "#0a0f1e"
                    : isActive
                      ? "#00d4b8"
                      : "rgba(255,255,255,0.35)",
                  boxShadow: isActive
                    ? "0 0 16px rgba(0, 212, 184, 0.4)"
                    : "none",
                }}
              >
                {isCompleted ? <CheckCircle size={14} /> : num}
              </div>
              <span
                className="mt-2 text-xs font-medium hidden sm:block"
                style={{
                  color:
                    isCompleted || isActive
                      ? "#00d4b8"
                      : "rgba(255,255,255,0.3)",
                }}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </nav>
  );
}

// ─── Audit Footer ─────────────────────────────────────────────────────────────

function AuditFooter() {
  return (
    <div
      className="mt-10 pt-6 text-center"
      style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      <p
        className="text-xs mb-2 leading-relaxed"
        style={{ color: "rgba(232,237,248,0.3)" }}
      >
        <span
          className="font-semibold"
          style={{ color: "rgba(232,237,248,0.45)" }}
        >
          Notice at Collection:
        </span>{" "}
        Cybin Enterprises collects this information under applicable 2026
        privacy regulations for the purpose of merchant underwriting and
        compliance assessment.
      </p>
      <p
        className="text-xs leading-relaxed"
        style={{ color: "rgba(232,237,248,0.3)" }}
      >
        Cybin maintains strict AML/KYC protocols. Preliminary assessments are
        for consultation only; full verification is required prior to account
        activation.
      </p>
    </div>
  );
}

// ─── Step 1 ───────────────────────────────────────────────────────────────────

function Step1({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div>
      <div className="mb-8">
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
          style={{
            backgroundColor: "rgba(0, 212, 184, 0.1)",
            border: "1px solid rgba(0, 212, 184, 0.2)",
            color: "#00d4b8",
          }}
        >
          Step 1 of 4 — Identity Filter
        </div>
        <h2
          className="text-2xl sm:text-3xl font-bold mb-3"
          style={{
            fontFamily: "Sora, sans-serif",
            color: "#e8edf8",
            lineHeight: 1.25,
          }}
        >
          Which high-risk sector does your business operate in?
        </h2>
        <p className="text-sm" style={{ color: "rgba(232,237,248,0.55)" }}>
          Select the category that best describes your business
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {industryCards.map((card, i) => {
          const Icon = card.icon;
          const isSelected = selected === card.id;
          return (
            <button
              key={card.id}
              type="button"
              data-ocid={`wizard.step1.card.${i + 1}`}
              onClick={() => onSelect(card.id)}
              className="text-left p-4 sm:p-5 rounded-xl transition-all duration-200 relative group"
              style={{
                backgroundColor: isSelected
                  ? "rgba(0, 212, 184, 0.1)"
                  : "rgba(255,255,255,0.03)",
                border: isSelected
                  ? "1.5px solid rgba(0, 212, 184, 0.8)"
                  : "1.5px solid rgba(255,255,255,0.08)",
                boxShadow: isSelected
                  ? "0 0 20px rgba(0, 212, 184, 0.2), inset 0 0 20px rgba(0, 212, 184, 0.04)"
                  : "none",
                transform: isSelected ? "translateY(-2px)" : "none",
                cursor: "pointer",
              }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                style={{
                  backgroundColor: isSelected
                    ? "rgba(0, 212, 184, 0.18)"
                    : "rgba(0, 212, 184, 0.07)",
                  transition: "background-color 0.2s",
                }}
              >
                <Icon
                  size={18}
                  style={{
                    color: isSelected ? "#00d4b8" : "rgba(0, 212, 184, 0.6)",
                  }}
                />
              </div>
              <p
                className="text-sm font-semibold mb-1 leading-snug"
                style={{
                  fontFamily: "Sora, sans-serif",
                  color: isSelected ? "#e8edf8" : "rgba(232,237,248,0.8)",
                }}
              >
                {card.label}
              </p>
              <p
                className="text-xs leading-snug"
                style={{ color: "rgba(232,237,248,0.4)" }}
              >
                {card.desc}
              </p>
              {isSelected && (
                <div
                  className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#00d4b8" }}
                >
                  <CheckCircle size={12} color="#0a0f1e" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Step 2 ───────────────────────────────────────────────────────────────────

function Step2({
  selected,
  onSelect,
  onNext,
}: {
  selected: string;
  onSelect: (id: string) => void;
  onNext: () => void;
}) {
  return (
    <div>
      <div className="mb-8">
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
          style={{
            backgroundColor: "rgba(0, 212, 184, 0.08)",
            border: "1px solid rgba(0, 212, 184, 0.18)",
            color: "#00d4b8",
          }}
        >
          Step 2 of 4 — Operational Resiliency Check
        </div>
        <h2
          className="text-2xl sm:text-3xl font-bold mb-3"
          style={{
            fontFamily: "Sora, sans-serif",
            color: "#e8edf8",
            lineHeight: 1.25,
          }}
        >
          What is your primary regulatory hurdle?
        </h2>
        <p className="text-sm" style={{ color: "rgba(232,237,248,0.55)" }}>
          This helps us match you with the right compliance pathway
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {hurdleCards.map((card, i) => {
          const Icon = card.icon;
          const isSelected = selected === card.id;
          return (
            <button
              key={card.id}
              type="button"
              data-ocid={`wizard.step2.card.${i + 1}`}
              onClick={() => onSelect(card.id)}
              className="text-left p-5 sm:p-6 rounded-xl transition-all duration-200 relative"
              style={{
                backgroundColor: isSelected
                  ? "rgba(0, 212, 184, 0.08)"
                  : "rgba(255,255,255,0.03)",
                border: isSelected
                  ? "1.5px solid rgba(0, 212, 184, 0.7)"
                  : "1.5px solid rgba(255,255,255,0.08)",
                boxShadow: isSelected
                  ? "0 0 24px rgba(0, 212, 184, 0.15)"
                  : "none",
                transform: isSelected ? "translateY(-2px)" : "none",
                cursor: "pointer",
              }}
            >
              {card.booster && (
                <div
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold mb-3"
                  style={{
                    backgroundColor: "rgba(255, 142, 83, 0.12)",
                    border: "1px solid rgba(255, 142, 83, 0.3)",
                    color: "#ff8e53",
                  }}
                >
                  ◆ Expert Pathway
                </div>
              )}
              <div className="flex items-start gap-4">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    backgroundColor: isSelected
                      ? "rgba(0, 212, 184, 0.15)"
                      : "rgba(0, 212, 184, 0.06)",
                  }}
                >
                  <Icon
                    size={20}
                    style={{
                      color: isSelected ? "#00d4b8" : "rgba(0, 212, 184, 0.5)",
                    }}
                  />
                </div>
                <div>
                  <p
                    className="text-sm font-bold mb-1"
                    style={{
                      fontFamily: "Sora, sans-serif",
                      color: isSelected ? "#e8edf8" : "rgba(232,237,248,0.8)",
                    }}
                  >
                    {card.label}
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: "rgba(232,237,248,0.45)" }}
                  >
                    {card.desc}
                  </p>
                </div>
              </div>
              {isSelected && (
                <div
                  className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#00d4b8" }}
                >
                  <CheckCircle size={12} color="#0a0f1e" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={onNext}
        data-ocid="wizard.step3.next.button"
        className="cybin-btn-primary w-full sm:w-auto justify-center"
        style={{ minWidth: "200px" }}
      >
        {selected ? "Continue" : "Skip This Step"}
        <ChevronRight size={16} />
      </button>
    </div>
  );
}

// ─── Step 3 ───────────────────────────────────────────────────────────────────

function Step3({
  state,
  onChange,
  onNext,
  ghostSaveRef,
  actor,
}: {
  state: WizardState;
  onChange: (field: keyof WizardState, value: string) => void;
  onNext: () => void;
  ghostSaveRef: React.MutableRefObject<boolean>;
  actor: ReturnType<typeof useActor>["actor"];
}) {
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  const handleEmailBlur = useCallback(async () => {
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;
    if (
      emailRegex.test(state.email) &&
      state.industry &&
      !ghostSaveRef.current &&
      actor
    ) {
      ghostSaveRef.current = true;
      try {
        await actor.savePartialLead(state.email, state.industry, state.hurdle);
      } catch {
        // Silent ghost-save — do not surface errors to user
      }
    }
  }, [state.email, state.industry, state.hurdle, ghostSaveRef, actor]);

  const handleNext = () => {
    const newErrors: { name?: string; email?: string } = {};
    if (!state.name.trim()) newErrors.name = "Full name is required";
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(state.email))
      newErrors.email = "Valid email is required";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    onNext();
  };

  return (
    <div>
      <div className="mb-8">
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
          style={{
            backgroundColor: "rgba(0, 212, 184, 0.08)",
            border: "1px solid rgba(0, 212, 184, 0.18)",
            color: "#00d4b8",
          }}
        >
          Step 3 of 4 — Secure Your Spot
        </div>
        <h2
          className="text-2xl sm:text-3xl font-bold mb-3"
          style={{
            fontFamily: "Sora, sans-serif",
            color: "#e8edf8",
            lineHeight: 1.25,
          }}
        >
          How should we reach you?
        </h2>
      </div>

      {/* Status Booster */}
      <div
        className="p-4 rounded-xl mb-6"
        style={{
          background:
            "linear-gradient(135deg, rgba(0, 212, 184, 0.07), rgba(0, 212, 184, 0.03))",
          border: "1px solid rgba(0, 212, 184, 0.2)",
        }}
      >
        <div className="flex items-start gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: "rgba(0, 212, 184, 0.15)" }}
          >
            <Shield size={14} style={{ color: "#00d4b8" }} />
          </div>
          <div>
            <p
              className="text-xs font-bold mb-0.5"
              style={{ color: "#00d4b8" }}
            >
              Status Booster
            </p>
            <p
              className="text-xs leading-relaxed"
              style={{ color: "rgba(232,237,248,0.6)" }}
            >
              Providing contact info locks in your consultation slot and
              triggers your industry compliance report.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4 mb-8">
        {/* Full Name */}
        <div>
          <label
            htmlFor="wizard-name"
            className="block text-xs font-semibold uppercase tracking-wider mb-1.5"
            style={{ color: "rgba(232,237,248,0.6)" }}
          >
            Full Name <span style={{ color: "#ff6b6b" }}>*</span>
          </label>
          <input
            id="wizard-name"
            type="text"
            data-ocid="wizard.step3.name.input"
            value={state.name}
            maxLength={100}
            onChange={(e) => {
              onChange("name", e.target.value);
              if (errors.name) setErrors((p) => ({ ...p, name: undefined }));
            }}
            placeholder="Jane Smith"
            autoComplete="name"
            className="w-full px-4 py-3 rounded-xl text-sm transition-all duration-200"
            style={{
              backgroundColor: "rgba(255,255,255,0.04)",
              border: errors.name
                ? "1.5px solid rgba(255, 107, 107, 0.7)"
                : "1.5px solid rgba(255,255,255,0.1)",
              color: "#e8edf8",
              outline: "none",
              fontFamily: "Cabinet Grotesk, sans-serif",
            }}
            onFocus={(e) => {
              if (!errors.name)
                e.currentTarget.style.borderColor = "rgba(0, 212, 184, 0.5)";
            }}
            onBlur={(e) => {
              if (!errors.name)
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
            }}
          />
          {errors.name && (
            <p className="text-xs mt-1" style={{ color: "#ff6b6b" }}>
              {errors.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="wizard-email"
            className="block text-xs font-semibold uppercase tracking-wider mb-1.5"
            style={{ color: "rgba(232,237,248,0.6)" }}
          >
            Email Address <span style={{ color: "#ff6b6b" }}>*</span>
          </label>
          <input
            id="wizard-email"
            type="email"
            data-ocid="wizard.step3.email.input"
            value={state.email}
            maxLength={254}
            onChange={(e) => {
              onChange("email", e.target.value);
              if (errors.email) setErrors((p) => ({ ...p, email: undefined }));
            }}
            onBlur={handleEmailBlur}
            placeholder="jane@yourbusiness.com"
            autoComplete="email"
            className="w-full px-4 py-3 rounded-xl text-sm transition-all duration-200"
            style={{
              backgroundColor: "rgba(255,255,255,0.04)",
              border: errors.email
                ? "1.5px solid rgba(255, 107, 107, 0.7)"
                : "1.5px solid rgba(255,255,255,0.1)",
              color: "#e8edf8",
              outline: "none",
              fontFamily: "Cabinet Grotesk, sans-serif",
            }}
            onFocus={(e) => {
              if (!errors.email)
                e.currentTarget.style.borderColor = "rgba(0, 212, 184, 0.5)";
            }}
          />
          {errors.email && (
            <p className="text-xs mt-1" style={{ color: "#ff6b6b" }}>
              {errors.email}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="wizard-phone"
            className="block text-xs font-semibold uppercase tracking-wider mb-1.5"
            style={{ color: "rgba(232,237,248,0.6)" }}
          >
            Phone Number{" "}
            <span
              className="normal-case font-normal"
              style={{ color: "rgba(232,237,248,0.35)" }}
            >
              (optional)
            </span>
          </label>
          <input
            id="wizard-phone"
            type="tel"
            data-ocid="wizard.step3.phone.input"
            value={state.phone}
            maxLength={20}
            onChange={(e) => onChange("phone", e.target.value)}
            placeholder="+1 (555) 000-0000"
            autoComplete="tel"
            className="w-full px-4 py-3 rounded-xl text-sm transition-all duration-200"
            style={{
              backgroundColor: "rgba(255,255,255,0.04)",
              border: "1.5px solid rgba(255,255,255,0.1)",
              color: "#e8edf8",
              outline: "none",
              fontFamily: "Cabinet Grotesk, sans-serif",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "rgba(0, 212, 184, 0.5)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
            }}
          />
        </div>

        {/* Website */}
        <div>
          <label
            htmlFor="wizard-website"
            className="block text-xs font-semibold uppercase tracking-wider mb-1.5"
            style={{ color: "rgba(232,237,248,0.6)" }}
          >
            Business Website{" "}
            <span
              className="normal-case font-normal"
              style={{ color: "rgba(232,237,248,0.35)" }}
            >
              (optional)
            </span>
          </label>
          <input
            id="wizard-website"
            type="url"
            data-ocid="wizard.step3.website.input"
            value={state.website}
            maxLength={100}
            onChange={(e) => onChange("website", e.target.value)}
            placeholder="https://yourbusiness.com"
            autoComplete="url"
            className="w-full px-4 py-3 rounded-xl text-sm transition-all duration-200"
            style={{
              backgroundColor: "rgba(255,255,255,0.04)",
              border: "1.5px solid rgba(255,255,255,0.1)",
              color: "#e8edf8",
              outline: "none",
              fontFamily: "Cabinet Grotesk, sans-serif",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "rgba(0, 212, 184, 0.5)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
            }}
          />
        </div>
      </div>

      <button
        type="button"
        onClick={handleNext}
        data-ocid="wizard.step3.next.button"
        className="cybin-btn-primary w-full sm:w-auto justify-center"
        style={{ minWidth: "200px" }}
      >
        Continue to Verification
        <ChevronRight size={16} />
      </button>
    </div>
  );
}

// ─── Step 4 ───────────────────────────────────────────────────────────────────

function Step4({
  state,
  onChange,
  onSubmit,
  isSubmitting,
  submitError,
}: {
  state: WizardState;
  onChange: (field: keyof WizardState, value: string | boolean) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  submitError: string | null;
}) {
  const hasFein = state.fein.trim().length > 0 && !state.feinSkipped;
  const ctaLabel = hasFein
    ? "Initiate Underwriting Review"
    : "Request Preliminary Consultation";

  const handleSkip = () => {
    onChange("feinSkipped", true);
    onChange("fein", "");
    // Immediately submit as a preliminary consultation
    onSubmit();
  };

  return (
    <div>
      {/* High-Security Header */}
      <div className="mb-8">
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
          style={{
            backgroundColor: "rgba(255, 200, 50, 0.08)",
            border: "1px solid rgba(255, 200, 50, 0.25)",
            color: "#ffc832",
          }}
        >
          <Shield size={11} />
          Secure Vault — FEIN Verification
        </div>
        <h2
          className="text-2xl sm:text-3xl font-bold mb-3"
          style={{
            fontFamily: "Sora, sans-serif",
            color: "#e8edf8",
            lineHeight: 1.25,
          }}
        >
          Business Identity Verification
        </h2>
        <p className="text-sm" style={{ color: "rgba(232,237,248,0.45)" }}>
          Step 4 of 4 — All fields optional. Providing your FEIN accelerates
          underwriting.
        </p>
      </div>

      {/* Incentive Banner */}
      <div
        className="p-4 rounded-xl mb-6 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, rgba(255, 200, 50, 0.06), rgba(255, 200, 50, 0.02))",
          border: "1px solid rgba(255, 200, 50, 0.2)",
        }}
      >
        {/* Subtle glow top-right */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "100px",
            height: "100px",
            background:
              "radial-gradient(circle, rgba(255, 200, 50, 0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div className="flex items-start gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: "rgba(255, 200, 50, 0.12)" }}
          >
            <Shield size={14} style={{ color: "#ffc832" }} />
          </div>
          <div>
            <p className="text-xs font-bold mb-1" style={{ color: "#ffc832" }}>
              48-Hour Priority Boarding
            </p>
            <p
              className="text-xs leading-relaxed"
              style={{ color: "rgba(232,237,248,0.55)" }}
            >
              Provide your FEIN to trigger an automated pre-check against the
              2026 FinCEN database for 48-hour priority boarding.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        {/* Business Legal Name */}
        <div>
          <label
            htmlFor="wizard-business-name"
            className="block text-xs font-semibold uppercase tracking-wider mb-1.5"
            style={{ color: "rgba(232,237,248,0.6)" }}
          >
            Business Legal Name{" "}
            <span
              className="normal-case font-normal"
              style={{ color: "rgba(232,237,248,0.3)" }}
            >
              (optional)
            </span>
          </label>
          <input
            id="wizard-business-name"
            type="text"
            data-ocid="wizard.step4.business_name.input"
            value={state.businessName}
            maxLength={100}
            onChange={(e) => onChange("businessName", e.target.value)}
            placeholder="Acme Corp LLC"
            autoComplete="organization"
            className="w-full px-4 py-3 rounded-xl text-sm transition-all duration-200"
            style={{
              backgroundColor: "rgba(255,255,255,0.03)",
              border: "1.5px solid rgba(255, 200, 50, 0.15)",
              color: "#e8edf8",
              outline: "none",
              fontFamily: "Cabinet Grotesk, sans-serif",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "rgba(255, 200, 50, 0.4)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "rgba(255, 200, 50, 0.15)";
            }}
          />
        </div>

        {/* FEIN */}
        <div>
          <label
            htmlFor="wizard-fein"
            className="block text-xs font-semibold uppercase tracking-wider mb-1.5"
            style={{ color: "rgba(232,237,248,0.6)" }}
          >
            Federal EIN / FEIN{" "}
            <span
              className="normal-case font-normal"
              style={{ color: "rgba(232,237,248,0.3)" }}
            >
              (optional)
            </span>
          </label>
          <input
            id="wizard-fein"
            type="text"
            data-ocid="wizard.step4.fein.input"
            value={state.fein}
            onChange={(e) => {
              onChange("fein", e.target.value);
              if (e.target.value.trim()) onChange("feinSkipped", false);
            }}
            placeholder="12-3456789"
            maxLength={10}
            pattern="[0-9]{2}-[0-9]{7}"
            className="w-full px-4 py-3 rounded-xl text-sm transition-all duration-200"
            style={{
              backgroundColor: "rgba(255,255,255,0.03)",
              border: "1.5px solid rgba(255, 200, 50, 0.15)",
              color: "#e8edf8",
              outline: "none",
              fontFamily: "Cabinet Grotesk, sans-serif",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "rgba(255, 200, 50, 0.5)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "rgba(255, 200, 50, 0.15)";
            }}
          />
          <button
            type="button"
            data-ocid="wizard.step4.skip.button"
            onClick={handleSkip}
            disabled={isSubmitting}
            className="mt-2 text-xs underline transition-colors"
            style={{
              color: "rgba(232,237,248,0.35)",
              cursor: isSubmitting ? "not-allowed" : "pointer",
            }}
            onMouseEnter={(e) => {
              if (!isSubmitting)
                e.currentTarget.style.color = "rgba(232,237,248,0.6)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(232,237,248,0.35)";
            }}
          >
            Skip for now — proceed as consultation
          </button>
        </div>
      </div>

      {submitError && (
        <div
          data-ocid="wizard.error_state"
          className="p-4 rounded-xl mb-5"
          style={{
            backgroundColor: "rgba(255, 107, 107, 0.08)",
            border: "1px solid rgba(255, 107, 107, 0.3)",
          }}
        >
          <p className="text-sm" style={{ color: "#ff6b6b" }}>
            {submitError}
          </p>
        </div>
      )}

      <button
        type="button"
        data-ocid="wizard.step4.submit.button"
        onClick={onSubmit}
        disabled={isSubmitting}
        className="w-full sm:w-auto justify-center px-8 py-4 rounded-xl font-bold text-sm transition-all duration-300 inline-flex items-center gap-2"
        style={{
          background: hasFein
            ? "linear-gradient(135deg, #00d4b8 0%, #00b89e 100%)"
            : "linear-gradient(135deg, #7c5cbf 0%, #5a3a9e 100%)",
          color: hasFein ? "#0a0f1e" : "#e8edf8",
          border: "none",
          cursor: isSubmitting ? "not-allowed" : "pointer",
          opacity: isSubmitting ? 0.7 : 1,
          boxShadow: hasFein
            ? "0 0 24px rgba(0, 212, 184, 0.3)"
            : "0 0 24px rgba(124, 92, 191, 0.3)",
          fontFamily: "Cabinet Grotesk, sans-serif",
          minWidth: "220px",
        }}
      >
        {isSubmitting ? (
          <>
            <span
              className="w-4 h-4 rounded-full border-2 animate-spin"
              style={{
                borderColor: "currentColor transparent transparent transparent",
              }}
            />
            Submitting...
          </>
        ) : (
          <>
            <Shield size={15} />
            {ctaLabel}
          </>
        )}
      </button>

      {isSubmitting && (
        <div data-ocid="wizard.loading_state" className="sr-only">
          Submitting application…
        </div>
      )}
    </div>
  );
}

// ─── Success Screen ───────────────────────────────────────────────────────────

function SuccessScreen() {
  return (
    <div
      data-ocid="wizard.success_state"
      className="text-center py-8 flex flex-col items-center"
    >
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
        style={{
          backgroundColor: "rgba(0, 212, 184, 0.1)",
          border: "2px solid rgba(0, 212, 184, 0.4)",
          boxShadow: "0 0 40px rgba(0, 212, 184, 0.2)",
        }}
      >
        <CheckCircle size={36} style={{ color: "#00d4b8" }} />
      </div>
      <div
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
        style={{
          backgroundColor: "rgba(0, 212, 184, 0.08)",
          border: "1px solid rgba(0, 212, 184, 0.2)",
          color: "#00d4b8",
        }}
      >
        Application Received
      </div>
      <h2
        className="text-2xl sm:text-3xl font-bold mb-4"
        style={{ fontFamily: "Sora, sans-serif", color: "#e8edf8" }}
      >
        You're in the queue.
      </h2>
      <p
        className="text-base mb-2 max-w-md leading-relaxed"
        style={{ color: "rgba(232,237,248,0.65)" }}
      >
        Your application is being reviewed. A Cybin specialist will contact you
        within 48 hours.
      </p>
      <p className="text-sm mb-8" style={{ color: "rgba(232,237,248,0.4)" }}>
        Check your email for a confirmation and next steps.
      </p>
      <Link to="/" className="cybin-btn-primary">
        Return to Home
        <ChevronRight size={16} />
      </Link>
    </div>
  );
}

// ─── Main Wizard ──────────────────────────────────────────────────────────────

export default function WizardPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { actor } = useActor();
  const ghostSaveRef = useRef(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Initialise state from URL params
  const [wizState, setWizState] = useState<WizardState>(() => {
    const stepParam = searchParams.get("step");
    const parsedStep = stepParam ? (Number(stepParam) as Step) : 1;
    return {
      step: ([1, 2, 3, 4] as Step[]).includes(parsedStep) ? parsedStep : 1,
      industry: searchParams.get("industry") ?? "",
      hurdle: searchParams.get("hurdle") ?? "",
      name: "",
      email: "",
      phone: "",
      website: "",
      businessName: "",
      fein: "",
      feinSkipped: false,
    };
  });

  // Sync URL params when step/industry/hurdle change
  useEffect(() => {
    if (wizState.step === "success") return;
    const params: Record<string, string> = {
      step: String(wizState.step),
    };
    if (wizState.industry) params.industry = wizState.industry;
    if (wizState.hurdle) params.hurdle = wizState.hurdle;
    setSearchParams(params, { replace: true });
  }, [wizState.step, wizState.industry, wizState.hurdle, setSearchParams]);

  const setField = useCallback(
    (field: keyof WizardState, value: string | boolean) => {
      setWizState((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  // Step 1: select industry → pulse toast → auto-advance
  const handleIndustrySelect = useCallback((id: string) => {
    const card = industryCards.find((c) => c.id === id);
    setWizState((prev) => ({ ...prev, industry: id }));

    if (card) {
      toast(card.pulse, {
        duration: 4000,
        style: {
          background: "#0c1422",
          border: "1px solid rgba(0, 212, 184, 0.3)",
          color: "#e8edf8",
          fontFamily: "Cabinet Grotesk, sans-serif",
          fontSize: "13px",
          borderRadius: "12px",
          boxShadow: "0 0 32px rgba(0, 212, 184, 0.12)",
        },
        icon: "◆",
      });
    }

    setTimeout(() => {
      setWizState((prev) => ({ ...prev, step: 2 }));
    }, 1500);
  }, []);

  // Step 2: hurdle select
  const handleHurdleSelect = useCallback((id: string) => {
    setWizState((prev) => ({ ...prev, hurdle: id }));
  }, []);

  const goToStep = useCallback((step: Step) => {
    setWizState((prev) => ({ ...prev, step }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!actor) {
      setSubmitError("Service unavailable. Please try again shortly.");
      return;
    }
    setSubmitError(null);
    setIsSubmitting(true);
    try {
      await actor.submitWizardApplication(
        wizState.industry,
        wizState.hurdle,
        wizState.name,
        wizState.email,
        wizState.phone,
        wizState.businessName,
        wizState.fein,
        wizState.fein.trim() !== "" && !wizState.feinSkipped,
      );
      setWizState((prev) => ({ ...prev, step: "success" }));
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setSubmitError(
        "Something went wrong. Please try again or contact us directly.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }, [actor, wizState]);

  const stepNum = wizState.step === "success" ? 5 : (wizState.step as number);

  // Theme shift for step 4
  const isVaultStep = wizState.step === 4;

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundColor: isVaultStep ? "#020408" : "#0a0f1e",
        transition: "background-color 0.6s ease",
      }}
    >
      {/* Header */}
      <header
        className="w-full px-4 sm:px-6 py-4 flex items-center justify-between"
        style={{
          borderBottom: isVaultStep
            ? "1px solid rgba(255, 200, 50, 0.12)"
            : "1px solid rgba(0, 212, 184, 0.08)",
        }}
      >
        <Link to="/" className="flex items-center">
          <img
            src="/assets/cybin-logo.png"
            alt="Cybin Enterprises"
            style={{
              width: "48px",
              height: "48px",
              objectFit: "contain",
              mixBlendMode: "screen",
            }}
          />
        </Link>
        <div className="flex items-center gap-4">
          {isVaultStep && (
            <div
              className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
              style={{
                backgroundColor: "rgba(255, 200, 50, 0.06)",
                border: "1px solid rgba(255, 200, 50, 0.2)",
                color: "#ffc832",
              }}
            >
              <Shield size={10} />
              256-bit Encrypted
            </div>
          )}
          <Link
            to="/apply"
            onClick={() =>
              setWizState({
                step: 1,
                industry: "",
                hurdle: "",
                name: "",
                email: "",
                phone: "",
                website: "",
                businessName: "",
                fein: "",
                feinSkipped: false,
              })
            }
            className="text-xs font-medium transition-colors"
            style={{ color: "rgba(232,237,248,0.4)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "rgba(232,237,248,0.7)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(232,237,248,0.4)";
            }}
          >
            Start Over
          </Link>
        </div>
      </header>

      {/* Vault border overlay */}
      {isVaultStep && (
        <div
          className="w-full h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255, 200, 50, 0.3), transparent)",
          }}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center px-4 sm:px-6 py-8 sm:py-12">
        <div className="w-full" style={{ maxWidth: "800px" }}>
          {/* Vault ambient */}
          {isVaultStep && (
            <div
              style={{
                position: "fixed",
                inset: 0,
                background:
                  "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(255, 200, 50, 0.03) 0%, transparent 60%)",
                pointerEvents: "none",
                zIndex: 0,
              }}
            />
          )}

          <div className="relative z-10">
            {wizState.step !== "success" && <ProgressBar step={stepNum} />}

            {/* Step wrapper — vault theme */}
            <div
              className="rounded-2xl p-6 sm:p-8 transition-all duration-500"
              style={
                isVaultStep
                  ? {
                      background:
                        "linear-gradient(160deg, rgba(10, 8, 20, 0.9) 0%, rgba(5, 4, 15, 0.95) 100%)",
                      border: "1px solid rgba(255, 200, 50, 0.2)",
                      boxShadow:
                        "0 0 60px rgba(255, 200, 50, 0.05), 0 0 120px rgba(255, 200, 50, 0.02), inset 0 1px 0 rgba(255, 200, 50, 0.06)",
                    }
                  : {
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }
              }
            >
              {wizState.step === 1 && (
                <Step1
                  selected={wizState.industry}
                  onSelect={handleIndustrySelect}
                />
              )}
              {wizState.step === 2 && (
                <Step2
                  selected={wizState.hurdle}
                  onSelect={handleHurdleSelect}
                  onNext={() => goToStep(3)}
                />
              )}
              {wizState.step === 3 && (
                <Step3
                  state={wizState}
                  onChange={(f, v) => setField(f, v as string)}
                  onNext={() => goToStep(4)}
                  ghostSaveRef={ghostSaveRef}
                  actor={actor}
                />
              )}
              {wizState.step === 4 && (
                <Step4
                  state={wizState}
                  onChange={setField}
                  onSubmit={handleSubmit}
                  isSubmitting={isSubmitting}
                  submitError={submitError}
                />
              )}
              {wizState.step === "success" && <SuccessScreen />}
            </div>

            {/* Back navigation */}
            {wizState.step !== 1 && wizState.step !== "success" && (
              <button
                type="button"
                onClick={() => goToStep((stepNum - 1) as Step)}
                className="mt-4 text-xs font-medium transition-colors flex items-center gap-1"
                style={{ color: "rgba(232,237,248,0.35)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "rgba(232,237,248,0.6)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "rgba(232,237,248,0.35)";
                }}
              >
                ← Back
              </button>
            )}

            <AuditFooter />
          </div>
        </div>
      </main>
    </div>
  );
}
