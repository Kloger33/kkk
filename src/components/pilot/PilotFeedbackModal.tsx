import React, { useState } from 'react';
import { 
  MessageSquarePlus, 
  X, 
  Bug, 
  Lightbulb, 
  HelpCircle, 
  Heart, 
  Send, 
  CheckCircle2, 
  Monitor, 
  ShieldAlert,
  Sparkles
} from 'lucide-react';
import { pilotStore, FeedbackReport } from '../../services/pilotStore';
import { useAuth } from '../../context/AuthContext';
import { analytics } from '../../services/analytics';

interface PilotFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPageUrl?: string;
}

export const PilotFeedbackModal: React.FC<PilotFeedbackModalProps> = ({
  isOpen,
  onClose,
  currentPageUrl = window.location.pathname,
}) => {
  const { user, activeRole, showToast } = useAuth();

  const [type, setType] = useState<FeedbackReport['type']>('bug');
  const [severity, setSeverity] = useState<FeedbackReport['severity']>('medium');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const browserInfo = typeof navigator !== 'undefined' ? `${navigator.userAgent.slice(0, 48)}...` : 'Web Browser';
  const screenSize = typeof window !== 'undefined' ? `${window.innerWidth} × ${window.innerHeight}px` : 'Desktop';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    pilotStore.submitFeedback({
      type,
      severity: type === 'bug' ? severity : 'low',
      title: title.trim() || `${type.toUpperCase()}: Feedback on ${currentPageUrl}`,
      message: message.trim(),
      pageUrl: currentPageUrl,
      userRole: activeRole || 'STUDENT',
      userId: user?.id,
      userEmail: user?.email,
      deviceInfo: browserInfo,
      screenSize,
    });

    analytics.track('review_left', {
      feedbackType: type,
      page: currentPageUrl,
    });

    setSubmitted(true);
    if (showToast) showToast('Orkun! Your pilot feedback was sent directly to the engineering team.');

    setTimeout(() => {
      setSubmitted(false);
      setTitle('');
      setMessage('');
      onClose();
    }, 1800);
  };

  const typeTabs: { id: FeedbackReport['type']; label: string; icon: any; color: string }[] = [
    { id: 'bug', label: 'Bug / Broken', icon: Bug, color: 'text-rose-600 bg-rose-50 border-rose-200' },
    { id: 'confusing', label: 'Confusing', icon: HelpCircle, color: 'text-amber-600 bg-amber-50 border-amber-200' },
    { id: 'idea', label: 'Improvement', icon: Lightbulb, color: 'text-blue-600 bg-blue-50 border-blue-200' },
    { id: 'praise', label: 'Praise', icon: Heart, color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150 font-sans">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 animate-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-teal-800 to-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <MessageSquarePlus className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-base text-white">Pilot Feedback & Bug Report</h3>
                <span className="text-[10px] bg-amber-400 text-slate-950 font-black px-1.5 py-0.2 rounded uppercase">
                  Phnom Penh
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Help our university student tutors & dev team refine KhmerTutors Online
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">Thank you for your feedback!</h4>
            <p className="text-xs text-slate-600 max-w-sm mx-auto">
              Our engineering and tutor operations team in Phnom Penh reviews every pilot submission. Your input shapes the official release.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 max-h-[80vh] overflow-y-auto">
            {/* Feedback Category Tabs */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                What type of feedback are you submitting?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {typeTabs.map((t) => {
                  const Icon = t.icon;
                  const active = type === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setType(t.id)}
                      className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                        active
                          ? `${t.color} ring-2 ring-teal-500 shadow-xs font-black`
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <Icon className="w-4 h-4 mb-1" />
                      <span>{t.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Severity (Only if Bug) */}
            {type === 'bug' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-500" />
                  <span>Severity Level</span>
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {(['low', 'medium', 'high', 'blocker'] as const).map((sev) => (
                    <button
                      key={sev}
                      type="button"
                      onClick={() => setSeverity(sev)}
                      className={`py-1.5 px-2 rounded-lg border text-xs font-semibold capitalize cursor-pointer transition-all ${
                        severity === sev
                          ? sev === 'blocker' || sev === 'high'
                            ? 'bg-rose-600 text-white border-rose-600'
                            : 'bg-teal-700 text-white border-teal-700'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {sev}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Title / Short Summary */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Summary (optional)
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Schedule button on mobile didn't respond"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:border-teal-500 focus:bg-white"
              />
            </div>

            {/* Message / Details */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Details & Steps to Reproduce <span className="text-rose-500">*</span>
              </label>
              <textarea
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Please describe what happened, what you expected, or how we could make this smoother..."
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:border-teal-500 focus:bg-white resize-none"
              />
            </div>

            {/* Auto-attached Telemetry Info Card */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 text-[11px] text-slate-500 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-slate-700">
                <Monitor className="w-3.5 h-3.5 text-teal-600" />
                <span>Auto-attached Pilot Diagnostics:</span>
              </div>
              <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-slate-600 font-mono text-[10px]">
                <div>Page: <span className="text-slate-800">{currentPageUrl}</span></div>
                <div>Screen: <span className="text-slate-800">{screenSize}</span></div>
                <div>Role: <span className="text-slate-800">{activeRole || 'GUEST'}</span></div>
                <div>Account: <span className="text-slate-800">{user?.email || 'Anonymous'}</span></div>
              </div>
              <div className="text-[10px] text-slate-400 truncate">
                User Agent: {browserInfo}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!message.trim()}
                className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit to Pilot Team</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export const FloatingFeedbackButton: React.FC<{ onOpen: () => void }> = ({ onOpen }) => {
  return (
    <div className="fixed bottom-6 right-6 z-40 group">
      <button
        onClick={onOpen}
        className="w-12 h-12 rounded-full bg-teal-700 hover:bg-teal-800 active:bg-teal-900 text-white shadow-lg hover:shadow-xl border border-teal-500/30 flex items-center justify-center transition-all duration-150 hover:scale-105 active:scale-95 cursor-pointer focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:outline-none relative"
        title="Pilot Feedback & Bug Report"
        aria-label="Send Pilot Feedback"
      >
        <div className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-amber-400 border border-teal-800" />
        <MessageSquarePlus className="w-5 h-5 text-amber-300 stroke-[2]" />
      </button>

      {/* Hover Tooltip */}
      <div className="hidden group-hover:block absolute right-14 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg shadow-md whitespace-nowrap pointer-events-none border border-slate-800 animate-in fade-in duration-100">
        Pilot Feedback
      </div>
    </div>
  );
};
