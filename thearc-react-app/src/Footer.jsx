import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full px-8 py-6 bg-black border-t border-gray-800 flex flex-col md:flex-row items-center justify-between text-gray-400 text-sm z-50">
      <div className="flex items-center space-x-6 mb-2 md:mb-0">
        <a href="/privacy" className="hover:text-fuchsia-400 transition-colors">Privacy Policy</a>
        <a href="/terms" className="hover:text-fuchsia-400 transition-colors">Terms and Conditions</a>
      </div>
      <div className="flex items-center space-x-4 mb-2 md:mb-0">
        <a href="https://www.instagram.com/thearc_me?igsh=MTc2NXc4dDdoemJxYg%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="hover:text-fuchsia-400 transition-colors" aria-label="Instagram">
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect x="3" y="3" width="18" height="18" rx="5" strokeWidth="2"/><circle cx="12" cy="12" r="5" strokeWidth="2"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/></svg>
        </a>
        <a href="https://www.tiktok.com/@thearc_me?_t=ZN-8xyNGVEFHqo&_r=1" target="_blank" rel="noopener noreferrer" className="hover:text-fuchsia-400 transition-colors" aria-label="TikTok">
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M16.5 3v8.25a4.75 4.75 0 11-4.75-4.75" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M16.5 3c.5 2 2.5 3.5 4 3.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </a>
      </div>
      <div className="text-center md:text-right w-full md:w-auto">© 2025. All rights reserved.</div>
    </footer>
  );
} 