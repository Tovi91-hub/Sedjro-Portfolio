import { describe, expect, it } from "vitest";
import { isSameOriginRequest, sanitizeMemo } from "@/lib/request-guard";
import { site } from "@/data/site";

const req = (headers: Record<string, string>) =>
  new Request("https://example.com/api/checkout", {
    method: "POST",
    headers,
  });

describe("isSameOriginRequest", () => {
  it("accepts the apex and www origins", () => {
    expect(isSameOriginRequest(req({ origin: site.url }))).toBe(true);
    expect(
      isSameOriginRequest(req({ origin: `https://www.${site.domain}` })),
    ).toBe(true);
  });

  it("accepts a referer from our own pages when origin is absent", () => {
    expect(isSameOriginRequest(req({ referer: `${site.url}/pay` }))).toBe(true);
  });

  it("rejects foreign origins", () => {
    expect(isSameOriginRequest(req({ origin: "https://evil.example.com" }))).toBe(
      false,
    );
    expect(
      isSameOriginRequest(req({ referer: "https://evil.example.com/x" })),
    ).toBe(false);
  });

  it("rejects a look-alike domain that merely contains ours", () => {
    expect(
      isSameOriginRequest(req({ origin: `https://${site.domain}.evil.com` })),
    ).toBe(false);
  });

  it("rejects requests with no origin or referer at all", () => {
    expect(isSameOriginRequest(req({}))).toBe(false);
  });

  it("rejects a malformed origin header", () => {
    expect(isSameOriginRequest(req({ origin: "not a url" }))).toBe(false);
  });
});

describe("sanitizeMemo", () => {
  it("keeps ordinary business descriptions intact", () => {
    expect(sanitizeMemo("Website project - deposit (50%)")).toBe(
      "Website project - deposit (50%)",
    );
    expect(sanitizeMemo("AWS consulting: 6 hours, March")).toBe(
      "AWS consulting: 6 hours, March",
    );
  });

  it("drops memos containing URLs or email addresses", () => {
    expect(sanitizeMemo("Pay at https://evil.example.com")).toBe("");
    expect(sanitizeMemo("contact evil@example.com now")).toBe("");
    expect(sanitizeMemo("go to www.evil.com")).toBe("");
  });

  it("strips script and markup characters", () => {
    expect(sanitizeMemo("<script>alert(1)</script>")).not.toContain("<");
    expect(sanitizeMemo("<script>alert(1)</script>")).not.toContain(">");
  });

  it("caps length", () => {
    expect(sanitizeMemo("a".repeat(500)).length).toBeLessThanOrEqual(120);
  });
});
