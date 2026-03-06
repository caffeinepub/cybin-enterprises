# Cybin Enterprises

## Current State
Full multi-page website for Cybin Enterprises -- a high-risk merchant payment processor. Includes Home, Payment Solutions, Industries, Fraud Deflect, About, Insights, Contact, Legal pages, Application Wizard (/apply), and now an Admin Panel (/admin). Backend stores contact form submissions, wizard applications, and partial leads.

## Requested Changes (Diff)

### Add
- Admin panel at `/admin` with PIN-protected login, tabbed view of all wizard applications / contact submissions / partial leads, and Export All Data as JSON button
- Properly compressed headshot images (mel-headshot.jpeg 67KB, shane-headshot.jpeg 65KB, cybin-logo.png 71KB) replacing corrupted large originals

### Modify
- AboutPage.tsx: fixed broken image imports (was pointing to corrupted files in uploads folder with -1/-3 suffixes; now uses compressed working images)
- Layout.tsx: updated logo import to new compressed cybin-logo.png
- WizardPage.tsx: fixed logo src to new compressed logo; fixed "Skip for now" button to actually submit the form as a preliminary consultation (was previously only changing state without submitting)
- ContactPage.tsx: fixed "Start Your Approval Process" button (was linking to /contact same page; now links to /apply)
- PaymentSolutionsPage.tsx: fixed two "Start Your Approval Process" buttons (were linking to /contact; now link to /apply)
- App.tsx: added /admin route

### Remove
- Nothing removed

## Implementation Plan
1. Compress and replace corrupted/oversized headshot images with optimized versions
2. Fix all image import paths to point to working compressed files
3. Fix WizardPage "Skip for now" to auto-submit as preliminary consultation
4. Fix all broken "Start Your Approval Process" CTAs that incorrectly linked to /contact instead of /apply
5. Build AdminPage with PIN auth, three data tabs, stats cards, and JSON export
6. Add /admin route to App.tsx
7. Validate build
