import { JsonLd } from "@/components/JsonLd";
import { useSeo } from "@/hooks/useSeo";
import { Link, useParams } from "@/lib/router";
import { AlertTriangle, CheckCircle, ChevronRight } from "lucide-react";
import { useEffect } from "react";

interface IndustryData {
  slug: string;
  title: string;
  metaTitle: string;
  metaDesc: string;
  hero: string;
  heroSub: string;
  painPoints: { title: string; body: string }[];
  benefits: string[];
  faq: { q: string; a: string }[];
  related: { slug: string; label: string }[];
}

const industries: IndustryData[] = [
  {
    slug: "cannabis-cbd",
    title: "Cannabis & CBD Payment Processing",
    metaTitle:
      "Cannabis & CBD Payment Processing | High-Risk Merchant Accounts | Cybin Enterprises",
    metaDesc:
      "Payment processing for hemp-derived CBD, cannabinoid products, and cannabis-adjacent businesses. Cybin Enterprises navigates acquiring complexity for botanical merchants.",
    hero: "Payment Processing for Cannabis & CBD Businesses",
    heroSub:
      "Hemp-derived CBD products, botanical supplements, and cannabis-adjacent businesses face some of the most restrictive payment environments of any industry. Cybin Enterprises works with merchants in this space to identify acquiring options and build long-term processing stability.",
    painPoints: [
      {
        title: "Account Terminations Without Warning",
        body: "CBD and botanical merchants frequently experience abrupt account terminations as payment processors update their internal risk policies. This leaves businesses unable to accept cards overnight. Cybin Enterprises works with acquiring partners who understand the regulatory nuance of hemp-derived products and provides solutions designed for long-term account stability rather than short-term exposure.",
      },
      {
        title: "Difficulty Proving Regulatory Compliance",
        body: "Processors and acquiring banks require documentation proving that CBD products are Farm Bill-compliant (hemp-derived, <0.3% THC) and that the business meets applicable FDA and FTC guidelines. Without properly structured documentation packages, applications are routinely declined. Cybin helps merchants understand what documentation is needed and how to present their business compliantly.",
      },
      {
        title: "High Reserve Requirements and Rolling Reserves",
        body: "Even compliant CBD merchants often face reserve requirements of 5–10% of monthly processing volume held for 90–180 days. Understanding reserve structures, negotiating terms, and planning cash flow around these requirements is critical. Cybin's process addresses reserve expectations upfront so merchants aren't surprised after activation.",
      },
    ],
    benefits: [
      "Farm Bill-compliant processing pathways",
      "Reserve structure transparency",
      "Chargeback monitoring and prevention guidance",
      "Documentation support for underwriting",
      "Long-term account stability focus",
    ],
    faq: [
      {
        q: "Can CBD businesses get payment processing?",
        a: "Yes. Hemp-derived CBD products that comply with the 2018 Farm Bill can obtain payment processing through specialized acquiring partners. Standard processors typically decline these accounts, but specialized options exist through partners like those Cybin works with.",
      },
      {
        q: "Does Cybin Enterprises process CBD payments directly?",
        a: "No. Cybin Enterprises is a payment services intermediary — we connect merchants with appropriate acquiring partners rather than processing payments ourselves. All processing is performed by licensed partner acquiring banks.",
      },
      {
        q: "What documentation does a CBD merchant need for payment processing?",
        a: "Typically: lab test certificates of analysis (COA) showing <0.3% THC, business formation documents, bank statements, processing history if available, and product/website review. Cybin helps merchants understand and prepare this documentation.",
      },
    ],
    related: [
      {
        slug: "nutraceuticals-supplements",
        label: "Nutraceuticals & Supplements",
      },
      {
        slug: "kratom-spores-ethnobotanicals",
        label: "Kratom, Spores & Ethnobotanicals",
      },
      { slug: "e-cigarettes-vaping", label: "E-Cigarettes & Vaping" },
    ],
  },
  {
    slug: "firearms-ammunition",
    title: "Firearms & Ammunition Merchant Accounts",
    metaTitle:
      "Firearms & Ammunition Payment Processing | FFL Merchant Accounts | Cybin Enterprises",
    metaDesc:
      "High-risk merchant accounts for FFL dealers, firearms retailers, and ammunition businesses. Cybin Enterprises provides payment processing solutions for the firearms industry.",
    hero: "Payment Processing for Firearms & Ammunition Businesses",
    heroSub:
      "Licensed firearms dealers and ammunition retailers operate legally under strict federal and state regulations, yet face consistent discrimination from mainstream payment processors. Cybin Enterprises works with FFL dealers and ammo retailers to establish stable, compliant payment infrastructure.",
    painPoints: [
      {
        title: "Processor Discrimination Against Legal Firearms Sales",
        body: "Despite operating under rigorous ATF and FFL licensing requirements, firearms merchants are routinely terminated or declined by major payment processors citing internal policy rather than legal grounds. This creates operational instability for businesses that are among the most heavily regulated in the country. Cybin works with acquiring partners who do not discriminate against federally licensed firearms businesses.",
      },
      {
        title: "Age Verification and Compliance Documentation",
        body: "Processors that do accept firearms accounts typically require documented age verification procedures, FFL license copies, and compliance protocols for online sales. Without a properly structured compliance package, applications are declined regardless of the merchant's legal standing. Cybin helps firearms merchants understand what documentation processors require.",
      },
      {
        title: "Card Network Rules for Firearms Transactions",
        body: "Visa and Mastercard have specific merchant category code (MCC) requirements for firearms retailers, and acquiring banks must comply with card network rules around ammunition and accessories. Understanding these requirements before applying prevents application denials based on technical non-compliance rather than actual business risk.",
      },
    ],
    benefits: [
      "FFL-aware acquiring partners",
      "Compliance documentation guidance",
      "Appropriate MCC classification",
      "Chargeback protection strategies",
      "Stable long-term merchant accounts",
    ],
    faq: [
      {
        q: "Can federally licensed firearms dealers get payment processing?",
        a: "Yes. FFL dealers operating legally under federal and state law can obtain merchant accounts through specialized acquiring partners. Cybin Enterprises works with partners familiar with firearms compliance requirements.",
      },
      {
        q: "What documents does a firearms merchant need to apply?",
        a: "Typically: FFL license copy, state licensing where applicable, processing history, business formation documents, age verification policy documentation, and website review. Cybin helps merchants prepare complete application packages.",
      },
      {
        q: "Does approval guarantee my account won't be terminated later?",
        a: "No. Approval is not guaranteed, and account stability depends on maintaining compliance, chargeback ratios within acceptable thresholds, and adherence to card network rules. Cybin provides ongoing guidance to help merchants maintain account health.",
      },
    ],
    related: [
      { slug: "cannabis-cbd", label: "Cannabis & CBD" },
      { slug: "online-gaming", label: "Online Gaming" },
      { slug: "debt-collection", label: "Debt Collection" },
    ],
  },
  {
    slug: "online-gaming",
    title: "Online Gaming & Fantasy Sports Payment Solutions",
    metaTitle:
      "Online Gaming & Fantasy Sports Payment Processing | Cybin Enterprises",
    metaDesc:
      "Payment solutions for online gaming platforms, fantasy sports, and skill-based gaming businesses. High-risk merchant accounts for the gaming industry.",
    hero: "Payment Processing for Online Gaming & Fantasy Sports",
    heroSub:
      "Online gaming and fantasy sports platforms operate across a complex patchwork of state and federal regulations. Payment processing in this space requires acquiring partners who understand jurisdictional compliance, chargeback patterns, and the evolving legal landscape of skill-based gaming.",
    painPoints: [
      {
        title: "Jurisdictional Complexity and Regulatory Patchwork",
        body: "Online gaming legality varies by state, and federal law (UIGEA) adds another compliance layer. Processors require documented proof that a gaming platform operates only in permissible jurisdictions with appropriate licensing. Navigating this complexity without experienced guidance leads to applications being rejected for regulatory rather than operational reasons.",
      },
      {
        title: "High Chargeback Rates in Gaming",
        body: "Online gaming experiences some of the highest chargeback rates of any industry due to friendly fraud, subscription disputes, and lost transactions. Processors price this risk into reserves and fees, or decline gaming merchants entirely. Cybin's process addresses chargeback management strategies upfront to help merchants demonstrate risk mitigation capability.",
      },
      {
        title: "Account Instability and Sudden Terminations",
        body: "Gaming merchant accounts are frequently shut down without warning as processors update their risk appetites. Building processing redundancy and understanding the triggers for termination are critical for operational continuity. Cybin helps gaming merchants understand what to avoid and how to structure their processing setup for greater long-term stability.",
      },
    ],
    benefits: [
      "Jurisdictional compliance guidance",
      "Chargeback prevention strategy",
      "Multi-processor redundancy options",
      "UIGEA-aware acquiring pathways",
      "Account stability focus",
    ],
    faq: [
      {
        q: "Can online gaming companies get merchant accounts?",
        a: "Skill-based gaming platforms and fantasy sports operators in permissible jurisdictions can obtain merchant accounts through specialized acquirers. Cybin works with gaming merchants on a case-by-case basis.",
      },
      {
        q: "Does Cybin process gambling transactions?",
        a: "Cybin Enterprises is a payment intermediary, not a processor. We connect merchants with appropriate acquiring partners. The availability of acquiring solutions depends on the specific gaming model and jurisdiction.",
      },
    ],
    related: [
      { slug: "subscription-businesses", label: "Subscription Businesses" },
      { slug: "firearms-ammunition", label: "Firearms & Ammunition" },
      { slug: "travel-timeshare", label: "Travel & Timeshare" },
    ],
  },
  {
    slug: "nutraceuticals-supplements",
    title: "Nutraceuticals & Supplements Payment Processing",
    metaTitle:
      "Nutraceuticals & Supplements Payment Processing | High-Risk Merchant Accounts | Cybin Enterprises",
    metaDesc:
      "High-risk merchant accounts for dietary supplement, nutraceutical, and wellness product businesses. Cybin Enterprises provides payment solutions for the supplements industry.",
    hero: "Payment Processing for Nutraceuticals & Supplements Businesses",
    heroSub:
      "Dietary supplements, vitamins, nootropics, and wellness products face intense scrutiny from payment processors due to chargeback risk, subscription model complexity, and FTC marketing claim regulations. Cybin Enterprises helps nutraceutical merchants navigate these challenges and access stable payment processing.",
    painPoints: [
      {
        title: "Chargeback Risk and Subscription Model Scrutiny",
        body: "Supplement businesses using subscription or auto-ship models carry elevated chargeback risk in the eyes of processors. FTC Negative Option Rule requirements (significantly expanded in 2023) mandate clear disclosure, affirmative consent, and easy cancellation. Non-compliance triggers both chargebacks and potential regulatory action. Cybin helps merchants understand these requirements before applying for processing.",
      },
      {
        title: "FTC Health Claims and Marketing Compliance",
        body: "Processors routinely review supplement merchant websites for FTC-prohibited disease claims and unsupported efficacy statements. Merchant accounts are declined or terminated when websites contain non-compliant language. Ensuring marketing materials align with FTC guidelines is a prerequisite for sustained payment processing in this space.",
      },
      {
        title: "Rolling Reserves and High Fees",
        body: "Supplement merchants routinely face rolling reserves of 5–15% and discount rates significantly above industry average due to category risk classification. Understanding reserve structures and negotiating where possible requires knowledge of what acquirers expect in this vertical.",
      },
    ],
    benefits: [
      "FTC compliance awareness",
      "Subscription billing expertise",
      "Reserve structure transparency",
      "Chargeback mitigation guidance",
      "Long-term account stability",
    ],
    faq: [
      {
        q: "Can supplement companies get stable merchant accounts?",
        a: "Yes. Supplement merchants who maintain FTC-compliant marketing, implement proper subscription billing disclosures, and actively manage chargebacks can obtain and maintain merchant accounts through specialized acquiring partners.",
      },
      {
        q: "What chargeback ratio is acceptable for supplement processing?",
        a: "Visa and Mastercard standard chargeback thresholds are 1.0% (Mastercard) and approximately 0.9% (Visa standard) of transactions. Supplement merchants must actively work to stay below these thresholds to maintain account standing.",
      },
    ],
    related: [
      { slug: "cannabis-cbd", label: "Cannabis & CBD" },
      {
        slug: "kratom-spores-ethnobotanicals",
        label: "Kratom, Spores & Ethnobotanicals",
      },
      { slug: "subscription-businesses", label: "Subscription Businesses" },
    ],
  },
  {
    slug: "kratom-spores-ethnobotanicals",
    title: "Kratom, Spores & Ethnobotanicals Merchant Accounts",
    metaTitle:
      "Kratom & Ethnobotanical Payment Processing | Merchant Accounts | Cybin Enterprises",
    metaDesc:
      "Merchant accounts for kratom vendors, mushroom spore suppliers, and ethnobotanical businesses. Cybin Enterprises provides high-risk payment solutions for botanical merchants.",
    hero: "Payment Processing for Kratom, Spores & Ethnobotanical Businesses",
    heroSub:
      "Kratom vendors, mushroom spore suppliers, and ethnobotanical businesses operate in one of the most payment-processing-restrictive segments of the botanical market. Legal at the federal level (with state-by-state variation), these merchants are routinely denied by mainstream processors. Cybin works with merchants in this space who operate within applicable legal frameworks.",
    painPoints: [
      {
        title: "Mainstream Processor Blanket Bans",
        body: "Most major payment processors maintain blanket prohibitions on kratom and related botanical products regardless of federal legality. This forces merchants into a very narrow pool of acquiring options, typically at higher rates and with more restrictive terms. Cybin focuses on identifying acquiring partners that evaluate these merchants on their actual risk profile rather than broad category bans.",
      },
      {
        title: "State-Level Legality Complexity",
        body: "Kratom and certain botanical products are restricted or banned in specific states (Alabama, Arkansas, Indiana, Rhode Island, Vermont, Wisconsin at the federal level as of 2026). Payment processors require documented geographic restriction systems to prevent sales to prohibited jurisdictions. Without these controls, merchants cannot obtain or retain merchant accounts.",
      },
      {
        title: "High Chargeback Exposure and Reserve Requirements",
        body: "Botanical product merchants face elevated chargebacks from customers who dispute recurring charges or claim non-delivery. Combined with the category's risk classification, this results in significant rolling reserves and high processing fees. Understanding reserve expectations before signing agreements helps merchants plan cash flow appropriately.",
      },
    ],
    benefits: [
      "Botanical category expertise",
      "Geographic restriction compliance guidance",
      "Reserve structure transparency",
      "Chargeback management support",
      "Long-term processing stability",
    ],
    faq: [
      {
        q: "Is kratom legal to sell and process payments for?",
        a: "Kratom is legal at the federal level in the United States (as of 2026) but restricted in several states. Merchants must implement geographic restrictions preventing sales to prohibited jurisdictions. Cybin helps merchants understand compliance requirements for payment processing purposes.",
      },
      {
        q: "Can mushroom spore businesses get merchant accounts?",
        a: "Mushroom spore businesses selling for legal purposes (microscopy, research) can obtain merchant accounts through specialized acquirers. The legality of end-use is a merchant's responsibility, and processors require documented compliance practices.",
      },
    ],
    related: [
      { slug: "cannabis-cbd", label: "Cannabis & CBD" },
      {
        slug: "nutraceuticals-supplements",
        label: "Nutraceuticals & Supplements",
      },
      { slug: "e-cigarettes-vaping", label: "E-Cigarettes & Vaping" },
    ],
  },
  {
    slug: "telemedicine-healthcare",
    title: "Telemedicine & Healthcare Payment Processing",
    metaTitle:
      "Telemedicine & Healthcare Payment Processing | High-Risk Merchant Accounts | Cybin Enterprises",
    metaDesc:
      "Payment processing solutions for telemedicine platforms, digital health, and healthcare service providers. Cybin Enterprises provides HIPAA-aware high-risk merchant accounts.",
    hero: "Payment Processing for Telemedicine & Healthcare Businesses",
    heroSub:
      "Telehealth platforms, remote patient monitoring services, and digital health businesses combine healthcare regulatory complexity with the payment processing challenges of high-volume, recurring-billing models. Cybin Enterprises helps healthcare businesses access payment infrastructure designed for their unique compliance environment.",
    painPoints: [
      {
        title: "HIPAA-Aware Payment Infrastructure Requirements",
        body: "Healthcare payment processing involves protected health information (PHI), creating HIPAA Business Associate Agreement (BAA) requirements with payment processors. Many processors are unwilling to enter BAAs with telehealth clients. Ensuring your payment flow does not involve unnecessary PHI transmission reduces both compliance risk and processor reluctance.",
      },
      {
        title: "Insurance vs. Direct-Pay Processing Complexity",
        body: "Telehealth merchants accepting both insurance reimbursement and direct patient payments operate dual billing environments with different compliance requirements. Direct-pay channels using card processing must comply with card network rules while insurance channels follow payer-specific EDI requirements. Structuring these channels correctly from the start prevents compliance issues.",
      },
      {
        title: "Subscription and Membership Model Compliance",
        body: "Many telehealth platforms offer subscription-based care models or membership programs. These recurring billing structures face strict FTC Negative Option Rule requirements and potential state health insurance regulatory scrutiny depending on what services are bundled. Processors evaluate the full business model, not just the payment mechanism.",
      },
    ],
    benefits: [
      "HIPAA-aware payment pathway guidance",
      "BAA requirement navigation",
      "Subscription billing compliance",
      "Healthcare-specific acquiring expertise",
      "Ongoing account stability support",
    ],
    faq: [
      {
        q: "Can telemedicine companies get merchant accounts?",
        a: "Yes. Telemedicine platforms can obtain merchant accounts, though the process requires demonstrating HIPAA compliance practices and, in some cases, obtaining Business Associate Agreements from payment processors. Cybin helps healthcare businesses navigate this process.",
      },
      {
        q: "Does Cybin handle HIPAA compliance for healthcare merchants?",
        a: "Cybin Enterprises is a payment intermediary, not a HIPAA compliance consultant. We help merchants understand what payment processors require and connect them with appropriate acquiring partners. Healthcare merchants are responsible for their own HIPAA compliance.",
      },
    ],
    related: [
      { slug: "subscription-businesses", label: "Subscription Businesses" },
      {
        slug: "nutraceuticals-supplements",
        label: "Nutraceuticals & Supplements",
      },
      { slug: "cannabis-cbd", label: "Cannabis & CBD" },
    ],
  },
  {
    slug: "e-cigarettes-vaping",
    title: "E-Cigarettes & Vaping Merchant Accounts",
    metaTitle:
      "E-Cigarettes & Vaping Payment Processing | Merchant Accounts | Cybin Enterprises",
    metaDesc:
      "High-risk merchant accounts for e-cigarette retailers, vape shops, and vapor product businesses. Cybin Enterprises provides payment processing for the vaping industry.",
    hero: "Payment Processing for E-Cigarette & Vaping Businesses",
    heroSub:
      "E-cigarette and vaping businesses face a converging set of payment processing challenges: FDA regulatory scrutiny, age verification requirements, card network restrictions, and state-level flavor/product bans. Cybin Enterprises works with compliant vape merchants to identify stable payment solutions.",
    painPoints: [
      {
        title: "FDA PMTA Compliance and Product Restrictions",
        body: "The FDA's Premarket Tobacco Application (PMTA) process has significantly narrowed the range of legally marketable vapor products. Processors require documentation that products being sold have obtained PMTA authorization or fall within applicable exemptions. Without current FDA compliance documentation, applications are routinely rejected.",
      },
      {
        title: "Age Verification System Requirements",
        body: "Federal law (PACT Act) requires age verification for online tobacco and vaping sales. Payment processors require documented, functional age verification systems before approving merchant accounts for vape online retailers. Implementing compliant age-gating is a prerequisite for obtaining processing in this category.",
      },
      {
        title: "State-Level Flavor Bans and Geographic Compliance",
        body: "Multiple states have enacted flavor bans affecting specific vapor products. Payment processors expect merchants to have systems restricting sales of prohibited products to restricted jurisdictions. Geographic compliance systems are increasingly required as part of underwriting review.",
      },
    ],
    benefits: [
      "Age verification compliance guidance",
      "FDA/PMTA documentation support",
      "Geographic restriction compliance",
      "PACT Act compliance navigation",
      "Long-term account stability",
    ],
    faq: [
      {
        q: "Can vape shops and online vape retailers get payment processing?",
        a: "Yes. Vaping businesses that comply with FDA PMTA requirements, implement PACT Act-compliant age verification, and adhere to applicable state regulations can obtain merchant accounts through specialized acquiring partners.",
      },
      {
        q: "What is the PACT Act and how does it affect payment processing?",
        a: "The Prevent All Cigarette Trafficking (PACT Act) requires age verification for online tobacco and vaping sales and imposes specific shipping and reporting requirements. Payment processors use PACT Act compliance as part of their underwriting review for vaping merchants.",
      },
    ],
    related: [
      { slug: "cannabis-cbd", label: "Cannabis & CBD" },
      {
        slug: "kratom-spores-ethnobotanicals",
        label: "Kratom & Ethnobotanicals",
      },
      {
        slug: "nutraceuticals-supplements",
        label: "Nutraceuticals & Supplements",
      },
    ],
  },
  {
    slug: "debt-collection",
    title: "Debt Collection Payment Processing",
    metaTitle:
      "Debt Collection Payment Processing | High-Risk Merchant Accounts | Cybin Enterprises",
    metaDesc:
      "High-risk merchant accounts for debt collection agencies, credit counseling, and accounts receivable businesses. Cybin Enterprises provides payment solutions for the collections industry.",
    hero: "Payment Processing for Debt Collection Businesses",
    heroSub:
      "Debt collection agencies and accounts receivable businesses operate under strict FDCPA and CFPB regulatory frameworks while simultaneously facing near-universal payment processor avoidance. Cybin Enterprises works with compliant collection agencies to identify acquiring solutions.",
    painPoints: [
      {
        title: "Near-Universal Processor Avoidance",
        body: "Debt collection is one of the most declined merchant categories across mainstream processors. The combination of CFPB regulatory scrutiny, FDCPA compliance requirements, and historically elevated chargeback rates results in most acquiring banks refusing the category entirely. Cybin focuses on identifying the specific acquiring partners that evaluate debt collection merchants individually.",
      },
      {
        title: "FDCPA and CFPB Compliance Documentation",
        body: "Processors that do accept collection merchants require documented FDCPA compliance practices, CFPB registration where required, state licensing copies, and dispute handling procedures. Without this documentation, applications are rejected regardless of the agency's actual compliance posture. Cybin helps merchants understand what documentation processors require.",
      },
      {
        title: "Chargeback Risk from Debtors",
        body: "Collection payments face elevated chargeback rates from consumers who dispute the underlying debt. Processors price this risk heavily, typically requiring rolling reserves of 10–15% and elevated processing rates. Understanding and planning for these terms before signing agreements is essential.",
      },
    ],
    benefits: [
      "Collections-aware acquiring partners",
      "FDCPA/CFPB documentation guidance",
      "Reserve structure transparency",
      "Chargeback mitigation strategies",
      "State licensing compliance navigation",
    ],
    faq: [
      {
        q: "Can debt collection agencies get merchant accounts?",
        a: "Yes. Licensed, FDCPA-compliant collection agencies can obtain merchant accounts through specialized acquiring partners. The process requires comprehensive compliance documentation and acceptance of higher reserves and fees.",
      },
      {
        q: "What FDCPA compliance does a collector need to show processors?",
        a: "Processors typically require FDCPA compliance policies, documentation of dispute handling procedures, applicable state debt collector licenses, and CFPB registration confirmation. Cybin helps merchants compile and present this documentation.",
      },
    ],
    related: [
      { slug: "travel-timeshare", label: "Travel & Timeshare" },
      { slug: "subscription-businesses", label: "Subscription Businesses" },
      { slug: "firearms-ammunition", label: "Firearms & Ammunition" },
    ],
  },
  {
    slug: "subscription-businesses",
    title: "Subscription Business Merchant Accounts",
    metaTitle:
      "Subscription Business Payment Processing | Recurring Billing Merchant Accounts | Cybin Enterprises",
    metaDesc:
      "Merchant accounts for subscription businesses and recurring billing models. Cybin Enterprises provides payment solutions for subscription box, SaaS, and membership businesses.",
    hero: "Payment Processing for Subscription & Recurring Billing Businesses",
    heroSub:
      "Subscription and recurring billing businesses generate predictable revenue but face some of the most complex chargeback patterns and compliance requirements in payment processing. Cybin Enterprises helps subscription merchants build billing infrastructure that reduces disputes and maintains account stability.",
    painPoints: [
      {
        title: "FTC Negative Option Rule Compliance (Updated 2023)",
        body: "The FTC's significantly expanded Negative Option Rule (effective 2023) requires subscription businesses to provide clear and conspicuous pre-enrollment disclosure of all material terms, obtain separate affirmative express informed consent, and provide simple cancellation mechanisms that work as easily as enrollment. Non-compliance is grounds for both payment processor termination and FTC enforcement action.",
      },
      {
        title: "Chargeback Patterns from Subscription Billing",
        body: "Subscription chargebacks fall into two primary categories: unauthorized transaction disputes (consumer doesn't recognize the charge) and cancellation disputes (consumer requested cancellation and was still charged). Both are preventable with proper billing descriptor clarity, cancellation confirmation systems, and proactive customer communication. Processors evaluate how merchants manage these patterns.",
      },
      {
        title: "Card Updater Services and Failed Payment Management",
        body: "Subscription merchants lose significant revenue to card expiration and account number changes. Card updater services (Visa Account Updater, Mastercard Automatic Billing Updater) automatically update stored payment credentials, reducing involuntary churn. Implementing these services is now expected by sophisticated acquiring partners.",
      },
    ],
    benefits: [
      "FTC Negative Option Rule compliance guidance",
      "Chargeback prevention for recurring billing",
      "Card updater service access",
      "Billing descriptor optimization",
      "Long-term account stability",
    ],
    faq: [
      {
        q: "What chargeback rate triggers problems for subscription businesses?",
        a: "Visa and Mastercard standard thresholds are around 0.9–1.0% of transactions. Subscription businesses with poor cancellation practices routinely exceed these thresholds, triggering processor monitoring programs and potential termination.",
      },
      {
        q: "Does Cybin help with subscription billing setup?",
        a: "Cybin Enterprises helps merchants understand what acquiring partners require from subscription businesses and connects them with appropriate payment infrastructure. We are not a billing software provider.",
      },
    ],
    related: [
      {
        slug: "nutraceuticals-supplements",
        label: "Nutraceuticals & Supplements",
      },
      { slug: "telemedicine-healthcare", label: "Telemedicine & Healthcare" },
      { slug: "online-gaming", label: "Online Gaming" },
    ],
  },
  {
    slug: "travel-timeshare",
    title: "Travel & Timeshare Payment Processing",
    metaTitle:
      "Travel & Timeshare Payment Processing | High-Risk Merchant Accounts | Cybin Enterprises",
    metaDesc:
      "High-risk merchant accounts for travel agencies, timeshare companies, and vacation club businesses. Cybin Enterprises provides payment solutions for the travel industry.",
    hero: "Payment Processing for Travel & Timeshare Businesses",
    heroSub:
      "Travel agencies and timeshare businesses face extended fulfillment windows that create unique chargeback exposure — consumers can dispute transactions months after booking. Combined with FTC marketing regulations for vacation clubs, this creates a complex underwriting environment that requires specialized payment solutions.",
    painPoints: [
      {
        title: "Extended Fulfillment Period Chargeback Exposure",
        body: "Travel and timeshare transactions can be disputed months after the original charge, far exceeding standard chargeback windows. Processors account for this extended exposure through higher reserves and careful review of fulfillment policies. Understanding how to structure booking terms and refund policies to minimize chargeback exposure is critical for account stability.",
      },
      {
        title: "FTC Enforcement in the Vacation Club Sector",
        body: "Timeshare and vacation club businesses have been subject to significant FTC enforcement actions related to deceptive marketing, high-pressure sales tactics, and non-compliant cancellation policies. Payment processors conduct extensive due diligence on timeshare merchants, requiring compliant sales and cancellation documentation.",
      },
      {
        title: "Reserve Requirements and Delayed Settlement",
        body: "Travel merchants often face reserve requirements that match or exceed their estimated chargeback exposure window — sometimes 180-day rolling reserves. Planning cash flow around these requirements while maintaining operations requires clear understanding of reserve terms before signing processing agreements.",
      },
    ],
    benefits: [
      "Extended fulfillment chargeback management",
      "FTC-compliant marketing guidance",
      "Reserve structure transparency",
      "Travel-aware acquiring partners",
      "Long-term account stability",
    ],
    faq: [
      {
        q: "Can travel agencies get merchant accounts?",
        a: "Yes. Travel agencies and tour operators can obtain merchant accounts, though the extended fulfillment window increases reserve requirements. Compliant operations with clear refund policies and low chargeback history have the best outcomes.",
      },
      {
        q: "What about timeshare exit companies?",
        a: "Timeshare exit and cancellation services face additional processor scrutiny due to FTC actions in this sector. Cybin evaluates these merchants on a case-by-case basis based on their specific business model and compliance posture.",
      },
    ],
    related: [
      { slug: "subscription-businesses", label: "Subscription Businesses" },
      { slug: "debt-collection", label: "Debt Collection" },
      { slug: "online-gaming", label: "Online Gaming" },
    ],
  },
];

