import React, { useState } from 'react';
import { FlaskConical, MessageSquareHeart, X } from 'lucide-react';
import { pilotStore } from '../../services/pilotStore';
import { useLanguage } from '../../context/LanguageContext';

interface PilotTopBannerProps {
  onOpenFeedback: () => void;
}

export const PilotTopBanner: React.FC<PilotTopBannerProps> = ({ onOpenFeedback }) => {
  const [dismissed, setDismissed] = useState<boolean>(() => pilotStore.isBannerDismissed());
  const { language, t } = useLanguage();

  if (dismissed) return null;

  const handleDismiss = () => {
    pilotStore.dismissBanner();
    setDismissed(true);
  };

  return (
    <div className="bg-[#14213D] text-[#F7F6F2] text-xs py-1.5 px-3 sm:px-6 relative z-50 border-b border-white/10 flex items-center justify-between gap-3">
      <div className="max-w-[1280px] w-full mx-auto flex items-center justify-center gap-2 text-center sm:flex-wrap whitespace-nowrap sm:whitespace-normal">
        <span className="inline-flex items-center gap-1 font-bold bg-[#F2A531] text-[#14213D] px-2 py-0.5 rounded-md text-[10px] tracking-wider uppercase font-mono">
          <FlaskConical className="w-3 h-3 stroke-[2.2]" />
          <span>Pilot</span>
        </span>
        <span className="font-medium text-slate-200">
          {language === 'km' ? (
            t('lang.notice')
          ) : (
            <>
              <span className="sm:hidden">No real charges.</span>
              <span className="hidden sm:inline">Phnom Penh pilot · payments are simulated, no real charges.</span>
            </>
          )}
        </span>
        <button
          onClick={onOpenFeedback}
          className="inline-flex items-center gap-1 font-bold text-[#F2A531] hover:underline cursor-pointer transition-colors ml-1 focus:outline-hidden"
        >
          <MessageSquareHeart className="w-3.5 h-3.5" />
          <span>Feedback</span>
        </button>
      </div>

      <button
        onClick={handleDismiss}
        className="text-slate-300 hover:text-white p-1 rounded-md hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
        title="Dismiss pilot notice for this session"
        aria-label="Dismiss pilot banner"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
