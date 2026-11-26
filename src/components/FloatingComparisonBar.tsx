import React from 'react';
import { Tutor } from '../data/tutorsData';
import { X, ArrowRight, Layers, Trash2 } from 'lucide-react';

interface FloatingComparisonBarProps {
  comparedTutors: Tutor[];
  onOpenComparison: () => void;
  onRemoveTutor: (tutorId: string) => void;
  onClearAll: () => void;
}

export const FloatingComparisonBar: React.FC<FloatingComparisonBarProps> = ({
  comparedTutors,
  onOpenComparison,
  onRemoveTutor,
  onClearAll,
}) => {
  if (comparedTutors.length === 0) return null;

  return (
    <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-24px)] max-w-xl sm:w-auto animate-bounce-subtle">
      <div className="bg-slate-950/95 text-white backdrop-blur-md border border-slate-800 rounded-2xl p-2.5 sm:px-5 sm:py-3.5 shadow-[0_20px_50px_rgba(0,0,0,0.35)] flex items-center justify-between gap-2.5 sm:gap-6">
        
        {/* Left: Tutors Avatars Stack & Counter */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-300 font-semibold pr-2 border-r border-slate-800">
            <Layers className="w-4 h-4 text-teal-400" />
            <span>Compare ({comparedTutors.length}/4)</span>
          </div>

          {/* Selected Tutor Micro Avatars */}
          <div className="flex items-center -space-x-1.5 sm:space-x-1">
            {comparedTutors.map((tutor) => (
              <div 
                key={tutor.id} 
                className="relative group/thumb"
                title={`${tutor.name} (${tutor.hourlyRate}/hr)`}
              >
                <div className={`w-8 h-8 rounded-full bg-gradient-to-tr ${tutor.avatarBg} text-white font-bold text-[11px] flex items-center justify-center border-2 border-slate-900 shadow-xs cursor-pointer hover:scale-105 transition-transform`}>
                  {tutor.initials}
                </div>
                {/* Remove button on hover */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveTutor(tutor.id);
                  }}
                  className="absolute -top-1 -right-1 w-4 h-4 bg-slate-800 hover:bg-rose-600 text-white rounded-full flex items-center justify-center text-[9px] shadow-xs transition-colors"
                  title={`Remove ${tutor.name}`}
                >
                  ✕
                </button>
              </div>
            ))}

            {/* Empty slots placeholders */}
            {Array.from({ length: Math.max(0, 4 - comparedTutors.length) }).slice(0, 2).map((_, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full border border-dashed border-slate-700 text-slate-500 text-[10px] hidden sm:flex items-center justify-center select-none"
                title="Select another tutor to compare"
              >
                +
              </div>
            ))}
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onClearAll}
            className="text-xs text-slate-400 hover:text-white px-2 py-1.5 rounded-lg hover:bg-slate-800 transition-colors hidden sm:inline"
            title="Clear all selections"
          >
            Clear
          </button>

          <button
            onClick={onOpenComparison}
            className="px-4 py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 hover:scale-105"
          >
            <span>Compare Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
