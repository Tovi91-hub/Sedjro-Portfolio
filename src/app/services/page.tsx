import {
  ArrowRight,
  Bot,
  Check,
  Cloud,
  CreditCard,
  FileText,
  Globe,
  Layers,
  MessageSquare,
  Wrench,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";
import { priceLabel, services } from "@/data/services";
import type { ServiceOffering } from "@/types/portfolio";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Professional services by Sedjro Tovihouande through Sedjro Digital: website design & development, maintenance, AI & software consulting, AWS cloud consulting, and SaaS platforms.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services | Sedjro Tovihouande",
    description:
      "Website design & development, maintenance plans, AI & software consulting, AWS cloud consulting, and SaaS platforms — with professional invoicing and secure Stripe payment.",
    url: "/services",
  },
};

const icons: Record<ServiceOffering["icon"], typeof Globe> = {
  globe: Globe,
  wrench: Wrench,
  bot: Bot,
  cloud: Cloud,
  layers: Layers,
};

const steps = [
  {
    icon: MessageSquare,
    title: "1 · Tell me about your project",
    text: "Request a quote in two minutes. I reply within 1–2 business days, usually with a few sharpening questions.",
  },
  {
    icon: FileText,
    title: "2 · Proposal & agreement",
    text: "You receive a written proposal with scope, timeline, and a fixed quote — plus a simple service agreement, so expectations are clear on both sides.",
  },
  {
    icon: CreditCard,
    title: "3 · Invoice & delivery",
    text: "Work is invoiced through Stripe by Sedjro Digital. You pay online by card, Cash App, Klarna, and more — no checks, no chasing.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <section aria-label="Services" className="hero-glow">
        <div className="container-site py-16 sm:py-20">
          <SectionHeading
            eyebrow="Services"
            title="Work with me"
            description="I design, build, and operate digital platforms for small businesses and founders. Every engagement runs through Sedjro Digital with a written proposal, professional invoicing, and secure online payment."
            as="h1"
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {services.map((service) => {
              const Icon = icons[service.icon];
              return (
                <article
                  key={service.slug}
                  className="card-lift flex flex-col rounded-2xl border border-border bg-surface p-6 sm:p-8"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="rounded-full border border-border bg-surface-2 px-3 py-1 text-sm font-semibold whitespace-nowrap text-accent">
                      {priceLabel(service)}
                    </span>
                  </div>

                  <h2 className="mt-5 font-display text-xl font-semibold tracking-tight">
                    {service.name}
                  </h2>
                  <p className="mt-1 text-sm font-medium text-muted">
                    {service.tagline}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {service.description}
                  </p>

                  <ul className="mt-4 space-y-2">
                    {service.deliverables.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-muted"
                      >
                        <Check
                          className="mt-0.5 size-4 shrink-0 text-accent"
                          aria-hidden="true"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex-1" />
                  <ButtonLink
                    href={`/hire?service=${encodeURIComponent(service.slug)}`}
                    variant="secondary"
                    className="self-start"
                  >
                    Request this service
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </ButtonLink>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section aria-labelledby="process-heading" className="border-t border-border">
        <div className="container-site py-16 sm:py-20">
          <SectionHeading
            eyebrow="How it works"
            title="A professional process, start to finish"
            description="No surprises: the same clear steps for every client and every project."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.title}
                className="rounded-2xl border border-border bg-surface p-6"
              >
                <span className="flex size-10 items-center justify-center rounded-lg bg-accent-soft text-accent">
                  <step.icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-display text-base font-semibold">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-muted">
            Already have an invoice or an agreed amount?{" "}
            <Link
              href="/pay"
              className="font-medium text-accent underline-offset-2 hover:underline"
            >
              Make a payment →
            </Link>
          </p>
        </div>
      </section>

      <section aria-labelledby="services-cta" className="border-t border-border">
        <div className="container-site py-16 sm:py-20">
          <div className="relative overflow-hidden rounded-2xl border border-border bg-surface px-6 py-14 text-center hero-glow sm:px-12">
            <div
              aria-hidden="true"
              className="absolute inset-x-10 top-0 h-px hairline"
            />
            <div aria-hidden="true" className="absolute inset-0 dot-grid" />
            <h2
              id="services-cta"
              className="relative font-display text-2xl font-semibold tracking-tight text-balance sm:text-4xl"
            >
              Ready to start your project?
            </h2>
            <p className="relative mx-auto mt-3 max-w-xl text-base leading-relaxed text-muted">
              Tell me what you&apos;re building and I&apos;ll come back with a
              plan, a timeline, and a clear quote.
            </p>
            <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
              <ButtonLink href="/hire" size="lg">
                Request a quote
                <ArrowRight className="size-4" aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href="/contact" variant="secondary" size="lg">
                Ask a question first
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
