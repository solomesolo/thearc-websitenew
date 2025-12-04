"use client";

import { useState } from "react";
import Link from "next/link";

export default function SignupPage() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        country: "",
        timezone: "",
    });

    const [consents, setConsents] = useState({
        healthData: false,
        productUpdates: false,
        marketing: false,
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);

    // Password strength checker
    const checkPasswordStrength = (password: string) => {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (password.length >= 12) strength++;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
        if (/\d/.test(password)) strength++;
        if (/[^a-zA-Z0-9]/.test(password)) strength++;
        return strength;
    };

    const handlePasswordChange = (password: string) => {
        setFormData({ ...formData, password });
        setPasswordStrength(checkPasswordStrength(password));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        // Validation
        if (!formData.firstName || !formData.lastName) {
            setError("Please enter your full name");
            setLoading(false);
            return;
        }

        if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            setError("Please enter a valid email address");
            setLoading(false);
            return;
        }

        if (formData.password.length < 8) {
            setError("Password must be at least 8 characters long");
            setLoading(false);
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        if (!consents.healthData) {
            setError("You must agree to health data processing to continue");
            setLoading(false);
            return;
        }

        // Submit registration
        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    password: formData.password,
                    country: formData.country || "US",
                    timezone: formData.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
                    mandatoryConsents: {
                        healthData: consents.healthData,
                        dataTransfer: consents.healthData, // Required for health data
                        terms: consents.healthData, // Required for health data
                        ageConfirmed: true, // Assume user is 18+ if they're using the service
                    },
                    optionalConsents: {
                        marketing: consents.marketing || false,
                        productUpdates: consents.productUpdates || false,
                        dataResearch: false,
                    },
                }),
            });

            const data = await res.json();

            if (res.ok) {
                setSuccess(true);
                // Don't redirect immediately - show success message
            } else {
                setError(data.error || data.details || "Registration failed. Please try again.");
                setLoading(false);
            }
        } catch (err) {
            setError("Failed to connect to server. Please check your connection.");
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0a0a] to-[#0f0f0f] px-6">
                <div className="bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] border border-teal-500/20 rounded-2xl shadow-[0_0_30px_rgba(20,184,166,0.15)] p-10 w-full max-w-md text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">Check Your Email</h2>
                    <p className="text-gray-400 mb-6">
                        We've sent a verification link to <strong className="text-white">{formData.email}</strong>
                    </p>
                    <p className="text-sm text-gray-500 mb-8">
                        Please click the link in the email to verify your account. You won't be able to log in until your email is verified.
                    </p>
                    <Link
                        href="/login"
                        className="inline-block px-6 py-3 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 transition-colors"
                    >
                        Go to Login
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0a0a] to-[#0f0f0f] px-6 py-12">
            <div className="bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] border border-teal-500/20 rounded-2xl shadow-[0_0_30px_rgba(20,184,166,0.15)] p-10 w-full max-w-2xl">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Create Your Arc Account</h1>
                    <p className="text-gray-400">Join the personalized longevity platform</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                First Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                className="w-full bg-[#0a0a0a] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition"
                                placeholder="John"
                                value={formData.firstName}
                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Last Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                className="w-full bg-[#0a0a0a] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition"
                                placeholder="Doe"
                                value={formData.lastName}
                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            className="w-full bg-[#0a0a0a] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Password <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="password"
                            className="w-full bg-[#0a0a0a] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition"
                            placeholder="At least 8 characters"
                            value={formData.password}
                            onChange={(e) => handlePasswordChange(e.target.value)}
                            required
                        />
                        {/* Password Strength Indicator */}
                        {formData.password && (
                            <div className="mt-2">
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map((level) => (
                                        <div
                                            key={level}
                                            className={`h-1 flex-1 rounded ${level <= passwordStrength
                                                    ? passwordStrength <= 2
                                                        ? "bg-red-500"
                                                        : passwordStrength <= 3
                                                            ? "bg-yellow-500"
                                                            : "bg-green-500"
                                                    : "bg-gray-700"
                                                }`}
                                        />
                                    ))}
                                </div>
                                <p className="text-xs text-gray-400 mt-1">
                                    {passwordStrength <= 2 && "Weak password"}
                                    {passwordStrength === 3 && "Good password"}
                                    {passwordStrength >= 4 && "Strong password"}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Confirm Password <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="password"
                            className="w-full bg-[#0a0a0a] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition"
                            placeholder="Re-enter your password"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            required
                        />
                    </div>

                    {/* Country & Timezone */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Country</label>
                            <select
                                className="w-full bg-[#0a0a0a] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition"
                                value={formData.country}
                                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                            >
                                <option value="">Select Country</option>
                                <option value="US">United States</option>
                                <option value="GB">United Kingdom</option>
                                <option value="CA">Canada</option>
                                <option value="AU">Australia</option>
                                <option value="DE">Germany</option>
                                <option value="FR">France</option>
                                <option value="ES">Spain</option>
                                <option value="IT">Italy</option>
                                <option value="NL">Netherlands</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Timezone</label>
                            <select
                                className="w-full bg-[#0a0a0a] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition"
                                value={formData.timezone}
                                onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                            >
                                <option value="">Auto-detect</option>
                                <option value="America/New_York">Eastern Time (US)</option>
                                <option value="America/Chicago">Central Time (US)</option>
                                <option value="America/Denver">Mountain Time (US)</option>
                                <option value="America/Los_Angeles">Pacific Time (US)</option>
                                <option value="Europe/London">London</option>
                                <option value="Europe/Paris">Paris</option>
                                <option value="Europe/Berlin">Berlin</option>
                                <option value="Asia/Tokyo">Tokyo</option>
                                <option value="Australia/Sydney">Sydney</option>
                            </select>
                        </div>
                    </div>

                    {/* Consents */}
                    <div className="space-y-3 pt-4 border-t border-gray-700">
                        <p className="text-sm font-medium text-gray-300 mb-3">Privacy & Consents</p>

                        <label className="flex items-start gap-3 cursor-pointer group">
                            <input
                                type="checkbox"
                                className="mt-1 w-5 h-5 rounded border-gray-700 bg-[#0a0a0a] text-teal-500 focus:ring-teal-500 focus:ring-offset-0"
                                checked={consents.healthData}
                                onChange={(e) => setConsents({ ...consents, healthData: e.target.checked })}
                                required
                            />
                            <span className="text-sm text-gray-300 group-hover:text-white transition">
                                <strong className="text-red-500">*</strong> I agree to the processing of my health data for personalized longevity recommendations (Required)
                            </span>
                        </label>

                        <label className="flex items-start gap-3 cursor-pointer group">
                            <input
                                type="checkbox"
                                className="mt-1 w-5 h-5 rounded border-gray-700 bg-[#0a0a0a] text-teal-500 focus:ring-teal-500 focus:ring-offset-0"
                                checked={consents.productUpdates}
                                onChange={(e) => setConsents({ ...consents, productUpdates: e.target.checked })}
                            />
                            <span className="text-sm text-gray-300 group-hover:text-white transition">
                                Send me product updates and health insights (Optional)
                            </span>
                        </label>

                        <label className="flex items-start gap-3 cursor-pointer group">
                            <input
                                type="checkbox"
                                className="mt-1 w-5 h-5 rounded border-gray-700 bg-[#0a0a0a] text-teal-500 focus:ring-teal-500 focus:ring-offset-0"
                                checked={consents.marketing}
                                onChange={(e) => setConsents({ ...consents, marketing: e.target.checked })}
                            />
                            <span className="text-sm text-gray-300 group-hover:text-white transition">
                                Send me marketing emails about new features and offers (Optional)
                            </span>
                        </label>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4">
                            <p className="text-red-400 text-sm">{error}</p>
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-teal-500 text-white font-semibold py-3 rounded-lg hover:bg-teal-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Creating Account..." : "Create Account"}
                    </button>
                </form>

                {/* Login Link */}
                <div className="mt-6 text-center">
                    <p className="text-gray-400 text-sm">
                        Already have an account?{" "}
                        <Link href="/login" className="text-teal-500 hover:text-teal-400 font-medium">
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
