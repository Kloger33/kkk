import React, { useState } from 'react';
import { 
  DollarSign, 
  Clock, 
  Calendar, 
  Star, 
  CheckCircle2, 
  AlertCircle, 
  ArrowUpRight, 
  Sparkles,
  QrCode,
  Building2,
  Check
} from 'lucide-react';

interface TutorDashboardViewProps {
  onBackToLearner: () => void;
}

export const TutorDashboardView: React.FC<TutorDashboardViewProps> = ({ onBackToLearner }) => {
  const [payoutRequested, setPayoutRequested] = useState(false);
  const [scheduleSlots, setScheduleSlots] = useState<{ [day: string]: string[] }>({
    Mon: ['08:00 AM', '10:00 AM', '02:00 PM', '04:00 PM'],
    Tue: ['09:00 AM', '11:00 AM', '03:00 PM'],
    Wed: ['08:00 AM', '10:00 AM', '01:00 PM', '04:00 PM'],
    Thu: ['10:00 AM', '02:00 PM', '04:00 PM'],
    Fri: ['09:00 AM', '01:00 PM', '03:00 PM'],
    Sat: ['08:00 AM', '10:00 AM', '01:00 PM', '03:00 PM'],
  });

  const toggleSlot = (day: string, slot: string) => {
    setScheduleSlots((prev) => {
      const current = prev[day] || [];
      const updated = current.includes(slot)
        ? current.filter((s) => s !== slot)
        : [...current, slot];
      return { ...prev, [day]: updated };
    });
  };

  const handleRequestPayout = () => {
    setPayoutRequested(true);
    setTimeout(() => {
      setPayoutRequested(false);
    }, 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
              Tutor Portal (Bopha Seng)
            </span>
            <span className="text-xs text-slate-400">·</span>
            <span className="text-xs text-slate-500 font-medium">Royal Univ. of Phnom Penh</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
            Tutor Earnings & Schedule Manager
          </h2>
        </div>

        <button
          onClick={onBackToLearner}
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl border border-slate-200 transition-colors self-start sm:self-auto"
        >
          Return to Learner View
        </button>
      </div>

      {/* Financial Overview Cards (ABA PayWay / Bakong Settlement) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-1">
          <span className="text-xs font-medium text-slate-500">Available Balance</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-teal-700">$148.00</span>
            <span className="text-xs text-slate-400 font-mono">≈ ៛609,760</span>
          </div>
          <div className="text-[11px] text-emerald-600 font-medium pt-1">
            Ready for instant ABA / Bakong transfer
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-1">
          <span className="text-xs font-medium text-slate-500">Hours Taught This Month</span>
          <div className="text-2xl font-bold font-mono text-slate-900">18.5 hrs</div>
          <div className="text-[11px] text-slate-500 pt-1">
            Flexible 1-hr slots between lectures
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-1">
          <span className="text-xs font-medium text-slate-500">Hourly Rate & Commission</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-slate-900">$8.00</span>
            <span className="text-xs text-slate-500">/hr</span>
          </div>
          <div className="text-[11px] text-slate-500 pt-1">
            Platform take-rate: 15% net protected
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-1">
          <span className="text-xs font-medium text-slate-500">Rating & Social Proof</span>
          <div className="flex items-center gap-1.5 text-2xl font-bold font-mono text-amber-500">
            <Star className="w-6 h-6 fill-amber-500" />
            <span>5.0</span>
          </div>
          <div className="text-[11px] text-slate-500 pt-1">
            48 verified student reviews
          </div>
        </div>

      </div>

      {/* Payout Mechanism Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-teal-600" />
            <h4 className="text-base font-bold text-slate-900">
              Cambodian Domestic Settlement Account
            </h4>
          </div>
          <p className="text-xs text-slate-500">
            Connected to <strong>ABA Bank PayWay & Bakong KHQR</strong> (Acct ending in <strong>*112</strong>). Minimal local clearing cost, zero foreign wire charges.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleRequestPayout}
            disabled={payoutRequested}
            className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {payoutRequested ? (
              <>
                <Check className="w-4 h-4 text-emerald-200" />
                <span>$148.00 Sent to ABA Bank!</span>
              </>
            ) : (
              <>
                <QrCode className="w-4 h-4" />
                <span>Withdraw $148.00 via ABA KHQR</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Weekly Micro-Tutoring Slot Scheduler */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h4 className="text-base font-bold text-slate-900">
              Manage Your 1-Hour Teaching Slots
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Tap any slot to open or close it based on your university class timetable.
            </p>
          </div>
          <span className="text-xs font-mono text-teal-700 font-semibold bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200">
            Temporal Elasticity Active
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => {
            const allTimes = ['08:00 AM', '10:00 AM', '01:00 PM', '03:00 PM', '05:00 PM'];
            const activeSlots = scheduleSlots[day] || [];

            return (
              <div key={day} className="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-2">
                <div className="text-xs font-bold text-slate-900 border-b border-slate-200 pb-1">
                  {day}
                </div>
                <div className="space-y-1.5">
                  {allTimes.map((time) => {
                    const isOpen = activeSlots.includes(time);
                    return (
                      <button
                        key={time}
                        onClick={() => toggleSlot(day, time)}
                        className={`w-full text-center py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                          isOpen
                            ? 'bg-teal-600 text-white font-bold shadow-xs'
                            : 'bg-white text-slate-400 border border-slate-200 hover:text-slate-700'
                        }`}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
