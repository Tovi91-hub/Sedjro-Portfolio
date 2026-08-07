"use client";

import { CircleAlert, CreditCard, Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useId, useState } from "react";
import type { FormEvent } from "react";
import { site } from "@/data/site";

type Status = "idle" | "submitting" | "error" | "unconfigured";

const inputCls =
  "h-11 w-full rounded-lg border border-border bg-surface px-3.5 text-sm text-ink placeholder:text-faint focus:border-accent";

/**
 * Quick-pay form: the client enters the amount they've agreed with Sedjro
 * plus an optional memo, and is redirected to Stripe-hosted checkout on the
 * Sedjro Digital account. No card data ever touches this site.
 */
export function QuickPayForm() {
  const id = useId();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);

  const wasCanceled = searchParams.get("canceled") === "1";

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const amount = Number.parseFloat(String(data.get("amount") ?? ""));

    if (!Number.isFinite(amount) || amount < 1 || amount > 25000) {
      setMessage("Please enter an amount between $1 and $25,000.");
      setStatus("error");
      return;
    }

    setMessage(null);
    setStatus("submitting");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          memo: String(data.get("memo") ?? ""),
          email: String(data.get("email") ?? ""),
        }),
      });

      if (res.ok) {
        const body = (await res.json()) as { url: string };
        window.location.assign(body.url);
        return; // keep the spinner while the browser navigates to Stripe
      }
      if (res.status === 503) {
        setStatus("unconfigured");
        return;
      }
      setMessage(null);
      setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      {wasCanceled && status === "idle" && (
        <p
          role="status"
          className="rounded-lg border border-border bg-surface-2 p-3 text-sm text-muted"
        >
          Checkout was canceled — nothing was charged. You can start again
          whenever you&apos;re ready.
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor={`${id}-amount`}
            className="mb-1.5 block text-sm font-medium"
          >
            Amount (USD)
          </label>
          <div className="relative">
            <span
              aria-hidden="true"
              className="absolute inset-y-0 left-3.5 flex items-center text-sm text-faint"
            >
              $
            </span>
            <input
              id={`${id}-amount`}
              name="amount"
              type="number"
              inputMode="decimal"
              min={1}
              max={25000}
              step="0.01"
              required
              className={`${inputCls} pl-7`}
              placeholder="250.00"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor={`${id}-email`}
            className="mb-1.5 block text-sm font-medium"
          >
            Receipt email{" "}
            <span className="font-normal text-faint">(optional)</span>
          </label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            autoComplete="email"
            className={inputCls}
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor={`${id}-memo`}
          className="mb-1.5 block text-sm font-medium"
        >
          What is this payment for?{" "}
          <span className="font-normal text-faint">(optional)</span>
        </label>
        <input
          id={`${id}-memo`}
          name="memo"
          type="text"
          maxLength={200}
          className={inputCls}
          placeholder="e.g. Website project — deposit"
        />
      </div>

      {status === "error" && (
        <p
          role="alert"
          className="flex items-start gap-2 rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300"
        >
          <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          {message ??
            "Something went wrong starting checkout. Please try again in a moment."}
        </p>
      )}

      {status === "unconfigured" && (
        <p
          role="alert"
          className="flex items-start gap-2 rounded-lg border border-border bg-surface-2 p-3 text-sm text-muted"
        >
          <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          <span>
            Online payment is being set up.
            {site.email.href ? (
              <>
                {" "}
                Please email{" "}
                <a
                  href={site.email.href}
                  className="font-medium text-accent underline"
                >
                  {site.email.label}
                </a>{" "}
                and I&apos;ll send you a Stripe invoice instead.
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
            Opening secure checkout…
          </>
        ) : (
          <>
            <CreditCard className="size-4" aria-hidden="true" />
            Pay securely with Stripe
          </>
        )}
      </button>

      <p className="text-xs leading-relaxed text-faint">
        Payments are processed by Stripe on behalf of Sedjro Digital
        (Tovihouande Group). Card details are entered only on Stripe&apos;s
        secure checkout page — this site never sees them.
      </p>
    </form>
  );
}
