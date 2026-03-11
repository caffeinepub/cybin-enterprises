import { JsonLd } from "@/components/JsonLd";
import { LegalPageTemplate } from "@/components/pages/LegalPage";
import { useSeo } from "@/hooks/useSeo";

export default function DoNotSellPage() {
  useSeo({
    title: "Do Not Sell or Share My Personal Information | Cybin Enterprises",
    description:
      "Exercise your California CCPA/CPRA right to opt-out of the sale or sharing of your personal information. Cybin Enterprises does not sell or share personal data for behavioral advertising.",
    canonical: "/do-not-sell",
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
              name: "Do Not Sell My Info",
              item: "https://cybinenterprises.com/do-not-sell",
            },
          ],
        }}
      />
      <LegalPageTemplate
        title="Do Not Sell or Share My Personal Information"
        breadcrumb="Do Not Sell My Info"
        effectiveDate="March 9, 2026"
        intro="This page is provided in compliance with the California Consumer Privacy Act (CCPA), as amended by the California Privacy Rights Act (CPRA) (Cal. Civ. Code § 1798.100 et seq.), and specifically to satisfy the requirement under § 1798.135 to provide a clear and conspicuous link for consumers to opt out of the sale or sharing of their personal information. As stated herein, Cybin Enterprises does not sell or share personal information as defined under California law. You may nonetheless submit a request for the record, and we will acknowledge and honor it."
        sections={[
          {
            title: "Your California Privacy Rights",
            content: [
              "Under California Civil Code § 1798.120, California residents have the right to opt out of the sale of their personal information to third parties, and under § 1798.135(a)(4) (as amended by CPRA), the right to opt out of the sharing of personal information for cross-context behavioral advertising.",
              "Cybin Enterprises does NOT sell your personal information to third parties, as 'sell' is defined under CCPA § 1798.140(ad). We do not receive money, goods, services, or other valuable consideration in exchange for disclosing your personal information to third parties for their commercial purposes.",
              "Cybin Enterprises does NOT share your personal information for cross-context behavioral advertising, as 'share' is defined under CCPA § 1798.140(ah). We do not disclose your personal information to third parties for the purpose of cross-context behavioral advertising, whether or not for monetary or other valuable consideration.",
              "This right is therefore satisfied as a matter of our standard privacy practice. However, if you are a California resident and wish to submit a formal opt-out request for your records, you may do so using the contact information below. We will acknowledge your request within 10 business days.",
            ],
          },
          {
            title: 'What "Sale" and "Sharing" Mean Under California Law',
            content: [
              "Under CCPA § 1798.140(ad), 'sale' means selling, renting, releasing, disclosing, disseminating, making available, transferring, or otherwise communicating orally, in writing, or by electronic or other means, a consumer's personal information by the business to a third party for monetary or other valuable consideration.",
              "Under CCPA § 1798.140(ah) (as amended by CPRA), 'sharing' means sharing, renting, releasing, disclosing, disseminating, making available, transferring, or otherwise communicating orally, in writing, or by electronic or other means, a consumer's personal information by the business to a third party for cross-context behavioral advertising, whether or not for monetary or other valuable consideration, including transactions between a business and a third party for a business purpose.",
              "Neither of these activities occurs at Cybin Enterprises.",
            ],
          },
          {
            title: "Our Data Practices",
            content: [
              "We do not use third-party advertising networks, behavioral trackers, advertising pixels, or data brokers on this website.",
              "We do not share consumer personal information with social media platforms for advertising or re-targeting purposes.",
              "Our on-site analytics are privacy-first, device-local, and do not transmit data to any third party. No cross-site tracking, no IP-based profiling, no behavioral fingerprinting.",
              "Personal information submitted through our intake forms is used solely to evaluate merchant applications, facilitate payment processing introductions, and comply with AML/KYC legal obligations. It is not sold, shared, or used for advertising.",
            ],
          },
          {
            title: "How to Submit an Opt-Out Request",
            content: [
              "If you are a California resident and wish to submit a formal opt-out request, please use the following method:",
              "Email: Customercare@cybinenterprises.com",
              'Subject line: "CCPA Opt-Out Request"',
              "Include in your request: your full name, email address associated with any prior submissions to our website, and a statement that you are exercising your right to opt-out under CCPA § 1798.120.",
              "We will acknowledge receipt of your request within 10 business days of receiving it. We will not discriminate against you for exercising this right. We will not deny you goods or services, charge different prices, provide a different level of service, or suggest that you will receive a different price or quality of service because you exercised this right (§ 1798.125).",
            ],
          },
          {
            title: "Global Privacy Control (GPC)",
            content: [
              "Cybin Enterprises honors Global Privacy Control (GPC) browser signals. GPC is a technical specification that allows users to signal their opt-out preference for the sale or sharing of personal information through browser-level settings.",
              "When a GPC signal is detected, we treat it as a valid opt-out request under CCPA § 1798.135(d) and disable any optional analytics data writes for that session.",
              "To enable GPC in your browser, you may use compatible browsers or extensions such as the GPC extension for Chrome or Firefox. More information is available at globalprivacycontrol.org.",
            ],
          },
          {
            title: "Authorized Agent",
            content: [
              "An authorized agent may submit an opt-out request on behalf of a California consumer. To submit a request through an authorized agent, the agent must:",
              "(a) Provide written authorization signed by the consumer authorizing the agent to act on their behalf; or",
              "(b) For an agent with a power of attorney pursuant to California Probate Code § 4000 to § 4465, provide evidence of that power of attorney.",
              "We may deny a request from an agent that does not submit proof that they have been authorized to act on the consumer's behalf.",
              'Submit authorized agent requests to: Customercare@cybinenterprises.com with the subject line "CCPA Authorized Agent Opt-Out".',
            ],
          },
          {
            title: "Contact Information",
            content: [
              "For questions about this page, your California privacy rights, or to submit an opt-out request:",
              "Cybin Enterprises LLC",
              "Email: Customercare@cybinenterprises.com",
              "888-321-2100",
              "We are available to respond to privacy inquiries Monday through Friday during normal business hours.",
            ],
          },
        ]}
      />
    </>
  );
}
