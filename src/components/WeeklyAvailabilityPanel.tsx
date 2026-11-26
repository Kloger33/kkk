import React from 'react';
import { Calendar, Clock, GraduationCap, Play, Star, X } from 'lucide-react';
import { Tutor } from '../data/tutorsData';
import { useLanguage } from '../context/LanguageContext';

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
    <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-[0_4px_20px_rgba(20,33,61,0.05)] space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 pb-3.5 border-b border-slate-100">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-11 h-11 rounded-full bg-[#14213D] text-white font-bold text-sm flex items-center justify-center shrink-0">
            {tutor.initials}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h3 className="font-display font-bold text-base text-[#14213D] truncate">
                {tutor.name}
              </h3>
              <span className="inline-flex items-center gap-0.5 text-xs font-mono font-bold text-[#14213D] shrink-0">
                <Star className="w-3.5 h-3.5 text-[#F2A531] fill-[#F2A531]" />
                {tutor.rating.toFixed(1)}
              </span>
            </div>
            <div className="text-[11px] text-slate-500 flex items-center gap-1 truncate mt-0.5">
              <GraduationCap className="w-3.5 h-3.5 text-[#2445C8] shrink-0" />
              <span className="truncate">{tutor.university}</span>
            </div>
          </div>
        </div>

        {onCloseMobileDrawer && (
          <button
            type="button"
            onClick={onCloseMobileDrawer}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-[#14213D] hover:bg-slate-100 cursor-pointer"
            aria-label="Close availability preview"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Panel Title & Timezone */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-xs font-bold text-[#14213D]">
          <Calendar className="w-4 h-4 text-[#2445C8]" />
          <span>{t('panel.title')}</span>
        </div>
        <span className="text-[11px] text-slate-500 flex items-center gap-1 font-mono">
          <Clock className="w-3 h-3" />
          <span>ICT (GMT+7)</span>
        </span>
      </div>

      <p className="text-[11px] text-slate-500 -mt-2">{t('panel.clickSlot')}</p>

      {/* 7-Day Weekly Availability Grid */}
      <div className="grid grid-cols-7 gap-1.5 bg-[#F7F6F2] p-2.5 rounded-xl border border-slate-200/70">
        {WEEKDAYS.map((day) => {
          const slots = getSlotsForDay(day);
          return (
            <div key={day} className="flex flex-col items-center gap-1.5 min-w-0">
              <div className="w-full text-center py-1 rounded-md bg-white border border-slate-200/80 text-[10px] font-bold uppercase tracking-wider text-[#14213D]">
                {day}
              </div>

              <div className="w-full space-y-1 max-h-52 overflow-y-auto no-scrollbar">
                {slots.length > 0 ? (
                  slots.map((slot) => {
                    const shortSlot = slot.replace(':00 ', '').replace('AM', 'a').replace('PM', 'p');
                    return (
                      <button
                        key={`${day}-${slot}`}
                        type="button"
                        onClick={() => onBookSlot(tutor, day, slot)}
                        title={`${day} ${slot} — Click to book`}
                        className="w-full py-1.5 px-1 rounded-md bg-white hover:bg-[#2445C8] text-[#2445C8] hover:text-white border border-[#2445C8]/25 hover:border-[#2445C8] text-[10px] font-mono font-bold tabular-nums transition-colors cursor-pointer text-center truncate"
                      >
                        {shortSlot}
                      </button>
                    );
                  })
                ) : (
                  <div className="py-3 text-center text-[10px] text-slate-400 font-mono">—</div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Pricing & Actions Footer */}
      <div className="pt-2 border-t border-slate-100 space-y-2.5">
        <div className="flex items-baseline justify-between text-xs">
          <span className="text-slate-500">
            Trial: <strong className="font-mono text-[#14213D]">${tutor.trialPrice}</strong> (30m)
          </span>
          <span className="text-slate-500">
            Standard: <strong className="font-mono text-[#14213D]">${tutor.hourlyRate}/hr</strong>
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => onBookSlot(tutor, tutor.availability[0]?.day || 'Mon', tutor.availability[0]?.slots[0] || '10:00 AM')}
            className="min-h-[42px] px-3 py-2 rounded-xl bg-[#2445C8] hover:bg-[#1c37a4] text-white text-xs font-bold transition-colors cursor-pointer"
          >
            {t('card.bookTrial')} ${tutor.trialPrice}
          </button>

          <button
            type="button"
            onClick={() => onOpenFullProfile(tutor)}
            className="min-h-[42px] px-3 py-2 rounded-xl bg-[#F7F6F2] hover:bg-slate-200/70 text-[#14213D] border border-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
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
        <div className="fixed inset-0 z-50 lg:hidden flex items-end sm:items-center justify-center bg-[#14213D]/60 backdrop-blur-xs p-0 sm:p-4">
          <div className="fixed inset-0" onClick={onCloseMobileDrawer} />
          <div className="relative z-10 w-full sm:max-w-md max-h-[90vh] overflow-y-auto rounded-t-3xl sm:rounded-2xl">
            {PanelBody}
          </div>
        </div>
      )}
    </>
  );
};
