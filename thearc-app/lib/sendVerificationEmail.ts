import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function sendVerificationEmail({
  email,
  token,
  firstName,
}: {
  email: string;
  token: string;
  firstName: string;
}) {
  const verifyUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify?token=${token}`;

  const msg = {
    to: email,
    from: "no-reply@thearc.com",
    subject: "Verify your ARC account",
    html: `
      <p>Hi ${firstName},</p>
      <p>Welcome to The Arc! Please verify your account by clicking the link below:</p>
      <p><a href="${verifyUrl}" target="_blank">Verify my email</a></p>
      <p>If you did not sign up, you can ignore this email.</p>
    `,
  };

  await sgMail.send(msg);
}

