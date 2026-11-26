import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ChevronRight, 
  Globe, 
  Smile, 
  PenTool, 
  Luggage, 
  X, 
  Check, 
  Sparkles,
  BookOpen,
  Compass,
  ArrowRight,
  LucideIcon
} from 'lucide-react';

export interface GoalPreference {
  goalId: 'career' | 'kids' | 'exams' | 'travel';
  title: string;
  subtitle: string;
  suggestedFocus: string;
  level?: string;
}

interface GoalSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectGoal: (goal: GoalPreference) => void;
  currentGoalId?: string | null;
}

export const GOAL_OPTIONS: {
  id: 'career' | 'kids' | 'exams' | 'travel';
  title: string;
  subtitle: string;
  icon: LucideIcon;
  suggestedFocus: string;
  badge: string;
  recommendedTutorsCount: number;
}[] = [
  {
    id: 'career',
    title: 'Career and business',
    subtitle: 'Workplace Khmer, business meetings, NGO terminology & formal dialogue',
    icon: Globe,
    suggestedFocus: 'Business Khmer',
    badge: 'Popular for Expat Professionals',
    recommendedTutorsCount: 3,
  },
  {
    id: 'kids',
    title: 'Lessons for kids',
    subtitle: 'Fun illustrated flashcards, playful games, songs & young learner basics',
    icon: Smile,
    suggestedFocus: 'Conversational',
    badge: 'Ages 5–16 Friendly',
    recommendedTutorsCount: 4,
  },
  {
    id: 'exams',
    title: 'Exams and course work',
    subtitle: 'Khmer script, formal reading, grammar syntax & university coursework',
    icon: PenTool,
    suggestedFocus: 'Script & Reading',
    badge: 'Academic & Literacy',
    recommendedTutorsCount: 3,
  },
  {
    id: 'travel',
    title: 'Culture, travel and hobby',
    subtitle: 'Tuk-tuk directions, street food ordering, market bargaining & temple culture',
    icon: Luggage,
    suggestedFocus: 'Travel Khmer',
    badge: 'Most Popular for Travellers',
    recommendedTutorsCount: 5,
  },
];

