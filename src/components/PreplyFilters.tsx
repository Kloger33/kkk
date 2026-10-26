import React from 'react';
import { Search, X, SlidersHorizontal, Sparkles } from 'lucide-react';

interface PreplyFiltersProps {
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
  const focusOptions = [
    'All Focuses',
    'Conversational',
    'Business Khmer',
    'Script & Reading',
    'Travel Khmer',
  ];

  const hasActiveFilters =
    selectedFocus !== 'All Focuses' ||
    priceFilter !== 'all' ||
    timeFilter !== 'all' ||
    superTutorOnly ||
    searchQuery.trim().length > 0;

  return (
    <div className="bg-white border-b border-slate-200 py-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        
        {/* Row 1: Focus Tabs and Search Bar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          
          {/* Segmented Teaching Focus */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
            {focusOptions.map((focus) => (
              <button
                key={focus}
                onClick={() => setSelectedFocus(focus)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all whitespace-nowrap shrink-0 ${
                  selectedFocus === focus
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {focus}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative w-full lg:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by tutor, RUPP, ITC, or keyword..."
              className="w-full pl-9 pr-9 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-teal-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

        </div>

        {/* Row 2: Secondary Dropdown Filters & Sort */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
          
          <div className="flex flex-wrap items-center gap-3">
            {/* Price Filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500 font-medium">Price:</span>
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 font-medium focus:outline-none focus:border-teal-500"
              >
                <option value="all">Any Price</option>
                <option value="under8">Under $8 / hr</option>
                <option value="8to10">$8 – $10 / hr</option>
                <option value="above10">$10+ / hr</option>
              </select>
            </div>

            {/* Availability Filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500 font-medium">Time:</span>
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 font-medium focus:outline-none focus:border-teal-500"
              >
                <option value="all">Any Time</option>
                <option value="morning">Morning (before 12 PM)</option>
                <option value="afternoon">Afternoon (12 – 5 PM)</option>
                <option value="evening">Evening (after 5 PM)</option>
              </select>
            </div>

            {/* Super Tutor Toggle */}
            <button
              onClick={() => setSuperTutorOnly(!superTutorOnly)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all ${
                superTutorOnly
                  ? 'bg-amber-50 border-amber-300 text-amber-800 font-semibold'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>Super Tutors Only</span>
            </button>

            {hasActiveFilters && (
              <button
                onClick={onResetFilters}
                className="text-xs text-rose-600 hover:underline font-medium"
              >
                Clear all filters
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-medium">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 font-medium focus:outline-none focus:border-teal-500"
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
    </div>
  );
};
