import { JsonLd } from "@/components/JsonLd";
import { useSeo } from "@/hooks/useSeo";
import { Link } from "@/lib/router";
import { Award, ChevronRight, Star } from "lucide-react";
import { useEffect } from "react";
import melPhoto from "/assets/mel-headshot.jpeg";
import shanePhoto from "/assets/uploads/IMG_2988-1.jpeg";

const melAchievements = [
  "Most Influential Businesswomen recognition",
  "Top 30 CEOs of the Year",
  "Commercial Cannabis Awards honoree",
  "Exeleon Magazine recognition",
  "Best Place to Work Award (2021)",
  "Featured on the cover of Dope Magazine",
];

const shaneExpertise = [
  "Logistics & Operations Management",
  "Cybersecurity & Data Protection",
  "Health-Technology Systems",
  "Consumer Services & Growth",
  "Payment Infrastructure Simplification",
  "Cross-Industry Business Development",
];

export default function AboutPage() {
  useSeo({
    title:
      "About Cybin Enterprises | Meet the Founders Mel Kotchey & Shane Suehr",
    description:
      "Cybin Enterprises was founded by Mel Kotchey and Shane Suehr to bring clarity and stability to businesses navigating complex payment environments.",
    canonical: "/about",
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
              name: "About",
              item: "https://cybinenterprises.com/about",
            },
          ],
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Cybin Enterprises Founders",
          itemListElement: [
            {
              "@type": "Person",
              position: 1,
              name: "Mel Kotchey",
              jobTitle: "Co-Founder & CEO",
              description:
                "Award-winning entrepreneur with 28 years in medical and regulated sectors. Five degrees including a master's in healthcare administration.",
              worksFor: {
                "@type": "Organization",
                name: "Cybin Enterprises",
              },
              award: [
                "Most Influential Businesswomen",
                "Top 30 CEOs of the Year",
                "Commercial Cannabis Awards honoree",
                "Best Place to Work Award (2021)",
                "Featured on the cover of Dope Magazine",
              ],
            },
            {
              "@type": "Person",
              position: 2,
              name: "Shane Suehr",
              jobTitle: "Co-Founder & COO",
              description:
                "Experienced leader across logistics, cybersecurity, health-technology, and consumer services.",
              worksFor: {
                "@type": "Organization",
                name: "Cybin Enterprises",
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

      {/* ══════════════════════════════════════════════
          FOUNDERS — PRESTIGE MAGAZINE AUTHORITY LAYOUT
          Portrait-first, side-by-side, commanding scale
          ══════════════════════════════════════════════ */}
      <section
        data-ocid="about.founders.section"
        style={{
          backgroundColor: "#080d1a",
          padding: "120px 0 100px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle grid texture overlay for depth */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(0,212,184,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,184,0.025) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
        {/* Ambient atmospheric gradients */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "50%",
            height: "100%",
            background:
              "radial-gradient(ellipse 70% 60% at 25% 45%, rgba(0,212,184,0.07) 0%, transparent 70%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "50%",
            height: "100%",
            background:
              "radial-gradient(ellipse 70% 60% at 75% 45%, rgba(124,92,191,0.09) 0%, transparent 70%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          style={{ position: "relative", zIndex: 1 }}
        >
          {/* Section heading */}
          <div className="text-center mb-16 animate-fade-up">
            <span
              className="text-xs font-bold uppercase tracking-widest"
              style={{
                color: "#00d4b8",
                letterSpacing: "0.2em",
              }}
            >
              Leadership
            </span>
            <h2
              className="text-4xl sm:text-5xl font-bold mt-4 mb-4"
              style={{
                fontFamily: "Sora, system-ui, sans-serif",
                color: "#e8edf8",
                lineHeight: 1.12,
              }}
            >
              Meet the Founders
            </h2>
            <p
              className="text-base max-w-xl mx-auto"
              style={{ color: "rgba(232,237,248,0.5)", lineHeight: 1.7 }}
            >
              Experienced leaders who built Cybin Enterprises to deliver clarity
              and stability to businesses navigating complex payment
              environments.
            </p>
          </div>

          {/* Founders side-by-side grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-14">
            {/* ══ MEL KOTCHEY ══ */}
            <div
              className="animate-fade-up"
              data-ocid="about.founders.card.1"
              style={{ display: "flex", flexDirection: "column" }}
            >
              {/* Portrait hero zone — real photo with CSS edge-blend */}
              <div
                className="h-[460px] lg:h-[540px]"
                style={{
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: "20px 20px 0 0",
                }}
              >
                {/* Actual photo */}
                {/*
                   ANALYSIS (vision-corrected):
                   - Mel's photo: 800×1000 (4:5 ratio) — squarer crop, less
                     vertical information. Her face is centered in the frame but
                     there is relatively little headroom above and below shoulders.
                   - Shane's photo: 832×1248 (2:3 ratio) — taller portrait with
                     natural head-and-shoulders framing already built in.

                   ANCHOR MATCH STRATEGY:
                   Shane uses scale(0.95) + transformOrigin "center top" +
                   objectPosition "center 8%". This means:
                     • The photo is rendered 95% of container size
                     • The scale-down pulls from the top (reveals more bottom)
                     • objectPosition shifts content up 8% for proper headroom

                   For Mel to match the SAME visual anchor points:
                   1. Use identical objectPosition "center 8%" to match crop top
                   2. Use identical transformOrigin "center top" — scale from top
                   3. Her 4:5 photo means at objectFit:cover there is less
                      vertical content visible vs Shane's 2:3. We compensate by
                      NOT scaling down — let objectFit:cover use the full height
                      naturally, which for her squarer photo means more face fill.
                   4. Applying scale(1.0) — no scaling — lets the browser's
                      native cover behavior use her full image exactly, and with
                      objectPosition "center 8%" the anchor point matches Shane.
                   This is the cleanest, most stable approach: same parameters,
                   physics-correct for each photo's native aspect ratio.
                 */}
                <img
                  src={melPhoto}
                  alt="Mel Kotchey, Co-Founder & CEO of Cybin Enterprises"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center 8%",
                    display: "block",
                    transform: "scale(0.85)",
                    transformOrigin: "center top",
                  }}
                />
                {/* Teal rim-light — left + right edges */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to right, rgba(0,212,184,0.18) 0%, transparent 18%, transparent 82%, rgba(0,212,184,0.14) 100%)",
                    pointerEvents: "none",
                    zIndex: 2,
                    mixBlendMode: "screen",
                  }}
                />
                {/* Bottom fade to section background */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "55%",
                    background:
                      "linear-gradient(to bottom, transparent 0%, rgba(8,13,26,0.55) 60%, rgba(8,13,26,0.98) 100%)",
                    pointerEvents: "none",
                    zIndex: 3,
                  }}
                />
                {/* Top subtle vignette */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "25%",
                    background:
                      "linear-gradient(to bottom, rgba(8,13,26,0.5) 0%, transparent 100%)",
                    pointerEvents: "none",
                    zIndex: 3,
                  }}
                />
                {/* Ambient teal glow — atmospheric, blended behind photo edges */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    inset: "-20px",
                    background:
                      "radial-gradient(ellipse 80% 60% at 50% 110%, rgba(0,212,184,0.28) 0%, transparent 60%)",
                    pointerEvents: "none",
                    zIndex: 4,
                    mixBlendMode: "screen",
                  }}
                />
              </div>

              {/* Bio card — seamlessly attached below portrait */}
              <div
                className="rounded-b-2xl"
                style={{
                  background:
                    "linear-gradient(160deg, rgba(8,13,26,0.99) 0%, rgba(4,6,18,0.97) 100%)",
                  border: "1px solid rgba(0,212,184,0.18)",
                  borderTop: "none",
                  boxShadow:
                    "0 0 60px rgba(0,212,184,0.08), 0 0 120px rgba(0,212,184,0.04), inset 0 1px 0 rgba(0,212,184,0.06)",
                  padding: "28px 32px 32px",
                  flex: 1,
                }}
              >
                {/* Name + title */}
                <div className="mb-5">
                  <h3
                    style={{
                      fontFamily: "Sora, system-ui, sans-serif",
                      fontSize: "28px",
                      fontWeight: 700,
                      color: "#e8edf8",
                      lineHeight: 1.2,
                      marginBottom: "8px",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    Mel Kotchey
                  </h3>
                  <p
                    style={{
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#00d4b8",
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                      fontFamily: "Cabinet Grotesk, system-ui, sans-serif",
                    }}
                  >
                    Co-Founder &amp; CEO
                  </p>
                  <div
                    style={{
                      marginTop: "16px",
                      borderTop: "1px solid rgba(0,212,184,0.15)",
                    }}
                  />
                </div>

                {/* Bio text */}
                <p
                  style={{
                    color: "rgba(232,237,248,0.75)",
                    fontSize: "15px",
                    lineHeight: 1.8,
                    marginBottom: "12px",
                  }}
                >
                  Mel Kotchey is an award-winning entrepreneur with extensive
                  experience across regulated industries. Before founding Cybin
                  Enterprises, she built and operated a successful business in
                  the regulated cannabis and wellness sector — seeing firsthand
                  how the right payment infrastructure reduces operational
                  stress for business owners.
                </p>
                <p
                  style={{
                    color: "rgba(232,237,248,0.75)",
                    fontSize: "15px",
                    lineHeight: 1.8,
                    marginBottom: "24px",
                  }}
                >
                  Mel holds five degrees including a master's in healthcare
                  administration and has spent 28 years working across medical
                  and regulated sectors. Her leadership focuses on stability,
                  clarity, and long-term support for merchants.
                </p>

                {/* Achievements panel */}
                <div
                  className="rounded-xl"
                  style={{
                    backgroundColor: "rgba(0,212,184,0.04)",
                    border: "1px solid rgba(0,212,184,0.1)",
                    padding: "20px",
                  }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Award
                      size={15}
                      style={{ color: "#00d4b8", flexShrink: 0 }}
                    />
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.14em",
                        color: "#00d4b8",
                        fontFamily: "Cabinet Grotesk, system-ui, sans-serif",
                      }}
                    >
                      Achievements
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    {melAchievements.map((a) => (
                      <div key={a} className="flex items-start gap-3">
                        <span
                          style={{
                            color: "#00d4b8",
                            fontSize: "8px",
                            marginTop: "6px",
                            flexShrink: 0,
                          }}
                        >
                          ◆
                        </span>
                        <p
                          style={{
                            color: "rgba(232,237,248,0.68)",
                            fontSize: "13px",
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

            {/* ══ SHANE SUEHR ══ */}
            <div
              className="animate-fade-up"
              data-ocid="about.founders.card.2"
              style={{
                display: "flex",
                flexDirection: "column",
                transitionDelay: "120ms",
              }}
            >
              {/* Portrait hero zone — real photo with CSS edge-blend */}
              <div
                className="h-[460px] lg:h-[540px]"
                style={{
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: "20px 20px 0 0",
                }}
              >
                {/* Actual photo */}
                {/*
                   ANCHOR MATCH (synced with Mel):
                   Shane's photo: 832×1248 (2:3 ratio) — taller portrait.
                   At objectFit:cover with objectPosition "center 8%", his
                   head-and-shoulders fills the frame naturally with correct
                   headroom above. No scale transform needed — the native 2:3
                   ratio already provides the right proportions in this container.
                   Identical parameters to Mel: scale(1.0), center top origin,
                   objectPosition "center 8%" — the browser's cover algorithm
                   handles each photo's aspect ratio independently while the
                   visible crop anchor is the same for both cards.
                 */}
                <img
                  src={shanePhoto}
                  alt="Shane Suehr, Co-Founder & COO of Cybin Enterprises"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center 8%",
                    display: "block",
                    transform: "scale(1.0)",
                    transformOrigin: "center top",
                  }}
                />
                {/* Purple rim-light — left + right edges */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to right, rgba(124,92,191,0.2) 0%, transparent 18%, transparent 82%, rgba(124,92,191,0.16) 100%)",
                    pointerEvents: "none",
                    zIndex: 2,
                    mixBlendMode: "screen",
                  }}
                />
                {/* Bottom fade to section background */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "55%",
                    background:
                      "linear-gradient(to bottom, transparent 0%, rgba(8,13,26,0.55) 60%, rgba(8,13,26,0.98) 100%)",
                    pointerEvents: "none",
                    zIndex: 3,
                  }}
                />
                {/* Top subtle vignette */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "25%",
                    background:
                      "linear-gradient(to bottom, rgba(8,13,26,0.5) 0%, transparent 100%)",
                    pointerEvents: "none",
                    zIndex: 3,
                  }}
                />
                {/* Ambient purple glow */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    inset: "-20px",
                    background:
                      "radial-gradient(ellipse 80% 60% at 50% 110%, rgba(124,92,191,0.32) 0%, transparent 60%)",
                    pointerEvents: "none",
                    zIndex: 4,
                    mixBlendMode: "screen",
                  }}
                />
              </div>

              {/* Bio card */}
              <div
                className="rounded-b-2xl"
                style={{
                  background:
                    "linear-gradient(160deg, rgba(8,13,26,0.99) 0%, rgba(5,3,18,0.97) 100%)",
                  border: "1px solid rgba(124,92,191,0.22)",
                  borderTop: "none",
                  boxShadow:
                    "0 0 60px rgba(124,92,191,0.1), 0 0 120px rgba(124,92,191,0.05), inset 0 1px 0 rgba(124,92,191,0.06)",
                  padding: "28px 32px 32px",
                  flex: 1,
                }}
              >
                {/* Name + title */}
                <div className="mb-5">
                  <h3
                    style={{
                      fontFamily: "Sora, system-ui, sans-serif",
                      fontSize: "28px",
                      fontWeight: 700,
                      color: "#e8edf8",
                      lineHeight: 1.2,
                      marginBottom: "8px",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    Shane Suehr
                  </h3>
                  <p
                    style={{
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#a87ef5",
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                      fontFamily: "Cabinet Grotesk, system-ui, sans-serif",
                    }}
                  >
                    Co-Founder &amp; COO
                  </p>
                  <div
                    style={{
                      marginTop: "16px",
                      borderTop: "1px solid rgba(124,92,191,0.18)",
                    }}
                  />
                </div>

                {/* Bio text */}
                <p
                  style={{
                    color: "rgba(232,237,248,0.75)",
                    fontSize: "15px",
                    lineHeight: 1.8,
                    marginBottom: "12px",
                  }}
                >
                  Shane brings deep experience across logistics, cybersecurity,
                  health-technology, and consumer services. He focuses on
                  simplifying complex payment environments and helping
                  businesses understand their options in clear, practical terms.
                </p>
                <p
                  style={{
                    color: "rgba(232,237,248,0.75)",
                    fontSize: "15px",
                    lineHeight: 1.8,
                    marginBottom: "24px",
                  }}
                >
                  His background includes helping businesses achieve significant
                  operational growth and supporting companies across multiple
                  industries to reach new levels of efficiency and stability.
                  Shane's expertise in technology and operations ensures clients
                  receive practical, implementable solutions.
                </p>

                {/* Expertise panel */}
                <div
                  className="rounded-xl"
                  style={{
                    backgroundColor: "rgba(124,92,191,0.05)",
                    border: "1px solid rgba(124,92,191,0.12)",
                    padding: "20px",
                  }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Award
                      size={15}
                      style={{ color: "#a87ef5", flexShrink: 0 }}
                    />
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.14em",
                        color: "#a87ef5",
                        fontFamily: "Cabinet Grotesk, system-ui, sans-serif",
                      }}
                    >
                      Areas of Expertise
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    {shaneExpertise.map((a) => (
                      <div key={a} className="flex items-start gap-3">
                        <span
                          style={{
                            color: "#a87ef5",
                            fontSize: "8px",
                            marginTop: "6px",
                            flexShrink: 0,
                          }}
                        >
                          ◆
                        </span>
                        <p
                          style={{
                            color: "rgba(232,237,248,0.68)",
                            fontSize: "13px",
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
          {/* /founders grid */}
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
