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
      className={`bg-white border rounded-[14px] p-5 sm:p-6 transition-colors flex flex-col sm:flex-row gap-4 sm:gap-6 relative ${
        isSelectedForPreview ? 'border-[#2445C8]' : 'border-[#DCE3EE] hover:border-[#9AABD6]'
      }`}
    >
      {/* LEFT: Avatar & Verification Meta */}
      <div className="flex flex-row sm:flex-col items-center gap-3.5 sm:w-28 shrink-0">
        <div className="relative shrink-0">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#EEF2F7] text-[#172033] font-semibold text-lg sm:text-xl flex items-center justify-center" aria-hidden="true">
            {tutor.initials}
          </div>
        </div>

        <div className="flex flex-col items-start sm:items-center gap-1.5 text-left sm:text-center">
          {tutor.superTutor && (
            <span className="text-[13px] font-semibold text-[#8A5A00]">Super tutor</span>
          )}
          <div className="text-[13px] text-[#545B70] tabular-nums">
            <strong className="text-[#172033]">{tutor.lessonsTaught}</strong> lessons
          </div>
        </div>
      </div>

      {/* CENTER: Core Identity, University & Teaching Focus */}
      <div className="flex-1 min-w-0 flex flex-col justify-between space-y-2.5">
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2 min-w-0">
              <h3 className="text-xl font-bold text-[#172033] truncate">
                {tutor.name}
              </h3>

            </div>

            {/* Rating + Price summary on mobile */}
            <div className="flex items-center gap-3 sm:hidden">
              <div className="flex items-center gap-1 text-xs font-mono font-bold text-[#172033]">
                <Star className="w-3.5 h-3.5 text-[#F2B23A] fill-[#F2B23A]" />
                <span>{tutor.rating.toFixed(1)}</span>
              </div>
              <div className="text-sm font-mono font-bold text-[#172033]">
                ${tutor.hourlyRate}/hr
              </div>
            </div>
          </div>

          <p className="text-sm text-[#545B70] mt-0.5">
            {tutor.university}, {tutor.year}
          </p>

          <p className="text-base font-semibold text-[#172033] mt-3 leading-snug">
            {tutor.headline}
          </p>

          <p className="text-[15px] text-[#545B70] mt-1.5 leading-relaxed max-w-[62ch]">
            {bioExpanded ? tutor.bio : `${tutor.bio.slice(0, 140)}...`}
            <button
              type="button"
              onClick={() => setBioExpanded(!bioExpanded)}
              className="ml-1.5 text-[#2445C8] hover:underline font-semibold inline-flex items-center cursor-pointer"
            >
              {bioExpanded ? 'Show less' : 'Read more'}
            </button>
          </p>

          <div className="flex flex-wrap items-center gap-1.5 mt-3">
            {tutor.focusAreas.map((area) => (
              <span
                key={area}
                className="text-[13px] bg-[#EEF2F7] text-[#172033] px-2 py-0.5 rounded-[6px]"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT: Rate, Rating & Strictly 3 Actions (Book trial, Preview, Save) */}
      <div className="sm:w-52 border-t sm:border-t-0 sm:border-l border-[#E6EBF3] pt-4 sm:pt-0 sm:pl-6 flex flex-col justify-between shrink-0 gap-3">
        <div className="hidden sm:block space-y-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-[#172033]">
              <Star className="w-4 h-4 text-[#F2B23A] fill-[#F2B23A]" />
              <span className="font-semibold text-[15px] tabular-nums">
                {tutor.rating.toFixed(1)}
              </span>
            </div>
            <span className="text-[13px] text-[#545B70]">{tutor.reviewsCount} reviews</span>
          </div>

          <div className="pt-1">
            <div className="flex items-baseline gap-1">
              <span className="text-[28px] font-bold text-[#172033] tabular-nums leading-none">
                ${tutor.hourlyRate}
              </span>
              <span className="text-sm text-[#545B70]">{t('card.perHour')}</span>
            </div>
            <div className="text-sm text-[#545B70] mt-1">
              30-min trial ${tutor.trialPrice || 3}
            </div>
          </div>
        </div>

        {/* ONLY 3 ACTIONS: Book trial $X, Preview, Save */}
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => onBook(tutor)}
            className="w-full min-h-[44px] py-2.5 px-4 bg-[#2445C8] hover:bg-[#1c37a4] text-white font-semibold text-[15px] rounded-[10px] transition-colors flex items-center justify-center cursor-pointer"
          >
            <span>
              {t('card.bookTrial')} ${tutor.trialPrice || 3}
            </span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onPreview(tutor)}
              className={`flex-1 min-h-[44px] py-2 px-3 rounded-[10px] border text-sm font-medium transition-colors flex items-center justify-center cursor-pointer ${
                isSelectedForPreview
                  ? 'bg-[#EEF2F7] text-[#172033] border-[#2445C8]'
                  : 'bg-white hover:bg-[#EEF2F7] text-[#172033] border-[#DCE3EE]'
              }`}
            >
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
              className={`min-h-[44px] px-3 rounded-[10px] border text-sm font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                isSaved
                  ? 'bg-[#EEF2F7] border-[#DCE3EE] text-[#172033]'
                  : 'bg-white hover:bg-[#EEF2F7] border-[#DCE3EE] text-[#172033]'
              }`}
              aria-label={isSaved ? 'Remove from saved tutors' : 'Save tutor'}
              aria-pressed={isSaved}
            >
              <Heart
                className={`w-4 h-4 stroke-[2] ${isSaved ? 'fill-[#D6336C] text-[#D6336C]' : ''}`}
              />
              <span>{isSaved ? t('card.saved') : t('card.save')}</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
