import React, { useState } from 'react';
import { Tutor } from '../data/tutorsData';
import { 
  Gift, 
  Copy, 
  Check, 
  X, 
  Share2, 
  Sparkles, 
  Users, 
  Send,
  MessageCircle,
  ExternalLink
} from 'lucide-react';

interface ReferralModalProps {
  tutor: Tutor;
  isOpen: boolean;
  onClose: () => void;
}

export const ReferralModal: React.FC<ReferralModalProps> = ({
  tutor,
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);
  const [codeCopied, setCodeCopied] = useState(false);

  if (!isOpen) return null;

  // Generate unique referral link & promo voucher code tailored to this tutor
  const origin = typeof window !== 'undefined' && window.location.origin 
    ? window.location.origin 
    : 'https://khmertutors.com';
  
  const referralCode = `KHMER-${tutor.name.replace(/[^a-zA-Z]/g, '').toUpperCase().slice(0, 6)}-5OFF`;
  const referralUrl = `${origin}/?tutor=${tutor.id}&ref=${referralCode}&discount=5`;

  const shareText = `Learn conversational Khmer with ${tutor.name} on KhmerTutors! Use my referral link to get $5 off your first trial lesson: ${referralUrl}`;

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(referralUrl);
      } else {
        // Fallback for older environments
        const textArea = document.createElement('textarea');
        textArea.value = referralUrl;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleCopyCode = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(referralCode);
      }
      setCodeCopied(true);
      setTimeout(() => setCodeCopied(false), 2500);
    } catch {
      setCodeCopied(true);
      setTimeout(() => setCodeCopied(false), 2500);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Study Khmer with ${tutor.name} - $5 Off Trial`,
          text: `Practice Khmer with ${tutor.name} (${tutor.university}). Get $5 off your trial lesson!`,
          url: referralUrl,
        });
      } catch {
        // Share cancelled or not supported
      }
    } else {
      handleCopyLink();
    }
  };

  const handleWhatsAppShare = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleTelegramShare = () => {
    const url = `https://t.me/share/url?url=${encodeURIComponent(referralUrl)}&text=${encodeURIComponent(`Learn conversational Khmer with ${tutor.name} (Get $5 off your trial)`)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      {/* Click backdrop to close */}
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 flex flex-col max-h-[92vh]">
        
        {/* Header Ribbon Banner */}
        <div className="bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-600 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-inner shrink-0">
              <Gift className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-teal-100 text-[11px] font-bold tracking-wide uppercase">
                <Sparkles className="w-3 h-3 text-amber-300" />
                <span>Refer & Earn Program</span>
              </div>
              <h3 className="text-xl font-bold mt-1 text-white">
                Invite Friends to Learn with {tutor.name}
              </h3>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          
          {/* Dual Incentive Cards: Give $5, Get $5 */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 flex flex-col items-center text-center">
              <span className="text-2xl font-black text-amber-600 font-mono">$5 OFF</span>
              <span className="text-xs font-bold text-slate-800 mt-0.5">For Your Friend</span>
              <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                Applied automatically toward their trial lesson with {tutor.name}.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-teal-50/80 border border-teal-200 flex flex-col items-center text-center">
              <span className="text-2xl font-black text-teal-700 font-mono">+$5 CREDIT</span>
              <span className="text-xs font-bold text-slate-800 mt-0.5">For You</span>
              <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                Added to your lesson wallet once they complete their first class.
              </p>
            </div>
          </div>

          {/* Copyable Unique Referral Link Box */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Your Unique Referral Link
            </label>
            <div className="flex items-center gap-2 p-1.5 bg-slate-50 border border-slate-300 rounded-2xl focus-within:ring-2 focus-within:ring-teal-500 focus-within:border-teal-500">
              <input
                type="text"
                readOnly
                value={referralUrl}
                onClick={(e) => (e.target as HTMLInputElement).select()}
                className="flex-1 bg-transparent px-3 py-1.5 text-xs text-slate-700 font-mono outline-hidden select-all truncate"
              />
              <button
                onClick={handleCopyLink}
                className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs shrink-0 ${
                  copied
                    ? 'bg-emerald-600 text-white'
                    : 'bg-teal-600 hover:bg-teal-700 text-white'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-[11px] text-slate-500 mt-1.5 flex items-center justify-between">
              <span>Anyone booking through this link receives an instant $5 discount.</span>
              {copied && <span className="text-emerald-600 font-semibold text-[10px]">✓ Link copied to clipboard</span>}
            </p>
          </div>

          {/* Alternative Voucher Code */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                Friend Discount Voucher Code
              </span>
              <div className="font-mono font-bold text-sm text-slate-800">
                {referralCode}
              </div>
            </div>
            <button
              onClick={handleCopyCode}
              className="text-xs font-semibold text-teal-700 hover:text-teal-900 border border-teal-200 hover:bg-teal-50 px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 shrink-0"
            >
              {codeCopied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
              <span>{codeCopied ? 'Code Copied' : 'Copy Code'}</span>
            </button>
          </div>

          {/* Quick Direct Social Sharing */}
          <div>
            <span className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Share Instantly
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={handleWhatsAppShare}
                className="py-2.5 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp</span>
              </button>

              <button
                onClick={handleTelegramShare}
                className="py-2.5 px-3 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Send className="w-4 h-4 text-sky-600" />
                <span>Telegram</span>
              </button>

              <button
                onClick={handleNativeShare}
                className="py-2.5 px-3 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Share2 className="w-4 h-4 text-purple-600" />
                <span>More Options</span>
              </button>
            </div>
          </div>

          {/* Tutor Context Card */}
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full bg-gradient-to-tr ${tutor.avatarBg} text-white font-bold text-sm flex items-center justify-center shrink-0`}>
              {tutor.initials}
            </div>
            <div className="text-xs">
              <span className="font-bold text-slate-900">{tutor.name}</span>
              <span className="text-slate-400"> · {tutor.university}</span>
              <p className="text-slate-500 text-[11px] line-clamp-1">
                {tutor.headline}
              </p>
            </div>
          </div>

          {/* Social Proof Footer */}
          <div className="flex items-center justify-center gap-2 text-xs text-slate-500 pt-1 border-t border-slate-100">
            <Users className="w-3.5 h-3.5 text-teal-600" />
            <span>Over <strong>1,240 lessons</strong> booked via student invites this month. No cap on earnings!</span>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs rounded-xl transition-colors"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
