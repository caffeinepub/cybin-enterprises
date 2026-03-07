import { JsonLd } from "@/components/JsonLd";
import { useSeo } from "@/hooks/useSeo";
import { Link } from "@/lib/router";
import { ChevronRight } from "lucide-react";

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
  useSeo({
    title: "Privacy Policy | Cybin Enterprises",
    description:
      "Cybin Enterprises privacy policy — how we collect, use, and protect your personal information in compliance with CCPA, GDPR, and 2026 data privacy standards.",
    canonical: "/privacy-policy",
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
              name: "Privacy Policy",
              item: "https://cybinenterprises.com/privacy-policy",
            },
          ],
        }}
      />
      <LegalPageTemplate
        title="Privacy Policy"
        breadcrumb="Privacy Policy"
        effectiveDate="March 7, 2026"
        intro="Cybin Enterprises ('we,' 'our,' or 'us') is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services. We comply with applicable U.S. federal and state privacy laws including the California Consumer Privacy Act (CCPA), European data protection standards under the GDPR, and the Bank Secrecy Act (BSA). Please read this policy carefully."
        sections={[
          {
            title: "Information We Collect",
            content: [
              "We may collect personal information that you voluntarily provide to us when you fill out contact forms, intake wizards, partner applications, or otherwise communicate with us. This may include your name, email address, phone number, business name, Federal Employer Identification Number (FEIN), business type, and partnership goals.",
              "We may also automatically collect certain technical information when you visit our website, including your IP address (anonymized where possible), browser type, operating system, referring URLs, and aggregate information about your interactions with our site.",
              "For compliance with the Bank Secrecy Act and FinCEN regulations, we collect identity documents, beneficial ownership information, and business verification documents during the merchant onboarding process.",
            ],
          },
          {
            title: "How We Use Your Information",
            content: [
              "We use the information we collect to: respond to your inquiries and service requests; facilitate payment processing consultation and merchant account placement; communicate with you about our services; improve our website and services; comply with legal and regulatory obligations including AML/KYC requirements under the Bank Secrecy Act and FinCEN regulations; and conduct fraud prevention and risk assessment.",
              "We do not sell, trade, or rent your personally identifiable information to third parties for marketing purposes. We may share information with trusted service providers who assist in operating our website and services, subject to confidentiality obligations.",
            ],
          },
          {
            title: "FinCEN / AML Data Collection Notice",
            content: [
              "As part of our obligations under the Bank Secrecy Act (BSA) and FinCEN Customer Due Diligence (CDD) rules, we collect and verify identity information from all merchant applicants, including principals with 25% or greater beneficial ownership. This information is used solely for anti-money laundering (AML) compliance and Know Your Customer (KYC) verification purposes.",
              "We may be required to file Currency Transaction Reports (CTRs) or Suspicious Activity Reports (SARs) with FinCEN if transaction patterns meet applicable reporting thresholds. This filing obligation cannot be waived by any party.",
            ],
          },
          {
            title: "Data Retention",
            content: [
              "Contact form submissions and partnership inquiries are retained for 36 months from the date of submission, then securely deleted unless a business relationship has been established.",
              "Merchant onboarding and KYC documentation is retained for a minimum of 5 years following account closure, as required by the Bank Secrecy Act. SAR-related records are retained for a minimum of 5 years.",
              "Analytics data stored locally in your browser (via localStorage) is retained on your device until you clear your browser storage or use our built-in analytics clear function.",
            ],
          },
          {
            title: "CCPA Privacy Rights (California Residents)",
            content: [
              "If you are a California resident, you have the following rights under the California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA): (1) Right to Know — the categories and specific pieces of personal information we collect about you; (2) Right to Delete — to request deletion of your personal information, subject to certain exceptions; (3) Right to Opt-Out — we do not sell personal information; (4) Right to Correct — to request correction of inaccurate personal information; and (5) Right to Non-Discrimination — we will not discriminate against you for exercising your CCPA rights.",
              "To exercise your CCPA rights, submit a request to Customercare@cybinenterprises.com with the subject line 'CCPA Request'. We will respond within 45 days. Identity verification may be required.",
            ],
          },
          {
            title: "GDPR Data Subject Rights (EU/EEA Residents)",
            content: [
              "If you are located in the European Union or European Economic Area, you have the following rights under the General Data Protection Regulation (GDPR): (1) Right of Access — to receive a copy of your personal data; (2) Right to Rectification — to correct inaccurate data; (3) Right to Erasure ('right to be forgotten') — to request deletion where no legal basis requires continued retention; (4) Right to Data Portability — to receive your data in a structured, machine-readable format; (5) Right to Object — to processing based on legitimate interests; and (6) Right to Restrict Processing — in certain circumstances.",
              "The lawful basis for processing your data is typically your consent (for contact forms) or legitimate interests (for fraud prevention and compliance). For cross-border data transfers outside the EEA, we rely on Standard Contractual Clauses (SCCs) or other approved transfer mechanisms.",
            ],
          },
          {
            title: "AI Training Opt-Out Notice",
            content: [
              "We do not use any personal information submitted through this website to train artificial intelligence or machine learning models. Your data is used solely for the purposes described in this Privacy Policy and will not be licensed to, or used by, any AI training pipeline.",
            ],
          },
          {
            title: "Biometric Data",
            content: [
              "Cybin Enterprises does not collect biometric identifiers or biometric information (as defined by applicable state biometric privacy laws, including the Illinois Biometric Information Privacy Act) through this website. Identity verification during merchant onboarding is conducted through document verification only.",
            ],
          },
          {
            title: "Data Security",
            content: [
              "We implement administrative, technical, and physical security measures designed to protect your personal information against unauthorized access, alteration, disclosure, or destruction. Our platform is built on the Internet Computer Protocol (ICP), which provides cryptographic security guarantees at the infrastructure level.",
              "No method of transmission over the Internet or electronic storage is 100% secure. In the event of a data breach affecting your rights and freedoms, we will notify affected individuals and applicable regulatory authorities as required by law.",
            ],
          },
          {
            title: "Cookies",
            content: [
              "We use essential cookies to enable core website functionality and consent management. We do not use third-party advertising cookies. For more information, please see our Cookie Policy.",
            ],
          },
          {
            title: "Changes to This Policy",
            content: [
              "We reserve the right to update this Privacy Policy at any time. Material changes will be communicated by updating the effective date. Your continued use of our services after any changes constitutes your acceptance of the updated policy.",
            ],
          },
        ]}
      />
    </>
  );
}

