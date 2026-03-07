import { JsonLd } from "@/components/JsonLd";
import { useActor } from "@/hooks/useActor";
import { useSeo } from "@/hooks/useSeo";
import { Link } from "@/lib/router";
import { useMutation } from "@tanstack/react-query";
import {
  Building2,
  CheckCircle2,
  ChevronRight,
  Code2,
  Handshake,
  Loader2,
  Send,
  Star,
  Users2,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const partnershipTypes = [
  {
    id: "technology",
    icon: Code2,
    title: "Technology Integration",
    description:
      "Build native integrations between your platform and Cybin's payment infrastructure. Ideal for SaaS platforms, e-commerce solutions, and fintech applications.",
    benefits: [
      "API access & developer sandbox",
      "Co-marketing opportunities",
      "Technical integration support",
      "Revenue share program",
    ],
    color: "#00d4b8",
  },
  {
    id: "referral",
    icon: Users2,
    title: "Referral Partner",
    description:
      "Refer high-risk merchants to Cybin and earn commission on every successful account activation. Perfect for consultants, agencies, and industry advisors.",
    benefits: [
      "Competitive referral commissions",
      "Dedicated partner manager",
      "Marketing materials provided",
      "Real-time referral tracking",
    ],
    color: "#a87ef5",
  },
  {
    id: "whitelabel",
    icon: Star,
    title: "White-Label Solutions",
    description:
      "License Cybin's payment infrastructure under your own brand. Build a payment services offering without the operational overhead of becoming a direct processor.",
    benefits: [
      "Full brand customization",
      "Dedicated infrastructure",
      "Compliance support included",
      "Scalable revenue model",
    ],
    color: "#ffc832",
  },
  {
    id: "strategic",
    icon: Handshake,
    title: "Strategic Alliance",
    description:
      "Join forces with Cybin to expand into new markets, serve shared clients, or develop new payment products for emerging regulated industries.",
    benefits: [
      "Joint go-to-market strategy",
      "Shared industry expertise",
      "Executive partnership access",
      "Custom commercial terms",
    ],
    color: "#ff8c42",
  },
];

const PARTNERSHIP_OPTIONS = [
  "Technology Integration",
  "Referral Partner",
  "White-Label Solutions",
  "Strategic Alliance",
  "Other",
];

export default function PartnersPage() {
  useSeo({
    title: "Partner With Cybin Enterprises | Payment Integration Partners",
    description:
      "Join the Cybin Enterprises partner ecosystem. Technology integrations, referral programs, white-label solutions, and strategic alliances for the high-risk payments market.",
    canonical: "/partners",
  });

  const { actor } = useActor();
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    partnershipType: "",
    description: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      return actor.submitPartnerLead(
        formData.companyName,
        formData.contactName,
        formData.email,
        formData.phone,
        formData.partnershipType,
        formData.description,
      );
    },
    onSuccess: () => {
      setSubmitted(true);
      setFormError(null);
    },
    onError: () => {
      setFormError(
        "Something went wrong. Please try again or contact us directly.",
      );
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.companyName ||
      !formData.contactName ||
      !formData.email ||
      !formData.phone ||
      !formData.description
    ) {
      setFormError("Please fill in all required fields.");
      return;
    }
    setFormError(null);
    mutation.mutate();
  };

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
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://cybinenterprises.com/",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Partners",
              item: "https://cybinenterprises.com/partners",
            },
          ],
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
                Partners
              </span>
            </div>
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5 text-xs font-semibold"
              style={{
                backgroundColor: "rgba(0,212,184,0.08)",
                border: "1px solid rgba(0,212,184,0.2)",
                color: "#00d4b8",
              }}
            >
              <Zap size={12} />
              Partner Ecosystem
            </div>
            <h1
              className="text-4xl sm:text-5xl font-bold mb-5"
              style={{
                fontFamily: "Sora, system-ui, sans-serif",
                color: "#e8edf8",
                lineHeight: 1.15,
              }}
            >
              Partner With{" "}
              <span style={{ color: "#00d4b8" }}>Cybin Enterprises</span>
            </h1>
            <p
              className="text-lg"
              style={{ color: "rgba(232, 237, 248, 0.65)", lineHeight: 1.7 }}
            >
              Join our growing ecosystem of technology partners, referral
              agents, and strategic allies building the future of high-risk
              payment infrastructure together.
            </p>
          </div>
        </div>
      </section>

      {/* Partnership Types */}
      <section style={{ backgroundColor: "#0a0f1e", padding: "72px 0" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-up">
            <h2
              className="text-3xl sm:text-4xl font-bold mb-4"
              style={{
                fontFamily: "Sora, system-ui, sans-serif",
                color: "#e8edf8",
              }}
            >
              Partnership Programs
            </h2>
            <p
              className="text-base max-w-xl mx-auto"
              style={{ color: "rgba(232,237,248,0.55)", lineHeight: 1.7 }}
            >
              Choose the partnership model that aligns with your business goals
              and capabilities.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {partnershipTypes.map(
              ({ id, icon: Icon, title, description, benefits, color }, i) => (
                <div
                  key={id}
                  className="animate-fade-up cybin-glass-card p-7"
                  style={{ transitionDelay: `${i * 70}ms` }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                    style={{
                      backgroundColor: `${color}14`,
                      border: `1px solid ${color}28`,
                    }}
                  >
                    <Icon size={22} style={{ color }} />
                  </div>
                  <h3
                    className="text-xl font-bold mb-3"
                    style={{
                      fontFamily: "Sora, sans-serif",
                      color: "#e8edf8",
                    }}
                  >
                    {title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed mb-5"
                    style={{ color: "rgba(232,237,248,0.6)" }}
                  >
                    {description}
                  </p>
                  <div className="space-y-2">
                    {benefits.map((benefit) => (
                      <div key={benefit} className="flex items-center gap-2">
                        <CheckCircle2
                          size={13}
                          style={{ color, flexShrink: 0 }}
                        />
                        <span
                          className="text-sm"
                          style={{ color: "rgba(232,237,248,0.7)" }}
                        >
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      <div className="cybin-section-divider" />

      {/* Partner Application Form */}
      <section style={{ backgroundColor: "#080d1a", padding: "72px 0" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Left info */}
            <div className="lg:col-span-2 animate-fade-up">
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5 text-xs font-semibold"
                style={{
                  backgroundColor: "rgba(168,126,245,0.08)",
                  border: "1px solid rgba(168,126,245,0.2)",
                  color: "#a87ef5",
                }}
              >
                <Building2 size={12} />
                Apply Now
              </div>
              <h2
                className="text-3xl font-bold mb-4"
                style={{
                  fontFamily: "Sora, system-ui, sans-serif",
                  color: "#e8edf8",
                  lineHeight: 1.2,
                }}
              >
                Start Your Partnership Application
              </h2>
              <p
                className="text-base mb-8"
                style={{ color: "rgba(232,237,248,0.6)", lineHeight: 1.7 }}
              >
                Tell us about your company and the type of partnership you're
                interested in. Our team reviews all applications within 2–3
                business days.
              </p>
              <div className="space-y-4">
                {[
                  {
                    icon: CheckCircle2,
                    text: "No exclusivity required to apply",
                    color: "#00d4b8",
                  },
                  {
                    icon: CheckCircle2,
                    text: "Custom commercial terms available",
                    color: "#00d4b8",
                  },
                  {
                    icon: CheckCircle2,
                    text: "Dedicated partner support from day one",
                    color: "#00d4b8",
                  },
                  {
                    icon: CheckCircle2,
                    text: "All legal industries supported",
                    color: "#00d4b8",
                  },
                ].map(({ icon: Icon, text, color }) => (
                  <div key={text} className="flex items-center gap-3">
                    <Icon size={15} style={{ color, flexShrink: 0 }} />
                    <span
                      className="text-sm"
                      style={{ color: "rgba(232,237,248,0.7)" }}
                    >
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div
              className="lg:col-span-3 animate-fade-up"
              style={{ transitionDelay: "100ms" }}
            >
              {submitted ? (
                <div
                  className="rounded-2xl p-10 text-center"
                  data-ocid="partners.success_state"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(0,212,184,0.06), rgba(0,212,184,0.02))",
                    border: "1px solid rgba(0,212,184,0.2)",
                  }}
                >
                  <CheckCircle2
                    size={48}
                    style={{ color: "#00d4b8", margin: "0 auto 16px" }}
                  />
                  <h3
                    className="text-2xl font-bold mb-3"
                    style={{
                      fontFamily: "Sora, sans-serif",
                      color: "#e8edf8",
                    }}
                  >
                    Application Received
                  </h3>
                  <p
                    className="text-sm mb-6"
                    style={{ color: "rgba(232,237,248,0.65)" }}
                  >
                    Thank you for your interest in partnering with Cybin
                    Enterprises. Our partnership team will review your
                    application and reach out within 2–3 business days.
                  </p>
                  <Link
                    to="/"
                    data-ocid="partners.success.home.link"
                    className="cybin-btn-secondary text-sm"
                  >
                    Return to Home <ChevronRight size={14} />
                  </Link>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="rounded-2xl p-7 sm:p-8"
                  data-ocid="partners.form"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="companyName"
                        className="block text-xs font-semibold uppercase tracking-wider mb-2"
                        style={{ color: "rgba(232,237,248,0.55)" }}
                      >
                        Company Name *
                      </label>
                      <input
                        id="companyName"
                        type="text"
                        required
                        maxLength={200}
                        data-ocid="partners.company_name.input"
                        value={formData.companyName}
                        onChange={(e) =>
                          setFormData((p) => ({
                            ...p,
                            companyName: e.target.value,
                          }))
                        }
                        placeholder="Acme Corp"
                        className="w-full px-4 py-3 rounded-xl text-sm transition-all"
                        style={{
                          backgroundColor: "rgba(255,255,255,0.04)",
                          border: "1.5px solid rgba(255,255,255,0.1)",
                          color: "#e8edf8",
                          outline: "none",
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor =
                            "rgba(0,212,184,0.5)";
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor =
                            "rgba(255,255,255,0.1)";
                        }}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contactName"
                        className="block text-xs font-semibold uppercase tracking-wider mb-2"
                        style={{ color: "rgba(232,237,248,0.55)" }}
                      >
                        Contact Name *
                      </label>
                      <input
                        id="contactName"
                        type="text"
                        required
                        maxLength={100}
                        data-ocid="partners.contact_name.input"
                        value={formData.contactName}
                        onChange={(e) =>
                          setFormData((p) => ({
                            ...p,
                            contactName: e.target.value,
                          }))
                        }
                        placeholder="Jane Smith"
                        className="w-full px-4 py-3 rounded-xl text-sm transition-all"
                        style={{
                          backgroundColor: "rgba(255,255,255,0.04)",
                          border: "1.5px solid rgba(255,255,255,0.1)",
                          color: "#e8edf8",
                          outline: "none",
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor =
                            "rgba(0,212,184,0.5)";
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor =
                            "rgba(255,255,255,0.1)";
                        }}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs font-semibold uppercase tracking-wider mb-2"
                        style={{ color: "rgba(232,237,248,0.55)" }}
                      >
                        Business Email *
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        maxLength={254}
                        data-ocid="partners.email.input"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData((p) => ({
                            ...p,
                            email: e.target.value,
                          }))
                        }
                        placeholder="jane@acmecorp.com"
                        className="w-full px-4 py-3 rounded-xl text-sm transition-all"
                        style={{
                          backgroundColor: "rgba(255,255,255,0.04)",
                          border: "1.5px solid rgba(255,255,255,0.1)",
                          color: "#e8edf8",
                          outline: "none",
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor =
                            "rgba(0,212,184,0.5)";
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor =
                            "rgba(255,255,255,0.1)";
                        }}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-xs font-semibold uppercase tracking-wider mb-2"
                        style={{ color: "rgba(232,237,248,0.55)" }}
                      >
                        Phone *
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        required
                        maxLength={20}
                        data-ocid="partners.phone.input"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData((p) => ({
                            ...p,
                            phone: e.target.value,
                          }))
                        }
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-4 py-3 rounded-xl text-sm transition-all"
                        style={{
                          backgroundColor: "rgba(255,255,255,0.04)",
                          border: "1.5px solid rgba(255,255,255,0.1)",
                          color: "#e8edf8",
                          outline: "none",
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor =
                            "rgba(0,212,184,0.5)";
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor =
                            "rgba(255,255,255,0.1)";
                        }}
                      />
                    </div>
                  </div>

                  <div className="mt-5">
                    <label
                      htmlFor="partnershipType"
                      className="block text-xs font-semibold uppercase tracking-wider mb-2"
                      style={{ color: "rgba(232,237,248,0.55)" }}
                    >
                      Partnership Type
                    </label>
                    <select
                      id="partnershipType"
                      data-ocid="partners.type.select"
                      value={formData.partnershipType}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          partnershipType: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-3 rounded-xl text-sm transition-all"
                      style={{
                        backgroundColor: "rgba(255,255,255,0.04)",
                        border: "1.5px solid rgba(255,255,255,0.1)",
                        color: formData.partnershipType
                          ? "#e8edf8"
                          : "rgba(232,237,248,0.4)",
                        outline: "none",
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor =
                          "rgba(0,212,184,0.5)";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor =
                          "rgba(255,255,255,0.1)";
                      }}
                    >
                      <option
                        value=""
                        disabled
                        style={{ backgroundColor: "#080d1a" }}
                      >
                        Select a partnership type
                      </option>
                      {PARTNERSHIP_OPTIONS.map((opt) => (
                        <option
                          key={opt}
                          value={opt}
                          style={{
                            backgroundColor: "#080d1a",
                            color: "#e8edf8",
                          }}
                        >
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mt-5">
                    <label
                      htmlFor="description"
                      className="block text-xs font-semibold uppercase tracking-wider mb-2"
                      style={{ color: "rgba(232,237,248,0.55)" }}
                    >
                      Tell Us About Your Business &amp; Partnership Goals *
                    </label>
                    <textarea
                      id="description"
                      required
                      maxLength={2000}
                      rows={4}
                      data-ocid="partners.description.textarea"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          description: e.target.value,
                        }))
                      }
                      placeholder="Briefly describe your company, your client base, and what you're hoping to achieve through this partnership..."
                      className="w-full px-4 py-3 rounded-xl text-sm transition-all resize-none"
                      style={{
                        backgroundColor: "rgba(255,255,255,0.04)",
                        border: "1.5px solid rgba(255,255,255,0.1)",
                        color: "#e8edf8",
                        outline: "none",
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor =
                          "rgba(0,212,184,0.5)";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor =
                          "rgba(255,255,255,0.1)";
                      }}
                    />
                  </div>

                  {formError && (
                    <div
                      data-ocid="partners.form.error_state"
                      className="mt-4 px-4 py-3 rounded-xl text-sm"
                      style={{
                        backgroundColor: "rgba(255,107,107,0.08)",
                        border: "1px solid rgba(255,107,107,0.25)",
                        color: "#ff6b6b",
                      }}
                    >
                      {formError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={mutation.isPending}
                    data-ocid="partners.form.submit_button"
                    className="mt-6 w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-sm transition-all"
                    style={{
                      background: mutation.isPending
                        ? "rgba(0,212,184,0.3)"
                        : "linear-gradient(135deg, #00d4b8, #00b89a)",
                      color: mutation.isPending
                        ? "rgba(255,255,255,0.5)"
                        : "#0a0f1e",
                      border: "none",
                      cursor: mutation.isPending ? "not-allowed" : "pointer",
                      fontFamily: "Cabinet Grotesk, sans-serif",
                    }}
                  >
                    {mutation.isPending ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send size={15} />
                        Submit Partnership Application
                      </>
                    )}
                  </button>

                  <p
                    className="text-xs text-center mt-4"
                    style={{ color: "rgba(232,237,248,0.3)" }}
                  >
                    By submitting, you acknowledge our{" "}
                    <Link to="/privacy-policy" style={{ color: "#00d4b8" }}>
                      Privacy Policy
                    </Link>{" "}
                    and{" "}
                    <Link to="/terms-of-service" style={{ color: "#00d4b8" }}>
                      Terms of Service
                    </Link>
                    .
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Notice at Collection */}
      <section style={{ backgroundColor: "#0a0f1e", padding: "32px 0" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="rounded-xl p-5 text-center"
            style={{
              backgroundColor: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <p
              className="text-xs leading-relaxed"
              style={{ color: "rgba(232,237,248,0.35)" }}
            >
              <strong style={{ color: "rgba(232,237,248,0.5)" }}>
                Notice at Collection:
              </strong>{" "}
              Cybin Enterprises collects contact and business information
              submitted through this form for the purpose of evaluating
              partnership opportunities. Cybin maintains strict AML/KYC
              protocols. Preliminary assessments are for consultation only; full
              verification is required prior to account activation. We do not
              sell your personal information to third parties. For details,
              review our{" "}
              <Link to="/privacy-policy" style={{ color: "#00d4b8" }}>
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
