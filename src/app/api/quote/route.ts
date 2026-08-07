import { NextResponse } from "next/server";
import { sanitizeLine } from "@/lib/contact";
import { validateQuote } from "@/lib/quote";
import { services } from "@/data/services";
import { site } from "@/data/site";

/**
 * Request-a-quote endpoint. Same security posture as /api/contact:
 * honeypot, shared validation re-run server-side, best-effort per-IP rate
 * limiting, and a 503 fallback while the email service is unconfigured.
 */

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_PER_WINDOW = 5;
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

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const input = body as Record<string, unknown>;
  const payload = {
    name: typeof input.name === "string" ? input.name : "",
    email: typeof input.email === "string" ? input.email : "",
    service: typeof input.service === "string" ? input.service : "",
    budget: typeof input.budget === "string" ? input.budget : "",
    timeline: typeof input.timeline === "string" ? input.timeline : "",
    details: typeof input.details === "string" ? input.details : "",
    company: typeof input.company === "string" ? input.company : "",
  };

  // Honeypot: real users never fill this. Pretend success, deliver nothing.
  if (payload.company.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  const result = validateQuote(
    payload,
    services.map((s) => s.name),
  );
  if (!result.ok) {
    return NextResponse.json({ errors: result.errors }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";

  if (!apiKey || !to) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  const name = sanitizeLine(payload.name);
  const email = sanitizeLine(payload.email);
  const service = sanitizeLine(payload.service);

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `${site.domain} quotes <${from}>`,
        to: [to],
        reply_to: email,
        subject: `[Quote request] ${service} — ${name}`,
        text: [
          `New quote request from ${site.domain}`,
          ``,
          `Name: ${name}`,
          `Email: ${email}`,
          `Service: ${service}`,
          `Budget: ${sanitizeLine(payload.budget) || "—"}`,
          `Timeline: ${sanitizeLine(payload.timeline) || "—"}`,
          ``,
          `Project details:`,
          payload.details.trim(),
          ``,
          `Next step: reply to the client, then send a Stripe invoice from the`,
          `Sedjro Digital dashboard (Product catalog has all standard services).`,
        ].join("\n"),
      }),
    });

    if (!res.ok) {
      console.error("Quote email delivery failed:", res.status);
      return NextResponse.json({ error: "delivery_failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Quote email delivery error:", error);
    return NextResponse.json({ error: "delivery_failed" }, { status: 502 });
  }
}
