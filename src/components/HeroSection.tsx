import React, { useState } from 'react';
import { DESIGNER_INFO, PROJECTS, Project } from '../data/portfolioData';
import { ProjectMockup } from './ProjectMockup';
import { 
  ArrowRight, 
  FileText, 
  Sparkles, 
  Layers, 
  Download,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

interface HeroSectionProps {
  onOpenPdf: () => void;
  onSelectProject: (project: Project) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenPdf, onSelectProject }) => {
  const [activePreview, setActivePreview] = useState<'kto' | 'kroma' | 'mekong'>('kto');

  const ktoProject = PROJECTS.find((p) => p.id === 'khmer-tutorial-online')!;
  const kromaProject = PROJECTS.find((p) => p.id === 'kroma-studio')!;
  const mekongProject = PROJECTS.find((p) => p.id === 'mekong-roasters')!;

  const getActiveProject = () => {
    if (activePreview === 'kto') return ktoProject;
    if (activePreview === 'kroma') return kromaProject;
    return mekongProject;
  };

  return (
    <section className="relative pt-12 pb-20 overflow-hidden bg-[#0c0d12]">
      {/* Background ambient light */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-amber-500/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Split-Screen Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Kicker */}
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-500">
              <span>Graphic Designer & Brand Architect</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400">Phnom Penh, Cambodia</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08] [text-wrap:balance]">
              Crafting purposeful visual identities, editorial systems & digital experiences.
            </h1>

            {/* Lead Copy */}
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
              I partner with founders, cultural foundations, and research groups to formulate disciplined brand languages, bilingual Khmer-Latin typography, tactile packaging, and research-grounded digital products.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#works"
                className="px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-lg hover:shadow-amber-500/20 flex items-center gap-2"
              >
                <span>Explore Selected Works</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenPdf}
                className="px-5 py-3.5 bg-slate-900 hover:bg-slate-800 text-slate-200 text-sm font-semibold rounded-xl border border-slate-800 hover:border-slate-700 transition-all flex items-center gap-2.5 shadow-sm"
              >
                <FileText className="w-4 h-4 text-amber-400" />
                <span>Read Research Publication (22p)</span>
              </button>
            </div>

            {/* Status notice */}
            <div className="pt-2 text-xs text-slate-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Available for brand, editorial & product design commissions</span>
            </div>

          </div>

          {/* Right Column: Visual Showcase Container */}
          <div className="lg:col-span-5">
            <div className="bg-[#111622] border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-2xl relative">
              
              {/* Preview Selector Segmented Tabs */}
              <div className="flex items-center justify-between mb-4 border-b border-slate-800/80 pb-3">
                <span className="text-xs font-mono text-slate-400">Interactive Preview</span>
                <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 p-1 rounded-lg">
                  <button
                    onClick={() => setActivePreview('kto')}
                    className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-colors ${
                      activePreview === 'kto'
                        ? 'bg-amber-500 text-slate-950 font-semibold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    KTO EdTech
                  </button>
                  <button
                    onClick={() => setActivePreview('kroma')}
                    className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-colors ${
                      activePreview === 'kroma'
                        ? 'bg-amber-500 text-slate-950 font-semibold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Typography
                  </button>
                  <button
                    onClick={() => setActivePreview('mekong')}
                    className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-colors ${
                      activePreview === 'mekong'
                        ? 'bg-amber-500 text-slate-950 font-semibold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Packaging
                  </button>
                </div>
              </div>

              {/* Dynamic Mockup */}
              <div className="w-full rounded-xl overflow-hidden shadow-lg border border-slate-800">
                <ProjectMockup type={activePreview} className="min-h-[290px]" />
              </div>

              {/* Quick Trigger to view the active project modal */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <div>
                  <div className="text-white font-medium truncate max-w-[200px]">
                    {getActiveProject().title}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {getActiveProject().category} · {getActiveProject().year}
                  </div>
                </div>
                <button
                  onClick={() => onSelectProject(getActiveProject())}
                  className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 transition-colors"
                >
                  <span>Inspect Case</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>

        </div>

        {/* 4-Column KPI / Credential Strip placed in a full-width row below the hero split */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 pt-10 border-t border-slate-800/80">
          <div className="bg-[#0f141f] border border-slate-800/80 rounded-xl p-5">
            <div className="text-3xl font-bold font-mono text-white tabular-nums">
              {DESIGNER_INFO.yearsExperience}
            </div>
            <div className="text-xs font-semibold text-slate-200 mt-1">Years Experience</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Specialized visual craft</div>
          </div>

          <div className="bg-[#0f141f] border border-slate-800/80 rounded-xl p-5">
            <div className="text-3xl font-bold font-mono text-amber-400 tabular-nums">
              {DESIGNER_INFO.projectsCompleted}
            </div>
            <div className="text-xs font-semibold text-slate-200 mt-1">Identities & Systems</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Brand marks, print & UI</div>
          </div>

          <div className="bg-[#0f141f] border border-slate-800/80 rounded-xl p-5">
            <div className="text-3xl font-bold font-mono text-emerald-400 tabular-nums">
              22 Pages
            </div>
            <div className="text-xs font-semibold text-slate-200 mt-1">Research Publication</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Seven-Chapter framework</div>
          </div>

          <div className="bg-[#0f141f] border border-slate-800/80 rounded-xl p-5">
            <div className="text-3xl font-bold font-mono text-blue-400 tabular-nums">
              {DESIGNER_INFO.clientSatisfaction}
            </div>
            <div className="text-xs font-semibold text-slate-200 mt-1">Client Satisfaction</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Across Cambodia & global</div>
          </div>
        </div>

      </div>
    </section>
  );
};
