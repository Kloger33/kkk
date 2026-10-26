import React, { useState } from 'react';
import { DESIGNER_INFO } from '../data/portfolioData';
import { Menu, X, FileText } from 'lucide-react';

interface NavbarProps {
  onOpenPdf: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenPdf }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0c0d12]/95 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 lg:px-8 h-20">
        
        {/* Zone 1: Single text element wordmark */}
        <a 
          href="#" 
          className="text-lg font-bold tracking-tight text-white hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
        >
          SOEUN KONGSOVANN
        </a>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a 
            href="#works" 
            className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
          >
            Selected Works
          </a>
          <a 
            href="#featured-case-study" 
            className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
          >
            Featured Case Study
          </a>
          <a 
            href="#services" 
            className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
          >
            Design Services
          </a>
          <a 
            href="#about" 
            className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
          >
            About
          </a>
          <a 
            href="#contact" 
            className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
          >
            Contact
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenPdf}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 rounded-lg border border-slate-800 transition-colors whitespace-nowrap shrink-0"
          >
            <FileText className="w-3.5 h-3.5 text-amber-400" />
            <span>Research Paper (22p)</span>
          </button>

          <a 
            href="#contact" 
            className="px-4 py-2 text-xs font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm"
          >
            Get in Touch
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 md:hidden text-slate-400 hover:text-white transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-[#0d1017] px-6 py-4 space-y-3">
          <a
            href="#works"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-200 hover:text-amber-400"
          >
            Selected Works
          </a>
          <a
            href="#featured-case-study"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-200 hover:text-amber-400"
          >
            Featured Case Study
          </a>
          <a
            href="#services"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-200 hover:text-amber-400"
          >
            Design Services
          </a>
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-200 hover:text-amber-400"
          >
            About
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-200 hover:text-amber-400"
          >
            Contact & Inquiries
          </a>
          <div className="pt-2 border-t border-slate-800">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPdf();
              }}
              className="flex items-center gap-2 text-xs text-amber-400 py-1"
            >
              <FileText className="w-4 h-4" />
              <span>View KTO Academic Publication (PDF)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
