import React, { useMemo } from 'react';
import { Award, BookOpen, DollarSign, Star, ChevronRight } from 'lucide-react';
import { Tutor } from '../data/tutorsData';
import { useLanguage } from '../context/LanguageContext';

interface TutorLeaderboardProps {
  tutors: Tutor[];
  onSelectTutor: (tutor: Tutor) => void;
}

export const TutorLeaderboard: React.FC<TutorLeaderboardProps> = ({ tutors, onSelectTutor }) => {
  const { t } = useLanguage();

  const bestRated = useMemo(
    () =>
      [...tutors]
        .sort((a, b) => b.rating - a.rating || b.reviewsCount - a.reviewsCount)
        .slice(0, 3),
    [tutors]
  );

  const mostLessons = useMemo(
    () =>
      [...tutors]
        .sort((a, b) => b.lessonsTaught - a.lessonsTaught)
        .slice(0, 3),
    [tutors]
  );

  const topRate = useMemo(
    () =>
      [...tutors]
        .sort((a, b) => b.hourlyRate - a.hourlyRate || b.rating - a.rating)
        .slice(0, 3),
    [tutors]
  );

  const columns = [
    {
      id: 'rated',
      title: t('leaderboard.bestRated'),
      icon: Star,
      accentClass: 'text-[#F2A531]',
      items: bestRated,
      formatMetric: (tutor: Tutor) => `${tutor.rating.toFixed(1)} (${tutor.reviewsCount})`,
    },
    {
      id: 'lessons',
      title: t('leaderboard.mostLessons'),
      icon: BookOpen,
      accentClass: 'text-[#2445C8]',
      items: mostLessons,
      formatMetric: (tutor: Tutor) => `${tutor.lessonsTaught} ${t('leaderboard.lessonsUnit')}`,
    },
    {
      id: 'rate',
      title: t('leaderboard.topRate'),
      icon: DollarSign,
      accentClass: 'text-[#14213D]',
      items: topRate,
      formatMetric: (tutor: Tutor) => `$${tutor.hourlyRate}/hr`,
    },
  ];

  return (
    <section
      aria-labelledby="leaderboard-heading"
      className="max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-6"
    >
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-[0_2px_8px_rgba(20,33,61,0.03)]">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2445C8]">
              <Award className="w-4 h-4 stroke-[2]" />
              <span>Top 3 Rankings</span>
            </div>
            <h2
              id="leaderboard-heading"
              className="font-display text-lg sm:text-xl font-extrabold text-[#14213D] tracking-tight mt-0.5"
            >
              {t('leaderboard.title')}
            </h2>
          </div>
          <p className="text-xs text-slate-500">{t('leaderboard.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          {columns.map((col) => {
            const Icon = col.icon;
            return (
              <div
                key={col.id}
                className="bg-[#F7F6F2] border border-slate-200/80 rounded-xl p-3.5 space-y-2.5"
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-200/70">
                  <h3 className="font-display text-sm font-bold text-[#14213D] flex items-center gap-1.5">
                    <Icon className={`w-4 h-4 stroke-[2.2] ${col.accentClass}`} />
                    <span>{col.title}</span>
                  </h3>
                  <span className="text-[10px] font-mono font-bold uppercase text-slate-500">
                    Top 3
                  </span>
                </div>

                <div className="space-y-1.5">
                  {col.items.map((tutor, idx) => (
                    <button
                      key={tutor.id}
                      type="button"
                      onClick={() => onSelectTutor(tutor)}
                      className="w-full text-left p-2 rounded-lg bg-white hover:bg-[#2445C8]/5 border border-slate-200/70 hover:border-[#2445C8]/40 transition-all flex items-center justify-between gap-2.5 cursor-pointer group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span
                          className={`w-5 h-5 rounded-md text-[11px] font-mono font-bold flex items-center justify-center shrink-0 ${
                            idx === 0
                              ? 'bg-[#F2A531] text-[#14213D]'
                              : 'bg-[#14213D]/10 text-[#14213D]'
                          }`}
                        >
                          {idx + 1}
                        </span>
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-[#14213D] group-hover:text-[#2445C8] truncate">
                            {tutor.name}
                          </div>
                          <div className="text-[10px] text-slate-500 truncate">
                            {tutor.university.split('(')[0].trim()}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <span className="text-xs font-mono font-bold tabular-nums text-[#14213D]">
                          {col.formatMetric(tutor)}
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#2445C8]" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
