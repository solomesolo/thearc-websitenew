import React, { useState } from 'react';

export default function Contact() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('');
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, reason }),
      });
      const result = await res.json();
      if (result.message === 'Registration successful!') {
        setStatus('success');
        setFirstName('');
        setLastName('');
        setEmail('');
        setReason('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="flex w-full h-screen">
      <div className="flex-1 bg-black" />
      <div className="w-full max-w-xl bg-black flex flex-col justify-center px-12 py-16 min-h-screen z-30">
        <h2 className="text-3xl font-light mb-2 text-white">Apply to Join the Waitlist</h2>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="flex space-x-4">
            <input type="text" placeholder="First name" value={firstName} onChange={e => setFirstName(e.target.value)} required className="flex-1 rounded-md px-4 py-3 bg-black border border-gray-400 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-600" />
            <input type="text" placeholder="Last name" value={lastName} onChange={e => setLastName(e.target.value)} required className="flex-1 rounded-md px-4 py-3 bg-black border border-gray-400 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-600" />
          </div>
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full rounded-md px-4 py-3 bg-black border border-gray-400 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-600" />
          <textarea placeholder="Why do you want to join TheArc?" value={reason} onChange={e => setReason(e.target.value)} rows={3} required className="w-full rounded-md px-4 py-3 bg-black border border-gray-400 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-600 resize-none" />
          <button type="submit" className="w-full mt-4 py-4 rounded-full text-xl font-semibold bg-gradient-to-r from-fuchsia-800 via-fuchsia-600 to-fuchsia-400 text-white shadow-lg border-2 border-fuchsia-700 hover:scale-105 transition-all">Request Early Access</button>
        </form>
        {status === 'success' && <div className="mt-4 text-green-400">Thank you! Your application has been received.</div>}
        {status === 'error' && <div className="mt-4 text-red-400">Something went wrong. Please try again later.</div>}
      </div>
    </div>
  );
} 