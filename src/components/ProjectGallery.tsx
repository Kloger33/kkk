import React, { useState, useMemo } from 'react';
import { Project, PROJECTS } from '../data/portfolioData';
import { ProjectMockup } from './ProjectMockup';
import { Search, X, ArrowUpRight, FileText, Filter, SlidersHorizontal } from 'lucide-react';

interface ProjectGalleryProps {
  onSelectProject: (project: Project) => void;
  onOpenPdf: () => void;
}

export const ProjectGallery: React.FC<ProjectGalleryProps> = ({ onSelectProject, onOpenPdf }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Brand Identity', 'Editorial & Print', 'Packaging', 'UI/UX & Systems'];

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((project) => {
      const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        project.title.toLowerCase().includes(q) ||
        project.subtitle.toLowerCase().includes(q) ||
        project.client.toLowerCase().includes(q) ||
        project.summary.toLowerCase().includes(q) ||
        project.tags.some((t) => t.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="works" className="py-24 bg-[#0c0e14] relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-slate-800">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-amber-500">
              Curated Index
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mt-2">
              Selected Design Works
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-md mt-4 md:mt-0 leading-relaxed">
            Spanning bilingual typography, tactile packaging systems, cultural festival wayfinding, and digital interfaces.
          </p>
        </div>

        {/* Filter Bar & Search Controls */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-800/80">
          
          {/* Category Tabs (Segmented Buttons) */}
          <div className="flex items-center gap-1.5 p-1 bg-[#10141e] border border-slate-800 rounded-xl overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects, client, tags..."
              className="w-full pl-9 pr-9 py-2 bg-[#10141e] border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

        </div>

        {/* Project Results Count */}
        <div className="flex items-center justify-between text-xs text-slate-400 mb-6 font-mono">
          <span>Displaying {filteredProjects.length} of {PROJECTS.length} Projects</span>
          {selectedCategory !== 'All' && <span>Category: {selectedCategory}</span>}
        </div>

        {/* Bento Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => {
              const isLarge = project.id === 'khmer-tutorial-online';

              return (
                <div
                  key={project.id}
                  onClick={() => onSelectProject(project)}
                  className={`group bg-[#101520] border border-slate-800/90 hover:border-amber-500/50 rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 flex flex-col justify-between hover:shadow-2xl hover:-translate-y-1 ${
                    isLarge ? 'md:col-span-2 lg:col-span-2' : 'col-span-1'
                  }`}
                >
                  {/* Card Visual Header / Mockup */}
                  <div className="relative w-full overflow-hidden bg-slate-950">
                    <ProjectMockup 
                      type={project.mockupType} 
                      className={`w-full transition-transform duration-300 group-hover:scale-[1.01] ${
                        isLarge ? 'min-h-[300px] sm:min-h-[340px]' : 'min-h-[250px]'
                      }`} 
                    />
                  </div>

                  {/* Card Content & Metadata */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Unboxed Metadata (Zero-Pill Rule) */}
                      <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                        <span className="text-amber-400 font-mono">{project.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{project.year}</span>
                        <span aria-hidden="true">·</span>
                        <span className="truncate">{project.client}</span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors flex items-center justify-between">
                        <span>{project.title}</span>
                        <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors shrink-0 ml-2" />
                      </h3>

                      <p className="text-xs text-slate-400 font-serif-title italic mt-0.5">
                        {project.subtitle}
                      </p>

                      <p className="text-xs text-slate-300 mt-3 leading-relaxed line-clamp-2">
                        {project.summary}
                      </p>
                    </div>

                    {/* Footer tags & attachment notice */}
                    <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
                      {/* Unboxed Tag Row */}
                      <div className="flex items-center gap-2 text-slate-400 text-[11px] truncate max-w-[70%]">
                        {project.tags.slice(0, 3).map((tag, idx) => (
                          <React.Fragment key={tag}>
                            {idx > 0 && <span aria-hidden="true">·</span>}
                            <span>{tag}</span>
                          </React.Fragment>
                        ))}
                      </div>

                      {project.hasPdfAttachment ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenPdf();
                          }}
                          className="flex items-center gap-1 text-[11px] font-mono text-amber-400 hover:text-amber-300 font-semibold transition-colors"
                          title="Open attached research document"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>22p Research</span>
                        </button>
                      ) : (
                        <span className="text-[11px] font-mono text-slate-400 group-hover:text-amber-400 transition-colors">
                          View Case Study →
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-20 text-center border border-slate-800 bg-[#0e131d] rounded-2xl p-8 space-y-4">
            <p className="text-slate-400 text-sm">
              No projects found matching the keyword "<span className="text-white font-medium">{searchQuery}</span>".
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-amber-500 text-slate-950 font-bold text-xs rounded-lg hover:bg-amber-400 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