export default function IndustryLandingPage() {
  const { slug } = useParams<{ slug: string }>();
  const industry = industries.find((i) => i.slug === slug);

  // biome-ignore lint/correctness/useExhaustiveDependencies: re-run on slug change to animate new content
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
  }, [slug]);

  // Scroll to top on slug change
  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll on slug change intentional
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [slug]);

  // Call hooks unconditionally
  useSeo(
    industry
      ? {
          title: industry.metaTitle,
          description: industry.metaDesc,
          canonical: `/industries/${industry.slug}`,
        }
      : {
          title: "Industry Not Found | Cybin Enterprises",
          description: "This industry page was not found.",
          canonical: "/industries",
        },
  );

  if (!industry) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center"
        style={{ backgroundColor: "#0a0f1e" }}
      >
        <h1 className="text-2xl font-bold mb-4" style={{ color: "#e8edf8" }}>
          Industry Not Found
        </h1>
        <Link to="/industries" className="cybin-btn-primary">
          Browse All Industries
        </Link>
      </div>
    );
  }

  return (
    <div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: industry.title,
          description: industry.metaDesc,
          publisher: {
            "@type": "Organization",
            name: "Cybin Enterprises",
            url: "https://cybinenterprises.com",
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `https://cybinenterprises.com/industries/${industry.slug}`,
          },
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl animate-fade-up">
            <div
              className="flex items-center gap-2 mb-4"
              style={{ flexWrap: "wrap" }}
            >
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
                to="/industries"
                className="text-sm"
                style={{ color: "rgba(232,237,248,0.45)" }}
              >
                Industries
              </Link>
              <ChevronRight
                size={14}
                style={{ color: "rgba(232,237,248,0.3)" }}
              />
              <span className="text-sm" style={{ color: "#00d4b8" }}>
                {industry.title}
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
              {industry.hero}
            </h1>
            <p
              className="text-lg mb-6"
              style={{ color: "rgba(232,237,248,0.65)", lineHeight: 1.7 }}
            >
              {industry.heroSub}
            </p>
            <div
              className="flex items-start gap-3 p-4 rounded-xl mb-6"
              style={{
                backgroundColor: "rgba(255,193,7,0.05)",
                border: "1px solid rgba(255,193,7,0.2)",
              }}
            >
              <AlertTriangle
                size={16}
                style={{ color: "#ffc107", flexShrink: 0, marginTop: 2 }}
              />
              <p
                className="text-xs leading-relaxed"
                style={{ color: "rgba(232,237,248,0.6)" }}
              >
                Cybin Enterprises is a payment services intermediary — not a
                bank, processor, or acquirer. We connect merchants with
                appropriate acquiring partners. Approval is not guaranteed. Each
                merchant is responsible for their own regulatory compliance.
                Results vary by business model, processing history, and
                underwriting criteria.
              </p>
            </div>
            <Link
              to="/apply"
              data-ocid="industry.hero.primary_button"
              className="cybin-btn-primary"
            >
              Start Your Approval Process
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section style={{ backgroundColor: "#0a0f1e", padding: "72px 0" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-up">
            <span
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: "#00d4b8" }}
            >
              Common Challenges
            </span>
            <h2
              className="text-3xl font-bold mt-3"
              style={{
                fontFamily: "Sora, system-ui, sans-serif",
                color: "#e8edf8",
              }}
            >
              Why Payment Processing Is Difficult in This Space
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {industry.painPoints.map((pp, idx) => (
              <div
                key={pp.title}
                data-ocid={`industry.pain_point.item.${idx + 1}`}
                className="animate-fade-up"
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "16px",
                  padding: "24px",
                }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: "rgba(110,247,212,0.1)" }}
                >
                  <span style={{ color: "#00d4b8", fontWeight: 700 }}>
                    {idx + 1}
                  </span>
                </div>
                <h3
                  className="text-base font-bold mb-3"
                  style={{ fontFamily: "Sora, sans-serif", color: "#e8edf8" }}
                >
                  {pp.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "rgba(232,237,248,0.6)" }}
                >
                  {pp.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section style={{ backgroundColor: "#0c1020", padding: "64px 0" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-up">
          <h2
            className="text-2xl font-bold mb-8"
            style={{
              fontFamily: "Sora, system-ui, sans-serif",
              color: "#e8edf8",
            }}
          >
            How Cybin Can Help
          </h2>
          <div className="flex flex-col gap-3 text-left">
            {industry.benefits.map((b) => (
              <div key={b} className="flex items-center gap-3">
                <CheckCircle
                  size={16}
                  style={{ color: "#00d4b8", flexShrink: 0 }}
                />
                <span
                  className="text-sm"
                  style={{ color: "rgba(232,237,248,0.8)" }}
                >
                  {b}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link
              to="/apply"
              data-ocid="industry.benefits.cta.button"
              className="cybin-btn-primary"
            >
              Get Started
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ backgroundColor: "#0a0f1e", padding: "64px 0" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-2xl font-bold mb-8 text-center animate-fade-up"
            style={{
              fontFamily: "Sora, system-ui, sans-serif",
              color: "#e8edf8",
            }}
          >
            Frequently Asked Questions
          </h2>
          <div className="flex flex-col gap-4">
            {industry.faq.map((item, idx) => (
              <div
                key={item.q}
                data-ocid={`industry.faq.item.${idx + 1}`}
                className="animate-fade-up"
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "12px",
                  padding: "20px",
                }}
              >
                <h3
                  className="text-sm font-bold mb-2"
                  style={{ fontFamily: "Sora, sans-serif", color: "#e8edf8" }}
                >
                  {item.q}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "rgba(232,237,248,0.6)" }}
                >
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Industries */}
      <section style={{ backgroundColor: "#0c1020", padding: "64px 0" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-2xl font-bold mb-8 text-center animate-fade-up"
            style={{
              fontFamily: "Sora, system-ui, sans-serif",
              color: "#e8edf8",
            }}
          >
            Related Industries
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {industry.related.map((r, idx) => (
              <Link
                key={r.slug}
                to={`/industries/${r.slug}`}
                data-ocid={`industry.related.item.${idx + 1}`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all"
                style={{
                  backgroundColor: "rgba(110,247,212,0.06)",
                  border: "1px solid rgba(110,247,212,0.2)",
                  color: "#e8edf8",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(110,247,212,0.12)";
                  e.currentTarget.style.borderColor = "rgba(110,247,212,0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(110,247,212,0.06)";
                  e.currentTarget.style.borderColor = "rgba(110,247,212,0.2)";
                }}
              >
                {r.label}
                <ChevronRight size={14} style={{ color: "#00d4b8" }} />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
