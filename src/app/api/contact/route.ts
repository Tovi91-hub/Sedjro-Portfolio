import { NextResponse } from "next/server";
import { sanitizeLine, validateContact } from "@/lib/contact";
import { site } from "@/data/site";

/**
 * Contact form endpoint.
 *
 * Security posture:
 * - All secrets live in server-side environment variables (.env.example
 *   documents them). Nothing sensitive ships to the client.
 * - Honeypot field: bots that fill "company" get a fake success and are
 *   dropped silently.
 * - Validation is shared with the client (lib/contact) and re-run here —
 *   the server never trusts the browser.
 * - Best-effort in-memory rate limiting per IP. For stronger guarantees on
 *   serverless (multiple instances), add Upstash/Vercel KV later — the
 *   shape is already in place.
 * - Graceful degradation: with no RESEND_API_KEY configured, returns 503 so
 *   the UI can offer a direct-email fallback.
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
    subject: typeof input.subject === "string" ? input.subject : "",
    message: typeof input.message === "string" ? input.message : "",
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

  const result = validateContact(payload);
  if (!result.ok) {
    return NextResponse.json({ errors: result.errors }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";

  if (!apiKey || !to) {
    // Service not configured yet — the client shows a direct-email fallback.
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  const name = sanitizeLine(payload.name);
  const email = sanitizeLine(payload.email);
  const subject = sanitizeLine(payload.subject);

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `${site.domain} contact <${from}>`,
        to: [to],
        reply_to: email,
        subject: `[Portfolio] ${subject}`,
        text: [
          `New contact form message from ${site.domain}`,
          ``,
          `Name: ${name}`,
          `Email: ${email}`,
          `Subject: ${subject}`,
          ``,
          payload.message.trim(),
        ].join("\n"),
      }),
    });

    if (!res.ok) {
      console.error("Contact email delivery failed:", res.status);
      return NextResponse.json({ error: "delivery_failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact email delivery error:", error);
    return NextResponse.json({ error: "delivery_failed" }, { status: 502 });
  }
}
