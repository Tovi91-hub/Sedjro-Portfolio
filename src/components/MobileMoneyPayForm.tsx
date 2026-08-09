"use client";

import { CircleAlert, Loader2, Smartphone } from "lucide-react";
import { useId, useState } from "react";
import type { FormEvent } from "react";
import { XOF_MAX, XOF_MIN, formatXof } from "@/lib/xof";
import { site } from "@/data/site";

type Status = "idle" | "submitting" | "error" | "unconfigured";

const inputCls =
  "h-11 w-full rounded-lg border border-border bg-surface px-3.5 text-sm text-ink placeholder:text-faint focus:border-accent";

/**
 * Mobile money payment for clients in Benin. Collects the agreed amount in
 * FCFA and hands off to FedaPay's hosted page, where the payer chooses MTN
 * MoMo, Moov Money, or Celtiis Cash and confirms on their phone. No phone
 * number or PIN is ever entered on this site.
 */
export function MobileMoneyPayForm() {
  const id = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const amount = Number.parseFloat(String(data.get("amount") ?? ""));

    if (!Number.isInteger(amount) || amount < XOF_MIN || amount > XOF_MAX) {
      setMessage(
        `Veuillez saisir un montant entier entre ${formatXof(XOF_MIN)} et ${formatXof(XOF_MAX)}.`,
      );
      setStatus("error");
      return;
    }

    setMessage(null);
    setStatus("submitting");
    try {
      const res = await fetch("/api/checkout/fedapay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          name: String(data.get("name") ?? ""),
          email: String(data.get("email") ?? ""),
          memo: String(data.get("memo") ?? ""),
        }),
      });

      if (res.ok) {
        const body = (await res.json()) as { url: string };
        window.location.assign(body.url);
        return; // keep the spinner while the browser leaves for FedaPay
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
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor={`${id}-amount`}
            className="mb-1.5 block text-sm font-medium"
          >
            Montant (FCFA)
          </label>
          <input
            id={`${id}-amount`}
            name="amount"
            type="number"
            inputMode="numeric"
            min={XOF_MIN}
            max={XOF_MAX}
            step={1}
            required
            className={inputCls}
            placeholder="50000"
          />
        </div>

        <div>
          <label
            htmlFor={`${id}-mm-name`}
            className="mb-1.5 block text-sm font-medium"
          >
            Nom <span className="font-normal text-faint">(facultatif)</span>
          </label>
          <input
            id={`${id}-mm-name`}
            name="name"
            type="text"
            autoComplete="name"
            maxLength={80}
            className={inputCls}
            placeholder="Votre nom"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor={`${id}-mm-email`}
          className="mb-1.5 block text-sm font-medium"
        >
          Email <span className="font-normal text-faint">(facultatif)</span>
        </label>
        <input
          id={`${id}-mm-email`}
          name="email"
          type="email"
          autoComplete="email"
          className={inputCls}
          placeholder="vous@exemple.com"
        />
      </div>

      <div>
        <label
          htmlFor={`${id}-mm-memo`}
          className="mb-1.5 block text-sm font-medium"
        >
          Objet du paiement{" "}
          <span className="font-normal text-faint">(facultatif)</span>
        </label>
        <input
          id={`${id}-mm-memo`}
          name="memo"
          type="text"
          maxLength={120}
          className={inputCls}
          placeholder="ex. Site web — acompte"
        />
      </div>

      {status === "error" && (
        <p
          role="alert"
          className="flex items-start gap-2 rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300"
        >
          <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          {message ??
            "Le paiement n'a pas pu démarrer. Veuillez réessayer dans un instant."}
        </p>
      )}

      {status === "unconfigured" && (
        <p
          role="alert"
          className="flex items-start gap-2 rounded-lg border border-border bg-surface-2 p-3 text-sm text-muted"
        >
          <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          <span>
            Le paiement Mobile Money arrive bientôt.
            {site.email.href ? (
              <>
                {" "}
                En attendant, écrivez-moi à{" "}
                <a
                  href={site.email.href}
                  className="font-medium text-accent underline"
                >
                  {site.email.label}
                </a>{" "}
                et je vous enverrai les instructions de paiement.
              </>
            ) : null}
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
            Ouverture du paiement…
          </>
        ) : (
          <>
            <Smartphone className="size-4" aria-hidden="true" />
            Payer par Mobile Money
          </>
        )}
      </button>

      <p className="text-xs leading-relaxed text-faint">
        Paiement sécurisé par FedaPay pour Sedjro Digital. Vous choisirez MTN
        MoMo, Moov Money ou Celtiis Cash sur la page suivante et confirmerez
        sur votre téléphone — votre numéro et votre code secret ne sont jamais
        saisis sur ce site.
      </p>
    </form>
  );
}
