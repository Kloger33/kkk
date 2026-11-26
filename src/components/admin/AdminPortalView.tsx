import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Users,
  GraduationCap,
  Calendar,
  CreditCard,
  FileText,
  CheckCircle2,
  Search,
  TrendingUp,
  DollarSign,
  BarChart3,
  AlertTriangle,
  ShieldCheck,
  Check,
  X,
  FlaskConical,
  Award,
  Languages,
  Play,
  Pause,
  Volume2,
  BadgeCheck,
  Building2,
  Smartphone,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import {
  INITIAL_TRANSLATION_NAMESPACES,
  TranslationNamespace,
  useLanguage,
} from '../../context/LanguageContext';
import { MOCK_TUTORS } from '../../data/tutorsData';
import { AdminPilotDashboard } from './AdminPilotDashboard';

interface PendingTutor {
  id: number;
  name: string;
  email: string;
  phone: string;
  university: string;
  major: string;
  year: string;
  studentIdCode: string;
  bio: string;
  trial_price: number;
  hourly_price: number;
  voiceNoteDuration: string;
  voiceTranscript: string;
  approval_status: 'pending' | 'approved' | 'rejected';
  rejection_reason?: string;
  created_at: string;
}

interface UserRow {
  id: number;
  name: string;
  email: string;
  roles: string;
  status: 'active' | 'suspended' | 'banned';
  created_at: string;
}

interface PayoutRow {
  id: number;
  tutor_id: number;
  tutor_name: string;
  amount: number;
  method: 'ABA Bank' | 'Wing Money';
  account_details: string;
  status: 'pending' | 'paid' | 'rejected';
  requested_at: string;
}

