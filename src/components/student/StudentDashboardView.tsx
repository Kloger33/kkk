import React, { useState } from 'react';
import { 
  BookOpen, 
  Calendar, 
  CreditCard, 
  Flame, 
  Clock, 
  Video, 
  CheckCircle2, 
  ArrowRight, 
  Star, 
  Sparkles, 
  Award, 
  TrendingUp,
  Plus,
  Compass,
  AlertCircle,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Tutor } from '../../data/tutorsData';

interface StudentDashboardViewProps {
  onFindTutors: () => void;
  onOpenCurriculum: () => void;
  onOpenMessages: () => void;
  onBookTutor: (tutor: Tutor) => void;
  featuredTutors: Tutor[];
}

export const StudentDashboardView: React.FC<StudentDashboardViewProps> = ({
  onFindTutors,
  onOpenCurriculum,
  onOpenMessages,
  onBookTutor,
  featuredTutors
}) => {
  const { user, updateWalletBalance, showToast } = useAuth();
  const [topUpAmount, setTopUpAmount] = useState<number>(15);
  const [showTopUpModal, setShowTopUpModal] = useState(false);
  const [isClassLive, setIsClassLive] = useState(false);

  const student = user?.studentProfile || {
    goal: 'Conversational & Daily Living',
    level: 'Intermediate (B1)',
    wallet_balance: 24.0,
    streak_days: 7,
    total_hours_learned: 18.0,
  };

  // 6 Starter Curriculum Modules Progress
  const modules = [
    { id: 1, title: 'Greetings & Formal Etiquette', progress: 100, lessons: '4/4', status: 'Completed', color: 'emerald' },
    { id: 2, title: 'Local Markets & Tuk-Tuk Bargaining', progress: 100, lessons: '4/4', status: 'Completed', color: 'emerald' },
    { id: 3, title: 'Directions & Street Khmer', progress: 75, lessons: '3/4', status: 'In Progress', color: 'teal' },
    { id: 4, title: 'Food, Dining & Dietary Needs', progress: 25, lessons: '1/4', status: 'In Progress', color: 'teal' },
    { id: 5, title: 'Khmer Script Foundations (Consonants)', progress: 0, lessons: '0/5', status: 'Not Started', color: 'slate' },
    { id: 6, title: 'Professional Workplace Khmer', progress: 0, lessons: '0/6', status: 'Not Started', color: 'slate' },
  ];

  const handleQuickTopUp = (amt: number) => {
    updateWalletBalance(amt);
    showToast(`Successfully added $${amt}.00 via ABA PayWay / Bakong KHQR!`);
    setShowTopUpModal(false);
  };

  return (
    <div className="max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      
      {/* Welcome Banner & Learning Stats */}
      <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-teal-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(circle_at_center,rgba(20,184,166,0.15),transparent_70%)] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-teal-300 text-xs font-bold uppercase tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Student Learning Center</span>
              <span className="text-teal-500">·</span>
              <span>Goal: {student.goal}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Soursdey, {user?.name || 'Learner'}! 👋
            </h1>
            <p className="text-slate-300 text-sm mt-1.5 max-w-xl">
              You are on a <strong className="text-amber-300 font-bold">{student.streak_days}-day learning streak</strong>. Keep up your conversational practice with your Cambodian university tutor!
            </p>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 shrink-0">
            <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-3.5 text-center">
              <div className="flex items-center justify-center gap-1 text-amber-400 mb-1">
                <Flame className="w-4 h-4 fill-amber-400" />
                <span className="text-lg font-black">{student.streak_days}</span>
              </div>
              <div className="text-[11px] text-slate-300 font-medium">Day Streak</div>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-3.5 text-center">
              <div className="flex items-center justify-center gap-1 text-teal-300 mb-1">
                <Clock className="w-4 h-4" />
                <span className="text-lg font-black">{student.total_hours_learned}h</span>
              </div>
              <div className="text-[11px] text-slate-300 font-medium">Completed</div>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-3.5 text-center">
              <div className="flex items-center justify-center gap-1 text-emerald-300 mb-1">
                <Award className="w-4 h-4" />
                <span className="text-lg font-black">B1</span>
              </div>
              <div className="text-[11px] text-slate-300 font-medium">Level</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Upcoming Class & Wallet */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Upcoming Lesson Card (Countdown & Join Class) */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-bold text-slate-900 text-base">Next 1-on-1 Khmer Class</h2>
                  <p className="text-xs text-slate-500">Live online session with your verified tutor</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                Starts in 32 mins
              </span>
            </div>

            <div className="mt-5 p-4 rounded-2xl bg-slate-50 border border-slate-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80" 
                  alt="Sreynoch Keo" 
                  className="w-14 h-14 rounded-2xl object-cover ring-2 ring-teal-500/20 shadow-xs"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-900 text-sm">Sreynoch Keo</h3>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-teal-50 text-teal-700 border border-teal-200">
                      RUPP
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Module 3: Directions & Tuk-Tuk Dialogues
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5 font-mono">
                    Today · 02:00 PM – 03:00 PM (ICT Phnom Penh)
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:items-end gap-2 shrink-0">
                <button
                  onClick={() => {
                    setIsClassLive(true);
                    showToast('Connecting to KhmerTutors secure encrypted video room...');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all hover:scale-[1.02]"
                >
                  <Video className="w-4 h-4" />
                  <span>Join Classroom (Live)</span>
                </button>
                <span className="text-[10px] text-slate-400">
                  Room opens 10m before start
                </span>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">
              Need to reschedule or request homework notes?
            </span>
            <button
              onClick={onOpenMessages}
              className="text-teal-700 font-bold hover:underline flex items-center gap-1"
            >
              <span>Message Sreynoch</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Student Wallet & Quick Top-Up */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-bold text-slate-900 text-sm">Learner Wallet</h2>
                  <p className="text-[11px] text-slate-500">KHQR & ABA PayWay Escrow</p>
                </div>
              </div>
              <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full">
                Active
              </span>
            </div>

            <div className="my-5 p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100">
              <span className="text-xs text-slate-500 font-medium">Available Balance</span>
              <div className="text-3xl font-black text-slate-900 mt-1">
                ${student.wallet_balance.toFixed(2)} <span className="text-xs font-semibold text-slate-500">USD</span>
              </div>
              <p className="text-[11px] text-emerald-800 mt-1">
                Covers approx. <strong>{Math.floor(student.wallet_balance / 3)} trial lessons</strong> or <strong>{Math.floor(student.wallet_balance / 8)} full hours</strong>.
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Instant Top-Up
              </span>
              <div className="grid grid-cols-3 gap-2">
                {[10, 25, 50].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => handleQuickTopUp(amt)}
                    className="py-2 rounded-xl bg-slate-50 hover:bg-teal-50 hover:text-teal-800 border border-slate-200 hover:border-teal-300 text-xs font-bold text-slate-700 transition-colors"
                  >
                    +${amt}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span>Secured via NBC Bakong</span>
            <button
              onClick={() => setShowTopUpModal(true)}
              className="text-teal-700 font-bold hover:underline"
            >
              Custom Amount →
            </button>
          </div>
        </div>

      </div>

      {/* 6 Starter Curriculum Modules Tracker */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-teal-600" />
              <h2 className="text-lg font-bold text-slate-900">
                Starter Curriculum Progress (6 Structured Modules)
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Follow our university-designed pedagogy tailored for expats, tourists, and NGO professionals.
            </p>
          </div>
          <button
            onClick={onOpenCurriculum}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-2 self-start sm:self-auto transition-colors"
          >
            <span>View Full Syllabus & Vocabulary</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((mod) => (
            <div 
              key={mod.id}
              className={`p-4 rounded-2xl border transition-all ${
                mod.progress === 100 
                  ? 'bg-emerald-50/40 border-emerald-200' 
                  : mod.progress > 0 
                  ? 'bg-teal-50/30 border-teal-200' 
                  : 'bg-slate-50 border-slate-200/80'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                  Module 0{mod.id}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  mod.progress === 100 
                    ? 'bg-emerald-100 text-emerald-800' 
                    : mod.progress > 0 
                    ? 'bg-teal-100 text-teal-800' 
                    : 'bg-slate-200 text-slate-600'
                }`}>
                  {mod.status}
                </span>
              </div>

              <h3 className="font-bold text-slate-900 text-sm leading-snug min-h-[40px]">
                {mod.title}
              </h3>

              <div className="mt-3">
                <div className="flex justify-between text-xs text-slate-500 mb-1">
                  <span>Completed Lessons</span>
                  <span className="font-bold text-slate-700">{mod.lessons}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-500 ${
                      mod.progress === 100 ? 'bg-emerald-500' : 'bg-teal-500'
                    }`} 
                    style={{ width: `${mod.progress}%` }} 
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended University Tutors for Student's Goal */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Recommended Tutors for "{student.goal}"
            </h2>
            <p className="text-xs text-slate-500">
              Verified top-rated Cambodian students currently available this week.
            </p>
          </div>
          <button
            onClick={onFindTutors}
            className="text-teal-700 font-bold text-xs hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Browse All {featuredTutors.length} Tutors</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredTutors.slice(0, 3).map((tutor) => (
            <div 
              key={tutor.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start gap-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-sm text-slate-800 ${tutor.avatarBg} ring-1 ring-slate-200 shrink-0`}>
                    {tutor.initials}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">{tutor.name}</h3>
                    <p className="text-[11px] text-teal-700 font-semibold">{tutor.university}</p>
                    <div className="flex items-center gap-1 mt-1 text-xs text-slate-600">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span className="font-bold">{tutor.rating.toFixed(1)}</span>
                      <span className="text-slate-400">({tutor.reviewsCount})</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-600 mt-3 line-clamp-2">
                  {tutor.headline}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-400">Trial lesson</div>
                  <div className="text-base font-black text-slate-900">${tutor.trialPrice}</div>
                </div>
                <button
                  onClick={() => onBookTutor(tutor)}
                  className="px-3.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
                >
                  Book ${tutor.trialPrice || 3} Trial
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Top-Up Modal */}
      {showTopUpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base">Top Up KhmerTutors Wallet</h3>
              <button 
                onClick={() => setShowTopUpModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Funds are held safely in escrow and only released to the university tutor after your lesson is successfully delivered.
            </p>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Amount (USD)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-400 font-bold">$</span>
                <input
                  type="number"
                  min="3"
                  max="500"
                  value={topUpAmount}
                  onChange={(e) => setTopUpAmount(Math.max(3, Number(e.target.value)))}
                  className="w-full pl-8 pr-4 py-2 border border-slate-300 rounded-xl font-bold text-sm focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
                />
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Payment Method
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button 
                  onClick={() => handleQuickTopUp(topUpAmount)}
                  className="p-3 rounded-xl border border-teal-500 bg-teal-50 text-teal-900 font-bold flex flex-col items-center justify-center gap-1"
                >
                  <span>🇰🇭 Bakong KHQR</span>
                  <span className="text-[10px] text-teal-700 font-normal">0% processing fee</span>
                </button>
                <button 
                  onClick={() => handleQuickTopUp(topUpAmount)}
                  className="p-3 rounded-xl border border-slate-200 hover:border-slate-300 font-bold flex flex-col items-center justify-center gap-1 text-slate-700"
                >
                  <span>💳 ABA PayWay</span>
                  <span className="text-[10px] text-slate-400 font-normal">Visa / Mastercard</span>
                </button>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
              <button
                onClick={() => setShowTopUpModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={() => handleQuickTopUp(topUpAmount)}
                className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-xs"
              >
                Confirm & Pay ${topUpAmount}.00
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
