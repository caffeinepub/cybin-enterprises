# Cybin Enterprises

## Current State
- Full site with dark/light theme toggle (2-mode), Layout, WizardPage, HomePage, HardwarePage, PaymentBadges, etc.
- Light mode has text visibility issues — inline styles using dark rgba colors override the CSS light mode variables
- Logo image (`cybin-logo.png`) has a visible background fill applied in CSS/inline styles causing a black bleed
- HomePage has TWO industry sections below the scrolling ticker: (1) "Explore Our Industries" button + disclaimer + "Common Industries We Serve" static grid, AND (2) "High-risk merchant specialists / Domestic & international / Structured approval / Long-term stability" trust badges block — both must be removed; only the auto-scrolling ticker strip stays
- WizardPage is a multi-step wizard; currently no "submit basic info first, then complete application" split flow
- FraudDeflect section/button visible on HomePage
- HardwarePage lists specific models; needs inclusive language and generated imagery
- PaymentBadges component exists but design is inconsistent
- Industries nav and footer links exist

## Requested Changes (Diff)

### Add
- Hardware page: 3 generated images (POS terminal, card reader, mobile reader)
- WizardPage: After basic business info step, show inline "Submit Basic Info" button + "Complete Your Application" secondary prompt to continue with owner details, ID upload, processing records
- Light mode: comprehensive CSS overrides that force all inline-style rgba dark text to be readable in light mode; cover nav, header, footer, cards, wizard, hardware, payment solutions, industries, all section backgrounds, and all text elements with inline color styles

### Modify
- Logo: Remove any background color from the logo container; ensure the `<img>` has `style={{ background: 'transparent', mixBlendMode: 'normal' }}` and the wrapper has no background fill so it works on both dark and light backgrounds
- HomePage: Remove the entire block from `<Link to="/industries" className="cybin-btn-primary"...>Explore Our Industries</Link>` through the "Common Industries We Serve" grid and the trust badges block (Shield/Globe/CheckCircle/TrendingUp icons row). Keep ONLY the scrolling ticker section
- HomePage: Hide/remove fraud-deflect section and button
- HardwarePage: Replace specific model listings with inclusive language ("we work with most hardware"); use generated images for POS, card reader, mobile categories
- PaymentBadges: Complete visual redesign — clean pill/card style, consistent spacing, modern look; keep Visa, Mastercard, Amex, Discover, ACH, eCheck, Cashless ATM
- Light mode CSS in index.css: Add deep comprehensive overrides for all inline-styled elements that use hardcoded rgba dark colors, ensuring text/icons are readable in light mode; specifically cover: nav links, header bg, footer text, hero inline styles, card inline styles, all `rgba(232,237,248,*)` references must map to dark navy equivalents in light mode
- WizardPage: Add "partial submit" flow — user fills business name/industry/contact, clicks "Submit Basic Info", sees confirmation + "Complete Your Application" button to continue; persistent site header added to WizardPage

### Remove
- HomePage: "Explore Our Industries" CTA button and disclaimer text
- HomePage: "Common Industries We Serve" static grid section
- HomePage: "High-risk merchant specialists / Domestic & international / Structured approval / Long-term stability" trust badge row (the `trustBadges` array section rendered on the page)
- HomePage: Fraud Deflect section/button
- Any remaining "fraud deflect" wording on homepage

## Implementation Plan
1. Generate 3 hardware images (POS terminal, card reader, mobile)
2. Update `index.css` with deep light mode overrides covering all inline-styled elements
3. Fix logo container in `Layout.tsx` — remove background from logo wrapper
4. Update `HomePage.tsx` — remove static industries grid, trust badges block, fraud deflect section
5. Update `HardwarePage.tsx` — inclusive language, use generated images
6. Update `PaymentBadges.tsx` — full redesign
7. Update `WizardPage.tsx` — add Layout header, add partial submit + complete application flow
8. Validate and fix any TypeScript/lint errors
