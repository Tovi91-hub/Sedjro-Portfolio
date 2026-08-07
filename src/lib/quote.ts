/**
 * Quote-request validation shared by the client form and the API route,
 * mirroring the contact-form pattern in lib/contact.ts.
 */

export interface QuotePayload {
  name: string;
  email: string;
  service: string;
  budget: string;
  timeline: string;
  details: string;
  /** Honeypot — humans never fill this. */
  company?: string;
}

export interface QuoteValidationResult {
  ok: boolean;
  errors: Partial<Record<keyof QuotePayload, string>>;
}

export const QUOTE_LIMITS = {
  name: 100,
  email: 200,
  details: 5000,
} as const;

export const BUDGET_OPTIONS = [
  "Under $1,000",
  "$1,000 – $3,000",
  "$3,000 – $10,000",
  "$10,000+",
  "Not sure yet",
] as const;

export const TIMELINE_OPTIONS = [
  "As soon as possible",
  "Within 1 month",
  "1–3 months",
  "Flexible",
] as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateQuote(
  input: Partial<QuotePayload>,
  serviceNames: readonly string[],
): QuoteValidationResult {
  const errors: QuoteValidationResult["errors"] = {};

  const name = (input.name ?? "").trim();
  const email = (input.email ?? "").trim();
  const service = (input.service ?? "").trim();
  const budget = (input.budget ?? "").trim();
  const timeline = (input.timeline ?? "").trim();
  const details = (input.details ?? "").trim();

  if (!name) errors.name = "Please enter your name.";
  else if (name.length > QUOTE_LIMITS.name)
    errors.name = `Name must be ${QUOTE_LIMITS.name} characters or fewer.`;

  if (!email) errors.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(email) || email.length > QUOTE_LIMITS.email)
    errors.email = "Please enter a valid email address.";

  if (!service) errors.service = "Please choose a service.";
  else if (!serviceNames.includes(service))
    errors.service = "Please choose a service from the list.";

  if (budget && !(BUDGET_OPTIONS as readonly string[]).includes(budget))
    errors.budget = "Please choose a budget range from the list.";

  if (timeline && !(TIMELINE_OPTIONS as readonly string[]).includes(timeline))
    errors.timeline = "Please choose a timeline from the list.";

  if (!details) errors.details = "Please describe your project.";
  else if (details.length < 10)
    errors.details =
      "Please write a few more words so I can respond usefully.";
  else if (details.length > QUOTE_LIMITS.details)
    errors.details = `Details must be ${QUOTE_LIMITS.details} characters or fewer.`;

  return { ok: Object.keys(errors).length === 0, errors };
}
