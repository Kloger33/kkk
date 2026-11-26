import React, { useState, useEffect } from 'react';
import { ShieldCheck, Info, X } from 'lucide-react';

export const PilotConsentNotice: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    try {
      const consented = localStorage.getItem('kto_pilot_consent_accepted');
      if (!consented) {
        setVisible(true);
      }
    } catch {}
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem('kto_pilot_consent_accepted', 'true');
    } catch {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <>
      <div className="fixed bottom-3 left-3 right-3 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-md bg-slate-900/95 text-white p-3 sm:p-4 rounded-2xl shadow-2xl border border-slate-700/80 backdrop-blur-md z-40 text-xs font-sans animate-in slide-in-from-bottom duration-200">
        <div className="flex items-start gap-2.5">
          <ShieldCheck className="w-5 h-5 text-blue-300 shrink-0 mt-0.5" />
          <div className="flex-1 space-y-1">
            <div className="font-bold text-white text-xs flex items-center gap-1.5">
              <span>Pilot privacy notice</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              During this pilot we record anonymous usage (pages visited, bookings made) to improve the service.
            </p>
            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={handleAccept}
                className="min-h-[40px] px-4 py-2 bg-[#2445C8] hover:bg-[#1c37a4] text-white font-bold rounded-lg text-xs transition-colors cursor-pointer"
              >
                OK
              </button>
              <button
                onClick={() => setModalOpen(true)}
                className="text-slate-300 hover:text-white underline text-xs min-h-[40px] px-1 cursor-pointer"
              >
                What we collect
              </button>
            </div>
          </div>
          <button
            onClick={() => setVisible(false)}
            className="text-slate-400 hover:text-white p-1"
            title="Dismiss notice"
            aria-label="Dismiss privacy notice"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs font-sans">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 text-slate-800 space-y-4 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#2445C8]" />
                <h3 className="font-bold text-base text-slate-900">Pilot Test Privacy & Safety Note</h3>
              </div>
              <button onClick={() => setModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs space-y-3 leading-relaxed text-slate-600">
              <p>
                <strong>KhmerTutors Online (KTO)</strong> is conducting an invite-only pilot test connecting foreign expats in Phnom Penh with verified Cambodian university student tutors (RUPP, ITC, PUC).
              </p>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                <div className="font-bold text-slate-800">What we collect during the pilot:</div>
                <ul className="list-disc pl-4 space-y-1 text-slate-600">
                  <li>Anonymous funnel milestones (sign-up, profile views, trial booking completion)</li>
                  <li>In-app feedback, bug reports, and short post-lesson ease-of-use ratings</li>
                  <li>Diagnostic metadata (browser, screen resolution) to ensure responsive rendering across mobile and desktop</li>
                </ul>
              </div>
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl space-y-1">
                <div className="font-bold text-amber-900">Payments & Test Security:</div>
                <p className="text-amber-800">
                  Pilot test transactions are conducted using Sandbox accounts or complimentary pilot student trial credits. No real money is captured without explicit sandbox labeling.
                </p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 bg-[#2445C8] hover:bg-[#1c37a4] text-white font-bold text-xs rounded-xl"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
