# Cybin Enterprises

## Current State

Full Cybin Enterprises website with Layout (nav + footer), 19 routes, admin panel at /admin, blog/insights, compliance, partners, legal pages. The site is dark-only theme. App uses React + TypeScript + Tailwind. Backend is Motoko with lead capture.

Key current state details:
- Nav links: Home, Payment Solutions, Industries, Fraud Deflect, About, Insights, Contact + CTA button
- Logo: imported from /assets/cybin-logo.png, uses mixBlendMode:screen, admin-adjustable size
- Industries section on homepage: heading "We Support All Legal Industries", 22-item scrolling ticker
- IndustriesPage: 10 industry cards, no landing pages exist
- WizardPage: Steps 1-4; missing monthly volume, business type, hardware fields; field labeled "Federal EIN / FEIN"
- About page: no phone numbers shown (live settings hook); Mel and Shane headshots
- FraudDeflectPage: exists, public, no noindex, still in nav
- No light mode / theme toggle exists
- No payment method badges anywhere
- No hardware page
- No industry-specific landing pages

## Requested Changes (Diff)

### Add
- **Theme system**: Light/dark/auto modes. Auto = detects `prefers-color-scheme` + time of day (6am-8pm = light, 8pm-6am = dark). Sun/moon/auto toggle in nav bar (top right, tasteful). Light mode uses clean white/warm off-white with existing teal/purple brand accents.
- **Payment method badges**: Visa, Mastercard, Amex, Discover, ACH, eCheck, Cashless ATM — rendered as badge strip on PaymentSolutionsPage and in WizardPage step 1 area
- **Hardware page** at `/hardware`: New dedicated page in nav. Cover PAX A920, Ingenico DESK/MOVE series, Dejavoo, VeriFone VX520, and general countertop/handheld/mobile categories (NOT Clover). Show device images/illustrations and lifestyle shots. CTA to /apply. Add to nav.
- **Industry landing pages**: Individual SEO-targeted pages for the highest-revenue high-risk industries. Pages at `/industries/[slug]`. NOT linked as a list from the Industries page (avoids implying exclusivity). Discovered via subtle "Industries We Specialize In" section on homepage and SEO. Pages to create:
  - /industries/cannabis-cbd
  - /industries/firearms-ammunition  
  - /industries/online-gaming
  - /industries/nutraceuticals-supplements
  - /industries/kratom-spores-ethnobotanicals
  - /industries/telemedicine-healthcare
  - /industries/e-cigarettes-vaping
  - /industries/debt-collection
  - /industries/subscription-businesses
  - /industries/travel-timeshare
  Each page: addresses industry pain points in payment processing, consistent with site claims (Cybin is intermediary, approval not guaranteed, merchants responsible for compliance), full SEO meta + Article JSON-LD, CTA to /apply
- **Accessibility Statement** and **Do Not Sell** links already exist (keep)
- README additions for hardware/industry pages (update existing README.md)

### Modify
- **App.tsx**: Add /hardware route, add /industries/:slug route, noindex FraudDeflectPage (add meta robots noindex), remove Fraud Deflect from nav links, add Hardware to nav
- **WizardPage**: 
  - Rename "Federal EIN / FEIN" label to "EIN (Employer Identification Number)"
  - Add Step: Monthly Processing Volume (select: Under $10K / $10K–$50K / $50K–$100K / $100K–$500K / $500K–$1M / $1M+)
  - Add fields: Business Type (E-Commerce / Retail / Both), Hardware needs (Do you currently have hardware? Yes/No, Would you like new hardware? Yes/No)
  - Smart logic: volume + hardware are optional/skippable steps
- **HomePage industries section**: Change heading from "We Support All Legal Industries" to "Built for Businesses Banks Won't Touch" or similar high-risk-authority framing. Reword subtext to be more inclusive without emphasizing legality gate. Update ticker to remove Adult Entertainment from the visible list (SEO/compliance risk), add Mushrooms & Spores. Add subtle "Common Industries We Serve" strip (not a full directory) linking to the landing pages.
- **IndustriesPage**: Reword hero copy to remove "all legal industries" phrasing. More inclusive high-risk-authority copy.
- **Logo in Layout**: Increase default size, ensure no background box/border renders
- **ContactPage**: Remove Mel's personal mobile number (724-244-7111); keep only main office line (888-321-2100) and email
- **FraudDeflectPage**: Add `<meta name="robots" content="noindex,nofollow" />` and remove from nav
- **PaymentSolutionsPage**: Add payment method badge strip (Visa, MC, Amex, Discover, ACH, eCheck, Cashless ATM)

### Remove
- Fraud Deflect link from nav
- Adult Entertainment from homepage industries ticker and industry landing pages list
- Mel's personal mobile number from ContactPage

## Implementation Plan

1. Create ThemeContext + useTheme hook with auto/light/dark modes and localStorage persistence
2. Apply theme CSS variables throughout Layout and all pages
3. Add theme toggle button to nav bar
4. Create PaymentBadges component, add to PaymentSolutionsPage and WizardPage
5. Create HardwarePage component at /hardware, add route and nav link
6. Create IndustryLandingPage template component, generate 10 pages
7. Add /industries/:slug routing in App.tsx
8. Add subtle industry strip to HomePage
9. Update IndustriesPage hero copy
10. Update WizardPage: rename EIN field, add volume/business-type/hardware steps with skip logic
11. Fix ContactPage: remove Mel's mobile
12. Fix FraudDeflectPage: noindex meta, remove from nav
13. Fix logo: increase size, ensure no border box
14. Update HomePage industries section copy and ticker
