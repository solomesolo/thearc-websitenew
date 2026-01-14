"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PrivacyPolicy() {
  const router = useRouter();

  return (
    <aside className="fixed top-0 right-0 h-screen w-full sm:w-[600px] bg-black text-white z-50 shadow-2xl flex flex-col items-center px-4 py-8 sm:px-8 sm:py-16 animate-slide-in max-h-screen overflow-y-auto font-montserrat custom-scrollbar" style={{ paddingTop: '6rem', position: 'relative' }}>
      <button
        onClick={() => router.push("/")}
        className="absolute top-4 right-4 sm:top-6 sm:right-8 text-4xl font-bold text-white hover:text-[#4DE4C1] transition-colors cursor-pointer bg-[#0a0a0a] border-2 border-white/30 rounded-full w-14 h-14 flex items-center justify-center hover:bg-[#0a0a0a]/80 hover:border-[#4DE4C1] shadow-lg z-[100]"
        aria-label="Close Privacy Policy"
      >
        &times;
      </button>
      <div className="w-full max-w-2xl flex flex-col items-start font-montserrat" style={{ paddingTop: '2rem' }}>
        <h1 className="text-3xl font-bold mb-4 font-montserrat">Privacy Policy</h1>
        <p className="mb-8 text-sm text-gray-400">Last updated: 01.01.2026</p>
        <div className="text-base md:text-sm text-gray-200 space-y-6">
          <section>
            <p className="mb-4">
              This Privacy Policy explains how The Arc ("ARC," "we," "our," or "us") collects, uses, discloses, and safeguards information when you visit or use our website, applications, services, and related offerings (collectively, the "Services").
            </p>
            <p className="mb-4">
              By accessing or using ARC, you acknowledge that you have read and understood this Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-white">1. Scope and Important Notice</h2>
            <ul className="list-disc list-inside space-y-2 mb-4">
              <li>ARC provides educational and informational tools related to long-term health planning and personal wellness.</li>
              <li>ARC does not provide medical advice, diagnosis, or treatment, and is not a healthcare provider.</li>
              <li>This Privacy Policy applies only to information collected through the Services and does not apply to third-party websites, products, or services.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-white">2. Information We Collect</h2>
            <h3 className="text-lg font-semibold mb-2 text-white mt-4">2.1 Information You Provide Voluntarily</h3>
            <p className="mb-2">You may provide information such as:</p>
            <ul className="list-disc list-inside space-y-1 mb-4 ml-4">
              <li>Name, email address, and contact details</li>
              <li>Account credentials</li>
              <li>Responses to questionnaires or assessments</li>
              <li>Information you choose to share related to health interests, goals, or lifestyle</li>
              <li>Communications with us (emails, support requests, feedback)</li>
            </ul>
            <p className="mb-4">You are responsible for ensuring that the information you provide is accurate and that you have the right to share it.</p>

            <h3 className="text-lg font-semibold mb-2 text-white mt-4">2.2 Health-Related Information (User-Provided)</h3>
            <p className="mb-2">Some Services may allow you to voluntarily provide health-related information (such as screening results, wellness data, or personal observations).</p>
            <p className="mb-2 font-semibold">Important:</p>
            <ul className="list-disc list-inside space-y-1 mb-4 ml-4">
              <li>This information is provided at your discretion</li>
              <li>ARC treats this data as sensitive</li>
              <li>ARC does not diagnose conditions or replace clinical care</li>
            </ul>

            <h3 className="text-lg font-semibold mb-2 text-white mt-4">2.3 Automatically Collected Information</h3>
            <p className="mb-2">We may automatically collect:</p>
            <ul className="list-disc list-inside space-y-1 mb-4 ml-4">
              <li>IP address and device identifiers</li>
              <li>Browser type and operating system</li>
              <li>Usage data (pages viewed, interactions, timestamps)</li>
              <li>Approximate location (city/region level)</li>
            </ul>
            <p className="mb-4">This data is used for security, analytics, and service improvement.</p>

            <h3 className="text-lg font-semibold mb-2 text-white mt-4">2.4 Cookies and Tracking Technologies</h3>
            <p className="mb-2">We use cookies and similar technologies to:</p>
            <ul className="list-disc list-inside space-y-1 mb-4 ml-4">
              <li>Operate and secure the Services</li>
              <li>Remember preferences</li>
              <li>Analyze usage patterns</li>
            </ul>
            <p className="mb-4">You can control cookies through your browser settings. Disabling cookies may affect functionality.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-white">3. How We Use Information</h2>
            <p className="mb-2">We may use information to:</p>
            <ul className="list-disc list-inside space-y-1 mb-4 ml-4">
              <li>Provide, maintain, and improve the Services</li>
              <li>Generate educational insights and summaries</li>
              <li>Personalize user experience</li>
              <li>Communicate with you about the Services</li>
              <li>Respond to inquiries and support requests</li>
              <li>Monitor and prevent fraud, abuse, or misuse</li>
              <li>Comply with legal obligations</li>
            </ul>
            <p className="mb-4">ARC does not use your information to provide medical diagnoses or treatment.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-white">4. How We Share Information</h2>
            <p className="mb-4 font-semibold">We do not sell personal information.</p>
            <p className="mb-2">We may share information only in the following circumstances:</p>

            <h3 className="text-lg font-semibold mb-2 text-white mt-4">4.1 Service Providers</h3>
            <p className="mb-4">With trusted vendors who perform services on our behalf (hosting, analytics, security), under contractual confidentiality obligations.</p>

            <h3 className="text-lg font-semibold mb-2 text-white mt-4">4.2 Legal and Safety Requirements</h3>
            <p className="mb-4">If required to comply with law, regulation, subpoena, or legal process, or to protect the rights, safety, and property of ARC, our users, or others.</p>

            <h3 className="text-lg font-semibold mb-2 text-white mt-4">4.3 Business Transfers</h3>
            <p className="mb-4">In connection with a merger, acquisition, financing, or sale of assets, subject to continued protection of your information.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-white">5. Data Retention</h2>
            <p className="mb-2">We retain information only for as long as reasonably necessary to:</p>
            <ul className="list-disc list-inside space-y-1 mb-4 ml-4">
              <li>Provide the Services</li>
              <li>Fulfill the purposes described in this Policy</li>
              <li>Comply with legal, regulatory, or contractual obligations</li>
            </ul>
            <p className="mb-4">You may request deletion of your account and associated data, subject to legal retention requirements.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-white">6. Data Security</h2>
            <p className="mb-2">We implement reasonable administrative, technical, and organizational safeguards designed to protect information.</p>
            <p className="mb-4">However, no system is completely secure, and we cannot guarantee absolute security. You use the Services at your own risk.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-white">7. Your Rights and Choices</h2>
            <p className="mb-2">Depending on your location, you may have rights to:</p>
            <ul className="list-disc list-inside space-y-1 mb-4 ml-4">
              <li>Access your personal information</li>
              <li>Correct or update information</li>
              <li>Request deletion</li>
              <li>Object to or restrict processing</li>
              <li>Withdraw consent where applicable</li>
            </ul>
            <p className="mb-4">Requests can be submitted via <a href="mailto:info@thearc.me" className="text-[#4DE4C1] underline">info@thearc.me</a>. We may need to verify your identity before responding.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-white">8. California Privacy Rights (CCPA/CPRA)</h2>
            <p className="mb-2">California residents may have the right to:</p>
            <ul className="list-disc list-inside space-y-1 mb-4 ml-4">
              <li>Know what personal information is collected and how it is used</li>
              <li>Request deletion of personal information</li>
              <li>Opt out of the sale or sharing of personal information (ARC does not sell data)</li>
              <li>Not be discriminated against for exercising privacy rights</li>
            </ul>
            <p className="mb-4">Requests may be submitted through the contact information below.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-white">9. International Users (GDPR)</h2>
            <p className="mb-2">If you are located in the European Economic Area or other regions with data protection laws:</p>
            <ul className="list-disc list-inside space-y-1 mb-4 ml-4">
              <li>ARC processes personal data based on consent, contractual necessity, legitimate interests, or legal obligations</li>
              <li>You have the right to lodge a complaint with your local data protection authority</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-white">10. Children's Privacy</h2>
            <p className="mb-2">ARC is not intended for use by individuals under the age of 18.</p>
            <p className="mb-4">We do not knowingly collect personal information from children. If we learn that such information has been collected, we will delete it.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-white">11. Third-Party Services</h2>
            <p className="mb-4">The Services may link to or integrate with third-party platforms. We are not responsible for the privacy practices of those third parties. Use them at your own discretion.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-white">12. No Medical or Professional Relationship</h2>
            <p className="mb-2">Use of ARC does not create a doctor-patient, clinician-patient, or fiduciary relationship.</p>
            <p className="mb-4">Any information provided through the Services is for educational purposes only and should not be relied upon as medical advice.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-white">13. Changes to This Policy</h2>
            <p className="mb-4">We may update this Privacy Policy from time to time. Changes will be posted with a revised "Last updated" date. Continued use of the Services after changes constitutes acceptance.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-white">14. Contact Us</h2>
            <p className="mb-2">If you have questions about this Privacy Policy or our data practices, contact:</p>
            <p className="mb-2">The Arc</p>
            <p className="mb-4">Email: <a href="mailto:info@thearc.me" className="text-[#4DE4C1] underline">info@thearc.me</a></p>
          </section>
        </div>
      </div>
    </aside>
  );
} 