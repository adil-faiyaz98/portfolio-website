# Implementation Plan: SDA Intelligence Website Redesign — AI Agent Platform

## Overview
Redesign the SDA Intelligence website from an SAP PI/PO migration company to an AI agent platform. The site already has the 6 AI agent products defined in `src/data/products.ts` and navigation pointing to them. The primary work is:
1. Update visual theme (color palette, design system) to match AWS SDK/MDA Space professional elegance
2. Update HeroSection and ProductShowcase to remove PI/PO migration references
3. Update layout metadata and remove old migration references
4. Add comprehensive solution page sections (Business Problem, Fit-Gap Analysis, Risks, Timeline, Compliance)
5. Update About Us with new team content
6. Update Legal pages for Quebec Law 25 compliance
7. Add SAP-related blog posts about the solutions
8. Ensure EN/FR language toggle works (FR shows "Coming Soon")

---

## Implementation Plan

- [ ] 1. **Update Tailwind Config and Global CSS for new color palette**
      Change the color palette from green/ivory to the professional blue/white design:
      - Primary background: #FAFAFA or #F8FAFC (light gray-white)
      - Text: #1A1A2E (dark navy) for headers, #4A5568 for body
      - Accent: #0066CC (SAP-inspired blue) for CTAs
      - Secondary accent: #10B981 (emerald for Quebec/construction)
      Update CSS custom properties and Tailwind theme colors.
      Files: `src/app/globals.css`, `tailwind.config.ts`
      Verify: `npm run build` passes, site renders with new colors.

- [ ] 2. **Update layout.tsx metadata and organization schema**
      Change title from "SAP PI/PO Migration Services" to "SDA Intelligence | Enterprise AI Agents for SAP"
      Update description, openGraph, and twitter metadata to reflect AI agents positioning.
      Update organizationSchema to describe AI agent platform.
      Remove "SDA Migration WorkBench" references.
      Files: `src/app/layout.tsx`
      Verify: `npm run build` passes.

- [ ] 3. **Redesign HeroSection for AI Agent Platform**
      Replace the migration diagram with a modern AI agent showcase.
      Update headline from "Modernize your integration platform" to AI agent messaging.
      Update stats (remove "Migrations" and "Interfaces Migrated").
      Update CTAs to "Explore Solutions" and "Book a Demo".
      Remove PI/PO migration-specific content and diagram.
      Files: `src/components/HeroSection.tsx`
      Verify: `npm run build` passes, homepage renders correctly.

- [ ] 4. **Redesign ProductShowcase to display 6 AI Agent Solutions**
      Replace the 2-product grid (Migration WorkBench, Quebec Tax Calculator) with a 6-product grid showcasing all AI agents.
      Use the product data from `src/data/products.ts`.
      Create clean, card-based layout with subtle shadows matching AWS/MDA style.
      Remove "Migration WorkBench" and "Quebec Tax Calculator" entirely.
      Files: `src/components/ProductShowcase.tsx`
      Verify: `npm run build` passes, products section shows all 6 agents.

- [ ] 5. **Update navigation to remove obsolete links**
      Navigation already points to the 6 products. Remove any remaining legacy links (Quebec Tax Calculator, Assessment, Dell Boomi, Informatica, MuleSoft pages from Products dropdown if still present in navigation data).
      Clean up footer links if needed.
      Files: `src/data/navigation.ts`, `src/components/Footer.tsx`
      Verify: `npm run build` passes, navigation is clean.

- [ ] 6. **Delete obsolete product/solution pages**
      Remove pages that no longer apply:
      - `src/app/products/assessment/page.tsx`
      - `src/app/products/dell-boomi/page.tsx`
      - `src/app/products/informatica/page.tsx`
      - `src/app/products/mulesoft/page.tsx`
      - `src/app/products/quebec-tax-calculator/page.tsx`
      Files: Delete the above pages
      Verify: `npm run build` passes without missing route errors.

- [ ] 7. **Update CapabilitiesSection for AI Agent context**
      Update section content to reflect AI agent capabilities rather than migration capabilities.
      Review and update the capabilities data if it still references migration.
      Files: `src/data/capabilities.ts`, `src/components/CapabilitiesSection.tsx`
      Verify: `npm run build` passes.

- [ ] 8. **Enhance Product data with comprehensive solution sections**
      Add to each product in `src/data/products.ts`:
      - `businessProblem` (market stats, factual)
      - `timeline` ("September 2026" for all)
      - `risksAndMitigation` array
      - `fitGapAnalysis` object (whatSAPCovers, customBuild)
      - `sapIntegrationPoints` array
      - `businessMetrics` / ROI data
      - `complianceDetails` (Quebec Law 25, PIPEDA, industry-specific)
      This enriches the existing data structure.
      Files: `src/data/products.ts`
      Verify: TypeScript compiles, `npm run build` passes.

- [ ] 9. **Update ProductPageClient to render new solution sections**
      Add new sections to the product detail page:
      - Business Problem section with market stats
      - Timeline section
      - Risks & Mitigation section
      - Fit-Gap Analysis section (SAP vs Custom)
      - SAP Integration Points section
      - Business Metrics/ROI section
      - Compliance section with Quebec Law 25 prominence
      Follow clean, professional card layout.
      Files: `src/app/products/[slug]/ProductPageClient.tsx`
      Verify: `npm run build` passes, product pages render all sections.

