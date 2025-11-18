import Link from "next/link";
import { PricingCard } from "./PricingCard";

export function PricingSection() {
  return (
    <section id="plans" className="pricing-section py-36 bg-black">
      <h2 className="text-center text-4xl font-bold text-white">
        Plans & Pricing
      </h2>

      <div className="container mx-auto grid md:grid-cols-3 gap-12 max-w-5xl mt-12">
        <PricingCard
          title="Starter"
          price="99 EUR"
          period="6 months"
          description="For people who want clarity. Get a complete understanding of what your body needs right now and the essential steps to start improving today."
          features={["Essential blood screening overview", "Personal health map", "6-month roadmap", "Basic support"]}
          cta={
            <Link
              href="/checkout/self"
              className="block w-full text-center py-4 rounded-xl text-lg font-medium bg-teal-500 text-black hover:bg-teal-400 transition"
            >
              Choose plan
            </Link>
          }
        />

        <PricingCard
          highlight
          title="Education"
          price="199 EUR"
          period="6 months"
          description="For people who want guidance. Includes expert sessions, personalised insights, and coaching so you always know what to do next — and why it matters."
          features={["Everything in Starter", "1:1 expert sessions", "Deeper, personalised insights", "Priority support"]}
          badge="Most Popular"
          cta={
            <Link
              href="/free-screening"
              className="block w-full text-center py-4 rounded-xl text-lg font-medium bg-teal-400 text-black hover:bg-teal-300 transition shadow-lg shadow-teal-400/40"
            >
              Start with free screening
            </Link>
          }
        />

        <PricingCard
          title="Care"
          price="399 EUR"
          period="6 months"
          description="For people who want medically guided improvement. Your plan is created and supervised by medical professionals for deeper, clinically informed progress."
          features={["Everything in Education", "Medical consultations", "Clinician-supervised care", "Dedicated support"]}
          cta={
            <button className="w-full py-4 rounded-xl text-lg font-medium border border-teal-400 text-teal-400 hover:bg-teal-400/10 transition">
              Join waitlist
            </button>
          }
        />
      </div>
    </section>
  );
}

