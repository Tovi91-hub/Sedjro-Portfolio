import { describe, expect, it } from "vitest";
import { LIMITS, sanitizeLine, validateContact } from "@/lib/contact";

describe("validateContact", () => {
  const valid = {
    name: "Jane Recruiter",
    email: "jane@example.com",
    subject: "Software engineering role",
    message: "Hi Sedjro, I'd like to talk about a backend role on our team.",
  };

  it("accepts a valid payload", () => {
    const result = validateContact(valid);
    expect(result.ok).toBe(true);
    expect(result.errors).toEqual({});
  });

  it("requires every field", () => {
    const result = validateContact({});
    expect(result.ok).toBe(false);
    expect(result.errors.name).toBeDefined();
    expect(result.errors.email).toBeDefined();
    expect(result.errors.subject).toBeDefined();
    expect(result.errors.message).toBeDefined();
  });

  it("rejects invalid email addresses", () => {
    for (const email of ["nope", "a@b", "a b@c.com", "@example.com"]) {
      const result = validateContact({ ...valid, email });
      expect(result.ok, email).toBe(false);
      expect(result.errors.email).toBeDefined();
    }
  });

  it("rejects over-limit values", () => {
    const result = validateContact({
      ...valid,
      name: "x".repeat(LIMITS.name + 1),
      subject: "x".repeat(LIMITS.subject + 1),
      message: "x".repeat(LIMITS.message + 1),
    });
    expect(result.ok).toBe(false);
    expect(result.errors.name).toBeDefined();
    expect(result.errors.subject).toBeDefined();
    expect(result.errors.message).toBeDefined();
  });

  it("rejects messages that are too short to answer", () => {
    const result = validateContact({ ...valid, message: "hi" });
    expect(result.ok).toBe(false);
    expect(result.errors.message).toBeDefined();
  });

  it("trims whitespace before validating", () => {
    const result = validateContact({
      ...valid,
      name: "   ",
    });
    expect(result.ok).toBe(false);
    expect(result.errors.name).toBeDefined();
  });
});

describe("sanitizeLine", () => {
  it("strips control characters used for header injection", () => {
    expect(sanitizeLine("evil\r\nBcc: victim@example.com")).toBe(
      "evil Bcc: victim@example.com",
    );
  });

  it("normalizes control whitespace and trims", () => {
    expect(sanitizeLine("  hello\tworld  ")).toBe("hello world");
  });
});
