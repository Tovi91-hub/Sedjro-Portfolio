import { site } from "@/data/site";

export { XOF_MAX, XOF_MIN, formatXof, isValidXofAmount } from "@/lib/xof";

/**
 * FedaPay — mobile money payments for clients in Benin (MTN MoMo, Moov
 * Money, Celtiis Cash).
 *
 * Design notes:
 * - Hosted checkout. We create a transaction, generate its payment token,
 *   and send the client to FedaPay's page, where they pick their operator
 *   and confirm on their handset. We never see or store a phone/PIN, and
 *   deliberately do not pass `mode` — letting the payer choose the operator
 *   is more robust than us guessing it.
 * - No SDK: raw fetch keeps this consistent with the Stripe route and adds
 *   no dependency.
 * - The whole module degrades to "not configured" until FEDAPAY_SECRET_KEY
 *   is set, so the feature can ship before the account is approved.
 */

export interface FedaPayConfig {
  secretKey: string;
  baseUrl: string;
}

/** Returns null when FedaPay is not configured — callers answer 503. */
export function fedapayConfig(): FedaPayConfig | null {
  const secretKey = process.env.FEDAPAY_SECRET_KEY;
  if (!secretKey) return null;

  // Default to sandbox: going live must be a deliberate act.
  const live = process.env.FEDAPAY_ENV === "live";
  return {
    secretKey,
    baseUrl: live
      ? "https://api.fedapay.com/v1"
      : "https://sandbox-api.fedapay.com/v1",
  };
}

/**
 * FedaPay v1 wraps single objects under a versioned key
 * (e.g. {"v1/transaction": {...}}). Unwrap defensively so a change in that
 * convention degrades to reading the body directly rather than crashing.
 */
function unwrap<T>(body: unknown, key: string): T {
  if (body && typeof body === "object") {
    const record = body as Record<string, unknown>;
    const wrapped = record[`v1/${key}`] ?? record[key];
    if (wrapped && typeof wrapped === "object") return wrapped as T;
  }
  return body as T;
}

async function fedapayFetch(
  config: FedaPayConfig,
  path: string,
  init: RequestInit = {},
): Promise<unknown> {
  const res = await fetch(`${config.baseUrl}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${config.secretKey}`,
      "Content-Type": "application/json",
      ...init.headers,
    },
    cache: "no-store",
  });

  const body = await res.json().catch(() => null);
  if (!res.ok) {
    // Never surface the provider's raw error to the browser — it can echo
    // request details back. Log server-side, throw something opaque.
    console.error("FedaPay request failed:", path, res.status);
    throw new Error(`fedapay_${res.status}`);
  }
  return body;
}

export interface CreatedTransaction {
  id: number;
  paymentUrl: string;
}

export interface CreateTransactionInput {
  amount: number;
  description: string;
  email?: string;
  firstname?: string;
  lastname?: string;
}

/**
 * Creates a pending transaction and returns its hosted payment URL.
 * The client is redirected there to choose MTN / Moov / Celtiis.
 */
export async function createTransaction(
  config: FedaPayConfig,
  input: CreateTransactionInput,
): Promise<CreatedTransaction> {
  const customer: Record<string, string> = {};
  if (input.email) customer.email = input.email;
  if (input.firstname) customer.firstname = input.firstname;
  if (input.lastname) customer.lastname = input.lastname;

  const created = unwrap<{ id?: number }>(
    await fedapayFetch(config, "/transactions", {
      method: "POST",
      body: JSON.stringify({
        description: input.description,
        amount: input.amount,
        currency: { iso: "XOF" },
        // No query string: FedaPay appends ?id=..&status=.. on return.
        callback_url: `${site.url}/pay/mobile-money/thanks`,
        ...(Object.keys(customer).length > 0 ? { customer } : {}),
      }),
    }),
    "transaction",
  );

  if (typeof created.id !== "number") {
    throw new Error("fedapay_missing_transaction_id");
  }

  const token = unwrap<{ url?: string }>(
    await fedapayFetch(config, `/transactions/${created.id}/token`, {
      method: "POST",
    }),
    "token",
  );

  // The token response is documented as flat {token, url}; unwrap() is a
  // no-op there but keeps us safe if it gets versioned like other objects.
  const url =
    typeof token.url === "string"
      ? token.url
      : ((token as { token?: { url?: string } }).token?.url ?? null);

  if (!url) throw new Error("fedapay_missing_payment_url");

  return { id: created.id, paymentUrl: url };
}

export interface TransactionStatus {
  id: number;
  status: string;
  amount: number | null;
  description: string | null;
  /** Only 'approved' means the money actually arrived. */
  isPaid: boolean;
}

/**
 * Reads a transaction back from FedaPay. Used on return from checkout:
 * the redirect's query string is attacker-controllable, so payment state is
 * always confirmed against the API before anything is shown as paid.
 */
export async function getTransaction(
  config: FedaPayConfig,
  id: number,
): Promise<TransactionStatus | null> {
  let body: unknown;
  try {
    body = await fedapayFetch(config, `/transactions/${id}`);
  } catch {
    return null;
  }

  const tx = unwrap<{
    id?: number;
    status?: string;
    amount?: number;
    description?: string;
  }>(body, "transaction");

  if (typeof tx.id !== "number" || typeof tx.status !== "string") return null;

  return {
    id: tx.id,
    status: tx.status,
    amount: typeof tx.amount === "number" ? tx.amount : null,
    description: typeof tx.description === "string" ? tx.description : null,
    isPaid: tx.status === "approved" || tx.status === "transferred",
  };
}
