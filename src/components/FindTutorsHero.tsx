import React from 'react';
import {
  Search,
  Star,
  ShieldCheck,
  GraduationCap,
  Clock,
  CheckCircle2,
  Calendar,
  Users,
  ArrowDown,
  MessageSquare,
} from 'lucide-react';
import { Tutor } from '../data/tutorsData';
import { useLanguage } from '../context/LanguageContext';

interface FindTutorsHeroProps {
  onFindTutorClick: () => void;
  onBookTrialClick: () => void;
  featuredTutor?: Tutor;
  onOpenVideoModal?: (tutor: Tutor) => void;
}

export const FindTutorsHero: React.FC<FindTutorsHeroProps> = ({
  onFindTutorClick,
  onBookTrialClick,
  featuredTutor,
}) => {
  const { t } = useLanguage();
  const displayTutor = featuredTutor;

  return (
    <div className="bg-[#F7F6F2] border-b border-slate-200/90 pt-6 sm:pt-10 lg:pt-12 pb-8 sm:pb-12 overflow-hidden">
      <div className="max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2445C8] bg-[#2445C8]/8 border border-[#2445C8]/20 px-3 py-1 rounded-full">
                <ShieldCheck className="w-4 h-4 stroke-[2]" />
                <span>{t('hero.kicker')}</span>
              </span>
              <span className="text-xs text-slate-500 font-medium">· Phnom Penh</span>
            </div>

            <h1 className="font-display hero-headline font-extrabold text-[#14213D] tracking-tight">
              {t('hero.title')}
            </h1>

            <p className="body-fluid text-slate-600 font-normal leading-relaxed max-w-2xl">
              {t('hero.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1 sm:pt-2">
              <button
                onClick={onFindTutorClick}
                className="w-full sm:w-auto min-h-[48px] px-6 py-3.5 rounded-xl bg-[#2445C8] hover:bg-[#1c37a4] text-white font-bold text-sm sm:text-base shadow-sm transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <Search className="w-5 h-5 stroke-[2]" />
                <span>{t('hero.ctaPrimary')}</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform stroke-[2]" />
              </button>

              <button
                onClick={onBookTrialClick}
                className="w-full sm:w-auto min-h-[48px] px-6 py-3.5 rounded-xl bg-[#14213D] hover:bg-[#1f3157] text-white font-bold text-sm sm:text-base shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-5 h-5 text-[#F2A531] stroke-[2]" />
                <span>
                  {displayTutor ? `Book $${displayTutor.trialPrice} Trial` : t('hero.ctaSecondary')}
                </span>
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-slate-600 pt-1">
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#2445C8] stroke-[2]" />
                <span>{t('hero.guarantee1')}</span>
              </span>
              <span className="text-slate-300 hidden sm:inline">·</span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#2445C8] stroke-[2]" />
                <span>{t('hero.guarantee2')}</span>
              </span>
            </div>
          </div>

          {/* Right Column: Featured Tutor Card */}
          <div className="lg:col-span-5 w-full max-w-[480px] mx-auto lg:max-w-none">
            <div className="relative">
              <div className="relative z-10 bg-white border border-slate-200/90 rounded-3xl p-4 sm:p-6 shadow-[0_12px_32px_rgba(20,33,61,0.06)] space-y-4">
                <div className="relative rounded-2xl bg-[#14213D] p-3.5 sm:p-4 text-white overflow-hidden">
                  <div className="flex items-center justify-between pb-2.5 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#F2A531]" />
                      <span className="text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-[#F2A531]">
                        1-on-1 Class Preview
                      </span>
                    </div>
                    <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full font-mono">
                      Phnom Penh · ICT
                    </span>
                  </div>

                  <div className="py-3 flex items-center gap-3 sm:gap-3.5">
                    <div className="relative shrink-0">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#2445C8] text-white font-display font-bold text-lg sm:text-xl flex items-center justify-center border border-white/20">
                        {displayTutor?.initials || 'BS'}
                      </div>
                      <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-[#14213D] rounded-full" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-display font-bold text-sm sm:text-base text-white truncate">
                          {displayTutor?.name || 'Bopha Seng'}
                        </span>
                        <span className="text-[10px] bg-[#F2A531] text-[#14213D] font-bold px-1.5 py-0.5 rounded font-mono">
                          Super Tutor
                        </span>
                      </div>
                      <div className="text-xs text-slate-300 flex items-center gap-1 mt-0.5 truncate">
                        <GraduationCap className="w-3.5 h-3.5 text-[#F2A531] shrink-0 stroke-[2]" />
                        <span className="truncate">
                          {displayTutor?.university || 'Royal University of Phnom Penh (RUPP)'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-1 p-2.5 rounded-xl bg-white/8 border border-white/10 text-xs text-slate-100 flex items-start gap-2">
                    <MessageSquare className="w-4 h-4 text-[#F2A531] shrink-0 mt-0.5" />
                    <span className="italic leading-snug text-[11px] sm:text-xs">
                      “សួស្តី! Let us practice directing a tuk-tuk and ordering iced coffee.”
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div>
                    <div className="flex items-center gap-1 text-[#14213D]">
                      <Star className="w-4 h-4 text-[#F2A531] fill-[#F2A531] stroke-[2]" />
                      <span className="font-mono font-bold text-sm">
                        {(displayTutor?.rating ?? 5.0).toFixed(1)}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">
                        ({displayTutor?.reviewsCount ?? 48} reviews)
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5 font-mono">
                      <strong className="text-[#14213D] font-bold">
                        ${(displayTutor?.trialPrice ?? 4).toFixed(2)}
                      </strong>{' '}
                      trial · ${displayTutor?.hourlyRate ?? 8}/hr
                    </div>
                  </div>

                  <button
                    onClick={onBookTrialClick}
                    className="min-h-[40px] px-4 py-2 bg-[#2445C8] hover:bg-[#1c37a4] text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Book Trial</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                  <div className="bg-[#F7F6F2] border border-slate-200/80 rounded-xl px-2.5 py-1.5 flex items-center gap-2 text-xs">
                    <ShieldCheck className="w-4 h-4 text-[#2445C8] shrink-0 stroke-[2]" />
                    <div className="truncate">
                      <div className="font-bold text-[#14213D] text-[10px] sm:text-[11px] truncate">
                        100% Verified
                      </div>
                      <div className="text-[9px] text-slate-500 truncate">RUPP / ITC ID</div>
                    </div>
                  </div>

                  <div className="bg-[#F7F6F2] border border-slate-200/80 rounded-xl px-2.5 py-1.5 flex items-center gap-2 text-xs">
                    <Clock className="w-4 h-4 text-[#F2A531] shrink-0 stroke-[2]" />
                    <div className="truncate">
                      <div className="font-bold text-[#14213D] text-[10px] sm:text-[11px] truncate">
                        Fast Responder
                      </div>
                      <div className="text-[9px] text-slate-500 truncate">&lt; 15 min avg</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Signals Ribbon */}
        <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-slate-200/80">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
            <div className="flex items-start gap-2.5 sm:gap-3 p-2 rounded-xl">
              <div className="w-10 h-10 rounded-xl bg-[#2445C8]/10 border border-[#2445C8]/20 text-[#2445C8] flex items-center justify-center shrink-0">
                <Users className="w-5 h-5 stroke-[2]" />
              </div>
              <div className="min-w-0">
                <div className="text-lg sm:text-2xl font-black text-[#14213D] font-display tabular-nums">
                  48+
                </div>
                <div className="text-xs font-bold text-[#14213D] truncate">{t('hero.stat1')}</div>
                <div className="text-[11px] text-slate-500 leading-tight hidden sm:block">
                  Top university students
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2.5 sm:gap-3 p-2 rounded-xl">
              <div className="w-10 h-10 rounded-xl bg-[#F2A531]/15 border border-[#F2A531]/30 text-[#14213D] flex items-center justify-center shrink-0">
                <Star className="w-5 h-5 fill-[#F2A531] text-[#F2A531] stroke-[2]" />
              </div>
              <div className="min-w-0">
                <div className="text-lg sm:text-2xl font-black text-[#14213D] font-display tabular-nums">
                  4.9 / 5
                </div>
                <div className="text-xs font-bold text-[#14213D] truncate">{t('hero.stat2')}</div>
                <div className="text-[11px] text-slate-500 leading-tight hidden sm:block">
                  From verified learners
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2.5 sm:gap-3 p-2 rounded-xl">
              <div className="w-10 h-10 rounded-xl bg-[#14213D]/8 border border-[#14213D]/15 text-[#14213D] flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5 stroke-[2]" />
              </div>
              <div className="min-w-0">
                <div className="text-lg sm:text-2xl font-black text-[#14213D] font-display tabular-nums">
                  1,850+
                </div>
                <div className="text-xs font-bold text-[#14213D] truncate">{t('hero.stat3')}</div>
                <div className="text-[11px] text-slate-500 leading-tight hidden sm:block">
                  Safe escrow delivery
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2.5 sm:gap-3 p-2 rounded-xl">
              <div className="w-10 h-10 rounded-xl bg-[#2445C8]/10 border border-[#2445C8]/20 text-[#2445C8] flex items-center justify-center shrink-0">
                <GraduationCap className="w-5 h-5 stroke-[2]" />
              </div>
              <div className="min-w-0">
                <div className="text-lg sm:text-2xl font-black text-[#14213D] font-display tabular-nums">
                  6 Unis
                </div>
                <div className="text-xs font-bold text-[#14213D] truncate">{t('hero.stat4')}</div>
                <div className="text-[11px] text-slate-500 leading-tight hidden sm:block">
                  RUPP · ITC · NUM · PUC
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
