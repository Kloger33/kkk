import React, { useState, useEffect } from 'react';
import { Tutor } from '../data/tutorsData';
import { playNativeKhmerAudio, stopNativeAudio } from '../utils/khmerAudio';
import { 
  X, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Calendar, 
  MessageSquare, 
  ShieldCheck, 
  Star, 
  GraduationCap, 
  CheckCircle2, 
  Sparkles, 
  Clock, 
  ArrowRight,
  Maximize2,
  Video,
  Award
} from 'lucide-react';

interface VideoPreviewModalProps {
  tutor: Tutor | null;
  isOpen: boolean;
  onClose: () => void;
  onBook: (tutor: Tutor) => void;
  onMessage: (tutor: Tutor) => void;
}

export const VideoPreviewModal: React.FC<VideoPreviewModalProps> = ({
  tutor,
  isOpen,
  onClose,
  onBook,
  onMessage,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const totalSeconds = tutor ? parseDuration(tutor.videoDuration || '1:15') : 75;

  // Cleanup audio on close or unmount
  useEffect(() => {
    if (!isOpen) {
      stopNativeAudio();
      setIsPlaying(false);
      setCurrentTime(0);
    }
  }, [isOpen]);

  // Timer simulation during playback
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= totalSeconds) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, totalSeconds]);

  if (!isOpen || !tutor) return null;

  function parseDuration(durStr: string): number {
    const parts = durStr.split(':');
    if (parts.length === 2) {
      return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
    }
    return 75;
  }

  function formatTime(secs: number): string {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  }

  const handleTogglePlay = () => {
    if (isPlaying) {
      stopNativeAudio();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      // Play authentic native Khmer audio snippet
      playNativeKhmerAudio(
        '/assets/audio/khmer/mod1_0.mp3',
        1.0,
        () => setIsPlaying(true),
        () => {
          setIsPlaying(false);
          setCurrentTime(0);
        }
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div 
        className="relative w-full max-w-3xl bg-slate-950 text-white rounded-3xl shadow-2xl border border-slate-800 overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/70 shrink-0">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full bg-gradient-to-tr ${tutor.avatarBg} text-white font-bold text-sm flex items-center justify-center shadow-md border border-white/20`}>
              {tutor.initials}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base sm:text-lg text-white">{tutor.name}</h3>
                <span className="text-[10px] font-semibold text-teal-300 bg-teal-950/80 border border-teal-500/40 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-teal-400" />
                  <span>Teaching Video</span>
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {tutor.university} · {tutor.year}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              stopNativeAudio();
              onClose();
            }}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors"
            title="Close video preview"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1">
          
          {/* Main 16:9 Video Canvas Screen */}
          <div className="relative aspect-video bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950/50 flex flex-col justify-between p-4 sm:p-6 overflow-hidden border-b border-slate-800 group/canvas select-none">
            
            {/* Ambient Classroom Studio Background Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-teal-900/20 via-transparent to-transparent pointer-events-none" />

            {/* Video Top Watermarks */}
            <div className="relative z-10 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full border border-slate-700/60 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                <span className="font-mono text-[11px] font-semibold text-slate-200">1080p Full HD Video Preview</span>
              </div>
              
              <div className="flex items-center gap-1 text-[11px] text-slate-300 bg-slate-900/70 px-2.5 py-1 rounded-full border border-slate-700/50">
                <Clock className="w-3 h-3 text-amber-400" />
                <span>Duration: {tutor.videoDuration}</span>
              </div>
            </div>

            {/* Center: Video Preview Avatar & Big Play Button */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center my-auto py-4">
              <div className="relative mb-3">
                <div className={`w-24 sm:w-28 h-24 sm:h-28 rounded-full bg-gradient-to-tr ${tutor.avatarBg} text-white font-extrabold text-3xl sm:text-4xl flex items-center justify-center shadow-2xl border-4 border-slate-800 ring-4 ring-teal-500/20`}>
                  {tutor.initials}
                </div>

                {/* Animated Audio Equalizer Wave if playing */}
                {isPlaying && (
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-teal-950/90 border border-teal-500 px-2 py-0.5 rounded-full flex items-center gap-1 shadow-lg">
                    <span className="w-1 h-3 bg-teal-400 animate-pulse rounded-full" />
                    <span className="w-1 h-4 bg-teal-300 animate-pulse delay-75 rounded-full" />
                    <span className="w-1 h-2 bg-teal-400 animate-pulse delay-150 rounded-full" />
                    <span className="text-[10px] font-mono text-teal-300 font-bold ml-1">Native Audio</span>
                  </div>
                )}
              </div>

              {/* Big Center Action Trigger */}
              <button
                onClick={handleTogglePlay}
                className="mt-1 px-5 py-2 rounded-full bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg hover:scale-105 transition-all"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4 fill-slate-950" />
                    <span>Pause Intro Sample</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-slate-950 ml-0.5" />
                    <span>Play {tutor.name}'s Introduction</span>
                  </>
                )}
              </button>

              <p className="text-xs text-slate-400 mt-2 max-w-md">
                {isPlaying ? (
                  <span className="text-teal-300 font-medium">
                    Playing authentic human native Khmer speech recording...
                  </span>
                ) : (
                  <span>
                    Tap to hear {tutor.name}'s authentic pronunciation, speaking pace & teaching introduction.
                  </span>
                )}
              </p>
            </div>

            {/* Video Subtitle Caption Bar */}
            <div className="relative z-10 bg-slate-950/85 backdrop-blur-md rounded-2xl p-3 border border-slate-800 text-center space-y-1">
              <div className="text-xs sm:text-sm font-semibold text-slate-100 italic">
                “Soursdey! I focus on practical street dialogues so you can speak confidently with local Cambodians.”
              </div>
              <div className="text-[11px] text-teal-400 font-normal">
                «សួស្តី! ខ្ញុំផ្តោតលើការសន្ទនាជាក់ស្តែង ដើម្បីឱ្យអ្នកអាចនិយាយដោយទំនុកចិត្តជាមួយជនជាតិខ្មែរ»
              </div>
            </div>

            {/* Bottom Scrubber & Video Controls */}
            <div className="relative z-10 pt-3 space-y-1.5">
              {/* Progress Track */}
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-teal-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${(currentTime / totalSeconds) * 100}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-3">
                  <button onClick={handleTogglePlay} className="hover:text-white transition-colors">
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <button onClick={() => setIsMuted(!isMuted)} className="hover:text-white transition-colors">
                    {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <span className="font-mono text-[11px]">
                    {formatTime(currentTime)} / {tutor.videoDuration}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <span>Phnom Penh Native Accent</span>
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

          </div>

          {/* Teaching Style & Methodology Breakdown */}
          <div className="p-6 space-y-6 bg-slate-900/40">
            
            {/* Header & Badges */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h4 className="font-extrabold text-base text-white">
                  {tutor.name}'s Teaching Style & Classroom Methodology
                </h4>
              </div>
              <p className="text-xs text-slate-400">
                What to expect during your 1-on-1 micro-tutoring sessions on KhmerTutors Online
              </p>
            </div>

            {/* 3 Pillar Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              
              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1.5">
                <div className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold">
                  💬
                </div>
                <h5 className="font-bold text-slate-200">Conversational Fluency</h5>
                <p className="text-slate-400 leading-relaxed text-[11px]">
                  Focus on authentic natural cadence, common contraction slang, and real social interactions.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1.5">
                <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                  🛵
                </div>
                <h5 className="font-bold text-slate-200">Daily Expat Scenarios</h5>
                <p className="text-slate-400 leading-relaxed text-[11px]">
                  PassApp tuk-tuk directions, wet-market bargaining, café ordering, and polite social etiquette.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1.5">
                <div className="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
                  📝
                </div>
                <h5 className="font-bold text-slate-200">Custom Lesson Notes</h5>
                <p className="text-slate-400 leading-relaxed text-[11px]">
                  Receive personal vocabulary flashcards and audio review clips after every completed 1-hour session.
                </p>
              </div>

            </div>

            {/* Tutor Bio Snippet */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs space-y-2">
              <span className="font-bold text-slate-300 uppercase tracking-wider text-[10px]">
                About the Tutor
              </span>
              <p className="text-slate-300 leading-relaxed text-xs">
                {tutor.bio}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-400 pt-1 border-t border-slate-800/80">
                <span className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <strong className="text-white">{tutor.rating.toFixed(1)}</strong> ({tutor.reviewsCount} reviews)
                </span>
                <span>·</span>
                <span><strong className="text-white">{tutor.lessonsTaught}</strong> lessons taught</span>
                <span>·</span>
                <span><strong className="text-white">{tutor.activeStudents}</strong> active students</span>
                <span>·</span>
                <span className="text-teal-400">Replies {tutor.responseRate}</span>
              </div>
            </div>

          </div>

        </div>

        {/* Modal Footer with Direct Booking Actions */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-900/90 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl sm:text-2xl font-black font-mono text-white">
                ${tutor.trialPrice}
              </span>
              <span className="text-xs text-slate-400">
                for 30-min Trial Lesson (${tutor.hourlyRate}/hr regular)
              </span>
            </div>
            <p className="text-[11px] text-emerald-400">
              100% money-back guarantee if not satisfied with your trial
            </p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => {
                stopNativeAudio();
                onClose();
                onMessage(tutor);
              }}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-200 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
              <span>Message</span>
            </button>

            <button
              onClick={() => {
                stopNativeAudio();
                onClose();
                onBook(tutor);
              }}
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-extrabold transition-all shadow-md flex items-center justify-center gap-1.5 hover:scale-105"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Trial Lesson (${tutor.trialPrice})</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
