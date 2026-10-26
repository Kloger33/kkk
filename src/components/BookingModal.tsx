import React, { useState } from 'react';
import { Tutor, Booking } from '../data/tutorsData';
import { 
  X, 
  Calendar, 
  Clock, 
  Globe, 
  CreditCard, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles,
  Zap,
  ArrowRight,
  ExternalLink,
  QrCode
} from 'lucide-react';

interface BookingModalProps {
  tutor: Tutor | null;
  isOpen: boolean;
  onClose: () => void;
  onBookingConfirmed: (newBooking: Booking) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  tutor,
  isOpen,
  onClose,
  onBookingConfirmed,
}) => {
  if (!isOpen || !tutor) return null;

  const [lessonType, setLessonType] = useState<'Trial Lesson (30 min)' | 'Full Lesson (60 min)'>('Trial Lesson (30 min)');
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState<string>(
    tutor.availability[0]?.slots[0] || '10:00 AM'
  );
  const [selectedTimezone, setSelectedTimezone] = useState('ICT (Phnom Penh, UTC+7)');
  const [paymentMethod, setPaymentMethod] = useState<'Credit Card (Stripe)' | 'ABA PayWay' | 'Bakong KHQR' | 'PayPal'>('Credit Card (Stripe)');
  const [step, setStep] = useState<'select' | 'payment' | 'confirmed'>('select');
  const [isProcessing, setIsProcessing] = useState(false);

  const price = lessonType === 'Trial Lesson (30 min)' ? tutor.trialPrice : tutor.hourlyRate;
  const currentDay = tutor.availability[selectedDayIndex] || tutor.availability[0];

  const handleProceedToPayment = () => {
    setStep('payment');
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
        date: `${currentDay.day}, Oct ${21 + selectedDayIndex}`,
        timeSlot: `${selectedSlot} (${selectedTimezone.split(' ')[0]})`,
        price,
        paymentMethod,
        meetingLink: `https://meet.google.com/kto-${tutor.name.toLowerCase().replace(/\s+/g, '-')}`,
        status: 'Upcoming',
      };
      onBookingConfirmed(newBooking);
      setStep('confirmed');
    }, 900);
  };

  const handleResetAndClose = () => {
    setStep('select');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full bg-gradient-to-tr ${tutor.avatarBg} text-white font-bold text-sm flex items-center justify-center shadow-sm`}>
              {tutor.initials}
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 leading-tight">
                Book with {tutor.name}
              </h3>
              <p className="text-xs text-slate-500">
                {tutor.university}
              </p>
            </div>
          </div>

          <button
            onClick={handleResetAndClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          
          {/* STEP 1: Select Lesson & Slot */}
          {step === 'select' && (
            <div className="space-y-5">
              
              {/* Lesson Type Choice */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  1. Choose Lesson Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setLessonType('Trial Lesson (30 min)')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      lessonType === 'Trial Lesson (30 min)'
                        ? 'border-teal-600 bg-teal-50/60 ring-2 ring-teal-500/20'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">Trial Lesson</span>
                      <span className="text-xs font-black font-mono text-teal-700">${tutor.trialPrice}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">30 minutes · 50% discount</div>
                    <div className="mt-1 text-[10px] text-emerald-700 font-medium">Recommended for 1st session</div>
                  </button>

                  <button
                    onClick={() => setLessonType('Full Lesson (60 min)')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      lessonType === 'Full Lesson (60 min)'
                        ? 'border-teal-600 bg-teal-50/60 ring-2 ring-teal-500/20'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">Standard Lesson</span>
                      <span className="text-xs font-black font-mono text-slate-900">${tutor.hourlyRate}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">60 minutes · Full module practice</div>
                    <div className="mt-1 text-[10px] text-slate-500">Regular tutoring slot</div>
                  </button>
                </div>
              </div>

              {/* Day Selector */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    2. Select Day
                  </label>
                  <span className="text-xs text-slate-500">
                    Phnom Penh time
                  </span>
                </div>
                <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                  {tutor.availability.map((avail, idx) => (
                    <button
                      key={avail.day}
                      onClick={() => {
                        setSelectedDayIndex(idx);
                        setSelectedSlot(avail.slots[0] || '10:00 AM');
                      }}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                        selectedDayIndex === idx
                          ? 'bg-slate-900 text-white shadow-sm'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      <div>{avail.day}</div>
                      <div className="text-[10px] opacity-75 font-normal">Oct {21 + idx}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slots Grid */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  3. Select 1-Hour Time Slot
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {currentDay?.slots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setSelectedSlot(slot)}
                      className={`py-2 px-3 rounded-lg text-xs font-mono font-medium transition-all ${
                        selectedSlot === slot
                          ? 'bg-teal-600 text-white font-bold shadow-sm'
                          : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Timezone Converter */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-slate-600">
                  <Globe className="w-4 h-4 text-teal-600" />
                  <span>Timezone:</span>
                </div>
                <select
                  value={selectedTimezone}
                  onChange={(e) => setSelectedTimezone(e.target.value)}
                  className="bg-white border border-slate-200 rounded-md px-2 py-1 text-xs text-slate-800 font-medium focus:outline-none focus:border-teal-500"
                >
                  <option value="ICT (Phnom Penh, UTC+7)">Phnom Penh (ICT, UTC+7)</option>
                  <option value="EDT (New York, UTC-4)">New York (EDT, UTC-4)</option>
                  <option value="BST (London, UTC+1)">London (BST, UTC+1)</option>
                  <option value="CEST (Paris, UTC+2)">Paris (CEST, UTC+2)</option>
                  <option value="JST (Tokyo, UTC+9)">Tokyo (JST, UTC+9)</option>
                  <option value="AEST (Sydney, UTC+10)">Sydney (AEST, UTC+10)</option>
                </select>
              </div>

              {/* Next Button */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-500">Total Price:</div>
                  <div className="text-xl font-bold font-mono text-slate-900">${price}.00</div>
                </div>
                <button
                  onClick={handleProceedToPayment}
                  className="py-2.5 px-6 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow transition-all flex items-center gap-1.5"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          )}

          {/* STEP 2: Payment Simulation */}
          {step === 'payment' && (
            <div className="space-y-5">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Tutor:</span>
                  <span className="font-bold text-slate-900">{tutor.name}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Lesson:</span>
                  <span className="font-medium text-slate-800">{lessonType}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Date & Slot:</span>
                  <span className="font-mono text-slate-800">{currentDay.day}, {selectedSlot}</span>
                </div>
                <div className="flex items-center justify-between text-sm pt-2 border-t border-slate-200">
                  <span className="font-bold text-slate-900">Total Payable:</span>
                  <span className="text-base font-black font-mono text-teal-700">${price}.00 USD</span>
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Select Settlement Method
                </label>
                <div className="space-y-2">
                  {[
                    { id: 'Credit Card (Stripe)', label: 'Credit / Debit Card (Stripe)', note: 'Instant confirmation worldwide', icon: CreditCard },
                    { id: 'ABA PayWay', label: 'ABA PayWay / KHQR', note: 'Cambodian mobile banking & Bakong settlement', icon: QrCode },
                    { id: 'PayPal', label: 'PayPal', note: 'Buyer protection guaranteed', icon: ShieldCheck },
                  ].map((m) => {
                    const Icon = m.icon;
                    return (
                      <button
                        key={m.id}
                        onClick={() => setPaymentMethod(m.id as any)}
                        className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                          paymentMethod === m.id
                            ? 'border-teal-600 bg-teal-50/60 ring-2 ring-teal-500/20'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
                            <Icon className="w-4 h-4 text-teal-600" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900">{m.label}</div>
                            <div className="text-[11px] text-slate-500">{m.note}</div>
                          </div>
                        </div>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          paymentMethod === m.id ? 'border-teal-600 bg-teal-600 text-white' : 'border-slate-300'
                        }`}>
                          {paymentMethod === m.id && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Simulation Note */}
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 leading-snug">
                <strong>Prototype Simulation:</strong> No actual card charge occurs. Clicking confirm will simulate payment gateway clearing and place this session into your <strong>My Lessons</strong> schedule.
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setStep('select')}
                  className="text-xs text-slate-600 hover:text-slate-900 font-medium"
                >
                  ← Back to schedule
                </button>
                <button
                  onClick={handleConfirmBooking}
                  disabled={isProcessing}
                  className="py-2.5 px-6 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow transition-all flex items-center gap-2 disabled:opacity-50"
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

          {/* STEP 3: Confirmed State */}
          {step === 'confirmed' && (
            <div className="py-6 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-slate-900">
                Lesson Confirmed with {tutor.name}!
              </h4>
              <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                Your <strong>{lessonType}</strong> is booked for <strong>{currentDay.day}, {selectedSlot}</strong>. Confirmation receipt and Google Meet links have been generated.
              </p>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-left text-xs space-y-2 max-w-md mx-auto">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Classroom Link:</span>
                  <a 
                    href={`https://meet.google.com/kto-${tutor.name.toLowerCase().replace(/\s+/g, '-')}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-teal-700 font-mono font-semibold hover:underline flex items-center gap-1"
                  >
                    <span>meet.google.com/kto-live</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Tutor Payout:</span>
                  <span className="font-mono text-slate-800">Escrow Secured (ABA PayWay / Bakong)</span>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-center gap-3">
                <button
                  onClick={handleResetAndClose}
                  className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow transition-colors"
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
