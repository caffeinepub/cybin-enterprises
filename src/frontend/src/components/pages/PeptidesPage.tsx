import NeuronCanvas from "@/components/NeuronCanvas";
import { useTheme } from "@/contexts/ThemeContext";
import { useSeo } from "@/hooks/useSeo";
import { Link } from "@/lib/router";
import {
  AlertCircle,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  FlaskConical,
  Globe,
  Shield,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    q: "Can I get a merchant account for peptide sales?",
    a: "Yes \u2014 but not through standard processors. Peptide businesses require specialized high-risk merchant accounts with acquiring banks that understand the category. Both FDA-compliant finished products and research-designated compounds can be approved through the right processor channels, depending on your compliance documentation and business model.",
  },
  {
    q: "Why do processors reject peptide businesses?",
    a: "Most payment processors use automated risk scoring that flags anything adjacent to pharmaceuticals, regardless of actual regulatory status. The peptides category triggers those flags because of evolving FDA guidance and the research-use designation. Specialized high-risk processors evaluate your actual compliance profile rather than relying on keyword-based rejection.",
  },
  {
    q: "Is selling peptides legal?",
    a: "The legality of peptide sales depends on the specific compound, how it is classified, how it is labeled, and how it is marketed. Some peptides are available as supplements or cosmetic ingredients with proper labeling. Others may only be sold for research purposes. Merchants are responsible for understanding the regulatory status of their specific products. We recommend consulting qualified legal counsel for any compliance questions.",
  },
  {
    q: "What documentation do I need for a peptides merchant account?",
    a: "Typically: business registration documents, certificate of incorporation, bank statements (3\u20136 months), processing history if available, product descriptions and labeling samples, COAs (certificates of analysis) for your products, and your terms of service and refund policy. Research-use peptide suppliers should also be prepared to provide documentation showing how the research-use designation is enforced in their sales process.",
  },
  {
    q: "How long does approval take for a peptide merchant account?",
    a: "Approval timelines for peptide accounts typically run 5\u201314 business days, slightly longer than standard high-risk categories due to the documentation review required. Enterprise or high-volume applications may take longer for underwriting.",
  },
  {
    q: "Can I process international orders for peptide sales?",
    a: "International processing is available for some peptide merchant accounts depending on the processor, your specific products, and the destination countries. This is determined during the account review process.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const { resolved } = useTheme();
  const isLight = resolved === "light";
  return (
    <div
      style={{
        border: isLight
          ? "1px solid rgba(0,0,0,0.08)"
          : "1px solid rgba(255,255,255,0.07)",
        borderRadius: 12,
        overflow: "hidden",
        backgroundColor: isLight ? "#ffffff" : "rgba(255,255,255,0.03)",
      }}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          textAlign: "left",
          padding: "20px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "none",
          border: "none",
          cursor: "pointer",
          gap: 12,
        }}
      >
        <span
          style={{
            fontWeight: 600,
            fontSize: "0.97rem",
            color: isLight ? "#0a0f1e" : "#E8EDF8",
          }}
        >
          {q}
        </span>
        <ChevronDown
          size={16}
          style={{
            flexShrink: 0,
            color: "#7c5cbf",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s",
          }}
        />
      </button>
      {open && (
        <div
          style={{
            padding: "0 24px 20px",
            color: isLight ? "rgba(10,22,40,0.7)" : "#D4E0F5",
            lineHeight: 1.7,
            fontSize: "0.92rem",
          }}
        >
          {a}
        </div>
      )}
    </div>
  );
}

