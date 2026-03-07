import { JsonLd } from "@/components/JsonLd";
import { useSeo } from "@/hooks/useSeo";
import { Link } from "@/lib/router";
import {
  AlertTriangle,
  Cannabis,
  CheckCircle,
  ChevronRight,
  FlaskConical,
  Heart,
  Leaf,
  Pill,
  RefreshCw,
  ShoppingCart,
  Stethoscope,
  Store,
  TrendingUp,
} from "lucide-react";
import { useEffect } from "react";

const industries = [
  {
    icon: FlaskConical,
    title: "Research Peptides",
    desc: "Research compounds and peptide products often face challenges with standard processors. We specialize in this space.",
  },
  {
    icon: Leaf,
    title: "Seeds & Clones",
    desc: "Agricultural seed businesses and clone operations in legal markets require specialized payment infrastructure.",
  },
  {
    icon: Cannabis,
    title: "CBD & Botanicals",
    desc: "Hemp-derived CBD and botanical products need merchant accounts that understand the regulatory landscape.",
  },
  {
    icon: Pill,
    title: "Nutraceuticals",
    desc: "Dietary supplements, vitamins, and nutraceuticals benefit from processors familiar with their business model.",
  },
  {
    icon: Stethoscope,
    title: "Telemedicine",
    desc: "Virtual healthcare providers and telehealth platforms require HIPAA-aware payment environments.",
  },
  {
    icon: Heart,
    title: "Digital Health",
    desc: "Digital health apps, remote monitoring, and wellness technology businesses operating in regulated spaces.",
  },
  {
    icon: ShoppingCart,
    title: "High-Volume E-Commerce",
    desc: "High transaction volume e-commerce merchants that standard banks classify as elevated risk.",
  },
  {
    icon: RefreshCw,
    title: "Subscription Businesses",
    desc: "Membership and subscription models with recurring billing that traditional processors often restrict.",
  },
  {
    icon: Store,
    title: "Specialty Retail",
    desc: "Specialty and niche retail sectors that fall outside traditional merchant category classifications.",
  },
  {
    icon: TrendingUp,
    title: "Emerging Regulated Markets",
    desc: "New and emerging industries operating within legal frameworks that are still evolving and maturing.",
  },
];

