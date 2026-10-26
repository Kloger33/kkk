import React, { useState } from 'react';
import { STARTER_CURRICULUM, CurriculumModule } from '../data/tutorsData';
import { playNativeKhmerAudio, stopNativeAudio } from '../utils/khmerAudio';
import { 
  BookOpen, 
  Volume2, 
  VolumeX,
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  FileText,
  Gauge,
  Headphones,
  ShieldCheck
} from 'lucide-react';

interface CurriculumModalProps {
  onSelectPracticeModule: (moduleName: string) => void;
  onOpenPdf: () => void;
}

export const CurriculumModal: React.FC<CurriculumModalProps> = ({
  onSelectPracticeModule,
  onOpenPdf,
}) => {
  const [selectedModuleId, setSelectedModuleId] = useState<string>('mod-1');
  const [playingPhrase, setPlayingPhrase] = useState<string | null>(null);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0); // 1.0 = native human speed, 0.75 = slower

  const activeModule =
    STARTER_CURRICULUM.find((m) => m.id === selectedModuleId) || STARTER_CURRICULUM[0];

  const handlePlayAudio = (khmer: string, audioUrl: string) => {
    if (playingPhrase === khmer) {
      stopNativeAudio();
      setPlayingPhrase(null);
      return;
    }

    setPlayingPhrase(khmer);

    playNativeKhmerAudio(
      audioUrl,
      playbackSpeed,
      () => setPlayingPhrase(khmer),
      () => setPlayingPhrase(null)
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-900 via-teal-800 to-slate-900 rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-teal-300 bg-teal-800/60 border border-teal-600/50 px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
              <Headphones className="w-3.5 h-3.5 text-teal-300" />
              <span>Authentic Native Khmer Recordings</span>
            </span>
            <span className="text-xs font-medium text-emerald-300 bg-emerald-950/70 border border-emerald-500/40 px-2 py-0.5 rounded-full flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>100% Real Native Speaker · Not AI</span>
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Listen to Real Native Human Khmer Pronunciation
          </h2>

          <p className="text-sm text-teal-100 leading-relaxed font-normal">
            Every phrase in the Starter Curriculum is recorded in natural Cambodian cadence. Tap any card or the speaker icon below to hear clear native Khmer speech with zero robotic synthesis.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onSelectPracticeModule(activeModule.title)}
              className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-colors flex items-center gap-1.5"
            >
              <span>Practice with a Native Tutor</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onOpenPdf}
              className="px-4 py-2.5 bg-teal-950/80 hover:bg-teal-950 text-teal-200 text-xs font-semibold rounded-xl border border-teal-700/80 transition-colors flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Read Appendix B Curriculum Specs (PDF)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Module Navigation Tabs & Audio Speed Toggle */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        
        {/* Module Switcher Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 flex-1">
          {STARTER_CURRICULUM.map((mod) => (
            <button
              key={mod.id}
              onClick={() => {
                stopNativeAudio();
                setPlayingPhrase(null);
                setSelectedModuleId(mod.id);
              }}
              className={`p-3.5 rounded-2xl border text-left transition-all ${
                selectedModuleId === mod.id
                  ? 'bg-teal-600 text-white border-teal-700 shadow-md ring-2 ring-teal-500/30'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-caption font-mono font-bold px-2 py-0.5 rounded ${
                  selectedModuleId === mod.id ? 'bg-teal-700 text-teal-100' : 'bg-slate-100 text-slate-600'
                }`}>
                  MOD {mod.moduleNumber}
                </span>
              </div>
              <div className="text-xs font-bold leading-snug line-clamp-1 mt-0.5">
                {mod.title}
              </div>
            </button>
          ))}
        </div>

        {/* Audio Playback Speed Selector */}
        <div className="bg-white border border-slate-200 rounded-2xl p-2.5 flex items-center gap-2 self-start sm:self-auto shrink-0 shadow-xs">
          <Gauge className="w-4 h-4 text-teal-600 ml-1" />
          <span className="text-xs text-slate-500 font-medium">Cadence:</span>
          <button
            onClick={() => setPlaybackSpeed(0.8)}
            className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-colors ${
              playbackSpeed === 0.8
                ? 'bg-teal-600 text-white font-bold'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            0.8x Slower Pace
          </button>
          <button
            onClick={() => setPlaybackSpeed(1.0)}
            className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-colors ${
              playbackSpeed === 1.0
                ? 'bg-teal-600 text-white font-bold'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            1.0x Natural Speed
          </button>
        </div>

      </div>

      {/* Active Module Details */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        
        {/* Module Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-teal-600 font-semibold uppercase tracking-wider">
              <span>Module {activeModule.moduleNumber} Objectives</span>
              <span className="text-slate-300">·</span>
              <span className="text-emerald-700 font-semibold lowercase font-sans">tap any phrase to hear real Khmer speech</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">
              {activeModule.title}
            </h3>
            <p className="text-xs text-slate-600 mt-1 max-w-2xl">
              {activeModule.objective}
            </p>
          </div>

          <button
            onClick={() => onSelectPracticeModule(activeModule.title)}
            className="px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-sm transition-colors flex items-center gap-1.5 shrink-0 self-start sm:self-auto"
          >
            <span>Book Tutor for This Module</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Phrases Grid with Real Native Audio Recordings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeModule.phrases.map((phrase, idx) => {
            const isPlaying = playingPhrase === phrase.khmer;

            return (
              <div
                key={idx}
                onClick={() => handlePlayAudio(phrase.khmer, phrase.audioUrl)}
                className={`border rounded-2xl p-5 space-y-3 cursor-pointer transition-all duration-200 relative group overflow-hidden select-none ${
                  isPlaying
                    ? 'bg-teal-50/80 border-teal-500 shadow-md ring-2 ring-teal-500/20'
                    : 'bg-slate-50/70 hover:bg-white border-slate-200 hover:border-teal-300 hover:shadow-sm'
                }`}
              >
                {/* Active audio ripple bar at top */}
                {isPlaying && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 via-amber-400 to-teal-500 animate-pulse" />
                )}

                <div className="flex items-start justify-between gap-4">
                  <div>
                    {/* Khmer Script: Kantumruy Pro with 1.7 line-height so tall subscripts never clip */}
                    <div className="text-2xl sm:text-3xl font-bold text-slate-900 font-khmer leading-[1.7] py-0.5 tracking-normal">
                      {phrase.khmer}
                    </div>
                    {/* Phonetic Pronunciation */}
                    <div className="text-small font-bold text-teal-700 font-sans mt-0.5 flex items-center gap-1.5">
                      <span>{phrase.phonetic}</span>
                    </div>
                  </div>

                  {/* Sound Trigger Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlayAudio(phrase.khmer, phrase.audioUrl);
                    }}
                    className={`p-3 rounded-xl border transition-all flex items-center gap-1.5 shrink-0 shadow-xs ${
                      isPlaying
                        ? 'bg-teal-600 text-white border-teal-700 shadow-md scale-105'
                        : 'bg-white hover:bg-teal-50 text-slate-700 hover:text-teal-700 border-slate-200 group-hover:border-teal-300'
                    }`}
                    title="Click to hear native human Khmer recording"
                  >
                    <Volume2 className={`w-5 h-5 ${isPlaying ? 'animate-bounce text-amber-300' : 'text-teal-600'}`} />
                    <span className="text-caption font-bold">
                      {isPlaying ? 'Playing...' : 'Play Native'}
                    </span>
                  </button>
                </div>

                {/* Animated Equalizer Waveform while playing */}
                {isPlaying && (
                  <div className="flex items-center gap-2 py-1 bg-teal-100/60 px-3 rounded-lg border border-teal-200/80">
                    <span className="text-caption font-mono text-teal-800 font-bold">Native Human Voice:</span>
                    <div className="flex items-end gap-1 h-3.5">
                      <div className="w-1 bg-teal-600 h-2 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-1 bg-teal-600 h-3.5 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-1 bg-teal-600 h-1.5 animate-bounce" style={{ animationDelay: '300ms' }} />
                      <div className="w-1 bg-teal-600 h-3 animate-bounce" style={{ animationDelay: '200ms' }} />
                      <div className="w-1 bg-teal-600 h-2.5 animate-bounce" style={{ animationDelay: '80ms' }} />
                    </div>
                    <span className="text-caption text-teal-700 ml-auto font-medium">MP3 Native Audio</span>
                  </div>
                )}

                {/* English meaning */}
                <div className="text-small font-medium text-slate-800 pt-1.5 border-t border-slate-200/80 flex items-center justify-between">
                  <div>
                    <span className="text-slate-400 text-small">Meaning: </span>
                    <strong className="text-slate-900">{phrase.english}</strong>
                  </div>
                  <span className="text-caption text-teal-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Tap to hear pronunciation
                  </span>
                </div>

                {/* Cultural Context Note */}
                {phrase.culturalNote && (
                  <div className="text-small text-slate-600 bg-white p-3 rounded-xl border border-slate-200/70 leading-relaxed">
                    <strong className="text-amber-800 font-semibold">Cultural Context: </strong>
                    {phrase.culturalNote}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
