import sgMail from "@sendgrid/mail";

export async function sendVerificationEmail({
  email,
  token,
  firstName,
}: {
  email: string;
  token: string;
  firstName: string;
}) {
  const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;

  // If SendGrid is not configured, skip email sending (for development)
  if (!SENDGRID_API_KEY) {
    console.warn("⚠️  SENDGRID_API_KEY not set. Skipping email send.");
    console.log(`📧 Verification link for ${email}: ${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/verify?token=${token}`);
    return;
  }

  try {
    sgMail.setApiKey(SENDGRID_API_KEY);

    const verifyUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/verify?token=${token}`;

    const msg = {
      to: email,
      from: process.env.SENDGRID_FROM_EMAIL || "no-reply@thearc.com",
      subject: "Verify your ARC account",
      html: `
        <p>Hi ${firstName},</p>
        <p>Welcome to The Arc! Please verify your account by clicking the link below:</p>
        <p><a href="${verifyUrl}" target="_blank">Verify my email</a></p>
        <p>If you did not sign up, you can ignore this email.</p>
      `,
    };

    await sgMail.send(msg);
    console.log(`✅ Verification email sent to ${email}`);
  } catch (error) {
    console.error("❌ Failed to send verification email:", error);
    // Don't throw - allow registration to succeed even if email fails
    // In production, you might want to log this to an error tracking service
    console.log(`📧 Verification link for ${email}: ${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/verify?token=${token}`);
  }
}

