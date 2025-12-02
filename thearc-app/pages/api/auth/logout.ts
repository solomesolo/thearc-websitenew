import type { NextApiRequest, NextApiResponse } from "next";
import { clearLoginSession } from "@/lib/session";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  clearLoginSession(res);

  return res.status(200).json({
    success: true,
    message: "Logged out successfully.",
  });
}

