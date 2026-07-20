# Deployment guide — Vercel + sedjrotovihouande.com

The canonical production URL is **https://sedjrotovihouande.com** (apex).
`www.sedjrotovihouande.com` permanently redirects to the apex.

## 1. Push to GitHub

```bash
# from the project root (git history is already initialized)
git remote add origin https://github.com/<your-username>/sedjro-portfolio.git
git push -u origin main
```

## 2. Create the Vercel project

1. vercel.com → **Add New → Project** → import `sedjro-portfolio`.
2. Framework preset: **Next.js** (auto-detected). No build overrides needed
   (`npm run build`).
3. Before the first production deploy, add Environment Variables
   (Settings → Environment Variables):
   - `RESEND_API_KEY` — Production (and Preview if you want the form live there)
   - `CONTACT_TO_EMAIL` — Production
   - `CONTACT_FROM_EMAIL` — Production (after verifying the domain in Resend)
   - `NEXT_PUBLIC_NOINDEX=true` — **Preview environment only** (keeps
     staging deployments out of search engines; robots.txt and meta robots
     both respect it)
4. Deploy. Verify the `*.vercel.app` URL renders correctly.

## 3. Connect the custom domain

Vercel → Project → Settings → **Domains**:

1. Add `sedjrotovihouande.com` → mark as **Primary**.
2. Add `www.sedjrotovihouande.com` → choose **Redirect to
   sedjrotovihouande.com (308 Permanent)**. Vercel handles the www → apex
   redirect at the edge; no code changes needed.

## 4. DNS

### Option A — keep DNS at GoDaddy (simplest)

In GoDaddy → DNS management for sedjrotovihouande.com, create the records
Vercel shows on the Domains screen (use Vercel's displayed values as the
source of truth; these are the current defaults):

| Type  | Name | Value                  |
| ----- | ---- | ---------------------- |
| A     | @    | `76.76.21.21`          |
| CNAME | www  | `cname.vercel-dns.com` |

Remove any conflicting GoDaddy "Domain Forwarding" or parked-page A/CNAME
records on `@` and `www`.

### Option B — move DNS to Cloudflare

1. Add the site in Cloudflare, import records, and change nameservers at
   GoDaddy to the two Cloudflare-assigned nameservers.
2. Create the same A/CNAME records as above.
3. **Set both records to "DNS only" (grey cloud), not proxied.** Vercel
   terminates TLS itself; proxying through Cloudflare can cause redirect
   loops unless SSL mode is Full (Strict) — grey-cloud is the reliable
   setup.

DNS changes propagate in minutes to a few hours.

## 5. HTTPS

Vercel provisions and renews Let's Encrypt certificates automatically for
both hostnames once DNS resolves. `Strict-Transport-Security` (HSTS with
preload) is already set in `next.config.ts`.

## 6. Post-deploy checklist

- [ ] `https://sedjrotovihouande.com` loads with a valid certificate
- [ ] `https://www.sedjrotovihouande.com` 308-redirects to the apex
- [ ] `http://` upgrades to `https://`
- [ ] `/sitemap.xml` and `/robots.txt` respond, and robots references the sitemap
- [ ] Contact form: submit a test message end to end (or confirm the
      graceful 503 fallback if Resend isn't configured yet)
- [ ] Share a URL in Slack/LinkedIn/iMessage — OG image renders
- [ ] Preview deployments show `noindex` (view source → meta robots)
- [ ] Search Console: add the domain property and submit `/sitemap.xml`
- [ ] Run Lighthouse on the production URL (Performance ≥ 90,
      Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95 targets)

## Notes

- Every page is statically generated except `/api/contact`; there is
  nothing to cache-configure — Vercel serves the static output from its CDN.
- CSP lives in `next.config.ts`. If you later add Vercel Analytics, append
  `https://va.vercel-scripts.com` to `script-src`.
- Known dependency advisory (July 2026): Next.js 16.2.x bundles a postcss
  version with a moderate advisory (GHSA-qx2v-qp2m-jg93); the fix is only
  in Next canary. It does not affect this site's runtime (no user CSS is
  stringified). Re-run `npm audit` after the next stable Next.js release
  and update.