- [ ] 10. **Update About Us page with new team content**
      Update team array with:
      - Adil Faiyaz (10yrs backend+SAP)
      - Ayman Kabalan (20+ yrs SAP)
      - Dattu Pariti (COO)
      Add messaging: "Boutique AI agent developers with 30+ combined years SAP experience"
      Add: "Where Big4 spends months in meetings, we deliver working agents"
      Founded: 2026
      Update synergistic developers messaging.
      Files: `src/app/company/about/page.tsx`
      Verify: `npm run build` passes.

- [ ] 11. **Update Legal pages for Quebec Law 25 compliance**
      Update Privacy Policy:
      - Add Quebec Law 25 specific sections
      - Reference PIPEDA compliance
      - Update last updated date to 2026
      Update Terms of Service for AI agent platform context.
      Update Cookies Policy.
      Files: `src/data/legal.ts`, `src/app/legal/privacy/page.tsx`, `src/app/legal/terms/page.tsx`, `src/app/legal/cookies/page.tsx`
      Verify: `npm run build` passes.

- [ ] 12. **Add SAP-related blog posts for each solution**
      The blog data already has relevant posts. Review and add any missing posts specifically about:
      - SAP Guardian counterfeit detection
      - NFC Mobile Access SAP HR integration
      - Contractor Hub Procore-SAP integration
      - PolicyBridge SAP Finance AI readiness
      - Chantier AI CCQ compliance
      - Blockchain Platform SAP immutability
      Files: `src/data/blog.ts`
      Verify: `npm run build` passes, blog page shows updated posts.

- [ ] 13. **Verify and enhance EN/FR language toggle**
      The Navbar already has the toggle. Ensure:
      - EN is clickable and active
      - FR shows "Coming Soon" tooltip (already implemented)
      - No navigation occurs on FR click
      If not fully working, fix the toggle implementation.
      Files: `src/components/Navbar.tsx`
      Verify: Toggle works as expected on dev server.

- [ ] 14. **Update StatsSection and CTABanner**
      Update any remaining migration-specific stats or CTAs.
      Ensure CTA points to /demo or /company/contact.
      Files: `src/components/StatsSection.tsx`, `src/components/CTABanner.tsx`
      Verify: `npm run build` passes.

- [ ] 15. **Final cleanup and verification**
      Run full build: `npm run build`
      Test on dev server: `npm run dev` (port 4100 via next.config.js or package.json script)
      Verify all pages render without errors.
      Remove any remaining "Migration WorkBench" text across codebase.
      Files: All files (grep for "Migration WorkBench", "PI/PO", "Quebec Tax Calculator")
      Verify: `npm run build` passes, site runs on port 4100.

---

## Digest

### Files to Modify

| File | Blocks/Sections to Change | Existing Tests | Verified |
|------|--------------------------|----------------|----------|
| `tailwind.config.ts` | `theme.extend.colors` (lines 7-20) | None | Build |
| `src/app/globals.css` | CSS custom properties (lines 3-35) | None | Build |
| `src/app/layout.tsx` | `metadata` object (lines 22-50), `organizationSchema` (lines 52-63) | None | Build |
| `src/components/HeroSection.tsx` | Entire component (~150 lines) - reassurances, heroStats, MigrationDiagram, headline text | None | Build |
| `src/components/ProductShowcase.tsx` | `products` array (lines 10-42), ProductCard component | None | Build |
| `src/data/navigation.ts` | `navigationItems` array - verify Products dropdown items | None | Build |
| `src/components/Footer.tsx` | `footerLinkGroups` Products links (lines 52-58) | None | Build |
| `src/data/products.ts` | Add new interface fields, update each product object | None | TypeScript + Build |
| `src/app/products/[slug]/ProductPageClient.tsx` | Add new section components (Problem, Timeline, Risks, FitGap, etc.) | None | Build |
| `src/app/company/about/page.tsx` | `team` array (lines 45-65), messaging text | None | Build |
| `src/data/legal.ts` | `privacyPolicy.sections`, `termsOfService.sections`, dates | None | Build |
| `src/data/capabilities.ts` | Review capability descriptions for migration references | None | Build |
| `src/components/CapabilitiesSection.tsx` | Verify content matches AI agent context | None | Build |
| `src/data/blog.ts` | Add/verify blog posts for each solution | None | Build |
| `src/components/Navbar.tsx` | Verify FR toggle (lines 73-84) | None | Manual |
| `src/components/StatsSection.tsx` | Update stats if migration-specific | None | Build |
| `src/components/CTABanner.tsx` | Update CTA text if migration-specific | None | Build |

### Files to Delete

| File | Reason |
|------|--------|
| `src/app/products/assessment/page.tsx` | Legacy migration assessment |
| `src/app/products/dell-boomi/page.tsx` | Legacy migration target platform |
| `src/app/products/informatica/page.tsx` | Legacy migration target platform |
| `src/app/products/mulesoft/page.tsx` | Legacy migration target platform |
| `src/app/products/quebec-tax-calculator/page.tsx` | Legacy tax product |

### Build/Test Commands

- Build: `npm run build`
- Dev: `npm run dev` (configure port 4100 in next.config.js or via env)
- Lint: `npm run lint`

### Color Palette Reference

```
Primary Background: #FAFAFA or #F8FAFC
Text Primary (headers): #1A1A2E
Text Secondary (body): #4A5568
Accent Primary (CTAs): #0066CC
Accent Secondary (Quebec/construction): #10B981
Surface: #FFFFFF
Border: rgba(26, 26, 46, 0.1)
```

### Key Dependencies

- Next.js 14.2.21 (App Router)
- Tailwind CSS 3.4.19
- Framer Motion 12.40.0
- Lucide React 1.17.0
