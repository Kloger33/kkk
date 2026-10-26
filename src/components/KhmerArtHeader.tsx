import React from 'react';

export const KhmerArtHeader: React.FC = () => {
  return (
    <div className="relative w-full bg-gradient-to-r from-[#120d07] via-[#1f160a] to-[#120d07] border-b border-amber-500/30 overflow-hidden select-none shadow-sm">
      {/* Background delicate Khmer silk grid texture */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#f59e0b 0.75px, transparent 0.75px), radial-gradient(#d97706 0.75px, #120d07 0.75px)`,
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 10px 10px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-10 sm:h-11 flex items-center justify-between relative z-10">
        
        {/* Left: Traditional Kbach Phni Tes Filigree Scroll */}
        <div className="flex items-center gap-2">
          {/* Authentic Khmer Kbach Motif Vector */}
          <svg className="w-16 sm:w-28 h-6 text-amber-400 opacity-80" viewBox="0 0 120 24" fill="none">
            {/* Traditional flame/vine scrollwork */}
            <path 
              d="M2,12 C10,4 20,4 28,12 C36,20 46,20 54,12 C62,4 72,4 80,12 C88,20 98,20 106,12" 
              stroke="url(#goldGrad)" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
            />
            <path 
              d="M14,12 C18,7 24,7 28,12 C32,17 38,17 42,12" 
              stroke="#fbbf24" 
              strokeWidth="1" 
              strokeLinecap="round" 
              opacity="0.7"
            />
            <circle cx="28" cy="12" r="2.5" fill="#f59e0b" />
            <circle cx="54" cy="12" r="2.5" fill="#f59e0b" />
            <circle cx="80" cy="12" r="2.5" fill="#f59e0b" />
            {/* Decorative flame curls */}
            <path d="M28,9 C26,5 31,3 32,7" stroke="#fbbf24" strokeWidth="1" strokeLinecap="round" />
            <path d="M54,9 C52,5 57,3 58,7" stroke="#fbbf24" strokeWidth="1" strokeLinecap="round" />
            <path d="M80,9 C78,5 83,3 84,7" stroke="#fbbf24" strokeWidth="1" strokeLinecap="round" />
            <defs>
              <linearGradient id="goldGrad" x1="0" y1="0" x2="120" y2="0" gradientUnits="userSpaceOnUse">
                <stop stopColor="#b45309" />
                <stop offset="0.5" stopColor="#fbbf24" />
                <stop offset="1" stopColor="#d97706" />
              </linearGradient>
            </defs>
          </svg>

          {/* Khmer Script Heritage Calligraphy Tag */}
          <div className="flex items-center gap-1.5 text-xs text-amber-200/90 font-khmer">
            <span className="font-bold tracking-wider text-amber-400 text-sm sm:text-base leading-[1.7]">ក្បាច់ខ្មែរ</span>
            <span className="text-amber-500/50 hidden md:inline">·</span>
            <span className="text-caption font-sans tracking-wide text-amber-300/80 hidden md:inline">
              Khmer Traditional Art Heritage
            </span>
          </div>
        </div>

        {/* Center: Signature Angkorian Lotus Knot (Kbach Phka Chhouk) */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 shadow-inner">
          {/* Sacred Lotus Blossom Icon */}
          <svg className="w-5 h-5 text-amber-400 animate-pulse shrink-0" viewBox="0 0 24 24" fill="none">
            {/* Lotus Central Petal */}
            <path 
              d="M12 3 C12 3 14.5 8 14.5 12 C14.5 15 13.5 17 12 18 C10.5 17 9.5 15 9.5 12 C9.5 8 12 3 12 3 Z" 
              fill="url(#lotusGold)" 
              stroke="#fbbf24" 
              strokeWidth="0.8" 
            />
            {/* Left Petal */}
            <path 
              d="M12 9 C9 9 6 12 7.5 16 C9 18 11 18 12 18 C11 15 11 12 12 9 Z" 
              fill="#b45309" 
              opacity="0.8"
              stroke="#fbbf24" 
              strokeWidth="0.8" 
            />
            {/* Right Petal */}
            <path 
              d="M12 9 C15 9 18 12 16.5 16 C15 18 13 18 12 18 C13 15 13 12 12 9 Z" 
              fill="#b45309" 
              opacity="0.8"
              stroke="#fbbf24" 
              strokeWidth="0.8" 
            />
            {/* Outer Flaring Petals */}
            <path 
              d="M6 13 C4 15 5 18 8 19" 
              stroke="#f59e0b" 
              strokeWidth="1" 
              strokeLinecap="round" 
            />
            <path 
              d="M18 13 C20 15 19 18 16 19" 
              stroke="#f59e0b" 
              strokeWidth="1" 
              strokeLinecap="round" 
            />
            {/* Base Pedestal */}
            <path 
              d="M8 20 C10 21 14 21 16 20" 
              stroke="#fbbf24" 
              strokeWidth="1.2" 
              strokeLinecap="round" 
            />
            <defs>
              <linearGradient id="lotusGold" x1="12" y1="3" x2="12" y2="18" gradientUnits="userSpaceOnUse">
                <stop stopColor="#fef08a" />
                <stop offset="0.7" stopColor="#f59e0b" />
                <stop offset="1" stopColor="#b45309" />
              </linearGradient>
            </defs>
          </svg>

          {/* Bilingual Motto */}
          <span className="text-caption font-bold tracking-wider text-amber-300 uppercase font-khmer leading-[1.7]">
            សួស្តីកម្ពុជា · SOURSDEY CAMBODIA
          </span>
        </div>

        {/* Right: Traditional Kbach Phni Tes Mirrored Scroll */}
        <div className="flex items-center gap-2">
          <span className="text-caption font-khmer text-amber-400/90 hidden sm:inline leading-[1.7]">
            កិត្តិនាមសិល្បៈអង្គរ
          </span>
          <svg className="w-16 sm:w-28 h-6 text-amber-400 opacity-80 rotate-180" viewBox="0 0 120 24" fill="none">
            <path 
              d="M2,12 C10,4 20,4 28,12 C36,20 46,20 54,12 C62,4 72,4 80,12 C88,20 98,20 106,12" 
              stroke="url(#goldGradRight)" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
            />
            <circle cx="28" cy="12" r="2.5" fill="#f59e0b" />
            <circle cx="54" cy="12" r="2.5" fill="#f59e0b" />
            <circle cx="80" cy="12" r="2.5" fill="#f59e0b" />
            <path d="M28,9 C26,5 31,3 32,7" stroke="#fbbf24" strokeWidth="1" strokeLinecap="round" />
            <path d="M54,9 C52,5 57,3 58,7" stroke="#fbbf24" strokeWidth="1" strokeLinecap="round" />
            <path d="M80,9 C78,5 83,3 84,7" stroke="#fbbf24" strokeWidth="1" strokeLinecap="round" />
            <defs>
              <linearGradient id="goldGradRight" x1="0" y1="0" x2="120" y2="0" gradientUnits="userSpaceOnUse">
                <stop stopColor="#b45309" />
                <stop offset="0.5" stopColor="#fbbf24" />
                <stop offset="1" stopColor="#d97706" />
              </linearGradient>
            </defs>
          </svg>
        </div>

      </div>

      {/* Decorative Golden Pediment Teeth Border (Kbach Kang) along the bottom edge */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-80" />
    </div>
  );
};
