# Cybin Enterprises

## Current State
The site is at Version 51. Key gaps identified from thorough audit:
- Most homepage sections hardcoded dark (#0a0f1e) with no isLight conditional — light mode broken for those sections
- Application wizard missing: business address, business phone, owner personal address/phone/email, ID upload, processing records upload, 'Other' hurdle option
- Industry landing pages exist but NOT linked in nav dropdown or footer
- Q&A block on homepage mentions 'Fraud Deflect' by name (visible text)
- Fraud Deflect hidden section still in DOM
- 724-244-7111 hardcoded in Legal, DoNotSell, Accessibility, Knowledge pages

## Requested Changes (Diff)

### Add
- Industries nav dropdown with 'Common Industries' subsection linking all 10 industry pages
- All 10 industry landing page links in footer under new 'Industries' column
- Wizard fields: business address (street, city, state, ZIP), business phone, owner personal address, owner personal phone, owner personal email, driver's license/passport file upload, processing records file upload with disclaimer
- 'Other' option to regulatory hurdle cards

### Modify
- HomePage.tsx: all hardcoded dark sections (Why Choose Cybin, MATCH section, Payment Solutions Preview, About Preview, Q&A block, Final CTA) — add isLight conditionals for bg and text colors
- HomePage.tsx: remove 'Fraud Deflect' name from Q&A answer, replace with generic chargeback prevention language; remove hidden Fraud Deflect section entirely from DOM
- LegalPage.tsx, DoNotSellPage.tsx, AccessibilityPage.tsx, KnowledgePage.tsx: remove 724-244-7111 (only show 888-321-2100 as office line)
- Wizard header: make it use the full site Layout header (same as rest of site) rather than a custom stripped-down wizard header

### Remove
- Hidden Fraud Deflect section from HomePage.tsx DOM entirely
- 724-244-7111 from all public-facing pages except where it's the known office line

## Implementation Plan
1. Fix all light mode conditionals in HomePage.tsx for all 6 hardcoded dark sections
2. Remove Fraud Deflect references from homepage Q&A and remove hidden section
3. Add 'Other' to hurdleCards in WizardPage.tsx
4. Add business address, business phone, owner details, ID upload, processing records upload steps to wizard
5. Update WizardPage.tsx header to import and use the main Layout header (or pass through as prop)
6. Add Industries dropdown to Layout.tsx nav with 10 industry links
7. Add Industries column to footer with all 10 industry links
8. Remove 724-244-7111 from Legal, DoNotSell, Accessibility, Knowledge pages
