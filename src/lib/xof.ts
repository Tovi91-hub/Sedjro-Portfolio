/**
 * XOF (West African CFA franc) helpers.
 *
 * Kept in their own module — with no reference to any secret or env var —
 * so client components can import the bounds and formatter without pulling
 * in the FedaPay server client.
 */

/** XOF has no minor unit: amounts are whole francs. */
export const XOF_MIN = 100;
export const XOF_MAX = 1_000_000;

/** True when the value is a whole number of francs within accepted bounds. */
export function isValidXofAmount(value: unknown): value is number {
  const amount =
    typeof value === "number"
      ? value
      : Number.parseFloat(typeof value === "string" ? value : "");
  return (
    Number.isFinite(amount) &&
    Number.isInteger(amount) &&
    amount >= XOF_MIN &&
    amount <= XOF_MAX
  );
}

/** "12 500 F CFA" */
export function formatXof(amount: number): string {
  return new Intl.NumberFormat("fr-BJ", {
    style: "currency",
    currency: "XOF",
    maximumFractionDigits: 0,
  }).format(amount);
}
