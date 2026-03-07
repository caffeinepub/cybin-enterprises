import { JsonLd } from "@/components/JsonLd";
import { useSeo } from "@/hooks/useSeo";
import { Link } from "@/lib/router";
import {
  Award,
  Building2,
  ChevronRight,
  Globe,
  Phone,
  Shield,
  Users,
} from "lucide-react";

export default function KnowledgePage() {
  useSeo({
    title: "Cybin Enterprises — Company Overview | High-Risk Payment Processor",
    description:
      "Cybin Enterprises is a high-risk merchant services company founded by Mel Kotchey and Shane Suehr. Specializing in payment processing for CBD, nutraceuticals, telemedicine, MATCH list merchants, and all legal industries.",
    canonical: "/knowledge",
  });

  return (
    <div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": "https://cybinenterprises.com/#organization",
              name: "Cybin Enterprises",
              alternateName: ["Cybin", "Cybin Enterprises LLC"],
              url: "https://cybinenterprises.com",
              logo: "https://cybinenterprises.com/assets/cybin-logo.png",
              description:
                "Cybin Enterprises is a high-risk merchant services and payment processing company that helps businesses in difficult-to-place industries access stable, long-term payment infrastructure. Services include domestic and international payment processing, chargeback prevention, MATCH list merchant solutions, and fraud dispute alert systems.",
              foundingDate: "2023",
              founders: [
                {
                  "@type": "Person",
                  name: "Mel Kotchey",
                  jobTitle: "Co-Founder & CEO",
                  description:
                    "Award-winning entrepreneur with 28 years in medical and regulated sectors. Holds five degrees including a master's in healthcare administration. Recognized as Most Influential Businesswomen, Top 30 CEOs of the Year, and featured on the cover of Dope Magazine.",
                },
                {
                  "@type": "Person",
                  name: "Shane Suehr",
                  jobTitle: "Co-Founder & COO",
                  description:
                    "Specialist in logistics, cybersecurity, health-technology, and consumer services. Focuses on simplifying complex payment environments for merchants operating in regulated industries.",
                },
              ],
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  telephone: "+1-888-321-2100",
                  contactType: "Customer Service",
                  email: "Customercare@cybinenterprises.com",
                  availableLanguage: "English",
                },
              ],
              areaServed: ["United States", "International"],
              serviceType: [
                "High-Risk Payment Processing",
                "MATCH List Merchant Services",
                "Chargeback Prevention",
                "International Payment Processing",
                "Fraud Dispute Alerts",
                "Merchant Account Services",
              ],
              knowsAbout: [
                "High-risk merchant accounts",
                "MATCH list reinstatement",
                "Chargeback management",
                "CBD payment processing",
                "Nutraceutical payment solutions",
                "Telemedicine merchant accounts",
                "International payment processing",
                "Fraud Deflect dispute alerts",
                "Ethoca chargeback alerts",
                "Verifi dispute management",
              ],
              sameAs: ["https://www.linkedin.com/company/cybin-enterprises"],
            },
          ],
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
            Company Overview
          </span>
          <h1
            className="text-4xl sm:text-5xl font-bold mt-4 mb-6"
            style={{
              fontFamily: "Sora, system-ui, sans-serif",
              color: "#e8edf8",
            }}
          >
            About Cybin Enterprises
          </h1>
          <p
            className="text-lg"
            style={{ color: "rgba(232,237,248,0.7)", lineHeight: 1.8 }}
          >
            Cybin Enterprises is a high-risk merchant services company that
            helps businesses in complex, regulated, or difficult-to-place
            industries access stable, long-term payment processing solutions.
          </p>
        </div>
      </section>

      {/* What is Cybin Enterprises */}
      <section style={{ backgroundColor: "#0d1525", padding: "64px 0" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl font-bold mb-6"
            style={{
              fontFamily: "Sora, system-ui, sans-serif",
              color: "#e8edf8",
            }}
          >
            What Is Cybin Enterprises?
          </h2>
          <div
            style={{
              color: "rgba(232,237,248,0.75)",
              lineHeight: 1.9,
              fontSize: "1.05rem",
            }}
          >
            <p className="mb-4">
              Cybin Enterprises is a U.S.-based high-risk payment processing
              company founded to bring clarity and stability to businesses that
              traditional financial institutions and processors typically
              decline or shut down without warning.
            </p>
            <p className="mb-4">
              The company specializes in structuring payment solutions for
              industries categorized as high-risk — including CBD and
              cannabinoids, nutraceuticals, research peptides, telemedicine,
              digital health, seeds and clones, online gaming, forex and crypto,
              adult entertainment, firearms, tobacco and vape, debt collection,
              and subscription businesses.
            </p>
            <p className="mb-4">
              Cybin Enterprises also works with merchants who have been placed
              on the MATCH (Member Alert to Control High-Risk) list, have
              experienced sudden account terminations, bank-side freezes, or
              have been previously denied by domestic processors. In those
              cases, the team helps merchants understand their options, prepare
              their documentation, and access domestic or international
              processing alternatives.
            </p>
            <p>
              The company offers an optional chargeback prevention service
              called Fraud Deflect, which integrates with the Ethoca and Verifi
              dispute alert networks to notify merchants in near real-time when
              a cardholder opens a dispute — allowing the merchant to resolve
              the issue before it becomes a formal chargeback.
            </p>
          </div>
        </div>
      </section>

      {/* Key Facts */}
      <section style={{ backgroundColor: "#0a0f1e", padding: "64px 0" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl font-bold mb-10"
            style={{
              fontFamily: "Sora, system-ui, sans-serif",
              color: "#e8edf8",
            }}
          >
            Key Facts
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                icon: Building2,
                label: "Company Type",
                value: "High-Risk Merchant Services & Payment Processing",
              },
              {
                icon: Globe,
                label: "Service Area",
                value: "United States and International Markets",
              },
              {
                icon: Users,
                label: "Leadership",
                value: "Mel Kotchey (CEO) & Shane Suehr (COO)",
              },
              {
                icon: Shield,
                label: "Specialty",
                value:
                  "MATCH List Merchants, Denied Merchants, Regulated Industries",
              },
              {
                icon: Award,
                label: "Industries Served",
                value:
                  "All legal industries including CBD, nutraceuticals, telemedicine, gaming, and more",
              },
              {
                icon: Phone,
                label: "Contact",
                value:
                  "O: 888-321-2100 | M: 724-244-7111 | Customercare@cybinenterprises.com",
              },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(0,212,184,0.12)",
                  borderRadius: 12,
                  padding: "20px 24px",
                  display: "flex",
                  gap: 16,
                  alignItems: "flex-start",
                }}
              >
                <item.icon
                  size={22}
                  style={{ color: "#00d4b8", marginTop: 2, flexShrink: 0 }}
                />
                <div>
                  <div
                    style={{
                      color: "rgba(232,237,248,0.45)",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      marginBottom: 4,
                    }}
                  >
                    {item.label}
                  </div>
                  <div
                    style={{
                      color: "#e8edf8",
                      fontSize: "0.95rem",
                      lineHeight: 1.6,
                    }}
                  >
                    {item.value}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founders */}
      <section style={{ backgroundColor: "#0d1525", padding: "64px 0" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl font-bold mb-10"
            style={{
              fontFamily: "Sora, system-ui, sans-serif",
              color: "#e8edf8",
            }}
          >
            Founders
          </h2>
          <div className="space-y-8">
            <div
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(0,212,184,0.15)",
                borderRadius: 16,
                padding: "28px 32px",
              }}
            >
              <h3
                className="text-xl font-bold mb-1"
                style={{
                  color: "#e8edf8",
                  fontFamily: "Sora, system-ui, sans-serif",
                }}
              >
                Mel Kotchey — Co-Founder &amp; CEO
              </h3>
              <p
                style={{
                  color: "rgba(232,237,248,0.7)",
                  lineHeight: 1.8,
                  marginTop: 12,
                }}
              >
                Mel Kotchey is an award-winning entrepreneur with 28 years of
                experience in medical and regulated industries. She holds five
                degrees, including a master's degree in healthcare
                administration. Before co-founding Cybin Enterprises, she built
                and operated a successful business in the regulated cannabis and
                wellness sector, where she experienced firsthand how payment
                infrastructure challenges affect business operations and
                profitability.
              </p>
              <p
                style={{
                  color: "rgba(232,237,248,0.7)",
                  lineHeight: 1.8,
                  marginTop: 10,
                }}
              >
                Her recognitions include: Most Influential Businesswomen, Top 30
                CEOs of the Year, Commercial Cannabis Awards honoree, Exeleon
                Magazine recognition, Best Place to Work Award (2021), and a
                cover feature in Dope Magazine.
              </p>
            </div>
            <div
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(124,92,191,0.2)",
                borderRadius: 16,
                padding: "28px 32px",
              }}
            >
              <h3
                className="text-xl font-bold mb-1"
                style={{
                  color: "#e8edf8",
                  fontFamily: "Sora, system-ui, sans-serif",
                }}
              >
                Shane Suehr — Co-Founder &amp; COO
              </h3>
              <p
                style={{
                  color: "rgba(232,237,248,0.7)",
                  lineHeight: 1.8,
                  marginTop: 12,
                }}
              >
                Shane Suehr brings cross-industry expertise in logistics,
                cybersecurity, health-technology, and consumer services. He
                focuses on making complex payment environments understandable
                and accessible for business owners, helping merchants identify
                their processing options and navigate regulatory hurdles with
                confidence. His background includes supporting companies across
                multiple regulated industries to achieve significant operational
                growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section style={{ backgroundColor: "#0a0f1e", padding: "64px 0" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl font-bold mb-6"
            style={{
              fontFamily: "Sora, system-ui, sans-serif",
              color: "#e8edf8",
            }}
          >
            Services Offered by Cybin Enterprises
          </h2>
          <ul
            style={{
              color: "rgba(232,237,248,0.75)",
              lineHeight: 2,
              fontSize: "1rem",
              paddingLeft: 0,
              listStyle: "none",
            }}
          >
            {[
              "Domestic high-risk payment processing",
              "International payment processing for merchants denied by U.S. processors",
              "MATCH list merchant account solutions",
              "Online payment gateway setup and integration",
              "Retail point-of-sale payment processing",
              "Mobile payment acceptance",
              "Subscription and recurring billing infrastructure",
              "Multi-channel and omnichannel commerce solutions",
              "Fraud Deflect — early dispute alert system (Ethoca + Verifi networks)",
              "Pre-approval consultation and documentation preparation",
              "Long-term account stability monitoring and support",
            ].map((item) => (
              <li
                key={item}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                  marginBottom: 8,
                }}
              >
                <span style={{ color: "#00d4b8", marginTop: 4 }}>▸</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: "#0d1525", padding: "64px 0" }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2
            className="text-3xl font-bold mb-5"
            style={{
              fontFamily: "Sora, system-ui, sans-serif",
              color: "#e8edf8",
            }}
          >
            Ready to Explore Your Options?
          </h2>
          <p
            className="mb-8"
            style={{ color: "rgba(232,237,248,0.6)", fontSize: "1.05rem" }}
          >
            Start the approval process today or contact our team for a
            preliminary consultation.
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
