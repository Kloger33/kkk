import React from 'react';
import {
  Target,
  ArrowRight,
  Briefcase,
  Baby,
  GraduationCap,
  Compass,
  Sparkles,
  X,
} from 'lucide-react';
import { GoalPreference } from './GoalSelectionModal';

interface GoalQuizBannerProps {
  userGoal: GoalPreference | null;
  onOpenGoalModal: () => void;
  onClearGoal: () => void;
  onSelectQuickGoal?: (
    title: string,
    focus: 'Conversational' | 'Business Khmer' | 'Script & Reading' | 'Travel Khmer'
  ) => void;
}

export const GoalQuizBanner: React.FC<GoalQuizBannerProps> = ({
  userGoal,
  onOpenGoalModal,
  onClearGoal,
  onSelectQuickGoal,
}) => {
  const goalCards = [
    {
      id: 'career',
      title: 'Career & Business',
      desc: 'NGO, diplomatic & workplace Khmer',
      icon: Briefcase,
      focus: 'Business Khmer' as const,
    },
    {
      id: 'kids',
      title: 'Kids & Family',
      desc: 'Games, alphabet & heritage phrases',
      icon: Baby,
      focus: 'Conversational' as const,
    },
    {
      id: 'exams',
      title: 'Exams & Coursework',
      desc: 'Phonetic script & systematic reading',
      icon: GraduationCap,
      focus: 'Script & Reading' as const,
    },
    {
      id: 'travel',
      title: 'Travel & Culture',
      desc: 'Tuk-tuks, markets & street food',
      icon: Compass,
      focus: 'Travel Khmer' as const,
    },
  ];

  return (
    <div className="max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      {!userGoal ? (
        <div className="p-5 sm:p-7 rounded-2xl bg-white border border-slate-200/90 shadow-[0_2px_10px_rgba(20,33,61,0.03)]">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 sm:gap-6">
            <div className="space-y-1.5 max-w-xl">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-[#2445C8] uppercase tracking-wider bg-[#2445C8]/10 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#F2A531] fill-[#F2A531]" />
                  <span>Smart Tutor Match</span>
                </span>
                <span className="text-xs text-slate-500 font-medium">Takes 30 seconds</span>
              </div>

              <h2 className="font-display text-xl sm:text-2xl font-extrabold text-[#14213D] tracking-tight">
                What is your Khmer learning goal?
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 font-normal">
                Tell us what you want to achieve, and we will match you with verified tutors experienced in that track.
              </p>
            </div>

            <div className="shrink-0 w-full sm:w-auto">
              <button
                onClick={onOpenGoalModal}
                className="w-full sm:w-auto min-h-[44px] px-6 py-3 rounded-xl bg-[#14213D] hover:bg-[#1f3157] text-white font-bold text-xs sm:text-sm shadow-xs transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Take Goal Quiz</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 mt-4 sm:mt-5 pt-4 border-t border-slate-100">
            {goalCards.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (onSelectQuickGoal) {
                      onSelectQuickGoal(item.title, item.focus);
                    } else {
                      onOpenGoalModal();
                    }
                  }}
                  className="p-3 sm:p-3.5 rounded-xl bg-[#F7F6F2] hover:bg-[#2445C8]/5 border border-slate-200/80 hover:border-[#2445C8]/40 text-left transition-all group/goal cursor-pointer flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-[#2445C8] flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover/goal:text-[#2445C8] transition-colors" />
                  </div>
                  <div>
                    <div className="font-display font-bold text-xs sm:text-sm text-[#14213D] group-hover/goal:text-[#2445C8] transition-colors">
                      {item.title}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">{item.desc}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="p-4 sm:p-5 rounded-2xl bg-[#2445C8]/6 border border-[#2445C8]/25 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-[#2445C8] text-white flex items-center justify-center shrink-0">
              <Target className="w-5 h-5 text-[#F2A531]" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-[#14213D]">
                  Active Goal: {userGoal.title}
                </span>
                <span className="text-[11px] text-[#2445C8] bg-white px-2.5 py-0.5 rounded-full border border-[#2445C8]/20 font-bold">
                  {userGoal.level}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                Filtered results for tutors specialized in <strong>{userGoal.suggestedFocus}</strong>.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
            <button
              onClick={onOpenGoalModal}
              className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-[#14213D] border border-slate-300 text-xs font-bold transition-colors cursor-pointer"
            >
              Change Goal
            </button>
            <button
              onClick={onClearGoal}
              className="px-2.5 py-1.5 rounded-xl text-slate-500 hover:text-rose-600 text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1"
              title="Reset goal filter"
            >
              <X className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
