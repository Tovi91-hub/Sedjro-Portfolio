import { CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";
import { ButtonLink } from "@/components/Button";

export const metadata: Metadata = {
  title: "Payment Received",
  description: "Thank you — your payment was received.",
  alternates: { canonical: "/pay/thanks" },
  robots: { index: false },
};

export default function PayThanksPage() {
  return (
    <section aria-label="Payment received" className="hero-glow">
      <div className="container-site flex flex-col items-center py-24 text-center sm:py-32">
        <CheckCircle2 className="size-14 text-accent" aria-hidden="true" />
        <h1 className="mt-6 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Thank you — payment received
        </h1>
        <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
          Stripe has emailed you a receipt on behalf of Sedjro Digital. I&apos;ll
          follow up shortly to confirm next steps for your project.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/">Back to home</ButtonLink>
          <ButtonLink href="/services" variant="secondary">
            Browse services
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
