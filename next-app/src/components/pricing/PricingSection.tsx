import Link from "next/link";
import { PricingCard } from "./PricingCard";

export function PricingSection() {
  return (
    <section id="plans" className="pricing-section py-28 bg-black">
      <h2 className="text-center text-4xl font-bold text-white mb-16">Plans & Pricing</h2>

      <div className="container mx-auto grid md:grid-cols-3 gap-12 max-w-5xl">
        <PricingCard
          title="Starter"
          price="99 EUR"
          period="6 months"
          features={["Free screening", "Health map", "6-month plan", "Basic support"]}
          cta={
            <Link
              href="/checkout/self"
              className="block w-full text-center py-3 rounded-xl bg-teal-500 text-black font-semibold hover:bg-teal-400 transition"
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
          features={["Everything in Starter", "Closed sessions", "Advanced insights", "Priority support"]}
          cta={
            <Link
              href="/free-screening"
              className="block w-full text-center py-3 rounded-xl bg-teal-500 text-black font-semibold hover:bg-teal-400 transition shadow-[0_0_25px_rgba(0,255,200,0.4)]"
            >
              Start with free screening
            </Link>
          }
        />

        <PricingCard
          title="Care"
          price="399 EUR"
          period="6 months"
          features={["Everything in Education", "Medical consultations", "Personalized care", "Dedicated support"]}
          cta={
            <button className="w-full py-3 rounded-xl border border-neutral-600 text-white hover:border-teal-500/40 transition">
              Join waitlist
            </button>
          }
        />
      </div>
    </section>
  );
}