export default function PeptidesPage() {
  useSeo({
    canonical: "https://cybinenterprises.com/industries/peptides",
    title:
      "Peptides Merchant Account | High-Risk Payment Processing | Cybin Enterprises",
    description:
      "Get approved for peptide payment processing \u2014 FDA-compliant products and research compounds. Cybin Enterprises structures high-risk merchant accounts for the peptides vertical.",
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-8"
            style={{
              backgroundColor: "rgba(99,102,241,0.12)",
              border: "1px solid rgba(99,102,241,0.3)",
              color: "#D4E0F5",
            }}
          >
            <FlaskConical size={12} /> Peptides Payment Processing
          </div>
          <h1
            style={{
              fontFamily: '"Playfair Display", "Sora", Georgia, serif',
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 700,
              color: "#E8EDF8",
              lineHeight: 1.2,
              marginBottom: 24,
            }}
          >
            Peptides Payment Processing \u2014{" "}
            <span style={{ color: "#7c5cbf" }}>
              Stable Merchant Accounts for a Complex Vertical
            </span>
          </h1>
          <p
            style={{
              fontSize: "1.1rem",
              color: "#D4E0F5",
              lineHeight: 1.7,
              marginBottom: 32,
              maxWidth: 700,
              margin: "0 auto 32px",
            }}
          >
            The peptides market sits at the intersection of cutting-edge science
            and regulatory complexity. Most payment processors won\u2019t touch
            it. We\u2019ve structured accounts specifically for both
            FDA-compliant peptide products and research-use compounds \u2014 and
            we know the difference.
          </p>
          <Link
            to="/apply"
            data-ocid="peptides.apply.button"
            className="cybin-btn-blue"
          >
            Get a Free Peptides Account Review <ChevronRight size={15} />
          </Link>
        </div>
      </section>

      {/* Reframe paragraph */}
      <section
        style={{
          backgroundColor: isLight ? "#F0F4FF" : "#110F22",
          padding: "60px 0",
        }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p
            style={{
              fontSize: "1.05rem",
              color: isLight ? "rgba(155,150,198,0.5)" : "#D4E0F5",
              lineHeight: 1.8,
            }}
          >
            Peptide businesses aren\u2019t risky because they\u2019re reckless
            \u2014 they\u2019re classified as high-risk because traditional
            payment networks lack the frameworks to evaluate them. Regulatory
            ambiguity, product labeling requirements, and the research-use
            designation create friction that standard processors won\u2019t
            navigate.{" "}
            <strong style={{ color: isLight ? "#7c5cbf" : "#D4E0F5" }}>
              We do.
            </strong>
          </p>
        </div>
      </section>

      {/* Section A: FDA-Compliant */}
      <section
        style={{
          backgroundColor: isLight ? "#ffffff" : "#0a0f1e",
          padding: "80px 0",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-6"
                style={{
                  backgroundColor: "rgba(99,102,241,0.1)",
                  border: "1px solid rgba(99,102,241,0.3)",
                  color: "#7c5cbf",
                }}
              >
                <Shield size={12} /> Section A
              </div>
              <h2
                style={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontSize: "1.75rem",
                  fontWeight: 700,
                  color: isLight ? "#0a0f1e" : "#E8EDF8",
                  marginBottom: 16,
                }}
              >
                FDA-Compliant Peptides: Merchant Accounts for Finished Products
              </h2>
              <p
                style={{
                  color: isLight ? "rgba(10,22,40,0.65)" : "#D4E0F5",
                  lineHeight: 1.75,
                  marginBottom: 24,
                }}
              >
                For manufacturers and retailers of peptide products formulated,
                labeled, and marketed in compliance with FDA guidelines for
                supplements or cosmetic applications.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  "Standard processors reject applications citing \u2018pharmaceutical\u2019 classification without reviewing actual compliance status",
                  "FDA guidance on peptides is evolving \u2014 processors interpret uncertainty as automatic risk",
                  "Product labeling flagged regardless of actual compliance posture",
                  "Chargeback rates in the supplements space trigger early account reviews",
                ].map((pain) => (
                  <div
                    key={pain}
                    className="flex gap-3"
                    style={{
                      padding: "12px 16px",
                      borderRadius: 10,
                      backgroundColor: isLight
                        ? "rgba(10,40,100,0.04)"
                        : "rgba(255,255,255,0.03)",
                      border: `1px solid ${isLight ? "rgba(10,40,100,0.08)" : "rgba(255,255,255,0.06)"}`,
                    }}
                  >
                    <AlertCircle
                      size={15}
                      style={{ color: "#C9A84C", flexShrink: 0, marginTop: 2 }}
                    />
                    <p
                      style={{
                        fontSize: "0.875rem",
                        color: isLight
                          ? "rgba(10,22,40,0.7)"
                          : "rgba(232,240,255,0.7)",
                        lineHeight: 1.6,
                      }}
                    >
                      {pain}
                    </p>
                  </div>
                ))}
              </div>
              <div
                style={{
                  padding: "20px 24px",
                  borderRadius: 12,
                  backgroundColor: "rgba(99,102,241,0.08)",
                  border: "1px solid rgba(99,102,241,0.2)",
                }}
              >
                <p
                  style={{
                    color: isLight ? "#1A3A6B" : "#E8EDF8",
                    lineHeight: 1.7,
                    fontSize: "0.95rem",
                  }}
                >
                  \u201cWe work with acquiring banks that evaluate your actual
                  compliance posture \u2014 your COAs, your labeling, your
                  marketing claims \u2014 rather than auto-rejecting based on
                  the word peptides.\u201d
                </p>
              </div>
            </div>
            <div
              style={{
                padding: "40px",
                borderRadius: 20,
                background: isLight
                  ? "#F0F4FF"
                  : "linear-gradient(135deg, rgba(99,102,241,0.08), rgba(15,32,64,0.8))",
                border: `1px solid ${isLight ? "rgba(99,102,241,0.15)" : "rgba(99,102,241,0.2)"}`,
              }}
            >
              <h3
                style={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontSize: "1.2rem",
                  fontWeight: 600,
                  color: isLight ? "#0a0f1e" : "#E8EDF8",
                  marginBottom: 20,
                }}
              >
                What We Offer
              </h3>
              {[
                {
                  icon: CheckCircle,
                  title: "Compliance-Aware Underwriting",
                  desc: "Banks that review your actual COAs and labeling",
                },
                {
                  icon: Shield,
                  title: "Supplement Framework Processing",
                  desc: "Accounts structured under FDA supplement guidelines",
                },
                {
                  icon: TrendingUp,
                  title: "Chargeback Management",
                  desc: "Built-in dispute tools for the supplements vertical",
                },
                {
                  icon: Globe,
                  title: "Domestic & International",
                  desc: "Multi-processor access for broader reach",
                },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex gap-4 mb-5">
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 8,
                      backgroundColor: "rgba(99,102,241,0.12)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={16} style={{ color: "#D4E0F5" }} />
                  </div>
                  <div>
                    <p
                      style={{
                        fontWeight: 600,
                        fontSize: "0.9rem",
                        color: isLight ? "#0a0f1e" : "#E8EDF8",
                        marginBottom: 2,
                      }}
                    >
                      {title}
                    </p>
                    <p
                      style={{
                        fontSize: "0.82rem",
                        color: isLight ? "rgba(10,22,40,0.6)" : "#D4E0F5",
                      }}
                    >
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
              <Link
                to="/apply"
                data-ocid="peptides.section_a.button"
                className="cybin-btn-blue"
                style={{
                  width: "100%",
                  justifyContent: "center",
                  marginTop: 8,
                }}
              >
                Apply for FDA-Compliant Account <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Visual divider */}
      <div
        style={{
          height: 2,
          background:
            "linear-gradient(90deg, transparent, #7c5cbf, transparent)",
        }}
      />

      {/* Section B: Research-Use */}
      <section
        style={{
          backgroundColor: isLight ? "#F0F4FF" : "#110F22",
          padding: "80px 0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {!isLight && <NeuronCanvas mode="dark" />}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div
              style={{
                padding: "40px",
                borderRadius: 20,
                background: isLight ? "#ffffff" : "rgba(255,255,255,0.03)",
                border: `1px solid ${isLight ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)"}`,
              }}
            >
              <h3
                style={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontSize: "1.2rem",
                  fontWeight: 600,
                  color: isLight ? "#0a0f1e" : "#E8EDF8",
                  marginBottom: 20,
                }}
              >
                Who This Is For
              </h3>
              {[
                {
                  title: "Research Labs & Suppliers",
                  desc: "Businesses selling peptides designated for research use only",
                },
                {
                  title: "Compliant Marketers",
                  desc: "Products clearly labeled \u2018research use only, not for human consumption\u2019",
                },
                {
                  title: "International Researchers",
                  desc: "Operations serving legitimate global research buyers",
                },
                {
                  title: "High-AOV Sellers",
                  desc: "Businesses with larger average order values common in the research supply industry",
                },
              ].map(({ title, desc }) => (
                <div key={title} className="flex gap-4 mb-5">
                  <CheckCircle
                    size={16}
                    style={{ color: "#00d4b8", flexShrink: 0, marginTop: 3 }}
                  />
                  <div>
                    <p
                      style={{
                        fontWeight: 600,
                        fontSize: "0.9rem",
                        color: isLight ? "#0a0f1e" : "#E8EDF8",
                        marginBottom: 2,
                      }}
                    >
                      {title}
                    </p>
                    <p
                      style={{
                        fontSize: "0.82rem",
                        color: isLight ? "rgba(10,22,40,0.6)" : "#D4E0F5",
                      }}
                    >
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
              <Link
                to="/apply"
                data-ocid="peptides.section_b.button"
                className="cybin-btn-blue"
                style={{
                  width: "100%",
                  justifyContent: "center",
                  marginTop: 8,
                }}
              >
                Apply for Research Peptide Account <ChevronRight size={14} />
              </Link>
            </div>
            <div>
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-6"
                style={{
                  backgroundColor: "rgba(52,211,153,0.1)",
                  border: "1px solid rgba(52,211,153,0.3)",
                  color: "#00d4b8",
                }}
              >
                <FlaskConical size={12} /> Section B
              </div>
              <h2
                style={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontSize: "1.75rem",
                  fontWeight: 700,
                  color: isLight ? "#0a0f1e" : "#E8EDF8",
                  marginBottom: 16,
                }}
              >
                Research Peptides: Merchant Accounts for Labs, Suppliers, and
                Research Compounds
              </h2>
              <p
                style={{
                  color: isLight ? "rgba(10,22,40,0.65)" : "#D4E0F5",
                  lineHeight: 1.75,
                  marginBottom: 24,
                }}
              >
                For businesses selling peptides clearly designated for research
                use only, not for human consumption, with appropriate labeling
                and full legal compliance.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  "\u2018Research use only\u2019 designation frequently misunderstood \u2014 accounts flagged as pharmaceutical regardless of marketing",
                  "International orders common in research community trigger cross-border risk flags",
                  "High average order values create chargeback exposure most processors avoid",
                  "Most processors won\u2019t onboard this category at all",
                ].map((pain) => (
                  <div
                    key={pain}
                    className="flex gap-3"
                    style={{
                      padding: "12px 16px",
                      borderRadius: 10,
                      backgroundColor: isLight
                        ? "rgba(10,40,100,0.04)"
                        : "rgba(255,255,255,0.03)",
                      border: `1px solid ${isLight ? "rgba(10,40,100,0.08)" : "rgba(255,255,255,0.06)"}`,
                    }}
                  >
                    <AlertCircle
                      size={15}
                      style={{ color: "#C9A84C", flexShrink: 0, marginTop: 2 }}
                    />
                    <p
                      style={{
                        fontSize: "0.875rem",
                        color: isLight
                          ? "rgba(10,22,40,0.7)"
                          : "rgba(232,240,255,0.7)",
                        lineHeight: 1.6,
                      }}
                    >
                      {pain}
                    </p>
                  </div>
                ))}
              </div>
              <div
                style={{
                  padding: "20px 24px",
                  borderRadius: 12,
                  backgroundColor: "rgba(52,211,153,0.08)",
                  border: "1px solid rgba(52,211,153,0.2)",
                }}
              >
                <p
                  style={{
                    color: isLight ? "#1A3A6B" : "#E8EDF8",
                    lineHeight: 1.7,
                    fontSize: "0.95rem",
                  }}
                >
                  \u201cWe\u2019ve structured accounts for research peptide
                  suppliers who comply fully with applicable regulations and
                  market exclusively to legitimate research buyers. If your
                  business is clean, compliant, and operating within legal
                  boundaries \u2014 we can find a path forward.\u201d
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance note */}
      <section
        style={{
          backgroundColor: isLight ? "#ffffff" : "#0a0f1e",
          padding: "40px 0",
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            style={{
              padding: "24px 28px",
              borderRadius: 12,
              backgroundColor: "rgba(201,168,76,0.08)",
              border: "1px solid rgba(201,168,76,0.3)",
            }}
          >
            <div className="flex gap-3">
              <AlertCircle
                size={18}
                style={{ color: "#C9A84C", flexShrink: 0, marginTop: 2 }}
              />
              <p
                style={{
                  fontSize: "0.875rem",
                  color: isLight
                    ? "rgba(10,22,40,0.75)"
                    : "rgba(232,240,255,0.7)",
                  lineHeight: 1.7,
                }}
              >
                <strong style={{ color: "#C9A84C" }}>Compliance Notice:</strong>{" "}
                Cybin Enterprises does not provide legal or regulatory advice.
                Merchants are responsible for ensuring their products, labeling,
                and marketing comply with all applicable federal and state
                regulations. Account approval is contingent on underwriting
                review of your specific compliance posture.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        style={{
          backgroundColor: isLight ? "#F0F4FF" : "#110F22",
          padding: "80px 0",
        }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: "2rem",
                fontWeight: 700,
                color: isLight ? "#0a0f1e" : "#E8EDF8",
                marginBottom: 12,
              }}
            >
              Frequently Asked Questions
            </h2>
            <p style={{ color: isLight ? "rgba(155,150,198,0.5)" : "#D4E0F5" }}>
              Answers to the most common questions about peptide payment
              processing.
            </p>
          </div>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          backgroundColor: isLight ? "#ffffff" : "#0a0f1e",
          padding: "80px 0",
        }}
      >
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: "2rem",
              fontWeight: 700,
              color: isLight ? "#0a0f1e" : "#E8EDF8",
              marginBottom: 16,
            }}
          >
            Ready to Get Your Peptide Account Approved?
          </h2>
          <p
            style={{
              color: isLight ? "rgba(155,150,198,0.5)" : "#D4E0F5",
              marginBottom: 32,
            }}
          >
            Free review, no commitment. A real person reviews your situation
            within 24 hours.
          </p>
          <Link
            to="/apply"
            data-ocid="peptides.final.button"
            className="cybin-btn-blue"
          >
            Get a Free Peptides Account Review <ChevronRight size={15} />
          </Link>
          <div
            className="mt-6 flex flex-wrap justify-center gap-4 text-sm"
            style={{ color: isLight ? "rgba(155,150,198,0.5)" : "#D4E0F5" }}
          >
            <Link to="/solutions" style={{ color: "#7c5cbf" }}>
              Payment Solutions
            </Link>
            <span>\u00b7</span>
            <Link
              to="/industries/nutraceuticals-supplements"
              style={{ color: "#7c5cbf" }}
            >
              Related: Nutraceuticals
            </Link>
            <span>\u00b7</span>
            <Link to="/industries" style={{ color: "#7c5cbf" }}>
              All Industries
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
