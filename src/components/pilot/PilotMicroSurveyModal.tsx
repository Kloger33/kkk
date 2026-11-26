import React, { useState } from 'react';
import { Star, Heart, X, Check, Send, Sparkles, Smile, Frown, Meh } from 'lucide-react';
import { pilotStore, SurveyResponse } from '../../services/pilotStore';
import { useAuth } from '../../context/AuthContext';

export type SurveyKind = 'booking_ease' | 'post_lesson' | 'nps_7day' | 'tutor_experience';

interface PilotMicroSurveyModalProps {
  isOpen: boolean;
  onClose: () => void;
  surveyType: SurveyKind;
  tutorName?: string;
  tutorId?: string;
}

export const PilotMicroSurveyModal: React.FC<PilotMicroSurveyModalProps> = ({
  isOpen,
  onClose,
  surveyType,
  tutorName = 'your tutor',
  tutorId,
}) => {
  const { user, activeRole, showToast } = useAuth();
  const [rating, setRating] = useState<number>(5);
  const [wouldBookAgain, setWouldBookAgain] = useState<boolean>(true);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    pilotStore.submitSurvey({
      surveyType,
      rating,
      wouldBookAgain: surveyType === 'post_lesson' ? wouldBookAgain : undefined,
      comment: comment.trim(),
      userRole: activeRole || 'STUDENT',
      userId: user?.id,
      tutorId,
    });

    setSubmitted(true);
    if (showToast) showToast('Orkun! Your pilot survey response was recorded.');

    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150 font-sans">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 animate-in zoom-in-95 duration-150">
        <div className="bg-[#172033] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm">Quick 1-Minute Pilot Survey</span>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <Check className="w-6 h-6 stroke-[3]" />
            </div>
            <h4 className="text-base font-bold text-slate-900">Thank you for your rating!</h4>
            <p className="text-xs text-slate-600">Your feedback directly helps Cambodian student tutors.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
            {/* SURVEY 1: BOOKING EASE (1-5) */}
            {surveyType === 'booking_ease' && (
              <div>
                <h3 className="font-bold text-slate-900 text-base mb-1">
                  How easy was it to schedule and book your trial?
                </h3>
                <p className="text-xs text-slate-500 mb-4">
                  1 = Very Difficult, 5 = Super Easy & Fast
                </p>
                <div className="flex items-center justify-center gap-2 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 cursor-pointer transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= rating
                            ? 'text-amber-400 fill-amber-400 stroke-amber-500'
                            : 'text-slate-200 fill-slate-100'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* SURVEY 2: POST LESSON */}
            {surveyType === 'post_lesson' && (
              <div className="space-y-3">
                <h3 className="font-bold text-slate-900 text-base">
                  How was your lesson with {tutorName}?
                </h3>
                <div className="flex items-center justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setRating(val)}
                      className="p-1 cursor-pointer transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          val <= rating
                            ? 'text-amber-400 fill-amber-400 stroke-amber-500'
                            : 'text-slate-200 fill-slate-100'
                        }`}
                      />
                    </button>
                  ))}
                </div>

                <div className="pt-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Would you book a second lesson with this tutor?
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setWouldBookAgain(true)}
                      className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                        wouldBookAgain
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-800 ring-1 ring-emerald-500'
                          : 'bg-slate-50 border-slate-200 text-slate-600'
                      }`}
                    >
                      Yes, definitely!
                    </button>
                    <button
                      type="button"
                      onClick={() => setWouldBookAgain(false)}
                      className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                        !wouldBookAgain
                          ? 'bg-rose-50 border-rose-500 text-rose-800 ring-1 ring-rose-500'
                          : 'bg-slate-50 border-slate-200 text-slate-600'
                      }`}
                    >
                      Try someone else
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* SURVEY 3: NPS (0-10) */}
            {surveyType === 'nps_7day' && (
              <div>
                <h3 className="font-bold text-slate-900 text-base mb-1">
                  How likely are you to recommend KhmerTutors Online?
                </h3>
                <p className="text-xs text-slate-500 mb-3">
                  0 = Not at all likely, 10 = Extremely likely to tell fellow expats
                </p>
                <div className="grid grid-cols-6 sm:grid-cols-11 gap-1">
                  {Array.from({ length: 11 }, (_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setRating(i)}
                      className={`py-2 text-xs font-bold rounded-lg border cursor-pointer transition-all ${
                        rating === i
                          ? 'bg-teal-600 text-white border-teal-600 shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {i}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* SURVEY 4: TUTOR EXPERIENCE */}
            {surveyType === 'tutor_experience' && (
              <div>
                <h3 className="font-bold text-slate-900 text-base mb-1">
                  How easy was setting your availability & payout method?
                </h3>
                <p className="text-xs text-slate-500 mb-3">
                  RUPP, ITC & university tutor operational check
                </p>
                <div className="flex items-center justify-center gap-2 mb-3">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setRating(val)}
                      className="p-1 cursor-pointer transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          val <= rating
                            ? 'text-amber-400 fill-amber-400 stroke-amber-500'
                            : 'text-slate-200 fill-slate-100'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Optional Comment */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Any quick thoughts or suggestions? (Optional)
              </label>
              <textarea
                rows={2}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="What worked well, or what could be improved?"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:border-teal-500 resize-none"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-2 rounded-xl text-xs text-slate-500 hover:text-slate-800 font-medium"
              >
                Skip
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-xs cursor-pointer"
              >
                Submit Survey
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
