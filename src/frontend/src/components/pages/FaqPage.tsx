import { JsonLd } from "@/components/JsonLd";
import { useSeo } from "@/hooks/useSeo";
import { Link } from "@/lib/router";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

const faqSections = [
  {
    section: "High-Risk Payment Processing Basics",
    faqs: [
      {
        q: "What is a high-risk merchant account?",
        a: "A high-risk merchant account is a payment processing account designed for businesses that payment processors consider to carry elevated financial or regulatory risk. This can be due to industry type, chargeback history, business model, or geographic location.",
      },
      {
        q: "What makes a business high-risk?",
        a: "Factors include operating in a regulated or controversial industry (CBD, telemedicine, gaming), having elevated chargeback rates, selling subscription products, processing high transaction volumes, operating internationally, or having a history of account terminations.",
      },
      {
        q: "Can a high-risk business get payment processing?",
        a: "Yes. Specialized high-risk payment processors like Cybin Enterprises work with businesses that traditional banks and processors decline. Options include domestic high-risk processors and international acquiring banks.",
      },
      {
        q: "How long does high-risk merchant account approval take?",
        a: "Approval timelines vary. Standard high-risk approvals can take 3 to 10 business days. MATCH list merchants or businesses with complex histories may take longer depending on documentation requirements.",
      },
      {
        q: "What documents are needed for a high-risk merchant account?",
        a: "Typically: business formation documents, government-issued ID, bank statements (3–6 months), processing history if available, business model description, FEIN, and any relevant licenses for regulated industries.",
      },
      {
        q: "What industries are considered high-risk for payment processing?",
        a: "Common high-risk industries include CBD and cannabinoids, nutraceuticals, supplements, research peptides, telemedicine, digital health, seeds and clones, online gaming, forex and cryptocurrency, adult entertainment, firearms, tobacco and vape, travel and booking, debt collection, and subscription commerce.",
      },
      {
        q: "What is the MATCH list?",
        a: "The MATCH (Member Alert to Control High-Risk Merchants) list is a database maintained by Mastercard that payment processors use to flag merchants whose accounts were previously terminated for reasons such as fraud, excessive chargebacks, or violations of card network rules.",
      },
      {
        q: "Can I get a merchant account if I'm on the MATCH list?",
        a: "Yes. Cybin Enterprises specializes in working with MATCH list merchants. While domestic options are limited, international acquiring banks often accept MATCH list merchants with the right documentation and business presentation.",
      },
      {
        q: "How do I get removed from the MATCH list?",
        a: "Removal requires the original processor that placed you on the list to submit a removal request, typically after the underlying issue is resolved. Cybin Enterprises can help you understand the circumstances of your listing and explore processing options while the listing is active.",
      },
      {
        q: "What is the difference between a high-risk processor and a regular processor?",
        a: "High-risk processors specialize in underwriting complex merchant accounts, accepting higher chargeback ratios, serving restricted industries, and offering international acquiring relationships. Regular processors like Stripe or Square have automated systems that flag and terminate high-risk accounts.",
      },
    ],
  },
  {
    section: "Cybin Enterprises Services",
    faqs: [
      {
        q: "What does Cybin Enterprises do?",
        a: "Cybin Enterprises helps high-risk and difficult-to-place businesses access stable payment processing solutions. Services include domestic and international merchant account placement, MATCH list merchant support, chargeback prevention, and ongoing account stability guidance.",
      },
      {
        q: "Who founded Cybin Enterprises?",
        a: "Cybin Enterprises was co-founded by Mel Kotchey (CEO) and Shane Suehr (COO). Mel brings 28 years in medical and regulated industries; Shane specializes in logistics, cybersecurity, and health-technology.",
      },
      {
        q: "Does Cybin Enterprises offer international payment processing?",
        a: "Yes. Cybin Enterprises has relationships with international acquiring banks that accept merchants declined by U.S. processors, including MATCH list merchants and businesses in heavily regulated industries.",
      },
      {
        q: "Does Cybin Enterprises work with all legal industries?",
        a: "Yes. Cybin Enterprises works with merchants across all legal industries, including those typically categorized as high-risk or difficult to place. If a business operates legally, Cybin Enterprises can review it.",
      },
      {
        q: "What is Fraud Deflect?",
        a: "Fraud Deflect is Cybin Enterprises' optional chargeback prevention add-on. It integrates with the Ethoca and Verifi dispute alert networks to notify merchants in near real-time when a cardholder initiates a dispute — before it becomes a formal chargeback.",
      },
      {
        q: "How does the Cybin Enterprises approval process work?",
        a: "The process has five steps: Business Review, Payment Infrastructure Planning, Approval Preparation, Account Activation, and Ongoing Stability Support. Merchants start by completing the intake wizard at cybinenterprises.com/apply.",
      },
      {
        q: "Does Cybin Enterprises offer retail payment processing?",
        a: "Yes. In addition to online payment gateways, Cybin Enterprises supports retail POS payments, mobile payment acceptance, and multi-channel commerce setups.",
      },
      {
        q: "Can Cybin Enterprises help with subscription billing?",
        a: "Yes. Subscription and recurring billing for high-risk industries is a core service. Cybin Enterprises helps structure recurring billing models that card networks and processors accept.",
      },
    ],
  },
  {
    section: "Chargebacks and Fraud",
    faqs: [
      {
        q: "What is a chargeback?",
        a: "A chargeback is a forced reversal of a payment transaction initiated by a cardholder's bank. The funds are pulled back from the merchant while the dispute is investigated. Excessive chargebacks can cause a merchant account to be terminated.",
      },
      {
        q: "What is a chargeback ratio and what is acceptable?",
        a: "Chargeback ratio is the percentage of transactions that result in chargebacks. Visa's standard threshold is 0.9% (standard program) and 1.8% (high-risk program). Mastercard's threshold is 1.0%. Exceeding these thresholds can result in account termination or fines.",
      },
      {
        q: "How can I reduce chargebacks?",
        a: "Key strategies include clear billing descriptors, responsive customer service, easy refund policies, fraud screening tools, and early dispute alert systems like Ethoca and Verifi (available through Fraud Deflect).",
      },
      {
        q: "What is friendly fraud?",
        a: "Friendly fraud occurs when a customer makes a legitimate purchase but then disputes the charge with their bank — claiming they didn't authorize it or didn't receive the product. It is one of the leading causes of chargebacks.",
      },
      {
        q: "What is the Ethoca network?",
        a: "Ethoca is a Mastercard-owned dispute resolution network that provides near real-time alerts to merchants when a cardholder contacts their bank about a transaction. Merchants can use this alert to issue a refund and cancel the order before a formal chargeback is filed.",
      },
      {
        q: "What is the Verifi network?",
        a: "Verifi is a Visa-owned dispute resolution platform that connects directly to the Visa network. It provides instant dispute alerts for Visa transactions, allowing merchants to resolve issues before they escalate to chargebacks.",
      },
      {
        q: "What is a chargeback representment?",
        a: "Chargeback representment is the process where a merchant contests a chargeback by providing evidence that the transaction was legitimate. Winning representments can recover funds, but the process is time-consuming and success rates vary.",
      },
    ],
  },
  {
    section: "Industry-Specific Questions",
    faqs: [
      {
        q: "Can CBD businesses get merchant accounts?",
        a: "Yes. CBD businesses can access payment processing through specialized high-risk processors. Cybin Enterprises works with CBD, hemp, and botanical product merchants to find stable domestic and international processing options.",
      },
      {
        q: "Can telemedicine platforms get payment processing?",
        a: "Yes. Telemedicine and digital health platforms are considered high-risk due to regulatory complexity and chargeback exposure. Cybin Enterprises has experience working with telemedicine merchants across multiple specialties.",
      },
      {
        q: "Can nutraceutical and supplement companies get merchant accounts?",
        a: "Yes. Nutraceuticals, supplements, and wellness products are classified as high-risk due to subscription billing models, health claims, and chargeback rates. Cybin Enterprises works with these merchants to secure stable processing.",
      },
      {
        q: "Can research peptide companies accept credit card payments?",
        a: "Yes, with the right processor. Research peptide merchants are classified as high-risk and are declined by most mainstream processors. Cybin Enterprises works with peptide merchants to structure accounts that domestic and international processors will approve.",
      },
      {
        q: "Can online gaming businesses get payment processing?",
        a: "Yes. Online gaming and digital entertainment businesses require high-risk merchant accounts. International processing options are often the most viable path for gaming merchants depending on jurisdiction.",
      },
      {
        q: "Can forex and crypto businesses get merchant accounts?",
        a: "Yes. Forex trading platforms and cryptocurrency-related businesses are classified as high-risk. Cybin Enterprises reviews each business individually and identifies the most appropriate processing pathway.",
      },
      {
        q: "Can firearms dealers accept credit card payments?",
        a: "Yes. Firearms, ammunition, and accessories dealers are categorized as high-risk but can access specialized merchant accounts. Cybin Enterprises works with licensed dealers to find processing solutions.",
      },
      {
        q: "Can debt collection agencies get payment processing?",
        a: "Yes. Debt collection is classified as high-risk due to regulatory oversight and chargeback exposure. Cybin Enterprises helps collection agencies access processing solutions compliant with applicable regulations.",
      },
    ],
  },
  {
    section: "Account Stability and Compliance",
    faqs: [
      {
        q: "Why do payment processors shut down merchant accounts suddenly?",
        a: "Processors close accounts due to elevated chargeback ratios, industry policy changes, fraud risk signals, card network rule violations, or regulatory pressure. High-risk merchants are particularly vulnerable to sudden terminations.",
      },
      {
        q: "What should I do if my merchant account was shut down?",
        a: "First, document everything — the termination notice, reason given, and your processing history. Then contact a specialist like Cybin Enterprises to understand your options, which may include domestic alternatives, international processing, or MATCH list remediation.",
      },
      {
        q: "What is a reserve account for high-risk merchants?",
        a: "A reserve account is a portion of a merchant's processing volume held by the processor as a security deposit against potential chargebacks or fraud losses. Reserves are common for high-risk merchants and typically range from 5% to 15% of monthly volume.",
      },
      {
        q: "What is AML/KYC compliance in payment processing?",
        a: "AML (Anti-Money Laundering) and KYC (Know Your Customer) are regulatory frameworks that payment processors must follow. Merchants are required to provide documentation to verify their identity, business legitimacy, and source of funds as part of the onboarding process.",
      },
      {
        q: "What is PCI DSS compliance?",
        a: "PCI DSS (Payment Card Industry Data Security Standard) is a set of security standards that all businesses processing card payments must follow to protect cardholder data. Compliance is required by card networks and helps prevent data breaches.",
      },
      {
        q: "What is a billing descriptor and why does it matter?",
        a: "A billing descriptor is the text that appears on a cardholder's bank statement identifying the merchant. Clear, recognizable descriptors reduce friendly fraud by helping customers identify charges they made, which reduces unnecessary dispute filings.",
      },
    ],
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        data-ocid="faq.toggle"
        style={{
          width: "100%",
          background: "none",
          border: "none",
          padding: "20px 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 16,
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <span
          style={{
            color: "#e8edf8",
            fontSize: "1rem",
            fontWeight: 600,
            lineHeight: 1.5,
          }}
        >
          {q}
        </span>
        <span style={{ color: "#00d4b8", flexShrink: 0, marginTop: 2 }}>
          {open ? (
            <ChevronDown size={18} />
          ) : (
            <ChevronDown size={18} style={{ transform: "rotate(-90deg)" }} />
          )}
        </span>
      </button>
      {open && (
        <div
          style={{
            color: "rgba(232,237,248,0.72)",
            lineHeight: 1.8,
            fontSize: "0.97rem",
            paddingBottom: 20,
          }}
        >
          {a}
        </div>
      )}
    </div>
  );
}

export default function FaqPage() {
  useSeo({
    title: "High-Risk Payment Processing FAQ | Cybin Enterprises",
    description:
      "Answers to the most common questions about high-risk merchant accounts, MATCH list processing, chargebacks, CBD payments, telemedicine processing, and more.",
    canonical: "/faq",
  });

  const allFaqs = faqSections.flatMap((s) => s.faqs);

  return (
    <div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: allFaqs.map((faq) => ({
            "@type": "Question",
            name: faq.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.a,
            },
          })),
        }}
      />

      {/* Hero */}
      <section
        style={{
          background:
            "linear-gradient(135deg, #0a0f1e 0%, #120820 50%, #0a0f1e 100%)",
          padding: "80px 0 60px",
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span
            className="text-xs font-bold uppercase tracking-widest"
            style={{ color: "#00d4b8" }}
          >
            Knowledge Base
          </span>
          <h1
            className="text-4xl sm:text-5xl font-bold mt-4 mb-6"
            style={{
              fontFamily: "Sora, system-ui, sans-serif",
              color: "#e8edf8",
            }}
          >
            Frequently Asked Questions
          </h1>
          <p
            className="text-lg"
            style={{
              color: "rgba(232,237,248,0.7)",
              lineHeight: 1.8,
              maxWidth: 640,
              margin: "0 auto",
            }}
          >
            Answers to the most common questions about high-risk payment
            processing, MATCH list merchants, chargebacks, and Cybin
            Enterprises' services.
          </p>
        </div>
      </section>

      {/* FAQ Sections */}
      <section style={{ backgroundColor: "#0a0f1e", padding: "60px 0 80px" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {faqSections.map((section) => (
            <div key={section.section} className="mb-14">
              <h2
                className="text-2xl font-bold mb-2"
                style={{
                  fontFamily: "Sora, system-ui, sans-serif",
                  color: "#e8edf8",
                  borderLeft: "3px solid #00d4b8",
                  paddingLeft: 16,
                }}
              >
                {section.section}
              </h2>
              <div style={{ marginTop: 16 }}>
                {section.faqs.map((faq) => (
                  <FaqItem key={faq.q} q={faq.q} a={faq.a} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: "#0a0f1e", padding: "64px 0" }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2
            className="text-3xl font-bold mb-5"
            style={{
              fontFamily: "Sora, system-ui, sans-serif",
              color: "#e8edf8",
            }}
          >
            Still Have Questions?
          </h2>
          <p
            className="mb-8"
            style={{ color: "rgba(232,237,248,0.6)", fontSize: "1.05rem" }}
          >
            Our team is ready to help you understand your payment processing
            options.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/apply" className="cybin-btn-primary">
              Start Your Approval Process <ChevronRight size={16} />
            </Link>
            <Link to="/contact" className="cybin-btn-secondary">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
