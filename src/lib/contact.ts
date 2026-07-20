/**
 * Contact-form validation shared by the client form and the API route.
 * Keeping it in one module guarantees the two can never drift apart.
 */

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
  /** Honeypot — humans never fill this. */
  company?: string;
}

export interface ValidationResult {
  ok: boolean;
  errors: Partial<Record<keyof ContactPayload, string>>;
}

export const LIMITS = {
  name: 100,
  email: 200,
  subject: 150,
  message: 5000,
} as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(
  input: Partial<ContactPayload>,
): ValidationResult {
  const errors: ValidationResult["errors"] = {};

  const name = (input.name ?? "").trim();
  const email = (input.email ?? "").trim();
  const subject = (input.subject ?? "").trim();
  const message = (input.message ?? "").trim();

  if (!name) errors.name = "Please enter your name.";
  else if (name.length > LIMITS.name)
    errors.name = `Name must be ${LIMITS.name} characters or fewer.`;

  if (!email) errors.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(email) || email.length > LIMITS.email)
    errors.email = "Please enter a valid email address.";

  if (!subject) errors.subject = "Please enter a subject.";
  else if (subject.length > LIMITS.subject)
    errors.subject = `Subject must be ${LIMITS.subject} characters or fewer.`;

  if (!message) errors.message = "Please enter a message.";
  else if (message.length < 10)
    errors.message = "Please write a few more words so I can respond usefully.";
  else if (message.length > LIMITS.message)
    errors.message = `Message must be ${LIMITS.message} characters or fewer.`;

  return { ok: Object.keys(errors).length === 0, errors };
}

/** Strip control characters and normalize whitespace before use in email bodies. */
export function sanitizeLine(value: string): string {
  return value.replace(/[\u0000-\u001f\u007f]+/g, " ").trim();
}
