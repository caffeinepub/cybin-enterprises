import { JsonLd } from "@/components/JsonLd";
import { useSeo } from "@/hooks/useSeo";
import { Link } from "@/lib/router";
import {
  AlertTriangle,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  DollarSign,
  Globe2,
  Lock,
  Server,
  Shield,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import { useEffect, useState } from "react";

const pillars = [
  {
    id: "aml",
    icon: Shield,
    title: "AML / KYC Protocols",
    description:
      "Our partner processors enforce Anti-Money Laundering and Know Your Customer procedures aligned with FinCEN guidance. Every merchant application undergoes identity verification and risk assessment through our partners' established compliance processes.",
    details: [
      "Identity verification for all principals and beneficial owners",
      "Ongoing transaction monitoring for suspicious activity",
      "SAR (Suspicious Activity Report) filing obligations",
      "Compliance with the Bank Secrecy Act (BSA)",
    ],
    color: "#00d4b8",
  },
  {
    id: "pci",
    icon: Lock,
    title: "PCI-DSS Compliance",
    description:
      "Payment Card Industry Data Security Standard compliance is maintained by the certified processors we work with. Cardholder data is protected at every point in the transaction lifecycle through our partners' PCI-DSS certified infrastructure.",
    details: [
      "Network security and access control standards",
      "Encryption of cardholder data in transit and at rest",
      "Vulnerability management and regular security testing",
      "Maintaining an information security policy",
    ],
    color: "#a87ef5",
  },
  {
    id: "ccpa",
    icon: UserCheck,
    title: "CCPA Privacy Rights",
    description:
      "The partner solutions we facilitate support California Consumer Privacy Act requirements for merchants serving California residents. Mechanisms to honor data rights requests are managed through our partners' platforms.",
    details: [
      "Right to know what personal information is collected",
      "Right to delete personal information",
      "Right to opt-out of sale of personal information",
      "Right to non-discrimination for exercising CCPA rights",
    ],
    color: "#ffc832",
  },
  {
    id: "gdpr",
    icon: Globe2,
    title: "GDPR Readiness",
    description:
      "For merchants with European Union customers, the partner solutions we connect merchants with support General Data Protection Regulation readiness frameworks. Data processing agreements and data subject rights management are handled through our partners' compliance infrastructure.",
    details: [
      "Lawful basis for data processing documentation",
      "Data subject access and erasure request support",
      "Data minimization and purpose limitation principles",
      "Cross-border data transfer safeguards",
    ],
    color: "#60a5fa",
  },
  {
    id: "soc2",
    icon: Server,
    title: "SOC 2 Practices",
    description:
      "The processing partners we work with align with SOC 2 Trust Services Criteria covering security, availability, and processing integrity. Their systems and controls are designed to provide reliable, secure payment infrastructure.",
    details: [
      "Logical and physical access controls",
      "System availability and performance monitoring",
      "Change management and incident response procedures",
      "Vendor risk management program",
    ],
    color: "#4ade80",
  },
  {
    id: "fincen",
    icon: DollarSign,
    title: "FinCEN Monitoring",
    description:
      "Financial Crimes Enforcement Network compliance is central to the processing partners we work with. Our partners maintain registered MSB status where applicable and perform sanctions screening as part of the onboarding process.",
    details: [
      "OFAC sanctions and PEP screening",
      "Beneficial ownership collection per CDD Rule",
      "Currency transaction report (CTR) obligations",
      "Registration and compliance with FinCEN's 2026 guidance",
    ],
    color: "#ff8c42",
  },
];

const faqs = [
  {
    q: "Does Cybin Enterprises handle HIPAA-adjacent data?",
    a: "Cybin is a payment infrastructure and consultation company, not a healthcare provider or business associate. However, for merchants in telemedicine or digital health, we ensure payment processing pathways do not inadvertently capture protected health information (PHI). Merchants in these sectors are advised to maintain separate HIPAA compliance programs.",
  },
  {
    q: "What AML documentation do merchants need to provide?",
    a: "Standard onboarding requires government-issued ID for all principals with 25%+ ownership, proof of business formation, bank statements, and a business description. MATCH-listed merchants or those with elevated risk profiles may require additional documentation including a detailed compliance plan.",
  },
  {
    q: "How does Cybin protect cardholder data?",
    a: "Cybin works exclusively with PCI-DSS Level 1 compliant payment processors and gateways. Cardholder data never passes through or is stored on Cybin's own systems — it flows directly to certified processing infrastructure. Merchants are provided integration guidance that maintains PCI scope reduction.",
  },
  {
    q: "Are merchants responsible for their own GDPR compliance?",
    a: "Yes. Merchants who collect personal data from EU residents are independently responsible for GDPR compliance. Cybin supports merchants by ensuring our data processing activities are transparent and by providing Data Processing Agreements (DPAs) upon request.",
  },
  {
    q: "Does Cybin accept merchants on the MATCH list?",
    a: "MATCH list placement does not automatically disqualify a merchant. Cybin reviews each application on its merits, including the reason for MATCH listing, remediation steps taken, and the merchant's current compliance posture. Many MATCH-listed merchants have successfully onboarded through Cybin's structured review process.",
  },
  {
    q: "What is the 48-hour priority boarding process?",
    a: "Merchants who provide their FEIN during the intake wizard trigger an automated pre-check against the 2026 FinCEN database. When this preliminary check clears, our partner underwriting team prioritizes the application for a 48-hour review window, significantly accelerating the onboarding timeline.",
  },
  {
    q: "How does Cybin handle suspicious transaction activity?",
    a: "Our processing partners maintain real-time transaction monitoring systems. Patterns consistent with fraud, structuring, or money laundering trigger automated alerts and human review. Where required by law, Suspicious Activity Reports (SARs) are filed with FinCEN.",
  },
  {
    q: "What PCI-DSS level must my business comply with?",
    a: "PCI-DSS compliance level is determined by your annual transaction volume. Most small-to-mid-sized merchants qualify as Level 4 (under 1 million Visa transactions per year), which requires a Self-Assessment Questionnaire (SAQ) rather than a full audit. Cybin provides guidance on which SAQ type applies to your business model.",
  },
];

export default function CompliancePage() {
  useSeo({
    title:
      "Compliance & Security Standards | AML, KYC, PCI-DSS | Cybin Enterprises",
    description:
      "Cybin Enterprises maintains AML/KYC, PCI-DSS, CCPA, GDPR, SOC 2, and FinCEN compliance standards. Comprehensive compliance infrastructure for high-risk merchant payment processing.",
    canonical: "/compliance",
  });

  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
              name: "Compliance",
              item: "https://cybinenterprises.com/compliance",
            },
          ],
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map(({ q, a }) => ({
            "@type": "Question",
            name: q,
            acceptedAnswer: {
              "@type": "Answer",
              text: a,
            },
          })),
        }}
      />

      {/* Hero */}
      <section
        className="page-hero-bg"
        style={{
          padding: "80px 0 60px",
          borderBottom: "1px solid rgba(110,247,212,0.08)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative shield background */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            right: "-5%",
            top: "50%",
            transform: "translateY(-50%)",
            opacity: 0.04,
          }}
        >
          <Shield size={480} color="#00d4b8" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
                Compliance
              </span>
            </div>
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5 text-xs font-semibold"
              style={{
                backgroundColor: "rgba(110,247,212,0.08)",
                border: "1px solid rgba(110,247,212,0.2)",
                color: "#00d4b8",
              }}
            >
              <ShieldCheck size={12} />
              Security & Compliance
            </div>
            <h1
              className="text-4xl sm:text-5xl font-bold mb-5"
              style={{
                fontFamily: "Sora, system-ui, sans-serif",
                color: "#e8edf8",
                lineHeight: 1.15,
              }}
            >
              Compliance &amp;{" "}
              <span style={{ color: "#00d4b8" }}>Security Standards</span>
            </h1>
            <p
              className="text-lg"
              style={{ color: "rgba(232, 237, 248, 0.65)", lineHeight: 1.7 }}
            >
              Cybin Enterprises connects merchants with payment solutions built
              on rigorous compliance. Our partner processors maintain AML/KYC,
              PCI-DSS, CCPA, GDPR, and FinCEN standards — protecting merchants
              and their customers at every layer.
            </p>
          </div>
        </div>
      </section>

      {/* Compliance Pillars */}
      <section style={{ backgroundColor: "#0a0f1e", padding: "72px 0" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-up">
            <h2
              className="text-3xl font-bold mb-4"
              style={{
                fontFamily: "Sora, system-ui, sans-serif",
                color: "#e8edf8",
              }}
            >
              Compliance Standards We Work Within
            </h2>
            <p
              className="text-base max-w-xl mx-auto"
              style={{ color: "rgba(232,237,248,0.55)", lineHeight: 1.7 }}
            >
              Six compliance standards maintained by our processing partners
              that protect the merchants we serve and the financial ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map(
              ({ id, icon: Icon, title, description, details, color }, i) => (
                <div
                  key={id}
                  className="animate-fade-up cybin-glass-card p-6"
                  style={{ transitionDelay: `${i * 60}ms` }}
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
                    className="text-lg font-bold mb-3"
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
                  <div className="space-y-2.5">
                    {details.map((d) => (
                      <div key={d} className="flex items-start gap-2">
                        <span
                          style={{
                            color,
                            fontSize: "7px",
                            marginTop: "6px",
                            flexShrink: 0,
                          }}
                        >
                          ◆
                        </span>
                        <span
                          className="text-xs leading-relaxed"
                          style={{ color: "rgba(232,237,248,0.6)" }}
                        >
                          {d}
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

      {/* FAQ Section */}
      <section style={{ backgroundColor: "#080d1a", padding: "72px 0" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-up">
            <h2
              className="text-3xl font-bold mb-4"
              style={{
                fontFamily: "Sora, system-ui, sans-serif",
                color: "#e8edf8",
              }}
            >
              Compliance FAQs
            </h2>
            <p
              className="text-base"
              style={{ color: "rgba(232,237,248,0.55)" }}
            >
              Answers to common compliance and regulatory questions from
              high-risk merchants.
            </p>
          </div>

          <div className="space-y-3" data-ocid="compliance.faq.list">
            {faqs.map(({ q, a }, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={q}
                  data-ocid={`compliance.faq.item.${i + 1}`}
                  className="rounded-xl overflow-hidden animate-fade-up"
                  style={{
                    backgroundColor: isOpen
                      ? "rgba(110,247,212,0.04)"
                      : "rgba(255,255,255,0.02)",
                    border: isOpen
                      ? "1px solid rgba(110,247,212,0.2)"
                      : "1px solid rgba(255,255,255,0.07)",
                    transitionDelay: `${i * 30}ms`,
                    transition: "border-color 0.2s, background-color 0.2s",
                  }}
                >
                  <button
                    type="button"
                    data-ocid={`compliance.faq.toggle.${i + 1}`}
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                    aria-expanded={isOpen}
                  >
                    <span
                      className="text-sm font-semibold leading-snug"
                      style={{ color: isOpen ? "#00d4b8" : "#e8edf8" }}
                    >
                      {q}
                    </span>
                    {isOpen ? (
                      <ChevronUp
                        size={16}
                        style={{ color: "#00d4b8", flexShrink: 0 }}
                      />
                    ) : (
                      <ChevronDown
                        size={16}
                        style={{
                          color: "rgba(232,237,248,0.4)",
                          flexShrink: 0,
                        }}
                      />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5">
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: "rgba(232,237,248,0.65)" }}
                      >
                        {a}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Legal Notice */}
      <section style={{ backgroundColor: "#0a0f1e", padding: "40px 0" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="rounded-xl p-6"
            style={{
              backgroundColor: "rgba(255,165,30,0.04)",
              border: "1px solid rgba(255,165,30,0.15)",
            }}
          >
            <div className="flex items-start gap-3">
              <AlertTriangle
                size={16}
                style={{ color: "#ffa53d", flexShrink: 0, marginTop: "2px" }}
              />
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-wider mb-2"
                  style={{ color: "#ffa53d" }}
                >
                  Legal Disclaimer
                </p>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "rgba(232,237,248,0.5)" }}
                >
                  The compliance information provided on this page is for
                  general informational purposes only and does not constitute
                  legal, regulatory, or professional compliance advice. Cybin
                  Enterprises helps businesses access payment infrastructure but
                  does not act as a licensed compliance advisor, attorney, or
                  regulated financial institution. Merchants are independently
                  responsible for their own regulatory compliance obligations.
                  Please consult qualified legal counsel for compliance guidance
                  specific to your business. For details on how Cybin handles
                  your data, review our{" "}
                  <Link to="/privacy-policy" style={{ color: "#00d4b8" }}>
                    Privacy Policy
                  </Link>{" "}
                  and{" "}
                  <Link to="/terms-of-service" style={{ color: "#00d4b8" }}>
                    Terms of Service
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: "#0a0f1e", padding: "40px 0 72px" }}>
        <div className="max-w-3xl mx-auto px-4 text-center animate-fade-up">
          <h2
            className="text-2xl font-bold mb-4"
            style={{
              fontFamily: "Sora, system-ui, sans-serif",
              color: "#e8edf8",
            }}
          >
            Questions About Compliance Fit?
          </h2>
          <p
            className="text-sm mb-7"
            style={{ color: "rgba(232,237,248,0.55)" }}
          >
            Our team can walk you through how these compliance standards apply
            to your specific industry and situation.
          </p>
          <Link
            to="/apply"
            data-ocid="compliance.cta.primary_button"
            className="cybin-btn-primary"
          >
            Start Your Approval Process <ChevronRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