export const AdminPortalView: React.FC = () => {
  const { showToast, updateTutorApproval } = useAuth();
  const { t } = useLanguage();

  const [activeTab, setActiveTab] = useState<
    'tutors' | 'leaderboard' | 'payouts' | 'translations' | 'pilot' | 'overview' | 'users' | 'audit'
  >('tutors');

  // Pending Tutors State with Student ID & Voice Note data
  const [pendingTutors, setPendingTutors] = useState<PendingTutor[]>([
    {
      id: 4,
      name: 'Visal Rath',
      email: 'visal.pending@khmertutors.com',
      phone: '+855 85 999 333',
      university: 'National University of Management (NUM)',
      major: 'Business Management & Hospitality',
      year: 'Year 2',
      studentIdCode: 'NUM-2025-04182',
      bio: 'Eager to help beginner expats and tourists with conversational Khmer, market dialogues, and basic polite phrases.',
      trial_price: 3.5,
      hourly_price: 8.5,
      voiceNoteDuration: '0:28',
      voiceTranscript:
        '“ជំរាបសួរ! My name is Visal from NUM. I teach relaxed everyday Khmer for expats living in Phnom Penh.”',
      approval_status: 'pending',
      created_at: '2026-11-06 14:20',
    },
    {
      id: 5,
      name: 'Maly Chhim',
      email: 'maly.rupp@khmertutors.com',
      phone: '+855 92 441 208',
      university: 'Royal University of Phnom Penh (RUPP)',
      major: 'Khmer Literature & English',
      year: 'Year 3',
      studentIdCode: 'RUPP-2024-11904',
      bio: 'Focused on clear pronunciation, polite registers, and reading basic Khmer street signs.',
      trial_price: 3.0,
      hourly_price: 7.5,
      voiceNoteDuration: '0:34',
      voiceTranscript:
        '“សួស្តី! I am Maly at RUPP. Let us practice ordering coffee and polite Khmer greetings together.”',
      approval_status: 'pending',
      created_at: '2026-11-06 16:05',
    },
  ]);

  // Voice Note Player State
  const [playingTutorId, setPlayingTutorId] = useState<number | null>(null);
  const [playProgress, setPlayProgress] = useState<number>(0);
  const playIntervalRef = useRef<number | null>(null);

  // Full Leaderboard Sort Category
  const [leaderboardMetric, setLeaderboardMetric] = useState<'rating' | 'lessons' | 'rate'>('rating');

  // Translation Coverage State
  const [namespaces, setNamespaces] = useState<TranslationNamespace[]>(
    INITIAL_TRANSLATION_NAMESPACES
  );
  const [selectedNsId, setSelectedNsId] = useState<string>(INITIAL_TRANSLATION_NAMESPACES[0].id);

  // Users List State
  const [userSearch, setUserSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [usersList, setUsersList] = useState<UserRow[]>([
    {
      id: 1,
      name: 'Dara Sovann (Admin)',
      email: 'admin@khmertutors.com',
      roles: 'ADMIN',
      status: 'active',
      created_at: '2026-10-01',
    },
    {
      id: 2,
      name: 'Sreynoch Keo',
      email: 'sreynoch@khmertutors.com',
      roles: 'TUTOR',
      status: 'active',
      created_at: '2026-10-05',
    },
    {
      id: 3,
      name: 'Chamroeun Thearith',
      email: 'chamroeun@khmertutors.com',
      roles: 'TUTOR',
      status: 'active',
      created_at: '2026-10-12',
    },
    {
      id: 4,
      name: 'Visal Rath',
      email: 'visal.pending@khmertutors.com',
      roles: 'TUTOR',
      status: 'active',
      created_at: '2026-11-06',
    },
    {
      id: 5,
      name: 'Alex Morgan',
      email: 'alex@expatphnompenh.com',
      roles: 'STUDENT',
      status: 'active',
      created_at: '2026-10-15',
    },
    {
      id: 6,
      name: 'Sarah Jenkins',
      email: 'sarah.ngo@phnompenh.org',
      roles: 'STUDENT',
      status: 'active',
      created_at: '2026-10-20',
    },
  ]);

  // Payouts strictly ABA / Wing
  const [payouts, setPayouts] = useState<PayoutRow[]>([
    {
      id: 1,
      tutor_id: 2,
      tutor_name: 'Sreynoch Keo',
      amount: 120.0,
      method: 'ABA Bank',
      account_details: '001 556 990 (Sreynoch Keo)',
      status: 'pending',
      requested_at: '2026-11-06 09:30',
    },
    {
      id: 2,
      tutor_id: 3,
      tutor_name: 'Chamroeun Thearith',
      amount: 85.0,
      method: 'Wing Money',
      account_details: '012 884 310 (Wing Wallet)',
      status: 'paid',
      requested_at: '2026-11-04 11:15',
    },
  ]);

  const [rejectingTutorId, setRejectingTutorId] = useState<number | null>(null);
  const [rejectReason, setRejectReason] = useState(
    'University student ID card is unreadable or expired. Please upload a clear student card photo.'
  );

  useEffect(() => {
    fetch('/api/admin/tutors/pending')
      .then((res) => res.json())
      .then((data) => {
        if (data.tutors && data.tutors.length > 0) {
          setPendingTutors((prev) => {
            const existingIds = new Set(prev.map((p) => p.id));
            const merged = [...prev];
            for (const item of data.tutors) {
              if (!existingIds.has(item.id)) {
                merged.push({
                  ...item,
                  studentIdCode: item.studentIdCode || `UNI-2026-0${item.id}8`,
                  voiceNoteDuration: item.voiceNoteDuration || '0:30',
                  voiceTranscript:
                    item.voiceTranscript || '“Soursdey! Ready to teach 1-on-1 conversational Khmer.”',
                });
              }
            }
            return merged;
          });
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    return () => {
      if (playIntervalRef.current) window.clearInterval(playIntervalRef.current);
    };
  }, []);

  const handleToggleVoiceNote = (tutorId: number) => {
    if (playingTutorId === tutorId) {
      if (playIntervalRef.current) window.clearInterval(playIntervalRef.current);
      setPlayingTutorId(null);
      setPlayProgress(0);
      return;
    }

    if (playIntervalRef.current) window.clearInterval(playIntervalRef.current);
    setPlayingTutorId(tutorId);
    setPlayProgress(10);

    // Subtle Web Audio confirmation chime if allowed
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.value = 440;
        gain.gain.value = 0.03;
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.12);
      }
    } catch {}

    playIntervalRef.current = window.setInterval(() => {
      setPlayProgress((prev) => {
        if (prev >= 100) {
          if (playIntervalRef.current) window.clearInterval(playIntervalRef.current);
          setPlayingTutorId(null);
          return 0;
        }
        return prev + 10;
      });
    }, 350);
  };

  const handleApproveTutor = async (tutorId: number) => {
    try {
      await fetch(`/api/admin/tutors/${tutorId}/approval`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'approve' }),
      });
    } catch {}

    setPendingTutors((prev) => prev.filter((t) => t.id !== tutorId));
    updateTutorApproval(tutorId, 'approved');
    showToast('Tutor approved and activated on the marketplace.');
  };

  const handleRejectTutor = async (tutorId: number) => {
    try {
      await fetch(`/api/admin/tutors/${tutorId}/approval`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'reject', reason: rejectReason }),
      });
    } catch {}

    setPendingTutors((prev) => prev.filter((t) => t.id !== tutorId));
    updateTutorApproval(tutorId, 'rejected');
    setRejectingTutorId(null);
    showToast('Tutor application rejected with feedback.');
  };

  const handleApprovePayout = (payoutId: number) => {
    setPayouts((prev) => prev.map((p) => (p.id === payoutId ? { ...p, status: 'paid' } : p)));
    showToast('Payout marked as PAID via ABA / Wing.');
  };

  const handleToggleUserStatus = (userId: number) => {
    setUsersList((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const newStatus = u.status === 'active' ? 'suspended' : 'active';
          showToast(`User ${u.name} status updated to ${newStatus}`);
          return { ...u, status: newStatus };
        }
        return u;
      })
    );
  };

  const handleToggleSampleReviewed = (nsId: string, key: string) => {
    setNamespaces((prev) =>
      prev.map((ns) => {
        if (ns.id !== nsId) return ns;
        const updatedSamples = ns.samples.map((s) =>
          s.key === key ? { ...s, reviewed: !s.reviewed } : s
        );
        const allReviewed = updatedSamples.every((s) => s.reviewed);
        return {
          ...ns,
          samples: updatedSamples,
          reviewStatus: allReviewed ? 'Reviewed' : 'Needs native review',
        };
      })
    );
    showToast('Updated Khmer native-speaker review status.');
  };

  const rankedTutors = useMemo(() => {
    return [...MOCK_TUTORS].sort((a, b) => {
      if (leaderboardMetric === 'rating') {
        return b.rating - a.rating || b.reviewsCount - a.reviewsCount;
      }
      if (leaderboardMetric === 'lessons') {
        return b.lessonsTaught - a.lessonsTaught;
      }
      return b.hourlyRate - a.hourlyRate || b.rating - a.rating;
    });
  }, [leaderboardMetric]);

  const filteredUsers = usersList.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase());
    const matchRole = roleFilter === 'ALL' || u.roles.includes(roleFilter);
    return matchSearch && matchRole;
  });

  const pendingPayoutTotal = payouts
    .filter((p) => p.status === 'pending')
    .reduce((acc, p) => acc + p.amount, 0);

  const selectedNamespace =
    namespaces.find((n) => n.id === selectedNsId) || namespaces[0];

  const totalKeysAll = namespaces.reduce((s, n) => s + n.totalKeys, 0);
  const translatedKeysAll = namespaces.reduce((s, n) => s + n.translatedKeys, 0);
  const reviewedNamespacesCount = namespaces.filter((n) => n.reviewStatus === 'Reviewed').length;

  return (
    <div className="min-h-screen bg-[#F7F6F2] text-[#14213D] flex flex-col md:flex-row">
      {/* ADMIN SIDEBAR */}
      <aside className="w-full md:w-64 bg-[#14213D] text-white p-5 flex flex-col justify-between shrink-0 border-r border-slate-800">
        <div>
          <div className="flex items-center gap-3 pb-5 border-b border-white/10">
            <div className="w-10 h-10 rounded-xl bg-[#2445C8] text-white flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-display font-extrabold text-sm tracking-tight text-white">
                {t('nav.adminPortal')}
              </div>
              <div className="text-[11px] text-[#F2A531] font-medium">Operations Console</div>
            </div>
          </div>

          <nav className="mt-5 flex md:flex-col gap-1.5 overflow-x-auto no-scrollbar text-xs font-semibold">
            <button
              onClick={() => setActiveTab('tutors')}
              className={`min-h-[42px] px-3.5 py-2.5 rounded-xl flex items-center justify-between gap-2 transition-colors cursor-pointer shrink-0 md:w-full ${
                activeTab === 'tutors'
                  ? 'bg-[#2445C8] text-white font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-white/8'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <GraduationCap className="w-4 h-4 shrink-0" />
                <span className="whitespace-nowrap">Approvals Queue</span>
              </span>
              {pendingTutors.length > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-[#F2A531] text-[#14213D] font-mono font-bold text-[10px]">
                  {pendingTutors.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('leaderboard')}
              className={`min-h-[42px] px-3.5 py-2.5 rounded-xl flex items-center gap-2.5 transition-colors cursor-pointer shrink-0 md:w-full ${
                activeTab === 'leaderboard'
                  ? 'bg-[#2445C8] text-white font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-white/8'
              }`}
            >
              <Award className="w-4 h-4 shrink-0" />
              <span className="whitespace-nowrap">Full Leaderboard</span>
            </button>

            <button
              onClick={() => setActiveTab('payouts')}
              className={`min-h-[42px] px-3.5 py-2.5 rounded-xl flex items-center justify-between gap-2 transition-colors cursor-pointer shrink-0 md:w-full ${
                activeTab === 'payouts'
                  ? 'bg-[#2445C8] text-white font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-white/8'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <CreditCard className="w-4 h-4 shrink-0" />
                <span className="whitespace-nowrap">Payouts (ABA/Wing)</span>
              </span>
              {pendingPayoutTotal > 0 && (
                <span className="text-[10px] bg-[#F2A531] text-[#14213D] px-1.5 py-0.5 rounded font-mono font-bold">
                  ${pendingPayoutTotal}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('translations')}
              className={`min-h-[42px] px-3.5 py-2.5 rounded-xl flex items-center justify-between gap-2 transition-colors cursor-pointer shrink-0 md:w-full ${
                activeTab === 'translations'
                  ? 'bg-[#2445C8] text-white font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-white/8'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Languages className="w-4 h-4 shrink-0" />
                <span className="whitespace-nowrap">Translations</span>
              </span>
              <span className="text-[10px] font-mono bg-white/15 px-1.5 py-0.5 rounded">
                EN/ខ្មែរ
              </span>
            </button>

            <button
              onClick={() => setActiveTab('pilot')}
              className={`min-h-[42px] px-3.5 py-2.5 rounded-xl flex items-center gap-2.5 transition-colors cursor-pointer shrink-0 md:w-full ${
                activeTab === 'pilot'
                  ? 'bg-[#2445C8] text-white font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-white/8'
              }`}
            >
              <FlaskConical className="w-4 h-4 shrink-0" />
              <span className="whitespace-nowrap">Pilot Test Center</span>
            </button>

            <button
              onClick={() => setActiveTab('overview')}
              className={`min-h-[42px] px-3.5 py-2.5 rounded-xl flex items-center gap-2.5 transition-colors cursor-pointer shrink-0 md:w-full ${
                activeTab === 'overview'
                  ? 'bg-[#2445C8] text-white font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-white/8'
              }`}
            >
              <BarChart3 className="w-4 h-4 shrink-0" />
              <span className="whitespace-nowrap">Platform Metrics</span>
            </button>

            <button
              onClick={() => setActiveTab('users')}
              className={`min-h-[42px] px-3.5 py-2.5 rounded-xl flex items-center gap-2.5 transition-colors cursor-pointer shrink-0 md:w-full ${
                activeTab === 'users'
                  ? 'bg-[#2445C8] text-white font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-white/8'
              }`}
            >
              <Users className="w-4 h-4 shrink-0" />
              <span className="whitespace-nowrap">Users</span>
            </button>

            <button
              onClick={() => setActiveTab('audit')}
              className={`min-h-[42px] px-3.5 py-2.5 rounded-xl flex items-center gap-2.5 transition-colors cursor-pointer shrink-0 md:w-full ${
                activeTab === 'audit'
                  ? 'bg-[#2445C8] text-white font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-white/8'
              }`}
            >
              <FileText className="w-4 h-4 shrink-0" />
              <span className="whitespace-nowrap">Audit Trail</span>
            </button>
          </nav>
        </div>

        <div className="hidden md:block pt-4 border-t border-white/10 text-[11px] text-slate-400">
          <div>KhmerTutors Online Admin</div>
          <div className="text-[#F2A531] mt-0.5 font-mono">ABA Pay / KHQR / Wing</div>
        </div>
      </aside>

      {/* MAIN ADMIN WORKSPACE */}
      <main className="flex-1 min-w-0 p-5 sm:p-8 max-w-6xl space-y-6">
        {/* ========================================================
            1. APPROVAL QUEUE (Student ID + Playable Voice Note)
           ======================================================== */}
        {activeTab === 'tutors' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h1 className="font-display text-2xl font-extrabold text-[#14213D]">
                  Tutor Application Approval Queue
                </h1>
                <p className="text-xs text-slate-600 mt-1">
                  Inspect each applicant's university student ID and listen to their spoken Khmer/English voice note before approving.
                </p>
              </div>
              <span className="self-start sm:self-auto text-xs bg-white border border-slate-200 px-3 py-1 rounded-full text-[#14213D] font-mono font-bold">
                {pendingTutors.length} Pending
              </span>
            </div>

            {pendingTutors.length > 0 ? (
              <div className="space-y-4">
                {pendingTutors.map((tutor) => {
                  const isPlaying = playingTutorId === tutor.id;
                  return (
                    <div
                      key={tutor.id}
                      className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-2xs space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2.5 flex-wrap">
                            <h3 className="font-display font-extrabold text-[#14213D] text-lg">
                              {tutor.name}
                            </h3>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#F2A531]/20 text-[#14213D] border border-[#F2A531]/50 font-mono uppercase">
                              Pending Review
                            </span>
                          </div>
                          <div className="text-xs text-[#2445C8] font-semibold mt-1">
                            {tutor.university} · {tutor.major} ({tutor.year})
                          </div>
                          <div className="text-xs text-slate-500 mt-0.5 font-mono">
                            {tutor.email} · {tutor.phone}
                          </div>
                        </div>

                        <div className="sm:text-right">
                          <div className="text-[11px] text-slate-500">Proposed Rates</div>
                          <div className="text-sm font-black font-mono text-[#14213D] tabular-nums">
                            ${tutor.trial_price.toFixed(2)} Trial · ${tutor.hourly_price.toFixed(2)}/hr
                          </div>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-[#F7F6F2] border border-slate-200/70 text-xs text-slate-700">
                        <strong className="text-[#14213D]">Bio: </strong>
                        {tutor.bio}
                      </div>

                      {/* Two Verification Artifacts: Student ID + Voice Note */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                        {/* Artifact A: University Student ID Card */}
                        <div className="p-4 rounded-xl bg-[#F7F6F2] border border-slate-200 space-y-2.5">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-xs font-bold text-[#14213D]">
                              <BadgeCheck className="w-4 h-4 text-[#2445C8]" />
                              <span>University Student ID</span>
                            </div>
                            <span className="text-[10px] font-mono font-bold text-[#2445C8] bg-white px-2 py-0.5 rounded border border-[#2445C8]/20">
                              ID Hash Verified
                            </span>
                          </div>

                          <div className="bg-white border border-slate-200 rounded-lg p-3 flex items-center gap-3">
                            <div className="w-11 h-14 rounded-md bg-[#14213D] text-white flex flex-col items-center justify-center text-[10px] font-mono shrink-0">
                              <span>PHOTO</span>
                              <span className="text-[#F2A531] font-bold">ID</span>
                            </div>
                            <div className="min-w-0 text-xs space-y-0.5">
                              <div className="font-bold text-[#14213D] truncate">{tutor.name}</div>
                              <div className="text-[11px] text-slate-600 truncate">
                                {tutor.university}
                              </div>
                              <div className="text-[11px] font-mono text-[#2445C8] font-bold">
                                Card #{tutor.studentIdCode}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Artifact B: Voice Note Player */}
                        <div className="p-4 rounded-xl bg-[#F7F6F2] border border-slate-200 space-y-2.5">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-xs font-bold text-[#14213D]">
                              <Volume2 className="w-4 h-4 text-[#2445C8]" />
                              <span>Voice Note Sample</span>
                            </div>
                            <span className="text-[11px] font-mono text-slate-500">
                              {tutor.voiceNoteDuration}
                            </span>
                          </div>

                          <div className="bg-white border border-slate-200 rounded-lg p-2.5 flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => handleToggleVoiceNote(tutor.id)}
                              className="w-9 h-9 rounded-full bg-[#2445C8] hover:bg-[#1c37a4] text-white flex items-center justify-center shrink-0 cursor-pointer transition-colors"
                              aria-label={isPlaying ? 'Pause voice note' : 'Play voice note'}
                            >
                              {isPlaying ? (
                                <Pause className="w-4 h-4" />
                              ) : (
                                <Play className="w-4 h-4 ml-0.5" />
                              )}
                            </button>

                            <div className="flex-1 min-w-0 space-y-1">
                              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-[#2445C8] transition-all duration-200"
                                  style={{ width: `${isPlaying ? playProgress : 0}%` }}
                                />
                              </div>
                              <div className="text-[10px] text-slate-500 truncate">
                                {isPlaying ? 'Playing Khmer & English audio check...' : 'Click play to verify pronunciation & mic clarity'}
                              </div>
                            </div>
                          </div>

                          <p className="text-[11px] text-slate-600 italic leading-snug">
                            {tutor.voiceTranscript}
                          </p>
                        </div>
                      </div>

                      <div className="pt-2 flex items-center justify-end gap-3">
                        <button
                          onClick={() => setRejectingTutorId(tutor.id)}
                          className="px-4 py-2 rounded-xl border border-rose-300 text-rose-700 hover:bg-rose-50 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                          <span>Reject</span>
                        </button>

                        <button
                          onClick={() => handleApproveTutor(tutor.id)}
                          className="px-5 py-2 rounded-xl bg-[#2445C8] hover:bg-[#1c37a4] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                        >
                          <Check className="w-4 h-4" />
                          <span>Approve & Activate</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-500">
                <CheckCircle2 className="w-10 h-10 text-[#2445C8] mx-auto mb-2" />
                <h3 className="font-display font-bold text-[#14213D] text-base">
                  All tutor applications reviewed
                </h3>
                <p className="text-xs mt-1">
                  No pending student applications in the queue right now.
                </p>
              </div>
            )}
          </div>
        )}

        {/* ========================================================
            2. FULL LEADERBOARD (All Tutors across 3 metrics)
           ======================================================== */}
        {activeTab === 'leaderboard' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h1 className="font-display text-2xl font-extrabold text-[#14213D]">
                  Full Tutor Leaderboard
                </h1>
                <p className="text-xs text-slate-600 mt-1">
                  Complete ranking across all {rankedTutors.length} active tutors (public view displays top 3 per category).
                </p>
              </div>

              <div className="inline-flex bg-white border border-slate-200 rounded-xl p-1 text-xs font-bold">
                {[
                  { id: 'rating', label: 'Best rated' },
                  { id: 'lessons', label: 'Most lessons' },
                  { id: 'rate', label: 'Top rate/hr' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setLeaderboardMetric(opt.id as any)}
                    className={`px-3 py-1.5 rounded-lg cursor-pointer transition-colors ${
                      leaderboardMetric === opt.id
                        ? 'bg-[#2445C8] text-white'
                        : 'text-slate-600 hover:text-[#14213D]'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F7F6F2] text-slate-500 border-b border-slate-200 uppercase text-[10px] font-bold">
                    <tr>
                      <th className="py-3 px-4">Rank</th>
                      <th className="py-3 px-4">Tutor</th>
                      <th className="py-3 px-4">University</th>
                      <th className="py-3 px-4">Rating</th>
                      <th className="py-3 px-4">Lessons</th>
                      <th className="py-3 px-4">Students</th>
                      <th className="py-3 px-4 text-right">Rate / hr</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {rankedTutors.map((tutor, idx) => (
                      <tr key={tutor.id} className="hover:bg-[#F7F6F2]/60">
                        <td className="py-3 px-4 font-mono font-bold">
                          <span
                            className={`inline-flex items-center justify-center w-6 h-6 rounded-md text-xs ${
                              idx < 3
                                ? 'bg-[#F2A531] text-[#14213D]'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {idx + 1}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-bold text-[#14213D]">{tutor.name}</td>
                        <td className="py-3 px-4 text-slate-600">{tutor.university}</td>
                        <td className="py-3 px-4 font-mono font-bold text-[#14213D] tabular-nums">
                          {tutor.rating.toFixed(1)} ({tutor.reviewsCount})
                        </td>
                        <td className="py-3 px-4 font-mono tabular-nums text-[#2445C8] font-bold">
                          {tutor.lessonsTaught}
                        </td>
                        <td className="py-3 px-4 font-mono tabular-nums text-slate-600">
                          {tutor.activeStudents}
                        </td>
                        <td className="py-3 px-4 text-right font-mono font-bold text-[#14213D] tabular-nums">
                          ${tutor.hourlyRate}/hr
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            3. PAYOUTS (Strictly ABA Bank & Wing Money)
           ======================================================== */}
        {activeTab === 'payouts' && (
          <div className="space-y-6">
            <div>
              <h1 className="font-display text-2xl font-extrabold text-[#14213D]">
                Tutor Payout Requests (ABA / Wing)
              </h1>
              <p className="text-xs text-slate-600 mt-1">
                Verify and settle university tutor withdrawals via ABA Bank or Wing Money.
              </p>
            </div>

            <div className="space-y-3">
              {payouts.map((p) => (
                <div
                  key={p.id}
                  className="bg-white border border-slate-200/90 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-[#2445C8]/10 text-[#2445C8] flex items-center justify-center shrink-0">
                      {p.method === 'ABA Bank' ? (
                        <Building2 className="w-5 h-5" />
                      ) : (
                        <Smartphone className="w-5 h-5 text-[#F2A531]" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#14213D] text-sm">{p.tutor_name}</span>
                        <span className="text-[#2445C8] font-mono font-black text-sm tabular-nums">
                          ${p.amount.toFixed(2)} USD
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5 font-mono">
                        {p.method} · {p.account_details}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[11px] text-slate-400 font-mono">{p.requested_at}</span>
                    {p.status === 'pending' ? (
                      <button
                        onClick={() => handleApprovePayout(p.id)}
                        className="px-4 py-2 rounded-xl bg-[#2445C8] hover:bg-[#1c37a4] text-white font-bold text-xs cursor-pointer"
                      >
                        Approve & Mark Paid
                      </button>
                    ) : (
                      <span className="px-3 py-1 rounded-full bg-[#2445C8]/10 text-[#2445C8] font-bold text-xs">
                        Paid
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================
            4. TRANSLATION COVERAGE (EN / ខ្មែរ + Native Review Flag)
           ======================================================== */}
        {activeTab === 'translations' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h1 className="font-display text-2xl font-extrabold text-[#14213D]">
                  Translation Coverage (EN / ខ្មែរ)
                </h1>
                <p className="text-xs text-slate-600 mt-1">
                  Track bilingual key coverage and coordinate native-speaker review of Khmer UI copy.
                </p>
              </div>
              <span className="self-start sm:self-auto px-3 py-1.5 rounded-xl bg-[#F2A531]/20 border border-[#F2A531] text-[#14213D] text-xs font-bold">
                Khmer copy needs native-speaker review
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white border border-slate-200 rounded-2xl p-4">
                <div className="text-xs text-slate-500 font-semibold">Total UI Keys</div>
                <div className="text-2xl font-black font-mono text-[#14213D] mt-1 tabular-nums">
                  {totalKeysAll}
                </div>
                <div className="text-[11px] text-[#2445C8] font-semibold mt-0.5">
                  100% English baseline
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-4">
                <div className="text-xs text-slate-500 font-semibold">Khmer Draft Coverage</div>
                <div className="text-2xl font-black font-mono text-[#2445C8] mt-1 tabular-nums">
                  {Math.round((translatedKeysAll / totalKeysAll) * 100)}% ({translatedKeysAll}/{totalKeysAll})
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">Kantumruy Pro script enabled</div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-4">
                <div className="text-xs text-slate-500 font-semibold">Native-Speaker Sign-off</div>
                <div className="text-2xl font-black font-mono text-[#14213D] mt-1 tabular-nums">
                  {reviewedNamespacesCount} / {namespaces.length}
                </div>
                <div className="text-[11px] text-amber-700 font-semibold mt-0.5">
                  Namespaces verified by native reviewer
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              {/* Namespace List */}
              <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-4 space-y-2">
                <h3 className="font-display font-bold text-sm text-[#14213D] pb-2 border-b border-slate-100">
                  UI Namespaces
                </h3>
                {namespaces.map((ns) => (
                  <button
                    key={ns.id}
                    onClick={() => setSelectedNsId(ns.id)}
                    className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer ${
                      selectedNsId === ns.id
                        ? 'bg-[#2445C8]/8 border-[#2445C8]'
                        : 'bg-[#F7F6F2] border-slate-200/70 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-xs text-[#14213D]">{ns.name}</span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          ns.reviewStatus === 'Reviewed'
                            ? 'bg-[#2445C8]/15 text-[#2445C8]'
                            : 'bg-[#F2A531]/25 text-[#14213D]'
                        }`}
                      >
                        {ns.reviewStatus}
                      </span>
                    </div>
                    <div className="text-[11px] font-mono text-slate-500 mt-1">
                      {ns.translatedKeys}/{ns.totalKeys} keys translated
                    </div>
                  </button>
                ))}
              </div>

              {/* Phrase Review Inspector */}
              <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="font-display font-bold text-base text-[#14213D]">
                      {selectedNamespace.name}
                    </h3>
                    <p className="text-xs text-slate-500">
                      Click toggle once a native Khmer speaker approves natural phrasing.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {selectedNamespace.samples.map((sample) => (
                    <div
                      key={sample.key}
                      className="p-3.5 rounded-xl bg-[#F7F6F2] border border-slate-200/80 space-y-2"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <code className="text-[11px] font-mono text-[#2445C8] font-bold">
                          {sample.key}
                        </code>
                        <button
                          type="button"
                          onClick={() =>
                            handleToggleSampleReviewed(selectedNamespace.id, sample.key)
                          }
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold cursor-pointer ${
                            sample.reviewed
                              ? 'bg-[#2445C8] text-white'
                              : 'bg-[#F2A531]/30 text-[#14213D] border border-[#F2A531]'
                          }`}
                        >
                          {sample.reviewed ? 'Native Reviewed' : 'Needs Native Review'}
                        </button>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                          <div className="text-[10px] uppercase font-bold text-slate-400 mb-0.5">
                            EN
                          </div>
                          <div className="text-[#14213D] font-medium">{sample.en}</div>
                        </div>
                        <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                          <div className="text-[10px] uppercase font-bold text-slate-400 mb-0.5">
                            ខ្មែរ (Draft)
                          </div>
                          <div className="text-[#14213D] font-medium">{sample.km}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            5. PILOT TEST CENTER
           ======================================================== */}
        {activeTab === 'pilot' && (
          <div className="bg-slate-900 rounded-3xl p-4 sm:p-6 text-slate-100">
            <AdminPilotDashboard />
          </div>
        )}

        {/* ========================================================
            6. PLATFORM OVERVIEW METRICS
           ======================================================== */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div>
              <h1 className="font-display text-2xl font-extrabold text-[#14213D]">
                Platform Health & Metrics
              </h1>
              <p className="text-xs text-slate-600 mt-1">
                Operational summary across learners, verified tutors, and escrow volume.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white border border-slate-200 rounded-2xl p-5">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Total Users</span>
                  <Users className="w-4 h-4 text-[#2445C8]" />
                </div>
                <div className="text-2xl font-black font-mono text-[#14213D] mt-2 tabular-nums">
                  1,248
                </div>
                <div className="text-[11px] text-[#2445C8] mt-1 flex items-center gap-1 font-semibold">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>+14.2% this month</span>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-5">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Verified Tutors</span>
                  <GraduationCap className="w-4 h-4 text-[#F2A531]" />
                </div>
                <div className="text-2xl font-black font-mono text-[#14213D] mt-2 tabular-nums">
                  84
                </div>
                <div className="text-[11px] text-amber-700 font-semibold mt-1">
                  {pendingTutors.length} pending approval
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-5">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Monthly Lessons</span>
                  <Calendar className="w-4 h-4 text-[#2445C8]" />
                </div>
                <div className="text-2xl font-black font-mono text-[#14213D] mt-2 tabular-nums">
                  612
                </div>
                <div className="text-[11px] text-slate-600 mt-1">98.4% completion rate</div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-5">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Platform GMV</span>
                  <DollarSign className="w-4 h-4 text-[#2445C8]" />
                </div>
                <div className="text-2xl font-black font-mono text-[#14213D] mt-2 tabular-nums">
                  $3,840.00
                </div>
                <div className="text-[11px] text-slate-500 mt-1">ABA Pay / KHQR / Card</div>
              </div>
            </div>

            {pendingTutors.length > 0 && (
              <div className="p-4 rounded-2xl bg-[#F2A531]/15 border border-[#F2A531] flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-[#14213D] shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-[#14213D]">
                      {pendingTutors.length} Tutor Applications Waiting Verification
                    </div>
                    <div className="text-[11px] text-slate-700">
                      Student IDs and voice notes are ready for inspection.
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab('tutors')}
                  className="px-4 py-2 rounded-xl bg-[#14213D] text-white font-bold text-xs cursor-pointer shrink-0"
                >
                  Open Approvals Queue
                </button>
              </div>
            )}
          </div>
        )}

        {/* ========================================================
            7. USERS MANAGEMENT
           ======================================================== */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="font-display text-2xl font-extrabold text-[#14213D]">
                  User Accounts & Roles
                </h1>
                <p className="text-xs text-slate-600 mt-1">
                  Manage learners, tutors, and platform administrators.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search name or email..."
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    className="pl-9 pr-4 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-[#14213D] focus:outline-hidden focus:border-[#2445C8]"
                  />
                </div>

                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-[#14213D] focus:outline-hidden"
                >
                  <option value="ALL">All Roles</option>
                  <option value="STUDENT">Students</option>
                  <option value="TUTOR">Tutors</option>
                  <option value="ADMIN">Admins</option>
                </select>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F7F6F2] text-slate-500 border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4 font-bold">User</th>
                      <th className="py-3 px-4 font-bold">Role(s)</th>
                      <th className="py-3 px-4 font-bold">Status</th>
                      <th className="py-3 px-4 font-bold">Registered</th>
                      <th className="py-3 px-4 font-bold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredUsers.map((u) => (
                      <tr key={u.id} className="hover:bg-[#F7F6F2]/50">
                        <td className="py-3 px-4">
                          <div className="font-bold text-[#14213D]">{u.name}</div>
                          <div className="text-[11px] text-slate-500">{u.email}</div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#2445C8]/10 text-[#2445C8]">
                            {u.roles}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              u.status === 'active' ? 'text-emerald-700' : 'text-rose-600'
                            }`}
                          >
                            {u.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-slate-500 font-mono text-[11px]">
                          {u.created_at}
                        </td>
                        <td className="py-3 px-4 text-right">
                          {u.id !== 1 && (
                            <button
                              onClick={() => handleToggleUserStatus(u.id)}
                              className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-[#F7F6F2] hover:bg-slate-200 text-[#14213D] cursor-pointer"
                            >
                              {u.status === 'active' ? 'Suspend' : 'Activate'}
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            8. AUDIT TRAIL
           ======================================================== */}
        {activeTab === 'audit' && (
          <div className="space-y-6">
            <div>
              <h1 className="font-display text-2xl font-extrabold text-[#14213D]">
                Security & Audit Trail
              </h1>
              <p className="text-xs text-slate-600 mt-1">
                Chronological record of admin approvals, payouts, and role updates.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 font-mono text-xs text-slate-700">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span>[2026-11-06 17:40] ADMIN_LOGIN · admin@khmertutors.com · Phnom Penh</span>
                <span className="text-[#2445C8] font-bold">SUCCESS</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span>[2026-11-06 14:22] TUTOR_APPLICATION · Visal Rath (NUM) · Student ID + Voice Note</span>
                <span className="text-amber-700 font-bold">PENDING_REVIEW</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span>[2026-11-04 11:15] PAYOUT_DISPATCHED · Chamroeun Thearith · $85.00 via Wing Money</span>
                <span className="text-[#2445C8] font-bold">CONFIRMED</span>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Reject Reason Modal */}
      {rejectingTutorId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#14213D]/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <h3 className="font-display font-bold text-[#14213D] text-base">
              Reject Tutor Application
            </h3>
            <p className="text-xs text-slate-600">
              Provide actionable feedback so the student can re-upload their ID or voice note.
            </p>
            <textarea
              rows={3}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="w-full px-3 py-2 bg-[#F7F6F2] border border-slate-200 rounded-xl text-xs text-[#14213D] focus:outline-hidden focus:border-rose-500"
            />
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setRejectingTutorId(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-[#14213D] cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleRejectTutor(rejectingTutorId)}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs cursor-pointer"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
