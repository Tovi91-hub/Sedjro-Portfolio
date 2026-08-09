import { CheckCircle2, CircleAlert, Clock } from "lucide-react";
import type { Metadata } from "next";
import { ButtonLink } from "@/components/Button";
import { fedapayConfig, getTransaction } from "@/lib/fedapay";
import { formatXof } from "@/lib/xof";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Paiement Mobile Money",
  description: "Confirmation de votre paiement Mobile Money.",
  alternates: { canonical: "/pay/mobile-money/thanks" },
  robots: { index: false },
};

/**
 * Return page from FedaPay's hosted checkout.
 *
 * FedaPay appends ?id=..&status=.. to the callback URL, but a visitor can
 * type anything there — so the query string is treated purely as a hint and
 * the real state is read back from the FedaPay API before we call anything
 * paid.
 */
export default async function MobileMoneyThanksPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const rawId = Array.isArray(params.id) ? params.id[0] : params.id;
  const id = Number.parseInt(rawId ?? "", 10);

  const config = fedapayConfig();
  const transaction =
    config && Number.isInteger(id) && id > 0
      ? await getTransaction(config, id)
      : null;

  const paid = transaction?.isPaid === true;
  const pending =
    transaction !== null && !paid && transaction.status === "pending";

  const heading = paid
    ? "Merci — paiement reçu"
    : pending
      ? "Paiement en cours de confirmation"
      : "Paiement non confirmé";

  const Icon = paid ? CheckCircle2 : pending ? Clock : CircleAlert;

  return (
    <section aria-label="Confirmation de paiement" className="hero-glow">
      <div className="container-site flex flex-col items-center py-24 text-center sm:py-32">
        <Icon
          className={paid ? "size-14 text-accent" : "size-14 text-gold"}
          aria-hidden="true"
        />
        <h1 className="mt-6 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          {heading}
        </h1>

        {paid && (
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
            Votre paiement
            {transaction?.amount ? ` de ${formatXof(transaction.amount)}` : ""}{" "}
            a bien été reçu par Sedjro Digital. Je vous recontacte rapidement
            pour la suite de votre projet.
          </p>
        )}

        {pending && (
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
            Votre opérateur n&apos;a pas encore confirmé le paiement. Si vous
            avez validé la transaction sur votre téléphone, elle sera
            confirmée d&apos;ici quelques instants — vous pouvez actualiser
            cette page.
          </p>
        )}

        {!paid && !pending && (
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
            Nous n&apos;avons pas pu confirmer ce paiement. Aucun montant
            n&apos;a été prélevé si la transaction n&apos;a pas abouti.
            {site.email.href ? (
              <>
                {" "}
                En cas de doute, écrivez-moi à{" "}
                <a
                  href={site.email.href}
                  className="font-medium text-accent underline-offset-2 hover:underline"
                >
                  {site.email.label}
                </a>
                .
              </>
            ) : null}
          </p>
        )}

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/">Retour à l&apos;accueil</ButtonLink>
          {!paid && (
            <ButtonLink href="/pay" variant="secondary">
              Réessayer le paiement
            </ButtonLink>
          )}
        </div>
      </div>
    </section>
  );
}
