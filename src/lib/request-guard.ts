import { site } from "@/data/site";

/**
 * Shared request guards for the public POST endpoints.
 *
 * The API routes are unauthenticated by design (visitors must be able to
 * request quotes and pay), so the goal here is to raise the cost of drive-by
 * abuse — mail-bombing /api/quote, or mass-creating branded Stripe Checkout
 * sessions — without adding friction for real visitors.
 */

/** Hosts allowed to submit the site's forms. */
function allowedHosts(): string[] {
  const hosts = [site.domain, `www.${site.domain}`];
  // Vercel preview/prod deployments and local development.
  const vercel = process.env.VERCEL_URL;
  if (vercel) hosts.push(vercel);
  if (process.env.NODE_ENV !== "production") {
    hosts.push("localhost:3000", "127.0.0.1:3000");
  }
  return hosts;
}

/**
 * True when the request plausibly originates from this site's own pages.
 *
 * Browsers always attach Origin to cross-origin POSTs and to same-origin
 * POSTs from fetch(), so a missing *and* unmatched Origin/Referer means the
 * request did not come from our forms. This is a bot/abuse speed bump, not
 * an authentication mechanism — anything can forge these headers outside a
 * browser. It exists to stop opportunistic scripted abuse cheaply.
 */
export function isSameOriginRequest(request: Request): boolean {
  const hosts = allowedHosts();

  const origin = request.headers.get("origin");
  if (origin) {
    try {
      return hosts.includes(new URL(origin).host);
    } catch {
      return false;
    }
  }

  const referer = request.headers.get("referer");
  if (referer) {
    try {
      return hosts.includes(new URL(referer).host);
    } catch {
      return false;
    }
  }

  return false;
}

/**
 * Free-text that will be shown under the Sedjro Digital brand (the Stripe
 * Checkout line item, visible to whoever opens the payment link).
 *
 * Restricting the charset stops a crafted link from putting a phishing
 * message or URL in front of a payer while wearing our branding.
 */
const MEMO_ALLOWED = /[^A-Za-z0-9 .,'&()%\-–—/#:+]/g;

export function sanitizeMemo(value: string): string {
  const cleaned = value
    .replace(MEMO_ALLOWED, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 120);
  // Anything that still looks like a URL or address is dropped entirely.
  return /(https?:|www\.|@|\.[a-z]{2,}\b)/i.test(cleaned) ? "" : cleaned;
}
