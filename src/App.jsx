import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import About from './About.jsx';
import Contact from './Contact.jsx';
import DNAParticles from './DNAParticles.jsx';
import Footer from './Footer.jsx';
import './index.css';

// Google Fonts import for Montserrat
const fontLink = document.createElement('link');
fontLink.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap';
fontLink.rel = 'stylesheet';
document.head.appendChild(fontLink);

function MainLanding() {
  return (
    <div className="relative bg-[#0d0e11] text-[#e6e8eb] font-montserrat min-h-screen">
      <DNAParticles />
      {/* Top Bar / Navigation */}
      <header className="w-full flex items-center justify-between px-8 py-7 z-30 relative">
        <div className="text-2xl md:text-3xl font-bold gradient-text select-none tracking-tight" style={{background: 'linear-gradient(90deg,#8b5cf6,#3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>TheArc</div>
        <nav className="flex space-x-8 text-base font-normal">
          <a href="#screening" className="hover:text-blue-400 transition-colors">Screening</a>
          <a href="#programs" className="hover:text-blue-400 transition-colors">Programs</a>
          <a href="#ecosystem" className="hover:text-blue-400 transition-colors">Ecosystem</a>
          <a href="#audience" className="hover:text-blue-400 transition-colors">Who it’s for</a>
          <a href="#apply" className="hover:text-blue-400 transition-colors">Apply</a>
          <Link to="/about" className="hover:text-blue-400 transition-colors">About</Link>
          <Link to="/contact" className="hover:text-blue-400 transition-colors">Contact</Link>
        </nav>
      </header>
      {/* HERO SECTION */}
      <section className="section text-center flex flex-col items-center justify-center" style={{paddingTop:'6rem', paddingBottom:'4rem'}}>
        <h1 className="text-4xl md:text-6xl mb-4 gradient-text" style={{background:'linear-gradient(90deg,#8b5cf6,#3b82f6)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>Structure your longevity.</h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
          A system designed for people who build, lead, and move fast — and now want to master their biology.
          TheArc brings clarity to your health through data, rhythm, and real science.
        </p>
        <div>
          <a href="#screening" className="button primary">Start Free Screening</a>
          <a href="#programs" className="button secondary">Apply to Join</a>
        </div>
      </section>
      {/* HOW IT WORKS */}
      <section className="section text-center">
        <h2 className="text-3xl mb-10 gradient-text">From confusion to clarity — in three steps</h2>
        <div className="grid md:grid-cols-3 gap-8 text-left">
          <div className="card">
            <h3 className="text-xl mb-2">1. Free Screening</h3>
            <p>Start with a 3-minute digital assessment to discover your most important biomarkers before spending on unnecessary tests.</p>
          </div>
          <div className="card">
            <h3 className="text-xl mb-2">2. Build Your Path</h3>
            <p>Choose your 6-month journey — self-paced or guided. Follow a personalized structure with nutrition, recovery, and supplement strategies.</p>
          </div>
          <div className="card">
            <h3 className="text-xl mb-2">3. Stay in Rhythm</h3>
            <p>Access your evolving dashboard, exclusive marketplace offers, and expert-led events that keep you informed and focused.</p>
          </div>
        </div>
      </section>
      {/* PROGRAMS & PRICING */}
      <section id="programs" className="section text-center">
        <h2 className="text-3xl mb-10 gradient-text">Programs & Pricing</h2>
        <div className="grid md:grid-cols-3 gap-8 text-left">
          <div className="card">
            <h3 className="text-2xl mb-2">Free Screening</h3>
            <p className="text-gray-400 mb-4">Lifetime access – <strong>Free</strong></p>
            <p>Quick self-assessment revealing your longevity priorities. No data sharing, no commitment.</p>
          </div>
          <div className="card">
            <h3 className="text-2xl mb-2">Self-Paced Program</h3>
            <p className="text-gray-400 mb-4">6 months – <strong>€79 (≈ €0.44/day)</strong></p>
            <p>Includes all program modules: Concept, Screening, Six Phases, Nutrition, Recovery, Supplements, Metrics, and more. Work at your own pace.</p>
          </div>
          <div className="card">
            <h3 className="text-2xl mb-2">Guided Program + Access</h3>
            <p className="text-gray-400 mb-4">6 months – <strong>€299 (≈ €1.70/day)</strong></p>
            <p>Everything in Self-Paced plus 1-on-1 consultations, exclusive deals in our Catalog, invitations to expert events, and priority support.</p>
          </div>
        </div>
        <div className="mt-10">
          <a href="#screening" className="button primary">Start Free Screening</a>
          <a href="#apply" className="button secondary">Join Now</a>
        </div>
      </section>
      {/* ECOSYSTEM */}
      <section id="ecosystem" className="section text-center">
        <h2 className="text-3xl mb-10 gradient-text">TheArc Ecosystem</h2>
        <div className="grid md:grid-cols-3 gap-8 text-left">
          <div className="card">
            <h3 className="text-xl mb-2">Knowledge Base</h3>
            <p>Access research-based insights written in simple language. Make decisions based on data, not trends.</p>
            <a href="/knowledgebase" className="button secondary mt-4">Explore</a>
          </div>
          <div className="card">
            <h3 className="text-xl mb-2">Catalog of D2C Services</h3>
            <p>Understand which tests you actually need before spending. Members get exclusive deals on verified labs.</p>
            <a href="/catalog" className="button secondary mt-4">View Catalog</a>
          </div>
          <div className="card">
            <h3 className="text-xl mb-2">Events Hub</h3>
            <p>Join conversations with doctors and scientists discussing the latest findings in longevity and health — no sales pitches.</p>
            <a href="/events" className="button secondary mt-4">See Events</a>
          </div>
        </div>
      </section>
      {/* AUDIENCE */}
      <section id="audience" className="section text-center">
        <h2 className="text-3xl mb-10 gradient-text">Who It’s For</h2>
        <div className="space-y-4 max-w-2xl mx-auto text-gray-300">
          <p>🧠 <strong>Tech & IT Leaders:</strong> structure your energy, focus, and recovery like you manage systems.</p>
          <p>🌍 <strong>Digital Nomads:</strong> a portable longevity program that adapts wherever you go.</p>
          <p>❤️ <strong>Health-Aware Individuals:</strong> regain calm and confidence after recent health issues.</p>
        </div>
      </section>
      {/* WHY THEARC */}
      <section className="section text-center">
        <h2 className="text-3xl mb-10 gradient-text">Why TheArc</h2>
        <ul className="max-w-xl mx-auto text-left space-y-3 text-gray-300">
          <li>✔ Evidence-based, not influencer-driven.</li>
          <li>✔ Secure EU data handling (GDPR compliant).</li>
          <li>✔ Designed for high-performance minds.</li>
          <li>✔ Small cohorts for personal focus.</li>
        </ul>
      </section>
      {/* FINAL CTA */}
      <section className="section text-center" id="apply">
        <h2 className="text-4xl mb-6 gradient-text">Longevity isn’t luck — it’s structure.</h2>
        <p className="text-gray-300 mb-8">Start your journey today and turn uncertainty into clarity.</p>
        <a href="#screening" className="button primary">Start Free Screening</a>
        <a href="#apply" className="button secondary">Apply to Join</a>
      </section>
      <Footer />
      <style>{`
        .gradient-text { background:linear-gradient(90deg,#8b5cf6,#3b82f6); -webkit-background-clip:text; -webkit-text-fill-color:transparent; }
        .section { padding:6rem 1.5rem; max-width:1100px; margin:0 auto; }
        .card { background-color:#15171b; border-radius:1rem; padding:2rem; transition:transform .3s, box-shadow .3s; }
        .card:hover { transform:translateY(-6px); box-shadow:0 6px 20px rgba(0,0,0,.4); }
        a.button { display:inline-block; margin:0.5rem; padding:0.75rem 1.5rem; border-radius:9999px; font-weight:500; transition:all .3s ease; }
        a.primary { background:linear-gradient(90deg,#8b5cf6,#3b82f6); color:#fff; }
        a.secondary { border:1px solid #3b82f6; color:#3b82f6; }
        a.primary:hover, a.secondary:hover { opacity:.8; }
      `}</style>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLanding />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}