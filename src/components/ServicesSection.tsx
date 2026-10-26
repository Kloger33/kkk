import React from 'react';
import { SERVICES } from '../data/portfolioData';
import { Check, ArrowRight, Sparkles } from 'lucide-react';

interface ServicesSectionProps {
  onSelectService: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  return (
    <section id="services" className="py-24 bg-[#0c0f17] border-t border-slate-800/80 relative">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-slate-800">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-amber-500">
              Capabilities & Offerings
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mt-2">
              Design services tailored for high-conviction brands.
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-md mt-4 md:mt-0 leading-relaxed">
            Every engagement begins with deep research and culminates in meticulous craft—whether designing a bilingual visual identity or an enterprise design system.
          </p>
        </div>

        {/* 4 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {SERVICES.map((service) => (
            <div 
              key={service.number}
              className="bg-[#101622] border border-slate-800/90 hover:border-slate-700/80 rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all group hover:shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 rounded">
                    {service.number}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    Est. {service.timeline}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">
                  {service.description}
                </p>

                {/* Deliverables checklist */}
                <div className="mt-6 pt-5 border-t border-slate-800/80 space-y-2">
                  <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">
                    Key Deliverables
                  </div>
                  {service.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800/80">
                <button
                  onClick={() => onSelectService(service.title)}
                  className="w-full py-2.5 bg-slate-900 group-hover:bg-amber-500 text-slate-300 group-hover:text-slate-950 text-xs font-semibold rounded-lg border border-slate-800 group-hover:border-amber-400 transition-all flex items-center justify-center gap-2"
                >
                  <span>Request Scope for {service.title.split(' ')[0]}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 4-Step Creative Process */}
        <div className="border border-slate-800 bg-[#0d121c] rounded-2xl p-8">
          <div className="max-w-xl mb-8">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-500">Methodology</span>
            <h3 className="text-xl font-bold text-white mt-1">A Rigorous, Repeatable Creative Process</h3>
            <p className="text-xs text-slate-400 mt-1">
              Inspired by academic inquiry and commercial design standards.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                name: 'Research & Discovery',
                desc: 'Synthesizing market voids, user demographics, cultural baselines, and competitive whitespace.',
              },
              {
                step: '02',
                name: 'Identity Exploration',
                desc: 'Developing distinctive typographic pairings, symbol geometries, and mood boards for alignment.',
              },
              {
                step: '03',
                name: 'Precision Craft',
                desc: 'Refining optical vectors, kerning, print finishing dielines, and WCAG AA contrast compliance.',
              },
              {
                step: '04',
                name: 'System Delivery',
                desc: 'Packaging design guidelines, token packages, vendor-ready prepress, and digital Figma libraries.',
              },
            ].map((p) => (
              <div key={p.step} className="border-l-2 border-slate-800 pl-4 py-1">
                <span className="text-xs font-mono font-bold text-amber-400">{p.step}.</span>
                <h4 className="text-sm font-semibold text-white mt-1">{p.name}</h4>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
