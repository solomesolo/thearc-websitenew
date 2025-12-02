"use client";

import { useEffect, useState } from "react";

interface Consent {
  id: string;
  type: string;
  mandatory: boolean;
  accepted: boolean;
  timestamp: string;
  ipAddress?: string;
  legalVersion: string;
}

export default function PrivacyPage() {
  const [consents, setConsents] = useState<Consent[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/privacy/consents");
      const data = await res.json();
      if (res.ok) {
        setConsents(data.consents);
      }
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return <div className="text-gray-600">Loading permissions…</div>;
  }

  // Prepare latest consent value per type
  const latest = Object.values(
    consents.reduce((acc: Record<string, Consent>, c: Consent) => {
      acc[c.type] = c; // last in list = newest
      return acc;
    }, {})
  ) as Consent[];

  const optionalTypes = ["marketing_emails", "product_updates", "data_research"];

  const [state, setState] = useState<Record<string, boolean>>(
    Object.fromEntries(
      optionalTypes.map((type) => [
        type,
        latest.find((c) => c.type === type)?.accepted ?? false,
      ])
    )
  );

  const handleToggle = (type: string) => {
    setState((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  async function saveChanges() {
    setSaving(true);
    setMessage("");

    const res = await fetch("/api/privacy/update", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(state),
    });

    if (res.ok) {
      setMessage("Your preferences have been updated.");
      // Reload consents to show updated state
      const refreshRes = await fetch("/api/privacy/consents");
      const refreshData = await refreshRes.json();
      if (refreshRes.ok) {
        setConsents(refreshData.consents);
      }
    } else {
      setMessage("Failed to update preferences.");
    }

    setSaving(false);
  }

  const formatConsentType = (type: string) => {
    return type
      .replace(/_/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Privacy & Permissions</h1>

      {/* Mandatory Consents */}
      <div className="bg-white p-6 rounded shadow border mb-10">
        <h2 className="text-lg font-semibold mb-4">Mandatory Consents</h2>
        {latest
          .filter((c) => c.mandatory)
          .map((c) => (
            <div key={c.id} className="mb-3">
              <p className="font-medium">{formatConsentType(c.type)}</p>
              <p className="text-sm text-gray-600">
                Accepted on {new Date(c.timestamp).toLocaleString()}
              </p>
            </div>
          ))}
      </div>

      {/* Optional Consents */}
      <div className="bg-white p-6 rounded shadow border">
        <h2 className="text-lg font-semibold mb-4">Optional Consents</h2>

        {optionalTypes.map((type) => {
          const consent = latest.find((c) => c.type === type);
          const isChecked = state[type];

          return (
            <div key={type} className="flex items-center justify-between mb-4">
              <div className="flex-1">
                <p className="font-medium">{formatConsentType(type)}</p>
                <p className="text-sm text-gray-600">
                  {type === "marketing_emails"
                    ? "Allows: Marketing emails and promotional content"
                    : type === "product_updates"
                    ? "Allows: Product news and feature updates"
                    : "Allows: Anonymous research participation"}
                </p>
                {consent && (
                  <p className="text-xs text-gray-500 mt-1">
                    Last updated: {new Date(consent.timestamp).toLocaleString()}
                  </p>
                )}
              </div>

              <label className="relative inline-flex items-center cursor-pointer ml-4">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleToggle(type)}
                  className="sr-only peer"
                />
                <div className="relative w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 transition-colors">
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                      isChecked ? "translate-x-5" : "translate-x-0"
                    }`}
                  ></span>
                </div>
              </label>
            </div>
          );
        })}

        {message && (
          <p className={`mt-3 ${message.includes("updated") ? "text-green-600" : "text-red-600"}`}>
            {message}
          </p>
        )}

        <button
          disabled={saving}
          onClick={saveChanges}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? "Saving…" : "Save Preferences"}
        </button>
      </div>
    </div>
  );
}

