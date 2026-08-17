import { NextResponse } from "next/server";

/**
 * Retired: card payments moved to SEDJRO DIGITAL LLC's own Stripe account.
 *
 * This endpoint used to create Checkout Sessions against acct_1U1ZAD..., which
 * legally belongs to MyVital Harmony LLC — so development revenue billed here
 * settled into the wrong entity. That account's secret key has been rotated and
 * SEDJRO DIGITAL LLC now bills from its own activated account.
 *
 * Kept as an explicit 410 rather than deleted so any stale client code fails
 * loudly with a pointer to the new location, instead of surfacing a confusing
 * Stripe authentication error.
 *
 * New payment surface: https://sedjrodigital.com/pay
 */

const PAY_URL = "https://sedjrodigital.com/pay";

export async function POST() {
  return NextResponse.json(
    {
      error: "moved",
      message: `Payments are now handled at ${PAY_URL}`,
      url: PAY_URL,
    },
    { status: 410 },
  );
}

export async function GET() {
  return NextResponse.redirect(PAY_URL, 307);
}
