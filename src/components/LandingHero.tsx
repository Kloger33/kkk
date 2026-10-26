import React, { useMemo, useRef } from 'react';
import { Tutor } from '../data/tutorsData';
import { 
  Search, 
  Sparkles, 
  ArrowRight, 
  Star, 
  CheckCircle2, 
  CreditCard, 
  Clock, 
  UserCheck, 
  CalendarCheck, 
  Video, 
  MessageSquare, 
  Compass, 
  Briefcase, 
  BookOpen, 
  ShieldCheck,
  GraduationCap
} from 'lucide-react';
import { Button, Badge, Rating } from './ui';

interface LandingHeroProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedFocus: string;
  setSelectedFocus: (f: string) => void;
  sortBy: string;
  setSortBy: (s: string) => void;
  totalTutors: number;
  onFindTutor: () => void;
  onTryFreeLesson: () => void;
  tutors: Tutor[];
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  searchQuery,
  setSearchQuery,
  selectedFocus,
  setSelectedFocus,
  sortBy,
  setSortBy,
  totalTutors,
  onFindTutor,
  onTryFreeLesson,
  tutors,
}) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Compute live trust statistics from dataset
  const stats = useMemo(() => {
    if (tutors.length === 0) return { avgRating: '5.0', totalReviews: 290, totalLessons: 1160 };
    const sumRating = tutors.reduce((acc, t) => acc + t.rating, 0);
    const avg = (sumRating / tutors.length).toFixed(1);
    const reviews = tutors.reduce((acc, t) => acc + t.reviewsCount, 0);
    const lessons = tutors.reduce((acc, t) => acc + t.lessonsTaught, 0);
    return { avgRating: avg, totalReviews: reviews, totalLessons: lessons };
  }, [tutors]);

  const handleFocusShortcut = (focusName: string) => {
    setSelectedFocus(focusName);
    onFindTutor();
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFindTutor();
  };

  return (
    <div className="space-y-6 sm:space-y-10">
      
      {/* 1. HERO SECTION (Above the fold at 390x844 and 1440x900) */}
      <section className="bg-gradient-to-b from-teal-50/50 via-white to-[#f8fafc] border-b border-slate-200/80 pt-4 sm:pt-8 pb-6 sm:pb-10 relative overflow-hidden">
        
        {/* Ambient decorative background ornaments (no heavy image, 0ms network penalty) */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-72 h-72 bg-amber-200/20 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-3 sm:space-y-4 text-left">
              
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 text-caption font-semibold shadow-2xs">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-700" />
                <span>Verified Cambodian university tutors · Phnom Penh</span>
              </div>

              {/* Benefit-led short H1 */}
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.15] text-balance">
                Speak everyday Khmer — <br className="hidden sm:inline" />
                with a local tutor, <span className="text-[#0F766E] underline decoration-amber-400 decoration-wavy decoration-2">from $3</span>.
              </h1>

              {/* Sub-copy: 1 line on mobile / 2 lines on desktop */}
              <p className="text-small sm:text-body text-slate-600 leading-relaxed font-normal max-w-xl">
                <span className="sm:hidden">
                  Order street food, direct tuk-tuks & bargain at markets from your very first 1-on-1 session.
                </span>
                <span className="hidden sm:inline">
                  Master daily conversation for ordering food, directing tuk-tuks, market bargaining, and business basics. Learn 1-on-1 online with friendly Cambodian university students on your schedule.
                </span>
              </p>

              {/* Desktop Inline Search / Mobile Compact Search */}
              <form onSubmit={handleSearchSubmit} className="pt-1">
                {/* Desktop Inline Search Bar (Search + Focus Select + CTA) */}
                <div className="hidden sm:flex items-center bg-white border border-slate-300 rounded-2xl p-1.5 shadow-md focus-within:ring-2 focus-within:ring-[#0F766E] focus-within:border-transparent transition-all max-w-2xl">
                  <div className="flex-1 flex items-center pl-3 pr-2 gap-2 border-r border-slate-200">
                    <Search className="w-4 h-4 text-slate-400 shrink-0" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search tutor name, university (RUPP, ITC), or topic..."
                      className="w-full py-2 text-small text-slate-900 placeholder:text-slate-400 bg-transparent outline-none"
                    />
                  </div>

                  <div className="w-44 px-2">
                    <select
                      value={selectedFocus}
                      onChange={(e) => setSelectedFocus(e.target.value)}
                      className="w-full py-2 text-small font-semibold text-slate-700 bg-transparent outline-none cursor-pointer"
                    >
                      <option value="All Focuses">All Focus Areas</option>
                      <option value="Conversational">Conversational</option>
                      <option value="Travel Khmer">Travel Khmer</option>
                      <option value="Business Khmer">Business Khmer</option>
                      <option value="Script & Reading">Script & Reading</option>
                    </select>
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    className="shrink-0"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    Find my tutor
                  </Button>
                </div>

                {/* Mobile Search & CTAs (Touch ergonomic min-h 44px) */}
                <div className="sm:hidden space-y-2">
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search tutor name or topic..."
                      className="w-full min-h-[44px] text-[16px] pl-10 pr-3.5 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 shadow-2xs focus:ring-2 focus:ring-[#0F766E] outline-none"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      type="submit"
                      variant="primary"
                      size="md"
                      fullWidth
                      onClick={onFindTutor}
                      rightIcon={<ArrowRight className="w-4 h-4" />}
                    >
                      Find my tutor
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      size="md"
                      onClick={onTryFreeLesson}
                      className="shrink-0"
                    >
                      Free Module
                    </Button>
                  </div>
                </div>
              </form>

              {/* Desktop Secondary CTA Link */}
              <div className="hidden sm:flex items-center gap-3 pt-0.5 text-small">
                <span className="text-slate-400">or</span>
                <button
                  type="button"
                  onClick={onTryFreeLesson}
                  className="font-bold text-[#0F766E] hover:text-[#115E59] hover:underline flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>Try a free lesson module with authentic native audio</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Trust Row: Average Rating + Lessons + ABA/Bakong + Rescheduling */}
              <div className="pt-2 sm:pt-3 border-t border-slate-200/70 flex flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-2 text-caption text-slate-600 font-medium">
                {/* Rating */}
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  </div>
                  <strong className="text-slate-900 font-bold">{stats.avgRating}</strong>
                  <span className="text-slate-500">({stats.totalReviews}+ reviews)</span>
                </div>

                {/* Total Lessons */}
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span><strong>{stats.totalLessons.toLocaleString()}+</strong> lessons taught</span>
                </div>

                {/* Local Payment Rails */}
                <div className="flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-teal-700" />
                  <span>ABA · Bakong · Card</span>
                </div>

                {/* Rescheduling Policy */}
                <div className="hidden md:flex items-center gap-1.5 text-slate-500">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Free rescheduling up to 12h</span>
                </div>
              </div>

            </div>

            {/* Right Visual Composition Column (Stacked Tutor Preview Cards & Kbach Motifs) */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-none">
                
                {/* Kbach Khmer Traditional Watermark Glow Background */}
                <div className="absolute -inset-2 bg-gradient-to-tr from-amber-200/40 via-teal-200/30 to-amber-100/20 rounded-3xl blur-xl opacity-70" />

                <div className="relative bg-white/90 backdrop-blur-xs border border-slate-200 rounded-3xl p-4 sm:p-5 shadow-lg space-y-3">
                  
                  {/* Floating Khmer Phrase Tag */}
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50/80 border border-amber-200/90 shadow-2xs">
                      <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                      <span className="font-khmer font-bold text-amber-900 text-small leading-[1.7]">
                        សួស្តី
                      </span>
                      <span className="text-amber-400">·</span>
                      <span className="text-slate-700 font-sans font-bold text-caption">Soursdey</span>
                      <span className="text-slate-400">·</span>
                      <span className="text-teal-700 font-medium text-caption">Hello</span>
                    </div>

                    <span className="text-caption font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      Live Tutors Online
                    </span>
                  </div>

                  {/* Featured Micro Tutor Card 1 */}
                  <div className="p-3 rounded-2xl bg-slate-50/90 border border-slate-200/80 flex items-center justify-between gap-3 shadow-2xs hover:bg-white hover:border-teal-300 transition-all cursor-pointer"
                    onClick={onFindTutor}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-600 to-amber-400 text-white font-bold text-small flex items-center justify-center shrink-0 shadow-2xs">
                        BS
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-bold text-small text-slate-900 truncate">Bopha Seng</h4>
                          <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" title="Online" />
                        </div>
                        <p className="text-caption text-slate-500 truncate">RUPP · Year 3 English Lit</p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-small font-extrabold font-mono text-teal-700">$4 trial</div>
                      <div className="flex items-center gap-0.5 text-caption font-bold text-amber-500">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span>5.0</span>
                      </div>
                    </div>
                  </div>

                  {/* Featured Micro Tutor Card 2 */}
                  <div className="p-3 rounded-2xl bg-slate-50/90 border border-slate-200/80 flex items-center justify-between gap-3 shadow-2xs hover:bg-white hover:border-teal-300 transition-all cursor-pointer"
                    onClick={onFindTutor}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-teal-600 to-emerald-500 text-white font-bold text-small flex items-center justify-center shrink-0 shadow-2xs">
                        VC
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-bold text-small text-slate-900 truncate">Vannak Chhay</h4>
                          <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" title="Online" />
                        </div>
                        <p className="text-caption text-slate-500 truncate">ITC · Tech & Transport</p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-small font-extrabold font-mono text-teal-700">$3 trial</div>
                      <div className="flex items-center gap-0.5 text-caption font-bold text-amber-500">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span>4.9</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Banner inside Card */}
                  <div className="pt-2 flex items-center justify-between text-caption text-slate-500 border-t border-slate-100">
                    <span className="flex items-center gap-1 text-teal-800 font-semibold">
                      <GraduationCap className="w-3.5 h-3.5 text-teal-600" />
                      <span>Cambodian Top Universities</span>
                    </span>
                    <button
                      onClick={onFindTutor}
                      className="text-[#0F766E] font-bold hover:underline flex items-center gap-0.5"
                    >
                      <span>View all 8 tutors</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                </div>

              </div>
            </div>

          </div>

        </div>

      </section>

      {/* 2. "HOW IT WORKS" 3 STEPS (Horizontal cards desktop, vertical list mobile) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto space-y-1.5 mb-6">
          <Badge variant="default" size="sm">Simple 3-Step Process</Badge>
          <h2 className="text-h2 font-extrabold text-slate-900 tracking-tight">
            How KhmerTutorial Online Works
          </h2>
          <p className="text-small text-slate-600">
            Start speaking genuine conversational Khmer with zero long-term commitments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Step 1 */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 shadow-xs hover:border-teal-300 transition-colors flex md:flex-col items-start gap-4 md:gap-0">
            <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-200/80 flex items-center justify-center text-teal-700 shrink-0 shadow-2xs">
              <UserCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-caption font-mono font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                  STEP 01
                </span>
                <h3 className="font-bold text-slate-900 text-small sm:text-body">
                  Choose a verified tutor
                </h3>
              </div>
              <p className="text-small text-slate-600 mt-1 leading-relaxed">
                Browse student profiles from RUPP, ITC, and NUM. Filter by daily focus areas, watch intro videos, and check student reviews.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 shadow-xs hover:border-amber-300 transition-colors flex md:flex-col items-start gap-4 md:gap-0">
            <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center justify-center text-amber-700 shrink-0 shadow-2xs">
              <CalendarCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-caption font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                  STEP 02
                </span>
                <h3 className="font-bold text-slate-900 text-small sm:text-body">
                  Book a $3 trial lesson
                </h3>
              </div>
              <p className="text-small text-slate-600 mt-1 leading-relaxed">
                Pick an available 30-min slot. Pay with instant local ABA PayWay, Bakong KHQR, or international card with 100% money-back guarantee.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 shadow-xs hover:border-teal-300 transition-colors flex md:flex-col items-start gap-4 md:gap-0">
            <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-200/80 flex items-center justify-center text-teal-700 shrink-0 shadow-2xs">
              <Video className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-caption font-mono font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                  STEP 03
                </span>
                <h3 className="font-bold text-slate-900 text-small sm:text-body">
                  Learn on 1-on-1 video call
                </h3>
              </div>
              <p className="text-small text-slate-600 mt-1 leading-relaxed">
                Meet your tutor on Google Meet or Zoom. Practice practical real-life dialogues, pronunciation, and slang at your own comfortable pace.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. POPULAR FOCUS SHORTCUTS (4 tappable cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h2 className="text-h3 font-bold text-slate-900 tracking-tight">
              Popular Learning Goals
            </h2>
            <p className="text-caption sm:text-small text-slate-500">
              Tap any category to filter available tutors who specialize in that curriculum.
            </p>
          </div>
          <button
            onClick={() => handleFocusShortcut('All Focuses')}
            className="text-caption font-bold text-teal-700 hover:underline self-start sm:self-auto"
          >
            Reset to All Focuses
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          
          {/* Shortcut 1: Conversational */}
          <button
            type="button"
            onClick={() => handleFocusShortcut('Conversational')}
            className={`p-4 rounded-2xl border text-left transition-all group cursor-pointer shadow-2xs ${
              selectedFocus === 'Conversational'
                ? 'bg-teal-50 border-teal-600 ring-2 ring-teal-600/20'
                : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-teal-300'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-teal-100/70 text-teal-800 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div className="font-bold text-small text-slate-900 group-hover:text-teal-800 transition-colors">
              Conversational
            </div>
            <p className="text-caption text-slate-500 mt-0.5 line-clamp-1">
              Daily greetings & friendly small talk
            </p>
          </button>

          {/* Shortcut 2: Travel Khmer */}
          <button
            type="button"
            onClick={() => handleFocusShortcut('Travel Khmer')}
            className={`p-4 rounded-2xl border text-left transition-all group cursor-pointer shadow-2xs ${
              selectedFocus === 'Travel Khmer'
                ? 'bg-teal-50 border-teal-600 ring-2 ring-teal-600/20'
                : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-teal-300'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-amber-100/70 text-amber-800 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
              <Compass className="w-5 h-5" />
            </div>
            <div className="font-bold text-small text-slate-900 group-hover:text-teal-800 transition-colors">
              Travel Khmer
            </div>
            <p className="text-caption text-slate-500 mt-0.5 line-clamp-1">
              Tuk-tuks, markets & ordering food
            </p>
          </button>

          {/* Shortcut 3: Business Khmer */}
          <button
            type="button"
            onClick={() => handleFocusShortcut('Business Khmer')}
            className={`p-4 rounded-2xl border text-left transition-all group cursor-pointer shadow-2xs ${
              selectedFocus === 'Business Khmer'
                ? 'bg-teal-50 border-teal-600 ring-2 ring-teal-600/20'
                : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-teal-300'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-teal-100/70 text-teal-800 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
              <Briefcase className="w-5 h-5" />
            </div>
            <div className="font-bold text-small text-slate-900 group-hover:text-teal-800 transition-colors">
              Business Khmer
            </div>
            <p className="text-caption text-slate-500 mt-0.5 line-clamp-1">
              Workplace meetings & NGO vocabulary
            </p>
          </button>

          {/* Shortcut 4: Script & Reading */}
          <button
            type="button"
            onClick={() => handleFocusShortcut('Script & Reading')}
            className={`p-4 rounded-2xl border text-left transition-all group cursor-pointer shadow-2xs ${
              selectedFocus === 'Script & Reading'
                ? 'bg-teal-50 border-teal-600 ring-2 ring-teal-600/20'
                : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-teal-300'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-amber-100/70 text-amber-800 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="font-bold text-small text-slate-900 group-hover:text-teal-800 transition-colors">
              Script & Reading
            </div>
            <p className="text-caption text-slate-500 mt-0.5 line-clamp-1">
              33 consonants, vowels & road signs
            </p>
          </button>

        </div>
      </section>

      {/* 4. RESULTS SECTION HEADING (Anchor for smooth scroll) */}
      <section id="tutors-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Available tutors
            </h2>
            <span className="text-caption font-bold text-teal-800 bg-teal-50 border border-teal-200 px-2.5 py-0.5 rounded-full">
              {totalTutors} {totalTutors === 1 ? 'tutor' : 'tutors'}
            </span>
            {selectedFocus !== 'All Focuses' && (
              <span className="text-caption font-medium text-slate-500 hidden sm:inline">
                in <strong className="text-teal-800">{selectedFocus}</strong>
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <label htmlFor="tutor-sort-select" className="text-caption font-medium text-slate-500">
              Sort by:
            </label>
            <select
              id="tutor-sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-small text-slate-800 font-semibold focus:ring-2 focus:ring-[#0F766E] outline-none cursor-pointer shadow-2xs"
            >
              <option value="rating">Highest Rated</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="popular">Most Lessons Taught</option>
              <option value="students">Most Active Students</option>
            </select>
          </div>
        </div>
      </section>

    </div>
  );
};
