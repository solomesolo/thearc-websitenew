"use client";

import { useUser } from "@/components/UserProvider";
import { useState } from "react";

export default function AccountPage() {
  const user = useUser();

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [country, setCountry] = useState(user.country || "");
  const [timezone, setTimezone] = useState(user.timezone || "");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordMsg, setPasswordMsg] = useState("");
  const [passwordErr, setPasswordErr] = useState("");

  async function updateProfile(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");
    setError("");

    const res = await fetch("/api/user/update", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName,
        lastName,
        country,
        timezone,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage("Profile updated successfully.");
    } else {
      setError(data.error || "Update failed.");
    }
  }

  async function changePassword(e: React.FormEvent) {
    e.preventDefault();
    setPasswordMsg("");
    setPasswordErr("");

    const res = await fetch("/api/user/change-password", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ oldPassword, newPassword }),
    });

    const data = await res.json();

    if (res.ok) {
      setPasswordMsg("Password changed successfully.");
      setOldPassword("");
      setNewPassword("");
    } else {
      setPasswordErr(data.error || "Password change failed.");
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Account Settings</h1>

      {/* Profile Update Section */}
      <form onSubmit={updateProfile} className="bg-white p-6 rounded shadow mb-10 border">
        <h2 className="text-lg font-semibold mb-4">Profile Information</h2>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-1">First Name</label>
            <input className="w-full border px-3 py-2 rounded"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)} />
          </div>

          <div>
            <label className="block mb-1">Last Name</label>
            <input className="w-full border px-3 py-2 rounded"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-1">Country</label>
            <input className="w-full border px-3 py-2 rounded"
              value={country}
              onChange={(e) => setCountry(e.target.value)} />
          </div>

          <div>
            <label className="block mb-1">Timezone</label>
            <input className="w-full border px-3 py-2 rounded"
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)} />
          </div>
        </div>

        {message && <p className="text-green-600">{message}</p>}
        {error && <p className="text-red-600">{error}</p>}

        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
          Save Changes
        </button>
      </form>

      {/* Password Change Section */}
      <form onSubmit={changePassword} className="bg-white p-6 rounded shadow border">
        <h2 className="text-lg font-semibold mb-4">Change Password</h2>

        <div className="mb-4">
          <label className="block mb-1">Old Password</label>
          <input
            type="password"
            className="w-full border px-3 py-2 rounded"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">New Password</label>
          <input
            type="password"
            className="w-full border px-3 py-2 rounded"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        {passwordMsg && <p className="text-green-600">{passwordMsg}</p>}
        {passwordErr && <p className="text-red-600">{passwordErr}</p>}

        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
          Change Password
        </button>
      </form>
    </div>
  );
}

