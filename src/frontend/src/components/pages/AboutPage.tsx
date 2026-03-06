import { Award, ChevronRight, Star } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const melAchievements = [
  "Most Influential Businesswomen recognition",
  "Top 30 CEOs of the Year",
  "Commercial Cannabis Awards honoree",
  "Exeleon Magazine recognition",
  "Best Place to Work Award (2021)",
  "Featured on the cover of Dope Magazine",
];

export default function AboutPage() {
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
                About
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
              About <span style={{ color: "#00d4b8" }}>Cybin Enterprises</span>
            </h1>
            <p
              className="text-lg"
              style={{ color: "rgba(232, 237, 248, 0.65)", lineHeight: 1.7 }}
            >
              Cybin Enterprises helps businesses navigate complex payment
              environments with clarity, structure, and long-term reliability.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section style={{ backgroundColor: "#0a0f1e", padding: "72px 0" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="animate-fade-up p-10 rounded-2xl text-center max-w-3xl mx-auto"
            style={{
              background:
                "linear-gradient(135deg, rgba(0, 212, 184, 0.06), rgba(26, 10, 46, 0.5))",
              border: "1px solid rgba(0, 212, 184, 0.12)",
            }}
          >
            <Star
              size={32}
              style={{ color: "#00d4b8", margin: "0 auto 16px" }}
            />
            <h2
              className="text-2xl font-bold mb-4"
              style={{
                fontFamily: "Sora, system-ui, sans-serif",
                color: "#e8edf8",
              }}
            >
              Our Mission
            </h2>
            <p
              className="text-base leading-relaxed"
              style={{ color: "rgba(232, 237, 248, 0.7)" }}
            >
              Cybin Enterprises was created to bring clarity and stability to
              businesses that struggle to find reliable payment solutions. Led
              by experienced professionals across regulated industries, Cybin
              Enterprises helps businesses access payment infrastructure
              designed for long-term success. Together, our founders share a
              mission: to make payment infrastructure simple, stable, and
              accessible for businesses operating in complex industries.
            </p>
          </div>
        </div>
      </section>

      <div className="cybin-section-divider" />

      {/* Founders */}
      <section
        style={{ backgroundColor: "#0c1020", padding: "72px 0" }}
        data-ocid="about.founders.section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 animate-fade-up">
            <span
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: "#00d4b8" }}
            >
              Leadership
            </span>
            <h2
              className="text-3xl font-bold mt-3"
              style={{
                fontFamily: "Sora, system-ui, sans-serif",
                color: "#e8edf8",
              }}
            >
              Meet the Founders
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Mel */}
            <div
              className="animate-fade-up overflow-hidden rounded-2xl"
              style={{
                background:
                  "linear-gradient(160deg, #040810 0%, #07051a 40%, #030710 100%)",
                border: "1px solid rgba(0, 212, 184, 0.35)",
                boxShadow:
                  "0 0 40px rgba(0, 212, 184, 0.22), 0 0 80px rgba(0, 212, 184, 0.10), 0 0 120px rgba(124, 92, 191, 0.12), inset 0 1px 0 rgba(0, 212, 184, 0.15)",
              }}
            >
              <div
                style={{
                  height: "320px",
                  overflow: "hidden",
                  position: "relative",
                  background:
                    "linear-gradient(180deg, #060d1f 0%, #080520 60%, #040810 100%)",
                }}
              >
                {/* Radial glow behind the photo */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "radial-gradient(ellipse 90% 70% at 50% 20%, rgba(0, 212, 184, 0.14) 0%, rgba(0, 212, 184, 0.04) 50%, transparent 70%)",
                    zIndex: 1,
                    pointerEvents: "none",
                  }}
                />
                <img
                  src="/assets/generated/mel-uniform-bg.dim_800x1000.jpeg"
                  alt="Mel Kotchey — Co-Founder & CEO"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center 15%",
                    transform: "scale(0.9)",
                    transformOrigin: "center 15%",
                    position: "relative",
                    zIndex: 2,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "140px",
                    background:
                      "linear-gradient(to top, rgba(6, 11, 24, 0.98) 0%, rgba(8, 13, 28, 0.8) 50%, transparent 100%)",
                    zIndex: 3,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: "16px",
                    left: "24px",
                    zIndex: 4,
                  }}
                >
                  <h3
                    className="text-xl font-bold"
                    style={{ fontFamily: "Sora, sans-serif", color: "#e8edf8" }}
                  >
                    Mel Kotchey
                  </h3>
                  <p className="text-sm" style={{ color: "#00d4b8" }}>
                    Co-Founder & CEO
                  </p>
                </div>
              </div>

              <div className="p-7">
                <p
                  className="text-sm mb-4"
                  style={{
                    color: "rgba(232, 237, 248, 0.7)",
                    lineHeight: 1.75,
                  }}
                >
                  Mel Kotchey is an award-winning entrepreneur with extensive
                  experience across regulated industries. Before founding Cybin
                  Enterprises, she built and operated a successful business in
                  the regulated cannabis and wellness sector. Through that
                  experience, she saw firsthand how the right payment
                  infrastructure could dramatically reduce operational stress
                  and costs for business owners.
                </p>
                <p
                  className="text-sm mb-6"
                  style={{
                    color: "rgba(232, 237, 248, 0.7)",
                    lineHeight: 1.75,
                  }}
                >
                  Mel holds five degrees including a master's in healthcare
                  administration and has spent 28 years working across medical
                  and regulated sectors. Her leadership focuses on stability,
                  clarity, and long-term support for merchants.
                </p>

                <div
                  className="p-4 rounded-xl mb-2"
                  style={{
                    backgroundColor: "rgba(0, 212, 184, 0.05)",
                    border: "1px solid rgba(0, 212, 184, 0.1)",
                  }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Award size={16} style={{ color: "#00d4b8" }} />
                    <span
                      className="text-xs font-bold uppercase tracking-wider"
                      style={{ color: "#00d4b8" }}
                    >
                      Achievements
                    </span>
                  </div>
                  <div className="space-y-2">
                    {melAchievements.map((a) => (
                      <div key={a} className="flex items-start gap-2">
                        <span
                          style={{
                            color: "#00d4b8",
                            fontSize: "10px",
                            marginTop: "5px",
                            flexShrink: 0,
                          }}
                        >
                          ◆
                        </span>
                        <p
                          className="text-xs"
                          style={{
                            color: "rgba(232, 237, 248, 0.65)",
                            lineHeight: 1.5,
                          }}
                        >
                          {a}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Shane */}
            <div
              className="animate-fade-up overflow-hidden rounded-2xl"
              style={{
                transitionDelay: "100ms",
                background:
                  "linear-gradient(160deg, #040810 0%, #0a0520 40%, #030710 100%)",
                border: "1px solid rgba(124, 92, 191, 0.4)",
                boxShadow:
                  "0 0 40px rgba(124, 92, 191, 0.25), 0 0 80px rgba(124, 92, 191, 0.12), 0 0 120px rgba(0, 212, 184, 0.08), inset 0 1px 0 rgba(124, 92, 191, 0.15)",
              }}
            >
              <div
                style={{
                  height: "320px",
                  overflow: "hidden",
                  position: "relative",
                  background:
                    "linear-gradient(180deg, #060820 0%, #08051e 60%, #040810 100%)",
                }}
              >
                {/* Radial glow behind the photo */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "radial-gradient(ellipse 90% 70% at 50% 20%, rgba(124, 92, 191, 0.18) 0%, rgba(124, 92, 191, 0.06) 50%, transparent 70%)",
                    zIndex: 1,
                    pointerEvents: "none",
                  }}
                />
                <img
                  src="/assets/shane.png"
                  alt="Shane Suehr — Co-Founder & COO"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center 15%",
                    transform: "scale(0.9)",
                    transformOrigin: "center 15%",
                    position: "relative",
                    zIndex: 2,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "140px",
                    background:
                      "linear-gradient(to top, rgba(6, 11, 24, 0.98) 0%, rgba(8, 13, 28, 0.8) 50%, transparent 100%)",
                    zIndex: 3,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: "16px",
                    left: "24px",
                    zIndex: 4,
                  }}
                >
                  <h3
                    className="text-xl font-bold"
                    style={{ fontFamily: "Sora, sans-serif", color: "#e8edf8" }}
                  >
                    Shane Suehr
                  </h3>
                  <p className="text-sm" style={{ color: "#00d4b8" }}>
                    Co-Founder & COO
                  </p>
                </div>
              </div>

              <div className="p-7">
                <p
                  className="text-sm mb-4"
                  style={{
                    color: "rgba(232, 237, 248, 0.7)",
                    lineHeight: 1.75,
                  }}
                >
                  Shane brings experience across logistics, cybersecurity,
                  health-technology, and consumer services. He focuses on
                  simplifying complex payment environments and helping
                  businesses understand their options in clear, practical terms.
                </p>
                <p
                  className="text-sm mb-6"
                  style={{
                    color: "rgba(232, 237, 248, 0.7)",
                    lineHeight: 1.75,
                  }}
                >
                  His background includes helping businesses achieve significant
                  operational growth and supporting companies across multiple
                  industries to reach new levels of efficiency and stability.
                  Shane's expertise in technology and operations ensures that
                  Cybin Enterprises clients receive practical, implementable
                  solutions.
                </p>

                <div
                  className="p-4 rounded-xl"
                  style={{
                    backgroundColor: "rgba(0, 212, 184, 0.05)",
                    border: "1px solid rgba(0, 212, 184, 0.1)",
                  }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Award size={16} style={{ color: "#00d4b8" }} />
                    <span
                      className="text-xs font-bold uppercase tracking-wider"
                      style={{ color: "#00d4b8" }}
                    >
                      Areas of Expertise
                    </span>
                  </div>
                  <div className="space-y-2">
                    {[
                      "Logistics & Operations Management",
                      "Cybersecurity & Data Protection",
                      "Health-Technology Systems",
                      "Consumer Services & Growth",
                      "Payment Infrastructure Simplification",
                      "Cross-Industry Business Development",
                    ].map((a) => (
                      <div key={a} className="flex items-start gap-2">
                        <span
                          style={{
                            color: "#00d4b8",
                            fontSize: "10px",
                            marginTop: "5px",
                            flexShrink: 0,
                          }}
                        >
                          ◆
                        </span>
                        <p
                          className="text-xs"
                          style={{
                            color: "rgba(232, 237, 248, 0.65)",
                            lineHeight: 1.5,
                          }}
                        >
                          {a}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: "#0a0f1e", padding: "72px 0" }}>
        <div className="max-w-3xl mx-auto px-4 text-center animate-fade-up">
          <h2
            className="text-3xl font-bold mb-5"
            style={{
              fontFamily: "Sora, system-ui, sans-serif",
              color: "#e8edf8",
            }}
          >
            Ready to Work With Us?
          </h2>
          <p
            className="text-base mb-8"
            style={{ color: "rgba(232, 237, 248, 0.6)" }}
          >
            Reach out today to begin the conversation about your payment needs.
          </p>
          <Link to="/contact" className="cybin-btn-primary">
            Contact Cybin Enterprises <ChevronRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
