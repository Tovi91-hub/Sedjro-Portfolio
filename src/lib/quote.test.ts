import { describe, expect, it } from "vitest";
import {
  BUDGET_OPTIONS,
  QUOTE_LIMITS,
  TIMELINE_OPTIONS,
  validateQuote,
} from "@/lib/quote";
import { services } from "@/data/services";

const names = services.map((s) => s.name);

const valid = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  service: names[0],
  budget: BUDGET_OPTIONS[1],
  timeline: TIMELINE_OPTIONS[0],
  details: "I need a marketing site for my consulting business.",
};

describe("validateQuote", () => {
  it("accepts a fully valid payload", () => {
    const result = validateQuote(valid, names);
    expect(result.ok).toBe(true);
    expect(result.errors).toEqual({});
  });

  it("accepts empty budget and timeline (optional fields)", () => {
    const result = validateQuote({ ...valid, budget: "", timeline: "" }, names);
    expect(result.ok).toBe(true);
  });

  it("rejects missing required fields", () => {
    const result = validateQuote({}, names);
    expect(result.ok).toBe(false);
    expect(result.errors.name).toBeTruthy();
    expect(result.errors.email).toBeTruthy();
    expect(result.errors.service).toBeTruthy();
    expect(result.errors.details).toBeTruthy();
  });

  it("rejects an unknown service", () => {
    const result = validateQuote({ ...valid, service: "Time travel" }, names);
    expect(result.ok).toBe(false);
    expect(result.errors.service).toBeTruthy();
  });

  it("rejects a tampered budget value", () => {
    const result = validateQuote({ ...valid, budget: "$1" }, names);
    expect(result.ok).toBe(false);
    expect(result.errors.budget).toBeTruthy();
  });

  it("rejects invalid email formats", () => {
    for (const email of ["nope", "a@b", "a b@c.com"]) {
      expect(validateQuote({ ...valid, email }, names).ok).toBe(false);
    }
  });

  it("enforces length limits", () => {
    const result = validateQuote(
      { ...valid, details: "x".repeat(QUOTE_LIMITS.details + 1) },
      names,
    );
    expect(result.ok).toBe(false);
    expect(result.errors.details).toBeTruthy();
  });
});
