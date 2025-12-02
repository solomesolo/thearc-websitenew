import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { encrypt } from "@/lib/encryption";
import argon2 from "argon2";
import { z } from "zod";
import { randomBytes } from "crypto";
import { sendVerificationEmail } from "@/lib/sendVerificationEmail";
import { addHours } from "date-fns";

// ---------------------
//  VALIDATION SCHEMA
// ---------------------

const registrationSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  country: z.string().min(1, "Country is required"),
  timezone: z.string().optional(),

  mandatoryConsents: z.object({
    healthData: z.boolean(),
    dataTransfer: z.boolean(),
    terms: z.boolean(),
    ageConfirmed: z.boolean(),
  }),

  optionalConsents: z.object({
    marketing: z.boolean().optional(),
    productUpdates: z.boolean().optional(),
    dataResearch: z.boolean().optional(),
  }),
});

// ---------------------
//   HELPER FUNCTIONS
// ---------------------

function isEUOrUKCountry(country: string): boolean {
  const eu_uk = [
    "AT","BE","BG","HR","CY","CZ","DK","EE","FI","FR","DE","GR",
    "HU","IE","IT","LV","LT","LU","MT","NL","PL","PT","RO","SK",
    "SI","ES","SE","UK","GB","IS","LI","NO" // incl. EEA
  ];
  return eu_uk.includes(country.toUpperCase());
}

function getClientIp(req: NextApiRequest): string {
  return (
    req.headers["x-forwarded-for"]?.toString().split(",")[0] ||
    req.socket.remoteAddress ||
    ""
  );
}

// ---------------------
//     MAIN HANDLER
// ---------------------

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Validate input
    const parsed = registrationSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.flatten() });
    }

    const {
      firstName,
      lastName,
      email,
      password,
      country,
      timezone,
      mandatoryConsents,
      optionalConsents,
    } = parsed.data;

    // Mandatory consents must be true
    if (
      !mandatoryConsents.healthData ||
      !mandatoryConsents.dataTransfer ||
      !mandatoryConsents.terms ||
      !mandatoryConsents.ageConfirmed
    ) {
      return res.status(400).json({
        error: "All mandatory consents must be accepted.",
      });
    }

    // EU/UK users: optional consents must default OFF
    const isEU = isEUOrUKCountry(country);

    const finalOptionalConsents = {
      marketing: isEU ? false : optionalConsents.marketing ?? true,
      productUpdates: isEU ? false : optionalConsents.productUpdates ?? true,
      dataResearch: isEU ? false : optionalConsents.dataResearch ?? true,
    };

    // Encrypt email
    const encryptedEmail = await encrypt(email);

    // Check if user already exists (by encrypted email)
    // Note: Since emails are encrypted, we check after encryption
    // In production, add a unique constraint on emailEncrypted in the database
    const existing = await prisma.user.findFirst({
      where: {
        emailEncrypted: encryptedEmail,
      },
    });

    if (existing) {
      return res.status(409).json({
        error: "Email already registered",
      });
    }

    // Hash password
    const passwordHash = await argon2.hash(password);

    // Create user
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        emailEncrypted: encryptedEmail,
        passwordHash,
        country,
        timezone: timezone || null,
      },
    });

    const ipAddress = getClientIp(req);
    const legalVersion = "2025-01";

    // Save consents
    const consentData = [
      {
        userId: user.id,
        type: "health_data_processing",
        mandatory: true,
        accepted: true,
        legalVersion,
        ipAddress,
      },
      {
        userId: user.id,
        type: "international_data_transfer",
        mandatory: true,
        accepted: true,
        legalVersion,
        ipAddress,
      },
      {
        userId: user.id,
        type: "terms_privacy",
        mandatory: true,
        accepted: true,
        legalVersion,
        ipAddress,
      },
      {
        userId: user.id,
        type: "age_confirmed_18",
        mandatory: true,
        accepted: true,
        legalVersion,
        ipAddress,
      },
      // Optional consents:
      {
        userId: user.id,
        type: "marketing_emails",
        mandatory: false,
        accepted: finalOptionalConsents.marketing,
        legalVersion,
        ipAddress,
      },
      {
        userId: user.id,
        type: "product_updates",
        mandatory: false,
        accepted: finalOptionalConsents.productUpdates,
        legalVersion,
        ipAddress,
      },
      {
        userId: user.id,
        type: "data_research",
        mandatory: false,
        accepted: finalOptionalConsents.dataResearch,
        legalVersion,
        ipAddress,
      },
    ];

    await prisma.consent.createMany({ data: consentData });

    // Create verification token
    const token = randomBytes(32).toString("hex");

    await prisma.verificationToken.create({
      data: {
        userId: user.id,
        token,
        expiresAt: addHours(new Date(), 24),
      },
    });

    // Send verification email
    await sendVerificationEmail({
      email,
      token,
      firstName,
    });

    return res.status(200).json({
      success: true,
      message: "Account created. Please check your email to verify your account.",
    });

  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ error: "Something went wrong during registration." });
  }
}

