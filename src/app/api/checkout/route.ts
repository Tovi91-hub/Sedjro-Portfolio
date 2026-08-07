import { NextResponse } from "next/server";
import { sanitizeLine } from "@/lib/contact";
import { isSameOriginRequest, sanitizeMemo } from "@/lib/request-guard";
import { site } from "@/data/site";

/**
 * Quick-pay endpoint: creates a Stripe Checkout Session on the Sedjro
 * Digital account for an amount the client and Sedjro have already agreed
 * on, then redirects the client to Stripe-hosted checkout.
 *
 * Security posture:
 * - STRIPE_SECRET_KEY lives server-side only; the browser never sees it.
 * - Amount is validated to a sane range; currency is fixed to USD.
 * - Card details are only ever entered on Stripe's hosted page — this site
 *   never touches payment credentials.
 * - Same-origin check plus best-effort per-IP rate limiting: the endpoint is
 *   necessarily unauthenticated, so these raise the cost of mass-creating
 *   Checkout sessions that would carry Sedjro Digital branding.
 * - The memo is charset-restricted (see sanitizeMemo) so a crafted link
 *   cannot show a phishing message or URL to a payer under our brand.
 */

const MIN_USD = 1;
const MAX_USD = 25_000;

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 10;
const hits = new Map<string, { count: number; windowStart: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now - entry.windowStart > WINDOW_MS) {
    hits.set(ip, { count: 1, windowStart: now });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ error: "forbidden_origin" }, { status: 403 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const input = body as Record<string, unknown>;
  const amountRaw =
    typeof input.amount === "number"
      ? input.amount
      : Number.parseFloat(typeof input.amount === "string" ? input.amount : "");
  const memo =
    typeof input.memo === "string" ? sanitizeMemo(sanitizeLine(input.memo)) : "";
  const email =
    typeof input.email === "string" ? sanitizeLine(input.email) : "";

  if (
    !Number.isFinite(amountRaw) ||
    amountRaw < MIN_USD ||
    amountRaw > MAX_USD
  ) {
    return NextResponse.json(
      { error: "invalid_amount", min: MIN_USD, max: MAX_USD },
      { status: 400 },
    );
  }
  if (email && !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  const amountCents = Math.round(amountRaw * 100);
  const description = memo || "Professional services";

  const params = new URLSearchParams({
    mode: "payment",
    "line_items[0][quantity]": "1",
    "line_items[0][price_data][currency]": "usd",
    "line_items[0][price_data][unit_amount]": String(amountCents),
    "line_items[0][price_data][product_data][name]": `Sedjro Digital — ${description}`,
    "payment_intent_data[description]": description,
    success_url: `${site.url}/pay/thanks?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${site.url}/pay?canceled=1`,
  });
  if (email) params.set("customer_email", email);

  try {
    const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    const session = (await res.json()) as { url?: string; error?: unknown };
    if (!res.ok || !session.url) {
      console.error("Stripe checkout session failed:", res.status);
      return NextResponse.json({ error: "checkout_failed" }, { status: 502 });
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout session error:", error);
    return NextResponse.json({ error: "checkout_failed" }, { status: 502 });
  }
}
