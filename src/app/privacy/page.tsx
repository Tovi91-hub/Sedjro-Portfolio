import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "Privacy practices for sedjrotovihouande.com — what information the site collects and how it is used.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <section aria-label="Privacy policy">
      <div className="container-site max-w-3xl py-16 sm:py-20">
        <SectionHeading eyebrow="Privacy" title="Privacy at a glance" as="h1" />

        <div className="mt-8 space-y-8 text-base leading-relaxed text-muted">
          <div>
            <h2 className="font-display text-lg font-semibold text-ink">
              What this site collects
            </h2>
            <p className="mt-2">
              This is a personal portfolio. It does not use advertising
              trackers, does not sell data, and does not set marketing cookies.
              The only personal information the site handles is what you choose
              to send through the contact form: your name, email address,
              subject, and message.
            </p>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-ink">
              How contact messages are used
            </h2>
            <p className="mt-2">
              Messages submitted through the contact form are delivered to
              {site.name} by email and used solely to respond to your inquiry.
              They are not shared with third parties beyond the email-delivery
              service that transmits them, and they are not used for marketing.
            </p>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-ink">
              Analytics
            </h2>
            <p className="mt-2">
              If privacy-conscious, cookie-free analytics are enabled in the
              future, they will collect only aggregated, anonymous usage
              statistics (such as page views), never personal profiles. This
              page will be updated if that changes.
            </p>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-ink">
              External links
            </h2>
            <p className="mt-2">
              Project pages link to live products and external profiles. Those
              sites have their own privacy practices, which this policy does not
              cover.
            </p>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-ink">
              Questions
            </h2>
            <p className="mt-2">
              For any privacy question or to request deletion of a message you
              sent,{" "}
              <a
                href="/contact"
                className="font-medium text-accent underline-offset-2 hover:underline"
              >
                get in touch
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
