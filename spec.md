# Cybin Enterprises

## Current State

- Full multi-page site with: Home, Payment Solutions, Industries, Fraud Deflect, About, Insights, Contact, FAQ, Knowledge, Partners, Integrations, Compliance, and legal pages
- Admin panel at `/admin` with Image Editor, Blog Manager, Analytics, Partner Leads, Site Editor
- About page contains a public-facing "17 Expert Validation" ticker section with specialist badges
- `/integrations` is a public-facing page listed in the footer and accessible via route
- Legal pages (Privacy Policy, Terms of Service, Cookie Policy) exist with general compliance language
- `/partners` page exists with a full intake form and 4 partnership types
- Blog Manager in admin already has AI/webhook integration instructions section
- Site Editor in admin has drag-and-drop image crop, text editing, color pickers

## Requested Changes (Diff)

### Add
- `README.md` at project root with step-by-step instructions for: domain transfer (GoDaddy/Cloudflare), connecting a public or locally-hosted AI/LLM, third-party website editor integration (via embed/iframe or headless export), GitHub export steps, and how to use the backend editor
- `dfx.json` at project root (if missing) for ICP deployment reference
- `.well-known/ic-domains` for custom domain verification

### Modify
- **AboutPage.tsx**: Remove the entire "Expert Validation Section" (lines 752–858) — the scrolling ticker of 17 expert badges and its heading. Delete the `expertBadges` array too.
- **Layout.tsx** footer: Remove `{ label: "Integrations", href: "/integrations" }` from the footer Resources list
- **App.tsx**: Keep `/integrations` route but make it redirect to `/` (page removed from public navigation; the route can stay so links don't hard 404)
- **LegalPage.tsx** — Privacy Policy: Upgrade to full attorney-grade language covering CCPA, GDPR, AML/KYC, PCI-DSS, BSA/FinCEN, data retention, AI training opt-out (already partially there — strengthen with specificity and missing clauses)
- **LegalPage.tsx** — Terms of Service: Upgrade with PCI-DSS merchant obligations, explicit class action waiver, MATCH list / previously denied merchant disclaimer, force majeure, Pennsylvania governing law (already partially there — strengthen)
- **LegalPage.tsx** — Cookie Policy: Upgrade to cover browser fingerprinting disclosure, localStorage analytics, GDPR cookie consent requirements, and list all cookie types with purpose and retention
- **SiteEditorPanel.tsx**: No changes needed — drag-and-drop already built. Verify it's fully wired and add a "Third-Party Editor Integration" info panel explaining iframe embed and headless CMS export options

### Remove
- "17 Expert Validated" public-facing ticker section from AboutPage
- `/integrations` link from footer navigation

## Implementation Plan

1. Remove `expertBadges` array and the entire Expert Validation `<section>` block from `AboutPage.tsx`
2. Remove `{ label: "Integrations", href: "/integrations" }` from the footer nav array in `Layout.tsx`
3. Update App.tsx to redirect `/integrations` to home (or simply remove route if page is kept internal only)
4. Strengthen `LegalPage.tsx` — Privacy Policy with: explicit Notice at Collection header, CCPA Right to Know/Delete/Correct/Non-Discrimination detail, GDPR lawful basis table, SCC transfer mechanism, full BSA/FinCEN 5-year retention clause, AML/KYC beneficial ownership disclosure
5. Strengthen `LegalPage.tsx` — Terms of Service with: MATCH list / high-risk merchant disclaimer, PCI-DSS scope of merchant obligation, enhanced arbitration clause with JAMS rules and Pennsylvania venue, stronger force majeure list
6. Strengthen `LegalPage.tsx` — Cookie Policy with: explicit list of cookies (essential, analytics, preference), localStorage fingerprinting disclosure, GDPR Art. 7 consent withdrawal instructions, browser-by-browser opt-out links
7. Add "Third-Party Editor / Export" informational section to SiteEditorPanel admin tab
8. Write `README.md` covering domain transfer, AI LLM connection, editor integration, and dev handoff
9. Validate and deploy
