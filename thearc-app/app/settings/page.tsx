"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [showDelete, setShowDelete] = useState(false);
  const [password, setPassword] = useState("");
  const [deleteMsg, setDeleteMsg] = useState("");
  const [deleteErr, setDeleteErr] = useState("");

  async function exportData() {
    const res = await fetch("/api/user/export");
    if (res.ok) {
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "thearc-data-export.json";
      link.click();
    }
  }

  async function deleteAccount(e: React.FormEvent) {
    e.preventDefault();
    setDeleteMsg("");
    setDeleteErr("");

    const res = await fetch("/api/user/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    const data = await res.json();

    if (res.ok) {
      setDeleteMsg("Your account has been deleted.");
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } else {
      setDeleteErr(data.error);
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Settings</h1>

      {/* EXPORT SECTION */}
      <div className="bg-white p-6 border rounded shadow mb-10">
        <h2 className="text-lg font-semibold mb-2">Export Your Data</h2>
        <p className="text-gray-600 mb-4">
          Download a copy of everything you have stored in The Arc.
        </p>
        <button
          onClick={exportData}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Download Export
        </button>
      </div>

      {/* DELETE SECTION */}
      <div className="bg-white p-6 border rounded shadow">
        <h2 className="text-lg font-semibold mb-2 text-red-600">Delete Account</h2>
        <p className="text-gray-600 mb-4">
          This action is irreversible. All personal data will be permanently deleted.
        </p>

        {!showDelete && (
          <button
            onClick={() => setShowDelete(true)}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete Account
          </button>
        )}

        {showDelete && (
          <form onSubmit={deleteAccount} className="mt-4">
            <label className="block mb-1 font-medium">Confirm Password</label>
            <input
              type="password"
              className="border px-3 py-2 rounded w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {deleteErr && <p className="text-red-600 mt-2">{deleteErr}</p>}
            {deleteMsg && <p className="text-green-600 mt-2">{deleteMsg}</p>}

            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Confirm Deletion
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

