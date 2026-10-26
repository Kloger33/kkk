import React from 'react';
import { Booking, Tutor } from '../data/tutorsData';
import { 
  Calendar, 
  Video, 
  MessageSquare, 
  Clock, 
  CheckCircle2, 
  CreditCard, 
  ExternalLink, 
  ArrowRight,
  Plus
} from 'lucide-react';

interface MyLessonsViewProps {
  bookings: Booking[];
  onMessageTutor: (tutorId: string) => void;
  onBrowseTutors: () => void;
  onCancelBooking: (bookingId: string) => void;
}

export const MyLessonsView: React.FC<MyLessonsViewProps> = ({
  bookings,
  onMessageTutor,
  onBrowseTutors,
  onCancelBooking,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header and Summary stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            My Lessons & Schedule
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Manage your scheduled 1-hour micro-tutoring sessions and access live video classrooms.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-white border border-slate-200 px-4 py-2 rounded-xl text-right">
            <span className="text-[11px] text-slate-400 block font-medium">Credits Balance</span>
            <span className="text-base font-bold font-mono text-teal-700">$24.00 USD</span>
          </div>

          <button
            onClick={onBrowseTutors}
            className="px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-sm transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Book New Lesson</span>
          </button>
        </div>
      </div>

      {/* Bookings List */}
      {bookings.length > 0 ? (
        <div className="space-y-4">
          {bookings.map((b) => (
            <div
              key={b.id}
              className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              {/* Tutor & Lesson details */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-teal-600 text-white font-bold text-base flex items-center justify-center shrink-0 shadow">
                  {b.tutorName.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-slate-900">{b.tutorName}</h3>
                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                      {b.status}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {b.tutorUniversity} · <span className="font-medium text-slate-700">{b.lessonType}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-2 text-xs text-slate-600 font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-teal-600" />
                      <strong>{b.date}</strong>
                    </span>
                    <span className="text-slate-300">·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-teal-600" />
                      <span>{b.timeSlot}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                <a
                  href={b.meetingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-sm transition-colors flex items-center gap-1.5"
                >
                  <Video className="w-4 h-4" />
                  <span>Join Classroom</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>

                <button
                  onClick={() => onMessageTutor(b.tutorId)}
                  className="px-3.5 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs rounded-xl border border-slate-200 transition-colors flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-slate-500" />
                  <span>Chat</span>
                </button>

                <button
                  onClick={() => onCancelBooking(b.id)}
                  className="px-3 py-2 text-xs text-slate-400 hover:text-rose-600 font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-4">
          <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
            <Calendar className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">No Scheduled Lessons</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
            You don't have any upcoming micro-tutoring sessions. Browse native Cambodian tutors and book a 30-min trial lesson for just $3–$4.
          </p>
          <button
            onClick={onBrowseTutors}
            className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow transition-colors"
          >
            Find a Khmer Tutor
          </button>
        </div>
      )}

      {/* Cross-border Payment Security Notice */}
      <div className="p-4 bg-teal-50 border border-teal-200 rounded-2xl flex items-center justify-between text-xs text-teal-900">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0" />
          <span>
            <strong>Escrow Protection Active:</strong> Tutor payouts are released only after session completion via Cambodian ABA PayWay & Bakong settlement rails.
          </span>
        </div>
      </div>

    </div>
  );
};
