import React from 'react';
import { DESIGNER_INFO, TESTIMONIALS } from '../data/portfolioData';
import { 
  FileText, 
  Download, 
  Award, 
  MapPin, 
  Languages, 
  GraduationCap, 
  Terminal,
  Quote,
  Check
} from 'lucide-react';

interface AboutSectionProps {
  onOpenPdf: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenPdf }) => {
  const tools = [
    { name: 'Adobe Illustrator', category: 'Vector & Identity' },
    { name: 'Figma', category: 'UI & Design Systems' },
    { name: 'Adobe InDesign', category: 'Editorial & Monograph' },
    { name: 'Adobe Photoshop', category: 'Retouching & Textures' },
    { name: 'Glyphs 3', category: 'Typeface Engineering' },
    { name: 'After Effects', category: 'Kinetic Motion' },
    { name: 'Tailwind CSS', category: 'Frontend Tokens' },
    { name: 'Prepress & Print Specs', category: 'Physical Production' },
  ];

  return (
    <section id="about" className="py-24 bg-[#0a0d14] border-t border-slate-800/80 relative">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-slate-800">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-amber-500">
              Biographical Profile
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mt-2">
              About Soeun Kongsovann
            </h2>
          </div>
          <div className="flex items-center gap-2 mt-4 md:mt-0 text-xs text-slate-400">
            <MapPin className="w-4 h-4 text-amber-500" />
            <span>Phnom Penh, Cambodia · Remote Worldwide</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          
          {/* Left Column: Portrait & Stats Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0f141f] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
              {/* Designer Avatar Presentation */}
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-300 p-0.5 shadow-xl">
                  <div className="w-full h-full bg-slate-950 rounded-2xl flex items-center justify-center text-white font-bold text-2xl font-serif-title">
                    SK
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{DESIGNER_INFO.name}</h3>
                  <div className="text-xs text-amber-400 font-mono mt-0.5">Graphic & Brand Specialist</div>
                  <div className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>{DESIGNER_INFO.status}</span>
                  </div>
                </div>
              </div>

              {/* Bio summary */}
              <p className="text-xs text-slate-300 leading-relaxed">
                {DESIGNER_INFO.bio}
              </p>

              {/* Core Attributes */}
              <div className="space-y-3 pt-4 border-t border-slate-800 text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <GraduationCap className="w-4 h-4 text-amber-500" />
                    <span>Education & Focus</span>
                  </span>
                  <span className="font-medium text-white">Visual Arts & UX Research</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <Languages className="w-4 h-4 text-amber-500" />
                    <span>Language Proficiencies</span>
                  </span>
                  <span className="font-medium text-white">Khmer (Native) · English (Fluent)</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <Award className="w-4 h-4 text-amber-500" />
                    <span>Disciplines</span>
                  </span>
                  <span className="font-medium text-white">Brand, Print, Packaging, UI</span>
                </div>
              </div>

              {/* Download Buttons */}
              <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={onOpenPdf}
                  className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow"
                >
                  <FileText className="w-4 h-4" />
                  <span>Read 22p Paper</span>
                </button>
                <a
                  href={DESIGNER_INFO.pdfDocument.url}
                  download="Soeun_Kongsovann_Portfolio_Publication.pdf"
                  className="py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold rounded-lg border border-slate-800 transition-colors flex items-center justify-center gap-1.5"
                >
                  <Download className="w-4 h-4 text-amber-400" />
                  <span>Download PDF</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Design Philosophy & Tools */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-3">Design Philosophy</h3>
              <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
                <p>
                  Graphic design is fundamentally an act of structural clarity and cultural resonance. In Southeast Asia's rapidly expanding creative economy, visual communication often swings between two extremes: imported Western corporate templates, or nostalgic traditional ornamentation.
                </p>
                <p>
                  My practice occupies the deliberate middle ground. I bridge the classical elegance of Khmer typography and organic textures with the architectural precision of international modernist grids.
                </p>
                <p>
                  Every brand identity or packaging system I build is anchored in empirical research—as demonstrated in my 22-page research publication on the <em>KhmerTutorial Online</em> platform. Form follows understanding.
                </p>
              </div>
            </div>

            {/* Tool Stack */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-4">
                Software & Technical Toolkit
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {tools.map((t) => (
                  <div key={t.name} className="p-3 bg-[#0e131d] border border-slate-800/80 rounded-xl">
                    <div className="text-xs font-semibold text-white truncate">{t.name}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5 truncate">{t.category}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonials */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-4">
                Endorsements & Collaborations
              </h4>
              <div className="space-y-4">
                {TESTIMONIALS.map((item, idx) => (
                  <div key={idx} className="bg-[#0e131d] border border-slate-800/90 rounded-xl p-5 space-y-3">
                    <p className="text-xs text-slate-300 italic leading-relaxed">
                      "{item.quote}"
                    </p>
                    <div className="flex items-center justify-between text-xs border-t border-slate-800/80 pt-3">
                      <div>
                        <span className="font-semibold text-white">{item.author}</span>
                        <span className="text-slate-400"> · {item.title}</span>
                      </div>
                      <span className="text-[11px] font-mono text-amber-400">{item.organization}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
