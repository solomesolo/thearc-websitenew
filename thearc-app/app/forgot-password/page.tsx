"use client";

import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");
    setError("");

    const res = await fetch("/api/auth/reset-request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (res.ok) {
      setMsg(data.message);
    } else {
      setError(data.error || "Something went wrong.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="bg-white border border-gray-200 rounded-lg shadow p-10 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Forgot Password</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {msg && <p className="text-green-600">{msg}</p>}
          {error && <p className="text-red-600">{error}</p>}

          <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
            Send Reset Link
          </button>
        </form>

        <div className="mt-4 text-center">
          <a href="/login" className="text-blue-600 text-sm hover:underline">
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
}

