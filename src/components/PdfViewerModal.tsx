import React, { useState } from 'react';
import { DESIGNER_INFO } from '../data/portfolioData';
import { 
  FileText, 
  Download, 
  ExternalLink, 
  X, 
  Maximize2, 
  Minimize2, 
  BookOpen, 
  CheckCircle2, 
  Layers, 
  Copy, 
  Check 
} from 'lucide-react';

interface PdfViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PdfViewerModal: React.FC<PdfViewerModalProps> = ({ isOpen, onClose }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'reader' | 'summary' | 'chapters'>('reader');

  if (!isOpen) return null;

  const pdfUrl = DESIGNER_INFO.pdfDocument.url;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.origin + pdfUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md transition-all duration-200">
      <div 
        className={`relative w-full bg-[#0d1117] border border-slate-800 rounded-2xl flex flex-col shadow-2xl transition-all duration-200 overflow-hidden ${
          isFullscreen ? 'h-full max-w-full' : 'max-w-6xl h-[90vh]'
        }`}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/80 bg-[#111722]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-white tracking-tight">
                  {DESIGNER_INFO.pdfDocument.title}
                </h3>
                <span className="text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded">
                  22 Pages · {DESIGNER_INFO.pdfDocument.fileSize}
                </span>
              </div>
              <div className="text-xs text-slate-400 font-normal">
                Authored by Soeun Kongsovann & Research Group · Academic & Operational Analysis
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode Selector */}
            <div className="hidden sm:flex items-center bg-slate-900 border border-slate-800 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('reader')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                  activeTab === 'reader'
                    ? 'bg-amber-500 text-slate-950 font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                PDF Document
              </button>
              <button
                onClick={() => setActiveTab('summary')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                  activeTab === 'summary'
                    ? 'bg-amber-500 text-slate-950 font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Executive Findings
              </button>
              <button
                onClick={() => setActiveTab('chapters')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                  activeTab === 'chapters'
                    ? 'bg-amber-500 text-slate-950 font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Framework Breakdown
              </button>
            </div>

            {/* Quick Actions */}
            <a
              href={pdfUrl}
              download="KhmerTutorial_Online_Research_Paper.pdf"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-medium border border-slate-700 transition-colors"
              title="Download PDF"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden md:inline">Download</span>
            </a>

            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg border border-slate-700 transition-colors"
              title="Open in new window"
            >
              <ExternalLink className="w-4 h-4" />
            </a>

            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg border border-slate-700 transition-colors"
              title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              className="p-1.5 bg-slate-800 hover:bg-red-500/20 text-slate-300 hover:text-red-400 rounded-lg border border-slate-700 hover:border-red-500/40 transition-colors"
              title="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 flex overflow-hidden">
          {activeTab === 'reader' && (
            <div className="w-full h-full bg-[#161b22] relative flex flex-col">
              <iframe
                src={`${pdfUrl}#toolbar=1&navpanes=1&statusbar=1&view=FitH`}
                className="w-full flex-1 border-0"
                title="KhmerTutorial Online Academic Paper"
              />
              <div className="px-4 py-2 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                  Viewing: KTO_TGI_23830638.pdf
                </span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleCopyLink}
                    className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Link Copied' : 'Copy File URL'}</span>
                  </button>
                  <a
                    href={pdfUrl}
                    download
                    className="text-amber-400 hover:underline"
                  >
                    Direct Download (.pdf)
                  </a>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'summary' && (
            <div className="w-full h-full overflow-y-auto p-6 md:p-8 space-y-6 text-slate-300">
              <div className="border-b border-slate-800 pb-4">
                <h4 className="text-xl font-bold text-white mb-2">Executive Summary & Empirical Findings</h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  This study investigates the operational architecture and market validation of KhmerTutorial Online (KTO)—a specialized two-sided EdTech micro-tutoring marketplace connecting Cambodian undergraduate tutors with international learners seeking conversational Khmer language skills.
                </p>
              </div>

              {/* Empirical Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                  <div className="text-2xl font-bold font-mono text-amber-400">80.2%</div>
                  <div className="text-xs text-white font-medium mt-1">Target Age Cohort</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Undergraduates aged 18–20 in Phnom Penh</div>
                </div>
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                  <div className="text-2xl font-bold font-mono text-emerald-400">34.5%</div>
                  <div className="text-xs text-white font-medium mt-1">Need for Flexible Income</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Require remote earnings to fund tuition & living</div>
                </div>
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                  <div className="text-2xl font-bold font-mono text-rose-400">37.9%</div>
                  <div className="text-xs text-white font-medium mt-1">Reported Academic Anxiety</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Caused by rigid shift work forcing missed lectures</div>
                </div>
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                  <div className="text-2xl font-bold font-mono text-blue-400">1 Hour</div>
                  <div className="text-xs text-white font-medium mt-1">Micro-Slot Duration</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Temporal elasticity between academic lectures</div>
                </div>
              </div>

              {/* Qualitative Discoveries */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
                  <h5 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400" />
                    Finding A: Practical Fluency
                  </h5>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Foreign expatriates, NGO staff, and digital nomads reported frustration with formal grammar institutes, prioritizing situational conversational mastery (ordering food, directing tuk-tuks, market bargaining).
                  </p>
                </div>
                <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
                  <h5 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Finding B: Trial Lesson Flags
                  </h5>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Overcame the marketplace cold-start problem by instituting low-cost trial lesson flags, enabling new student tutors to rapidly gain initial booking velocity and verified student reviews.
                  </p>
                </div>
                <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
                  <h5 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-400" />
                    Finding C: Cross-Border Rails
                  </h5>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Bridged foreign inbound consumer credit cards (Stripe, PayPal) with Cambodian localized settlement networks (ABA PayWay, Wing, Bakong) without prohibitive international wire fees.
                  </p>
                </div>
              </div>

              {/* 5 Starter Modules */}
              <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5">
                <h5 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-amber-400" />
                  Starter Curriculum Modules Designed for Immediate Practical Use
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                  <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                    <div className="text-[10px] font-mono text-amber-400">MODULE 01</div>
                    <div className="text-xs font-semibold text-white mt-1">Greetings & Social Protocol</div>
                    <div className="text-[11px] text-slate-400 mt-1">Formal titles, respectful framing & polite phrasing.</div>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                    <div className="text-[10px] font-mono text-amber-400">MODULE 02</div>
                    <div className="text-xs font-semibold text-white mt-1">Transport & Directions</div>
                    <div className="text-[11px] text-slate-400 mt-1">Directing tuk-tuks, landmarks & spatial vocabulary.</div>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                    <div className="text-[10px] font-mono text-amber-400">MODULE 03</div>
                    <div className="text-xs font-semibold text-white mt-1">Market & Bargaining</div>
                    <div className="text-[11px] text-slate-400 mt-1">Currency denominations (KHR/USD) & price negotiation.</div>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                    <div className="text-[10px] font-mono text-amber-400">MODULE 04</div>
                    <div className="text-xs font-semibold text-white mt-1">Dining & Hospitality</div>
                    <div className="text-[11px] text-slate-400 mt-1">Ordering local meals, dietary preferences & bills.</div>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                    <div className="text-[10px] font-mono text-amber-400">MODULE 05</div>
                    <div className="text-xs font-semibold text-white mt-1">Essential Vocabulary</div>
                    <div className="text-[11px] text-slate-400 mt-1">Emergency expressions, healthcare & daily questions.</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'chapters' && (
            <div className="w-full h-full overflow-y-auto p-6 md:p-8 space-y-4 text-slate-300">
              <div className="border-b border-slate-800 pb-3">
                <h4 className="text-lg font-bold text-white">Seven-Chapter Research Structure</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Full systematic thesis blueprint referenced in KTO_TGI_23830638.pdf
                </p>
              </div>

              <div className="space-y-3">
                {[
                  {
                    num: 'Chapter 1',
                    name: 'Introduction & Problem Formulation',
                    desc: 'Contextualizes higher education economic pressures in Phnom Penh, rigid shift work vs daytime university lectures, and international expat demand.',
                  },
                  {
                    num: 'Chapter 2',
                    name: 'Literature Review & Miles’ Research Gap Taxonomy',
                    desc: 'Synthesizes EdTech marketplaces, micro-labor dynamics, cross-border payment rails, and maps the 7 research gaps (Evidence, Knowledge Void, Practical-Knowledge Conflict, Methodological, Empirical, Theoretical, and Population gaps).',
                  },
                  {
                    num: 'Chapter 3',
                    name: 'Theoretical & Conceptual Framework',
                    desc: 'Grounds KTO in Two-Sided Platform Theory (Rochet & Tirole), Self-Determination Theory (Deci & Ryan), and Human Capital Theory (Becker).',
                  },
                  {
                    num: 'Chapter 4',
                    name: 'Methodology & Technical UX Architecture',
                    desc: 'Exploratory sequential mixed-methods design, quantitative survey (n=80.2% aged 18-20), clickable Figma prototype, 200-300ms ease motion transitions, and 44px tap ergonomics.',
                  },
                  {
                    num: 'Chapter 5',
                    name: 'Empirical Results & Sprint Execution',
                    desc: 'Quantitative demographic mapping, 5 tutor-learner pilot pairings, qualitative thematic analysis, and sprint execution across C-suite roles (CEO, COO, CPO, CRO, CFO).',
                  },
                  {
                    num: 'Chapter 6',
                    name: 'Discussion, Unit Economics & Scope Governance',
                    desc: 'Resolution of urban labor inefficiencies, cross-border settlement spread (Stripe/PayPal 2.9% + $0.30, local Bakong/ABA minimal fee), and MVP scope boundaries.',
                  },
                  {
                    num: 'Chapter 7',
                    name: 'Conclusion, Recommendations & Appendices',
                    desc: 'Contributions to knowledge, recommendations for National Bank of Cambodia (NBC) Bakong API integration, starter curriculum specs, and core database schema contracts.',
                  },
                ].map((ch) => (
                  <div key={ch.num} className="bg-slate-900 border border-slate-800/80 rounded-xl p-4 flex flex-col sm:flex-row sm:items-start gap-3">
                    <span className="font-mono text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2 py-1 rounded shrink-0 self-start">
                      {ch.num}
                    </span>
                    <div>
                      <h5 className="text-sm font-semibold text-white">{ch.name}</h5>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">{ch.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
