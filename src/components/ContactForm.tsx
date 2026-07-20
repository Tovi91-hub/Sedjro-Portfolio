"use client";

import { CheckCircle2, CircleAlert, Loader2, Send } from "lucide-react";
import { useId, useState } from "react";
import type { FormEvent } from "react";
import { LIMITS, validateContact } from "@/lib/contact";
import { site } from "@/data/site";

type Status = "idle" | "submitting" | "success" | "error" | "unconfigured";

interface FieldErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

/**
 * Accessible contact form.
 *
 * - Client-side validation mirrors the server (shared module in lib/contact).
 * - Honeypot field ("company") for basic spam prevention.
 * - Graceful degradation: if the email service isn't configured yet, the
 *   API returns 503 and the form offers a direct email fallback instead of
 *   failing silently.
 * - No secrets in client code — delivery happens server-side only.
 */
export function ContactForm() {
  const id = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      subject: String(data.get("subject") ?? ""),
      message: String(data.get("message") ?? ""),
      company: String(data.get("company") ?? ""),
    };

    const result = validateContact(payload);
    setErrors(result.errors);
    if (!result.ok) {
      setStatus("idle");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else if (res.status === 503) {
        setStatus("unconfigured");
      } else if (res.status === 400) {
        const body = (await res.json()) as { errors?: FieldErrors };
        setErrors(body.errors ?? {});
        setStatus("idle");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const describedBy = (field: keyof FieldErrors) =>
    errors[field] ? `${id}-${field}-error` : undefined;

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-surface p-10 text-center"
      >
        <CheckCircle2 className="size-10 text-accent" aria-hidden="true" />
        <h3 className="font-display text-xl font-semibold">Message sent</h3>
        <p className="max-w-sm text-sm leading-relaxed text-muted">
          Thank you for reaching out. I read every message and will get back to
          you as soon as I can.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-2 text-sm font-medium text-accent hover:text-accent-strong"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      {/* Honeypot — hidden from real users, tempting to bots. */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor={`${id}-company`}>
          Company (leave this field empty)
        </label>
        <input
          id={`${id}-company`}
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor={`${id}-name`}
            className="mb-1.5 block text-sm font-medium"
          >
            Name
          </label>
          <input
            id={`${id}-name`}
            name="name"
            type="text"
            required
            maxLength={LIMITS.name}
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describedBy("name")}
            className="h-11 w-full rounded-lg border border-border bg-surface px-3.5 text-sm text-ink placeholder:text-faint focus:border-accent"
            placeholder="Your name"
          />
          {errors.name && (
            <p
              id={`${id}-name-error`}
              className="mt-1.5 text-sm text-red-600 dark:text-red-400"
            >
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor={`${id}-email`}
            className="mb-1.5 block text-sm font-medium"
          >
            Email
          </label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            required
            maxLength={LIMITS.email}
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy("email")}
            className="h-11 w-full rounded-lg border border-border bg-surface px-3.5 text-sm text-ink placeholder:text-faint focus:border-accent"
            placeholder="you@example.com"
          />
          {errors.email && (
            <p
              id={`${id}-email-error`}
              className="mt-1.5 text-sm text-red-600 dark:text-red-400"
            >
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor={`${id}-subject`}
          className="mb-1.5 block text-sm font-medium"
        >
          Subject
        </label>
        <input
          id={`${id}-subject`}
          name="subject"
          type="text"
          required
          maxLength={LIMITS.subject}
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={describedBy("subject")}
          className="h-11 w-full rounded-lg border border-border bg-surface px-3.5 text-sm text-ink placeholder:text-faint focus:border-accent"
          placeholder="What would you like to discuss?"
        />
        {errors.subject && (
          <p
            id={`${id}-subject-error`}
            className="mt-1.5 text-sm text-red-600 dark:text-red-400"
          >
            {errors.subject}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor={`${id}-message`}
          className="mb-1.5 block text-sm font-medium"
        >
          Message
        </label>
        <textarea
          id={`${id}-message`}
          name="message"
          required
          rows={6}
          maxLength={LIMITS.message}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={describedBy("message")}
          className="w-full rounded-lg border border-border bg-surface px-3.5 py-3 text-sm text-ink placeholder:text-faint focus:border-accent"
          placeholder="Tell me about the role, project, or idea…"
        />
        {errors.message && (
          <p
            id={`${id}-message-error`}
            className="mt-1.5 text-sm text-red-600 dark:text-red-400"
          >
            {errors.message}
          </p>
        )}
      </div>

      {status === "error" && (
        <p
          role="alert"
          className="flex items-start gap-2 rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300"
        >
          <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          Something went wrong sending your message. Please try again
          {site.email.href ? (
            <>
              {" "}
              or email me directly at{" "}
              <a href={site.email.href} className="font-medium underline">
                {site.email.label}
              </a>
            </>
          ) : null}
          .
        </p>
      )}

      {status === "unconfigured" && (
        <p
          role="alert"
          className="flex items-start gap-2 rounded-lg border border-border bg-surface-2 p-3 text-sm text-muted"
        >
          <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          <span>
            The contact service is being set up.
            {site.email.href ? (
              <>
                {" "}
                In the meantime, please email me directly at{" "}
                <a
                  href={site.email.href}
                  className="font-medium text-accent underline"
                >
                  {site.email.label}
                </a>
                .
              </>
            ) : (
              " Please check back soon."
            )}
          </span>
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex h-12 items-center gap-2 rounded-lg bg-accent px-6 text-base font-medium text-white transition-colors hover:bg-accent-strong disabled:cursor-not-allowed disabled:opacity-60 dark:font-semibold dark:text-[#0a1120]"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          <>
            <Send className="size-4" aria-hidden="true" />
            Send message
          </>
        )}
      </button>
    </form>
  );
}
