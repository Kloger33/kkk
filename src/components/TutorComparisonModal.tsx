import React from 'react';
import { Tutor } from '../data/tutorsData';
import { 
  X, 
  Star, 
  ShieldCheck, 
  GraduationCap, 
  Clock, 
  Calendar, 
  MessageSquare, 
  CheckCircle2, 
  Sparkles, 
  Zap, 
  Award, 
  BookOpen, 
  Users,
  ArrowRight,
  TrendingUp,
  Trash2
} from 'lucide-react';

interface TutorComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  comparedTutors: Tutor[];
  onRemoveTutor: (tutorId: string) => void;
  onClearAll: () => void;
  onBook: (tutor: Tutor) => void;
  onMessage: (tutor: Tutor) => void;
  onViewProfile: (tutor: Tutor) => void;
}

export const TutorComparisonModal: React.FC<TutorComparisonModalProps> = ({
  isOpen,
  onClose,
  comparedTutors,
  onRemoveTutor,
  onClearAll,
  onBook,
  onMessage,
  onViewProfile,
}) => {
  if (!isOpen) return null;

  // Find lowest price and highest rating for highlight badges
  const lowestPrice = Math.min(...comparedTutors.map((t) => t.hourlyRate));
  const lowestTrial = Math.min(...comparedTutors.map((t) => t.trialPrice));
  const highestRating = Math.max(...comparedTutors.map((t) => t.rating));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div 
        className="relative w-full max-w-6xl bg-white text-slate-900 rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[94vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80 shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-teal-800 bg-teal-50 border border-teal-200 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Smart Side-by-Side Comparison
              </span>
              <span className="text-xs text-slate-400">·</span>
              <span className="text-xs text-slate-600 font-medium">
                {comparedTutors.length} of 4 Tutors Selected
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
              Compare Cambodian Khmer Tutors
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClearAll}
              className="text-xs font-semibold text-slate-500 hover:text-rose-600 px-3 py-1.5 rounded-lg hover:bg-rose-50 transition-colors flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-200 rounded-full transition-colors"
              title="Close comparison"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Comparison Content */}
        <div className="overflow-x-auto overflow-y-auto flex-1 p-6">
          {comparedTutors.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <p className="text-slate-500 text-sm">No tutors selected for comparison.</p>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-teal-600 text-white rounded-xl text-xs font-bold shadow-xs hover:bg-teal-700"
              >
                Browse Tutors
              </button>
            </div>
          ) : (
            <div className="min-w-[680px]">
              {/* Tutor Profiles Top Grid */}
              <div 
                className="grid gap-4 pb-6 border-b border-slate-200"
                style={{ gridTemplateColumns: `repeat(${comparedTutors.length}, minmax(0, 1fr))` }}
              >
                {comparedTutors.map((tutor) => {
                  const isLowestRate = tutor.hourlyRate === lowestPrice;
                  const isTopRated = tutor.rating === highestRating;

                  return (
                    <div 
                      key={tutor.id}
                      className="bg-slate-50/70 border border-slate-200 rounded-2xl p-4 flex flex-col justify-between space-y-3 relative group"
                    >
                      {/* Remove Button */}
                      <button
                        onClick={() => onRemoveTutor(tutor.id)}
                        className="absolute top-2.5 right-2.5 p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-colors"
                        title="Remove from comparison"
                      >
                        <X className="w-4 h-4" />
                      </button>

                      {/* Header Avatar & Name */}
                      <div className="flex items-center gap-3">
                        <div className={`w-14 h-14 rounded-full bg-gradient-to-tr ${tutor.avatarBg} text-white font-bold text-lg flex items-center justify-center shadow-sm shrink-0 border border-white`}>
                          {tutor.initials}
                        </div>
                        <div className="pr-4">
                          <h4 
                            onClick={() => {
                              onClose();
                              onViewProfile(tutor);
                            }}
                            className="font-bold text-base text-slate-900 hover:text-teal-700 cursor-pointer transition-colors"
                          >
                            {tutor.name}
                          </h4>
                          <span className="text-[11px] text-teal-700 font-semibold flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3" />
                            <span>Native Speaker</span>
                          </span>
                        </div>
                      </div>

                      {/* University Credential */}
                      <div className="text-xs text-slate-600 space-y-0.5">
                        <div className="flex items-center gap-1 font-semibold text-slate-800">
                          <GraduationCap className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          <span className="truncate">{tutor.university}</span>
                        </div>
                        <div className="text-slate-400 pl-4">{tutor.year}</div>
                      </div>

                      {/* Key Badges */}
                      <div className="flex flex-wrap items-center gap-1 pt-1">
                        {isLowestRate && (
                          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                            Best Value (${tutor.hourlyRate}/hr)
                          </span>
                        )}
                        {isTopRated && (
                          <span className="text-[10px] font-bold text-purple-800 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-full">
                            Top Rated ({tutor.rating.toFixed(1)} ★)
                          </span>
                        )}
                        {tutor.superTutor && (
                          <span className="text-[10px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                            Super Tutor
                          </span>
                        )}
                      </div>

                      {/* Top Action CTAs */}
                      <div className="pt-2 space-y-1.5 border-t border-slate-200/60">
                        <button
                          onClick={() => {
                            onClose();
                            onBook(tutor);
                          }}
                          className="w-full py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
                        >
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Book Trial (${tutor.trialPrice})</span>
                        </button>
                        <button
                          onClick={() => {
                            onClose();
                            onMessage(tutor);
                          }}
                          className="w-full py-1.5 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 transition-colors flex items-center justify-center gap-1"
                        >
                          <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                          <span>Message</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Side-by-Side Detailed Metrics Rows */}
              <div className="divide-y divide-slate-100 text-xs pt-4 space-y-4">
                
                {/* Row 1: Hourly & Trial Price */}
                <div>
                  <div className="font-bold text-slate-400 uppercase tracking-wider text-[10px] mb-2">
                    Pricing & Trial Lessons
                  </div>
                  <div 
                    className="grid gap-4 font-mono"
                    style={{ gridTemplateColumns: `repeat(${comparedTutors.length}, minmax(0, 1fr))` }}
                  >
                    {comparedTutors.map((tutor) => (
                      <div key={tutor.id} className="p-3 bg-slate-50 rounded-xl space-y-1">
                        <div className="flex items-baseline gap-1">
                          <span className="text-xl font-black text-slate-900">${tutor.hourlyRate}</span>
                          <span className="text-xs text-slate-500 font-sans">/ 60 min</span>
                        </div>
                        <div className="text-[11px] text-emerald-700 font-sans font-semibold">
                          ${tutor.trialPrice} Trial Lesson (30 min)
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Row 2: Rating & Reviews */}
                <div className="pt-4">
                  <div className="font-bold text-slate-400 uppercase tracking-wider text-[10px] mb-2">
                    Rating & Social Proof
                  </div>
                  <div 
                    className="grid gap-4"
                    style={{ gridTemplateColumns: `repeat(${comparedTutors.length}, minmax(0, 1fr))` }}
                  >
                    {comparedTutors.map((tutor) => (
                      <div key={tutor.id} className="p-3 bg-slate-50 rounded-xl space-y-1">
                        <div className="flex items-center gap-1 text-slate-900 font-bold text-base">
                          <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                          <span>{tutor.rating.toFixed(1)}</span>
                          <span className="text-xs text-slate-500 font-normal">({tutor.reviewsCount} reviews)</span>
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {tutor.lessonsTaught} lessons taught · {tutor.activeStudents} active students
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Row 3: Response Rate & Availability */}
                <div className="pt-4">
                  <div className="font-bold text-slate-400 uppercase tracking-wider text-[10px] mb-2">
                    Response Speed & Teaching Hours
                  </div>
                  <div 
                    className="grid gap-4"
                    style={{ gridTemplateColumns: `repeat(${comparedTutors.length}, minmax(0, 1fr))` }}
                  >
                    {comparedTutors.map((tutor) => (
                      <div key={tutor.id} className="p-3 bg-slate-50 rounded-xl space-y-1.5">
                        <div className="flex items-center gap-1.5 text-xs text-slate-700 font-semibold">
                          <Clock className="w-3.5 h-3.5 text-teal-600" />
                          <span>Replies {tutor.responseRate}</span>
                        </div>
                        <div className="text-[11px] text-slate-600">
                          <strong className="text-slate-900 font-bold">{tutor.availability[0]?.slots.length || 4} slots</strong> open today
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Row 4: Focus Areas */}
                <div className="pt-4">
                  <div className="font-bold text-slate-400 uppercase tracking-wider text-[10px] mb-2">
                    Focus Areas & Curriculum Match
                  </div>
                  <div 
                    className="grid gap-4"
                    style={{ gridTemplateColumns: `repeat(${comparedTutors.length}, minmax(0, 1fr))` }}
                  >
                    {comparedTutors.map((tutor) => (
                      <div key={tutor.id} className="p-3 bg-slate-50 rounded-xl flex flex-wrap gap-1">
                        {tutor.focusAreas.map((area) => (
                          <span 
                            key={area}
                            className="text-[10px] font-semibold bg-white text-slate-700 px-2 py-0.5 rounded-md border border-slate-200"
                          >
                            {area}
                          </span>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Row 5: Spoken Languages */}
                <div className="pt-4">
                  <div className="font-bold text-slate-400 uppercase tracking-wider text-[10px] mb-2">
                    Languages Spoken
                  </div>
                  <div 
                    className="grid gap-4"
                    style={{ gridTemplateColumns: `repeat(${comparedTutors.length}, minmax(0, 1fr))` }}
                  >
                    {comparedTutors.map((tutor) => (
                      <div key={tutor.id} className="p-3 bg-slate-50 rounded-xl space-y-1 text-[11px] text-slate-700">
                        {tutor.languages.map((l, i) => (
                          <div key={i}>
                            <strong>{l.language}</strong>: <span className="text-slate-500">{l.level}</span>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Row 6: Headline & Bio Summary */}
                <div className="pt-4">
                  <div className="font-bold text-slate-400 uppercase tracking-wider text-[10px] mb-2">
                    Teaching Philosophy
                  </div>
                  <div 
                    className="grid gap-4"
                    style={{ gridTemplateColumns: `repeat(${comparedTutors.length}, minmax(0, 1fr))` }}
                  >
                    {comparedTutors.map((tutor) => (
                      <div key={tutor.id} className="p-3 bg-slate-50 rounded-xl space-y-1.5 text-xs text-slate-600">
                        <p className="font-semibold text-slate-900 leading-snug">
                          {tutor.headline}
                        </p>
                        <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-3">
                          {tutor.bio}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between shrink-0 text-xs">
          <span className="text-slate-500">
            Need help deciding? Start with a $3–$5 trial lesson. 100% money-back guarantee.
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-colors"
          >
            Close Comparison
          </button>
        </div>

      </div>
    </div>
  );
};
