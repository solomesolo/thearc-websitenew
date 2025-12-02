"use client";

import { useEffect, useState } from "react";

export default function VerifyPage() {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    const url = new URL(window.location.href);
    const token = url.searchParams.get("token");

    if (!token) {
      setStatus("error");
      setMessage("Invalid verification link.");
      return;
    }

    async function verify() {
      try {
        const res = await fetch(`/api/auth/verify?token=${token}`);
        const data = await res.json();

        if (res.ok) {
          setStatus("success");
          setMessage("Your email has been successfully verified! Redirecting…");

          setTimeout(() => {
            window.location.href = "/login";
          }, 2500);
        } else {
          setStatus("error");
          setMessage(data.error || "Verification failed.");
        }
      } catch (err) {
        setStatus("error");
        setMessage("Something went wrong during verification.");
      }
    }

    verify();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="bg-white border border-gray-200 rounded-lg shadow-md p-10 max-w-md text-center">
        {status === "loading" && (
          <>
            <h2 className="text-xl font-semibold mb-4">Verifying...</h2>
            <p>{message}</p>
          </>
        )}

        {status === "success" && (
          <>
            <h2 className="text-xl font-semibold text-green-600 mb-4">Email Verified!</h2>
            <p>{message}</p>
          </>
        )}

        {status === "error" && (
          <>
            <h2 className="text-xl font-semibold text-red-600 mb-4">Verification Failed</h2>
            <p>{message}</p>
          </>
        )}
      </div>
    </div>
  );
}

