# Content checklist — what Sedjro still needs to provide or confirm

The site is fully functional today; every item below has a safe placeholder
or graceful fallback. Work through this list to replace provisional content
with confirmed facts. Items map to `isVerified: false` flags and
`TODO(Sedjro)` comments in the source.

## 1. Links & identity

- [ ] **GitHub profile URL** → `src/data/site.ts` (`social`, platform `github`) — currently hidden because no URL exists
- [ ] **LinkedIn profile URL** → `src/data/site.ts` (`social`, platform `linkedin`) — currently hidden
- [ ] **Confirm `contact@sedjrotovihouande.com` mailbox exists** (create it via your email provider / Google Workspace / Cloudflare Email Routing) → `src/data/site.ts` (`email`)
- [ ] **Public repository links** for any projects you want linked → `repoUrl` per project in `src/data/projects.ts` (only for repos that are public and safe to share)

## 2. Files & media

- [ ] **Professional portrait** → `public/images/portrait.jpg`, then set `portraitSrc` in `src/components/PortraitFrame.tsx`
- [ ] **Final résumé PDF** → `public/resume/sedjro-tovihouande-resume.pdf`, then set `resume.pdfPath` in `src/data/site.ts`
- [ ] **Project screenshots** (demo data only; 16:10) → `public/images/projects/`, then set `screenshot` per project. Shots needed:
  - MyVital Harmony: landing page; provider dashboard (demo data); mobile booking flow
  - MyFreedomOps: status submission (demo data); leader roll-up / PERSTAT view (demo data)
  - Murielle Hair Braids: homepage hero; mobile booking flow; gallery
  - Sedoinsurance: landing page; mobile quote flow
  - Tovihouande Genealogy: family-tree view (demo data)
  - VitalConnect: one approved interface screenshot

## 3. Facts to verify (currently written as careful, design-intent copy)

- [ ] **Exact technology stack per project** → `caseStudy.stack` in `src/data/projects.ts` (currently representative: "Modern web application stack", "Stripe", etc.)
- [ ] **Skills marked unverified** → `src/data/skills.ts` (Stripe, SQL, multi-tenant architecture, AWS, etc. — confirm each is fair to claim)
- [ ] **Experience dates and start years** → `src/data/experience.ts` (currently "Present" / "Dates on résumé")
- [ ] **Purdue Global program name, status, and dates** → `src/data/experience.ts`
- [ ] **Graduate AWS program: institution, exact name, start date** → `src/data/experience.ts`
- [ ] **Certifications actually earned** → `src/data/experience.ts` (list is empty by design — never list planned certs as earned)
- [ ] **Approve the biography/about copy** → `src/app/about/page.tsx` and `src/data/site.ts` hero text

## 4. ⚠️ Decision needed: MyFreedomOps positioning

The case study describes the **personnel accountability / PERSTAT product**
per your brief. However, **myfreedomops.com currently presents "FreedomOps —
Command Your Financial Future," an AI financial platform for military
members, government employees, and families** (checked July 2026).

Decide one of:

1. The accountability app is the story → consider whether the live-site
   button should link there while the domain shows a different product
   (`liveUrl` / `liveUrlVerified` in `src/data/projects.ts`), or
2. The product pivoted to financial management → the case study needs a
   rewrite to match (happy to do this — just say the word), or
3. Both products exist → the portfolio could present them separately.

## 5. Live-site verification notes (checked July 2026)

- ✅ `myvitalharmony.com` — live; case-study capabilities align with the public site
- ✅ `muriellehairbraids.com` — live; booking, shop, gallery, testimonials confirmed
- ✅ `sedoinsurance.com` — live ("Insurance, rethought for Benin") — **confirm this is your product**
- ⚠️ `myfreedomops.com` — live but shows a different product (see §4)
- ⏳ `tovihouandegenealogy.com` — "Launching Soon" page; presented as in development, not linked

## 6. Before launch

- [ ] Set up the contact form (Resend keys — see README "Contact form configuration")
- [ ] Review `/privacy` once the contact provider and any analytics are final
- [ ] Run through DEPLOYMENT.md (domain, redirects, HTTPS)
