import React, { useState, useEffect, useMemo } from 'react';
import { Tutor, Booking } from '../data/tutorsData';
import {
  X,
  Globe,
  CreditCard,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  ExternalLink,
  QrCode,
  FlaskConical,
  Coins,
  Gift,
  Smartphone,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { analytics } from '../services/analytics';
import { nextDateForWeekday, formatShortDate, formatDayAndDate } from '../utils/dates';

interface BookingModalProps {
  tutor: Tutor | null;
  isOpen: boolean;
  onClose: () => void;
  onBookingConfirmed: (newBooking: Booking) => void;
  onTriggerSurvey?: () => void;
  preselectedDay?: string | null;
  preselectedSlot?: string | null;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  tutor,
  isOpen,
  onClose,
  onBookingConfirmed,
  onTriggerSurvey,
  preselectedDay,
  preselectedSlot,
}) => {
  const { user, updateWalletBalance, showToast } = useAuth();
  const { t } = useLanguage();

  const [lessonType, setLessonType] = useState<'Trial Lesson (30 min)' | 'Full Lesson (60 min)'>(
    'Trial Lesson (30 min)'
  );
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState<string>('10:00 AM');
  const [selectedTimezone, setSelectedTimezone] = useState('ICT (Phnom Penh, UTC+7)');
  const [paymentMethod, setPaymentMethod] = useState<
    'ABA Pay' | 'KHQR (Bakong)' | 'Credit / Debit Card'
  >('ABA Pay');
  const [step, setStep] = useState<'select' | 'payment' | 'confirmed'>('select');
  const [isProcessing, setIsProcessing] = useState(false);

  // The tutor's weekly slots, mapped to real upcoming dates and sorted soonest first.
  const days = useMemo(
    () =>
      (tutor?.availability ?? [])
        .map((a) => ({ ...a, date: nextDateForWeekday(a.day) }))
        .sort((x, y) => x.date.getTime() - y.date.getTime()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tutor, isOpen]
  );

  useEffect(() => {
    if (!tutor || !isOpen) return;
    let dayIdx = 0;
    if (preselectedDay) {
      const foundIdx = days.findIndex((a) => a.day === preselectedDay);
      if (foundIdx >= 0) dayIdx = foundIdx;
    }
    setSelectedDayIndex(dayIdx);
    const availSlots = days[dayIdx]?.slots || [];
    if (preselectedSlot && availSlots.includes(preselectedSlot)) {
      setSelectedSlot(preselectedSlot);
    } else {
      setSelectedSlot(availSlots[0] || '10:00 AM');
    }
    setStep('select');
  }, [tutor, isOpen, preselectedDay, preselectedSlot]);

  if (!isOpen || !tutor) return null;

  const price = lessonType === 'Trial Lesson (30 min)' ? tutor.trialPrice : tutor.hourlyRate;
  const currentDay = days[selectedDayIndex] || days[0];
  const studentBalance = user?.studentProfile?.wallet_balance ?? 10.0;

  const handleProceedToPayment = () => {
    analytics.track('booking_started', {
      tutorId: tutor.id,
      tutorName: tutor.name,
      lessonType,
      price,
    });
    setStep('payment');
  };

  const handleGrantPilotCredit = () => {
    updateWalletBalance(10);
    if (showToast) showToast('Granted +$10.00 pilot test credit to your student balance.');
  };

  const handleConfirmBooking = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const newBooking: Booking = {
        id: `bkg-${Date.now().toString().slice(-4)}`,
        tutorId: tutor.id,
        tutorName: tutor.name,
        tutorUniversity: tutor.university,
        lessonType,
        date: formatDayAndDate(currentDay.date),
        timeSlot: `${selectedSlot} (${selectedTimezone.split(' ')[0]})`,
        price,
        paymentMethod,
        meetingLink: `https://meet.google.com/kto-${tutor.name.toLowerCase().replace(/\s+/g, '-')}`,
        status: 'Upcoming',
      };

      analytics.track('payment_success', {
        tutorId: tutor.id,
        bookingId: newBooking.id,
        lessonType,
        price,
        paymentMethod,
      });

      onBookingConfirmed(newBooking);
      setStep('confirmed');

      if (onTriggerSurvey) {
        setTimeout(() => {
          onTriggerSurvey();
        }, 1200);
      }
    }, 800);
  };

  const handleResetAndClose = () => {
    setStep('select');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#172033]/60 backdrop-blur-sm overflow-y-auto">
      <div
        className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-[#F3F5F9]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#172033] text-white font-bold text-sm flex items-center justify-center shadow-sm">
              {tutor.initials}
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-[#172033] leading-tight">
                {t('booking.title')} {tutor.name}
              </h3>
              <p className="text-xs text-slate-500">{tutor.university}</p>
            </div>
          </div>

          <button
            onClick={handleResetAndClose}
            className="p-1.5 text-slate-400 hover:text-[#172033] hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {step === 'select' && (
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-[#172033] uppercase tracking-wider mb-2">
                  1. Choose Lesson Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setLessonType('Trial Lesson (30 min)')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      lessonType === 'Trial Lesson (30 min)'
                        ? 'border-[#2445C8] bg-[#2445C8]/6 ring-2 ring-[#2445C8]/15'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#172033]">Trial Lesson</span>
                      <span className="text-xs font-black font-mono text-[#2445C8]">
                        ${tutor.trialPrice}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">30 minutes · Introductory</div>
                  </button>

                  <button
                    onClick={() => setLessonType('Full Lesson (60 min)')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      lessonType === 'Full Lesson (60 min)'
                        ? 'border-[#2445C8] bg-[#2445C8]/6 ring-2 ring-[#2445C8]/15'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#172033]">Standard Lesson</span>
                      <span className="text-xs font-black font-mono text-[#172033]">
                        ${tutor.hourlyRate}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">60 minutes · Full practice</div>
                  </button>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-[#172033] uppercase tracking-wider">
                    2. Select Day
                  </label>
                  <span className="text-xs text-slate-500">Phnom Penh time</span>
                </div>
                <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                  {days.map((avail, idx) => (
                    <button
                      key={avail.day}
                      onClick={() => {
                        setSelectedDayIndex(idx);
                        setSelectedSlot(avail.slots[0] || '10:00 AM');
                      }}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all cursor-pointer ${
                        selectedDayIndex === idx
                          ? 'bg-[#172033] text-white shadow-sm'
                          : 'bg-[#F3F5F9] text-[#172033] hover:bg-slate-200'
                      }`}
                    >
                      <div>{avail.day}</div>
                      <div className="text-[10px] opacity-75 font-normal font-mono">
                        {formatShortDate(avail.date)}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#172033] uppercase tracking-wider mb-2">
                  3. Select Time Slot
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {currentDay?.slots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setSelectedSlot(slot)}
                      className={`py-2 px-3 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                        selectedSlot === slot
                          ? 'bg-[#2445C8] text-white font-bold shadow-sm'
                          : 'bg-[#F3F5F9] border border-slate-200 text-[#172033] hover:border-[#2445C8]/40'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-[#F3F5F9] border border-slate-200 rounded-xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-slate-600">
                  <Globe className="w-4 h-4 text-[#2445C8]" />
                  <span>Timezone:</span>
                </div>
                <select
                  value={selectedTimezone}
                  onChange={(e) => setSelectedTimezone(e.target.value)}
                  className="bg-white border border-slate-200 rounded-md px-2 py-1 text-xs text-[#172033] font-medium focus:outline-none focus:border-[#2445C8]"
                >
                  <option value="ICT (Phnom Penh, UTC+7)">Phnom Penh (ICT, UTC+7)</option>
                  <option value="EDT (New York, UTC-4)">New York (EDT, UTC-4)</option>
                  <option value="BST (London, UTC+1)">London (BST, UTC+1)</option>
                  <option value="CEST (Paris, UTC+2)">Paris (CEST, UTC+2)</option>
                  <option value="JST (Tokyo, UTC+9)">Tokyo (JST, UTC+9)</option>
                  <option value="AEST (Sydney, UTC+10)">Sydney (AEST, UTC+10)</option>
                </select>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-500">Total Price:</div>
                  <div className="text-xl font-bold font-mono tabular-nums text-[#172033]">
                    ${price}.00
                  </div>
                </div>
                <button
                  onClick={handleProceedToPayment}
                  className="py-2.5 px-6 bg-[#2445C8] hover:bg-[#1c37a4] text-white font-bold text-xs rounded-xl shadow transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {step === 'payment' && (
            <div className="space-y-5">
              <div className="bg-[#F3F5F9] border border-slate-200 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Tutor:</span>
                  <span className="font-bold text-[#172033]">{tutor.name}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Lesson:</span>
                  <span className="font-medium text-[#172033]">{lessonType}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Date & Slot:</span>
                  <span className="font-mono text-[#172033]">
                    {currentDay.day}, {selectedSlot}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm pt-2 border-t border-slate-200">
                  <span className="font-bold text-[#172033]">Total Payable:</span>
                  <span className="text-base font-black font-mono tabular-nums text-[#2445C8]">
                    ${price}.00 USD
                  </span>
                </div>
              </div>

              <div className="p-3 bg-[#F2B23A]/15 border border-[#F2B23A]/40 rounded-2xl flex items-center gap-2.5 text-xs text-[#172033]">
                <FlaskConical className="w-5 h-5 text-[#172033] shrink-0" />
                <div>
                  <div className="font-bold flex items-center gap-1.5">
                    <span>Pilot Sandbox Test Mode</span>
                    <span className="text-[10px] bg-[#F2B23A] text-[#172033] px-1.5 py-0.5 rounded uppercase font-mono font-bold">
                      No Real Money
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-700">
                    Test checkout only. Simulates ABA Pay, KHQR (Bakong), and Card settlement.
                  </div>
                </div>
              </div>

              <div className="bg-[#2445C8]/6 border border-[#2445C8]/20 rounded-xl p-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Coins className="w-4 h-4 text-[#2445C8] shrink-0" />
                  <div>
                    <div className="font-bold text-[#172033]">
                      Student Pilot Credit: ${studentBalance.toFixed(2)} USD
                    </div>
                    <div className="text-[10px] text-slate-600">
                      Usable for trial or standard lessons
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleGrantPilotCredit}
                  className="px-2.5 py-1 bg-white hover:bg-slate-50 text-[#2445C8] border border-[#2445C8]/30 rounded-lg font-bold text-[11px] cursor-pointer flex items-center gap-1"
                >
                  <Gift className="w-3 h-3 text-[#F2B23A]" />
                  <span>+ $10 Free Credit</span>
                </button>
              </div>

              {/* Payment Methods: Strictly ABA Pay, KHQR, Card */}
              <div>
                <label className="block text-xs font-bold text-[#172033] uppercase tracking-wider mb-2">
                  {t('booking.payMethods')}
                </label>
                <div className="space-y-2">
                  {[
                    {
                      id: 'ABA Pay',
                      label: t('booking.abaPay'),
                      note: 'Direct ABA Mobile app confirmation · Instant escrow',
                      icon: Smartphone,
                    },
                    {
                      id: 'KHQR (Bakong)',
                      label: t('booking.khqr'),
                      note: 'Scan universal National Bank of Cambodia KHQR',
                      icon: QrCode,
                    },
                    {
                      id: 'Credit / Debit Card',
                      label: t('booking.card'),
                      note: 'Visa / Mastercard international card checkout',
                      icon: CreditCard,
                    },
                  ].map((m) => {
                    const Icon = m.icon;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setPaymentMethod(m.id as any)}
                        className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                          paymentMethod === m.id
                            ? 'border-[#2445C8] bg-[#2445C8]/6 ring-2 ring-[#2445C8]/15'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-[#F3F5F9] flex items-center justify-center text-[#2445C8]">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-[#172033]">{m.label}</div>
                            <div className="text-[11px] text-slate-500">{m.note}</div>
                          </div>
                        </div>
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            paymentMethod === m.id
                              ? 'border-[#2445C8] bg-[#2445C8] text-white'
                              : 'border-slate-300'
                          }`}
                        >
                          {paymentMethod === m.id && (
                            <div className="w-1.5 h-1.5 bg-white rounded-full" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setStep('select')}
                  className="text-xs text-slate-600 hover:text-[#172033] font-medium cursor-pointer"
                >
                  Back to schedule
                </button>
                <button
                  onClick={handleConfirmBooking}
                  disabled={isProcessing}
                  className="py-2.5 px-6 bg-[#2445C8] hover:bg-[#1c37a4] text-white font-bold text-xs rounded-xl shadow transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  {isProcessing ? (
                    <span>Clearing Payment...</span>
                  ) : (
                    <>
                      <span>Pay & Confirm ${price}.00</span>
                      <ShieldCheck className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {step === 'confirmed' && (
            <div className="py-6 text-center space-y-4">
              <div className="w-16 h-16 bg-[#2445C8]/10 text-[#2445C8] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-display text-xl font-bold text-[#172033]">
                Lesson Confirmed with {tutor.name}
              </h4>
              <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                Your <strong>{lessonType}</strong> is booked for{' '}
                <strong>
                  {currentDay.day}, {selectedSlot}
                </strong>
                . Receipt and meeting link are saved to My Lessons.
              </p>

              <div className="p-4 bg-[#F3F5F9] border border-slate-200 rounded-xl text-left text-xs space-y-2 max-w-md mx-auto">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Classroom Link:</span>
                  <a
                    href={`https://meet.google.com/kto-${tutor.name.toLowerCase().replace(/\s+/g, '-')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#2445C8] font-mono font-semibold hover:underline flex items-center gap-1"
                  >
                    <span>meet.google.com/kto-live</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Payment Rail:</span>
                  <span className="font-mono text-[#172033] font-bold">{paymentMethod}</span>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-center gap-3">
                <button
                  onClick={handleResetAndClose}
                  className="px-6 py-2.5 bg-[#172033] hover:bg-[#1f3157] text-white font-bold text-xs rounded-xl shadow transition-colors cursor-pointer"
                >
                  View In My Lessons
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
