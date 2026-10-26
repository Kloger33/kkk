import React, { useState } from 'react';
import { Tutor } from '../data/tutorsData';
import { 
  Star, 
  ShieldCheck, 
  GraduationCap, 
  Clock, 
  MessageSquare, 
  Calendar, 
  Play, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2,
  Sparkles,
  Zap
} from 'lucide-react';

interface PreplyTutorCardProps {
  tutor: Tutor;
  onBook: (tutor: Tutor) => void;
  onMessage: (tutor: Tutor) => void;
  onViewProfile: (tutor: Tutor) => void;
}

export const PreplyTutorCard: React.FC<PreplyTutorCardProps> = ({
  tutor,
  onBook,
  onMessage,
  onViewProfile,
}) => {
  const [bioExpanded, setBioExpanded] = useState(false);

  return (
    <div className="bg-white border border-slate-200 hover:border-teal-400 rounded-2xl p-5 sm:p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-200 flex flex-col lg:flex-row gap-6">
      
      {/* Column 1: Avatar, Super Tutor & Video */}
      <div className="flex flex-col items-center sm:items-start lg:items-center text-center lg:text-center w-full lg:w-44 shrink-0">
        <div className="relative">
          <div className={`w-24 h-24 rounded-full bg-gradient-to-tr ${tutor.avatarBg} text-white font-bold text-2xl flex items-center justify-center shadow-md`}>
            {tutor.initials}
          </div>
          <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" title="Online now" />
        </div>

        {tutor.superTutor && (
          <div className="mt-2.5 flex items-center gap-1 bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-0.5 rounded-full text-[11px] font-semibold">
            <Sparkles className="w-3 h-3 text-amber-500 fill-amber-500" />
            <span>Super Tutor</span>
          </div>
        )}

        <div className="mt-3 text-xs text-slate-500 leading-tight">
          <div className="font-semibold text-slate-800">{tutor.activeStudents} active students</div>
          <div className="text-[11px] text-slate-400 mt-0.5">{tutor.lessonsTaught} lessons taught</div>
        </div>

        <button
          onClick={() => onViewProfile(tutor)}
          className="mt-3 w-full py-1.5 px-3 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-medium rounded-lg border border-slate-200 flex items-center justify-center gap-1.5 transition-colors"
        >
          <Play className="w-3.5 h-3.5 text-teal-600 fill-teal-600" />
          <span>Intro Video ({tutor.videoDuration})</span>
        </button>
      </div>

      {/* Column 2: Profile Details, Headline & Bio */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Header Row: Name & Verification */}
          <div className="flex flex-wrap items-center gap-2">
            <h3 
              onClick={() => onViewProfile(tutor)}
              className="text-xl font-bold text-slate-900 hover:text-teal-700 cursor-pointer transition-colors"
            >
              {tutor.name}
            </h3>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-teal-700 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-md">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Native Khmer Speaker</span>
            </span>
          </div>

          {/* University Credential */}
          <div className="flex items-center gap-1.5 text-xs text-slate-600 mt-1">
            <GraduationCap className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span className="font-medium text-slate-800">{tutor.university}</span>
            <span className="text-slate-400">·</span>
            <span className="text-slate-500">{tutor.year}</span>
          </div>

          {/* Languages spoken */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-600 mt-2">
            <span className="text-slate-400">Speaks:</span>
            {tutor.languages.map((l, i) => (
              <span key={i} className="text-slate-800 font-medium">
                {l.language} <span className="text-slate-400 font-normal">({l.level})</span>{i < tutor.languages.length - 1 ? ' · ' : ''}
              </span>
            ))}
          </div>

          {/* Headline */}
          <p className="text-sm font-semibold text-slate-900 mt-3 leading-snug">
            {tutor.headline}
          </p>

          {/* Bio text */}
          <p className="text-xs text-slate-600 mt-2 leading-relaxed">
            {bioExpanded ? tutor.bio : `${tutor.bio.slice(0, 160)}...`}
            <button
              onClick={() => setBioExpanded(!bioExpanded)}
              className="ml-1.5 text-teal-700 hover:underline font-semibold inline-flex items-center"
            >
              {bioExpanded ? 'Show less' : 'Read more'}
            </button>
          </p>

          {/* Focus Tags */}
          <div className="flex flex-wrap items-center gap-1.5 mt-3.5">
            {tutor.focusAreas.map((area) => (
              <span 
                key={area}
                className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-md border border-slate-200"
              >
                {area}
              </span>
            ))}
          </div>
        </div>

        {/* Quick availability ribbon */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>Replies {tutor.responseRate}</span>
          </div>
          <button
            onClick={() => onViewProfile(tutor)}
            className="text-teal-700 hover:text-teal-800 font-medium text-xs flex items-center gap-1"
          >
            <span>View full availability schedule</span>
            <span>→</span>
          </button>
        </div>
      </div>

      {/* Column 3: Rating, Price & Booking Actions */}
      <div className="lg:w-60 border-t lg:border-t-0 lg:border-l border-slate-100 pt-4 lg:pt-0 lg:pl-6 flex flex-col justify-between shrink-0">
        <div>
          {/* Rating */}
          <div className="flex items-center justify-between lg:justify-start lg:gap-2">
            <div className="flex items-center gap-1 text-slate-900">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span className="font-bold text-base">{tutor.rating.toFixed(1)}</span>
            </div>
            <span className="text-xs text-slate-500">({tutor.reviewsCount} reviews)</span>
          </div>

          {/* Price per hour */}
          <div className="mt-3">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-slate-900 font-mono">${tutor.hourlyRate}</span>
              <span className="text-xs text-slate-500 font-normal">/ 60-min lesson</span>
            </div>
            {tutor.trialPrice && (
              <div className="mt-1 flex items-center gap-1 text-[11px] text-emerald-700 font-medium bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                <Zap className="w-3 h-3 text-emerald-600 fill-emerald-600" />
                <span>${tutor.trialPrice} Trial Lesson (30 min)</span>
              </div>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 space-y-2">
          <button
            onClick={() => onBook(tutor)}
            className="w-full py-2.5 px-4 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-sm hover:shadow transition-all flex items-center justify-center gap-1.5"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Trial (${tutor.trialPrice})</span>
          </button>

          <button
            onClick={() => onMessage(tutor)}
            className="w-full py-2 px-4 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded-xl border border-slate-300 transition-colors flex items-center justify-center gap-1.5"
          >
            <MessageSquare className="w-3.5 h-3.5 text-slate-500" />
            <span>Send Message</span>
          </button>

          <button
            onClick={() => onViewProfile(tutor)}
            className="w-full text-center text-xs text-slate-500 hover:text-slate-800 font-medium py-1 transition-colors"
          >
            View Full Profile
          </button>
        </div>
      </div>

    </div>
  );
};
