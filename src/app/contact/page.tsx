import { Clock, Mail, MessageSquare } from "lucide-react";
import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { SectionHeading } from "@/components/SectionHeading";
import { SocialLinks } from "@/components/SocialLinks";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Sedjro Tovihouande about software development, cloud engineering, technical collaboration, or employment opportunities.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact | Sedjro Tovihouande",
    description:
      "Get in touch about software development, cloud engineering, collaboration, or opportunities.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <section aria-label="Contact" className="hero-glow">
      <div className="container-site grid gap-12 py-16 sm:py-20 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title="Let's talk"
            description="Whether it's a software engineering role, a cloud project, a collaboration, or a product idea — I'd like to hear about it."
            as="h1"
          />

          <dl className="mt-8 space-y-5">
            <div className="flex gap-3.5">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
                <MessageSquare className="size-5" aria-hidden="true" />
              </span>
              <div>
                <dt className="text-sm font-semibold">Good topics</dt>
                <dd className="mt-1 text-sm leading-relaxed text-muted">
                  Software development and cloud engineering roles, technical
                  collaboration, product partnerships, and consulting.
                </dd>
              </div>
            </div>
            {site.email.href && (
              <div className="flex gap-3.5">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
                  <Mail className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <dt className="text-sm font-semibold">Email</dt>
                  <dd className="mt-1 text-sm text-muted">
                    <a
                      href={site.email.href}
                      className="font-medium text-accent underline-offset-2 hover:underline"
                    >
                      {site.email.label}
                    </a>
                  </dd>
                </div>
              </div>
            )}
            <div className="flex gap-3.5">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
                <Clock className="size-5" aria-hidden="true" />
              </span>
              <div>
                <dt className="text-sm font-semibold">Response time</dt>
                <dd className="mt-1 text-sm leading-relaxed text-muted">
                  I read every message and typically respond within a few days.
                </dd>
              </div>
            </div>
          </dl>

          <div className="mt-8">
            <SocialLinks />
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
          <h2 className="sr-only">Contact form</h2>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
