import { CreditCard, FileText, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { QuoteForm } from "@/components/QuoteForm";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Hire Me — Request a Quote",
  description:
    "Request a quote for website design & development, maintenance, AI & software consulting, AWS cloud consulting, or a SaaS platform subscription.",
  alternates: { canonical: "/hire" },
  openGraph: {
    title: "Hire Me | Sedjro Tovihouande",
    description:
      "Tell me about your project and receive a written proposal and quote — with professional Stripe invoicing and secure online payment.",
    url: "/hire",
  },
};

const reassurances = [
  {
    icon: FileText,
    title: "Written proposal",
    text: "Every project starts with a clear scope, timeline, and fixed quote — you know exactly what you're getting.",
  },
  {
    icon: CreditCard,
    title: "Professional invoicing",
    text: "Invoices come from Sedjro Digital through Stripe. Pay online by card, Cash App, Klarna, and more.",
  },
  {
    icon: ShieldCheck,
    title: "Secure by default",
    text: "Payment details are handled entirely by Stripe's PCI-compliant checkout — never by this site.",
  },
];

export default function HirePage() {
  return (
    <section aria-label="Request a quote" className="hero-glow">
      <div className="container-site grid gap-12 py-16 sm:py-20 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <SectionHeading
            eyebrow="Hire me"
            title="Request a quote"
            description="Tell me about your project — I'll reply with a proposal and a clear quote, usually within 1–2 business days."
            as="h1"
          />

          <dl className="mt-8 space-y-5">
            {reassurances.map((item) => (
              <div key={item.title} className="flex gap-3.5">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
                  <item.icon className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <dt className="text-sm font-semibold">{item.title}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-muted">
                    {item.text}
                  </dd>
                </div>
              </div>
            ))}
          </dl>

          <p className="mt-8 text-sm text-muted">
            Not sure which service fits?{" "}
            <Link
              href="/services"
              className="font-medium text-accent underline-offset-2 hover:underline"
            >
              Browse services
            </Link>{" "}
            or{" "}
            <Link
              href="/contact"
              className="font-medium text-accent underline-offset-2 hover:underline"
            >
              ask a question
            </Link>
            .
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
          <h2 className="sr-only">Quote request form</h2>
          <Suspense fallback={null}>
            <QuoteForm />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
