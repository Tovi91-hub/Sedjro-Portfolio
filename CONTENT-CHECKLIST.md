# Content checklist — what Sedjro still needs to provide or confirm

The site is fully functional today; every item below has a safe placeholder
or graceful fallback. Work through this list to replace provisional content
with confirmed facts. Items map to `isVerified: false` flags and
`TODO(Sedjro)` comments in the source.

## 1. Links & identity

- [x] **GitHub profile URL** — wired: https://github.com/Tovi91-hub
- [x] **LinkedIn profile URL** — wired: linkedin.com/in/sedjro-tovihouande-749162b2
- [ ] **Confirm `contact@sedjrotovihouande.com` mailbox exists** (create it via your email provider / Google Workspace / Cloudflare Email Routing) → `src/data/site.ts` (`email`)
- [ ] **Public repository links** for any projects you want linked → `repoUrl` per project in `src/data/projects.ts` (only for repos that are public and safe to share)

## 2. Files & media

- [ ] **Professional portrait** → `public/images/portrait.jpg`, then set `portraitSrc` in `src/components/PortraitFrame.tsx`
- [x] **Final résumé PDF** — generated from `scripts/resume/resume.html` (edit HTML → run `node scripts/generate-resume.mjs`); wired at /resume
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
- [ ] **Founder/client-work start years** → `src/data/experience.ts` (Army verified 2020–Present; founder & Murielle dates still needed)
- [x] **Purdue Global** — verified: B.S. IT (Software Dev Using Web Languages), Magna Cum Laude, April 2026
- [ ] **Graduate AWS program: institution, exact name, start date** → `src/data/experience.ts`
- [x] **Certifications** — Airborne, Hazmat Certifier, UPL, Security Management (S2) added; Security+ marked in progress
- [ ] **Approve the biography/about copy** → `src/app/about/page.tsx` and `src/data/site.ts` hero text

## 4. ~~Decision needed: MyFreedomOps positioning~~ — RESOLVED (July 2026)

Sedjro confirmed the accountability module was **added to** the live
FreedomOps financial platform. The case study now covers both: AI financial
readiness (debt, savings, credit) for the military community, plus the
first-formation accountability module for PSGs. Remaining: verify the exact
stack and provide screenshots (demo data only).

## 5. Live-site verification notes (checked July 2026)

- ✅ `myvitalharmony.com` — live; case-study capabilities align with the public site
- ✅ `muriellehairbraids.com` — live; booking, shop, gallery, testimonials confirmed
- ✅ `sedoinsurance.com` — live; ownership confirmed by Sedjro
- ✅ `myfreedomops.com` — live; financial platform + accountability module confirmed by Sedjro
- ⏳ `tovihouandegenealogy.com` — "Launching Soon" page; presented as in development, not linked

## 6. Before launch

- [ ] Set up the contact form (Resend keys — see README "Contact form configuration")
- [ ] Review `/privacy` once the contact provider and any analytics are final
- [ ] Run through DEPLOYMENT.md (domain, redirects, HTTPS)