export default function IndustriesPage() {
  useSeo({
    title:
      "High-Risk Industries Payment Processing | CBD, Nutraceuticals, Telemedicine | Cybin Enterprises",
    description:
      "Payment solutions for CBD, research peptides, telemedicine, firearms, gaming, forex, supplements, and all legal industries including MATCH list merchants.",
    canonical: "/industries",
  });

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
              name: "Industries",
              item: "https://cybinenterprises.com/industries",
            },
          ],
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "What makes a business high-risk for payment processing?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Businesses are classified as high-risk based on factors like industry type, chargeback history, processing volume, regulatory environment, and business model. Industries such as CBD, nutraceuticals, telemedicine, firearms, and subscription services are commonly flagged.",
              },
            },
            {
              "@type": "Question",
              name: "Can a business on the MATCH list still get payment processing?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. Being on the MATCH (Member Alert to Control High-Risk) list does not permanently disqualify a business from payment processing. Cybin Enterprises works with MATCH list merchants case by case to identify available options and develop a path toward processing stability.",
              },
            },
            {
              "@type": "Question",
              name: "Does Cybin Enterprises support CBD and cannabis-related businesses?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. Cybin Enterprises supports hemp-derived CBD products, botanical businesses, and other cannabis-adjacent industries that operate within legal frameworks. We have experience navigating the regulatory complexity of this space.",
              },
            },
            {
              "@type": "Question",
              name: "What industries do you support for payment processing?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "We support all legal industries including research peptides, CBD & botanicals, nutraceuticals, telemedicine, digital health, high-volume e-commerce, subscription businesses, specialty retail, firearms, adult entertainment, travel, gaming, forex, crypto, and many more.",
              },
            },
            {
              "@type": "Question",
              name: "What if my industry isn't listed on your website?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Cybin Enterprises supports all legal industries. If your business operates legally, we can review your situation regardless of whether your specific sector is listed. Contact us to discuss your business and explore available payment options.",
              },
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
                Industries
              </span>
            </div>
            <h1
              className="text-4xl sm:text-5xl font-bold mb-5"
              style={{
                fontFamily: "Sora, system-ui, sans-serif",
                color: "#e8edf8",
                lineHeight: 1.15,
              }}
            >
              Industries <span style={{ color: "#00d4b8" }}>We Support</span>
            </h1>
            <p
              className="text-lg"
              style={{ color: "rgba(232, 237, 248, 0.65)", lineHeight: 1.7 }}
            >
              Cybin Enterprises provides payment solutions for businesses across
              all legal industries, including those often categorized as
              high-risk or difficult to place.
            </p>
          </div>
        </div>
      </section>

      {/* Industry Grid */}
      <section style={{ backgroundColor: "#0a0f1e", padding: "72px 0" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
            {industries.map(({ icon: Icon, title, desc }, i) => (
              <div
                key={title}
                className="animate-fade-up cybin-glass-card p-6"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{
                    backgroundColor: "rgba(0, 212, 184, 0.1)",
                    border: "1px solid rgba(0, 212, 184, 0.2)",
                  }}
                >
                  <Icon size={22} style={{ color: "#00d4b8" }} />
                </div>
                <h3
                  className="text-base font-bold mb-2"
                  style={{ fontFamily: "Sora, sans-serif", color: "#e8edf8" }}
                >
                  {title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "rgba(232, 237, 248, 0.6)" }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>

          {/* Not listed note */}
          <div
            className="animate-fade-up text-center p-8 rounded-2xl mb-8"
            style={{
              backgroundColor: "rgba(0, 212, 184, 0.05)",
              border: "1px solid rgba(0, 212, 184, 0.15)",
            }}
          >
            <h3
              className="text-xl font-bold mb-3"
              style={{ fontFamily: "Sora, sans-serif", color: "#e8edf8" }}
            >
              Don't see your industry listed?
            </h3>
            <p
              className="text-sm mb-6"
              style={{ color: "rgba(232, 237, 248, 0.6)" }}
            >
              We support{" "}
              <strong style={{ color: "#e8edf8" }}>all legal industries</strong>
              . If your business operates within the law, we can review your
              situation — even if your sector isn't shown above.
            </p>
            <Link
              to="/contact"
              className="cybin-btn-primary"
              data-ocid="industries.qualify.button"
            >
              See If Your Business Qualifies <ChevronRight size={16} />
            </Link>
          </div>

          {/* MATCH / Previously Denied */}
          <div
            className="animate-fade-up p-8 rounded-2xl"
            style={{
              background:
                "linear-gradient(135deg, rgba(255, 107, 107, 0.05), rgba(10, 15, 30, 0.8))",
              border: "1px solid rgba(255, 142, 83, 0.2)",
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle size={20} style={{ color: "#ff8e53" }} />
                  <span
                    className="text-sm font-bold uppercase tracking-wider"
                    style={{ color: "#ff8e53" }}
                  >
                    MATCH List & Previously Denied
                  </span>
                </div>
                <h3
                  className="text-2xl font-bold mb-4"
                  style={{ fontFamily: "Sora, sans-serif", color: "#e8edf8" }}
                >
                  We Work With Merchants Others Won't
                </h3>
                <p
                  className="text-sm mb-4"
                  style={{
                    color: "rgba(232, 237, 248, 0.65)",
                    lineHeight: 1.75,
                  }}
                >
                  If you've been placed on the MATCH list, had a merchant
                  account terminated, or been previously denied — your situation
                  isn't hopeless. Many merchants in these circumstances still
                  have options.
                </p>
                <p
                  className="text-sm mb-6"
                  style={{
                    color: "rgba(232, 237, 248, 0.65)",
                    lineHeight: 1.75,
                  }}
                >
                  Cybin Enterprises helps you understand what's available,
                  navigate the approval process strategically, and build toward
                  long-term payment stability.
                </p>
                <Link
                  to="/contact"
                  className="cybin-btn-primary"
                  data-ocid="match.qualify.button"
                >
                  Talk to Us About Your Situation <ChevronRight size={16} />
                </Link>
              </div>

              <div className="space-y-3">
                {[
                  "MATCH list merchants reviewed case by case",
                  "Terminated accounts don't mean permanent exclusion",
                  "Prior declines from other processors don't apply here",
                  "High chargeback history addressed with Fraud Deflect",
                  "Structured path toward processing stability",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle
                      size={16}
                      style={{
                        color: "#00d4b8",
                        flexShrink: 0,
                        marginTop: "2px",
                      }}
                    />
                    <p
                      className="text-sm"
                      style={{ color: "rgba(232, 237, 248, 0.7)" }}
                    >
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
