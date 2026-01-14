"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

interface InfoTooltipProps {
  content: string;
}

export function InfoTooltip({ content }: InfoTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const tooltipRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Calculate tooltip position
  useEffect(() => {
    if (isOpen && buttonRef.current && tooltipRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const scrollY = window.scrollY;
      const scrollX = window.scrollX;
      const tooltipWidth = 288; // w-72 = 18rem = 288px
      const tooltipHeight = 100; // estimated
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      // Calculate initial position (centered below button)
      let left = buttonRect.left + scrollX + (buttonRect.width / 2);
      let top = buttonRect.bottom + scrollY + 8;
      
      // Adjust if tooltip would go off right edge
      if (left + (tooltipWidth / 2) > scrollX + viewportWidth) {
        left = scrollX + viewportWidth - (tooltipWidth / 2) - 16;
      }
      
      // Adjust if tooltip would go off left edge
      if (left - (tooltipWidth / 2) < scrollX) {
        left = scrollX + (tooltipWidth / 2) + 16;
      }
      
      // Adjust if tooltip would go off bottom edge (show above instead)
      if (top + tooltipHeight > scrollY + viewportHeight) {
        top = buttonRect.top + scrollY - tooltipHeight - 8;
      }
      
      setPosition({ top, left });
    }
  }, [isOpen]);

  // Close tooltip when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tooltipRef.current &&
        buttonRef.current &&
        !tooltipRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const tooltipContent = (
    <AnimatePresence>
      {isOpen && mounted && (
        <motion.div
          ref={tooltipRef}
          initial={{ opacity: 0, y: 5, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 5, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed z-[99999] w-72 max-w-[calc(100vw-2rem)] p-4 rounded-lg bg-[#0f0f0f] border-2 border-[#6FFFC3]/50 shadow-[0_0_30px_rgba(111,255,195,0.3)] pointer-events-auto"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
          onClick={(e) => e.stopPropagation()}
          style={{
            top: `${position.top}px`,
            left: `${position.left}px`,
            transform: 'translateX(-50%)',
          }}
        >
          <p className="text-sm text-white leading-relaxed font-medium">{content}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <div className="relative inline-block">
        <button
          ref={buttonRef}
          type="button"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setIsOpen(false)}
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
          className="ml-2 w-5 h-5 rounded-full bg-[#6FFFC3]/20 border border-[#6FFFC3]/40 flex items-center justify-center text-[#6FFFC3] text-xs font-semibold hover:bg-[#6FFFC3]/30 active:bg-[#6FFFC3]/40 transition-colors cursor-help touch-manipulation flex-shrink-0"
          aria-label="Why this matters"
        >
          ?
        </button>
      </div>
      {mounted && createPortal(tooltipContent, document.body)}
    </>
  );
}

