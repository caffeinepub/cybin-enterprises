import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "@/lib/router";
import { ArrowRight, ChevronRight, Clock } from "lucide-react";
import { useEffect, useState } from "react";

type Category =
  | "All"
  | "Payment Infrastructure"
  | "High-Risk Industries"
  | "Chargebacks & Fraud"
  | "Compliance"
  | "Business Growth"
  | "International Payments";

const categories: Category[] = [
  "All",
  "Payment Infrastructure",
  "High-Risk Industries",
  "Chargebacks & Fraud",
  "Compliance",
  "Business Growth",
  "International Payments",
];

const articles = [
  {
    title: "What Makes a Business High-Risk",
    category: "High-Risk Industries" as Category,
    excerpt:
      "Understanding the factors that classify a business as high-risk is the first step to securing stable payment processing. Learn what processors look for and how to position your business for approval.",
    readTime: "5 min read",
    date: "February 2026",
  },
  {
    title: "How Early Alerts Reduce Chargebacks",
    category: "Chargebacks & Fraud" as Category,
    excerpt:
      "Chargeback disputes can threaten your merchant account. Discover how early dispute alert systems like Ethoca and Verifi allow merchants to resolve issues before they escalate.",
    readTime: "4 min read",
    date: "January 2026",
  },
  {
    title: "International Payment Options Explained",
    category: "International Payments" as Category,
    excerpt:
      "For businesses operating across borders, international payment processing opens new markets. This guide breaks down the key options, considerations, and best practices for cross-border commerce.",
    readTime: "6 min read",
    date: "January 2026",
  },
  {
    title: "Preventing Payment Account Shutdowns",
    category: "Payment Infrastructure" as Category,
    excerpt:
      "Sudden account terminations are one of the biggest risks for high-risk merchants. Learn the warning signs, proactive steps, and strategies to maintain long-term account stability.",
    readTime: "7 min read",
    date: "December 2025",
  },
  {
    title: "Subscription Billing in High-Risk Industries",
    category: "Business Growth" as Category,
    excerpt:
      "Subscription models offer predictable revenue, but high-risk merchants face unique challenges. Explore how to structure recurring billing that processors accept and customers trust.",
    readTime: "5 min read",
    date: "December 2025",
  },
  {
    title: "Compliance Essentials for High-Risk Merchants",
    category: "Compliance" as Category,
    excerpt:
      "Staying compliant isn't just about avoiding fines — it's about keeping your payment infrastructure intact. A practical overview of what high-risk businesses need to know.",
    readTime: "8 min read",
    date: "November 2025",
  },
];

export default function InsightsPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filtered =
    activeCategory === "All"
      ? articles
      : articles.filter((a) => a.category === activeCategory);

  // biome-ignore lint/correctness/useExhaustiveDependencies: re-observe on category change
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
  }, [activeCategory]);

  const categoryColors: Record<Category, string> = {
    All: "#00d4b8",
    "Payment Infrastructure": "#00d4b8",
    "High-Risk Industries": "#a87ef5",
    "Chargebacks & Fraud": "#ff6b6b",
    Compliance: "#ffa53d",
    "Business Growth": "#4ade80",
    "International Payments": "#60a5fa",
  };

  return (
    <div>
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
                Insights
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
              Insights for{" "}
              <span style={{ color: "#00d4b8" }}>High-Risk and Emerging</span>{" "}
              Businesses
            </h1>
            <p
              className="text-lg"
              style={{ color: "rgba(232, 237, 248, 0.65)", lineHeight: 1.7 }}
            >
              Educational content focused on payments, compliance, and business
              growth.
            </p>
          </div>
        </div>
      </section>

      {/* Articles */}
      <section style={{ backgroundColor: "#0a0f1e", padding: "60px 0 80px" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <div className="mb-10 overflow-x-auto animate-fade-up">
            <Tabs
              value={activeCategory}
              onValueChange={(v) => setActiveCategory(v as Category)}
            >
              <TabsList
                className="flex gap-2 h-auto p-1.5 rounded-xl"
                style={{
                  backgroundColor: "rgba(22, 30, 58, 0.8)",
                  border: "1px solid rgba(0,212,184,0.1)",
                  width: "max-content",
                }}
              >
                {categories.map((cat) => (
                  <TabsTrigger
                    key={cat}
                    value={cat}
                    data-ocid="insights.filter.tab"
                    className="text-xs font-semibold px-4 py-2 rounded-lg transition-all"
                    style={{
                      backgroundColor:
                        activeCategory === cat
                          ? "rgba(0, 212, 184, 0.15)"
                          : "transparent",
                      color:
                        activeCategory === cat
                          ? "#00d4b8"
                          : "rgba(232,237,248,0.55)",
                      border:
                        activeCategory === cat
                          ? "1px solid rgba(0,212,184,0.3)"
                          : "1px solid transparent",
                    }}
                  >
                    {cat}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(({ title, category, excerpt, readTime, date }, i) => (
              <div
                key={title}
                className="animate-fade-up cybin-glass-card p-6 flex flex-col"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="text-xs font-semibold px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: `${categoryColors[category]}18`,
                      border: `1px solid ${categoryColors[category]}30`,
                      color: categoryColors[category],
                    }}
                  >
                    {category}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <Clock
                      size={12}
                      style={{ color: "rgba(232,237,248,0.35)" }}
                    />
                    <span
                      className="text-xs"
                      style={{ color: "rgba(232,237,248,0.35)" }}
                    >
                      {readTime}
                    </span>
                  </div>
                </div>

                <h3
                  className="text-base font-bold mb-3 leading-snug"
                  style={{ fontFamily: "Sora, sans-serif", color: "#e8edf8" }}
                >
                  {title}
                </h3>
                <p
                  className="text-sm leading-relaxed flex-1 mb-4"
                  style={{ color: "rgba(232, 237, 248, 0.55)" }}
                >
                  {excerpt}
                </p>

                <div
                  className="flex items-center justify-between mt-auto pt-4"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <span
                    className="text-xs"
                    style={{ color: "rgba(232,237,248,0.35)" }}
                  >
                    {date}
                  </span>
                  <button
                    type="button"
                    className="flex items-center gap-1.5 text-xs font-semibold transition-colors"
                    style={{ color: "#00d4b8" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "#00efd1";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "#00d4b8";
                    }}
                  >
                    Read More <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20" data-ocid="insights.empty_state">
              <p style={{ color: "rgba(232,237,248,0.4)" }}>
                No articles in this category yet. Check back soon.
              </p>
            </div>
          )}

          {/* CTA */}
          <div className="mt-14 text-center animate-fade-up">
            <p
              className="text-sm mb-4"
              style={{ color: "rgba(232,237,248,0.5)" }}
            >
              Have questions about your specific situation?
            </p>
            <Link to="/contact" className="cybin-btn-secondary">
              Talk to Our Team <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
