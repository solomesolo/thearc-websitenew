"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function TermsOfService() {
  const router = useRouter();

  return (
    <aside className="fixed top-0 right-0 h-screen w-full sm:w-[600px] bg-black text-white z-50 shadow-2xl flex flex-col items-center px-4 py-8 sm:px-8 sm:py-16 animate-slide-in max-h-screen overflow-y-auto font-montserrat custom-scrollbar" style={{ paddingTop: '6rem', position: 'relative' }}>
      <button
        onClick={() => router.push("/")}
        className="absolute top-4 right-4 sm:top-6 sm:right-8 text-4xl font-bold text-white hover:text-[#4DE4C1] transition-colors cursor-pointer bg-[#0a0a0a] border-2 border-white/30 rounded-full w-14 h-14 flex items-center justify-center hover:bg-[#0a0a0a]/80 hover:border-[#4DE4C1] shadow-lg z-[100]"
        aria-label="Close Terms of Service"
      >
        &times;
      </button>
      <div className="w-full max-w-2xl flex flex-col items-start font-montserrat" style={{ paddingTop: '2rem' }}>
        <h1 className="text-3xl font-bold mb-4 font-montserrat">Terms of Service</h1>
        <p className="mb-8 text-sm text-gray-400">Last updated: 01 January 2026</p>
        <div className="text-base md:text-sm text-gray-200 space-y-6">
          <section>
            <p className="mb-4">
              These Terms of Service explain how The Arc works, what you can expect from the service, and what we expect from users. By accessing or using The Arc, you agree to these terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-white">1. Purpose of the Service</h2>
            <p className="mb-2">The Arc provides tools, information, and structured guidance intended to support understanding of personal health patterns over time.</p>
            <p className="mb-4">The service is designed for educational and informational purposes only. It does not provide medical diagnosis, treatment, or emergency care, and it does not replace professional medical advice.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-white">2. Not Medical Advice</h2>
            <p className="mb-2">Content provided through The Arc is not a substitute for medical care from a qualified healthcare professional.</p>
            <p className="mb-4">You should always seek the advice of a physician or other qualified provider with any questions regarding a medical condition, symptoms, or treatment decisions. Do not delay or disregard professional medical advice because of information obtained through the service.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-white">3. Eligibility</h2>
            <p className="mb-2">You may use The Arc if:</p>
            <ul className="list-disc list-inside space-y-1 mb-4 ml-4">
              <li>You are legally able to enter into binding agreements in your jurisdiction</li>
              <li>You use the service for lawful, personal purposes</li>
              <li>You understand the informational nature of the platform</li>
            </ul>
            <p className="mb-4">The service is not intended for use in medical emergencies.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-white">4. User Responsibility</h2>
            <p className="mb-2">You are responsible for:</p>
            <ul className="list-disc list-inside space-y-1 mb-4 ml-4">
              <li>The accuracy of information you provide</li>
              <li>How you interpret and act on information from the service</li>
              <li>Ensuring that any health-related decisions are appropriate for your individual situation</li>
            </ul>
            <p className="mb-4">The Arc does not monitor users in real time and cannot detect or respond to urgent medical issues.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-white">5. Data and Information</h2>
            <p className="mb-2">The Arc may process personal health-related information to provide its services. How data is collected, used, and protected is described in the Privacy Policy.</p>
            <p className="mb-4">You remain responsible for deciding what information you share and how you use insights generated from that data.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-white">6. Limitations of the Service</h2>
            <p className="mb-2">The Arc:</p>
            <ul className="list-disc list-inside space-y-1 mb-4 ml-4">
              <li>Does not provide medical diagnosis or treatment</li>
              <li>Does not guarantee specific outcomes or improvements</li>
              <li>Does not replace clinical judgment or professional care</li>
            </ul>
            <p className="mb-4">Health responses vary between individuals, and results may differ based on many factors beyond the platform's control.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-white">7. Service Availability</h2>
            <p className="mb-2">The service may not be available in all regions or jurisdictions and may change, pause, or be discontinued over time.</p>
            <p className="mb-4">We may update or modify features to improve quality, safety, or compliance without prior notice.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-white">8. Third-Party Services</h2>
            <p className="mb-4">Some features may rely on third-party tools, platforms, or integrations. The Arc is not responsible for the availability, accuracy, or practices of third-party services.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-white">9. Intellectual Property</h2>
            <p className="mb-4">All content, materials, and software associated with The Arc are the property of The Arc or its licensors and may not be copied, modified, or redistributed without permission.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-white">10. Changes to These Terms</h2>
            <p className="mb-2">We may update these Terms of Service from time to time. Material changes will be communicated through the platform or by other reasonable means.</p>
            <p className="mb-4">Continued use of the service after changes take effect constitutes acceptance of the updated terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-white">11. Contact</h2>
            <p className="mb-4">If you have questions about these terms, you may contact us through the channels provided on the website.</p>
          </section>
        </div>
      </div>
    </aside>
  );
} 
