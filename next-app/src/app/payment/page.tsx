"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { getStoredPersona } from "@/lib/persona";

export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const persona = searchParams.get("persona") || getStoredPersona() || "women";

  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    cardNumber: "",
    cardExpiry: "",
    cardCVC: "",
    cardName: "",
    billingSameAsShipping: true,
  });

  const [consents, setConsents] = useState({
    terms: false,
    privacy: false,
    refund: false,
    medicalDisclaimer: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-fill with dummy data for development
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      setFormData({
        firstName: "Jane",
        lastName: "Smith",
        email: "jane.smith@example.com",
        phone: "+1 (555) 123-4567",
        address: "123 Health Street",
        city: "San Francisco",
        state: "CA",
        zipCode: "94102",
        country: "United States",
        cardNumber: "4242 4242 4242 4242",
        cardExpiry: "12/25",
        cardCVC: "123",
        cardName: "Jane Smith",
        billingSameAsShipping: true,
      });
      setConsents({
        terms: true,
        privacy: true,
        refund: true,
        medicalDisclaimer: true,
      });
    }
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleConsentChange = (name: string) => {
    setConsents((prev) => ({
      ...prev,
      [name]: !prev[name as keyof typeof prev],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate all consents are checked
    if (!consents.terms || !consents.privacy || !consents.refund || !consents.medicalDisclaimer) {
      alert("Please accept all required terms and conditions.");
      setIsSubmitting(false);
      return;
    }

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // In development, auto-proceed to full questionnaire
    // In production, this would process payment via Stripe
    router.push(`/questionnaire/${persona}/full?payment=success`);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\D/g, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-black to-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white mb-3">
            Complete Your Purchase
          </h1>
          <p className="text-base sm:text-lg text-slate-300">
            Unlock your Full ARC Blueprint with comprehensive health insights
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="rounded-3xl border border-emerald-500/10 bg-slate-950/60 backdrop-blur-xl shadow-[0_0_40px_rgba(16,185,129,0.15)] p-6 sticky top-6">
              <h2 className="text-xl font-semibold text-white mb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-white font-medium">Full ARC Blueprint</p>
                    <p className="text-sm text-slate-400 mt-1">
                      Complete personalized longevity plan
                    </p>
                  </div>
                  <p className="text-emerald-300 font-semibold">$299</p>
                </div>
              </div>

              <div className="border-t border-slate-800 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Subtotal</span>
                  <span className="text-white">$299.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Tax</span>
                  <span className="text-white">$0.00</span>
                </div>
                <div className="flex justify-between text-lg font-semibold pt-2 border-t border-slate-800">
                  <span className="text-white">Total</span>
                  <span className="text-emerald-300">$299.00</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-800">
                <div className="flex items-start gap-3">
                  <div className="text-emerald-400 text-xl">✓</div>
                  <div className="text-xs text-slate-300">
                    <p className="font-medium text-white mb-1">What's Included:</p>
                    <ul className="space-y-1 list-disc list-inside">
                      <li>Complete biological profile</li>
                      <li>Personalized protocols</li>
                      <li>Advanced metrics dashboard</li>
                      <li>6-month implementation plan</li>
                      <li>Ongoing support & updates</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Payment Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="rounded-3xl border border-emerald-500/10 bg-slate-950/60 backdrop-blur-xl shadow-[0_0_40px_rgba(16,185,129,0.15)] p-6">
                <h2 className="text-xl font-semibold text-white mb-4">
                  Personal Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900/50 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900/50 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-colors"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900/50 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-colors"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900/50 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Billing Address */}
              <div className="rounded-3xl border border-emerald-500/10 bg-slate-950/60 backdrop-blur-xl shadow-[0_0_40px_rgba(16,185,129,0.15)] p-6">
                <h2 className="text-xl font-semibold text-white mb-4">
                  Billing Address
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900/50 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-colors"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900/50 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        State/Province *
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900/50 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        ZIP/Postal Code *
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900/50 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Country *
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900/50 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-colors"
                    >
                      <option value="">Select Country</option>
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                      <option value="Germany">Germany</option>
                      <option value="France">France</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="rounded-3xl border border-emerald-500/10 bg-slate-950/60 backdrop-blur-xl shadow-[0_0_40px_rgba(16,185,129,0.15)] p-6">
                <h2 className="text-xl font-semibold text-white mb-4">
                  Payment Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Cardholder Name *
                    </label>
                    <input
                      type="text"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      required
                      placeholder="Name on card"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900/50 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Card Number *
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={(e) => {
                        const formatted = formatCardNumber(e.target.value);
                        setFormData((prev) => ({ ...prev, cardNumber: formatted }));
                      }}
                      required
                      maxLength={19}
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900/50 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-colors"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Expiry Date *
                      </label>
                      <input
                        type="text"
                        name="cardExpiry"
                        value={formData.cardExpiry}
                        onChange={(e) => {
                          const formatted = formatExpiry(e.target.value);
                          setFormData((prev) => ({ ...prev, cardExpiry: formatted }));
                        }}
                        required
                        maxLength={5}
                        placeholder="MM/YY"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900/50 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        CVC *
                      </label>
                      <input
                        type="text"
                        name="cardCVC"
                        value={formData.cardCVC}
                        onChange={(e) => {
                          const v = e.target.value.replace(/\D/g, "").slice(0, 4);
                          setFormData((prev) => ({ ...prev, cardCVC: v }));
                        }}
                        required
                        maxLength={4}
                        placeholder="123"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900/50 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-colors"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="rounded-3xl border border-emerald-500/10 bg-slate-950/60 backdrop-blur-xl shadow-[0_0_40px_rgba(16,185,129,0.15)] p-6">
                <h2 className="text-xl font-semibold text-white mb-4">
                  Terms & Conditions
                </h2>
                <div className="space-y-4">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={consents.terms}
                      onChange={() => handleConsentChange("terms")}
                      className="mt-1 w-5 h-5 rounded border-slate-700 bg-slate-900/50 text-emerald-500 focus:ring-2 focus:ring-emerald-500/50 focus:ring-offset-2 focus:ring-offset-slate-950"
                    />
                    <span className="text-sm text-slate-300 group-hover:text-white transition-colors">
                      I agree to the{" "}
                      <Link href="/terms" className="text-emerald-400 hover:text-emerald-300 underline">
                        Terms of Service
                      </Link>{" "}
                      *
                    </span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={consents.privacy}
                      onChange={() => handleConsentChange("privacy")}
                      className="mt-1 w-5 h-5 rounded border-slate-700 bg-slate-900/50 text-emerald-500 focus:ring-2 focus:ring-emerald-500/50 focus:ring-offset-2 focus:ring-offset-slate-950"
                    />
                    <span className="text-sm text-slate-300 group-hover:text-white transition-colors">
                      I agree to the{" "}
                      <Link href="/privacy" className="text-emerald-400 hover:text-emerald-300 underline">
                        Privacy Policy
                      </Link>{" "}
                      *
                    </span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={consents.refund}
                      onChange={() => handleConsentChange("refund")}
                      className="mt-1 w-5 h-5 rounded border-slate-700 bg-slate-900/50 text-emerald-500 focus:ring-2 focus:ring-emerald-500/50 focus:ring-offset-2 focus:ring-offset-slate-950"
                    />
                    <span className="text-sm text-slate-300 group-hover:text-white transition-colors">
                      I understand the{" "}
                      <Link href="/refund-policy" className="text-emerald-400 hover:text-emerald-300 underline">
                        Refund Policy
                      </Link>{" "}
                      (30-day money-back guarantee) *
                    </span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={consents.medicalDisclaimer}
                      onChange={() => handleConsentChange("medicalDisclaimer")}
                      className="mt-1 w-5 h-5 rounded border-slate-700 bg-slate-900/50 text-emerald-500 focus:ring-2 focus:ring-emerald-500/50 focus:ring-offset-2 focus:ring-offset-slate-950"
                    />
                    <span className="text-sm text-slate-300 group-hover:text-white transition-colors">
                      I understand that this assessment is informational and does not replace care from a licensed clinician. I will review results with my healthcare provider before making medical decisions. *
                    </span>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="
                    flex-1
                    px-8 py-4
                    rounded-full
                    bg-gradient-to-r from-emerald-400 to-teal-500
                    text-slate-950
                    font-semibold
                    text-base
                    shadow-[0_20px_40px_rgba(16,185,129,0.4)]
                    hover:shadow-[0_24px_48px_rgba(16,185,129,0.55)]
                    hover:from-emerald-300 hover:to-teal-400
                    transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-slate-950
                    disabled:opacity-50 disabled:cursor-not-allowed
                  "
                >
                  {isSubmitting ? "Processing..." : "Complete Purchase - $299.00"}
                </button>
                <Link
                  href={`/dashboard/${persona}/free`}
                  className="
                    px-8 py-4
                    rounded-full
                    border border-slate-700
                    bg-slate-900/50
                    text-white
                    font-medium
                    text-base
                    hover:bg-slate-800/50
                    transition-colors
                    text-center
                  "
                >
                  Cancel
                </Link>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

