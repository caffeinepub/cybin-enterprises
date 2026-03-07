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
            Effective Date: {effectiveDate} | Last Reviewed: March 7, 2026
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
                at Customercare@cybinenterprises.com
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
      "Cybin Enterprises privacy policy — how we collect, use, and protect your personal information in compliance with CCPA, CPRA, GDPR, AML/KYC, BSA/FinCEN, and PCI-DSS standards.",
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
        intro="This Privacy Policy is issued by Cybin Enterprises LLC ('Cybin Enterprises,' 'we,' 'our,' or 'us'), a Pennsylvania-based payment services intermediary. This Policy describes, with specificity and transparency, how we collect, process, use, disclose, retain, and protect personal information obtained through our website (cybinenterprises.com), intake and application forms, and business communications. We comply with the California Consumer Privacy Act (CCPA) as amended by the California Privacy Rights Act (CPRA), the General Data Protection Regulation (EU) 2016/679 (GDPR), the Bank Secrecy Act (BSA), FinCEN Customer Due Diligence (CDD) Rules (31 CFR § 1010), and applicable Pennsylvania data protection statutes. This Policy constitutes a binding 'Notice at Collection' as required under California Civil Code § 1798.100 et seq. Please read this Policy carefully before submitting any information through our platform."
        sections={[
          {
            title:
              "Notice at Collection — Categories of Personal Information Collected",
            content: [
              "At or before the time of collection, we are required to inform you of the categories of personal information we collect and the purposes for which they will be used. We collect the following categories:",
              "(a) Identifiers: Real name, business name, email address, telephone number, mailing address, and IP address (anonymized where technically feasible).",
              "(b) Commercial Information: Business type, industry classification, transaction volume estimates, product or service descriptions, and partnership or referral information.",
              "(c) Government-Issued Identifiers: Federal Employer Identification Number (FEIN / EIN), state business registration numbers, and, during formal underwriting, Social Security Numbers of principals with 25% or greater beneficial ownership, collected solely for AML/KYC compliance under 31 CFR § 1010.230.",
              "(d) Financial Compliance Records: Beneficial ownership documentation, MATCH/TMF status self-disclosure, chargeback history self-disclosure, banking history, and identity verification documents submitted during merchant onboarding.",
              "(e) Device and Usage Data: Browser type, operating system, referring URLs, session duration, and page interaction data collected via privacy-first, server-side analytics (no cross-site tracking cookies).",
              "(f) Inferences: We may derive inferences from submitted information to assess application fit and regulatory risk — solely for business evaluation purposes.",
            ],
          },
          {
            title: "Purposes of Collection and Use — Lawful Bases",
            content: [
              "We process personal information for the following purposes and under the following lawful bases:",
              "(a) Service Delivery and Application Processing (Contract / Legitimate Interest): To evaluate and process merchant account applications, prepare businesses for payment processing approval, and facilitate introductions to acquiring banks and payment processors.",
              "(b) AML/KYC Compliance (Legal Obligation): To fulfill our obligations under the Bank Secrecy Act (31 U.S.C. § 5311 et seq.), FinCEN CDD Rules (31 CFR § 1010.230), and applicable anti-money laundering regulations. This includes identity verification, beneficial ownership verification, and ongoing transaction monitoring.",
              "(c) Fraud Prevention and Risk Management (Legitimate Interest): To assess chargeback risk, detect fraudulent applications, and protect against financial crimes.",
              "(d) Communications (Consent / Contract): To respond to inquiries, provide service updates, and communicate about your application status.",
              "(e) Legal Compliance (Legal Obligation): To comply with court orders, regulatory subpoenas, FinCEN reporting obligations, and applicable law.",
              "(f) Analytics and Site Improvement (Legitimate Interest): To analyze aggregate site usage data to improve our platform's performance, usability, and content. Analytics are conducted using privacy-first methods with no cross-site behavioral profiling.",
              "We do not sell, rent, license, or otherwise transfer your personally identifiable information to third parties for commercial marketing purposes. This applies to the sale of personal information as defined under the CCPA (Cal. Civ. Code § 1798.140(ad)).",
            ],
          },
          {
            title:
              "BSA/FinCEN Compliance — Anti-Money Laundering and Know Your Customer",
            content: [
              "Cybin Enterprises maintains a written Anti-Money Laundering (AML) compliance program consistent with the Bank Secrecy Act (BSA) and FinCEN regulations. As part of merchant onboarding and consultation services, we collect and verify:",
              "(a) Identity information for all merchant applicants, including government-issued photo identification for individual applicants and authorized representatives.",
              "(b) Beneficial ownership information for legal entities, identifying all natural persons who directly or indirectly own 25% or greater equity interest, as required by 31 CFR § 1010.230 (FinCEN CDD Rule).",
              "(c) Business purpose, nature of expected transactions, and anticipated transaction volumes.",
              "We are required by law to file Currency Transaction Reports (CTRs) with FinCEN for cash transactions exceeding $10,000 in a single business day, and Suspicious Activity Reports (SARs) when transactions or patterns meet applicable reporting thresholds under 31 U.S.C. § 5318(g). Federal law prohibits us from disclosing to any person that a SAR has been filed. SAR records are retained for a minimum of five (5) years.",
              "You acknowledge that providing false, misleading, or materially incomplete information in any application or onboarding form may constitute a federal crime under 18 U.S.C. § 1001 (false statements to federal authorities) and 18 U.S.C. § 1956 (money laundering), in addition to civil liability.",
            ],
          },
          {
            title: "PCI-DSS Scope and Cardholder Data",
            content: [
              "Cybin Enterprises does not collect, store, process, or transmit payment cardholder data (Primary Account Numbers, CVV/CVC codes, PINs, magnetic stripe data, or chip data) through this website. This website is not in scope for PCI-DSS assessment as a merchant or service provider for cardholder data processing.",
              "Cardholder data processing occurs exclusively through PCI-DSS Level 1 validated payment processors that are separately engaged during the merchant activation phase. Cybin Enterprises does not have access to cardholder data environments (CDEs) maintained by acquiring banks or payment processors.",
            ],
          },
          {
            title: "Data Sharing and Third-Party Disclosures",
            content: [
              "We may share personal information with the following categories of recipients, solely as necessary for the stated purposes:",
              "(a) Payment Processors and Acquiring Banks: To facilitate merchant account applications and introductions. These parties operate under their own compliance programs and data protection agreements.",
              "(b) Identity Verification and Screening Providers: To conduct KYC verification, OFAC sanctions screening, and background checks as required by AML regulations.",
              "(c) Legal and Regulatory Authorities: FinCEN, federal and state law enforcement, banking regulators, and courts, when required by applicable law or legal process.",
              "(d) Professional Service Providers: Attorneys, accountants, and technology service providers who process data on our behalf under written confidentiality agreements and, where applicable, Data Processing Agreements (DPAs) compliant with GDPR Article 28.",
              "(e) Business Transfers: In connection with a merger, acquisition, restructuring, or sale of all or substantially all of our assets, personal information may be transferred to the acquiring entity, subject to equivalent privacy protections.",
              "We do not share personal information with data brokers, advertising networks, or social media platforms for any purpose.",
            ],
          },
          {
            title: "Data Retention",
            content: [
              "We retain personal information only as long as necessary for the purposes set forth in this Policy, or as required by law:",
              "(a) Contact form submissions and general inquiries: Retained for thirty-six (36) months, then securely deleted unless a business relationship has been established.",
              "(b) Merchant application records and KYC documentation: Retained for a minimum of five (5) years following account closure or the date of the last transaction, as required by the Bank Secrecy Act (31 U.S.C. § 5318(h)) and FinCEN regulations.",
              "(c) SAR-related records: Retained for a minimum of five (5) years from the date of filing, as required by 31 CFR § 1020.320(d).",
              "(d) Partner application records: Retained for thirty-six (36) months from the date of submission.",
              "(e) Analytics data stored in browser localStorage: Retained on your device until you clear browser storage or use our built-in data clear function.",
              "Upon expiration of applicable retention periods, we securely destroy personal information using methods appropriate to the media type.",
            ],
          },
          {
            title: "Your Rights Under the CCPA/CPRA (California Residents)",
            content: [
              "If you are a California resident, you have the following rights under the California Consumer Privacy Act (CCPA), as amended by the California Privacy Rights Act (CPRA) (Cal. Civ. Code § 1798.100 et seq.):",
              "(a) Right to Know (§ 1798.110): You have the right to request that we disclose the categories of personal information we collect, the sources from which it is collected, the business or commercial purposes for collection, the categories of third parties with whom we share it, and the specific pieces of personal information we hold about you.",
              "(b) Right to Delete (§ 1798.105): You have the right to request deletion of your personal information, subject to exceptions including information required for legal compliance (such as BSA/FinCEN retention obligations), fraud prevention, and completion of an ongoing transaction.",
              "(c) Right to Correct (§ 1798.106): You have the right to request correction of inaccurate personal information we maintain about you.",
              "(d) Right to Opt-Out of Sale or Sharing (§ 1798.120): We do not sell personal information as defined under the CCPA, nor do we share personal information for cross-context behavioral advertising. This right is therefore satisfied as a matter of our standard practice.",
              "(e) Right to Limit Use of Sensitive Personal Information (§ 1798.121): We use sensitive personal information (including government identifiers and financial compliance records) solely for purposes of providing our services and fulfilling legal obligations — not for inferring characteristics unrelated to our services.",
              "(f) Right to Non-Discrimination (§ 1798.125): We will not discriminate against you for exercising any CCPA rights — including by denying services, charging different prices, or providing a different quality of service.",
              "To exercise your CCPA rights, submit a verifiable consumer request to Customercare@cybinenterprises.com with the subject line 'CCPA Privacy Request.' We will acknowledge your request within ten (10) business days and respond within forty-five (45) calendar days, with a possible extension of an additional forty-five (45) days where reasonably necessary. We may require identity verification before processing your request.",
            ],
          },
          {
            title: "Your Rights Under the GDPR (EU/EEA Residents)",
            content: [
              "If you are located in the European Union or European Economic Area, the General Data Protection Regulation (EU) 2016/679 (GDPR) provides you with the following rights:",
              "(a) Right of Access (Art. 15): To receive a copy of your personal data and information about how it is processed.",
              "(b) Right to Rectification (Art. 16): To correct inaccurate or incomplete personal data.",
              "(c) Right to Erasure / 'Right to Be Forgotten' (Art. 17): To request deletion of your personal data where no legal basis requires continued retention (note: BSA/FinCEN retention obligations create a legal basis to retain certain records).",
              "(d) Right to Restriction of Processing (Art. 18): To request that we limit the processing of your data in certain circumstances.",
              "(e) Right to Data Portability (Art. 20): To receive your personal data in a structured, commonly used, machine-readable format where processing is based on consent or contract.",
              "(f) Right to Object (Art. 21): To object to processing based on our legitimate interests, where your particular situation warrants it.",
              "(g) Rights Related to Automated Decision-Making (Art. 22): We do not make solely automated decisions that produce legal or similarly significant effects about you.",
              "Lawful Basis for Processing: Our lawful bases are (i) performance of a contract (Art. 6(1)(b)) for service delivery; (ii) compliance with a legal obligation (Art. 6(1)(c)) for AML/KYC and financial regulatory compliance; (iii) legitimate interests (Art. 6(1)(f)) for fraud prevention, site analytics, and business communications; and (iv) consent (Art. 6(1)(a)) where explicitly obtained.",
              "International Data Transfers: Where personal data is transferred outside the European Economic Area, we rely on Standard Contractual Clauses (SCCs) adopted pursuant to GDPR Article 46(2)(c) or other approved transfer mechanisms. A copy of applicable SCCs is available upon written request.",
              "To exercise your GDPR rights or lodge a complaint, contact us at Customercare@cybinenterprises.com. You also have the right to lodge a complaint with your local supervisory authority.",
            ],
          },
          {
            title: "AI Training Opt-Out and Automated Processing",
            content: [
              "We do not use personal information submitted through this website to train, fine-tune, or evaluate any artificial intelligence, machine learning, or large language model systems. Your personal data is used solely for the purposes described in this Privacy Policy.",
              "We do not license, sell, or otherwise transfer your personal information to any AI training data pipeline, dataset aggregator, or model training provider.",
              "We do not use fully automated decision-making that produces legal or similarly significant effects without human review.",
            ],
          },
          {
            title: "Biometric Data",
            content: [
              "Cybin Enterprises does not collect biometric identifiers or biometric information as defined by applicable state biometric privacy laws, including the Illinois Biometric Information Privacy Act (BIPA, 740 ILCS 14/1 et seq.) and the Texas Capture or Use of Biometric Identifier Act (Tex. Bus. & Com. Code § 503.001 et seq.). Identity verification during merchant onboarding is conducted through document review only and does not involve biometric analysis.",
            ],
          },
          {
            title: "Data Security",
            content: [
              "We implement administrative, technical, and physical safeguards designed to protect personal information against unauthorized access, use, disclosure, alteration, or destruction. Our platform is built on the Internet Computer Protocol (ICP), which provides cryptographic-grade security at the infrastructure level, including threshold ECDSA signing and tamper-evident audit trails.",
              "Specific measures include: access controls limited to authorized personnel; encrypted data transmission via TLS 1.2 or higher; input validation and rate limiting on all form endpoints; and regular security reviews.",
              "No method of electronic transmission or storage is 100% secure. In the event of a data breach affecting the rights and freedoms of natural persons, we will notify affected individuals and applicable regulatory authorities as required by applicable law — within 72 hours of becoming aware under the GDPR, and in accordance with applicable U.S. state breach notification statutes.",
            ],
          },
          {
            title: "Children's Privacy",
            content: [
              "Our website and services are not directed to individuals under the age of 18. We do not knowingly collect personal information from minors. If we become aware that a minor has submitted personal information, we will delete it promptly. If you believe a minor has submitted information, please contact us at Customercare@cybinenterprises.com.",
            ],
          },
          {
            title: "Cookies and Tracking Technologies",
            content: [
              "For detailed information about cookies and tracking technologies used on this site, please review our Cookie Policy. We do not use cross-site tracking cookies, third-party advertising pixels, or behavioral profiling tools.",
            ],
          },
          {
            title: "Changes to This Policy",
            content: [
              "We reserve the right to update this Privacy Policy at any time. When we make material changes, we will update the effective date and, where feasible, provide prominent notice on the website. Your continued use of our website or services after any changes become effective constitutes your acknowledgment of the revised Policy.",
              "We encourage you to review this Policy periodically. The current version is always accessible at cybinenterprises.com/privacy-policy.",
            ],
          },
          {
            title: "Contact and Data Controller Information",
            content: [
              "Data Controller: Cybin Enterprises LLC, Pennsylvania, United States",
              "Email: Customercare@cybinenterprises.com",
              "Office: 888-321-2100 | Mobile: 724-244-7111",
              "For GDPR-related inquiries or to submit a data subject request, please use the subject line 'GDPR Data Request' in your email correspondence.",
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
      "Cybin Enterprises terms of service governing use of our website and payment consultation services. Covers AML/KYC, PCI-DSS, MATCH list disclaimer, arbitration, class action waiver, and Pennsylvania governing law.",
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
        intro="PLEASE READ THESE TERMS OF SERVICE ('TERMS') CAREFULLY BEFORE USING THIS WEBSITE OR SUBMITTING ANY APPLICATION OR INQUIRY. BY ACCESSING OR USING THE CYBIN ENTERPRISES WEBSITE (cybinenterprises.com), SUBMITTING AN INTAKE FORM, APPLYING FOR MERCHANT SERVICES, OR OTHERWISE ENGAGING WITH CYBIN ENTERPRISES LLC ('CYBIN,' 'WE,' OR 'US'), YOU AGREE TO BE LEGALLY BOUND BY THESE TERMS. IF YOU DO NOT AGREE, DO NOT USE THIS WEBSITE OR SUBMIT ANY INFORMATION THROUGH IT. These Terms constitute a legally binding agreement between you ('User,' 'Applicant,' or 'Merchant') and Cybin Enterprises LLC, a Pennsylvania limited liability company."
        sections={[
          {
            title: "Nature of Services — Consultant and Intermediary Only",
            content: [
              "Cybin Enterprises provides payment processing consultation, merchant account facilitation, referral and introduction services, and related advisory services to businesses operating in complex or high-risk industries ('Services'). We are a merchant services intermediary and business consultant — not a payment processor, acquiring bank, card network, financial institution, or registered money services business (MSB).",
              "Cybin Enterprises does not process payments, hold funds, issue cards, or provide banking services. Our role is to evaluate merchant applications, prepare businesses for the underwriting process, and facilitate introductions to acquiring banks, independent sales organizations (ISOs), and payment processors that are separately licensed and regulated.",
              "PRELIMINARY ASSESSMENTS, CONSULTATIONS, AND INTAKE FORM SUBMISSIONS DO NOT CONSTITUTE A COMMITMENT, GUARANTEE, OR REPRESENTATION THAT MERCHANT ACCOUNT APPROVAL WILL BE GRANTED. Approval decisions are made exclusively by acquiring banks and payment processors, whose decisions are outside Cybin Enterprises' control.",
              "The information provided on this website is for general informational purposes only and does not constitute financial, legal, regulatory, tax, or professional advice. Users should consult qualified professionals for advice specific to their circumstances.",
            ],
          },
          {
            title: "Eligibility and Lawful Use",
            content: [
              "By using this website or submitting an application, you represent and warrant that: (a) you are at least 18 years of age and legally authorized to enter into binding agreements; (b) you are accessing this site in connection with a legitimate, legally operating business; (c) your business complies with all applicable federal, state, and local laws, regulations, and licensing requirements; and (d) you are not a sanctioned person or entity appearing on any OFAC SDN list, EU sanctions list, or equivalent government sanctions registry.",
              "This website and our services are available only in connection with lawful business activities. We reserve the right to refuse service to any applicant at our sole discretion, including applicants whose business models we cannot support or that present unacceptable compliance risk.",
            ],
          },
          {
            title: "AML/KYC Compliance Obligations and Acknowledgment",
            content: [
              "By submitting any application, intake form, or inquiry through this website, you expressly acknowledge and agree to the following:",
              "(a) You are operating a legally authorized business in full compliance with all applicable federal, state, and local laws.",
              "(b) All information you provide in any application, intake form, or communication is accurate, complete, truthful, and not misleading in any material respect.",
              "(c) You authorize Cybin Enterprises to conduct identity verification, beneficial ownership verification (as required by 31 CFR § 1010.230), background screening, OFAC/SDN sanctions screening, MATCH/TMF database inquiries, and credit or business history reviews as part of the onboarding and evaluation process.",
              "(d) You understand that Cybin Enterprises maintains Anti-Money Laundering (AML) and Know Your Customer (KYC) protocols consistent with the Bank Secrecy Act (BSA, 31 U.S.C. § 5311 et seq.) and FinCEN Customer Due Diligence Rules.",
              "(e) Submission of false, misleading, fabricated, or fraudulent information in any application may result in: (i) immediate termination of consultation and services; (ii) referral to applicable federal, state, or local law enforcement or regulatory agencies; (iii) potential civil liability for damages; and (iv) potential criminal prosecution under 18 U.S.C. § 1001 (false statements), 18 U.S.C. § 1341 (mail fraud), 18 U.S.C. § 1343 (wire fraud), and related statutes.",
            ],
          },
          {
            title: "MATCH/TMF Merchant Disclosure",
            content: [
              "Cybin Enterprises specializes in working with merchants who have been previously denied merchant processing accounts, including merchants who appear on the Mastercard Alert to Control High-Risk Merchants (MATCH) list, formerly known as the Terminated Merchant File (TMF).",
              "MATCH LIST DISCLOSURE: Cybin Enterprises is not affiliated with Mastercard, Visa, or any card network. We do not have the ability to add or remove merchants from the MATCH list. MATCH list placement is determined by acquiring banks and card networks pursuant to their own rules and regulations. A preliminary consultation or intake submission with Cybin Enterprises does not remove, suspend, or otherwise affect any MATCH listing.",
              "Merchants currently listed on MATCH are subject to enhanced due diligence requirements. Cybin Enterprises makes no representation or warranty that MATCH-listed merchants will be approved by any acquiring bank. Placement decisions are made solely by the relevant acquiring institution.",
              "Providing false representations about MATCH list status in any application is a material misrepresentation and may constitute fraud.",
            ],
          },
          {
            title: "PCI-DSS — Merchant Obligations",
            content: [
              "Cybin Enterprises does not collect, store, process, or transmit cardholder data (Primary Account Numbers, expiration dates, CVV/CVC codes, PINs, or magnetic stripe data) through this website.",
              "Once a merchant account is activated through a payment processor introduced by Cybin Enterprises, the merchant becomes independently responsible for maintaining compliance with the Payment Card Industry Data Security Standard (PCI-DSS), as administered by the PCI Security Standards Council (PCI SSC).",
              "Merchant PCI-DSS obligations include, without limitation: completing and submitting annual Self-Assessment Questionnaires (SAQs) appropriate to the merchant's processing environment; passing quarterly network scans by an Approved Scanning Vendor (ASV) where applicable; maintaining secure cardholder data environments (CDEs); and immediately reporting suspected data breaches to the relevant acquiring bank and card networks.",
              "Failure to maintain PCI-DSS compliance may result in fines and assessments imposed by card networks and acquiring banks, suspension or termination of payment processing accounts, and mandatory forensic investigations at the merchant's expense. Cybin Enterprises is not liable for fines, assessments, or losses arising from a merchant's failure to maintain PCI-DSS compliance.",
            ],
          },
          {
            title: "CCPA / GDPR — Compliance Acknowledgment",
            content: [
              "Cybin Enterprises processes personal information in compliance with the California Consumer Privacy Act (CCPA/CPRA) and General Data Protection Regulation (GDPR), as detailed in our Privacy Policy. By submitting information through this website, you acknowledge that you have read and understood our Privacy Policy, which is incorporated herein by reference.",
              "Nothing in these Terms limits any rights you have under applicable privacy law. In the event of any conflict between these Terms and our Privacy Policy with respect to personal information, the Privacy Policy shall govern.",
            ],
          },
          {
            title: "Intellectual Property",
            content: [
              "All content on this website — including but not limited to text, graphics, logos, brand marks, images, software code, and the selection and arrangement thereof — is the proprietary property of Cybin Enterprises LLC and is protected by United States and international copyright, trademark, and trade dress laws.",
              "No portion of this website may be reproduced, distributed, publicly displayed, transmitted, or used to create derivative works without the prior express written consent of Cybin Enterprises. Unauthorized use constitutes copyright and trademark infringement and may result in civil and criminal liability.",
              "Nothing in these Terms grants you any right, title, or license in any intellectual property owned or controlled by Cybin Enterprises.",
            ],
          },
          {
            title: "Disclaimer of Warranties",
            content: [
              "THIS WEBSITE AND ALL CONTENT, SERVICES, AND INFORMATION PROVIDED THROUGH IT ARE PROVIDED ON AN 'AS IS' AND 'AS AVAILABLE' BASIS, WITHOUT ANY WARRANTIES OF ANY KIND, EXPRESS, IMPLIED, OR STATUTORY, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, ACCURACY, COMPLETENESS, TIMELINESS, OR UNINTERRUPTED OR ERROR-FREE OPERATION.",
              "CYBIN ENTERPRISES DOES NOT WARRANT THAT: (A) THE WEBSITE WILL MEET YOUR REQUIREMENTS; (B) THE WEBSITE WILL BE UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE; (C) ANY INFORMATION OR CONTENT OBTAINED THROUGH THE WEBSITE WILL BE ACCURATE OR RELIABLE; OR (D) ANY PRELIMINARY ASSESSMENT OR CONSULTATION WILL RESULT IN MERCHANT ACCOUNT APPROVAL. SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF IMPLIED WARRANTIES; THE ABOVE MAY NOT APPLY TO YOU.",
            ],
          },
          {
            title: "Limitation of Liability",
            content: [
              "TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, CYBIN ENTERPRISES LLC AND ITS MEMBERS, OFFICERS, EMPLOYEES, AGENTS, LICENSORS, AND SERVICE PROVIDERS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOST PROFITS, LOST REVENUE, LOSS OF DATA, LOSS OF BUSINESS OPPORTUNITY, LOSS OF GOODWILL, OR COST OF SUBSTITUTE SERVICES, ARISING FROM OR RELATED TO YOUR USE OF OR INABILITY TO USE THIS WEBSITE OR OUR SERVICES, EVEN IF CYBIN ENTERPRISES HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.",
              "IN NO EVENT SHALL CYBIN ENTERPRISES' TOTAL AGGREGATE LIABILITY TO YOU FOR ALL CLAIMS ARISING FROM OR RELATED TO THESE TERMS OR YOUR USE OF THE WEBSITE OR SERVICES EXCEED THE GREATER OF: (A) THE TOTAL FEES ACTUALLY PAID BY YOU TO CYBIN ENTERPRISES IN THE TWELVE (12) CALENDAR MONTHS IMMEDIATELY PRECEDING THE EVENT GIVING RISE TO THE CLAIM; OR (B) ONE HUNDRED DOLLARS ($100.00 USD). This cap applies regardless of the form of action (contract, tort, negligence, strict liability, or otherwise).",
              "THE LIMITATIONS IN THIS SECTION REFLECT A REASONABLE ALLOCATION OF RISK BETWEEN THE PARTIES AND ARE A FUNDAMENTAL ELEMENT OF THE BASIS OF THE BARGAIN BETWEEN YOU AND CYBIN ENTERPRISES.",
            ],
          },
          {
            title: "Indemnification",
            content: [
              "You agree to indemnify, defend (with counsel reasonably acceptable to Cybin Enterprises), and hold harmless Cybin Enterprises LLC and its members, officers, directors, employees, agents, successors, and assigns from and against any and all claims, liabilities, damages, judgments, awards, settlements, losses, costs, and expenses (including reasonable attorneys' fees and court costs) arising out of or relating to: (a) your access to or use of this website; (b) your violation of these Terms; (c) your submission of false, fraudulent, or misleading information; (d) your violation of any applicable law, regulation, or third-party right; (e) your failure to maintain PCI-DSS compliance following account activation; or (f) any actual or alleged infringement or misappropriation of any intellectual property, privacy, or other proprietary right by you or your business.",
              "Cybin Enterprises reserves the right to assume the exclusive defense and control of any matter subject to indemnification by you, at your expense, and you agree to cooperate fully with Cybin Enterprises in asserting any available defenses.",
            ],
          },
          {
            title: "Mandatory Binding Arbitration",
            content: [
              "PLEASE READ THIS SECTION CAREFULLY. IT MATERIALLY AFFECTS YOUR LEGAL RIGHTS, INCLUDING YOUR RIGHT TO FILE A LAWSUIT IN COURT AND YOUR RIGHT TO A JURY TRIAL.",
              "Any and all disputes, controversies, or claims arising out of or relating to these Terms, your use of the Cybin Enterprises website, any application submitted through the website, or any services provided by Cybin Enterprises — including any question of whether a dispute is subject to arbitration — shall be finally resolved by binding arbitration administered by JAMS (Judicial Arbitration and Mediation Services, jamsadr.com) in accordance with its Streamlined Arbitration Rules and Procedures for claims under $250,000, or its Comprehensive Arbitration Rules and Procedures for claims at or above $250,000.",
              "The arbitration shall be conducted by a single neutral arbitrator. The seat of arbitration shall be the Commonwealth of Pennsylvania unless both parties agree otherwise in writing. The language of arbitration shall be English. The arbitrator's award shall be final and binding and may be entered as a judgment in any court of competent jurisdiction.",
              "The following claims are exempt from mandatory arbitration and may be brought in a court of competent jurisdiction: (i) claims for emergency injunctive or other equitable relief to prevent irreparable harm; and (ii) small claims court actions within the jurisdictional limits of applicable small claims courts.",
              "Arbitration Costs: JAMS filing fees shall be allocated pursuant to JAMS rules. Each party shall bear its own attorneys' fees unless the arbitrator determines that a claim or defense was frivolous or raised in bad faith, in which case the arbitrator may award attorneys' fees.",
            ],
          },
          {
            title: "Class Action Waiver",
            content: [
              "TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, YOU AND CYBIN ENTERPRISES EACH WAIVE THE RIGHT TO BRING ANY DISPUTE AS A CLASS ACTION, COLLECTIVE ACTION, CONSOLIDATED ACTION, OR REPRESENTATIVE ACTION. ALL DISPUTES MUST BE BROUGHT IN AN INDIVIDUAL CAPACITY ONLY.",
              "The arbitrator shall have no authority to consolidate claims of different users, conduct any class or representative proceeding, or award relief to any person other than the individual claimant.",
              "If a court of competent jurisdiction finds this class action waiver unenforceable as applied to a particular claim, that claim (and only that claim) shall be severed from arbitration and litigated in court. All other claims shall remain subject to arbitration.",
            ],
          },
          {
            title: "Force Majeure",
            content: [
              "Cybin Enterprises shall not be liable for any delay, failure to perform, or interruption of services resulting, directly or indirectly, from causes beyond our reasonable control, including but not limited to: acts of God; natural disasters; pandemics or public health emergencies; acts of war, terrorism, or civil unrest; government orders or regulatory actions; changes in card network rules (Visa, Mastercard, Discover, Amex) or payment network operating regulations; bank or financial institution failures, closures, or regulatory actions; internet or telecommunications failures; power outages; or failures of third-party technology providers.",
              "In the event of a force majeure event, Cybin Enterprises shall promptly notify affected parties and resume performance as soon as practicable.",
            ],
          },
          {
            title: "Governing Law and Jurisdiction",
            content: [
              "These Terms shall be governed by and construed in accordance with the laws of the Commonwealth of Pennsylvania, without regard to its conflict of law provisions or any choice-of-law principles that would require application of another jurisdiction's laws.",
              "For any disputes not subject to mandatory arbitration under Section 11, the parties irrevocably consent to the exclusive personal jurisdiction and venue of the state and federal courts located in the Commonwealth of Pennsylvania. You waive any objection to the exercise of personal jurisdiction over you by such courts or to venue in such courts.",
            ],
          },
          {
            title: "Severability and Entire Agreement",
            content: [
              "If any provision of these Terms is held by a court or arbitrator of competent jurisdiction to be invalid, illegal, or unenforceable, that provision shall be modified to the minimum extent necessary to make it enforceable, and the remaining provisions shall continue in full force and effect.",
              "These Terms, together with our Privacy Policy and Cookie Policy, constitute the entire agreement between you and Cybin Enterprises with respect to your use of this website and supersede all prior or contemporaneous negotiations, representations, warranties, and agreements, whether written or oral, relating to the same subject matter.",
            ],
          },
          {
            title: "Modifications",
            content: [
              "We reserve the right to modify these Terms at any time. Modified Terms will become effective upon posting to the website with an updated effective date. Your continued use of the website after the posting of modified Terms constitutes your acceptance of the changes. We encourage you to review these Terms periodically.",
            ],
          },
          {
            title: "Contact",
            content: [
              "For questions about these Terms, please contact:",
              "Cybin Enterprises LLC",
              "Email: Customercare@cybinenterprises.com",
              "Office: 888-321-2100 | Mobile: 724-244-7111",
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
      "How Cybin Enterprises uses cookies, localStorage, and tracking technologies. GDPR Article 7 compliant consent and opt-out information.",
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
        effectiveDate="March 7, 2026"
        intro="This Cookie Policy explains how Cybin Enterprises LLC ('we,' 'our,' or 'us') uses cookies, browser localStorage, and similar client-side technologies on cybinenterprises.com. This Policy is designed to satisfy the disclosure requirements of the EU General Data Protection Regulation (GDPR Art. 13), the California Consumer Privacy Act (CCPA), and the ePrivacy Directive (2002/58/EC as amended by 2009/136/EC). By using our website and accepting cookies through our consent banner, you consent to the use of technologies described in this Policy. You may withdraw consent at any time."
        sections={[
          {
            title: "What Are Cookies and Similar Technologies",
            content: [
              "Cookies are small text files stored on your device by a website when you visit it. They serve various purposes including enabling functionality, remembering preferences, and analyzing site usage. Similar technologies include browser localStorage (client-side key-value storage that persists across sessions) and sessionStorage (session-scoped storage cleared when the browser tab closes).",
              "Unlike server-side analytics, the analytics technology used on this website stores data in your browser's localStorage — not in third-party advertising networks or cross-site tracking systems.",
            ],
          },
          {
            title: "Cookies and Technologies We Use",
            content: [
              "We use the following categories of cookies and similar technologies on this website:",
              "STRICTLY NECESSARY (No consent required — Art. 5(3) ePrivacy Directive): These technologies are essential for the website to function and cannot be disabled. They include: (a) cybin-cookie-consent — localStorage key, 12-month retention, stores your cookie consent choice (accepted/declined) so we don't repeatedly ask; (b) cybin-image-settings — localStorage key, indefinite until cleared, stores your image display preferences (if you use the admin tools); (c) cybin-site-settings — localStorage key, indefinite until cleared, stores site display settings applied via admin tools.",
              "ANALYTICS (Consent required — GDPR Art. 6(1)(a)): (a) cybin-page-views — localStorage key, session-persistent, stores aggregate page view counts for site analytics. This data never leaves your browser — it is not transmitted to any third-party analytics platform, advertising network, or data processor. No cross-site tracking, no IP-based profiling, no behavioral fingerprinting.",
              "PREFERENCE (Consent required): (a) cybin-wizard-progress — sessionStorage key, tab session only, stores intake wizard step progress so you can resume if you navigate away. Cleared when the browser tab is closed.",
              "We do NOT use: Google Analytics, Google Tag Manager, Facebook Pixel, Twitter/X Pixel, LinkedIn Insight Tag, HubSpot tracking, Hotjar, FullStory, Segment, Amplitude, or any third-party behavioral tracking or advertising technology.",
            ],
          },
          {
            title: "Browser Fingerprinting Disclosure",
            content: [
              "We do not use browser fingerprinting techniques to identify or track users across websites or sessions. Browser fingerprinting involves collecting technical characteristics of a browser (e.g., user agent, screen resolution, installed fonts, WebGL renderer) to create a probabilistic identifier. We do not employ this technique.",
              "Our analytics are limited to aggregate, device-local page view counting stored in browser localStorage, with no server-side profile building or cross-session user identification.",
            ],
          },
          {
            title: "Legal Basis for Cookie Processing (GDPR)",
            content: [
              "Under GDPR Article 6 and the ePrivacy Directive:",
              "Strictly Necessary cookies: Processed under Art. 6(1)(f) (legitimate interests — enabling website functionality) and exempt from consent requirements under the ePrivacy Directive where processing is strictly necessary for the service explicitly requested.",
              "Analytics and Preference cookies: Processed under Art. 6(1)(a) (consent). You have the right to withdraw consent at any time without affecting the lawfulness of processing based on consent before its withdrawal.",
              "We maintain records of consent as required by GDPR Article 7(1). Consent is obtained through our cookie consent banner, which presents a genuine choice with no dark patterns or pre-ticked boxes.",
            ],
          },
          {
            title: "How to Manage and Withdraw Consent",
            content: [
              "You may manage cookies and withdraw consent through the following methods:",
              "(a) Browser Settings — Managing Cookies: Most browsers allow you to refuse or delete cookies. Instructions by browser: Chrome: Settings > Privacy and Security > Cookies and other site data. Firefox: Settings > Privacy & Security > Cookies and Site Data. Safari: Preferences > Privacy > Manage Website Data. Microsoft Edge: Settings > Privacy, search, and services > Cookies.",
              "(b) Clearing localStorage: In Chrome, press F12 → Application tab → Local Storage → right-click and clear. In Firefox, press F12 → Storage tab → Local Storage → right-click and clear. Clearing localStorage will delete all cybin- prefixed analytics and preference data.",
              "(c) Withdrawing Consent via Banner: Clear your browser's cookies and localStorage, then revisit cybinenterprises.com — the consent banner will reappear, allowing you to change your preference.",
              "(d) Do Not Track (DNT): We respect browser-level Do Not Track signals. When a DNT signal is detected, we disable optional analytics localStorage writes.",
              "Note: Disabling strictly necessary localStorage items (cybin-cookie-consent, cybin-image-settings, cybin-site-settings) may impair core website functionality, including the cookie consent experience itself.",
            ],
          },
          {
            title: "Retention Periods",
            content: [
              "cybin-cookie-consent: 12 months from date of consent. Reconsent is requested annually or upon material changes to this Policy.",
              "cybin-page-views: Retained locally in your browser indefinitely until you clear localStorage or use our data clear function. Never transmitted externally.",
              "cybin-wizard-progress: Session-scoped (sessionStorage). Automatically deleted when the browser tab is closed.",
              "cybin-image-settings / cybin-site-settings: Retained indefinitely until cleared. Used only by admin users who have authenticated through the admin panel.",
            ],
          },
          {
            title: "Third-Party Cookies",
            content: [
              "This website does not load any third-party cookies, tracking pixels, or analytics scripts from external domains. All JavaScript loaded on this site is first-party code served from our own infrastructure.",
              "If you access this site through a link from a third-party platform (e.g., LinkedIn, Google Search), that third party may set its own cookies pursuant to their own privacy policies, which are outside our control.",
            ],
          },
          {
            title: "Changes to This Policy",
            content: [
              "We may update this Cookie Policy to reflect changes in law, regulatory guidance, or our technology. When we make material changes, we will update the effective date and re-display the consent banner where required by law.",
              "The current version of this Policy is always available at cybinenterprises.com/cookie-policy.",
            ],
          },
          {
            title: "Contact",
            content: [
              "For questions about cookies or to exercise your privacy rights:",
              "Email: Customercare@cybinenterprises.com",
              "Subject line: 'Cookie Policy Inquiry'",
              "Office: 888-321-2100",
            ],
          },
        ]}
      />
    </>
  );
}
