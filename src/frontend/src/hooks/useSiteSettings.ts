/**
 * useSiteSettings — localStorage-backed store for all editable site content.
 * Covers text content, colors, contact info, hero content, section visibility.
 * Changes are broadcast via CustomEvent so all consumers update instantly.
 */

export const SITE_SETTINGS_EVENT = "cybin-site-settings-changed";
const STORAGE_KEY = "cybin-site-settings";

export interface ContactInfo {
  phone1: string;
  phone1Label: string;
  phone2: string;
  phone2Label: string;
  email: string;
}

export interface HeroContent {
  headline: string;
  subheadline: string;
  body: string;
  primaryCta: string;
  secondaryCta: string;
}

export interface AboutContent {
  missionTitle: string;
  missionBody: string;
  foundersSectionTitle: string;
  foundersSectionSubtitle: string;
  melName: string;
  melTitle: string;
  melBio1: string;
  melBio2: string;
  shaneName: string;
  shaneTitle: string;
  shaneBio1: string;
  shaneBio2: string;
}

export interface ColorTheme {
  accentTeal: string;
  accentPurple: string;
  accentGold: string;
  bgPrimary: string;
  bgSecondary: string;
  textPrimary: string;
  textMuted: string;
}

export interface SiteSettings {
  contact: ContactInfo;
  hero: HeroContent;
  about: AboutContent;
  colors: ColorTheme;
}

export const SITE_DEFAULTS: SiteSettings = {
  contact: {
    phone1: "",
    phone1Label: "",
    phone2: "888-321-2100",
    phone2Label: "O",
    email: "Customercare@CybinEnterprises.com",
  },
  hero: {
    headline:
      "Trusted Payment Solutions for High-Risk and Hard-to-Place Businesses",
    subheadline:
      "Domestic and international payment solutions designed for businesses that need stability, flexibility, and long-term reliability.",
    body: "Cybin Enterprises helps businesses access the right payment setup, prepare for approval, and maintain long-term processing stability.",
    primaryCta: "Start Your Approval Process",
    secondaryCta: "Explore Payment Solutions",
  },
  about: {
    missionTitle: "Our Mission",
    missionBody:
      "Cybin Enterprises was created to bring clarity and stability to businesses that struggle to find reliable payment solutions. Led by experienced professionals across regulated industries, Cybin Enterprises helps businesses access payment infrastructure designed for long-term success. Together, our founders share a mission: to make payment infrastructure simple, stable, and accessible for businesses operating in complex industries.",
    foundersSectionTitle: "Meet the Founders",
    foundersSectionSubtitle:
      "Experienced leaders who built Cybin Enterprises to deliver clarity and stability to businesses navigating complex payment environments.",
    melName: "Mel Kotchey",
    melTitle: "Co-Founder & CEO",
    melBio1:
      "Mel Kotchey is an award-winning entrepreneur with extensive experience across regulated industries. Before founding Cybin Enterprises, she built and operated a successful business in the regulated cannabis and wellness sector — seeing firsthand how the right payment infrastructure reduces operational stress for business owners.",
    melBio2:
      "Mel holds five degrees including a master's in healthcare administration and has spent 28 years working across medical and regulated sectors. Her leadership focuses on stability, clarity, and long-term support for merchants.",
    shaneName: "Shane Suehr",
    shaneTitle: "Co-Founder & COO",
    shaneBio1:
      "Shane brings deep experience across logistics, cybersecurity, health-technology, and consumer services. He focuses on simplifying complex payment environments and helping businesses understand their options in clear, practical terms.",
    shaneBio2:
      "His background includes helping businesses achieve significant operational growth and supporting companies across multiple industries to reach new levels of efficiency and stability. Shane's expertise in technology and operations ensures clients receive practical, implementable solutions.",
  },
  colors: {
    accentTeal: "#00d4b8",
    accentPurple: "#a87ef5",
    accentGold: "#ffc832",
    bgPrimary: "#0a0f1e",
    bgSecondary: "#0c1020",
    textPrimary: "#e8edf8",
    textMuted: "rgba(232,237,248,0.65)",
  },
};

function deepMerge<T>(defaults: T, partial: Partial<T>): T {
  const result = { ...defaults };
  for (const key of Object.keys(partial) as (keyof T)[]) {
    const pVal = partial[key];
    const dVal = defaults[key];
    if (
      pVal !== null &&
      typeof pVal === "object" &&
      !Array.isArray(pVal) &&
      dVal !== null &&
      typeof dVal === "object"
    ) {
      result[key] = deepMerge(dVal, pVal as Partial<typeof dVal>);
    } else if (pVal !== undefined) {
      result[key] = pVal as T[keyof T];
    }
  }
  return result;
}

function loadSiteSettings(): SiteSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return deepMerge(SITE_DEFAULTS, parsed);
    }
  } catch {
    // ignore
  }
  return { ...SITE_DEFAULTS };
}

export function saveSiteSettings(settings: SiteSettings): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  window.dispatchEvent(new CustomEvent(SITE_SETTINGS_EVENT));
}

export function resetSiteSettings(): void {
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new CustomEvent(SITE_SETTINGS_EVENT));
}

export function getSiteSettings(): SiteSettings {
  return loadSiteSettings();
}
