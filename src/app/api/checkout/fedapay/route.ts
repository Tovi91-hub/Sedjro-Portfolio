import { NextResponse } from "next/server";
import { sanitizeLine } from "@/lib/contact";
import { createTransaction, fedapayConfig } from "@/lib/fedapay";
import { isSameOriginRequest, sanitizeMemo } from "@/lib/request-guard";
import { XOF_MAX, XOF_MIN, isValidXofAmount } from "@/lib/xof";

/**
 * Mobile money checkout for clients in Benin (MTN, Moov, Celtiis) via
 * FedaPay's hosted payment page.
 *
 * Mirrors the Stripe route's posture: same-origin guard, per-IP rate limit,
 * server-side amount validation, charset-restricted description, secret key
 * server-side only, and a graceful 503 while FedaPay is unconfigured.
 */

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
  const rawAmount =
    typeof input.amount === "number"
      ? input.amount
      : Number.parseFloat(typeof input.amount === "string" ? input.amount : "");

  if (!isValidXofAmount(rawAmount)) {
    return NextResponse.json(
      { error: "invalid_amount", min: XOF_MIN, max: XOF_MAX },
      { status: 400 },
    );
  }

  const email =
    typeof input.email === "string" ? sanitizeLine(input.email) : "";
  if (email && !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  const name =
    typeof input.name === "string"
      ? sanitizeMemo(sanitizeLine(input.name)).slice(0, 80)
      : "";
  const memo =
    typeof input.memo === "string" ? sanitizeMemo(sanitizeLine(input.memo)) : "";

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  const config = fedapayConfig();
  if (!config) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  const [firstname, ...rest] = name.split(" ").filter(Boolean);

  try {
    const { paymentUrl } = await createTransaction(config, {
      amount: rawAmount,
      description: `Sedjro Digital — ${memo || "Prestation de services"}`,
      email: email || undefined,
      firstname: firstname || undefined,
      lastname: rest.length > 0 ? rest.join(" ") : undefined,
    });

    return NextResponse.json({ url: paymentUrl });
  } catch (error) {
    console.error("FedaPay checkout failed:", error);
    return NextResponse.json({ error: "checkout_failed" }, { status: 502 });
  }
}
