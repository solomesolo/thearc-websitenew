import sgMail from "@sendgrid/mail";

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY!;

if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY);
}

export async function sendVerificationEmail(
  email: string,
  token: string
): Promise<void> {
  if (!SENDGRID_API_KEY) {
    console.warn("SENDGRID_API_KEY not set, skipping email send");
    return;
  }

  const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/verify-email?token=${token}`;

  const msg = {
    to: email,
    from: process.env.SENDGRID_FROM_EMAIL || "noreply@thearc.com",
    subject: "Verify your email address",
    html: `
      <h1>Welcome to The Arc</h1>
      <p>Please verify your email address by clicking the link below:</p>
      <a href="${verificationUrl}">Verify Email</a>
      <p>Or copy and paste this URL into your browser:</p>
      <p>${verificationUrl}</p>
      <p>This link will expire in 24 hours.</p>
    `,
  };

  await sgMail.send(msg);
}

export async function sendPasswordResetEmail(
  email: string,
  token: string
): Promise<void> {
  if (!SENDGRID_API_KEY) {
    console.warn("SENDGRID_API_KEY not set, skipping email send");
    return;
  }

  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/reset-password?token=${token}`;

  const msg = {
    to: email,
    from: process.env.SENDGRID_FROM_EMAIL || "noreply@thearc.com",
    subject: "Reset your password",
    html: `
      <h1>Password Reset Request</h1>
      <p>You requested to reset your password. Click the link below to reset it:</p>
      <a href="${resetUrl}">Reset Password</a>
      <p>Or copy and paste this URL into your browser:</p>
      <p>${resetUrl}</p>
      <p>This link will expire in 1 hour.</p>
      <p>If you didn't request this, please ignore this email.</p>
    `,
  };

  await sgMail.send(msg);
}

