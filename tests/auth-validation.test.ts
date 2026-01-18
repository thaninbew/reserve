import { describe, expect, it } from "vitest";

import { loginSchema, registerSchema } from "@/lib/validations/auth";

describe("auth validation", () => {
  it("accepts valid login payload", () => {
    const result = loginSchema.safeParse({
      email: "owner@example.com",
      password: "strongpassword",
    });

    expect(result.success).toBe(true);
  });

  it("rejects invalid login payload", () => {
    const result = loginSchema.safeParse({
      email: "not-an-email",
      password: "short",
    });

    expect(result.success).toBe(false);
  });

  it("accepts valid registration payload", () => {
    const result = registerSchema.safeParse({
      name: "Family Owner",
      email: "owner@example.com",
      password: "strongpassword",
    });

    expect(result.success).toBe(true);
  });

  it("rejects registration without name", () => {
    const result = registerSchema.safeParse({
      name: "",
      email: "owner@example.com",
      password: "strongpassword",
    });

    expect(result.success).toBe(false);
  });
});
