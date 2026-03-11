import { JsonLd } from "@/components/JsonLd";
import { type Category, blogPosts } from "@/data/blogPosts";
import { useSeo } from "@/hooks/useSeo";
import { Link, useParams } from "@/lib/router";
import { ArrowLeft, ChevronRight, Clock } from "lucide-react";
import { useEffect } from "react";

const categoryColors: Record<Category, string> = {
  All: "#00d4b8",
  "Payment Infrastructure": "#00d4b8",
  "High-Risk Industries": "#a87ef5",
  "Chargebacks & Fraud": "#ff6b6b",
  Compliance: "#ffa53d",
  "Business Growth": "#4ade80",
  "International Payments": "#60a5fa",
};

function NotFound() {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0a0f1e",
        color: "rgba(232,237,248,0.55)",
      }}
    >
      <p style={{ fontSize: "18px", marginBottom: "16px" }}>
        Article not found.
      </p>
      <Link
        to="/insights"
        className="flex items-center gap-2 text-sm font-semibold"
        style={{ color: "#00d4b8" }}
      >
        <ArrowLeft size={14} /> Back to Insights
      </Link>
    </div>
  );
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  useSeo(
    post
      ? {
          title: `${post.title} | Cybin Enterprises`,
          description: post.metaDescription,
          canonical: `/insights/${post.slug}`,
        }
      : {
          title: "Article Not Found | Cybin Enterprises",
          description: "The requested article could not be found.",
          canonical: "/insights",
        },
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll on slug change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [slug]);

  if (!post) return <NotFound />;

  const color = categoryColors[post.category] ?? "#00d4b8";
  const relatedPosts = blogPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  return (
    <div>
      {/* JSON-LD Article schema */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.metaDescription,
          datePublished: post.dateISO,
          dateModified: post.dateISO,
          author: {
            "@type": "Organization",
            name: "Cybin Enterprises",
            url: "https://cybinenterprises.com",
          },
          publisher: {
            "@type": "Organization",
            name: "Cybin Enterprises",
            url: "https://cybinenterprises.com",
            logo: {
              "@type": "ImageObject",
              url: "https://cybinenterprises.com/assets/uploads/Untitled-design-1.png",
            },
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `https://cybinenterprises.com/insights/${post.slug}`,
          },
          keywords: post.category,
          articleSection: post.category,
          wordCount:
            post.sections.reduce(
              (acc, s) => acc + s.body.split(" ").length,
              0,
            ) +
            (post.faqs?.reduce(
              (acc, f) =>
                acc + f.question.split(" ").length + f.answer.split(" ").length,
              0,
            ) ?? 0),
        }}
      />
      {/* FAQ schema */}
      {post.faqs && post.faqs.length > 0 && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: post.faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }}
        />
      )}
      {/* Breadcrumb schema */}
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
            {
              "@type": "ListItem",
              position: 3,
              name: post.title,
              item: `https://cybinenterprises.com/insights/${post.slug}`,
            },
          ],
        }}
      />

      {/* Hero */}
      <section
        className="page-hero-bg"
        style={{
          padding: "80px 0 60px",
          borderBottom: "1px solid rgba(110,247,212,0.08)",
        }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6">
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
            <Link
              to="/insights"
              className="text-sm"
              style={{ color: "rgba(232,237,248,0.45)" }}
            >
              Insights
            </Link>
            <ChevronRight
              size={14}
              style={{ color: "rgba(232,237,248,0.3)" }}
            />
            <span
              className="text-sm truncate max-w-[200px]"
              style={{ color: "#00d4b8" }}
            >
              {post.title}
            </span>
          </div>

          {/* Category + meta */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
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
            <div
              className="flex items-center gap-1.5"
              style={{ color: "rgba(232,237,248,0.4)" }}
            >
              <Clock size={12} />
              <span className="text-xs">{post.readTime}</span>
            </div>
            <span
              className="text-xs"
              style={{ color: "rgba(232,237,248,0.4)" }}
            >
              {post.date}
            </span>
          </div>

          {/* Title */}
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
            style={{
              fontFamily: "Sora, system-ui, sans-serif",
              color: "#e8edf8",
              lineHeight: 1.15,
            }}
          >
            {post.title}
          </h1>

          {/* Excerpt */}
          <p
            className="text-lg leading-relaxed"
            style={{ color: "rgba(232,237,248,0.65)" }}
          >
            {post.excerpt}
          </p>
        </div>
      </section>

      {/* Article body */}
      <section style={{ backgroundColor: "#0a0f1e", padding: "60px 0 80px" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <article>
            {post.sections.map((section, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: static data
              <div key={i} className="mb-10">
                {section.heading && (
                  <h2
                    className="text-xl sm:text-2xl font-bold mb-4"
                    style={{
                      fontFamily: "Sora, system-ui, sans-serif",
                      color: "#e8edf8",
                    }}
                  >
                    {section.heading}
                  </h2>
                )}
                <div
                  className="text-base leading-relaxed"
                  style={{ color: "rgba(232,237,248,0.72)" }}
                >
                  {section.body.split("\n").map((para, j) => {
                    if (para.trim() === "") return null;
                    const paraKey = `para-${i}-${j}`;

                    // Render bullet points
                    if (para.startsWith("•")) {
                      return (
                        <div
                          key={paraKey}
                          className="flex gap-3 mb-2"
                          style={{ color: "rgba(232,237,248,0.72)" }}
                        >
                          <span
                            style={{ color, flexShrink: 0, marginTop: "2px" }}
                          >
                            •
                          </span>
                          <span>{para.slice(1).trim()}</span>
                        </div>
                      );
                    }

                    // Render bold headings (lines starting with **)
                    if (para.startsWith("**") && para.includes(":**")) {
                      const colonIdx = para.indexOf(":**");
                      const boldText = para.slice(2, colonIdx);
                      const rest = para.slice(colonIdx + 3).trim();
                      return (
                        <p key={paraKey} className="mb-3">
                          <strong
                            style={{
                              color: "#e8edf8",
                              fontWeight: 700,
                            }}
                          >
                            {boldText}:
                          </strong>{" "}
                          {rest}
                        </p>
                      );
                    }

                    // Italic subheadings (lines starting with *)
                    if (para.startsWith("*") && para.includes(":*")) {
                      const colonIdx = para.indexOf(":*");
                      const italicText = para.slice(1, colonIdx);
                      const rest = para.slice(colonIdx + 2).trim();
                      return (
                        <p key={paraKey} className="mb-3 ml-4">
                          <em
                            style={{
                              color: "rgba(232,237,248,0.85)",
                              fontStyle: "italic",
                            }}
                          >
                            {italicText}:
                          </em>{" "}
                          {rest}
                        </p>
                      );
                    }

                    return (
                      <p key={paraKey} className="mb-4">
                        {para}
                      </p>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* FAQ Section */}
            {post.faqs && post.faqs.length > 0 && (
              <div
                className="mt-12 rounded-2xl p-8"
                style={{
                  backgroundColor: "rgba(22,30,58,0.7)",
                  border: "1px solid rgba(110,247,212,0.12)",
                }}
              >
                <h2
                  className="text-xl font-bold mb-6"
                  style={{
                    fontFamily: "Sora, system-ui, sans-serif",
                    color: "#e8edf8",
                  }}
                >
                  Frequently Asked Questions
                </h2>
                <div className="space-y-6">
                  {post.faqs.map((faq, faqIdx) => (
                    <div
                      key={faq.question}
                      className="pb-6"
                      style={{
                        borderBottom:
                          faqIdx < post.faqs!.length - 1
                            ? "1px solid rgba(255,255,255,0.06)"
                            : "none",
                      }}
                    >
                      <h3
                        className="text-sm font-bold mb-2"
                        style={{ color: "#e8edf8" }}
                      >
                        {faq.question}
                      </h3>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: "rgba(232,237,248,0.65)" }}
                      >
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* Back + CTA */}
          <div
            className="mt-12 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
          >
            <Link
              to="/insights"
              data-ocid="blog.back.link"
              className="flex items-center gap-2 text-sm font-semibold transition-colors"
              style={{ color: "#00d4b8" }}
            >
              <ArrowLeft size={14} />
              Back to Insights
            </Link>
            <Link
              to="/apply"
              data-ocid="blog.cta.primary_button"
              className="cybin-btn-primary text-sm"
            >
              Start Your Approval Process
            </Link>
          </div>
        </div>
      </section>

      {/* Related articles */}
      <section
        style={{
          backgroundColor: "#080d1a",
          padding: "60px 0 80px",
          borderTop: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-2xl font-bold mb-8"
            style={{
              fontFamily: "Sora, system-ui, sans-serif",
              color: "#e8edf8",
            }}
          >
            Related Articles
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedPosts.map((related) => {
              const relColor = categoryColors[related.category] ?? "#00d4b8";
              return (
                <Link
                  key={related.slug}
                  to={`/insights/${related.slug}`}
                  data-ocid="blog.related.item"
                  className="cybin-glass-card p-6 flex flex-col group"
                  style={{ textDecoration: "none" }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="text-xs font-semibold px-3 py-1 rounded-full"
                      style={{
                        backgroundColor: `${relColor}18`,
                        border: `1px solid ${relColor}30`,
                        color: relColor,
                      }}
                    >
                      {related.category}
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
                        {related.readTime}
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
                    {related.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed flex-1 mb-4"
                    style={{ color: "rgba(232,237,248,0.55)" }}
                  >
                    {related.excerpt}
                  </p>
                  <div
                    className="flex items-center gap-1.5 text-xs font-semibold mt-auto pt-4"
                    style={{
                      borderTop: "1px solid rgba(255,255,255,0.06)",
                      color: "#00d4b8",
                    }}
                  >
                    Read More <ChevronRight size={12} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
