'use client';
import React, { useState } from "react";
import Link from "next/link";
import { trackFormSubmission, trackButtonClick } from "../../utils/mixpanel";

export default function Contact() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    
    // Track form submission attempt
    trackFormSubmission('registration', false, {
      form_fields: { firstName, lastName, email, reason }
    });
    
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, reason }),
      });
      const result = await res.json();
      if (result.message === "Registration successful!") {
        setStatus("success");
        
        // Track successful form submission
        trackFormSubmission('registration', true, {
          form_fields: { firstName, lastName, email, reason },
          notion_id: result.notionId
        });
        
        setFirstName("");
        setLastName("");
        setEmail("");
        setReason("");
      } else {
        setStatus("error");
        
        // Track form submission error
        trackFormSubmission('registration', false, {
          error_message: result.message,
          form_fields: { firstName, lastName, email, reason }
        });
      }
    } catch (error) {
      setStatus("error");
      
      // Track form submission error
      trackFormSubmission('registration', false, {
        error_message: 'Network error',
        form_fields: { firstName, lastName, email, reason }
      });
    }
  };

  return (
    <aside className="fixed top-0 right-0 h-screen w-full sm:w-[600px] bg-black text-white z-50 shadow-2xl flex flex-col items-center justify-center px-4 py-8 sm:px-8 sm:py-16 animate-slide-in max-h-screen overflow-y-auto font-montserrat custom-scrollbar">
      <Link href="/" className="absolute top-6 right-8 text-3xl text-gray-400 hover:text-fuchsia-400 transition-colors" aria-label="Close Contact">&times;</Link>
      <div className="w-full max-w-xl flex flex-col items-start relative">
        <div className={status === 'success' ? 'blur-sm brightness-75 pointer-events-none select-none' : ''}>
          <h2 className="text-3xl font-light mb-2 text-white font-montserrat">Apply to Join the Waitlist</h2>
          {status !== 'success' && (
            <form className="space-y-5 w-full" onSubmit={handleSubmit}>
              <div className="flex flex-col sm:flex-row sm:space-x-4 w-full">
                <input type="text" placeholder="First name" value={firstName} onChange={e => setFirstName(e.target.value)} required className="w-full rounded-md px-4 py-3 bg-black border border-gray-400 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-600 mb-4 sm:mb-0" />
                <input type="text" placeholder="Last name" value={lastName} onChange={e => setLastName(e.target.value)} required className="w-full rounded-md px-4 py-3 bg-black border border-gray-400 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-600" />
              </div>
              <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full rounded-md px-4 py-3 bg-black border border-gray-400 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-600" />
              <textarea placeholder="Why do you want to join TheArc?" value={reason} onChange={e => setReason(e.target.value)} rows={3} required className="w-full rounded-md px-4 py-3 bg-black border border-gray-400 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-600 resize-none" />
              <button type="submit" className="w-full mt-4 py-4 rounded-full text-xl font-semibold bg-gradient-to-r from-fuchsia-800 via-fuchsia-600 to-fuchsia-400 text-white shadow-lg border-2 border-fuchsia-700 hover:scale-105 transition-all">Request Early Access</button>
            </form>
          )}
        </div>
        {status === 'success' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-40">
            <div className="bg-black/90 rounded-xl px-8 py-10 shadow-2xl border border-fuchsia-700">
              <div className="text-green-400 text-lg text-center font-semibold mb-2">You’ll receive a private invite when applications open.</div>
              <div className="text-green-400 text-base text-center">No spam. No pressure. Only alignment.</div>
            </div>
          </div>
        )}
        {status === 'error' && <div className="mt-4 text-red-400">Something went wrong. Please try again later.</div>}
      </div>
    </aside>
  );
} 