import React from 'react';
import { Calendar, Clock, GraduationCap, Play, Star, X } from 'lucide-react';
import { Tutor } from '../data/tutorsData';
import { useLanguage } from '../context/LanguageContext';
import { TutorAvatarContent } from './ui/TutorAvatar';

interface WeeklyAvailabilityPanelProps {
  tutor: Tutor | null;
  onBookSlot: (tutor: Tutor, day: string, slot: string) => void;
  onOpenFullProfile: (tutor: Tutor) => void;
  isMobileDrawerOpen?: boolean;
  onCloseMobileDrawer?: () => void;
}

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const WeeklyAvailabilityPanel: React.FC<WeeklyAvailabilityPanelProps> = ({
  tutor,
  onBookSlot,
  onOpenFullProfile,
  isMobileDrawerOpen = false,
  onCloseMobileDrawer,
}) => {
  const { t } = useLanguage();

  if (!tutor) return null;

  const getSlotsForDay = (day: string): string[] => {
    const entry = tutor.availability.find((a) => a.day === day);
    return entry ? entry.slots : [];
  };

  const PanelBody = (
    <div className="bg-white border border-slate-200/90 rounded-[14px] p-5 shadow-[0_4px_20px_rgba(20,33,61,0.05)] space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 pb-3.5 border-b border-slate-100">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-11 h-11 rounded-[8px] bg-[#172033] text-white font-medium text-sm flex items-center justify-center shrink-0">
            <TutorAvatarContent tutor={tutor} />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h3 className="font-display font-medium text-base text-[#172033] truncate">
                {tutor.name}
              </h3>
              <span className="inline-flex items-center gap-0.5 text-xs tabular-nums font-medium text-[#172033] shrink-0">
                <Star className="w-3.5 h-3.5 text-[#F2B23A] fill-[#F2B23A]" />
                {tutor.rating.toFixed(1)}
              </span>
            </div>
            <div className="text-[13px] text-[#545B70] flex items-center gap-1 truncate mt-0.5">
              <GraduationCap className="w-3.5 h-3.5 text-[#2445C8] shrink-0" />
              <span className="truncate">{tutor.university}</span>
            </div>
          </div>
        </div>

        {onCloseMobileDrawer && (
          <button
            type="button"
            onClick={onCloseMobileDrawer}
            className="lg:hidden p-1.5 rounded-lg text-[#6B7287] hover:text-[#172033] hover:bg-slate-100 cursor-pointer"
            aria-label="Close availability preview"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Panel Title & Timezone */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-base font-semibold text-[#172033]">
          <Calendar className="w-4 h-4 text-[#2445C8]" />
          <span>{t('panel.title')}</span>
        </div>
        <span className="text-[13px] text-[#545B70] flex items-center gap-1 tabular-nums">
          <Clock className="w-3 h-3" />
          <span>Phnom Penh time</span>
        </span>
      </div>

      <p className="text-[13px] text-[#545B70] -mt-2">{t('panel.clickSlot')}</p>

      {/* 7-Day Weekly Availability Grid */}
      <div className="grid grid-cols-7 gap-1.5">
        {WEEKDAYS.map((day) => {
          const slots = getSlotsForDay(day);
          return (
            <div key={day} className="flex flex-col items-center gap-1.5 min-w-0">
              <div className="w-full text-center py-1 text-[13px] font-semibold text-[#172033]">
                {day}
              </div>

              <div className="w-full space-y-1 max-h-52 overflow-y-auto no-scrollbar">
                {slots.length > 0 ? (
                  slots.map((slot) => {
                    // "08:00 AM" -> "8am": short enough for seven columns, still readable.
                    const shortSlot = slot.replace(/^0/, '').replace(':00 ', '').toLowerCase();
                    return (
                      <button
                        key={`${day}-${slot}`}
                        type="button"
                        onClick={() => onBookSlot(tutor, day, slot)}
                        title={`Book ${day} ${slot}`}
                        aria-label={`Book ${day} ${slot}`}
                        className="w-full py-1.5 px-1 rounded-md bg-white hover:bg-[#2445C8] text-[#2445C8] hover:text-white border border-[#2445C8]/25 hover:border-[#2445C8] text-xs tabular-nums font-medium tabular-nums transition-colors cursor-pointer text-center truncate"
                      >
                        {shortSlot}
                      </button>
                    );
                  })
                ) : (
                  <div className="py-3 text-center text-xs text-[#6B7287] tabular-nums">—</div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Pricing & Actions Footer */}
      <div className="pt-2 border-t border-slate-100 space-y-2.5">
        <div className="flex items-baseline justify-between text-xs">
          <span className="text-[#545B70]">
            Trial: <strong className="tabular-nums text-[#172033]">${tutor.trialPrice}</strong> (30m)
          </span>
          <span className="text-[#545B70]">
            Standard: <strong className="tabular-nums text-[#172033]">${tutor.hourlyRate}/hr</strong>
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => onBookSlot(tutor, tutor.availability[0]?.day || 'Mon', tutor.availability[0]?.slots[0] || '10:00 AM')}
            className="min-h-[42px] px-3 py-2 rounded-[10px] bg-[#2445C8] hover:bg-[#1c37a4] text-white text-xs font-medium transition-colors cursor-pointer"
          >
            {t('card.bookTrial')} ${tutor.trialPrice}
          </button>

          <button
            type="button"
            onClick={() => onOpenFullProfile(tutor)}
            className="min-h-[42px] px-3 py-2 rounded-[10px] bg-[#F3F5F9] hover:bg-slate-200/70 text-[#172033] border border-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 text-[#2445C8] fill-[#2445C8]" />
            <span className="truncate">{t('panel.openFull')}</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Side Panel */}
      <aside className="hidden lg:block lg:sticky lg:top-[176px]" aria-label="Selected Tutor Weekly Availability">
        {PanelBody}
      </aside>

      {/* Mobile / Tablet Preview Sheet when triggered */}
      {isMobileDrawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex items-end sm:items-center justify-center bg-[#172033]/60 backdrop-blur-xs p-0 sm:p-4">
          <div className="fixed inset-0" onClick={onCloseMobileDrawer} />
          <div className="relative z-10 w-full sm:max-w-md max-h-[90vh] overflow-y-auto rounded-t-3xl sm:rounded-[14px]">
            {PanelBody}
          </div>
        </div>
      )}
    </>
  );
};
