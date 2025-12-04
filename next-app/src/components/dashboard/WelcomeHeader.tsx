"use client";

import { useUser } from "@/components/UserProvider";
import { motion } from "framer-motion";

export default function WelcomeHeader() {
  const user = useUser();

  return (
    <motion.div
      className="mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <h1 className="dashboard-h1 mb-3">
        Welcome back, {user.firstName}
      </h1>
      <p className="dashboard-description text-base max-w-2xl">
        Your ARC Dashboard gives you early insights, personalised guidance, and
        a clear view of your biological stability.
      </p>
    </motion.div>
  );
}
