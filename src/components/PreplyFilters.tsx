import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Search, 
  X, 
  SlidersHorizontal, 
  Sparkles, 
  Sunrise, 
  Sun, 
  Moon, 
  Check, 
  ChevronDown,
  RotateCcw
} from 'lucide-react';
import { Button, Sheet, Chip, Badge } from './ui';

export interface PreplyFiltersProps {
  selectedFocus: string;
  setSelectedFocus: (focus: string) => void;
  priceFilter: string;
  setPriceFilter: (price: string) => void;
  timeFilter: string;
  setTimeFilter: (time: string) => void;
  superTutorOnly: boolean;
  setSuperTutorOnly: (val: boolean) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  totalResults: number;
  onResetFilters: () => void;
}

export const PreplyFilters: React.FC<PreplyFiltersProps> = ({
  selectedFocus,
  setSelectedFocus,
  priceFilter,
  setPriceFilter,
  timeFilter,
  setTimeFilter,
  superTutorOnly,
  setSuperTutorOnly,
  sortBy,
  setSortBy,
  searchQuery,
  setSearchQuery,
  totalResults,
  onResetFilters,
}) => {
  const [isSheetOpen, setIsSheetOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('sheet') === 'filters' || window.location.hash === '#filters';
    }
    return false;
  });
  const [localSearch, setLocalSearch] = useState(searchQuery);

  useEffect(() => {
    const handleCheckOpen = () => {
      const params = new URLSearchParams(window.location.search);
      if (params.get('sheet') === 'filters' || window.location.hash === '#filters') {
        setIsSheetOpen(true);
      }
    };
    handleCheckOpen();
    window.addEventListener('popstate', handleCheckOpen);
    window.addEventListener('hashchange', handleCheckOpen);
    return () => {
      window.removeEventListener('popstate', handleCheckOpen);
      window.removeEventListener('hashchange', handleCheckOpen);
    };
  }, []);

  const handleCloseSheet = () => {
    setIsSheetOpen(false);
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      let changed = false;
      if (params.get('sheet') === 'filters') {
        params.delete('sheet');
        changed = true;
      }
      const hash = window.location.hash === '#filters' ? '' : window.location.hash;
      const qs = params.toString();
      const pathWithQuery = qs ? `${window.location.pathname}?${qs}` : window.location.pathname;
      window.history.replaceState(null, '', pathWithQuery + hash);
    }
  };

  // Sync internal search when parent searchQuery prop changes (e.g. from Hero or Reset)
  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  // Debounce search input by 200ms for fast responsive typing without lag
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearch !== searchQuery) {
        setSearchQuery(localSearch);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [localSearch, searchQuery, setSearchQuery]);

  const focusOptions = [
    'All Focuses',
    'Conversational',
    'Travel Khmer',
    'Business Khmer',
    'Script & Reading',
  ];

  const priceOptions = [
    { id: 'all', label: 'Any Price' },
    { id: 'under8', label: 'Under $8 / hr' },
    { id: '8to10', label: '$8 – $10 / hr' },
    { id: 'above10', label: '$10+ / hr' },
  ];

  const timeOptions = [
    { id: 'all', label: 'Any Time', icon: null },
    { id: 'morning', label: 'Morning (before 12 PM)', shortLabel: 'Morning', icon: <Sunrise className="w-4 h-4" /> },
    { id: 'afternoon', label: 'Afternoon (12 – 5 PM)', shortLabel: 'Afternoon', icon: <Sun className="w-4 h-4" /> },
    { id: 'evening', label: 'Evening (after 5 PM)', shortLabel: 'Evening', icon: <Moon className="w-4 h-4" /> },
  ];

  const sortOptions = [
    { id: 'rating', label: 'Highest Rated' },
    { id: 'price-asc', label: 'Price: Low to High' },
    { id: 'price-desc', label: 'Price: High to Low' },
    { id: 'popular', label: 'Most Lessons Taught' },
    { id: 'students', label: 'Most Active Students' },
  ];

  // Active filter count for badge
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedFocus !== 'All Focuses') count++;
    if (priceFilter !== 'all') count++;
    if (timeFilter !== 'all') count++;
    if (superTutorOnly) count++;
    if (searchQuery.trim().length > 0) count++;
    if (sortBy !== 'rating') count++;
    return count;
  }, [selectedFocus, priceFilter, timeFilter, superTutorOnly, searchQuery, sortBy]);

  const hasActiveFilters = activeFilterCount > 0;

  return (
    <div className="sticky top-18 z-20 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 space-y-2">
        
        {/* ============================================================== */}
        {/* MOBILE LAYOUT (< md): Search + Filter Button, Scrollable Chips */}
        {/* ============================================================== */}
        <div className="md:hidden space-y-2">
          
          {/* Sticky Row 1: Search input + "Filters" button with count badge */}
          <div className="flex items-center gap-2">
            
            {/* Accessible Search Input (16px font prevents iOS Safari auto-zoom) */}
            <div className="relative flex-1">
              <label htmlFor="mobile-filter-search" className="sr-only">
                Search Khmer tutors
              </label>
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="mobile-filter-search"
                type="text"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                placeholder="Search tutor, university, topic..."
                className="w-full min-h-[44px] text-[16px] pl-10 pr-9 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/20 outline-none transition-all"
              />
              {localSearch && (
                <button
                  type="button"
                  aria-label="Clear search input"
                  onClick={() => {
                    setLocalSearch('');
                    setSearchQuery('');
                  }}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-full"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* "Filters" Button opening Sheet */}
            <button
              type="button"
              onClick={() => setIsSheetOpen(true)}
              className={`min-h-[44px] px-3.5 rounded-xl border font-semibold text-small flex items-center gap-1.5 shrink-0 transition-all cursor-pointer shadow-2xs ${
                activeFilterCount > 0
                  ? 'bg-teal-50 border-teal-600 text-teal-900 ring-1 ring-teal-600/30'
                  : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4 text-teal-700" />
              <span>Filters</span>
              {activeFilterCount > 0 && (
                <span className="w-5 h-5 bg-[#0F766E] text-white text-caption font-bold rounded-full flex items-center justify-center ml-0.5">
                  {activeFilterCount}
                </span>
              )}
            </button>

          </div>

          {/* Sticky Row 2: Horizontally scrollable row of Focus Chips with fade hint */}
          <div className="relative">
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none snap-x py-1 pr-6">
              {focusOptions.map((focus) => (
                <Chip
                  key={focus}
                  size="sm"
                  selected={selectedFocus === focus}
                  onToggle={() => setSelectedFocus(focus)}
                  className="shrink-0 snap-start"
                >
                  {focus}
                </Chip>
              ))}
            </div>
            {/* Fade edge hint */}
            <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-white to-transparent pointer-events-none" />
          </div>

        </div>

        {/* ============================================================== */}
        {/* DESKTOP LAYOUT (≥ md): Focus Chips + Dropdowns + Toggle + Search */}
        {/* ============================================================== */}
        <div className="hidden md:flex items-center justify-between gap-4">
          
          {/* Left Zone: Focus Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            {focusOptions.map((focus) => (
              <Chip
                key={focus}
                size="sm"
                selected={selectedFocus === focus}
                onToggle={() => setSelectedFocus(focus)}
                className="shrink-0"
              >
                {focus}
              </Chip>
            ))}
          </div>

          {/* Middle/Right Zone: Dropdowns, Super Tutor Toggle, Search */}
          <div className="flex items-center gap-2.5 shrink-0">
            
            {/* Price Select Popover */}
            <div className="relative">
              <select
                aria-label="Filter by price"
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className={`min-h-[38px] pl-3 pr-8 py-1.5 text-small font-semibold rounded-xl border cursor-pointer outline-none transition-all appearance-none ${
                  priceFilter !== 'all'
                    ? 'bg-teal-50 border-teal-600 text-teal-900 ring-1 ring-teal-600/30'
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                {priceOptions.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Time of Day Select Popover */}
            <div className="relative">
              <select
                aria-label="Filter by time availability"
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className={`min-h-[38px] pl-3 pr-8 py-1.5 text-small font-semibold rounded-xl border cursor-pointer outline-none transition-all appearance-none ${
                  timeFilter !== 'all'
                    ? 'bg-teal-50 border-teal-600 text-teal-900 ring-1 ring-teal-600/30'
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                {timeOptions.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Super Tutor Toggle */}
            <button
              type="button"
              role="switch"
              aria-checked={superTutorOnly}
              onClick={() => setSuperTutorOnly(!superTutorOnly)}
              className={`min-h-[38px] px-3 py-1.5 rounded-xl border text-small font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs ${
                superTutorOnly
                  ? 'bg-amber-50 border-amber-300 text-amber-900 ring-1 ring-amber-400/40'
                  : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              <Sparkles className={`w-3.5 h-3.5 ${superTutorOnly ? 'text-amber-500 fill-amber-500' : 'text-slate-400'}`} />
              <span>Super Tutors</span>
            </button>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                aria-label="Sort tutors by"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={`min-h-[38px] pl-3 pr-8 py-1.5 text-small font-semibold rounded-xl border cursor-pointer outline-none transition-all appearance-none ${
                  sortBy !== 'rating'
                    ? 'bg-teal-50 border-teal-600 text-teal-900 ring-1 ring-teal-600/30'
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                {sortOptions.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Desktop Search Input */}
            <div className="relative w-56 lg:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                placeholder="Search tutors..."
                className="w-full min-h-[38px] text-small pl-8 pr-7 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#0F766E] outline-none transition-all"
              />
              {localSearch && (
                <button
                  type="button"
                  aria-label="Clear search input"
                  onClick={() => {
                    setLocalSearch('');
                    setSearchQuery('');
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Clear All Link when filters active */}
            {hasActiveFilters && (
              <button
                type="button"
                onClick={onResetFilters}
                className="text-small font-semibold text-rose-600 hover:text-rose-800 hover:underline flex items-center gap-1 cursor-pointer ml-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Clear all</span>
              </button>
            )}

          </div>

        </div>

        {/* ============================================================== */}
        {/* APPLIED REMOVABLE FILTER PILLS (Both Mobile & Desktop) */}
        {/* ============================================================== */}
        {hasActiveFilters && (
          <div className="pt-2 flex flex-wrap items-center gap-1.5 text-caption">
            <span className="text-slate-400 font-medium">Applied:</span>

            {/* Focus Pill */}
            {selectedFocus !== 'All Focuses' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 font-semibold shadow-2xs">
                <span>{selectedFocus}</span>
                <button
                  type="button"
                  aria-label={`Remove ${selectedFocus} focus filter`}
                  onClick={() => setSelectedFocus('All Focuses')}
                  className="hover:bg-teal-200/60 p-0.5 rounded-full cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {/* Price Pill */}
            {priceFilter !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 font-semibold shadow-2xs">
                <span>
                  {priceFilter === 'under8' && 'Under $8'}
                  {priceFilter === '8to10' && '$8 – $10'}
                  {priceFilter === 'above10' && '$10+'}
                </span>
                <button
                  type="button"
                  aria-label="Remove price filter"
                  onClick={() => setPriceFilter('all')}
                  className="hover:bg-teal-200/60 p-0.5 rounded-full cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {/* Time Pill */}
            {timeFilter !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 font-semibold shadow-2xs">
                <span>
                  {timeFilter === 'morning' && 'Morning'}
                  {timeFilter === 'afternoon' && 'Afternoon'}
                  {timeFilter === 'evening' && 'Evening'}
                </span>
                <button
                  type="button"
                  aria-label="Remove time filter"
                  onClick={() => setTimeFilter('all')}
                  className="hover:bg-teal-200/60 p-0.5 rounded-full cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {/* Super Tutor Pill */}
            {superTutorOnly && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 font-semibold shadow-2xs">
                <span>Super Tutors</span>
                <button
                  type="button"
                  aria-label="Remove Super Tutors filter"
                  onClick={() => setSuperTutorOnly(false)}
                  className="hover:bg-amber-200/60 p-0.5 rounded-full cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {/* Search Pill */}
            {searchQuery.trim() && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-800 font-semibold shadow-2xs">
                <span>"{searchQuery.trim()}"</span>
                <button
                  type="button"
                  aria-label="Clear search filter"
                  onClick={() => {
                    setLocalSearch('');
                    setSearchQuery('');
                  }}
                  className="hover:bg-slate-200 p-0.5 rounded-full cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {/* Reset All */}
            <button
              type="button"
              onClick={onResetFilters}
              className="text-caption font-bold text-slate-500 hover:text-slate-800 hover:underline ml-1 cursor-pointer"
            >
              Reset all
            </button>
          </div>
        )}

      </div>

      {/* ============================================================== */}
      {/* MOBILE BOTTOM SHEET FOR ADVANCED FILTERS */}
      {/* ============================================================== */}
      <Sheet
        isOpen={isSheetOpen}
        onClose={handleCloseSheet}
        title="Filter Tutors"
        description="Narrow down tutors by price, availability, and tier."
        footer={
          <div className="flex items-center justify-between gap-3">
            <Button
              variant="ghost"
              size="md"
              onClick={() => {
                onResetFilters();
              }}
              className="text-slate-500 hover:text-slate-800"
            >
              Clear all
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={handleCloseSheet}
              className="flex-1"
            >
              Show {totalResults} {totalResults === 1 ? 'tutor' : 'tutors'}
            </Button>
          </div>
        }
      >
        <div className="space-y-6 pb-2">
          
          {/* Section 1: Price Segmented Chips */}
          <div className="space-y-2.5">
            <label className="text-small font-bold text-slate-900 block">
              Hourly Price Range
            </label>
            <div className="grid grid-cols-2 gap-2">
              {priceOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  aria-pressed={priceFilter === opt.id}
                  onClick={() => setPriceFilter(opt.id)}
                  className={`min-h-[44px] px-3 py-2 rounded-xl border text-small font-semibold transition-all cursor-pointer text-center ${
                    priceFilter === opt.id
                      ? 'bg-teal-50 border-teal-600 text-teal-900 ring-2 ring-teal-600/20'
                      : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Section 2: Time of Day with Icons */}
          <div className="space-y-2.5">
            <label className="text-small font-bold text-slate-900 block">
              Time of Day Availability
            </label>
            <div className="grid grid-cols-2 gap-2">
              {timeOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  aria-pressed={timeFilter === opt.id}
                  onClick={() => setTimeFilter(opt.id)}
                  className={`min-h-[44px] px-3 py-2 rounded-xl border text-small font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    timeFilter === opt.id
                      ? 'bg-teal-50 border-teal-600 text-teal-900 ring-2 ring-teal-600/20'
                      : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  {opt.icon && <span className="text-teal-700">{opt.icon}</span>}
                  <span>{opt.shortLabel || opt.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Section 3: Super Tutor Real Switch Toggle */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4">
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5 font-bold text-small text-slate-900">
                <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>Super Tutors Only</span>
              </div>
              <p className="text-caption text-slate-500 leading-snug">
                Verified top tutors with 95%+ attendance and outstanding reviews.
              </p>
            </div>

            {/* Accessible Switch */}
            <button
              type="button"
              role="switch"
              aria-checked={superTutorOnly}
              aria-label="Filter by Super Tutors only"
              onClick={() => setSuperTutorOnly(!superTutorOnly)}
              className={`w-12 h-7 rounded-full p-1 transition-colors cursor-pointer relative shrink-0 focus-visible:ring-2 focus-visible:ring-[#0F766E] ${
                superTutorOnly ? 'bg-[#0F766E]' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-200 ${
                  superTutorOnly ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Section 4: Sort as Radio List */}
          <div className="space-y-2.5">
            <label className="text-small font-bold text-slate-900 block">
              Sort Order
            </label>
            <div role="radiogroup" aria-label="Sort options" className="space-y-1.5">
              {sortOptions.map((opt) => {
                const isSelected = sortBy === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => setSortBy(opt.id)}
                    className={`w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border text-left flex items-center justify-between text-small font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-teal-50/70 border-teal-600 text-teal-900 ring-1 ring-teal-600/30'
                        : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <span>{opt.label}</span>
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'border-[#0F766E] bg-[#0F766E] text-white'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </Sheet>

    </div>
  );
};
