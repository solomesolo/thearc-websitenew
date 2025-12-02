"use client";

import { useState, useEffect } from "react";

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const t = new URL(window.location.href).searchParams.get("token");
    if (t) setToken(t);
    else setError("Invalid reset link.");
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setMsg("");

    const res = await fetch("/api/auth/reset-confirm", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, newPassword }),
    });

    const data = await res.json();

    if (res.ok) {
      setMsg("Your password has been updated. Redirecting to login...");
      setTimeout(() => (window.location.href = "/login"), 2000);
    } else {
      setError(data.error || "Something went wrong.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="bg-white border border-gray-200 rounded-lg shadow p-10 max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-6 text-center">Reset Password</h2>

        {error && !token && <p className="text-red-600 mb-4">{error}</p>}

        {token && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">New Password</label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded px-3 py-2"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={8}
                placeholder="Minimum 8 characters"
              />
            </div>

            {msg && <p className="text-green-600">{msg}</p>}
            {error && <p className="text-red-600">{error}</p>}

            <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
              Reset Password
            </button>
          </form>
        )}

        {!token && (
          <div className="text-center">
            <a href="/forgot-password" className="text-blue-600 text-sm hover:underline">
              Request a new reset link
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

