"use client";

import { CreditCard, Smartphone } from "lucide-react";
import { useState } from "react";
import { MobileMoneyPayForm } from "@/components/MobileMoneyPayForm";
import { QuickPayForm } from "@/components/QuickPayForm";
import { cn } from "@/lib/utils";

type Method = "card" | "mobile-money";

/**
 * Lets the payer choose how to pay: international card (Stripe, USD) or
 * mobile money for clients in Benin (FedaPay, FCFA).
 */
export function PayMethodTabs() {
  const [method, setMethod] = useState<Method>("card");

  const tab = (value: Method, label: string, sub: string, Icon: typeof CreditCard) => (
    <button
      key={value}
      type="button"
      role="tab"
      aria-selected={method === value}
      aria-controls={`panel-${value}`}
      id={`tab-${value}`}
      onClick={() => setMethod(value)}
      className={cn(
        "flex flex-1 items-start gap-3 rounded-xl border p-4 text-left transition-colors",
        method === value
          ? "border-accent bg-accent-soft"
          : "border-border bg-surface-2 hover:border-border-strong",
      )}
    >
      <span
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-lg",
          method === value
            ? "bg-accent text-white dark:text-[#0a1120]"
            : "bg-surface text-muted",
        )}
      >
        <Icon className="size-4" aria-hidden="true" />
      </span>
      <span>
        <span
          className={cn(
            "block text-sm font-semibold",
            method === value ? "text-accent" : "text-ink",
          )}
        >
          {label}
        </span>
        <span className="mt-0.5 block text-xs leading-relaxed text-muted">
          {sub}
        </span>
      </span>
    </button>
  );

  return (
    <div>
      <div role="tablist" aria-label="Payment method" className="flex gap-3">
        {tab("card", "Card", "Visa, Mastercard, Cash App, Klarna · USD", CreditCard)}
        {tab(
          "mobile-money",
          "Mobile Money",
          "MTN, Moov, Celtiis · Bénin · FCFA",
          Smartphone,
        )}
      </div>

      <div className="mt-6">
        <div
          role="tabpanel"
          id="panel-card"
          aria-labelledby="tab-card"
          hidden={method !== "card"}
        >
          {method === "card" && <QuickPayForm />}
        </div>
        <div
          role="tabpanel"
          id="panel-mobile-money"
          aria-labelledby="tab-mobile-money"
          hidden={method !== "mobile-money"}
        >
          {method === "mobile-money" && <MobileMoneyPayForm />}
        </div>
      </div>
    </div>
  );
}
