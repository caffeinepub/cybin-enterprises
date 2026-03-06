import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface LegalSection {
  title: string;
  content: string[];
}

interface LegalPageProps {
  title: string;
  effectiveDate: string;
  intro: string;
  sections: LegalSection[];
  breadcrumb: string;
}

export function LegalPageTemplate({
  title,
  effectiveDate,
  intro,
  sections,
  breadcrumb,
}: LegalPageProps) {
  return (
    <div>
      <section
        className="page-hero-bg"
        style={{
          padding: "60px 0 40px",
          borderBottom: "1px solid rgba(0,212,184,0.08)",
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
              {breadcrumb}
            </span>
          </div>
          <h1
            className="text-3xl sm:text-4xl font-bold mb-3"
            style={{
              fontFamily: "Sora, system-ui, sans-serif",
              color: "#e8edf8",
            }}
          >
            {title}
          </h1>
          <p className="text-sm" style={{ color: "rgba(232,237,248,0.45)" }}>
            Effective Date: {effectiveDate}
          </p>
        </div>
      </section>

      <section style={{ backgroundColor: "#0a0f1e", padding: "60px 0 80px" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="cybin-glass-card p-8 sm:p-10"
            style={{ lineHeight: 1.8 }}
          >
            <p
              className="text-sm mb-8"
              style={{ color: "rgba(232,237,248,0.65)" }}
            >
              {intro}
            </p>

            <div className="space-y-8">
              {sections.map(({ title: sTitle, content }, i) => (
                <div key={sTitle}>
                  <h2
                    className="text-lg font-bold mb-3"
                    style={{ fontFamily: "Sora, sans-serif", color: "#e8edf8" }}
                  >
                    {i + 1}. {sTitle}
                  </h2>
                  {content.map((para) => (
                    <p
                      key={para.slice(0, 40)}
                      className="text-sm mb-2"
                      style={{ color: "rgba(232,237,248,0.6)" }}
                    >
                      {para}
                    </p>
                  ))}
                </div>
              ))}
            </div>

            <div
              className="mt-10 p-5 rounded-xl text-center"
              style={{
                backgroundColor: "rgba(0, 212, 184, 0.05)",
                border: "1px solid rgba(0, 212, 184, 0.12)",
              }}
            >
              <p
                className="text-sm"
                style={{ color: "rgba(232,237,248,0.55)" }}
              >
                If you have questions about this policy, please{" "}
                <Link to="/contact" style={{ color: "#00d4b8" }}>
                  contact us
                </Link>{" "}
                at info@cybinenterprises.com
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export function PrivacyPolicyPage() {
  return (
    <LegalPageTemplate
      title="Privacy Policy"
      breadcrumb="Privacy Policy"
      effectiveDate="January 1, 2026"
      intro="Cybin Enterprises ('we,' 'our,' or 'us') is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services. Please read this policy carefully."
      sections={[
        {
          title: "Information We Collect",
          content: [
            "We may collect personal information that you voluntarily provide to us when you fill out contact forms, request information, or otherwise communicate with us. This may include your name, email address, phone number, and business information.",
            "We may also automatically collect certain information when you visit our website, including your IP address, browser type, operating system, referring URLs, and information about your interactions with our site.",
          ],
        },
        {
          title: "How We Use Your Information",
          content: [
            "We use the information we collect to respond to your inquiries, provide payment processing consultation services, communicate with you about our services, improve our website and services, and comply with legal obligations.",
            "We do not sell, trade, or otherwise transfer your personally identifiable information to third parties without your consent, except as required to provide our services or as required by law.",
          ],
        },
        {
          title: "Data Security",
          content: [
            "We implement reasonable administrative, technical, and physical security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure.",
            "We retain personal information only as long as necessary to fulfill the purposes outlined in this policy or as required by law.",
          ],
        },
        {
          title: "Your Rights",
          content: [
            "Depending on your location, you may have certain rights regarding your personal information, including the right to access, correct, or delete your personal data. To exercise these rights, please contact us at info@cybinenterprises.com.",
          ],
        },
        {
          title: "Cookies",
          content: [
            "We use cookies and similar tracking technologies to enhance your browsing experience. You can control cookies through your browser settings. For more information, please see our Cookie Policy.",
          ],
        },
        {
          title: "Changes to This Policy",
          content: [
            "We reserve the right to update this Privacy Policy at any time. We will notify you of any material changes by updating the effective date at the top of this policy. Your continued use of our services after any changes constitutes your acceptance of the updated policy.",
          ],
        },
      ]}
    />
  );
}

export function TermsOfServicePage() {
  return (
    <LegalPageTemplate
      title="Terms of Service"
      breadcrumb="Terms of Service"
      effectiveDate="January 1, 2026"
      intro="Please read these Terms of Service ('Terms') carefully before using the Cybin Enterprises website. By accessing or using our website, you agree to be bound by these Terms."
      sections={[
        {
          title: "Acceptance of Terms",
          content: [
            "By accessing and using this website, you accept and agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our website.",
          ],
        },
        {
          title: "Description of Services",
          content: [
            "Cybin Enterprises provides payment processing consultation, merchant account facilitation, and related financial services for high-risk and complex business categories. Our website provides informational content about these services.",
            "The information on this website is provided for general informational purposes only and does not constitute financial, legal, or regulatory advice.",
          ],
        },
        {
          title: "Use of the Website",
          content: [
            "You agree to use this website only for lawful purposes and in a manner that does not infringe the rights of others or restrict their use of the website. You may not use automated tools to scrape or harvest information from the website.",
            "Cybin Enterprises reserves the right to modify, suspend, or discontinue any part of the website at any time without notice.",
          ],
        },
        {
          title: "Intellectual Property",
          content: [
            "All content on this website, including text, graphics, logos, and images, is the property of Cybin Enterprises and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.",
          ],
        },
        {
          title: "Disclaimer of Warranties",
          content: [
            "This website and its content are provided 'as is' without any warranties, express or implied. Cybin Enterprises does not warrant that the website will be uninterrupted, error-free, or free of viruses or other harmful components.",
          ],
        },
        {
          title: "Limitation of Liability",
          content: [
            "To the fullest extent permitted by law, Cybin Enterprises shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of or inability to use this website or our services.",
          ],
        },
        {
          title: "Governing Law",
          content: [
            "These Terms shall be governed by and construed in accordance with applicable laws. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the applicable courts.",
          ],
        },
      ]}
    />
  );
}

export function CookiePolicyPage() {
  return (
    <LegalPageTemplate
      title="Cookie Policy"
      breadcrumb="Cookie Policy"
      effectiveDate="January 1, 2026"
      intro="This Cookie Policy explains how Cybin Enterprises uses cookies and similar tracking technologies on our website. By using our website, you consent to the use of cookies as described in this policy."
      sections={[
        {
          title: "What Are Cookies",
          content: [
            "Cookies are small text files that are stored on your device when you visit a website. They help the website remember information about your visit, such as your preferences, and can make your next visit easier and more useful to you.",
          ],
        },
        {
          title: "Types of Cookies We Use",
          content: [
            "Essential Cookies: These are necessary for the website to function properly and cannot be disabled. They enable core functionality such as security and form submission.",
            "Analytics Cookies: These help us understand how visitors interact with our website by collecting and reporting information anonymously. This allows us to improve our website's performance and content.",
            "Preference Cookies: These remember your settings and preferences to provide a more personalized experience on subsequent visits.",
          ],
        },
        {
          title: "How to Control Cookies",
          content: [
            "You can control and manage cookies through your browser settings. Most browsers allow you to refuse cookies or to receive a notification before a cookie is stored. Please note that disabling certain cookies may affect the functionality of our website.",
            "To find out more about cookies, including how to see what cookies have been set and how to manage and delete them, visit www.aboutcookies.org or www.allaboutcookies.org.",
          ],
        },
        {
          title: "Third-Party Cookies",
          content: [
            "We may use third-party services that set cookies on our website for analytics and performance measurement purposes. These third parties have their own privacy policies and we have no control over their cookies.",
          ],
        },
        {
          title: "Changes to This Cookie Policy",
          content: [
            "We may update this Cookie Policy from time to time. The updated version will be indicated by an updated effective date. We encourage you to review this policy periodically to stay informed about our use of cookies.",
          ],
        },
      ]}
    />
  );
}
