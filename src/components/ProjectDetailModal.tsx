import React, { useEffect, useState } from 'react';
import { Project } from '../data/portfolioData';
import { ProjectMockup } from './ProjectMockup';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  FileText, 
  Check, 
  Copy, 
  ArrowUpRight,
  ExternalLink,
  Layers,
  Palette,
  Type
} from 'lucide-react';

interface ProjectDetailModalProps {
  project: Project | null;
  allProjects: Project[];
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (project: Project) => void;
  onOpenPdf: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  allProjects,
  isOpen,
  onClose,
  onSelectProject,
  onOpenPdf,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'system' | 'deliverables'>('overview');
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, project]);

  if (!isOpen || !project) return null;

  const currentIndex = allProjects.findIndex((p) => p.id === project.id);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : allProjects[allProjects.length - 1];
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : allProjects[0];

  const handlePrev = () => onSelectProject(prevProject);
  const handleNext = () => onSelectProject(nextProject);

  const copyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-5xl bg-[#0f141f] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#131b2a] shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
              {project.category}
            </span>
            <span className="text-slate-400 text-xs hidden sm:inline">·</span>
            <span className="text-slate-400 text-xs hidden sm:inline">{project.year}</span>
            <span className="text-slate-400 text-xs hidden sm:inline">·</span>
            <span className="text-slate-300 text-xs hidden sm:inline">{project.client}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              title="Previous project (←)"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              title="Next project (→)"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <div className="w-[1px] h-4 bg-slate-700 mx-1" />
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-red-500/20 text-slate-300 hover:text-red-400 transition-colors"
              title="Close modal (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto flex-1 p-6 sm:p-8 space-y-8">
          {/* Header Title & Intro */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {project.title}
            </h2>
            <p className="text-base text-slate-400 mt-1 font-serif-title italic">
              {project.subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-4 text-xs text-slate-300">
              <div className="bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg">
                <span className="text-slate-400">Role: </span>
                <span className="text-white font-medium">{project.role}</span>
              </div>
              <div className="bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg">
                <span className="text-slate-400">Client: </span>
                <span className="text-white font-medium">{project.client}</span>
              </div>
              <div className="bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg">
                <span className="text-slate-400">Timeline: </span>
                <span className="text-white font-medium">{project.year}</span>
              </div>
              {project.hasPdfAttachment && (
                <button
                  onClick={onOpenPdf}
                  className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold px-4 py-1.5 rounded-lg transition-colors shadow-sm ml-auto"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Open 22-Page Research Document</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Hero Visual Mockup Container */}
          <div className="w-full rounded-xl overflow-hidden shadow-2xl border border-slate-800">
            <ProjectMockup type={project.mockupType} className="min-h-[320px] sm:min-h-[360px]" isDetailed={true} />
          </div>

          {/* Tab Selector */}
          <div className="flex border-b border-slate-800 gap-6 text-sm">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-3 font-medium transition-colors relative flex items-center gap-2 ${
                activeTab === 'overview'
                  ? 'text-amber-400 font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Case Study Narrative</span>
              {activeTab === 'overview' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('system')}
              className={`pb-3 font-medium transition-colors relative flex items-center gap-2 ${
                activeTab === 'system'
                  ? 'text-amber-400 font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Palette className="w-4 h-4" />
              <span>Visual System & Colors</span>
              {activeTab === 'system' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('deliverables')}
              className={`pb-3 font-medium transition-colors relative flex items-center gap-2 ${
                activeTab === 'deliverables'
                  ? 'text-amber-400 font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Type className="w-4 h-4" />
              <span>Deliverables & Impact</span>
              {activeTab === 'deliverables' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400" />
              )}
            </button>
          </div>

          {/* Tab 1: Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-6 text-slate-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-5 space-y-2">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400">
                    The Challenge & Friction
                  </h4>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {project.challenge}
                  </p>
                </div>
                <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-5 space-y-2">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400">
                    The Design & Strategic Solution
                  </h4>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              </div>

              {project.metrics && project.metrics.length > 0 && (
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-4">
                    Key Quantitative Metrics & Evidence
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {project.metrics.map((m, i) => (
                      <div key={i} className="border-l-2 border-amber-500/60 pl-3">
                        <div className="text-xl font-bold font-mono text-white">{m.value}</div>
                        <div className="text-xs text-slate-400 mt-0.5">{m.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="prose prose-invert max-w-none text-sm text-slate-300 leading-relaxed">
                <p>{project.overview}</p>
              </div>
            </div>
          )}

          {/* Tab 2: Visual System */}
          {activeTab === 'system' && (
            <div className="space-y-6">
              {/* Color Palette */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                  Color Token Specification (Click to copy hex)
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {project.palette.map((color) => (
                    <button
                      key={color.hex}
                      onClick={() => copyColor(color.hex)}
                      className="group bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl p-3 text-left transition-all"
                    >
                      <div
                        className="w-full h-14 rounded-lg mb-2 shadow-inner border border-white/10 flex items-center justify-center"
                        style={{ backgroundColor: color.hex }}
                      >
                        <span className="opacity-0 group-hover:opacity-100 bg-black/60 text-white text-[10px] font-mono px-2 py-0.5 rounded transition-opacity">
                          {copiedHex === color.hex ? 'Copied!' : 'Copy'}
                        </span>
                      </div>
                      <div className="text-xs font-semibold text-white truncate">{color.name}</div>
                      <div className="text-[11px] font-mono text-amber-400 flex items-center justify-between">
                        <span>{color.hex}</span>
                        {copiedHex === color.hex ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3 text-slate-500 opacity-0 group-hover:opacity-100" />
                        )}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1 truncate">{color.role}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Typography Specs */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                  Typography Hierarchy
                </h4>
                <div className="space-y-3">
                  {project.typography.map((t, idx) => (
                    <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <span className="text-xs font-mono text-amber-400">{t.role}</span>
                        <div className="text-base font-bold text-white">{t.family}</div>
                      </div>
                      <div className="text-xs text-slate-400 sm:max-w-xs">{t.note}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Deliverables */}
          {activeTab === 'deliverables' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                  Delivered Assets & Outputs
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.deliverables.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 flex items-start gap-3"
                    >
                      <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="text-xs text-slate-200 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {project.hasPdfAttachment && (
                <div className="p-5 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h5 className="text-sm font-bold text-white flex items-center gap-2">
                      <FileText className="w-4 h-4 text-amber-400" />
                      Included Academic Publication
                    </h5>
                    <p className="text-xs text-slate-300 mt-1">
                      Read the full 22-page research document detailing the Seven-Chapter operational framework.
                    </p>
                  </div>
                  <button
                    onClick={onOpenPdf}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-lg transition-colors shrink-0 shadow"
                  >
                    Launch Interactive Reader
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
