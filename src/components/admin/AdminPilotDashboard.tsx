import React, { useState } from 'react';
import { 
  FlaskConical, 
  Users, 
  Ticket, 
  MessageSquare, 
  ShieldCheck, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  Star, 
  Smile, 
  DollarSign, 
  Sparkles, 
  Search, 
  Filter, 
  RefreshCw, 
  Copy, 
  Plus, 
  Check, 
  X, 
  Eye, 
  Send,
  Calendar,
  Gift,
  ArrowRight,
  Monitor
} from 'lucide-react';
import { pilotStore, InviteCode, FeedbackReport, SurveyResponse } from '../../services/pilotStore';
import { analytics } from '../../services/analytics';
import { useAuth } from '../../context/AuthContext';

export const AdminPilotDashboard: React.FC = () => {
  const { showToast, updateWalletBalance } = useAuth();

  // Sub-tab selection within Pilot Dashboard
  const [pilotSubTab, setPilotSubTab] = useState<'kpis' | 'funnel' | 'feedback' | 'invites' | 'users'>('kpis');

  // Live state from pilot store
  const [inviteCodes, setInviteCodes] = useState<InviteCode[]>(() => pilotStore.getInviteCodes());
  const [feedbackList, setFeedbackList] = useState<FeedbackReport[]>(() => pilotStore.getFeedback());
  const [surveys, setSurveys] = useState<SurveyResponse[]>(() => pilotStore.getSurveys());
  const funnelStats = analytics.getFunnelStats();

  // Feedback filtering
  const [feedbackTypeFilter, setFeedbackTypeFilter] = useState<string>('ALL');
  const [feedbackStatusFilter, setFeedbackStatusFilter] = useState<string>('ALL');
  const [selectedFeedback, setSelectedFeedback] = useState<FeedbackReport | null>(null);
  const [adminNoteInput, setAdminNoteInput] = useState('');

  // Invite code creation modal
  const [isCreatingInvite, setIsCreatingInvite] = useState(false);
  const [newCodeName, setNewCodeName] = useState('');
  const [newCodeRole, setNewCodeRole] = useState<'STUDENT' | 'TUTOR' | 'ANY'>('STUDENT');
  const [newCodeMaxUses, setNewCodeMaxUses] = useState(15);
  const [newCodeNotes, setNewCodeNotes] = useState('');

  // Broadcast modal
  const [isBroadcastOpen, setIsBroadcastOpen] = useState(false);
  const [broadcastMessage, setBroadcastMessage] = useState('');

  const refreshState = () => {
    setInviteCodes([...pilotStore.getInviteCodes()]);
    setFeedbackList([...pilotStore.getFeedback()]);
    setSurveys([...pilotStore.getSurveys()]);
  };

  const handleToggleInviteCode = (code: string) => {
    pilotStore.toggleInviteCode(code);
    refreshState();
    if (showToast) showToast(`Invite code ${code} toggled`);
  };

  const handleCreateInviteCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCodeName.trim()) return;

    pilotStore.addInviteCode({
      code: newCodeName.trim().toUpperCase(),
      targetRole: newCodeRole,
      maxUses: Number(newCodeMaxUses) || 10,
      isActive: true,
      notes: newCodeNotes.trim() || 'Pilot tester cohort',
    });

    setIsCreatingInvite(false);
    setNewCodeName('');
    setNewCodeNotes('');
    refreshState();
    if (showToast) showToast(`Created pilot invite code: ${newCodeName.toUpperCase()}`);
  };

  const handleUpdateFeedbackStatus = (id: string, status: FeedbackReport['status']) => {
    pilotStore.updateFeedbackStatus(id, status, adminNoteInput.trim() || undefined);
    refreshState();
    if (selectedFeedback && selectedFeedback.id === id) {
      setSelectedFeedback({ ...selectedFeedback, status, adminNotes: adminNoteInput.trim() });
    }
    if (showToast) showToast(`Feedback status updated to ${status.toUpperCase()}`);
  };

  const handleRefundSimulation = (studentName: string, amount: number) => {
    if (showToast) showToast(`1-Click Refund: $${amount}.00 refunded to ${studentName} via ABA PayWay escrow.`);
  };

  const handleGrantStudentCredit = (studentName: string) => {
    updateWalletBalance(10);
    if (showToast) showToast(`Granted $10.00 complimentary pilot credit to ${studentName}.`);
  };

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastMessage.trim()) return;
    setIsBroadcastOpen(false);
    setBroadcastMessage('');
    if (showToast) showToast('Broadcast notification sent to all 28 registered pilot users via Telegram & Email.');
  };

  // Filtered feedback
  const filteredFeedback = feedbackList.filter((fb) => {
    const matchType = feedbackTypeFilter === 'ALL' || fb.type === feedbackTypeFilter;
    const matchStatus = feedbackStatusFilter === 'ALL' || fb.status === feedbackStatusFilter;
    return matchType && matchStatus;
  });

  const openBugsCount = feedbackList.filter((f) => f.type === 'bug' && f.status !== 'fixed' && f.status !== 'wont_fix').length;

  return (
    <div className="space-y-6">
      
      {/* Pilot Header Banner */}
      <div className="bg-gradient-to-r from-amber-500/20 via-slate-800 to-teal-900/40 border border-amber-500/30 rounded-3xl p-5 sm:p-6 backdrop-blur-md flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-300 shrink-0 shadow-inner">
            <FlaskConical className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                KhmerTutors Online · Pilot Test Control Center
              </h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 font-mono">
                Phnom Penh Pilot
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Cohort: 20–30 Expat Students · 8–10 University Tutors (RUPP, ITC, PUC) · 2 Admins · Nov 10 – Dec 08, 2026
            </p>
          </div>
        </div>

        {/* Top Quick Actions */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => setIsCreatingInvite(true)}
            className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
            <span>New Invite Code</span>
          </button>
          <button
            onClick={() => setIsBroadcastOpen(true)}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-xl border border-slate-700 shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5 text-teal-400" />
            <span>Broadcast Notice</span>
          </button>
        </div>
      </div>

      {/* Pilot Sub-Navigation */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs font-bold border-b border-slate-800">
        {[
          { id: 'kpis', label: 'Pilot KPIs & Success Scorecard', icon: TrendingUp },
          { id: 'funnel', label: 'Student Funnel Drop-off', icon: ArrowRight },
          { id: 'feedback', label: `Feedback & Bugs (${feedbackList.length})`, icon: MessageSquare, badge: openBugsCount > 0 ? `${openBugsCount} open` : undefined },
          { id: 'invites', label: `Invite Codes (${inviteCodes.length})`, icon: Ticket },
          { id: 'users', label: 'Pilot Users & Credits', icon: Users },
        ].map((tab) => {
          const Icon = tab.icon;
          const active = pilotSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setPilotSubTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-t-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                active
                  ? 'bg-slate-800 text-teal-300 border-b-2 border-teal-400'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.badge && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-rose-500/20 text-rose-300 font-mono font-bold">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ========================================================
          SUB-TAB 1: PILOT KPIS & SUCCESS SCORECARD
         ======================================================== */}
      {pilotSubTab === 'kpis' && (
        <div className="space-y-6">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { label: 'Invited Users', val: '35', sub: '20 Students / 10 Tutors', color: 'text-sky-400' },
              { label: 'Activated Sign-Ups', val: '28', sub: '80.0% Activation rate', color: 'text-emerald-400' },
              { label: 'Trial Bookings', val: '24', sub: '92.3% of students booked', color: 'text-teal-400' },
              { label: 'Completed Lessons', val: '21', sub: '87.5% completion rate', color: 'text-purple-400' },
              { label: 'Avg Tutor Rating', val: '4.93', sub: 'Based on 19 reviews', color: 'text-amber-400' },
              { label: 'Pilot NPS', val: '+62', sub: 'Target ≥ +30 (Excellent)', color: 'text-rose-400' },
            ].map((kpi, i) => (
              <div key={i} className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-1">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{kpi.label}</div>
                <div className={`text-2xl font-black font-mono ${kpi.color}`}>{kpi.val}</div>
                <div className="text-[10px] text-slate-500">{kpi.sub}</div>
              </div>
            ))}
          </div>

          {/* Section 9 Success Criteria Scorecard */}
          <div className="bg-slate-950 border border-slate-800 rounded-3xl p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-white text-base">Pilot Success Criteria Scorecard (Section 9)</h3>
              </div>
              <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                7 of 7 Criteria Met / On Track ✓
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {[
                { 
                  rule: '≥ 60% of invited students sign up', 
                  target: '≥ 60%', 
                  actual: '74.3% (26 of 35)', 
                  status: 'PASS', 
                  notes: 'High conversion among BKK1 and Tonle Bassac expat referrals.' 
                },
                { 
                  rule: '≥ 50% of sign-ups book a trial', 
                  target: '≥ 50%', 
                  actual: '92.3% (24 of 26)', 
                  status: 'PASS', 
                  notes: 'Smooth $3–$4 trial pricing and instant Bakong KHQR removes friction.' 
                },
                { 
                  rule: '≥ 80% of booked lessons are completed (no-show < 15%)', 
                  target: '≥ 80% (no-show < 15%)', 
                  actual: '87.5% completed (no-show: 4.2%)', 
                  status: 'PASS', 
                  notes: '24h and 1h Google Meet reminders in GMT+7 prevent missed slots.' 
                },
                { 
                  rule: 'Average tutor rating ≥ 4.5', 
                  target: '≥ 4.5 / 5.0', 
                  actual: '4.93 / 5.0', 
                  status: 'PASS', 
                  notes: 'RUPP & ITC students verified for punctuality and patience.' 
                },
                { 
                  rule: '≥ 30% book a second lesson', 
                  target: '≥ 30%', 
                  actual: '38.1% (8 of 21 students)', 
                  status: 'PASS', 
                  notes: 'Starter curriculum modules give clear progression pathway.' 
                },
                { 
                  rule: 'Net Promoter Score (NPS) ≥ 30', 
                  target: '≥ +30', 
                  actual: '+62', 
                  status: 'PASS', 
                  notes: 'Expats appreciate direct support for Cambodian college students.' 
                },
                { 
                  rule: '0 critical bugs open at end of pilot', 
                  target: '0 Critical', 
                  actual: `${openBugsCount} open (0 critical blocker)`, 
                  status: 'PASS', 
                  notes: 'Responsive UI, trial prices, and dev switcher fixes deployed.' 
                },
              ].map((c, idx) => (
                <div key={idx} className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-3.5 space-y-1.5 flex flex-col justify-between">
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-bold text-slate-200">{c.rule}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {c.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-400 font-mono text-[11px]">
                    <div>Target: <strong className="text-slate-300">{c.target}</strong></div>
                    <div>·</div>
                    <div>Actual: <strong className="text-teal-300 font-bold">{c.actual}</strong></div>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-snug">{c.notes}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          SUB-TAB 2: FUNNEL DROP-OFF
         ======================================================== */}
      {pilotSubTab === 'funnel' && (
        <div className="bg-slate-950 border border-slate-800 rounded-3xl p-5 sm:p-6 space-y-5">
          <div>
            <h3 className="font-bold text-white text-base">End-to-End Pilot User Conversion Funnel</h3>
            <p className="text-xs text-slate-400">
              Visualizes conversion efficiency from landing page visit down to repeat bookings in Phnom Penh.
            </p>
          </div>

          <div className="space-y-3">
            {[
              { step: '1. Landing Page Visit', count: funnelStats.visit, pct: 100, desc: 'Unique visitors arriving via pilot links' },
              { step: '2. Invite Code Sign-Up', count: funnelStats.sign_up, pct: Math.round((funnelStats.sign_up / funnelStats.visit) * 100), desc: 'Entered valid pilot invite code' },
              { step: '3. Email Verified', count: funnelStats.email_verified, pct: Math.round((funnelStats.email_verified / funnelStats.visit) * 100), desc: 'Confirmed OTP or email token' },
              { step: '4. Goal Quiz Completed', count: funnelStats.goal_quiz_done, pct: Math.round((funnelStats.goal_quiz_done / funnelStats.visit) * 100), desc: 'Selected learning objective' },
              { step: '5. Tutor Profile Viewed', count: funnelStats.tutor_profile_viewed, pct: Math.round((funnelStats.tutor_profile_viewed / funnelStats.visit) * 100), desc: 'Explored university tutor credentials' },
              { step: '6. Booking Started', count: funnelStats.booking_started, pct: Math.round((funnelStats.booking_started / funnelStats.visit) * 100), desc: 'Selected calendar slot' },
              { step: '7. Payment Success', count: funnelStats.payment_success, pct: Math.round((funnelStats.payment_success / funnelStats.visit) * 100), desc: 'Sandbox Bakong / Stripe cleared' },
              { step: '8. Lesson Completed', count: funnelStats.lesson_completed, pct: Math.round((funnelStats.lesson_completed / funnelStats.visit) * 100), desc: 'Attended 1-on-1 Google Meet' },
              { step: '9. Review / Rating Left', count: funnelStats.review_left, pct: Math.round((funnelStats.review_left / funnelStats.visit) * 100), desc: 'Left feedback on tutor patience' },
              { step: '10. Second Booking Made', count: funnelStats.second_booking, pct: Math.round((funnelStats.second_booking / funnelStats.visit) * 100), desc: 'Retention milestone (≥30% target)' },
            ].map((f, i) => (
              <div key={i} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 font-semibold text-slate-200">
                    <span>{f.step}</span>
                    <span className="text-[10px] text-slate-500 hidden sm:inline">({f.desc})</span>
                  </div>
                  <div className="flex items-center gap-2 font-mono">
                    <span className="font-bold text-teal-400">{f.count} users</span>
                    <span className="text-slate-400 text-[11px]">({f.pct}%)</span>
                  </div>
                </div>
                <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                  <div 
                    className="h-full bg-gradient-to-r from-teal-500 to-amber-500 rounded-full transition-all duration-500"
                    style={{ width: `${Math.max(f.pct, 4)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================
          SUB-TAB 3: FEEDBACK & BUGS INBOX
         ======================================================== */}
      {pilotSubTab === 'feedback' && (
        <div className="space-y-4">
          {/* Filters Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-slate-400 font-semibold">Filter Type:</span>
              {['ALL', 'bug', 'idea', 'confusing', 'praise'].map((t) => (
                <button
                  key={t}
                  onClick={() => setFeedbackTypeFilter(t)}
                  className={`px-2.5 py-1 rounded-lg uppercase text-[11px] font-bold cursor-pointer transition-colors ${
                    feedbackTypeFilter === t
                      ? 'bg-teal-600 text-white'
                      : 'bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-semibold">Status:</span>
              <select
                value={feedbackStatusFilter}
                onChange={(e) => setFeedbackStatusFilter(e.target.value)}
                className="bg-slate-900 border border-slate-700 text-slate-200 rounded-lg px-2.5 py-1 text-xs cursor-pointer"
              >
                <option value="ALL">All Statuses</option>
                <option value="new">New</option>
                <option value="in_progress">In Progress</option>
                <option value="fixed">Fixed</option>
                <option value="wont_fix">Won't Fix</option>
              </select>
            </div>
          </div>

          {/* Feedback Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredFeedback.map((fb) => (
              <div 
                key={fb.id}
                onClick={() => {
                  setSelectedFeedback(fb);
                  setAdminNoteInput(fb.adminNotes || '');
                }}
                className={`bg-slate-950 border rounded-2xl p-4 space-y-3 cursor-pointer transition-all hover:border-teal-500/50 ${
                  selectedFeedback?.id === fb.id ? 'border-teal-500 ring-1 ring-teal-500' : 'border-slate-800'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase font-mono ${
                      fb.type === 'bug' ? 'bg-rose-500/20 text-rose-300' :
                      fb.type === 'idea' ? 'bg-blue-500/20 text-blue-300' :
                      fb.type === 'confusing' ? 'bg-amber-500/20 text-amber-300' :
                      'bg-emerald-500/20 text-emerald-300'
                    }`}>
                      {fb.type}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase font-mono ${
                      fb.status === 'fixed' ? 'bg-emerald-500/20 text-emerald-300' :
                      fb.status === 'in_progress' ? 'bg-amber-500/20 text-amber-300' :
                      'bg-slate-800 text-slate-300'
                    }`}>
                      {fb.status.replace('_', ' ')}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">{fb.createdAt}</span>
                </div>

                <h4 className="font-bold text-white text-sm">{fb.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{fb.message}</p>

                <div className="pt-2 border-t border-slate-900 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span>{fb.userRole} · {fb.userEmail || 'Anonymous'}</span>
                  <span>{fb.screenSize}</span>
                </div>

                {fb.adminNotes && (
                  <div className="p-2 bg-slate-900/80 rounded-xl text-[11px] text-teal-300 border border-teal-500/20">
                    <strong>Admin Note:</strong> {fb.adminNotes}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Feedback Detail / Action Drawer */}
          {selectedFeedback && (
            <div className="bg-slate-950 border border-teal-500/40 rounded-3xl p-5 space-y-4 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="font-bold text-white text-sm flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-teal-400" />
                  <span>Update Status for: {selectedFeedback.title}</span>
                </div>
                <button onClick={() => setSelectedFeedback(null)} className="text-slate-400 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-300">
                  Engineering Action & Response Note:
                </label>
                <input
                  type="text"
                  value={adminNoteInput}
                  onChange={(e) => setAdminNoteInput(e.target.value)}
                  placeholder="e.g. Patch merged in PreplyTutorCard.tsx, verified responsive on iPhone."
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-hidden focus:border-teal-500"
                />
              </div>

              <div className="flex items-center gap-2 pt-2 flex-wrap">
                <span className="text-xs text-slate-400 mr-2">Set Status:</span>
                {(['new', 'in_progress', 'fixed', 'wont_fix'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => handleUpdateFeedbackStatus(selectedFeedback.id, st)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase transition-all cursor-pointer ${
                      selectedFeedback.status === st
                        ? 'bg-teal-600 text-white shadow-xs'
                        : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-700'
                    }`}
                  >
                    {st.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================
          SUB-TAB 4: INVITE CODES MANAGER
         ======================================================== */}
      {pilotSubTab === 'invites' && (
        <div className="bg-slate-950 border border-slate-800 rounded-3xl p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 flex-wrap gap-2">
            <div>
              <h3 className="font-bold text-white text-base">Pilot Invite Codes (Invite-Only Access)</h3>
              <p className="text-xs text-slate-400">
                Create and manage codes for Phnom Penh expats and university tutors.
              </p>
            </div>
            <button
              onClick={() => setIsCreatingInvite(true)}
              className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
              <span>Create Code</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider">
                  <th className="py-2.5 px-3">Invite Code</th>
                  <th className="py-2.5 px-3">Target Role</th>
                  <th className="py-2.5 px-3">Redeemed / Max</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">Cohort Notes</th>
                  <th className="py-2.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {inviteCodes.map((c) => (
                  <tr key={c.code} className="hover:bg-slate-900/60">
                    <td className="py-3 px-3 font-bold text-amber-300 flex items-center gap-1.5">
                      <span>{c.code}</span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(`${window.location.origin}/join?code=${c.code}`);
                          if (showToast) showToast(`Copied invite link: /join?code=${c.code}`);
                        }}
                        className="text-slate-500 hover:text-white p-0.5 cursor-pointer"
                        title="Copy invite link"
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        c.targetRole === 'STUDENT' ? 'bg-sky-500/20 text-sky-300' :
                        c.targetRole === 'TUTOR' ? 'bg-purple-500/20 text-purple-300' :
                        'bg-teal-500/20 text-teal-300'
                      }`}>
                        {c.targetRole}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-200">
                      <strong>{c.usedCount}</strong> / {c.maxUses}
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        c.isActive ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                      }`}>
                        {c.isActive ? 'ACTIVE' : 'PAUSED'}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-400 font-sans text-xs">
                      {c.notes}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => handleToggleInviteCode(c.code)}
                        className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold font-sans cursor-pointer"
                      >
                        {c.isActive ? 'Pause' : 'Activate'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================
          SUB-TAB 5: PILOT USERS & FREE CREDITS
         ======================================================== */}
      {pilotSubTab === 'users' && (
        <div className="bg-slate-950 border border-slate-800 rounded-3xl p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 flex-wrap gap-2">
            <div>
              <h3 className="font-bold text-white text-base">Pilot Users & Escrow Credit Oversight</h3>
              <p className="text-xs text-slate-400">
                Manage test balances, grant free trial credits ($10), and issue 1-click refunds.
              </p>
            </div>
            <button
              onClick={() => handleGrantStudentCredit('All Student Cohort')}
              className="px-3 py-1.5 bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer"
            >
              <Gift className="w-3.5 h-3.5" />
              <span>Grant +$10 Credit to All</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            {[
              { name: 'Alex Morgan', role: 'STUDENT', email: 'alex@expatphnompenh.com', balance: 24.0, bookings: 3, lastActive: '10 min ago' },
              { name: 'Sarah Jenkins', role: 'STUDENT', email: 'sarah.ngo@phnompenh.org', balance: 14.0, bookings: 2, lastActive: '2 hours ago' },
              { name: 'Sreynoch Keo', role: 'TUTOR (RUPP)', email: 'sreynoch@khmertutors.com', balance: 84.0, bookings: 7, lastActive: '5 min ago' },
              { name: 'Chamroeun Thearith', role: 'TUTOR (ITC)', email: 'chamroeun@khmertutors.com', balance: 65.0, bookings: 5, lastActive: '1 hour ago' },
              { name: 'John Doe', role: 'STUDENT / TUTOR', email: 'john.dual@khmertutors.com', balance: 35.0, bookings: 2, lastActive: 'Yesterday' },
            ].map((usr, i) => (
              <div key={i} className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="font-bold text-white text-sm flex items-center gap-2">
                    <span>{usr.name}</span>
                    <span className="text-[10px] bg-slate-800 text-teal-300 font-mono px-1.5 py-0.2 rounded font-bold">
                      {usr.role}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400">{usr.email} · Last active: {usr.lastActive}</div>
                  <div className="text-[11px] text-slate-300 font-mono font-bold">
                    Balance: <span className="text-emerald-400">${usr.balance}.00</span> · {usr.bookings} lessons
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 shrink-0">
                  <button
                    onClick={() => handleGrantStudentCredit(usr.name)}
                    className="px-2.5 py-1 bg-teal-600/30 hover:bg-teal-600/50 text-teal-300 border border-teal-500/30 rounded-lg text-[10px] font-bold cursor-pointer"
                  >
                    + $10 Credit
                  </button>
                  <button
                    onClick={() => handleRefundSimulation(usr.name, 4.0)}
                    className="px-2.5 py-1 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 rounded-lg text-[10px] font-bold cursor-pointer"
                  >
                    1-Click Refund
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CREATE INVITE CODE MODAL */}
      {isCreatingInvite && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs font-sans">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full p-6 text-white space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-base text-white">Create New Pilot Invite Code</h3>
              <button onClick={() => setIsCreatingInvite(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateInviteCode} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Code Name (UPPERCASE)</label>
                <input
                  type="text"
                  required
                  value={newCodeName}
                  onChange={(e) => setNewCodeName(e.target.value.toUpperCase())}
                  placeholder="e.g. EXPATS-BKK1-2026"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl font-mono font-bold text-amber-300"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Target Role</label>
                <select
                  value={newCodeRole}
                  onChange={(e) => setNewCodeRole(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                >
                  <option value="STUDENT">Student Only</option>
                  <option value="TUTOR">Tutor Only</option>
                  <option value="ANY">Any Role (VIP)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Max Uses</label>
                <input
                  type="number"
                  min={1}
                  max={100}
                  value={newCodeMaxUses}
                  onChange={(e) => setNewCodeMaxUses(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl font-mono text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Notes / Description</label>
                <input
                  type="text"
                  value={newCodeNotes}
                  onChange={(e) => setNewCodeNotes(e.target.value)}
                  placeholder="e.g. Phnom Penh Canadian International School parents"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreatingInvite(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl"
                >
                  Create Code
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* BROADCAST MESSAGE MODAL */}
      {isBroadcastOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs font-sans">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full p-6 text-white space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-base text-white">Broadcast to All Pilot Users</h3>
              <button onClick={() => setIsBroadcastOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSendBroadcast} className="space-y-4 text-xs">
              <p className="text-slate-400">
                Dispatches a notification push and Telegram/Email update to all 28 registered students and tutors in Phnom Penh.
              </p>
              <textarea
                required
                rows={3}
                value={broadcastMessage}
                onChange={(e) => setBroadcastMessage(e.target.value)}
                placeholder="e.g. Soursdey! A reminder that weekend practice slots for Module 2 are now open. We have also added $10 trial credit."
                className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-hidden focus:border-teal-500 resize-none"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsBroadcastOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl"
                >
                  Send Broadcast
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
