"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PartnershipModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PartnershipModal({ isOpen, onClose }: PartnershipModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    email: "",
    partnershipInterest: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Save to localStorage
      if (typeof window !== "undefined") {
        const storageKey = "arc_partnership_enquiries";
        const existingEnquiries = JSON.parse(localStorage.getItem(storageKey) || "[]");

        const newEntry = {
          ...formData,
          timestamp: new Date().toISOString(),
          date: new Date().toLocaleString(),
        };

        existingEnquiries.push(newEntry);
        localStorage.setItem(storageKey, JSON.stringify(existingEnquiries));
      }

      // Send email notification via Resend
      try {
        console.log('📧 Sending partnership enquiry via Resend API');
        
        const response = await fetch("/api/partnership-enquiry", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            organization: formData.organization,
            email: formData.email,
            partnershipInterest: formData.partnershipInterest,
          }),
        });

        const data = await response.json();
        
        if (!response.ok) {
          console.error("❌ Error sending partnership enquiry notification:", data.error);
          console.error("❌ Error details:", data.details);
        } else {
          console.log("✅ Partnership enquiry notification sent successfully:", data);
        }
      } catch (apiError) {
        console.error("❌ Error calling partnership-enquiry API:", apiError);
      }

      setIsSubmitting(false);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting partnership enquiry:", error);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  const handleClose = () => {
    setFormData({
      name: "",
      organization: "",
      email: "",
      partnershipInterest: "",
    });
    setIsSubmitted(false);
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-[#0a0a0a] rounded-2xl border border-white/10 max-w-2xl w-full max-w-[calc(100vw-2rem)] max-h-[90vh] overflow-y-auto mx-4 sm:mx-auto"
          >
            <div className="p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Partner With The Arc</h2>
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
                <div className="py-8">
                  <div className="w-16 h-16 bg-[#6FFFC3]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-[#6FFFC3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 text-center">Thank you for reaching out</h3>
                  <div className="text-white/80 mb-6 leading-relaxed space-y-3 text-center">
                    <p>
                      We've received your message and will review it internally.
                    </p>
                    <p>
                      If there's a clear alignment, someone from our team will follow up by email.
                      If not, we appreciate your interest and the time you took to get in touch.
                    </p>
                  </div>
                  <p className="text-white/40 text-sm text-center mb-6">
                    We use your details only to respond to this enquiry.
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
                  <div className="text-white/80 mb-6 leading-relaxed">
                    <p>
                      We collaborate with organizations and practitioners who share a long-term, evidence-led approach to health.
                    </p>
                    <p className="mt-3">
                      If you're exploring a partnership related to clinical services, research, diagnostics, technology, or care delivery, we'd like to understand the context.
                    </p>
                  </div>

                  {/* Partner Types */}
                  <div className="mb-6">
                    <p className="text-sm text-white/60 mb-3">Partner Types:</p>
                    <ul className="space-y-2 text-sm text-white/70">
                      <li className="flex items-start gap-2">
                        <span className="text-[#6FFFC3] mt-1">•</span>
                        <span>Healthcare providers and clinics</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#6FFFC3] mt-1">•</span>
                        <span>Diagnostic and laboratory services</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#6FFFC3] mt-1">•</span>
                        <span>Research institutions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#6FFFC3] mt-1">•</span>
                        <span>Technology and data partners</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#6FFFC3] mt-1">•</span>
                        <span>Employers or organizations supporting long-term health programs</span>
                      </li>
                    </ul>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#6FFFC3]/50 focus:ring-2 focus:ring-[#6FFFC3]/20 transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="organization" className="block text-sm font-medium text-white/80 mb-2">
                        Organization
                      </label>
                      <input
                        type="text"
                        id="organization"
                        name="organization"
                        value={formData.organization}
                        onChange={handleChange}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#6FFFC3]/50 focus:ring-2 focus:ring-[#6FFFC3]/20 transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                        Email address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#6FFFC3]/50 focus:ring-2 focus:ring-[#6FFFC3]/20 transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="partnershipInterest" className="block text-sm font-medium text-white/80 mb-2">
                        Partnership interest
                      </label>
                      <textarea
                        id="partnershipInterest"
                        name="partnershipInterest"
                        value={formData.partnershipInterest}
                        onChange={handleChange}
                        required
                        rows={4}
                        placeholder="Briefly describe what you're exploring and why it may be relevant."
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#6FFFC3]/50 focus:ring-2 focus:ring-[#6FFFC3]/20 transition-all resize-none"
                      />
                      <p className="text-xs text-white/40 mt-2">
                        We review all submissions, but only respond where there is a clear alignment.
                      </p>
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
                        disabled={isSubmitting || !formData.name || !formData.organization || !formData.email || !formData.partnershipInterest}
                        className="flex-1 px-4 py-3 rounded-lg bg-[#6FFFC3] text-slate-950 font-semibold hover:bg-[#6FFFC3]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all min-h-[44px]"
                      >
                        {isSubmitting ? "Submitting..." : "Submit enquiry"}
                      </button>
                    </div>

                    <p className="text-xs text-white/30 text-center mt-4">
                      We'll only use your details to respond to this request.
                    </p>
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

