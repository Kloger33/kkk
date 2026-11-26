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
      title: 'Work',
      desc: 'Meetings, NGOs and the office',
      icon: Briefcase,
      focus: 'Business Khmer' as const,
    },
    {
      id: 'kids',
      title: 'Family',
      desc: 'In-laws, children and heritage',
      icon: Baby,
      focus: 'Conversational' as const,
    },
    {
      id: 'exams',
      title: 'Reading and writing',
      desc: 'The Khmer script, step by step',
      icon: GraduationCap,
      focus: 'Script & Reading' as const,
    },
    {
      id: 'travel',
      title: 'Daily life',
      desc: 'Tuk-tuks, markets and food',
      icon: Compass,
      focus: 'Travel Khmer' as const,
    },
  ];

  return (
    <div className="max-w-[1200px] w-full mx-auto px-5 sm:px-8 py-4 sm:py-6">
      {!userGoal ? (
        <section aria-labelledby="goal-heading" className="pt-4 sm:pt-6">
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
            <h2 id="goal-heading" className="text-2xl font-bold text-[#172033]">
              What do you need Khmer for?
            </h2>
            <button
              onClick={onOpenGoalModal}
              className="self-start text-[15px] font-medium text-[#172033] underline decoration-[#2445C8]/40 underline-offset-4 hover:decoration-[#2445C8] cursor-pointer"
            >
              Not sure? Answer three questions
            </button>
          </div>
          <p className="mt-1 text-[15px] text-[#545B70]">Pick one and we show the tutors who teach it.</p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 mt-5">
            {goalCards.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  if (onSelectQuickGoal) {
                    onSelectQuickGoal(item.title, item.focus);
                  } else {
                    onOpenGoalModal();
                  }
                }}
                className="min-h-[44px] px-4 py-3.5 rounded-[10px] bg-white border border-[#DCE3EE] hover:border-[#2445C8] text-left transition-colors cursor-pointer"
              >
                <span className="block text-base font-semibold text-[#172033]">{item.title}</span>
                <span className="hidden sm:block text-sm text-[#545B70] mt-0.5">{item.desc}</span>
              </button>
            ))}
          </div>
        </section>
      ) : (
        <div className="p-4 sm:p-5 rounded-2xl bg-[#2445C8]/6 border border-[#2445C8]/25 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-[#2445C8] text-white flex items-center justify-center shrink-0">
              <Target className="w-5 h-5 text-[#F2B23A]" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-[#172033]">
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
              className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-[#172033] border border-slate-300 text-xs font-bold transition-colors cursor-pointer"
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
