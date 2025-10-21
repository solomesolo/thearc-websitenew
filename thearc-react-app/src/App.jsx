import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import About from './About.jsx';
import Contact from './Contact.jsx';
import DNAParticles from './DNAParticles.jsx';
import './index.css';

// Google Fonts import for Montserrat
const fontLink = document.createElement('link');
fontLink.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap';
fontLink.rel = 'stylesheet';
document.head.appendChild(fontLink);

function Hero() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-black text-white font-montserrat">
      <DNAParticles />
      {/* Top Bar */}
      <div className="absolute top-0 left-0 w-full flex items-center justify-between px-12 py-10 z-20">
        <div className="text-3xl font-bold tracking-tight text-white select-none">TheArc</div>
        <nav className="flex space-x-10 text-lg font-normal">
          <Link to="/about" className="hover:text-fuchsia-400 transition-colors">About</Link>
          <Link to="/contact" className="hover:text-fuchsia-400 transition-colors">Contact</Link>
        </nav>
      </div>
      {/* Hero Content */}
      <div className="flex flex-col items-center justify-center text-center z-10 mt-24">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-8 leading-tight max-w-3xl mx-auto" style={{textShadow: '0 2px 24px #000'}}>Longevity isn’t a product. It’s a process. Most people drift — we create structure, clarity, and belonging.</h1>
        <p className="text-lg md:text-2xl font-normal mb-10 max-w-xl mx-auto text-white/90">A private longevity circle guided by science, precision, and deep personalization.<br />Built around you. Evolving with you.<br />Each cohort limited to 100 people.</p>
        <Link to="/contact" className="inline-flex items-center px-8 py-4 rounded-full text-lg font-semibold bg-gradient-to-r from-fuchsia-800 via-fuchsia-600 to-fuchsia-400 text-white shadow-lg border-2 border-fuchsia-700 hover:scale-105 transition-all">
          Apply to Join
          <span className="ml-3 text-2xl">&rarr;</span>
        </Link>
      </div>
      {/* New Section: The Arc System Statement */}
      <section className="flex flex-col items-center justify-center text-center mt-16 mb-4 px-4">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-fuchsia-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-4 drop-shadow-lg" style={{letterSpacing: '-0.01em'}}>
          The Arc doesn’t give you a plan. It gives you a system.
        </h2>
        <p className="text-lg md:text-xl max-w-2xl text-white/80 font-medium">
          One that understands your biology, adapts with your life, and helps you make smarter health decisions month after month.
        </p>
      </section>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}
//comment