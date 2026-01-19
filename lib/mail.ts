import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const sendPasswordResetEmail = async (
  email: string,
  token: string
) => {
  const resetLink = `${domain}/new-password?token=${token}`;

  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY is missing. Email not sent.");
    return;
  }

  await resend.emails.send({
    from: "noreply-reserve@thanin.dev",
    to: email,
    subject: "Reset your Reserve password",
    html: `<p>We received a request to reset your password. Click <a href="${resetLink}">here</a> to reset your password. If you didn't request this, you can safely ignore this email.</p>`,
  });
};

export const sendVerificationEmail = async (
  email: string,
  token: string
) => {
  const confirmLink = `${domain}/new-verification?token=${token}`;

  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY is missing. Email not sent.");
    return;
  }

  await resend.emails.send({
    from: "noreply-reserve@thanin.dev",
    to: email,
    subject: "Confirm your Reserve email",
    html: `<p>We received a request to confirm your email. Click <a href="${confirmLink}">here</a> to confirm your email. If you didn't request this, you can safely ignore this email.</p>`,
  });
};
