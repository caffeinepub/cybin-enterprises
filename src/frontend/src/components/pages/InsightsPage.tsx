import { JsonLd } from "@/components/JsonLd";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { type Category, blogPosts } from "@/data/blogPosts";
import { useSeo } from "@/hooks/useSeo";
import { Link } from "@/lib/router";
import { ArrowRight, ChevronRight, Clock } from "lucide-react";
import { useEffect, useState } from "react";

const categories: Category[] = [
  "All",
  "Payment Infrastructure",
  "High-Risk Industries",
  "Chargebacks & Fraud",
  "Compliance",
  "Business Growth",
  "International Payments",
];

export default function InsightsPage() {
  useSeo({
    title: "High-Risk Merchant Insights & Resources | Cybin Enterprises",
    description:
      "Expert articles on high-risk payment infrastructure, chargeback management, compliance, international payments, and business growth for complex industries.",
    canonical: "/insights",
  });

  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filtered =
    activeCategory === "All"
      ? blogPosts
      : blogPosts.filter((a) => a.category === activeCategory);

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
              name: "Insights",
              item: "https://cybinenterprises.com/insights",
            },
          ],
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "Cybin Enterprises Insights",
          description:
            "Expert articles on high-risk payment infrastructure, chargeback management, compliance, and business growth",
          url: "https://cybinenterprises.com/insights",
          publisher: {
            "@type": "Organization",
            name: "Cybin Enterprises",
            url: "https://cybinenterprises.com",
          },
          blogPost: blogPosts.map((p) => ({
            "@type": "BlogPosting",
            headline: p.title,
            description: p.excerpt,
            datePublished: p.dateISO,
            author: { "@type": "Organization", name: "Cybin Enterprises" },
            url: `https://cybinenterprises.com/insights/${p.slug}`,
            articleSection: p.category,
            keywords: p.category,
          })),
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
            {filtered.map((post, i) => {
              const color = categoryColors[post.category] ?? "#00d4b8";
              return (
                <Link
                  key={post.slug}
                  to={`/insights/${post.slug}`}
                  data-ocid="insights.article.item"
                  className="animate-fade-up cybin-glass-card p-6 flex flex-col group"
                  style={{
                    transitionDelay: `${i * 60}ms`,
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="text-xs font-semibold px-3 py-1 rounded-full"
                      style={{
                        backgroundColor: `${color}18`,
                        border: `1px solid ${color}30`,
                        color,
                      }}
                    >
                      {post.category}
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
                        {post.readTime}
                      </span>
                    </div>
                  </div>

                  <h3
                    className="text-base font-bold mb-3 leading-snug group-hover:text-teal-400 transition-colors"
                    style={{
                      fontFamily: "Sora, sans-serif",
                      color: "#e8edf8",
                    }}
                  >
                    {post.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed flex-1 mb-4"
                    style={{ color: "rgba(232, 237, 248, 0.55)" }}
                  >
                    {post.excerpt}
                  </p>

                  <div
                    className="flex items-center justify-between mt-auto pt-4"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    <span
                      className="text-xs"
                      style={{ color: "rgba(232,237,248,0.35)" }}
                    >
                      {post.date}
                    </span>
                    <span
                      className="flex items-center gap-1.5 text-xs font-semibold"
                      style={{ color: "#00d4b8" }}
                    >
                      Read Article <ArrowRight size={12} />
                    </span>
                  </div>
                </Link>
              );
            })}
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
