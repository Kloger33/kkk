import React, { useState } from 'react';
import { Tutor } from '../data/tutorsData';
import {
  Star,
  ShieldCheck,
  GraduationCap,
  Calendar,
  Heart,
  Eye,
  Sparkles,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface PreplyTutorCardProps {
  tutor: Tutor;
  onBook: (tutor: Tutor) => void;
  onPreview: (tutor: Tutor) => void;
  isSelectedForPreview?: boolean;
  isSaved?: boolean;
  onToggleSave?: (tutor: Tutor) => void;
}

export const PreplyTutorCard: React.FC<PreplyTutorCardProps> = ({
  tutor,
  onBook,
  onPreview,
  isSelectedForPreview = false,
  isSaved: controlledIsSaved,
  onToggleSave,
}) => {
  const { t } = useLanguage();
  const [bioExpanded, setBioExpanded] = useState(false);
  const [localIsSaved, setLocalIsSaved] = useState(false);
  const isSaved = controlledIsSaved !== undefined ? controlledIsSaved : localIsSaved;

  return (
    <article
      className={`bg-white border rounded-2xl p-4 sm:p-6 transition-all duration-150 flex flex-col sm:flex-row gap-4 sm:gap-5 relative ${
        isSelectedForPreview
          ? 'border-[#2445C8] ring-2 ring-[#2445C8]/15 shadow-[0_6px_24px_rgba(36,69,200,0.08)]'
          : 'border-slate-200/90 hover:border-[#2445C8]/40 shadow-[0_2px_8px_rgba(20,33,61,0.03)]'
      }`}
    >
      {/* LEFT: Avatar & Verification Meta */}
      <div className="flex flex-row sm:flex-col items-center gap-3.5 sm:w-28 shrink-0">
        <div className="relative shrink-0">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#14213D] text-white font-display font-bold text-lg sm:text-xl flex items-center justify-center border-2 border-[#F7F6F2] shadow-sm">
            {tutor.initials}
          </div>
          <span
            className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"
            title="Online"
          />
        </div>

        <div className="flex flex-col items-start sm:items-center gap-1.5 text-left sm:text-center">
          {tutor.superTutor && (
            <span className="inline-flex items-center gap-1 bg-[#F2A531]/15 text-[#14213D] border border-[#F2A531]/40 px-2 py-0.5 rounded-md text-[10px] font-bold">
              <Sparkles className="w-3 h-3 text-[#F2A531] fill-[#F2A531]" />
              <span>Super Tutor</span>
            </span>
          )}
          <div className="text-[11px] text-slate-500 font-mono tabular-nums">
            <strong className="text-[#14213D]">{tutor.lessonsTaught}</strong> lessons
          </div>
        </div>
      </div>

      {/* CENTER: Core Identity, University & Teaching Focus */}
      <div className="flex-1 min-w-0 flex flex-col justify-between space-y-2.5">
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2 min-w-0">
              <h3 className="font-display text-lg font-extrabold text-[#14213D] truncate">
                {tutor.name}
              </h3>

              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#2445C8] bg-[#2445C8]/8 border border-[#2445C8]/20 px-2 py-0.5 rounded-md whitespace-nowrap">
                <ShieldCheck className="w-3.5 h-3.5 stroke-[2]" />
                <span>{t('card.nativeKhmer')}</span>
              </span>
            </div>

            {/* Rating + Price summary on mobile */}
            <div className="flex items-center gap-3 sm:hidden">
              <div className="flex items-center gap-1 text-xs font-mono font-bold text-[#14213D]">
                <Star className="w-3.5 h-3.5 text-[#F2A531] fill-[#F2A531]" />
                <span>{tutor.rating.toFixed(1)}</span>
              </div>
              <div className="text-sm font-mono font-bold text-[#14213D]">
                ${tutor.hourlyRate}/hr
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-600 mt-1 truncate">
            <GraduationCap className="w-4 h-4 text-[#F2A531] shrink-0 stroke-[2]" />
            <span className="font-semibold text-[#14213D] truncate">{tutor.university}</span>
            <span className="text-slate-400">·</span>
            <span className="text-slate-500 whitespace-nowrap">{tutor.year}</span>
          </div>

          <p className="text-sm font-semibold text-[#14213D] mt-2 leading-snug">
            {tutor.headline}
          </p>

          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
            {bioExpanded ? tutor.bio : `${tutor.bio.slice(0, 140)}...`}
            <button
              type="button"
              onClick={() => setBioExpanded(!bioExpanded)}
              className="ml-1.5 text-[#2445C8] hover:underline font-semibold inline-flex items-center cursor-pointer"
            >
              {bioExpanded ? 'Show less' : 'Read more'}
            </button>
          </p>

          <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
            {tutor.focusAreas.map((area) => (
              <span
                key={area}
                className="text-[11px] font-medium bg-[#F7F6F2] text-[#14213D] px-2.5 py-0.5 rounded-md border border-slate-200/80"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT: Rate, Rating & Strictly 3 Actions (Book trial, Preview, Save) */}
      <div className="sm:w-52 border-t sm:border-t-0 sm:border-l border-slate-100 pt-3 sm:pt-0 sm:pl-5 flex flex-col justify-between shrink-0 gap-3">
        <div className="hidden sm:block space-y-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-[#14213D]">
              <Star className="w-4 h-4 text-[#F2A531] fill-[#F2A531]" />
              <span className="font-mono font-bold text-sm tabular-nums">
                {tutor.rating.toFixed(1)}
              </span>
            </div>
            <span className="text-xs text-slate-500">({tutor.reviewsCount} reviews)</span>
          </div>

          <div className="pt-1">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-[#14213D] font-mono tabular-nums">
                ${tutor.hourlyRate}
              </span>
              <span className="text-xs text-slate-500">{t('card.perHour')}</span>
            </div>
            <div className="text-[11px] font-semibold text-[#2445C8] mt-0.5">
              ${tutor.trialPrice || 3} trial (30 min)
            </div>
          </div>
        </div>

        {/* ONLY 3 ACTIONS: Book trial $X, Preview, Save */}
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => onBook(tutor)}
            className="w-full min-h-[44px] py-2.5 px-4 bg-[#2445C8] hover:bg-[#1c37a4] text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Calendar className="w-4 h-4 stroke-[2]" />
            <span>
              {t('card.bookTrial')} ${tutor.trialPrice || 3}
            </span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onPreview(tutor)}
              className={`flex-1 min-h-[40px] py-2 px-3 rounded-xl border text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                isSelectedForPreview
                  ? 'bg-[#14213D] text-white border-[#14213D]'
                  : 'bg-[#F7F6F2] hover:bg-slate-200/70 text-[#14213D] border-slate-200'
              }`}
            >
              <Eye className="w-3.5 h-3.5 stroke-[2]" />
              <span>{t('card.preview')}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (onToggleSave) {
                  onToggleSave(tutor);
                } else {
                  setLocalIsSaved(!localIsSaved);
                }
              }}
              className={`group/save min-h-[40px] px-3 rounded-xl border text-xs font-semibold transition-all duration-150 flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 ${
                isSaved
                  ? 'bg-[#F2A531]/15 border-[#F2A531] text-[#14213D]'
                  : 'bg-white hover:bg-[#F7F6F2] border-slate-200 text-slate-600 hover:text-[#14213D]'
              }`}
              aria-label={isSaved ? 'Remove from saved tutors' : 'Save tutor'}
              aria-pressed={isSaved}
            >
              <Heart
                className={`w-4 h-4 stroke-[2] transition-transform duration-150 ${
                  isSaved
                    ? 'fill-[#F2A531] text-[#F2A531] scale-110'
                    : 'group-hover/save:scale-110'
                }`}
              />
              <span>{isSaved ? t('card.saved') : t('card.save')}</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
