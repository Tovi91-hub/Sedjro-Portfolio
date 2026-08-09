import { describe, expect, it } from "vitest";
import { XOF_MAX, XOF_MIN, formatXof, isValidXofAmount } from "@/lib/xof";

describe("isValidXofAmount", () => {
  it("accepts whole francs inside the bounds", () => {
    expect(isValidXofAmount(XOF_MIN)).toBe(true);
    expect(isValidXofAmount(50_000)).toBe(true);
    expect(isValidXofAmount(XOF_MAX)).toBe(true);
    expect(isValidXofAmount("25000")).toBe(true);
  });

  it("rejects fractional amounts — XOF has no minor unit", () => {
    expect(isValidXofAmount(1000.5)).toBe(false);
    expect(isValidXofAmount("999.99")).toBe(false);
  });

  it("rejects out-of-range amounts", () => {
    expect(isValidXofAmount(XOF_MIN - 1)).toBe(false);
    expect(isValidXofAmount(XOF_MAX + 1)).toBe(false);
    expect(isValidXofAmount(0)).toBe(false);
    expect(isValidXofAmount(-5000)).toBe(false);
  });

  it("rejects non-numeric and hostile input", () => {
    for (const value of [
      "abc",
      "",
      null,
      undefined,
      {},
      [],
      Number.NaN,
      Number.POSITIVE_INFINITY,
      "Infinity",
      "1e9",
    ]) {
      expect(isValidXofAmount(value)).toBe(false);
    }
  });
});

describe("formatXof", () => {
  it("renders whole francs with no decimals", () => {
    const formatted = formatXof(12_500);
    expect(formatted).toContain("12");
    expect(formatted).not.toContain(",00");
    expect(formatted).not.toContain(".00");
  });
});
