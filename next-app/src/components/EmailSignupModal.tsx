"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface EmailSignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EmailSignupModal({ isOpen, onClose }: EmailSignupModalProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setIsSubmitting(true);
    
    try {
      // Save to localStorage
      if (typeof window !== "undefined") {
        const storageKey = "arc_email_signups";
        const existingEmails = JSON.parse(localStorage.getItem(storageKey) || "[]");
        
        // Check if email already exists
        const emailExists = existingEmails.some((entry: { email: string }) => entry.email.toLowerCase() === email.toLowerCase());
        
        if (!emailExists) {
          const newEntry = {
            email: email.toLowerCase().trim(),
            timestamp: new Date().toISOString(),
            date: new Date().toLocaleString(),
          };
          
          existingEmails.push(newEntry);
          localStorage.setItem(storageKey, JSON.stringify(existingEmails));
        }
      }
      
      // Send email notification to annasolohere@gmail.com
      try {
        console.log('📧 Calling email-signup API with email:', email.toLowerCase().trim());
        
        const response = await fetch('/api/email-signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: email.toLowerCase().trim() }),
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          console.error('❌ Error sending email notification:', data.error);
          console.error('❌ Error details:', data.details);
          // Continue anyway - don't block user from seeing success
        } else {
          console.log('✅ Email notification sent successfully:', data);
        }
      } catch (apiError) {
        console.error('❌ Error calling email-signup API:', apiError);
        console.error('❌ API Error details:', apiError instanceof Error ? apiError.message : String(apiError));
        // Continue anyway - don't block user from seeing success
      }
      
      setIsSubmitting(false);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error processing email signup:", error);
      setIsSubmitting(false);
      // Still show success to user even if there's an error
      setIsSubmitted(true);
    }
  };

  const handleClose = () => {
    setEmail("");
    setIsSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed bg-black/80 backdrop-blur-sm z-[10000] p-4" 
          style={{ 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflowY: 'auto'
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-[#0a0a0a] rounded-2xl border border-white/10 max-w-md w-full max-w-[calc(100vw-2rem)] max-h-[85vh] overflow-y-auto my-auto mx-4 sm:mx-auto"
          >
            <div className="p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">We're Not There Yet</h2>
                <button
                  onClick={handleClose}
                  className="text-white/40 hover:text-white/60 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {isSubmitted ? (
                <div className="py-4">
                  <div className="w-16 h-16 bg-[#6FFFC3]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-[#6FFFC3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 text-center">You're on the list</h3>
                  <div className="text-white/80 mb-6 leading-relaxed space-y-3 text-center">
                    <p>
                      Thanks for leaving your email.
                    </p>
                    <p>
                      We'll notify you when this service becomes available in your country.
                      In the meantime, no action is required.
                    </p>
                  </div>
                  <p className="text-white/40 text-sm text-center mb-6">
                    We'll only contact you about availability.
                  </p>
                  <button
                    onClick={handleClose}
                    className="w-full px-4 py-3 rounded-lg bg-[#6FFFC3] text-slate-950 font-semibold hover:bg-[#6FFFC3]/90 transition-all"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <>
                  <div className="text-white/80 mb-6 leading-relaxed space-y-3">
                    <p>
                      This service isn't available in your country at the moment.
                    </p>
                    <p>
                      We're expanding carefully to make sure everything works as intended.
                      Leave your email and we'll let you know as soon as you can get started.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                        Email address
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your.email@example.com"
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#6FFFC3]/50 focus:ring-2 focus:ring-[#6FFFC3]/20 transition-all"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <button
                        type="button"
                        onClick={handleClose}
                        className="flex-1 px-4 py-3 rounded-lg border border-white/20 text-white hover:bg-white/5 transition-all min-h-[44px]"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting || !email}
                        className="flex-1 px-4 py-3 rounded-lg bg-[#6FFFC3] text-slate-950 font-semibold hover:bg-[#6FFFC3]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all min-h-[44px]"
                      >
                        {isSubmitting ? "Submitting..." : "Notify Me"}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

