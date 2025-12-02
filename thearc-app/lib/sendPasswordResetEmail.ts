import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function sendPasswordResetEmail({
  email,
  token,
  firstName,
}: {
  email: string;
  token: string;
  firstName: string;
}) {
  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;

  const msg = {
    to: email,
    from: "no-reply@thearc.com",
    subject: "Reset your ARC password",
    html: `
      <p>Hi ${firstName},</p>
      <p>You requested to reset your password. Click the link below:</p>
      <p><a href="${resetUrl}" target="_blank">Reset Password</a></p>
      <p>If you did not request this, you can safely ignore this email.</p>
    `,
  };

  await sgMail.send(msg);
}

