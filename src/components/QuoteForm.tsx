"use client";

import { CheckCircle2, CircleAlert, Loader2, Send } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useId, useState } from "react";
import type { FormEvent } from "react";
import {
  BUDGET_OPTIONS,
  QUOTE_LIMITS,
  TIMELINE_OPTIONS,
  validateQuote,
} from "@/lib/quote";
import { services } from "@/data/services";
import { site } from "@/data/site";

type Status = "idle" | "submitting" | "success" | "error" | "unconfigured";

interface FieldErrors {
  name?: string;
  email?: string;
  service?: string;
  budget?: string;
  timeline?: string;
  details?: string;
}

const serviceNames = services.map((s) => s.name);

const inputCls =
  "h-11 w-full rounded-lg border border-border bg-surface px-3.5 text-sm text-ink placeholder:text-faint focus:border-accent";

/**
 * Request-a-quote form. Mirrors ContactForm's accessibility and graceful
 * degradation patterns; the `?service=` query param preselects a service so
 * offering cards can deep-link here.
 */
export function QuoteForm() {
  const id = useId();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});

  const preselected = searchParams.get("service");
  const defaultService =
    serviceNames.find(
      (name) =>
        name === preselected ||
        services.some((s) => s.slug === preselected && s.name === name),
    ) ?? "";

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      service: String(data.get("service") ?? ""),
      budget: String(data.get("budget") ?? ""),
      timeline: String(data.get("timeline") ?? ""),
      details: String(data.get("details") ?? ""),
      company: String(data.get("company") ?? ""),
    };

    const result = validateQuote(payload, serviceNames);
    setErrors(result.errors);
    if (!result.ok) {
      setStatus("idle");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/quote", {
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

  const fieldError = (field: keyof FieldErrors) =>
    errors[field] ? (
      <p
        id={`${id}-${field}-error`}
        className="mt-1.5 text-sm text-red-600 dark:text-red-400"
      >
        {errors[field]}
      </p>
    ) : null;

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-surface p-10 text-center"
      >
        <CheckCircle2 className="size-10 text-accent" aria-hidden="true" />
        <h3 className="font-display text-xl font-semibold">
          Request received
        </h3>
        <p className="max-w-sm text-sm leading-relaxed text-muted">
          Thank you — I&apos;ll review your project and reply with a proposal
          and quote, usually within 1–2 business days. Invoicing and payment
          run through Stripe, so everything stays simple and secure.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-2 text-sm font-medium text-accent hover:text-accent-strong"
        >
          Send another request
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
            maxLength={QUOTE_LIMITS.name}
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describedBy("name")}
            className={inputCls}
            placeholder="Your name"
          />
          {fieldError("name")}
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
            maxLength={QUOTE_LIMITS.email}
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy("email")}
            className={inputCls}
            placeholder="you@example.com"
          />
          {fieldError("email")}
        </div>
      </div>

      <div>
        <label
          htmlFor={`${id}-service`}
          className="mb-1.5 block text-sm font-medium"
        >
          Service
        </label>
        <select
          id={`${id}-service`}
          name="service"
          required
          defaultValue={defaultService}
          aria-invalid={Boolean(errors.service)}
          aria-describedby={describedBy("service")}
          className={inputCls}
        >
          <option value="" disabled>
            Choose a service…
          </option>
          {serviceNames.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
        {fieldError("service")}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor={`${id}-budget`}
            className="mb-1.5 block text-sm font-medium"
          >
            Budget <span className="font-normal text-faint">(optional)</span>
          </label>
          <select
            id={`${id}-budget`}
            name="budget"
            defaultValue=""
            aria-invalid={Boolean(errors.budget)}
            aria-describedby={describedBy("budget")}
            className={inputCls}
          >
            <option value="">Prefer not to say</option>
            {BUDGET_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {fieldError("budget")}
        </div>

        <div>
          <label
            htmlFor={`${id}-timeline`}
            className="mb-1.5 block text-sm font-medium"
          >
            Timeline <span className="font-normal text-faint">(optional)</span>
          </label>
          <select
            id={`${id}-timeline`}
            name="timeline"
            defaultValue=""
            aria-invalid={Boolean(errors.timeline)}
            aria-describedby={describedBy("timeline")}
            className={inputCls}
          >
            <option value="">Not sure yet</option>
            {TIMELINE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {fieldError("timeline")}
        </div>
      </div>

      <div>
        <label
          htmlFor={`${id}-details`}
          className="mb-1.5 block text-sm font-medium"
        >
          Project details
        </label>
        <textarea
          id={`${id}-details`}
          name="details"
          required
          rows={6}
          maxLength={QUOTE_LIMITS.details}
          aria-invalid={Boolean(errors.details)}
          aria-describedby={describedBy("details")}
          className="w-full rounded-lg border border-border bg-surface px-3.5 py-3 text-sm text-ink placeholder:text-faint focus:border-accent"
          placeholder="What are you building? Who is it for? Anything already in place (branding, content, existing site)…"
        />
        {fieldError("details")}
      </div>

      {status === "error" && (
        <p
          role="alert"
          className="flex items-start gap-2 rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300"
        >
          <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          Something went wrong sending your request. Please try again
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
            The request service is being set up.
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
            Request a quote
          </>
        )}
      </button>
    </form>
  );
}