export function TermsOfServicePage() {
  useSeo({
    title: "Terms of Service | Cybin Enterprises",
    description:
      "Cybin Enterprises terms of service governing use of our website and payment consultation services. Includes AML/KYC acknowledgment, PCI-DSS, arbitration clause, and Pennsylvania governing law.",
    canonical: "/terms-of-service",
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
              name: "Terms of Service",
              item: "https://cybinenterprises.com/terms-of-service",
            },
          ],
        }}
      />
      <LegalPageTemplate
        title="Terms of Service"
        breadcrumb="Terms of Service"
        effectiveDate="March 7, 2026"
        intro="Please read these Terms of Service ('Terms') carefully before using the Cybin Enterprises website or services. By accessing or using our website, submitting an intake application, or engaging with our services, you accept and agree to be bound by these Terms and our Privacy Policy."
        sections={[
          {
            title: "Acceptance of Terms",
            content: [
              "By accessing and using this website, you accept and agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our website or submit any applications or inquiries.",
              "These Terms constitute a legally binding agreement between you (the 'User' or 'Merchant') and Cybin Enterprises LLC ('Cybin,' 'we,' or 'us'). Your continued use of the website after any updates to these Terms constitutes acceptance of the revised Terms.",
            ],
          },
          {
            title: "Description of Services",
            content: [
              "Cybin Enterprises provides payment processing consultation, merchant account facilitation, referral services, and related financial infrastructure services for high-risk and complex business categories. Our website provides informational content and intake tools to facilitate this process.",
              "The information on this website is provided for general informational and consultation purposes only and does not constitute financial, legal, regulatory, or professional advice. Preliminary assessments are for consultation only; full underwriting verification is required prior to account activation.",
              "Cybin Enterprises is not a payment processor, acquiring bank, or card network. We are a merchant service intermediary and consultation company.",
            ],
          },
          {
            title: "AML / KYC Compliance Acknowledgment",
            content: [
              "By submitting an application or intake form through this website, you acknowledge and agree that: (a) you are operating a legal business in compliance with all applicable federal, state, and local laws; (b) all information provided in any application is accurate, complete, and not misleading; (c) you authorize Cybin Enterprises to conduct identity verification, beneficial ownership verification, and background screening as part of the onboarding process; and (d) you understand that Cybin Enterprises maintains strict Anti-Money Laundering (AML) and Know Your Customer (KYC) protocols consistent with Bank Secrecy Act requirements.",
              "Any submission of false, misleading, or fraudulent information may result in immediate termination of services, reporting to applicable regulatory authorities, and potential civil and criminal liability.",
            ],
          },
          {
            title: "PCI-DSS Cardholder Data",
            content: [
              "Cybin Enterprises does not collect, store, process, or transmit cardholder data through this website. Any cardholder data processing is conducted exclusively through PCI-DSS Level 1 compliant payment processors engaged during the merchant activation process.",
              "Merchants are independently responsible for maintaining PCI-DSS compliance within their own systems, including any payment pages, point-of-sale terminals, or stored cardholder data environments. Failure to maintain PCI-DSS compliance may result in fines, assessments, or account termination by acquiring banks and card networks.",
            ],
          },
          {
            title: "Use of the Website",
            content: [
              "You agree to use this website only for lawful purposes and in a manner that does not infringe the rights of others. You may not: use automated tools to scrape or harvest information; submit false or fraudulent applications; attempt to access unauthorized areas of the site; or use the site to facilitate any illegal transaction.",
              "Cybin Enterprises reserves the right to modify, suspend, or discontinue any part of the website at any time without notice. We reserve the right to refuse service to any party at our sole discretion.",
            ],
          },
          {
            title: "Intellectual Property",
            content: [
              "All content on this website, including text, graphics, logos, images, and software, is the property of Cybin Enterprises and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.",
            ],
          },
          {
            title: "Disclaimer of Warranties",
            content: [
              "THIS WEBSITE AND ITS CONTENT ARE PROVIDED 'AS IS' WITHOUT ANY WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT. CYBIN ENTERPRISES DOES NOT WARRANT THAT THE WEBSITE WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE OF HARMFUL COMPONENTS. PRELIMINARY ASSESSMENTS AND CONSULTATIONS DO NOT GUARANTEE MERCHANT ACCOUNT APPROVAL.",
            ],
          },
          {
            title: "Limitation of Liability",
            content: [
              "TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, CYBIN ENTERPRISES AND ITS OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF OR INABILITY TO USE THIS WEBSITE OR OUR SERVICES, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.",
              "IN NO EVENT SHALL CYBIN ENTERPRISES' TOTAL AGGREGATE LIABILITY TO YOU EXCEED THE GREATER OF (A) THE TOTAL FEES PAID BY YOU TO CYBIN ENTERPRISES IN THE TWELVE (12) MONTHS IMMEDIATELY PRECEDING THE CLAIM, OR (B) ONE HUNDRED DOLLARS ($100.00). This limitation applies regardless of the theory of liability (contract, tort, negligence, strict liability, or otherwise).",
            ],
          },
          {
            title: "Indemnification",
            content: [
              "You agree to indemnify, defend, and hold harmless Cybin Enterprises and its officers, directors, employees, agents, licensors, and service providers from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to your violation of these Terms, your use of the website, your submission of false or inaccurate information, your violation of any third-party rights, or your violation of any applicable laws or regulations.",
            ],
          },
          {
            title: "Dispute Resolution and Binding Arbitration",
            content: [
              "PLEASE READ THIS SECTION CAREFULLY. IT AFFECTS YOUR LEGAL RIGHTS, INCLUDING YOUR RIGHT TO FILE A LAWSUIT IN COURT.",
              "Any dispute, claim, or controversy arising out of or relating to these Terms or your use of the Cybin Enterprises website or services shall be settled by binding arbitration administered by JAMS (or a mutually agreed arbitration service) in accordance with its Commercial Arbitration Rules. The arbitration shall be conducted in Pennsylvania, unless both parties agree otherwise in writing. The arbitrator's decision shall be final and binding.",
              "Exceptions to arbitration: Either party may seek emergency injunctive or other equitable relief from a court of competent jurisdiction to prevent irreparable harm pending arbitration.",
            ],
          },
          {
            title: "Class Action Waiver",
            content: [
              "YOU AND CYBIN ENTERPRISES AGREE THAT EACH MAY BRING CLAIMS AGAINST THE OTHER ONLY IN YOUR OR ITS INDIVIDUAL CAPACITY AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS OR REPRESENTATIVE ACTION. Unless both you and Cybin Enterprises agree otherwise, the arbitrator may not consolidate more than one person's claims and may not otherwise preside over any form of a representative or class proceeding.",
            ],
          },
          {
            title: "Force Majeure",
            content: [
              "Cybin Enterprises shall not be liable for any delay or failure to perform resulting from causes outside our reasonable control, including but not limited to: acts of God, war, terrorism, pandemics, government actions, regulatory changes, bank network disruptions, card network rule changes, natural disasters, or failures of third-party payment processors or technology providers.",
            ],
          },
          {
            title: "Governing Law and Jurisdiction",
            content: [
              "These Terms shall be governed by and construed in accordance with the laws of the Commonwealth of Pennsylvania, without regard to its conflict of law provisions. To the extent that any dispute is not subject to mandatory arbitration, the parties consent to the exclusive jurisdiction of the state and federal courts located in Pennsylvania.",
            ],
          },
          {
            title: "Severability",
            content: [
              "If any provision of these Terms is held to be invalid, illegal, or unenforceable, such provision shall be modified to the minimum extent necessary to make it enforceable, and the remaining provisions shall continue in full force and effect.",
            ],
          },
          {
            title: "Contact",
            content: [
              "If you have questions about these Terms, please contact us at Customercare@cybinenterprises.com or by phone at 888-321-2100.",
            ],
          },
        ]}
      />
    </>
  );
}

export function CookiePolicyPage() {
  useSeo({
    title: "Cookie Policy | Cybin Enterprises",
    description:
      "How Cybin Enterprises uses cookies and tracking technologies on our website.",
    canonical: "/cookie-policy",
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
              name: "Cookie Policy",
              item: "https://cybinenterprises.com/cookie-policy",
            },
          ],
        }}
      />
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
    </>
  );
}
