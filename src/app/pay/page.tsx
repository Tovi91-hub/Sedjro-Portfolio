import { FileText, Mail, ShieldCheck, Smartphone } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { PayMethodTabs } from "@/components/PayMethodTabs";
import { SectionHeading } from "@/components/SectionHeading";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Make a Payment",
  description:
    "Pay a Sedjro Digital invoice or make a project payment securely — international card via Stripe, or MTN, Moov, and Celtiis mobile money for clients in Benin.",
  alternates: { canonical: "/pay" },
  openGraph: {
    title: "Make a Payment | Sedjro Tovihouande",
    description:
      "Pay securely by card, or by MTN, Moov, or Celtiis mobile money if you're in Benin.",
    url: "/pay",
  },
};

export default function PayPage() {
  return (
    <section aria-label="Make a payment" className="hero-glow">
      <div className="container-site grid gap-12 py-16 sm:py-20 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <SectionHeading
            eyebrow="Payments"
            title="Make a payment"
            description="Pay Sedjro Digital (Tovihouande Group) by international card, or by mobile money if you're in Benin. Both run on secure hosted checkouts."
            as="h1"
          />

          <dl className="mt-8 space-y-5">
            <div className="flex gap-3.5">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
                <FileText className="size-5" aria-hidden="true" />
              </span>
              <div>
                <dt className="text-sm font-semibold">Received an invoice?</dt>
                <dd className="mt-1 text-sm leading-relaxed text-muted">
                  Invoices arrive by email from Stripe with a personal payment
                  link — the fastest way to pay is the{" "}
                  <span className="font-medium text-ink">Pay this invoice</span>{" "}
                  button in that email. It tracks your balance automatically.
                </dd>
              </div>
            </div>
            <div className="flex gap-3.5">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
                <ShieldCheck className="size-5" aria-hidden="true" />
              </span>
              <div>
                <dt className="text-sm font-semibold">Agreed on an amount?</dt>
                <dd className="mt-1 text-sm leading-relaxed text-muted">
                  Use the quick payment form to pay a deposit, milestone, or
                  balance we&apos;ve agreed on. You&apos;ll get an instant
                  receipt.
                </dd>
              </div>
            </div>
            <div className="flex gap-3.5">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
                <Smartphone className="size-5" aria-hidden="true" />
              </span>
              <div>
                <dt className="text-sm font-semibold">Au Bénin ?</dt>
                <dd className="mt-1 text-sm leading-relaxed text-muted">
                  Payez en FCFA avec MTN MoMo, Moov Money ou Celtiis Cash —
                  choisissez l&apos;onglet «&nbsp;Mobile Money&nbsp;», puis
                  confirmez sur votre téléphone.
                </dd>
              </div>
            </div>
            {site.email.href && (
              <div className="flex gap-3.5">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
                  <Mail className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <dt className="text-sm font-semibold">Questions?</dt>
                  <dd className="mt-1 text-sm text-muted">
                    Email{" "}
                    <a
                      href={site.email.href}
                      className="font-medium text-accent underline-offset-2 hover:underline"
                    >
                      {site.email.label}
                    </a>{" "}
                    — or{" "}
                    <Link
                      href="/contact"
                      className="font-medium text-accent underline-offset-2 hover:underline"
                    >
                      use the contact form
                    </Link>
                    .
                  </dd>
                </div>
              </div>
            )}
          </dl>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
          <h2 className="mb-5 font-display text-lg font-semibold">
            Quick payment
          </h2>
          <Suspense fallback={null}>
            <PayMethodTabs />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
