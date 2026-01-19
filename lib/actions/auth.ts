"use server";

import { hash } from "bcryptjs";
import { AuthError } from "next-auth";

import { prisma } from "@/lib/prisma";
import { signIn, signOut } from "@/lib/auth";
import { 
  loginSchema, 
  registerSchema, 
  resetSchema, 
  newPasswordSchema 
} from "@/lib/validations/auth";
import { 
  generateVerificationToken, 
  generatePasswordResetToken,
  getVerificationTokenByToken,
  getPasswordResetTokenByToken 
} from "@/lib/tokens";
import { sendVerificationEmail, sendPasswordResetEmail } from "@/lib/mail";
import { rateLimit } from "@/lib/rate-limit";

export async function loginAction(values: unknown) {
  const ip = "127.0.0.1"; // In real app, get from headers
  if (!rateLimit(ip)) {
     return { error: "Too many attempts. Please try again later." };
  }

  const { callbackUrl, ...payload } = (values ?? {}) as {
    callbackUrl?: string;
  };
  const parsed = loginSchema.safeParse(payload);
  if (!parsed.success) {
    return { error: "Invalid credentials." };
  }

  const { email, password } = parsed.data;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (!existingUser || !existingUser.email || !existingUser.passwordHash) {
    return { error: "Invalid email or password." };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(existingUser.email);
    await sendVerificationEmail(
      verificationToken.identifier,
      verificationToken.token
    );
    return { success: "Confirmation email sent!", error: null };
  }

  try {
    await signIn("credentials", {
      email,
      password,
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
  const ip = "127.0.0.1";
  if (!rateLimit(ip)) {
     return { error: "Too many attempts. Please try again later." };
  }

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

  await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        name,
        email,
        passwordHash,
        role: isFirstUser ? "OWNER" : "VIEWER",
      },
    });

    const reserve = await tx.reserve.create({
      data: {
        name: `${name || "My"}'s Reserve`,
      },
    });

    await tx.userReserve.create({
      data: {
        userId: user.id,
        reserveId: reserve.id,
        role: "OWNER",
      },
    });
  });

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(
    verificationToken.identifier,
    verificationToken.token
  );

  return { success: "Confirmation email sent!", error: null };
}

export async function newVerification(token: string) {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return { error: "Token does not exist!" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  const existingUser = await prisma.user.findUnique({
    where: { email: existingToken.identifier },
  });

  if (!existingUser) {
    return { error: "Email does not exist!" };
  }

  await prisma.user.update({
    where: { id: existingUser.id },
    data: { 
      emailVerified: new Date(),
      email: existingToken.identifier, // Updates email if user changed it
    }
  });

  await prisma.verificationToken.delete({
    where: { token: existingToken.token }
  });

  return { success: "Email verified!" };
}

export async function reset(values: unknown) {
  const parsed = resetSchema.safeParse(values);
  if (!parsed.success) {
    return { error: "Invalid email!" };
  }

  const { email } = parsed.data;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (!existingUser) {
    return { error: "Email not found!" };
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return { success: "Reset email sent!" };
}

export async function newPassword(values: unknown, token?: string | null) {
  if (!token) {
    return { error: "Missing token!" };
  }

  const parsed = newPasswordSchema.safeParse(values);

  if (!parsed.success) {
    return { error: "Invalid fields!" };
  }

  const { password } = parsed.data;

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    return { error: "Invalid token!" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  const existingUser = await prisma.user.findUnique({
    where: { email: existingToken.email },
  });

  if (!existingUser) {
    return { error: "Email does not exist!" };
  }

  const passwordHash = await hash(password, 12);

  await prisma.user.update({
    where: { id: existingUser.id },
    data: { passwordHash },
  });

  await prisma.passwordResetToken.delete({
    where: { id: existingToken.id },
  });

  return { success: "Password updated!" };
}

export async function logout() {
  await signOut();
}
