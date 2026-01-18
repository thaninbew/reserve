"use server";

import { hash } from "bcryptjs";
import { AuthError } from "next-auth";

import { prisma } from "@/lib/prisma";
import { signIn } from "@/lib/auth";
import { loginSchema, registerSchema } from "@/lib/validations/auth";

export async function loginAction(values: unknown) {
  const { callbackUrl, ...payload } = (values ?? {}) as {
    callbackUrl?: string;
  };
  const parsed = loginSchema.safeParse(payload);
  if (!parsed.success) {
    return { error: "Invalid credentials." };
  }

  try {
    await signIn("credentials", {
      ...parsed.data,
      redirectTo: callbackUrl ?? "/dashboard",
    });
    return { error: null };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials." };
        default:
          return { error: "Something went wrong. Please try again." };
      }
    }
    throw error;
  }
}

export async function registerAction(values: unknown) {
  const parsed = registerSchema.safeParse(values);
  if (!parsed.success) {
    return { error: "Please check your inputs." };
  }

  const { name, email, password } = parsed.data;

  const existing = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });

  if (existing) {
    return { error: "Email already in use." };
  }

  const isFirstUser = (await prisma.user.count()) === 0;
  const passwordHash = await hash(password, 12);

  await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
      role: isFirstUser ? "OWNER" : "VIEWER",
    },
  });

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard",
    });
    return { error: null };
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Account created, but sign-in failed." };
    }
    throw error;
  }
}
