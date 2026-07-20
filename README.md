# sedjrotovihouande.com — Portfolio

Professional portfolio of **Sedjro Tovihouande** — Software Developer & Cloud
Computing Professional · Technology Founder · U.S. Army NCO.

Live domain (once deployed): **https://sedjrotovihouande.com**

## Technology stack

- **Next.js 16** (App Router, static generation for every page except the contact API)
- **TypeScript** (strict mode)
- **Tailwind CSS v4** (design tokens in `src/app/globals.css`)
- **Framer Motion** — subtle, reduced-motion-aware reveal animations
- **Lucide** icons (+ inline brand SVGs in `src/components/BrandIcons.tsx`)
- **Vitest + Testing Library** — content-integrity and component tests
- **ESLint + Prettier** (with the Tailwind class-sorting plugin)
- Self-hosted fonts via Fontsource (Inter Variable, Space Grotesk Variable) — no external font requests

## Requirements

- Node.js **20.9+** (Node 22 recommended)
- npm 10+

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

All commands:

| Command                   | Purpose                                      |
| ------------------------- | -------------------------------------------- |
| `npm run dev`             | Development server                           |
| `npm run build`           | Production build                             |
| `npm run start`           | Serve the production build                   |
| `npm run lint`            | ESLint                                       |
| `npm run typecheck`       | TypeScript validation                        |
| `npm run test`            | Vitest suite                                 |
| `npm run format`          | Prettier (write)                             |
| `npm run generate:assets` | Regenerate OG image + icons from SVG (sharp) |

## Where the content lives (edit these, not the components)

Every piece of personal/project content is centralized and strongly typed:

| File                     | Contents                                                            |
| ------------------------ | ------------------------------------------------------------------- |
| `src/data/site.ts`       | Name, titles, hero copy, email, social links, nav, résumé path, SEO |
| `src/data/projects.ts`   | All six projects and their full case studies                        |
| `src/data/skills.ts`     | Skill categories                                                    |
| `src/data/experience.ts` | Experience timeline, education, certifications                      |
| `src/types/portfolio.ts` | The types behind all of the above                                   |

Fields marked `isVerified: false` (and `TODO(Sedjro)` comments) are
provisional content awaiting confirmation — see **CONTENT-CHECKLIST.md**.
Nothing in the UI ever renders these flags; they exist for maintenance only.

### Add or modify a project

1. Edit `src/data/projects.ts` — add/modify an entry in `projects`.
2. The projects grid, featured cards, case-study route
   (`/projects/<slug>`), sitemap, and structured data all update
   automatically from that one entry.
3. Run `npm run test` — the content-integrity tests will catch missing
   fields, duplicate slugs, and the known-bad `muriellehairbraidss.com`
   domain typo.

### Replace a project screenshot

1. Drop the image in `public/images/projects/` (16:10 aspect ratio
   recommended, e.g. 1600×1000; use demo data only — never real patient,
   Soldier, or client data).
2. Set that project's `screenshot` field, e.g.
   `screenshot: "/images/projects/myvital-harmony-dashboard.png"`.
3. The placeholder frame is replaced automatically; layout does not change.

### Replace the portrait

1. Add the approved portrait as `public/images/portrait.jpg` (4:5 ratio
   recommended, e.g. 1200×1500).
2. In `src/components/PortraitFrame.tsx`, set
   `const portraitSrc = "/images/portrait.jpg"`.

### Add the résumé

1. Copy the final PDF to `public/resume/sedjro-tovihouande-resume.pdf`.
2. In `src/data/site.ts`, set
   `resume.pdfPath: "/resume/sedjro-tovihouande-resume.pdf"` (and
   optionally `updatedLabel: "July 2026"`).
3. The `/resume` page switches from the placeholder state to
   view/download buttons automatically.

### Update SEO metadata

- Site-wide defaults: `src/data/site.ts` → `seo`.
- Per-page: the `metadata` export at the top of each file in `src/app/`.
- Per-project: the `seo` field of each project in `src/data/projects.ts`.
- Social share image: `npm run generate:assets` regenerates
  `public/og/og-default.png` from `scripts/generate-assets.mjs`.

## Contact form configuration

The form posts to `/api/contact` (the only non-static route). Server-side
validation, a honeypot field, and best-effort per-IP rate limiting are
built in. **No secrets exist in client code.**

Until configured, the API returns 503 and the UI gracefully offers the
direct email address instead — the site works fine without it.

To enable delivery via [Resend](https://resend.com):

1. Create a Resend account and API key (free tier is enough).
2. Copy `.env.example` → `.env.local` and fill in `RESEND_API_KEY`,
   `CONTACT_TO_EMAIL`, and (after domain verification in Resend)
   `CONTACT_FROM_EMAIL`.
3. Set the same three variables in Vercel → Project → Settings →
   Environment Variables for Production.

For stronger rate limiting on serverless (the in-memory limiter is
per-instance), add Upstash Redis or Vercel KV later — the handler is
structured so the check is one function swap.

## Deployment

See **DEPLOYMENT.md** for the full Vercel + GoDaddy/Cloudflare DNS
checklist (canonical apex domain, www → apex redirect, HTTPS, preview
noindex).

## Analytics (optional, currently off)

No analytics ship today, so no cookie banner is needed. To enable
privacy-conscious analytics later, prefer Vercel Analytics
(`@vercel/analytics`) or Plausible; if you enable Vercel Analytics, add
`https://va.vercel-scripts.com` to `script-src` in the CSP inside
`next.config.ts`, and update `/privacy`.

## Security posture

- Strict security headers + Content Security Policy in `next.config.ts`
- `.env*` git-ignored; `.env.example` contains placeholders only
- External links use `rel="noopener noreferrer"`
- Contact input validated and sanitized on the server (shared module in
  `src/lib/contact.ts`); JSON-LD serialized with `<` escaping
- No real personal, patient, Soldier, or client data anywhere in the repo

## Known remaining content requirements

See **CONTENT-CHECKLIST.md** — the authoritative list of items Sedjro
still needs to provide or confirm (portrait, résumé PDF, GitHub/LinkedIn
URLs, exact per-project tech stacks, screenshots, education dates, and
one product-positioning question about MyFreedomOps).
