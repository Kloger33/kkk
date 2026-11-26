import React, { useState } from 'react';
import {
  Star,
  Search,
  X,
  SlidersHorizontal,
  Sparkles,
  Heart,
  Clock,
  DollarSign,
  ArrowUpDown,
  RotateCcw,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export interface PreplyFiltersProps {
  selectedFocus: string;
  setSelectedFocus: (focus: string) => void;
  priceFilter: string;
  setPriceFilter: (price: string) => void;
  timeFilter: string;
  setTimeFilter: (time: string) => void;
  superTutorOnly: boolean;
  setSuperTutorOnly: (val: boolean) => void;
  savedOnly: boolean;
  setSavedOnly: (val: boolean) => void;
  savedCount?: number;
  sortBy: string;
  setSortBy: (sort: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  totalResults: number;
  onResetFilters: () => void;
}

const FOCUS_OPTIONS = [
  'All Focuses',
  'Conversational',
  'Travel Khmer',
  'Business Khmer',
  'Script & Reading',
  'Pronunciation',
];

export const PreplyFilters: React.FC<PreplyFiltersProps> = ({
  selectedFocus,
  setSelectedFocus,
  priceFilter,
  setPriceFilter,
  timeFilter,
  setTimeFilter,
  superTutorOnly,
  setSuperTutorOnly,
  savedOnly,
  setSavedOnly,
  savedCount = 0,
  sortBy,
  setSortBy,
  searchQuery,
  setSearchQuery,
  totalResults,
  onResetFilters,
}) => {
  const { t } = useLanguage();
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false);

  const hasActiveFilters =
    selectedFocus !== 'All Focuses' ||
    priceFilter !== 'all' ||
    timeFilter !== 'all' ||
    superTutorOnly ||
    savedOnly ||
    searchQuery.trim().length > 0;

  return (
    <section className="bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-[64px] lg:top-[72px] z-30">
      <div className="max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-3.5 space-y-3">
        {/* ROW 1: Search Input + Focus Pills */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md min-w-0">
            <Search className="w-4 h-4 text-[#6B7287] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('filters.searchPlaceholder')}
              className="w-full h-10 pl-10 pr-9 bg-[#F3F5F9] border border-slate-200 rounded-[10px] text-xs sm:text-sm text-[#172033] placeholder:text-[#6B7287] focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#2445C8]/25 focus:border-[#2445C8] transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[#6B7287] hover:text-[#172033] cursor-pointer"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Horizontal Focus Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
            {FOCUS_OPTIONS.map((focus) => {
              const active = selectedFocus === focus;
              return (
                <button
                  key={focus}
                  type="button"
                  onClick={() => setSelectedFocus(focus)}
                  className={`px-3 py-1.5 rounded-[10px] text-xs font-semibold whitespace-nowrap border transition-all cursor-pointer shrink-0 ${
                    active
                      ? 'bg-[#172033] text-white border-[#172033]'
                      : 'bg-[#F3F5F9] text-slate-600 border-slate-200 hover:border-[#2445C8]/40 hover:text-[#172033]'
                  }`}
                >
                  {focus === 'All Focuses' ? t('filters.allFocuses') : focus}
                </button>
              );
            })}
          </div>
        </div>

        {/* MOBILE ACTION ROW (<640px) */}
        <div className="flex sm:hidden items-center justify-between gap-2 pt-1">
          <button
            type="button"
            onClick={() => setMobileSheetOpen(true)}
            className="flex-1 h-10 px-3 rounded-[10px] bg-[#F3F5F9] border border-slate-200 text-xs font-medium text-[#172033] flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#2445C8]" />
            <span>Filters & Sort</span>
            {hasActiveFilters && <span className="w-2 h-2 rounded-[8px] bg-[#2445C8]" />}
          </button>

          <button
            type="button"
            onClick={() => setSavedOnly(!savedOnly)}
            className={`h-10 px-3 rounded-[10px] border text-xs font-medium flex items-center gap-1.5 cursor-pointer ${
              savedOnly
                ? 'bg-[#2445C8]/10 border-[#2445C8] text-[#2445C8]'
                : 'bg-white border-slate-200 text-slate-700'
            }`}
            aria-pressed={savedOnly}
          >
            <Heart className={`w-3.5 h-3.5 ${savedOnly ? 'fill-[#2445C8] text-[#2445C8]' : 'text-[#6B7287]'}`} />
            <span>{t('filters.savedTutors')}</span>
            {savedCount > 0 && (
              <span className="text-xs tabular-nums px-1.5 rounded-[8px] bg-slate-100 text-[#172033]">
                {savedCount}
              </span>
            )}
          </button>
        </div>

        {/* ROW 2: Desktop Price / Time / Super Tutor / Saved / Sort */}
        <div className="hidden sm:flex flex-wrap items-center justify-between gap-2.5 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            {/* Price Dropdown */}
            <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-[10px] px-2.5 py-1.5">
              <DollarSign className="w-3.5 h-3.5 text-[#6B7287] stroke-[2]" />
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="bg-transparent text-xs text-[#172033] font-semibold focus:outline-hidden cursor-pointer"
                aria-label="Filter by Hourly Rate"
              >
                <option value="all">Any Price</option>
                <option value="under8">Under $8 / hr</option>
                <option value="8to10">$8 – $10 / hr</option>
                <option value="above10">$10+ / hr</option>
              </select>
            </div>

            {/* Availability Time Dropdown */}
            <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-[10px] px-2.5 py-1.5">
              <Clock className="w-4 h-4 text-[#6B7287] stroke-[2]" />
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="bg-transparent text-xs text-[#172033] font-semibold focus:outline-hidden cursor-pointer"
                aria-label="Filter by Availability"
              >
                <option value="all">Any Time</option>
                <option value="morning">Morning (before 12 PM)</option>
                <option value="afternoon">Afternoon (12 – 5 PM)</option>
                <option value="evening">Evening (after 5 PM)</option>
              </select>
            </div>

            <button
              type="button"
              onClick={() => setSuperTutorOnly(!superTutorOnly)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] border transition-all cursor-pointer font-semibold ${
                superTutorOnly
                  ? 'bg-[#F2B23A]/20 border-[#F2B23A] text-[#172033]'
                  : 'bg-white border-slate-200 text-slate-600 hover:text-[#172033]'
              }`}
            >
              <Star
                className={`w-3.5 h-3.5 stroke-[2] ${
                  superTutorOnly ? 'text-[#F2B23A] fill-[#F2B23A]' : 'text-[#6B7287]'
                }`}
              />
              <span>{t('filters.superTutors')}</span>
            </button>

            <button
              type="button"
              onClick={() => setSavedOnly(!savedOnly)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] border transition-all cursor-pointer font-semibold ${
                savedOnly
                  ? 'bg-[#2445C8]/10 border-[#2445C8] text-[#2445C8]'
                  : 'bg-white border-slate-200 text-slate-600 hover:text-[#172033]'
              }`}
              aria-pressed={savedOnly}
            >
              <Heart
                className={`w-3.5 h-3.5 stroke-[2] ${
                  savedOnly ? 'text-[#2445C8] fill-[#2445C8]' : 'text-[#6B7287]'
                }`}
              />
              <span>{t('filters.savedTutors')}</span>
              {savedCount > 0 && (
                <span
                  className={`text-xs tabular-nums font-medium px-1.5 py-0.2 rounded-[8px] ${
                    savedOnly ? 'bg-[#2445C8] text-white' : 'bg-slate-200 text-[#172033]'
                  }`}
                >
                  {savedCount}
                </span>
              )}
            </button>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={onResetFilters}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-[10px] text-[#545B70] hover:text-[#2445C8] hover:bg-[#F3F5F9] font-semibold cursor-pointer transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t('filters.reset')}</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[#6B7287] tabular-nums text-[13px] hidden md:inline">
              {totalResults} {t('filters.foundSuffix')}
            </span>
            <ArrowUpDown className="w-4 h-4 text-[#6B7287] stroke-[2]" />
            <span className="text-[#545B70] font-medium">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-slate-200 rounded-[10px] px-2.5 py-1.5 text-xs text-[#172033] font-semibold focus:outline-hidden cursor-pointer"
              aria-label="Sort Tutors"
            >
              <option value="rating">Highest Rated</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="popular">Most Lessons Taught</option>
              <option value="students">Most Active Students</option>
            </select>
          </div>
        </div>
      </div>

      {/* MOBILE BOTTOM SHEET FOR SECONDARY FILTERS (<640px) */}
      {mobileSheetOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end bg-[#172033]/60 backdrop-blur-xs sm:hidden">
          <div className="fixed inset-0" onClick={() => setMobileSheetOpen(false)} />
          <div className="relative bg-white rounded-t-3xl p-5 space-y-4 z-10 max-h-[85vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-display font-medium text-base text-[#172033]">Filter & Sort Tutors</h3>
              <button
                type="button"
                onClick={() => setMobileSheetOpen(false)}
                className="p-2 rounded-[10px] text-[#6B7287] hover:text-[#172033] hover:bg-slate-100"
                aria-label="Close filters"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-medium text-[#172033] mb-1.5">Hourly Rate</label>
                <select
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value)}
                  className="w-full h-10 bg-[#F3F5F9] border border-slate-200 rounded-[10px] px-3 font-semibold text-[#172033]"
                >
                  <option value="all">Any Price</option>
                  <option value="under8">Under $8 / hr</option>
                  <option value="8to10">$8 – $10 / hr</option>
                  <option value="above10">$10+ / hr</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-[#172033] mb-1.5">Time of Day (GMT+7)</label>
                <select
                  value={timeFilter}
                  onChange={(e) => setTimeFilter(e.target.value)}
                  className="w-full h-10 bg-[#F3F5F9] border border-slate-200 rounded-[10px] px-3 font-semibold text-[#172033]"
                >
                  <option value="all">Any Time</option>
                  <option value="morning">Morning (before 12 PM)</option>
                  <option value="afternoon">Afternoon (12 – 5 PM)</option>
                  <option value="evening">Evening (after 5 PM)</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-[#172033] mb-1.5">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full h-10 bg-[#F3F5F9] border border-slate-200 rounded-[10px] px-3 font-semibold text-[#172033]"
                >
                  <option value="rating">Highest Rated</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="popular">Most Lessons Taught</option>
                  <option value="students">Most Active Students</option>
                </select>
              </div>

              <button
                type="button"
                onClick={() => setSuperTutorOnly(!superTutorOnly)}
                className={`w-full p-3 rounded-[10px] border flex items-center justify-between ${
                  superTutorOnly
                    ? 'bg-[#F2B23A]/15 border-[#F2B23A] text-[#172033]'
                    : 'bg-white border-slate-200 text-slate-600'
                }`}
              >
                <span className="font-medium flex items-center gap-2">
                  <Star className={`w-4 h-4 ${superTutorOnly ? 'text-[#F2B23A] fill-[#F2B23A]' : 'text-[#6B7287]'}`} />
                  {t('filters.superTutors')}
                </span>
                <span className="tabular-nums text-[13px]">{superTutorOnly ? 'ON' : 'OFF'}</span>
              </button>

              <button
                type="button"
                onClick={() => setSavedOnly(!savedOnly)}
                className={`w-full p-3 rounded-[10px] border flex items-center justify-between ${
                  savedOnly
                    ? 'bg-[#2445C8]/10 border-[#2445C8] text-[#2445C8]'
                    : 'bg-white border-slate-200 text-slate-600'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Heart className={`w-4 h-4 stroke-[2] ${savedOnly ? 'text-[#2445C8] fill-[#2445C8]' : 'text-[#6B7287]'}`} />
                  <div className="font-medium text-xs text-[#172033]">{t('filters.savedTutors')}</div>
                </div>
                <span className="tabular-nums text-[13px]">{savedCount}</span>
              </button>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  onResetFilters();
                  setMobileSheetOpen(false);
                }}
                className="px-4 h-11 rounded-[10px] border border-slate-200 font-medium text-xs text-slate-600"
              >
                {t('filters.reset')}
              </button>
              <button
                type="button"
                onClick={() => setMobileSheetOpen(false)}
                className="flex-1 h-11 rounded-[10px] bg-[#2445C8] text-white font-medium text-xs"
              >
                Show {totalResults} Tutors
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
