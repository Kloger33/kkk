import React, { useState } from 'react';
import { Tutor } from '../data/tutorsData';
import { playNativeKhmerAudio, stopNativeAudio } from '../utils/khmerAudio';
import { 
  X, 
  Star, 
  ShieldCheck, 
  GraduationCap, 
  Clock, 
  MessageSquare, 
  Calendar, 
  Play, 
  Pause, 
  Sparkles, 
  CheckCircle2,
  Volume2
} from 'lucide-react';

interface TutorProfileModalProps {
  tutor: Tutor | null;
  isOpen: boolean;
  onClose: () => void;
  onBook: (tutor: Tutor) => void;
  onMessage: (tutor: Tutor) => void;
}

export const TutorProfileModal: React.FC<TutorProfileModalProps> = ({
  tutor,
  isOpen,
  onClose,
  onBook,
  onMessage,
}) => {
  if (!isOpen || !tutor) return null;

  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-teal-800 bg-teal-50 border border-teal-200 px-2.5 py-0.5 rounded-full">
              Tutor Profile
            </span>
            <span className="text-xs text-slate-400">·</span>
            <span className="text-xs text-slate-500 font-medium">KhmerTutorial Online</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 p-6 space-y-6">
          
          {/* Tutor Hero Lockup */}
          <div className="flex flex-col sm:flex-row items-start gap-6 pb-6 border-b border-slate-100">
            <div className="relative shrink-0 mx-auto sm:mx-0">
              <div className={`w-28 h-28 rounded-full bg-gradient-to-tr ${tutor.avatarBg} text-white font-bold text-3xl flex items-center justify-center shadow-lg`}>
                {tutor.initials}
              </div>
              <span className="absolute bottom-1 right-2 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" />
            </div>

            <div className="flex-1 text-center sm:text-left space-y-2">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h2 className="text-2xl font-bold text-slate-900">{tutor.name}</h2>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-teal-700 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-md">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Native Khmer Speaker</span>
                </span>
                {tutor.superTutor && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>Super Tutor</span>
                  </span>
                )}
              </div>

              <div className="flex items-center justify-center sm:justify-start gap-2 text-xs text-slate-600">
                <GraduationCap className="w-4 h-4 text-amber-600" />
                <span className="font-semibold text-slate-800">{tutor.university}</span>
                <span className="text-slate-400">·</span>
                <span>{tutor.year}</span>
              </div>

              <div className="flex items-center justify-center sm:justify-start gap-4 text-xs pt-1">
                <div className="flex items-center gap-1 text-slate-900 font-bold">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span>{tutor.rating.toFixed(1)}</span>
                  <span className="text-slate-500 font-normal">({tutor.reviewsCount} reviews)</span>
                </div>
                <div className="text-slate-500">
                  <strong className="text-slate-800 font-semibold">{tutor.activeStudents}</strong> students
                </div>
                <div className="text-slate-500">
                  <strong className="text-slate-800 font-semibold">{tutor.lessonsTaught}</strong> lessons
                </div>
              </div>
            </div>

            <div className="w-full sm:w-auto shrink-0 flex flex-col gap-2 pt-2 sm:pt-0">
              <div className="text-right hidden sm:block">
                <div className="text-2xl font-black font-mono text-slate-900">${tutor.hourlyRate}</div>
                <div className="text-xs text-slate-500">per 60-min lesson</div>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onBook(tutor);
                }}
                className="w-full py-2.5 px-5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow transition-colors flex items-center justify-center gap-1.5"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Trial (${tutor.trialPrice})</span>
              </button>
              <button
                onClick={() => {
                  onClose();
                  onMessage(tutor);
                }}
                className="w-full py-2 px-5 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded-xl border border-slate-300 transition-colors flex items-center justify-center gap-1.5"
              >
                <MessageSquare className="w-4 h-4 text-slate-500" />
                <span>Send Message</span>
              </button>
            </div>
          </div>

          {/* Video Intro Player Simulation */}
          <div className="bg-slate-900 rounded-2xl overflow-hidden relative shadow-lg">
            <div className="p-4 sm:p-6 text-white flex flex-col justify-between min-h-[200px] bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-teal-400 bg-teal-950/80 border border-teal-800/80 px-2 py-0.5 rounded">
                  Intro Video · {tutor.videoDuration}
                </span>
                <span className="text-xs text-slate-400">1080p HD</span>
              </div>

              <div className="text-center py-6">
                <button
                  onClick={() => {
                    const nextPlaying = !isPlayingVideo;
                    setIsPlayingVideo(nextPlaying);
                    if (nextPlaying) {
                      playNativeKhmerAudio(
                        '/assets/audio/khmer/tutor_intro.mp3',
                        1.0,
                        () => setIsPlayingVideo(true),
                        () => setIsPlayingVideo(false)
                      );
                    } else {
                      stopNativeAudio();
                    }
                  }}
                  className="w-14 h-14 rounded-full bg-teal-500 hover:bg-teal-400 text-slate-950 flex items-center justify-center mx-auto shadow-xl transition-transform hover:scale-110"
                >
                  {isPlayingVideo ? <Pause className="w-6 h-6 fill-slate-950" /> : <Play className="w-6 h-6 fill-slate-950 ml-0.5" />}
                </button>
                <p className="text-xs text-slate-300 mt-3 font-medium">
                  {isPlayingVideo ? 'Playing authentic native Khmer recording...' : `Listen to ${tutor.name}'s real native voice`}
                </p>
              </div>

              {isPlayingVideo && (
                <div className="bg-black/70 p-3 rounded-lg border border-white/10 text-xs text-amber-200 font-serif-title italic text-center animate-pulse">
                  "ជំរាបសួរ! ខ្ញុំឈ្មោះ បុប្ផា។ រីករាយណាស់ដែលបានជួបអ្នក!"
                  <div className="text-[10px] text-teal-300 not-italic font-sans mt-0.5">
                    (Choum reap sour! My name is Bopha. Very happy to meet you!)
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* About & Teaching Approach */}
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">About Me</h4>
              <p className="text-xs text-slate-700 leading-relaxed mt-2 whitespace-pre-line">
                {tutor.bio}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Teaching Experience</h4>
              <p className="text-xs text-slate-700 leading-relaxed mt-2">
                {tutor.teachingExperience}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Teaching Focus Areas</h4>
              <div className="flex flex-wrap gap-2 mt-2">
                {tutor.focusAreas.map((f) => (
                  <span key={f} className="text-xs font-semibold bg-teal-50 text-teal-800 border border-teal-200 px-3 py-1 rounded-lg">
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Full Weekly Schedule Grid */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Weekly Available Slots</h4>
              <span className="text-xs text-slate-500">Click any slot to book</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {tutor.availability.map((avail) => (
                <div key={avail.day} className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                  <div className="text-xs font-bold text-slate-900 mb-2 border-b border-slate-200 pb-1">
                    {avail.day}
                  </div>
                  <div className="space-y-1.5">
                    {avail.slots.slice(0, 3).map((slot) => (
                      <button
                        key={slot}
                        onClick={() => {
                          onClose();
                          onBook(tutor);
                        }}
                        className="w-full text-left px-2 py-1 bg-white hover:bg-teal-50 hover:text-teal-700 hover:border-teal-300 border border-slate-200 rounded text-[11px] font-mono text-slate-700 transition-colors"
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Student Reviews */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
              Verified Student Reviews ({tutor.reviews.length})
            </h4>
            <div className="space-y-3">
              {tutor.reviews.map((rev) => (
                <div key={rev.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-xs text-slate-900">{rev.studentName}</span>
                      <span className="text-slate-400 text-xs">·</span>
                      <span className="text-xs text-slate-500">{rev.studentCountry}</span>
                    </div>
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-amber-500" />
                      <span className="text-xs font-bold">{rev.rating}</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed italic">
                    "{rev.comment}"
                  </p>
                  <div className="text-[10px] text-slate-400 font-mono pt-1">
                    Verified Lesson · {rev.date}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
