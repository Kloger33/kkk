import React from 'react';
import { DESIGNER_INFO } from '../data/portfolioData';
import { ArrowUp, FileText, Mail } from 'lucide-react';

interface FooterProps {
  onOpenPdf: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPdf }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#080a0e] border-t border-slate-800 text-slate-400 py-12 text-xs">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-8">
        
        {/* Top footer row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-800/80">
          <div>
            <div className="text-base font-bold text-white tracking-tight">
              {DESIGNER_INFO.name}
            </div>
            <div className="text-xs text-slate-400 mt-0.5">
              Graphic Design, Brand Systems & Visual Architecture · Phnom Penh
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs">
            <a href="#works" className="hover:text-white transition-colors">
              Selected Works
            </a>
            <a href="#featured-case-study" className="hover:text-white transition-colors">
              Featured Case Study
            </a>
            <a href="#services" className="hover:text-white transition-colors">
              Capabilities
            </a>
            <a href="#about" className="hover:text-white transition-colors">
              About
            </a>
            <a href="#contact" className="hover:text-white transition-colors">
              Contact
            </a>
            <button
              onClick={onOpenPdf}
              className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Research Paper (22p)</span>
            </button>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} {DESIGNER_INFO.name}. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4">
            <a 
              href={`mailto:${DESIGNER_INFO.email}`} 
              className="hover:text-amber-400 transition-colors flex items-center gap-1"
            >
              <Mail className="w-3 h-3 text-amber-500" />
              <span>{DESIGNER_INFO.email}</span>
            </a>
            <button
              onClick={scrollToTop}
              className="p-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-md border border-slate-800 transition-colors flex items-center gap-1"
              title="Return to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span className="text-[11px]">Top</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