export const GoalSelectionModal: React.FC<GoalSelectionModalProps> = ({
  isOpen,
  onClose,
  onSelectGoal,
  currentGoalId,
}) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedGoal, setSelectedGoal] = useState<typeof GOAL_OPTIONS[0] | null>(
    currentGoalId ? GOAL_OPTIONS.find((g) => g.id === currentGoalId) || null : null
  );
  const [selectedLevel, setSelectedLevel] = useState<string>('Beginner (No prior Khmer)');

  if (!isOpen) return null;

  const handleGoalClick = (goal: typeof GOAL_OPTIONS[0]) => {
    setSelectedGoal(goal);
    // Move to step 2 to ask proficiency level, similar to Preply onboarding flow
    setStep(2);
  };

  const handleFinish = () => {
    if (!selectedGoal) return;
    onSelectGoal({
      goalId: selectedGoal.id,
      title: selectedGoal.title,
      subtitle: selectedGoal.subtitle,
      suggestedFocus: selectedGoal.suggestedFocus,
      level: selectedLevel,
    });
    onClose();
  };

  const handleDirectSelect = (goal: typeof GOAL_OPTIONS[0], e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectGoal({
      goalId: goal.id,
      title: goal.title,
      subtitle: goal.subtitle,
      suggestedFocus: goal.suggestedFocus,
      level: selectedLevel,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-0 sm:p-4 md:p-6 overflow-y-auto">
      {/* Main Container mirroring the Preply split layout */}
      <div className="relative w-full max-w-5xl h-full sm:h-auto sm:min-h-[580px] bg-white sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Close Button for convenient dismissal */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          title="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* LEFT PANE: Soft Pink Background (#fce7f3 / #fde8ea) with 3D Stairs & Arrow */}
        <div className="w-full md:w-[45%] bg-[#fce7f3] p-6 sm:p-10 flex flex-col justify-between relative overflow-hidden shrink-0 border-b md:border-b-0 md:border-r border-pink-100">
          
          {/* Top Row: Back Button */}
          <div className="flex items-center justify-between relative z-10">
            <button
              onClick={() => {
                if (step === 2) {
                  setStep(1);
                } else {
                  onClose();
                }
              }}
              className="p-2 rounded-xl text-slate-800 hover:bg-white/60 transition-colors inline-flex items-center gap-1 text-sm font-semibold"
              title="Go back"
            >
              <ArrowLeft className="w-5 h-5 text-slate-900" />
              {step === 2 && <span className="text-xs text-slate-700">Back</span>}
            </button>

            {/* Step Counter */}
            <span className="text-xs font-bold text-pink-700 bg-white/70 px-2.5 py-1 rounded-full border border-pink-200/60">
              Step {step} of 2
            </span>
          </div>

          {/* Center 3D Isometric Stairs & Rising Growth Arrow Illustration */}
          <div className="my-8 md:my-auto flex flex-col items-center justify-center relative">
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center">
              {/* Decorative subtle ambient shadow */}
              <div className="absolute bottom-6 w-36 h-10 bg-pink-300/40 rounded-full blur-md"></div>
              
              {/* Detailed Isometric 3D Staircase & Blue Ascending Arrow SVG */}
              <svg 
                viewBox="0 0 240 240" 
                className="w-full h-full drop-shadow-md select-none transform hover:scale-105 transition-transform duration-300"
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* 3D Isometric Green Stairs */}
                {/* Step 1 (Bottom) */}
                {/* Front face */}
                <polygon points="45,155 110,185 110,198 45,168" fill="#2d6a38" />
                {/* Side face */}
                <polygon points="110,185 175,155 175,168 110,198" fill="#387e45" />
                {/* Top tread */}
                <polygon points="45,155 110,125 175,155 110,185" fill="#5cb85c" />

                {/* Step 2 (Middle) */}
                <polygon points="60,135 110,158 110,170 60,147" fill="#275e31" />
                <polygon points="110,158 160,135 160,147 110,170" fill="#31723c" />
                <polygon points="60,135 110,112 160,135 110,158" fill="#67c367" />

                {/* Step 3 (Top) */}
                <polygon points="75,115 110,131 110,142 75,126" fill="#22542a" />
                <polygon points="110,131 145,115 145,126 110,142" fill="#2b6635" />
                <polygon points="75,115 110,99 145,115 110,131" fill="#74cf74" />

                {/* The Split / Crack Through the Steps */}
                <path 
                  d="M107,98 L109,128 L105,154 L112,185" 
                  stroke="#1b3d22" 
                  strokeWidth="3.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />

                {/* 3D Ascending Blue Arrow */}
                {/* Arrow shadow */}
                <path 
                  d="M110,170 L115,145 L135,130 L132,120 L158,110 L140,85 L125,100 L118,94 L102,125 Z" 
                  fill="rgba(0,0,0,0.12)" 
                />

                {/* Arrow Main 3D Side extrusion */}
                <polygon points="98,140 114,115 114,105 98,130" fill="#1d4ed8" />
                <polygon points="114,115 132,126 132,116 114,105" fill="#1e40af" />
                <polygon points="132,126 130,136 142,128 142,118" fill="#1e3a8a" />
                
                {/* Arrow Head 3D Side */}
                <polygon points="142,128 165,95 165,85 142,118" fill="#1e40af" />
                <polygon points="165,85 138,70 138,80 165,95" fill="#1d4ed8" />

                {/* Arrow Top Front Faces (Vibrant Royal / Preply Blue) */}
                {/* Shaft */}
                <polygon points="98,130 114,105 132,116 116,140" fill="#2563eb" />
                {/* Neck connector */}
                <polygon points="114,105 125,90 142,102 132,116" fill="#3b82f6" />
                {/* Arrowhead */}
                <polygon points="120,95 145,62 170,90 148,84 135,102" fill="#3b82f6" />
                {/* Arrowhead Top Highlight */}
                <polygon points="145,62 148,84 135,102 120,95" fill="#60a5fa" />

                {/* Subtle sheen highlight line */}
                <path 
                  d="M145,64 L122,94" 
                  stroke="#93c5fd" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                />
              </svg>
            </div>

            <div className="text-center mt-3">
              <span className="text-[11px] font-bold text-pink-900/70 uppercase tracking-widest">
                Tailored Learning Pathway
              </span>
              <p className="text-xs text-pink-950 font-medium max-w-xs mt-1">
                Tell us what you want to achieve, and we'll pair you with Cambodian university tutors who match your target.
              </p>
            </div>
          </div>

          {/* Bottom Row: KhmerTutors Online Brand Lockup */}
          <div className="pt-4 border-t border-pink-200/50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-9 h-8 rounded-lg bg-white border border-pink-200/80 flex items-center justify-center p-1 shadow-xs">
                <img 
                  src="/assets/logo_kto_new.png" 
                  alt="KTO Logo" 
                  className="w-full h-full object-contain" 
                />
              </div>
              <div>
                <span className="font-extrabold text-slate-900 text-sm tracking-tight block">
                  KhmerTutors <span className="text-teal-600">Online</span>
                </span>
                <span className="text-[10px] text-slate-600 block leading-tight">
                  Smart Micro-Tutoring Platform
                </span>
              </div>
            </div>

            <span className="text-[10px] text-pink-900/60 font-semibold bg-white/50 px-2 py-0.5 rounded">
              Verified Marketplace
            </span>
          </div>
        </div>

        {/* RIGHT PANE: Clean White Background with Goal Cards */}
        <div className="w-full md:w-[55%] p-6 sm:p-10 lg:p-12 flex flex-col justify-center bg-white">
          
          {step === 1 ? (
            <div className="max-w-md w-full mx-auto space-y-6">
              <div>
                <span className="text-xs font-bold text-teal-700 bg-teal-50 border border-teal-200 px-2.5 py-0.5 rounded-full inline-block mb-2">
                  Personalized Tutor Matching
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
                  What's your goal?
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1.5">
                  Pick your primary objective to highlight suitable Khmer tutors and curriculum modules.
                </p>
              </div>

              {/* 4 Interactive Goal Cards */}
              <div className="space-y-3 pt-2">
                {GOAL_OPTIONS.map((goal) => {
                  const isSelected = selectedGoal?.id === goal.id;
                  return (
                    <button
                      key={goal.id}
                      onClick={() => handleGoalClick(goal)}
                      className={`group w-full p-4 sm:p-4.5 rounded-2xl border-2 text-left transition-all duration-150 flex items-center justify-between shadow-xs hover:shadow-md cursor-pointer ${
                        isSelected
                          ? 'border-slate-900 bg-slate-50/80 ring-2 ring-slate-900/10'
                          : 'border-slate-200 hover:border-slate-900 bg-white hover:bg-slate-50/50'
                      }`}
                    >
                      <div className="flex items-center gap-3.5 pr-2">
                        {/* Icon Wrapper */}
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                          isSelected ? 'bg-slate-900 text-white' : 'bg-slate-100 group-hover:bg-slate-900 group-hover:text-white text-slate-800'
                        }`}>
                          <goal.icon className={`w-5 h-5 ${isSelected ? 'text-white' : 'group-hover:text-white text-slate-800'}`} />
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-black">
                              {goal.title}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                            {goal.subtitle}
                          </p>
                        </div>
                      </div>

                      {/* Right Chevron */}
                      <div className="shrink-0 pl-2">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 group-hover:text-slate-900 group-hover:bg-slate-200/60 transition-all group-hover:translate-x-0.5">
                          <ChevronRight className="w-5 h-5" />
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Bottom Quick Select Note */}
              <div className="pt-2 flex items-center justify-between text-xs text-slate-400 border-t border-slate-100">
                <span>You can adjust this anytime in the filters</span>
                <button
                  onClick={onClose}
                  className="text-slate-600 hover:text-slate-900 underline font-medium"
                >
                  Browse all tutors without goal
                </button>
              </div>
            </div>
          ) : (
            /* STEP 2: Target Level & Confirmation */
            <div className="max-w-md w-full mx-auto space-y-6 animate-in fade-in slide-in-from-right-4 duration-200">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 mb-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Selected: {selectedGoal?.title}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  What is your Khmer level?
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1.5">
                  Helps your tutor prepare appropriate dialogues and vocabulary.
                </p>
              </div>

              {/* Proficiency Level Options */}
              <div className="space-y-2.5">
                {[
                  {
                    level: 'Beginner (No prior Khmer)',
                    desc: 'Never studied Khmer. Start with basic greetings, numbers & tuk-tuk phrases.',
                  },
                  {
                    level: 'Elementary (Know basic words)',
                    desc: 'Can say simple phrases, recognize numbers and order food at restaurants.',
                  },
                  {
                    level: 'Intermediate (Can converse)',
                    desc: 'Comfortable speaking with locals; seeking grammar, reading and fluency.',
                  },
                  {
                    level: 'Advanced / Expat Professional',
                    desc: 'Workplace presentations, NGO reports, and complex cultural conversations.',
                  },
                ].map((item) => (
                  <button
                    key={item.level}
                    onClick={() => setSelectedLevel(item.level)}
                    className={`w-full p-3.5 rounded-xl border-2 text-left transition-all flex items-start justify-between cursor-pointer ${
                      selectedLevel === item.level
                        ? 'border-teal-600 bg-teal-50/50'
                        : 'border-slate-200 hover:border-slate-400 bg-white'
                    }`}
                  >
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-slate-900">
                        {item.level}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {item.desc}
                      </div>
                    </div>
                    {selectedLevel === item.level && (
                      <div className="w-5 h-5 rounded-full bg-teal-600 text-white flex items-center justify-center shrink-0 mt-0.5 ml-2">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold text-xs transition-colors"
                >
                  Change Goal
                </button>
                <button
                  onClick={handleFinish}
                  className="flex-1 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>Show Matched Tutors</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
