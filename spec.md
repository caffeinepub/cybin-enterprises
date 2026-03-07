# Cybin Enterprises

## Current State
- Full 10-page marketing site for a high-risk merchant payment processor
- Pages: Home, Payment Solutions, Industries, Fraud Deflect, About, Insights (static articles), Contact, FAQ, Knowledge, Legal (Privacy/Terms/Cookie), Apply (4-step wizard), Admin (/admin)
- Backend: Motoko canister with ContactSubmission, WizardApplication, PartialLead storage
- Admin panel: Site Editor, Image Editor, Wizard Applications, Contact Submissions, Partial Leads tabs, Export JSON
- Real-time image editor with crop/zoom controls for Mel, Shane, Logo
- Real-time site editor for text/colors via localStorage+CustomEvent
- SEO: JSON-LD schemas, robots.txt, sitemap.xml, meta tags
- Insights page: 6 static articles, category filter tabs, no content management
- No blog management, no visitor analytics, no partner intake, no integrations hub, no compliance center

## Requested Changes (Diff)

### Add
1. **Blog/Insights CMS in Admin** — New "Blog Manager" tab in /admin: create, edit, publish, unpublish, delete blog posts with title, category, excerpt, body, author, date, readTime, published toggle. Posts stored in backend Motoko. InsightsPage reads from backend (falling back to static articles if empty).
2. **Visitor Analytics in Admin** — New "Analytics" tab: tracks page views, referrers, device type, session count. Stored in localStorage (privacy-first, no PII). Displays total visits, top pages, device breakdown, recent sessions chart.
3. **Partner Intake Page (/partners)** — New dedicated page for business partners and integration inquiries. Separate intake form: company name, contact name, email, phone, partnership type (Technology Integration, Referral Partner, White-Label, Strategic Alliance, Other), description. Stored in backend.
4. **Partner Leads tab in Admin** — Displays all partner intake submissions with export.
5. **Integrations Hub Page (/integrations)** — Visual showcase of integration categories: CRM (Salesforce, HubSpot), Marketing (Zapier, Mailchimp), E-Commerce (Shopify, WooCommerce), Analytics (Google Analytics, GA4), Accounting (QuickBooks, Xero), Developer (Webhooks, REST API). Each card shows category, description, "Request Integration" link to /contact.
6. **Compliance Center Page (/compliance)** — Dedicated page covering: AML/KYC protocols, PCI-DSS Level 1 compliance, CCPA privacy rights, GDPR readiness, SOC 2 practices, HIPAA-adjacent data handling, FinCEN monitoring. With structured FAQPage JSON-LD and downloadable compliance statement (links to /privacy-policy).
7. **Enhanced Admin: Content Manager tab** — Edit all page headlines, body text, CTA labels directly in admin without code. Wraps existing SiteEditorPanel.
8. **"Expert Validation" section on About page** — 17 expert-review badges (simulated trust indicators) displayed as a scrolling ticker or grid, e.g. "Cybersecurity Compliance Expert", "AML Specialist", "PCI-DSS Auditor", etc.
9. **Blog automation webhook endpoint hint in Admin** — A "Blog Integrations" sub-panel showing how to connect Zapier/Make webhooks to auto-publish articles (informational, with copyable webhook URL pattern and instructions for ChatGPT/Claude/Grok API key configuration).
10. **Enhanced Legal pages** — Update Privacy Policy and Terms of Service with 2026-grade language: CCPA rights, GDPR data subject rights, AI training opt-out, AML/KYC notice, PCI-DSS cardholder data notice, FinCEN disclosure, attorney-grade limitation of liability, indemnification.
11. **Navigation update** — Add Partners and Integrations to footer nav. Add Compliance link to footer. Add Knowledge, FAQ to footer Resources section.
12. **SEO additions** — Add WebPageElement schemas on Compliance and Partners pages. Add SoftwareApplication schema for the intake wizard. Update sitemap.xml with new pages.

### Modify
- **InsightsPage** — Reads posts from backend first, falls back to static articles. Posts show "Read More" which expands inline (modal or accordion) to show full body content if available.
- **AdminPage** — Add "Blog Manager", "Analytics", "Partner Leads" tabs alongside existing tabs.
- **Footer nav** — Add Partners, Integrations, Compliance links.
- **Header nav** — No change to primary nav (keep clean); Partners/Integrations stay in footer only.

### Remove
- Nothing removed; all existing pages and features preserved.

## Implementation Plan
1. Extend Motoko backend: add BlogPost type and storage, PartnerLead type and storage. Add CRUD for blog posts (create, update, publish/unpublish, delete, list). Add submitPartnerLead function.
2. Regenerate backend.d.ts type bindings.
3. Build /partners page with partner intake form wired to backend.
4. Build /integrations page as visual hub (static marketing page, no backend needed).
5. Build /compliance page with full structured legal content and JSON-LD.
6. Update InsightsPage to read from backend posts, falling back to static.
7. Add Blog Manager tab to AdminPage (create/edit/delete/publish posts).
8. Add Analytics tab to AdminPage (localStorage-based privacy-first analytics).
9. Add Partner Leads tab to AdminPage.
10. Add Blog Integrations sub-panel to AdminPage.
11. Add "Expert Validation" trust badges to About page.
12. Update legal pages (Privacy Policy, Terms) with 2026 attorney-grade language.
13. Update App.tsx with new routes: /partners, /integrations, /compliance.
14. Update Layout footer with new navigation links.
15. Update sitemap.xml.
16. Validate build and deploy.
