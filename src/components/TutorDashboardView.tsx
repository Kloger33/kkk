import React, { useState } from 'react';
import {
  DollarSign,
  Clock,
  Calendar,
  Star,
  CheckCircle2,
  Check,
  TrendingUp,
  Users,
  Video,
  Share2,
  BookOpen,
  MessageSquare,
  ShieldCheck,
  X,
  LayoutDashboard,
  Building2,
  Smartphone,
  ArrowRight,
  UserCheck,
  FileCheck2,
  Mic,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export interface TutorDashboardViewProps {
  onBackToLearner?: () => void;
  activeSubTab?: 'overview' | 'schedule' | 'lessons' | 'students' | 'earnings';
  onSubTabChange?: (tab: 'overview' | 'schedule' | 'lessons' | 'students' | 'earnings') => void;
  onOpenMessages?: () => void;
  onViewPublicProfile?: () => void;
}

interface BookingRequest {
  id: string;
  studentName: string;
  studentCountry: string;
  studentAvatar: string;
  location: string;
  date: string;
  time: string;
  topic: string;
  price: number;
  status: 'pending' | 'accepted' | 'declined';
}

interface PayoutHistoryItem {
  id: string;
  date: string;
  method: 'ABA Bank' | 'Wing Money';
  account: string;
  amount: number;
  status: 'Completed' | 'Processing';
}

export const TutorDashboardView: React.FC<TutorDashboardViewProps> = ({
  onBackToLearner,
  activeSubTab: controlledSubTab,
  onSubTabChange,
  onOpenMessages,
  onViewPublicProfile,
}) => {
  const { user, showToast } = useAuth();
  const { t } = useLanguage();

  const [internalTab, setInternalTab] = useState<
    'overview' | 'schedule' | 'lessons' | 'students' | 'earnings'
  >('overview');
  const activeTab = controlledSubTab || internalTab;

  const handleTabChange = (
    tab: 'overview' | 'schedule' | 'lessons' | 'students' | 'earnings'
  ) => {
    if (onSubTabChange) {
      onSubTabChange(tab);
    } else {
      setInternalTab(tab);
    }
  };

  const tutorName = user?.name || 'Sreynoch Keo';
  const firstName = tutorName.split(' ')[0] || tutorName;
  const university =
    user?.tutorProfile?.university || 'Royal University of Phnom Penh (RUPP)';
  const isPending = user?.tutorProfile?.approval_status === 'pending';
  const hourlyRate = user?.tutorProfile?.hourly_price || 8.0;
  const trialPrice = user?.tutorProfile?.trial_price || 4.0;

  const getGreeting = () => {
    try {
      const phnomPenhHour = parseInt(
        new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Phnom_Penh',
          hour: 'numeric',
          hour12: false,
        }).format(new Date()),
        10
      );
      if (phnomPenhHour >= 5 && phnomPenhHour < 12) return 'Good morning';
      if (phnomPenhHour >= 12 && phnomPenhHour < 17) return 'Good afternoon';
      return 'Good evening';
    } catch {
      return 'Welcome back';
    }
  };

  // Payouts State (Strictly ABA / Wing)
  const [isPayoutModalOpen, setIsPayoutModalOpen] = useState(false);
  const [payoutMethod, setPayoutMethod] = useState<'ABA Bank' | 'Wing Money'>('ABA Bank');
  const [payoutAccount, setPayoutAccount] = useState('001 556 990');
  const [payoutLoading, setPayoutLoading] = useState(false);
  const [availableBalance, setAvailableBalance] = useState(142.0);
  const [payoutHistory, setPayoutHistory] = useState<PayoutHistoryItem[]>([
    {
      id: 'po-104',
      date: 'Nov 02, 2026',
      method: 'ABA Bank',
      account: '001 556 990',
      amount: 96.0,
      status: 'Completed',
    },
    {
      id: 'po-103',
      date: 'Oct 18, 2026',
      method: 'Wing Money',
      account: '012 884 310',
      amount: 64.0,
      status: 'Completed',
    },
  ]);

  const [isCopied, setIsCopied] = useState(false);
  const [activeLessonModal, setActiveLessonModal] = useState<{
    studentName: string;
    topic: string;
    meetLink: string;
  } | null>(null);

  const [bookingRequests, setBookingRequests] = useState<BookingRequest[]>([
    {
      id: 'req-1',
      studentName: 'Sophie Laurent',
      studentCountry: 'FR',
      studentAvatar: 'SL',
      location: 'Tonle Bassac, Phnom Penh',
      date: 'Today, 06:00 PM',
      time: '06:00 PM (ICT)',
      topic: 'Conversational Khmer for Local Markets & Bargaining',
      price: trialPrice,
      status: 'pending',
    },
    {
      id: 'req-2',
      studentName: 'Markus Weber',
      studentCountry: 'DE',
      studentAvatar: 'MW',
      location: 'Toul Tompoung, Phnom Penh',
      date: 'Tomorrow, 10:00 AM',
      time: '10:00 AM (ICT)',
      topic: 'Pronunciation: Khmer Consonants & Vowel Clusters',
      price: hourlyRate,
      status: 'pending',
    },
  ]);

  const [scheduleSlots, setScheduleSlots] = useState<{ [day: string]: string[] }>({
    Mon: ['08:00 AM', '10:00 AM', '02:00 PM', '04:00 PM', '07:00 PM'],
    Tue: ['09:00 AM', '11:00 AM', '03:00 PM', '05:00 PM'],
    Wed: ['08:00 AM', '10:00 AM', '01:00 PM', '04:00 PM', '06:00 PM'],
    Thu: ['10:00 AM', '02:00 PM', '04:00 PM', '07:00 PM'],
    Fri: ['09:00 AM', '01:00 PM', '03:00 PM', '05:00 PM'],
    Sat: ['08:00 AM', '10:00 AM', '01:00 PM', '03:00 PM', '05:00 PM'],
    Sun: ['09:00 AM', '11:00 AM', '02:00 PM'],
  });

  const availableHoursList = [
    '08:00 AM',
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '01:00 PM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM',
    '05:00 PM',
    '06:00 PM',
    '07:00 PM',
  ];

  const toggleSlot = (day: string, slot: string) => {
    setScheduleSlots((prev) => {
      const current = prev[day] || [];
      const updated = current.includes(slot)
        ? current.filter((s) => s !== slot)
        : [...current, slot];
      return { ...prev, [day]: updated };
    });
    showToast(`Updated ${day} schedule: ${slot}`);
  };

  const handleCopyProfileLink = () => {
    const link = `${window.location.origin}/#tutor-${firstName.toLowerCase()}`;
    navigator.clipboard?.writeText(link);
    setIsCopied(true);
    showToast('Profile link copied to clipboard.');
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleAcceptRequest = (id: string, name: string) => {
    setBookingRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'accepted' } : r))
    );
    showToast(`Accepted booking from ${name}. Added to Today's Lessons.`);
  };

  const handleDeclineRequest = (id: string, name: string) => {
    setBookingRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'declined' } : r))
    );
    showToast(`Declined booking request from ${name}.`);
  };

  const handleExecutePayout = (e: React.FormEvent) => {
    e.preventDefault();
    if (availableBalance <= 0) return;
    setPayoutLoading(true);
    setTimeout(() => {
      const amount = availableBalance;
      setPayoutHistory((prev) => [
        {
          id: `po-${Date.now().toString().slice(-3)}`,
          date: 'Today',
          method: payoutMethod,
          account: payoutAccount,
          amount,
          status: 'Processing',
        },
        ...prev,
      ]);
      setAvailableBalance(0);
      setPayoutLoading(false);
      setIsPayoutModalOpen(false);
      showToast(
        `Withdrawal of $${amount.toFixed(2)} submitted to ${payoutMethod} (${payoutAccount}).`
      );
    }, 900);
  };

  const todaysLessons = [
    {
      id: 'les-1',
      studentName: 'Alex Morgan',
      initials: 'AM',
      country: 'US',
      time: '04:00 PM – 05:00 PM (ICT)',
      topic: 'Module 2: Ordering Street Food & Tuk-Tuk Directions',
      type: 'Full Lesson (60 min)',
      price: hourlyRate,
      status: 'Upcoming',
      meetLink: 'https://meet.google.com/kto-khmer-alex',
    },
    {
      id: 'les-2',
      studentName: 'Chloe Bennett',
      initials: 'CB',
      country: 'UK',
      time: '07:00 PM – 07:30 PM (ICT)',
      topic: 'Trial Assessment: Polite Greetings & Pronouns',
      type: 'Trial Lesson (30 min)',
      price: trialPrice,
      status: 'Upcoming',
      meetLink: 'https://meet.google.com/kto-khmer-chloe',
    },
  ];

  const students = [
    {
      id: 'stu-1',
      name: 'Alex Morgan',
      country: 'US',
      location: 'BKK1, Phnom Penh',
      totalLessons: 12,
      lastLesson: 'Today at 04:00 PM',
      goal: 'Conversational Khmer for daily life & food',
      level: 'A2 Elementary',
      attendance: '100%',
    },
    {
      id: 'stu-2',
      name: 'Sophie Laurent',
      country: 'FR',
      location: 'Tonle Bassac, Phnom Penh',
      totalLessons: 6,
      lastLesson: '3 days ago',
      goal: 'Khmer Script & Reading',
      level: 'A1 Beginner',
      attendance: '100%',
    },
    {
      id: 'stu-3',
      name: 'Markus Weber',
      country: 'DE',
      location: 'Toul Tompoung, Phnom Penh',
      totalLessons: 8,
      lastLesson: '1 week ago',
      goal: 'Business Khmer & Networking',
      level: 'B1 Intermediate',
      attendance: '92%',
    },
    {
      id: 'stu-4',
      name: 'Chloe Bennett',
      country: 'UK',
      location: 'Daun Penh, Phnom Penh',
      totalLessons: 4,
      lastLesson: '2 weeks ago',
      goal: 'Travel & Cultural Etiquette',
      level: 'A1 Beginner',
      attendance: '100%',
    },
  ];

  const pendingReqCount = bookingRequests.filter((r) => r.status === 'pending').length;

  const sidebarItems = [
    { id: 'overview' as const, label: t('tutor.overview'), icon: LayoutDashboard },
    { id: 'schedule' as const, label: t('tutor.schedule'), icon: Calendar },
    {
      id: 'lessons' as const,
      label: t('tutor.lessons'),
      icon: BookOpen,
      badge: todaysLessons.length,
    },
    { id: 'students' as const, label: t('tutor.students'), icon: Users },
    { id: 'earnings' as const, label: t('tutor.earnings'), icon: DollarSign },
  ];

  const trackerSteps = [
    {
      step: '01',
      title: 'Application Submitted',
      detail: `${university} profile, bio, and $${trialPrice} trial rate recorded.`,
      status: 'done' as const,
      icon: FileCheck2,
    },
    {
      step: '02',
      title: 'ID & Voice Note Review (Within 24h)',
      detail: isPending
        ? 'Admin reviewers are checking your university ID card and Khmer voice intro. Next: approval notification via email.'
        : 'University student ID card and voice sample verified by the admin team.',
      status: isPending ? ('current' as const) : ('done' as const),
      icon: Mic,
    },
    {
      step: '03',
      title: 'Live & Accepting Trial Bookings',
      detail: isPending
        ? 'Unlocks immediately after Step 2 approval. Your profile will appear on Find Tutors.'
        : 'Active on public marketplace and open for $3–$5 trial bookings.',
      status: isPending ? ('upcoming' as const) : ('done' as const),
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F3F5F9] text-[#172033] flex flex-col lg:flex-row">
      {/* SINGLE SIDEBAR NAVIGATION */}
      <aside
        className="w-full lg:w-64 bg-[#172033] text-white p-4 lg:p-5 flex flex-col justify-between shrink-0 border-b lg:border-b-0 lg:border-r border-slate-800"
        aria-label="Tutor Workspace Navigation"
      >
        <div className="space-y-5">
          {/* Tutor Identity Block */}
          <div className="flex items-center justify-between lg:block pb-4 border-b border-white/10">
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-[#F2B23A] font-bold">
                Tutor Workspace
              </div>
              <div className="font-display font-bold text-base text-white mt-0.5 truncate">
                {tutorName}
              </div>
              <div className="text-[11px] text-slate-300 truncate">{university}</div>
            </div>

            <span
              className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono uppercase lg:mt-2 inline-block ${
                isPending
                  ? 'bg-[#F2B23A] text-[#172033]'
                  : 'bg-[#2445C8] text-white'
              }`}
            >
              {isPending ? 'Pending Review' : 'Verified Tutor'}
            </span>
          </div>

          {/* Single Navigation List (Horizontal scroll on mobile, Vertical stack on desktop) */}
          <nav className="flex lg:flex-col gap-1.5 overflow-x-auto no-scrollbar text-xs font-semibold">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id)}
                  className={`min-h-[42px] px-3.5 py-2.5 rounded-xl flex items-center justify-between gap-2.5 transition-colors cursor-pointer shrink-0 lg:w-full ${
                    isActive
                      ? 'bg-[#2445C8] text-white font-bold shadow-xs'
                      : 'text-slate-300 hover:text-white hover:bg-white/8'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 stroke-[2] shrink-0" />
                    <span className="whitespace-nowrap">{item.label}</span>
                  </span>
                  {item.badge !== undefined && (
                    <span
                      className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                        isActive ? 'bg-[#F2B23A] text-[#172033]' : 'bg-white/15 text-white'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Quick Actions */}
        <div className="hidden lg:block pt-5 mt-6 border-t border-white/10 space-y-2">
          <button
            onClick={() => setIsPayoutModalOpen(true)}
            className="w-full py-2.5 px-3 rounded-xl bg-[#F2B23A] hover:bg-[#e19724] text-[#172033] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <DollarSign className="w-4 h-4 stroke-[2.5]" />
            <span>Withdraw ${availableBalance.toFixed(2)}</span>
          </button>

          {onBackToLearner && (
            <button
              onClick={onBackToLearner}
              className="w-full py-2 px-3 rounded-xl bg-white/8 hover:bg-white/14 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Switch to Learner View</span>
            </button>
          )}
        </div>
      </aside>

      {/* MAIN WORKSPACE */}
      <div className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 max-w-6xl space-y-6 pb-20">
        {/* SINGLE 3-STEP APPLICATION TRACKER */}
        <section
          aria-labelledby="tracker-heading"
          className={`rounded-2xl border p-5 sm:p-6 ${
            isPending
              ? 'bg-white border-[#F2B23A] shadow-[0_4px_20px_rgba(242,165,49,0.12)]'
              : 'bg-white border-slate-200/90'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#2445C8]">
                Onboarding & Verification
              </span>
              <h2
                id="tracker-heading"
                className="font-display text-base sm:text-lg font-extrabold text-[#172033] mt-0.5"
              >
                {t('tutor.trackerTitle')}
              </h2>
            </div>
            <span
              className={`self-start sm:self-auto px-3 py-1 rounded-full text-xs font-bold font-mono ${
                isPending
                  ? 'bg-[#F2B23A]/20 text-[#172033] border border-[#F2B23A]/50'
                  : 'bg-[#2445C8]/10 text-[#2445C8] border border-[#2445C8]/20'
              }`}
            >
              {isPending ? 'Step 2 of 3 · Under Review' : '3 of 3 Steps Complete'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-4">
            {trackerSteps.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.step}
                  className={`rounded-xl p-3.5 border transition-colors ${
                    s.status === 'current'
                      ? 'bg-[#F2B23A]/10 border-[#F2B23A]'
                      : s.status === 'done'
                      ? 'bg-[#F3F5F9] border-slate-200'
                      : 'bg-white border-dashed border-slate-200 opacity-75'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-mono font-bold text-[#2445C8]">
                      STEP {s.step}
                    </span>
                    {s.status === 'done' ? (
                      <CheckCircle2 className="w-4 h-4 text-[#2445C8]" />
                    ) : s.status === 'current' ? (
                      <Clock className="w-4 h-4 text-[#172033]" />
                    ) : (
                      <Icon className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                  <div className="font-display font-bold text-sm text-[#172033]">{s.title}</div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{s.detail}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* GREETING & ACTION HEADER */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap text-xs">
                <span className="font-semibold text-[#2445C8]">Phnom Penh (GMT+7)</span>
                <span className="text-slate-300">·</span>
                <span className="font-medium text-slate-500">{university}</span>
              </div>

              <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-[#172033] tracking-tight">
                {getGreeting()}, {firstName}
              </h1>

              <p className="text-xs sm:text-sm text-slate-600">
                You have <strong className="text-[#172033]">{todaysLessons.length} lessons</strong>{' '}
                scheduled today and <strong className="text-[#2445C8]">{pendingReqCount} requests</strong>{' '}
                waiting.
              </p>
            </div>

            <div className="flex items-center gap-2.5 flex-wrap">
              <button
                onClick={handleCopyProfileLink}
                className="px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-[#F3F5F9] text-[#172033] text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                {isCopied ? (
                  <Check className="w-4 h-4 text-[#2445C8]" />
                ) : (
                  <Share2 className="w-4 h-4 text-slate-500" />
                )}
                <span>{isCopied ? 'Link Copied' : 'Share Profile'}</span>
              </button>

              {onViewPublicProfile && (
                <button
                  onClick={onViewPublicProfile}
                  className="px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-[#F3F5F9] text-[#172033] text-xs font-semibold cursor-pointer"
                >
                  Marketplace View
                </button>
              )}

              <button
                onClick={() => handleTabChange('schedule')}
                className="px-4 py-2 rounded-xl bg-[#2445C8] hover:bg-[#1c37a4] text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Edit Schedule</span>
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================
            TAB 1: OVERVIEW (KPIs + Today's Lessons + Requests)
           ======================================================== */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* KPIs */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-600">
                    Earnings this month
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-[#2445C8]/10 text-[#2445C8] flex items-center justify-center shrink-0">
                    <DollarSign className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-[#172033] font-mono tabular-nums tracking-tight">
                  ${availableBalance.toFixed(2)}
                </div>
                <div className="text-[11px] text-[#2445C8] font-semibold flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>+18% vs last month</span>
                </div>
              </div>

              <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-600">
                    Lessons completed
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-[#2445C8]/10 text-[#2445C8] flex items-center justify-center shrink-0">
                    <BookOpen className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-[#172033] font-mono tabular-nums tracking-tight">
                  28
                </div>
                <div className="text-[11px] text-slate-500 font-medium">
                  4 scheduled this week
                </div>
              </div>

              <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-600">Rating</span>
                  <div className="w-8 h-8 rounded-xl bg-[#F2B23A]/15 text-[#F2B23A] flex items-center justify-center shrink-0">
                    <Star className="w-4 h-4 fill-[#F2B23A]" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-[#172033] font-mono tabular-nums tracking-tight">
                  4.9 <span className="text-sm font-normal text-slate-400">/ 5</span>
                </div>
                <div className="text-[11px] text-slate-500 font-medium">18 verified reviews</div>
              </div>

              <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-600">Attendance rate</span>
                  <div className="w-8 h-8 rounded-xl bg-[#172033]/8 text-[#172033] flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-[#172033] font-mono tabular-nums tracking-tight">
                  100%
                </div>
                <div className="text-[11px] text-slate-600 font-semibold">0 missed slots</div>
              </div>
            </div>

            {/* TODAY'S LESSONS */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display text-base sm:text-lg font-bold text-[#172033]">
                    Today's Lessons ({todaysLessons.length})
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Confirmed 1-on-1 Khmer sessions for today (GMT+7).
                  </p>
                </div>
                <button
                  onClick={() => handleTabChange('lessons')}
                  className="text-xs font-bold text-[#2445C8] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>All lessons</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-3">
                {todaysLessons.map((les, idx) => (
                  <div
                    key={les.id}
                    className={`rounded-xl p-4 border flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                      idx === 0
                        ? 'bg-[#172033] text-white border-[#172033]'
                        : 'bg-[#F3F5F9] text-[#172033] border-slate-200'
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <div
                        className={`w-10 h-10 rounded-xl font-bold text-xs flex items-center justify-center shrink-0 ${
                          idx === 0
                            ? 'bg-[#2445C8] text-white'
                            : 'bg-white text-[#172033] border border-slate-200'
                        }`}
                      >
                        {les.initials}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-sm">{les.studentName}</span>
                          <span
                            className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold ${
                              idx === 0
                                ? 'bg-[#F2B23A] text-[#172033]'
                                : 'bg-white text-[#2445C8] border border-slate-200'
                            }`}
                          >
                            {les.type}
                          </span>
                        </div>
                        <p
                          className={`text-xs ${
                            idx === 0 ? 'text-slate-200' : 'text-slate-600'
                          }`}
                        >
                          {les.topic}
                        </p>
                        <div
                          className={`text-xs font-mono ${
                            idx === 0 ? 'text-slate-300' : 'text-slate-500'
                          }`}
                        >
                          {les.time} · ${les.price.toFixed(2)} USD
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() =>
                          setActiveLessonModal({
                            studentName: les.studentName,
                            topic: les.topic,
                            meetLink: les.meetLink,
                          })
                        }
                        className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors ${
                          idx === 0
                            ? 'bg-[#F2B23A] hover:bg-[#e19724] text-[#172033]'
                            : 'bg-[#2445C8] hover:bg-[#1c37a4] text-white'
                        }`}
                      >
                        <Video className="w-4 h-4" />
                        <span>Join Room</span>
                      </button>

                      <button
                        onClick={() => onOpenMessages && onOpenMessages()}
                        className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors ${
                          idx === 0
                            ? 'bg-white/10 hover:bg-white/20 text-white border border-white/15'
                            : 'bg-white hover:bg-slate-50 text-[#172033] border border-slate-200'
                        }`}
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Message</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* BOOKING REQUESTS */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 space-y-4">
              <div>
                <h3 className="font-display text-base sm:text-lg font-bold text-[#172033]">
                  Booking Requests ({pendingReqCount})
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Confirm or decline incoming lesson requests from learners.
                </p>
              </div>

              <div className="divide-y divide-slate-100">
                {bookingRequests.map((req) => (
                  <div
                    key={req.id}
                    className="py-4 first:pt-0 last:pb-0 flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-[#F3F5F9] border border-slate-200 text-[#172033] font-bold text-xs flex items-center justify-center shrink-0">
                        {req.studentAvatar}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#172033] text-sm">
                            {req.studentName}
                          </span>
                          <span className="text-[10px] font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">
                            {req.studentCountry}
                          </span>
                          <span className="text-xs text-slate-500">· {req.location}</span>
                        </div>
                        <p className="text-xs text-slate-600">{req.topic}</p>
                        <div className="flex items-center gap-3 text-xs text-slate-500 font-mono">
                          <span>{req.time}</span>
                          <span>·</span>
                          <span className="font-bold text-[#172033]">
                            ${req.price.toFixed(2)} USD
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {req.status === 'pending' ? (
                        <>
                          <button
                            onClick={() => handleAcceptRequest(req.id, req.studentName)}
                            className="px-4 py-2 rounded-xl bg-[#2445C8] hover:bg-[#1c37a4] text-white font-bold text-xs cursor-pointer"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleDeclineRequest(req.id, req.studentName)}
                            className="px-3 py-2 rounded-xl border border-slate-200 hover:bg-[#F3F5F9] text-slate-600 font-semibold text-xs cursor-pointer"
                          >
                            Decline
                          </button>
                        </>
                      ) : req.status === 'accepted' ? (
                        <span className="px-3 py-1 rounded-lg bg-[#2445C8]/10 text-[#2445C8] text-xs font-bold">
                          Accepted
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-lg bg-slate-100 text-slate-500 text-xs font-medium">
                          Declined
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 2: SCHEDULE
           ======================================================== */}
        {activeTab === 'schedule' && (
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <h3 className="font-display text-base sm:text-lg font-bold text-[#172033]">
                  Weekly Teaching Schedule
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Click any 1-hour slot to toggle your availability (Phnom Penh Time GMT+7).
                </p>
              </div>

              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-[#2445C8]" />
                  <span className="text-[#172033] font-medium">Available</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-[#F3F5F9] border border-slate-200" />
                  <span className="text-slate-400 font-medium">Unavailable</span>
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => {
                const dayFullNames: Record<string, string> = {
                  Mon: 'Monday',
                  Tue: 'Tuesday',
                  Wed: 'Wednesday',
                  Thu: 'Thursday',
                  Fri: 'Friday',
                  Sat: 'Saturday',
                  Sun: 'Sunday',
                };
                const activeSlotsForDay = scheduleSlots[day] || [];

                return (
                  <div
                    key={day}
                    className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 pb-3 border-b border-slate-100 last:border-b-0"
                  >
                    <div className="w-28 shrink-0">
                      <span className="font-bold text-xs sm:text-sm text-[#172033]">
                        {dayFullNames[day]}
                      </span>
                      <div className="text-[11px] text-slate-400 font-mono">
                        {activeSlotsForDay.length} slots
                      </div>
                    </div>

                    <div className="flex-1 flex flex-wrap gap-1.5">
                      {availableHoursList.map((slot) => {
                        const isSelected = activeSlotsForDay.includes(slot);
                        return (
                          <button
                            key={slot}
                            onClick={() => toggleSlot(day, slot)}
                            className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-[#2445C8] text-white font-bold'
                                : 'bg-[#F3F5F9] text-slate-600 hover:bg-slate-200/70'
                            }`}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 3: LESSONS
           ======================================================== */}
        {activeTab === 'lessons' && (
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 space-y-5">
            <div className="pb-4 border-b border-slate-100">
              <h3 className="font-display text-base sm:text-lg font-bold text-[#172033]">
                All Scheduled Lessons
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Launch Google Meet classrooms and track completed hours.
              </p>
            </div>

            <div className="space-y-3">
              {todaysLessons.map((les) => (
                <div
                  key={les.id}
                  className="border border-slate-200 bg-[#F3F5F9] rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-[#2445C8] text-white font-bold text-xs flex items-center justify-center shrink-0">
                      {les.initials}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#172033] text-sm">{les.studentName}</span>
                        <span className="px-2 py-0.5 rounded bg-white text-[#2445C8] border border-[#2445C8]/20 text-[10px] font-bold">
                          {les.type}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600">{les.topic}</p>
                      <div className="text-xs text-slate-500 font-mono">{les.time}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() =>
                        setActiveLessonModal({
                          studentName: les.studentName,
                          topic: les.topic,
                          meetLink: les.meetLink,
                        })
                      }
                      className="px-4 py-2 rounded-xl bg-[#2445C8] hover:bg-[#1c37a4] text-white text-xs font-bold cursor-pointer"
                    >
                      Join Room
                    </button>
                    <button
                      onClick={() => onOpenMessages && onOpenMessages()}
                      className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-[#172033] text-xs font-semibold cursor-pointer"
                    >
                      Message
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 4: STUDENTS
           ======================================================== */}
        {activeTab === 'students' && (
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 space-y-5">
            <div className="pb-4 border-b border-slate-100">
              <h3 className="font-display text-base sm:text-lg font-bold text-[#172033]">
                Active Learners ({students.length})
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Track each student's Khmer proficiency goal and lesson count.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {students.map((st) => (
                <div
                  key={st.id}
                  className="bg-[#F3F5F9] border border-slate-200 rounded-xl p-4 space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-display font-bold text-sm text-[#172033]">
                        {st.name}{' '}
                        <span className="text-[10px] font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200 ml-1">
                          {st.country}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500">{st.location}</div>
                    </div>
                    <span className="px-2 py-0.5 rounded-md bg-[#2445C8]/10 text-[#2445C8] text-[10px] font-bold">
                      {st.level}
                    </span>
                  </div>
                  <div className="text-xs text-slate-700">
                    <strong>Goal:</strong> {st.goal}
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-200/70 font-mono">
                    <span>{st.totalLessons} lessons</span>
                    <span>Attendance: {st.attendance}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 5: EARNINGS & PAYOUTS (ABA / Wing)
           ======================================================== */}
        {activeTab === 'earnings' && (
          <div className="space-y-6">
            <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#2445C8]">
                  Tutor Payouts (ABA / Wing)
                </span>
                <div className="text-3xl font-black font-mono tabular-nums text-[#172033] mt-1">
                  ${availableBalance.toFixed(2)} USD
                </div>
                <div className="text-xs text-slate-500 font-mono mt-0.5">
                  Approx. ៛{(availableBalance * 4100).toLocaleString()} KHR · Zero withdrawal fee
                </div>
              </div>

              <button
                onClick={() => setIsPayoutModalOpen(true)}
                disabled={availableBalance <= 0}
                className="px-5 py-3 rounded-xl bg-[#2445C8] hover:bg-[#1c37a4] disabled:opacity-50 text-white font-bold text-xs sm:text-sm cursor-pointer transition-colors"
              >
                Request Payout (ABA / Wing)
              </button>
            </div>

            <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 space-y-4">
              <h3 className="font-display text-base font-bold text-[#172033]">
                Recent Payout History
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-slate-200 text-slate-500 uppercase text-[10px] font-bold">
                    <tr>
                      <th className="py-2.5 pr-4">Date</th>
                      <th className="py-2.5 pr-4">Payout Rail</th>
                      <th className="py-2.5 pr-4">Account</th>
                      <th className="py-2.5 pr-4">Amount</th>
                      <th className="py-2.5 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono">
                    {payoutHistory.map((item) => (
                      <tr key={item.id}>
                        <td className="py-3 pr-4 text-slate-600">{item.date}</td>
                        <td className="py-3 pr-4 font-sans font-bold text-[#172033]">
                          {item.method}
                        </td>
                        <td className="py-3 pr-4 text-slate-600">{item.account}</td>
                        <td className="py-3 pr-4 font-bold text-[#172033] tabular-nums">
                          ${item.amount.toFixed(2)}
                        </td>
                        <td className="py-3 text-right">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              item.status === 'Completed'
                                ? 'bg-[#2445C8]/10 text-[#2445C8]'
                                : 'bg-[#F2B23A]/20 text-[#172033]'
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* PAYOUT MODAL: Strictly ABA Bank & Wing Money */}
      {isPayoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#172033]/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-display font-bold text-base text-[#172033]">
                {t('tutor.payoutTitle')}
              </h3>
              <button
                onClick={() => setIsPayoutModalOpen(false)}
                className="text-slate-400 hover:text-[#172033] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleExecutePayout} className="space-y-4 text-xs">
              <div className="p-3.5 rounded-xl bg-[#F3F5F9] border border-slate-200 flex items-center justify-between">
                <span className="text-slate-600 font-semibold">Available Balance:</span>
                <span className="text-lg font-black font-mono text-[#2445C8] tabular-nums">
                  ${availableBalance.toFixed(2)} USD
                </span>
              </div>

              <div className="space-y-2">
                <label className="block font-bold text-[#172033]">Choose Payout Method</label>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      setPayoutMethod('ABA Bank');
                      setPayoutAccount('001 556 990');
                    }}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      payoutMethod === 'ABA Bank'
                        ? 'border-[#2445C8] bg-[#2445C8]/8 ring-2 ring-[#2445C8]/15'
                        : 'border-slate-200 bg-white'
                    }`}
                  >
                    <Building2 className="w-4 h-4 text-[#2445C8] mb-1" />
                    <div className="font-bold text-[#172033]">ABA Bank</div>
                    <div className="text-[10px] text-slate-500">Direct USD / KHR</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setPayoutMethod('Wing Money');
                      setPayoutAccount('012 884 310');
                    }}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      payoutMethod === 'Wing Money'
                        ? 'border-[#2445C8] bg-[#2445C8]/8 ring-2 ring-[#2445C8]/15'
                        : 'border-slate-200 bg-white'
                    }`}
                  >
                    <Smartphone className="w-4 h-4 text-[#F2B23A] mb-1" />
                    <div className="font-bold text-[#172033]">Wing Money</div>
                    <div className="text-[10px] text-slate-500">Instant Wing wallet</div>
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#172033] mb-1">
                  {payoutMethod === 'ABA Bank' ? 'ABA Account Number' : 'Wing Phone / Account'}
                </label>
                <input
                  type="text"
                  required
                  value={payoutAccount}
                  onChange={(e) => setPayoutAccount(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#F3F5F9] border border-slate-200 rounded-xl font-mono text-[#172033] focus:outline-hidden focus:border-[#2445C8]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsPayoutModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={payoutLoading || availableBalance <= 0}
                  className="px-5 py-2 rounded-xl bg-[#2445C8] hover:bg-[#1c37a4] text-white font-bold cursor-pointer disabled:opacity-50"
                >
                  {payoutLoading ? 'Submitting...' : `Withdraw $${availableBalance.toFixed(2)}`}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* LESSON ROOM LAUNCH MODAL */}
      {activeLessonModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#172033]/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-display font-bold text-base text-[#172033]">
                Classroom: {activeLessonModal.studentName}
              </h3>
              <button
                onClick={() => setActiveLessonModal(null)}
                className="text-slate-400 hover:text-[#172033] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-slate-600">{activeLessonModal.topic}</p>
            <div className="p-3 bg-[#F3F5F9] rounded-xl font-mono text-xs text-[#2445C8] break-all">
              {activeLessonModal.meetLink}
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setActiveLessonModal(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
              <a
                href={activeLessonModal.meetLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 rounded-xl bg-[#2445C8] text-white text-xs font-bold"
              >
                Launch Google Meet
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
