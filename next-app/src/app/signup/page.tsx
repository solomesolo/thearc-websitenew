"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function SignupContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
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
        dataTransfer: false,
        terms: false,
        ageConfirmed: false,
        productUpdates: false,
        marketing: false,
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);

    // Get persona and redirect from URL params
    useEffect(() => {
        const persona = searchParams.get("persona");
        const redirect = searchParams.get("redirect");
        if (persona) {
            // Store persona for later use
            if (typeof window !== "undefined") {
                localStorage.setItem("selectedPersona", persona);
            }
        }
    }, [searchParams]);

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
            setError("Password must be at least 8 characters");
            setLoading(false);
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        if (!consents.healthData || !consents.dataTransfer || !consents.terms || !consents.ageConfirmed) {
            setError("You must accept all mandatory consents to continue");
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
                        dataTransfer: consents.dataTransfer,
                        terms: consents.terms,
                        ageConfirmed: consents.ageConfirmed,
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
                
                // Get redirect and persona from URL params
                const redirect = searchParams.get("redirect");
                const persona = searchParams.get("persona");
                
                // If there's a redirect and persona, go to loading page after a short delay
                if (redirect && persona) {
                    setTimeout(() => {
                        router.push(`/loading?persona=${persona}`);
                    }, 2000); // 2 second delay to show success message
                }
            } else {
                // Show more detailed error message
                let errorMsg = data.error || "Registration failed. Please try again.";
                if (data.details && process.env.NODE_ENV === "development") {
                    errorMsg += ` (${data.details})`;
                }
                setError(errorMsg);
                setLoading(false);
                console.error("Registration failed:", data);
            }
        } catch (err) {
            setError("Failed to connect to server. Please check your connection.");
            setLoading(false);
        }
    };

    if (success) {
        const redirect = searchParams.get("redirect");
        const persona = searchParams.get("persona");
        const hasRedirect = redirect && persona;
        
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0a0a] to-[#0f0f0f] px-6">
                <div className="bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] border border-teal-500/20 rounded-2xl shadow-[0_0_30px_rgba(20,184,166,0.15)] p-10 w-full max-w-md text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        {hasRedirect ? "Account Created!" : "Check Your Email"}
                    </h2>
                    <p className="text-gray-400 mb-6">
                        {hasRedirect ? (
                            <>
                                Your account has been created. We're now processing your questionnaire results...
                                <br />
                                <span className="text-sm text-gray-500 mt-2 block">
                                    Redirecting to your results...
                                </span>
                            </>
                        ) : (
                            <>
                                We've sent a verification link to <strong className="text-white">{formData.email}</strong>
                            </>
                        )}
                    </p>
                    {!hasRedirect && (
                        <>
                            <p className="text-sm text-gray-500 mb-8">
                                Please click the link in the email to verify your account. You won't be able to log in until your email is verified.
                            </p>
                            <Link
                                href="/login"
                                className="inline-block px-6 py-3 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 transition-colors"
                            >
                                Go to Login
                            </Link>
                        </>
                    )}
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
                        {formData.password && (
                            <div className="mt-2">
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map((level) => (
                                        <div
                                            key={level}
                                            className={`h-1 flex-1 rounded ${
                                                level <= passwordStrength
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
                                    {passwordStrength <= 2
                                        ? "Weak password"
                                        : passwordStrength <= 3
                                        ? "Medium password"
                                        : "Strong password"}
                                </p>
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Confirm Password <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="password"
                            className="w-full bg-[#0a0a0a] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition"
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Country</label>
                            <input
                                type="text"
                                className="w-full bg-[#0a0a0a] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition"
                                placeholder="US"
                                value={formData.country}
                                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Timezone</label>
                            <input
                                type="text"
                                className="w-full bg-[#0a0a0a] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition"
                                placeholder="Auto-detected"
                                value={formData.timezone}
                                onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-4 border-t border-gray-700 pt-6">
                        <p className="text-sm text-gray-400 mb-2">Mandatory Consents <span className="text-red-500">*</span></p>
                        
                        <div>
                            <label className="flex items-start gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="mt-1 w-5 h-5 rounded border-gray-600 bg-[#0a0a0a] text-teal-500 focus:ring-teal-500 focus:ring-offset-0"
                                    checked={consents.healthData}
                                    onChange={(e) => setConsents({ ...consents, healthData: e.target.checked })}
                                    required
                                />
                                <span className="text-sm text-gray-300">
                                    I agree to the processing of my health data for personalized recommendations{" "}
                                    <span className="text-red-500">*</span>
                                </span>
                            </label>
                        </div>

                        <div>
                            <label className="flex items-start gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="mt-1 w-5 h-5 rounded border-gray-600 bg-[#0a0a0a] text-teal-500 focus:ring-teal-500 focus:ring-offset-0"
                                    checked={consents.dataTransfer}
                                    onChange={(e) => setConsents({ ...consents, dataTransfer: e.target.checked })}
                                    required
                                />
                                <span className="text-sm text-gray-300">
                                    I agree to the transfer of my data as necessary for service provision{" "}
                                    <span className="text-red-500">*</span>
                                </span>
                            </label>
                        </div>

                        <div>
                            <label className="flex items-start gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="mt-1 w-5 h-5 rounded border-gray-600 bg-[#0a0a0a] text-teal-500 focus:ring-teal-500 focus:ring-offset-0"
                                    checked={consents.terms}
                                    onChange={(e) => setConsents({ ...consents, terms: e.target.checked })}
                                    required
                                />
                                <span className="text-sm text-gray-300">
                                    I agree to the Terms of Service and Privacy Policy{" "}
                                    <span className="text-red-500">*</span>
                                </span>
                            </label>
                        </div>

                        <div>
                            <label className="flex items-start gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="mt-1 w-5 h-5 rounded border-gray-600 bg-[#0a0a0a] text-teal-500 focus:ring-teal-500 focus:ring-offset-0"
                                    checked={consents.ageConfirmed}
                                    onChange={(e) => setConsents({ ...consents, ageConfirmed: e.target.checked })}
                                    required
                                />
                                <span className="text-sm text-gray-300">
                                    I confirm that I am 18 years of age or older{" "}
                                    <span className="text-red-500">*</span>
                                </span>
                            </label>
                        </div>

                        <p className="text-sm text-gray-400 mt-4 mb-2">Optional Consents</p>

                        <div>
                            <label className="flex items-start gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="mt-1 w-5 h-5 rounded border-gray-600 bg-[#0a0a0a] text-teal-500 focus:ring-teal-500 focus:ring-offset-0"
                                    checked={consents.productUpdates}
                                    onChange={(e) => setConsents({ ...consents, productUpdates: e.target.checked })}
                                />
                                <span className="text-sm text-gray-300">
                                    I'd like to receive product updates and new features
                                </span>
                            </label>
                        </div>

                        <div>
                            <label className="flex items-start gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="mt-1 w-5 h-5 rounded border-gray-600 bg-[#0a0a0a] text-teal-500 focus:ring-teal-500 focus:ring-offset-0"
                                    checked={consents.marketing}
                                    onChange={(e) => setConsents({ ...consents, marketing: e.target.checked })}
                                />
                                <span className="text-sm text-gray-300">
                                    I'd like to receive marketing communications
                                </span>
                            </label>
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4">
                            <p className="text-red-400 text-sm">{error}</p>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-teal-500 text-white font-semibold py-3 rounded-lg hover:bg-teal-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Creating Account..." : "Create Account"}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-gray-400 text-sm">
                        Already have an account?{" "}
                        <Link href="/login" className="text-teal-500 hover:text-teal-400 font-medium">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function SignupPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-white text-center">
                    <p>Loading...</p>
                </div>
            </div>
        }>
            <SignupContent />
        </Suspense>
    );
}

