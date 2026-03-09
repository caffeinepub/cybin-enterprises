import { JsonLd } from "@/components/JsonLd";
import { LegalPageTemplate } from "@/components/pages/LegalPage";
import { useSeo } from "@/hooks/useSeo";

export default function AccessibilityPage() {
  useSeo({
    title: "Accessibility Statement | Cybin Enterprises",
    description:
      "Cybin Enterprises accessibility statement. Our commitment to WCAG 2.1 Level AA compliance, known limitations, and how to report accessibility barriers.",
    canonical: "/accessibility",
  });

  return (
    <>
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
              name: "Accessibility Statement",
              item: "https://cybinenterprises.com/accessibility",
            },
          ],
        }}
      />
      <LegalPageTemplate
        title="Accessibility Statement"
        breadcrumb="Accessibility Statement"
        effectiveDate="March 9, 2026"
        intro="Cybin Enterprises LLC is committed to ensuring that our website, cybinenterprises.com, is accessible to all users, including people with disabilities. This statement describes our current accessibility status, the measures we have taken to improve accessibility, known limitations, and how to contact us if you experience barriers."
        sections={[
          {
            title: "Our Commitment",
            content: [
              "Cybin Enterprises is committed to ensuring digital accessibility for people with disabilities. We believe that all users — regardless of ability — should be able to access information about our services and submit inquiries through our website.",
              "We continually work to improve the user experience for everyone and apply relevant accessibility standards. We view accessibility not as a checkbox but as an ongoing commitment that we take seriously.",
            ],
          },
          {
            title: "Conformance Status",
            content: [
              "We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA. These guidelines, published by the World Wide Web Consortium (W3C), explain how to make web content more accessible to people with disabilities.",
              "WCAG defines accessibility requirements across four principles: Perceivable, Operable, Understandable, and Robust (POUR). Our goal is to meet Level AA conformance across all four principles.",
              "We conduct periodic reviews of our website against these criteria and address issues as they are identified. This is a living commitment, not a one-time audit.",
            ],
          },
          {
            title: "Technical Specifications",
            content: [
              "Our website relies on the following technologies to function: HTML5, CSS3, JavaScript (React 19), and the Internet Computer Protocol (ICP) for infrastructure.",
              "We employ the following accessibility implementation measures:",
              "(a) Semantic HTML5 elements: We use proper heading hierarchy (h1–h4), landmark elements (<header>, <main>, <nav>, <footer>, <section>, <article>), and meaningful markup that conveys document structure to assistive technologies.",
              "(b) ARIA attributes: Interactive elements include appropriate aria-label, aria-expanded, aria-controls, aria-checked, and aria-live attributes to communicate state and purpose to screen readers.",
              "(c) Keyboard navigation support: All interactive elements (links, buttons, form fields) are reachable and operable via keyboard alone. We use :focus-visible CSS styles to maintain visible focus indicators.",
              "(d) Skip-to-content link: A 'Skip to main content' link is the first focusable element on each page, allowing keyboard and screen reader users to bypass navigation.",
              "(e) Prefers-reduced-motion: All animations and transitions respect the prefers-reduced-motion media query. Users who have enabled reduced-motion preferences in their OS will experience the site without animations.",
              '(f) Alt text: Meaningful images include descriptive alt text. Decorative images use empty alt attributes (alt="") to be ignored by screen readers.',
              "(g) Color contrast: We design for high contrast ratios between text and background to support users with low vision.",
              "(h) Mobile accessibility: The site is built mobile-first with touch targets meeting minimum size recommendations.",
            ],
          },
          {
            title: "Known Limitations",
            content: [
              "Despite our best efforts to ensure accessibility, there may be some limitations. The following are known issues we are actively working to address:",
              "(a) Color contrast — Certain supplementary text elements, including secondary captions and disclaimer text, use reduced-opacity color values (e.g., rgba(232, 237, 248, 0.45)) that may not fully meet the WCAG 2.1 AA minimum contrast ratio of 4.5:1 against the dark background. We are reviewing and remediating these instances.",
              "(b) Complex animations — The network animation in the hero section uses a Canvas element. While it is decorative and does not convey information, we are reviewing how it interacts with certain assistive technologies.",
              "(c) Third-party content — The site does not use third-party embedded content, widgets, or iframes, which reduces third-party accessibility risks.",
              "We are committed to continuously monitoring and improving our accessibility. If you find a limitation not listed here, please let us know.",
            ],
          },
          {
            title: "Measures We Have Taken",
            content: [
              "To support accessibility across the site, Cybin Enterprises has implemented the following measures:",
              "• Skip-to-content link provided as the first focusable element on all pages.",
              "• Semantic HTML5 landmark structure on all pages.",
              "• ARIA labels on all interactive elements including navigation, buttons, form inputs, modals, and toggle controls.",
              "• Keyboard navigation support for all interactive components.",
              "• Prefers-reduced-motion CSS media query honored throughout, disabling all animations and transitions for users who prefer reduced motion.",
              "• Descriptive alt text on all meaningful images.",
              "• Form inputs with proper labels, input types, and autocomplete attributes.",
              "• Error messages associated with form fields via accessible markup.",
              "• Responsive, mobile-first design that adapts to all viewport sizes.",
            ],
          },
          {
            title: "Feedback and Contact",
            content: [
              "We welcome your feedback on the accessibility of cybinenterprises.com. If you experience any accessibility barriers — or if you need information in an alternative format — please contact us:",
              "Email: Customercare@cybinenterprises.com",
              "Phone: 888-321-2100 (Office) | 724-244-7111 (Mobile)",
              'Subject line: "Accessibility Feedback"',
              "Please describe the specific barrier you encountered, the page URL where you encountered it, and the assistive technology or browser you were using (if known). We aim to acknowledge accessibility feedback within 5 business days and will work to resolve verified issues as quickly as practicable.",
              "We will not discriminate against or penalize any user who raises accessibility concerns.",
            ],
          },
          {
            title: "Formal Complaints",
            content: [
              "If you are not satisfied with our response to your accessibility concern, you have the right to escalate the matter to a relevant enforcement body.",
              "In the United States, you may contact:",
              "• U.S. Department of Justice — ADA Information Line: 1-800-514-0301 (voice) | 1-833-610-1264 (TTY) | ada.gov",
              "• U.S. Access Board: 1-202-272-0080 | access-board.gov",
              "For EU users, you may contact your local national accessibility supervisory authority under Directive (EU) 2016/2102 on the accessibility of public sector bodies' websites and mobile applications.",
            ],
          },
          {
            title: "Statement Date",
            content: [
              "This Accessibility Statement was created on March 9, 2026 in accordance with the W3C Accessibility Statement Generator Guide (w3.org/WAI/planning/statements/).",
              "We review and update this statement periodically, and as we make material improvements to site accessibility. The current version is always available at cybinenterprises.com/accessibility.",
            ],
          },
        ]}
      />
    </>
  );
}
