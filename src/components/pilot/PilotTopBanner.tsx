import React, { useState } from 'react';
import { X } from 'lucide-react';
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
    <div className="bg-[#172033] text-[#F3F5F9] text-[13px] py-2 px-3 sm:px-6 relative z-50 border-b border-white/10 flex items-center justify-between gap-3">
      <div className="max-w-[1280px] w-full mx-auto flex items-center justify-center gap-2 text-center sm:flex-wrap whitespace-nowrap sm:whitespace-normal">
        <span className="font-semibold text-white">{language === 'km' ? 'កំណែសាកល្បង' : 'Pilot version.'}</span>
        <span className="font-medium text-slate-200">
          {language === 'km' ? (
            t('lang.notice')
          ) : (
            <>
              <span className="sm:hidden">No real charges.</span>
              <span className="hidden sm:inline">Payments are simulated and nothing is charged.</span>
            </>
          )}
        </span>
        <button
          onClick={onOpenFeedback}
          className="font-semibold text-white underline underline-offset-2 decoration-white/50 hover:decoration-white cursor-pointer ml-1"
        >
          <span>Send feedback</span>
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
