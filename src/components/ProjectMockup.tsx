import React from 'react';

interface ProjectMockupProps {
  type: 'kto' | 'kroma' | 'mekong' | 'artweek' | 'aura' | 'bakong' | 'bokor' | 'sovann';
  className?: string;
  isDetailed?: boolean;
}

export const ProjectMockup: React.FC<ProjectMockupProps> = ({ type, className = '', isDetailed = false }) => {
  switch (type) {
    case 'kto':
      return (
        <div className={`relative w-full h-full min-h-[260px] bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#090d16] p-6 flex flex-col justify-between overflow-hidden rounded-xl border border-slate-800 ${className}`}>
          {/* Subtle geometric background grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
          
          {/* Top Brand Bar */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold text-base shadow-inner">
                <svg className="w-5 h-5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <div>
                <div className="text-white font-bold tracking-tight text-sm flex items-center gap-2">
                  <span>KhmerTutorial</span>
                  <span className="text-[10px] text-amber-400 font-mono">ONLINE</span>
                </div>
                <div className="text-[11px] text-slate-400 font-normal">EdTech Micro-Tutoring Platform</div>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[11px] font-mono text-emerald-400 border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 rounded">
                Verified Research · 22p
              </span>
            </div>
          </div>

          {/* Center Card Presentation */}
          <div className="relative z-10 my-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Left simulated tutor card */}
            <div className="bg-slate-900/90 border border-slate-800/90 rounded-lg p-3.5 shadow-xl backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-2.5">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-600 to-amber-300 flex items-center justify-center text-slate-950 font-bold text-xs shadow">
                  BS
                </div>
                <div>
                  <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                    <span>Bopha Seng</span>
                    <span className="text-amber-400 text-[10px]">★ 5.0 (42)</span>
                  </div>
                  <div className="text-[11px] text-slate-400">Year 3 · Royal Univ. of Phnom Penh</div>
                </div>
              </div>
              <div className="flex items-center justify-between text-[11px] border-t border-slate-800 pt-2 text-slate-300">
                <span>Conversational Khmer</span>
                <span className="font-mono text-amber-400 font-semibold">$8 / 60m</span>
              </div>
            </div>

            {/* Right research stats card */}
            <div className="bg-slate-900/90 border border-slate-800/90 rounded-lg p-3.5 shadow-xl backdrop-blur-sm flex flex-col justify-between">
              <div className="text-[11px] text-slate-400">Research Framework Invariant</div>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold font-mono text-white">80.2%</span>
                <span className="text-[11px] text-slate-400">Aged 18–20 undergraduate supply</span>
              </div>
              <div className="text-[10px] text-amber-400 font-mono">
                Stripe · PayPal ↔ ABA PayWay · Bakong
              </div>
            </div>
          </div>

          {/* Bottom Footer Info */}
          <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/60">
            <span>Figma Prototype & Design Tokens</span>
            <span className="font-mono text-slate-300">Case Study 2026</span>
          </div>
        </div>
      );

    case 'kroma':
      return (
        <div className={`relative w-full h-full min-h-[260px] bg-[#18181b] p-6 flex flex-col justify-between overflow-hidden rounded-xl border border-zinc-800 ${className}`}>
          {/* Bold geometric background block */}
          <div className="absolute -right-6 -bottom-6 w-36 h-36 bg-red-600/20 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute top-0 right-0 w-24 h-full border-l border-zinc-800/80 bg-zinc-900/30 flex flex-col justify-between p-3 text-[10px] font-mono text-zinc-500">
            <span>8pt GRID</span>
            <span className="rotate-90 origin-bottom-left text-zinc-400">KROMA SPECIMEN</span>
            <span>2025</span>
          </div>

          <div className="relative z-10 pr-20">
            <div className="text-xs font-mono text-red-500 uppercase tracking-widest mb-1">
              Bilingual Khmer · Latin System
            </div>
            <div className="text-3xl font-serif-title font-bold text-white tracking-tight">
              អក្សរសិល្ប៍
            </div>
            <div className="text-xl font-display font-light text-zinc-300 tracking-wider mt-0.5">
              Typography In Harmony
            </div>
          </div>

          <div className="relative z-10 my-4 pr-20">
            <div className="p-3 bg-zinc-900/90 border border-zinc-800 rounded-lg">
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-2xl font-bold text-red-500 font-serif-title">ក ខ គ ឃ ង</span>
                <span className="text-xs font-mono text-zinc-400">Aa Bb Cc Dd</span>
              </div>
              <div className="text-[11px] text-zinc-400 leading-relaxed">
                Optical baseline calibration for sub-consonant clusters and contemporary Swiss typography.
              </div>
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-between text-[11px] text-zinc-500 pr-20 pt-2 border-t border-zinc-800/80">
            <span>Limited Risograph Edition</span>
            <span className="font-mono text-zinc-400">500 Copies Printed</span>
          </div>
        </div>
      );

    case 'mekong':
      return (
        <div className={`relative w-full h-full min-h-[260px] bg-gradient-to-b from-[#1c1917] to-[#0c0a09] p-6 flex flex-col justify-between overflow-hidden rounded-xl border border-stone-800 ${className}`}>
          {/* Topographic river lines */}
          <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none" viewBox="0 0 400 300" preserveAspectRatio="none">
            <path d="M0,100 C150,150 200,50 400,120" stroke="#d97706" strokeWidth="1.5" fill="none" />
            <path d="M0,130 C130,190 240,80 400,160" stroke="#d97706" strokeWidth="1.5" fill="none" />
            <path d="M0,160 C160,220 230,120 400,200" stroke="#d97706" strokeWidth="1.5" fill="none" />
            <path d="M0,190 C180,240 260,160 400,230" stroke="#d97706" strokeWidth="1.5" fill="none" />
          </svg>

          <div className="relative z-10 flex items-start justify-between">
            <div>
              <div className="text-[10px] font-mono tracking-widest text-amber-500 uppercase">Single-Origin Roast</div>
              <h4 className="text-xl font-black text-stone-100 tracking-tight">MEKONG ROASTERS</h4>
              <div className="text-xs text-stone-400 font-serif-title italic">Mondulkiri Highlands · 950m</div>
            </div>
            <div className="w-10 h-10 rounded-full border border-amber-600/50 bg-amber-950/40 flex items-center justify-center">
              <span className="text-[10px] font-mono text-amber-400 font-bold">100%</span>
            </div>
          </div>

          <div className="relative z-10 my-3 bg-stone-900/80 border border-stone-800/90 rounded-lg p-3">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-amber-400 font-semibold">Tasting Profile:</span>
              <span className="font-mono text-[10px] text-stone-400">LOT #24-M</span>
            </div>
            <div className="text-[11px] text-stone-300 flex flex-wrap gap-2">
              <span className="bg-stone-800/90 px-2 py-0.5 rounded text-amber-200">Wild Honey</span>
              <span className="bg-stone-800/90 px-2 py-0.5 rounded text-amber-200">Jasmine</span>
              <span className="bg-stone-800/90 px-2 py-0.5 rounded text-amber-200">Cacao Nib</span>
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-between text-[11px] text-stone-400 pt-2 border-t border-stone-800">
            <span>Cold-Foil Stamped Pouch</span>
            <span className="font-mono text-amber-500">250g Biodegradable</span>
          </div>
        </div>
      );

    case 'artweek':
      return (
        <div className={`relative w-full h-full min-h-[260px] bg-[#09090b] p-6 flex flex-col justify-between overflow-hidden rounded-xl border border-zinc-800 ${className}`}>
          {/* Bold geometric cobalt and solar color fields */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/30 transform rotate-45 translate-x-12 -translate-y-12 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-28 h-28 bg-amber-500/20 transform -rotate-12 -translate-x-10 translate-y-10 pointer-events-none" />

          <div className="relative z-10 flex items-start justify-between">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-blue-400 uppercase">Biennial Visual Identity</span>
              <h4 className="text-2xl font-black text-white tracking-tighter">PPAW 2026</h4>
              <p className="text-xs text-zinc-400">Phnom Penh Art Week</p>
            </div>
            <div className="bg-blue-600 text-white font-mono text-[10px] font-bold px-2 py-1 rounded">
              14 VENUES
            </div>
          </div>

          <div className="relative z-10 my-3 p-3 bg-zinc-900/90 border border-zinc-800 rounded-lg">
            <div className="text-xs text-zinc-300 font-medium mb-1">
              "Resonance in Motion" Exhibition
            </div>
            <div className="text-[11px] text-zinc-400 flex items-center justify-between">
              <span>National Museum · Factory Phnom Penh</span>
              <span className="font-mono text-amber-400">Oct 24–31</span>
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-between text-[11px] text-zinc-400 pt-2 border-t border-zinc-800">
            <span>Wayfinding & Spatial Signage</span>
            <span className="font-mono text-blue-400">18.5k+ Visitors</span>
          </div>
        </div>
      );

    case 'aura':
      return (
        <div className={`relative w-full h-full min-h-[260px] bg-[#1c1917] p-6 flex flex-col justify-between overflow-hidden rounded-xl border border-stone-800 ${className}`}>
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-stone-400 via-amber-200 to-stone-400 opacity-30" />

          <div className="relative z-10">
            <span className="text-[10px] font-mono tracking-widest text-stone-400 uppercase">Botanical Aesthetics</span>
            <h4 className="text-2xl font-serif-title font-light text-stone-100 tracking-wide mt-1">
              AURA BOTANICALS
            </h4>
            <p className="text-xs text-stone-400 italic">Small-Batch Bio-Active Formulation</p>
          </div>

          <div className="relative z-10 my-3 p-3.5 bg-stone-900/80 border border-stone-800 rounded-lg">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-serif-title text-amber-200">No. 04 Lotus & Camellia Elixir</span>
              <span className="text-[10px] font-mono text-stone-400">30ml · 1.0 fl oz</span>
            </div>
            <div className="text-[11px] text-stone-400 leading-snug">
              Direct-to-glass ceramic silkscreen printing with tactile blind embossed paperboard carton.
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-between text-[11px] text-stone-400 pt-2 border-t border-stone-800">
            <span>Luxury Packaging & Art Direction</span>
            <span className="font-mono text-stone-300">FSC Certified</span>
          </div>
        </div>
      );

    case 'bakong':
      return (
        <div className={`relative w-full h-full min-h-[260px] bg-[#090d16] p-6 flex flex-col justify-between overflow-hidden rounded-xl border border-slate-800 ${className}`}>
          <div className="relative z-10 flex items-start justify-between">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-rose-500 uppercase">Fintech Design System</span>
              <h4 className="text-xl font-bold text-white tracking-tight">Bakong Pay Interface</h4>
              <p className="text-xs text-slate-400">Dual-Currency Settlement Engine</p>
            </div>
            <div className="w-8 h-8 rounded-lg bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 font-mono text-xs font-bold">
              KHR
            </div>
          </div>

          <div className="relative z-10 my-3 p-3 bg-slate-900/90 border border-slate-800 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Instant Cross-Rate</span>
              <span className="text-xs font-mono text-white">$1.00 = ៛4,120</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden flex">
              <div className="w-3/5 bg-rose-600 h-full" />
              <div className="w-2/5 bg-emerald-500 h-full" />
            </div>
            <div className="flex justify-between text-[10px] font-mono text-slate-400">
              <span>KHQR Interoperability</span>
              <span className="text-emerald-400">240+ Tokens</span>
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800">
            <span>WCAG AA Accessible UI</span>
            <span className="font-mono text-rose-400">48px Tap Targets</span>
          </div>
        </div>
      );

    case 'bokor':
      return (
        <div className={`relative w-full h-full min-h-[260px] bg-[#040711] p-6 flex flex-col justify-between overflow-hidden rounded-xl border border-slate-800 ${className}`}>
          <div className="absolute inset-0 bg-radial from-slate-800/30 via-transparent to-transparent pointer-events-none" />

          <div className="relative z-10">
            <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase">Gatefold Vinyl Sleeve</span>
            <h4 className="text-2xl font-serif-title italic font-normal text-white mt-1">
              Bokor Mist
            </h4>
            <p className="text-xs text-slate-400 font-mono">Echo Plateau Records · 180g LP</p>
          </div>

          <div className="relative z-10 my-3 p-3 bg-slate-900/70 border border-slate-800/80 rounded-lg">
            <div className="text-[11px] text-slate-300 font-mono flex items-center justify-between mb-1">
              <span>SIDE A: Altitude Shimmer</span>
              <span className="text-slate-400">18:42</span>
            </div>
            <div className="text-[11px] text-slate-400 font-mono flex items-center justify-between">
              <span>SIDE B: Abandoned Ballroom</span>
              <span className="text-slate-400">21:05</span>
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800">
            <span>Generative Topography</span>
            <span className="font-mono text-emerald-400">Limited 1,000 Pressing</span>
          </div>
        </div>
      );

    case 'sovann':
      return (
        <div className={`relative w-full h-full min-h-[260px] bg-[#141210] p-6 flex flex-col justify-between overflow-hidden rounded-xl border border-stone-800 ${className}`}>
          <div className="relative z-10 flex items-start justify-between">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-amber-600 uppercase">Haute Couture Atelier</span>
              <h4 className="text-2xl font-serif-title font-bold text-amber-100 tracking-tight">
                SOVANN SILK
              </h4>
              <p className="text-xs text-stone-400">Heritage Weaving & Artisanal Craft</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-amber-600/20 border border-amber-600/40 flex items-center justify-center font-serif-title text-amber-300 text-sm font-bold shadow-lg">
              SS
            </div>
          </div>

          <div className="relative z-10 my-3 p-3 bg-stone-900/90 border border-stone-800 rounded-lg">
            <div className="flex items-center justify-between text-xs text-amber-200 font-serif-title mb-1">
              <span>Golden Cocoon Heritage Collection</span>
              <span className="text-[10px] font-mono text-amber-500">PARIS / PP</span>
            </div>
            <div className="text-[11px] text-stone-400 leading-snug">
              Bespoke hot-stamped gold foil monogram on handmade mulberry paperboard with numbered provenance card.
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-between text-[11px] text-stone-400 pt-2 border-t border-stone-800">
            <span>Artisanal Lookbook & Stationery</span>
            <span className="font-mono text-amber-500">300 Bound Editions</span>
          </div>
        </div>
      );

    default:
      return null;
  }
};
