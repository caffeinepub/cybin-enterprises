import { JsonLd } from "@/components/JsonLd";
import { useSeo } from "@/hooks/useSeo";
import { Link } from "@/lib/router";
import {
  BarChart3,
  BookOpen,
  ChevronRight,
  Code2,
  CreditCard,
  MessageSquare,
  Package,
  Settings,
  ShoppingCart,
  Zap,
} from "lucide-react";
import { useEffect } from "react";

interface IntegrationCategory {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  tools: string[];
  color: string;
}

const categories: IntegrationCategory[] = [
  {
    id: "crm",
    icon: MessageSquare,
    title: "CRM",
    description:
      "Connect Cybin's merchant data directly to your customer relationship management platform.",
    tools: ["Salesforce", "HubSpot", "Pipedrive", "Zoho CRM"],
    color: "#00d4b8",
  },
  {
    id: "marketing",
    icon: Zap,
    title: "Marketing Automation",
    description:
      "Automate lead nurturing, client onboarding, and follow-up workflows seamlessly.",
    tools: ["Zapier", "Make (Integromat)", "Mailchimp", "ActiveCampaign"],
    color: "#a87ef5",
  },
  {
    id: "ecommerce",
    icon: ShoppingCart,
    title: "E-Commerce",
    description:
      "Accept payments across every major e-commerce platform with native gateway connections.",
    tools: ["Shopify", "WooCommerce", "BigCommerce", "Magento"],
    color: "#ffc832",
  },
  {
    id: "analytics",
    icon: BarChart3,
    title: "Analytics",
    description:
      "Feed transaction and conversion data into your analytics stack for complete visibility.",
    tools: ["Google Analytics 4", "Mixpanel", "Segment", "Hotjar"],
    color: "#ff8c42",
  },
  {
    id: "accounting",
    icon: BookOpen,
    title: "Accounting",
    description:
      "Sync payment data and reconciliation reports with your accounting software automatically.",
    tools: ["QuickBooks", "Xero", "FreshBooks", "Sage"],
    color: "#60a5fa",
  },
  {
    id: "developer",
    icon: Code2,
    title: "Developer APIs",
    description:
      "Build custom integrations with full API access, webhooks, and native SDK libraries.",
    tools: ["REST API", "Webhooks", "SDK Libraries", "Custom Integrations"],
    color: "#4ade80",
  },
];

export default function IntegrationsPage() {
  useSeo({
    title:
      "Integrations & Platform Connections | Cybin Enterprises Payment Solutions",
    description:
      "Connect Cybin Enterprises payment infrastructure with your CRM, marketing automation, e-commerce platform, analytics stack, and accounting software. Custom API integrations available.",
    canonical: "/integrations",
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
              name: "Integrations",
              item: "https://cybinenterprises.com/integrations",
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
                Integrations
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
              <Settings size={12} />
              Connect Everything
            </div>
            <h1
              className="text-4xl sm:text-5xl font-bold mb-5"
              style={{
                fontFamily: "Sora, system-ui, sans-serif",
                color: "#e8edf8",
                lineHeight: 1.15,
              }}
            >
              Integrations &amp;{" "}
              <span style={{ color: "#00d4b8" }}>Connections</span>
            </h1>
            <p
              className="text-lg"
              style={{ color: "rgba(232, 237, 248, 0.65)", lineHeight: 1.7 }}
            >
              Cybin Enterprises connects with the tools your business already
              uses — from CRM to accounting to e-commerce. Seamless data flow
              across your entire stack.
            </p>
          </div>
        </div>
      </section>

      {/* Integration Categories Grid */}
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
              Integration Categories
            </h2>
            <p
              className="text-base max-w-xl mx-auto"
              style={{ color: "rgba(232,237,248,0.55)", lineHeight: 1.7 }}
            >
              Pre-built connections across the platforms high-risk merchants
              rely on most, plus full API access for custom integrations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map(
              ({ id, icon: Icon, title, description, tools, color }, i) => (
                <div
                  key={id}
                  className="animate-fade-up cybin-glass-card p-6 flex flex-col"
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  {/* Icon + Title */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        backgroundColor: `${color}14`,
                        border: `1px solid ${color}28`,
                      }}
                    >
                      <Icon size={20} style={{ color }} />
                    </div>
                    <h3
                      className="text-base font-bold"
                      style={{
                        fontFamily: "Sora, sans-serif",
                        color: "#e8edf8",
                      }}
                    >
                      {title}
                    </h3>
                  </div>

                  <p
                    className="text-sm leading-relaxed mb-5"
                    style={{ color: "rgba(232,237,248,0.6)" }}
                  >
                    {description}
                  </p>

                  {/* Tool Badges */}
                  <div className="flex flex-wrap gap-2 mb-6 flex-1">
                    {tools.map((tool) => (
                      <span
                        key={tool}
                        className="text-xs px-3 py-1.5 rounded-full font-medium"
                        style={{
                          backgroundColor: `${color}10`,
                          border: `1px solid ${color}22`,
                          color,
                        }}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>

                  <Link
                    to="/contact"
                    data-ocid="integrations.request.button"
                    className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all mt-auto"
                    style={{
                      backgroundColor: `${color}10`,
                      border: `1.5px solid ${color}25`,
                      color,
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.backgroundColor =
                        `${color}1e`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.backgroundColor =
                        `${color}10`;
                    }}
                  >
                    Request Integration <ChevronRight size={14} />
                  </Link>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      <div className="cybin-section-divider" />

      {/* Stats row */}
      <section style={{ backgroundColor: "#080d1a", padding: "56px 0" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {[
              {
                value: "1,000+",
                label: "Potential Integrations via Zapier/Make",
                color: "#00d4b8",
              },
              {
                value: "REST",
                label: "Full REST API with webhooks & SDKs",
                color: "#a87ef5",
              },
              {
                value: "Custom",
                label: "Bespoke integrations on request",
                color: "#ffc832",
              },
            ].map(({ value, label, color }) => (
              <div key={label} className="animate-fade-up">
                <p
                  className="text-4xl font-bold mb-2"
                  style={{ fontFamily: "Sora, sans-serif", color }}
                >
                  {value}
                </p>
                <p
                  className="text-sm"
                  style={{ color: "rgba(232,237,248,0.55)" }}
                >
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Integration CTA */}
      <section style={{ backgroundColor: "#0a0f1e", padding: "72px 0" }}>
        <div className="max-w-3xl mx-auto px-4 text-center animate-fade-up">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6"
            style={{
              backgroundColor: "rgba(0,212,184,0.1)",
              border: "1px solid rgba(0,212,184,0.2)",
            }}
          >
            <Package size={24} style={{ color: "#00d4b8" }} />
          </div>
          <h2
            className="text-3xl font-bold mb-4"
            style={{
              fontFamily: "Sora, system-ui, sans-serif",
              color: "#e8edf8",
            }}
          >
            Don't See Your Platform?
          </h2>
          <p
            className="text-base mb-8"
            style={{ color: "rgba(232,237,248,0.6)", lineHeight: 1.7 }}
          >
            We build custom integrations for enterprise clients and unique
            technical environments. Tell our team what you need and we'll design
            a solution around your stack.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              data-ocid="integrations.custom.primary_button"
              className="cybin-btn-primary"
            >
              Request Custom Integration <ChevronRight size={16} />
            </Link>
            <Link
              to="/partners"
              data-ocid="integrations.partner.secondary_button"
              className="cybin-btn-secondary"
            >
              Explore Partnership Program <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
