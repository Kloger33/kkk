import React, { useState } from 'react';
import { ProjectMockup } from './ProjectMockup';
import { 
  FileText, 
  Download, 
  ExternalLink, 
  Check, 
  BookOpen, 
  Palette, 
  Layers, 
  Globe, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { DESIGNER_INFO, PROJECTS } from '../data/portfolioData';

interface KtoSpotlightSectionProps {
  onOpenPdf: () => void;
  onOpenProject: () => void;
}

export const KtoSpotlightSection: React.FC<KtoSpotlightSectionProps> = ({ onOpenPdf, onOpenProject }) => {
  const [activeTab, setActiveTab] = useState<'system' | 'curriculum' | 'research'>('system');
  const ktoProject = PROJECTS.find((p) => p.id === 'khmer-tutorial-online')!;

  return (
    <section id="featured-case-study" className="py-24 bg-[#0a0d14] border-t border-slate-800/80 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono uppercase tracking-widest text-amber-500">
                Flagship Case Study
              </span>
              <span className="text-slate-600">·</span>
              <span className="text-xs font-mono text-slate-400">Published Research 2026</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              KhmerTutorial Online (KTO)
            </h2>
          </div>
          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <button
              onClick={onOpenProject}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg border border-slate-700 transition-colors flex items-center gap-1.5"
            >
              <span>Explore Case Study</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onOpenPdf}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Read Full Paper (22p)</span>
            </button>
          </div>
        </div>

        {/* 2-Column Split: Visual Mockup left, Spotlight specs right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          
          {/* Left Column: Interactive Visual Showcase */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="rounded-2xl border border-slate-800 overflow-hidden shadow-2xl flex-1 flex flex-col">
              <ProjectMockup type="kto" className="flex-1 min-h-[340px]" isDetailed={true} />
            </div>

            {/* Quick stats ribbon */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-center">
                <div className="text-base font-bold font-mono text-white">80.2%</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Aged 18–20 Supply</div>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-center">
                <div className="text-base font-bold font-mono text-emerald-400">34.5%</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Need Remote Income</div>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-center">
                <div className="text-base font-bold font-mono text-amber-400">1-Hour</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Micro-Tutoring Slots</div>
              </div>
            </div>
          </div>

          {/* Right Column: Tabbed Deep Dive */}
          <div className="lg:col-span-6 bg-[#0e131d] border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Tabs */}
              <div className="flex border-b border-slate-800 gap-4 mb-6 text-xs font-medium">
                <button
                  onClick={() => setActiveTab('system')}
                  className={`pb-3 transition-colors relative flex items-center gap-1.5 ${
                    activeTab === 'system' ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Palette className="w-3.5 h-3.5" />
                  <span>Design System</span>
                  {activeTab === 'system' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400" />}
                </button>
                <button
                  onClick={() => setActiveTab('curriculum')}
                  className={`pb-3 transition-colors relative flex items-center gap-1.5 ${
                    activeTab === 'curriculum' ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>5 Starter Modules</span>
                  {activeTab === 'curriculum' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400" />}
                </button>
                <button
                  onClick={() => setActiveTab('research')}
                  className={`pb-3 transition-colors relative flex items-center gap-1.5 ${
                    activeTab === 'research' ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Research Synthesis</span>
                  {activeTab === 'research' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400" />}
                </button>
              </div>

              {/* Tab 1: Design System */}
              {activeTab === 'system' && (
                <div className="space-y-4">
                  <p className="text-xs text-slate-300 leading-relaxed">
                    The visual identity honors Cambodian cultural heritage through an Angkor Lotus logomark geometry while maintaining an uncluttered, modern digital product interface for international learners.
                  </p>
                  
                  {/* Swatches */}
                  <div>
                    <span className="text-[11px] font-mono uppercase text-slate-400 block mb-2">Brand Palette</span>
                    <div className="grid grid-cols-5 gap-2">
                      {ktoProject.palette.map((c) => (
                        <div key={c.hex} className="text-center">
                          <div 
                            className="w-full h-10 rounded-md border border-white/10 shadow-sm mb-1" 
                            style={{ backgroundColor: c.hex }} 
                          />
                          <span className="text-[10px] font-mono text-slate-300 block truncate">{c.hex}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Ergonomics & Tech specs */}
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 space-y-2 text-xs">
                    <div className="flex items-center justify-between text-slate-300">
                      <span>Touch Ergonomics</span>
                      <span className="font-mono text-amber-400">44px Minimum Tap Targets</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-300 border-t border-slate-800/80 pt-1.5">
                      <span>Interface Motion</span>
                      <span className="font-mono text-emerald-400">200–300ms Ease Transitions</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-300 border-t border-slate-800/80 pt-1.5">
                      <span>Security & Role RBAC</span>
                      <span className="font-mono text-blue-400">JWT + argon2 Dual-Role Auth</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Curriculum */}
              {activeTab === 'curriculum' && (
                <div className="space-y-2.5">
                  <p className="text-xs text-slate-300 leading-relaxed mb-3">
                    Created to overcome traditional grammar friction by delivering immediate conversational capability for foreigners in Cambodia.
                  </p>
                  {[
                    { num: '01', title: 'Greetings & Social Protocol', desc: 'Formal titles, polite framing, body language & respect markers.' },
                    { num: '02', title: 'Transportation & Directions', desc: 'Directing PassApp/Grab tuk-tuks, street numbers & urban landmarks.' },
                    { num: '03', title: 'Market Navigation & Bargaining', desc: 'Price negotiation, Riel/Dollar currency conversions & numbers.' },
                    { num: '04', title: 'Dining & Hospitality', desc: 'Ordering street noodles, Khmer coffee, dietary preferences & bills.' },
                    { num: '05', title: 'Essential Vocabulary & Emergency', desc: 'Urgent phrases, pharmacy inquiries & fundamental help requests.' },
                  ].map((m) => (
                    <div key={m.num} className="bg-slate-900 border border-slate-800 rounded-lg p-2.5 flex items-start gap-3">
                      <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded">
                        {m.num}
                      </span>
                      <div>
                        <div className="text-xs font-semibold text-white">{m.title}</div>
                        <div className="text-[11px] text-slate-400">{m.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 3: Research */}
              {activeTab === 'research' && (
                <div className="space-y-3.5 text-xs text-slate-300">
                  <p className="leading-relaxed">
                    Grounds EdTech marketplace theory in Miles' (2017) Research Gap Taxonomy, resolving the acute trade-off Cambodian undergraduates face between degree completion and shift work.
                  </p>
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 space-y-2">
                    <div className="font-semibold text-white">Three Grounding Theories:</div>
                    <ul className="space-y-1.5 text-slate-400">
                      <li>• <strong className="text-slate-200">Two-Sided Platform Theory</strong> (Rochet & Tirole) — Mediating cross-border search friction.</li>
                      <li>• <strong className="text-slate-200">Self-Determination Theory</strong> (Deci & Ryan) — Autonomy reduces academic distress.</li>
                      <li>• <strong className="text-slate-200">Human Capital Theory</strong> (Becker) — Soft skills & cultural fluency asset-building.</li>
                    </ul>
                  </div>
                  <div className="text-[11px] text-amber-400/90 font-mono">
                    Published in: KTO_TGI_23830638.pdf (Available in workspace)
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Document Bar */}
            <div className="pt-6 border-t border-slate-800 flex items-center justify-between text-xs mt-6">
              <div className="flex items-center gap-2 text-slate-400">
                <FileText className="w-4 h-4 text-amber-400" />
                <span>KTO_TGI_23830638.pdf</span>
              </div>
              <button
                onClick={onOpenPdf}
                className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 transition-colors"
              >
                <span>Open PDF Document</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
