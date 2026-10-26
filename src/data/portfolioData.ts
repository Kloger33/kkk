export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'Brand Identity' | 'Editorial & Print' | 'Packaging' | 'UI/UX & Systems';
  year: string;
  client: string;
  role: string;
  summary: string;
  featured?: boolean;
  hasPdfAttachment?: boolean;
  pdfUrl?: string;
  tags: string[];
  metrics?: { label: string; value: string }[];
  palette: { name: string; hex: string; role: string }[];
  typography: { role: string; family: string; note: string }[];
  overview: string;
  challenge: string;
  solution: string;
  deliverables: string[];
  mockupType: 'kto' | 'kroma' | 'mekong' | 'artweek' | 'aura' | 'bakong' | 'bokor' | 'sovann';
}

export const DESIGNER_INFO = {
  name: 'Soeun Kongsovann',
  title: 'Graphic Designer & Visual Identity Specialist',
  location: 'Phnom Penh, Cambodia',
  email: 'soeunkongsovann@gmail.com',
  status: 'Open for Select Commissions & Design Roles',
  bio: 'Independent graphic designer and visual strategist specializing in thoughtful brand identity systems, bilingual typography, tactile packaging, and research-backed digital product design. Combining rigorous academic inquiry with contemporary visual craftsmanship.',
  yearsExperience: '6+',
  projectsCompleted: '40+',
  countriesReached: '12',
  clientSatisfaction: '100%',
  socials: {
    email: 'soeunkongsovann@gmail.com',
    behance: 'https://behance.net',
    dribbble: 'https://dribbble.com',
    linkedin: 'https://linkedin.com',
    instagram: 'https://instagram.com',
    github: 'https://github.com',
  },
  pdfDocument: {
    title: 'Comprehensive Academic and Operational Analysis of the KhmerTutorial Online Platform',
    subtitle: 'A Seven-Chapter Research Framework & Product Architecture',
    filename: 'KTO_TGI_23830638.pdf',
    url: '/assets/aistudio/KTO_TGI_23830638.pdf',
    pages: 22,
    fileSize: '418 KB',
  }
};

export const PROJECTS: Project[] = [
  {
    id: 'khmer-tutorial-online',
    title: 'KhmerTutorial Online (KTO)',
    subtitle: 'Brand Identity, Design System & Empirical Platform Architecture',
    category: 'Brand Identity',
    year: '2026',
    client: 'EdTech Venture Research',
    role: 'Lead Visual Designer & Product Architect',
    summary: 'A complete visual identity system, interactive UI/UX architecture, and seven-chapter operational research framework for an on-demand micro-tutoring platform connecting Cambodian university students with international learners.',
    featured: true,
    hasPdfAttachment: true,
    pdfUrl: '/assets/aistudio/KTO_TGI_23830638.pdf',
    tags: ['Brand Identity', 'Design System', 'Academic Research', 'UX/UI Architecture', 'Bilingual Design'],
    metrics: [
      { label: 'Target Age Cohort', value: '80.2%' },
      { label: 'Work-Study Income Need', value: '34.5%' },
      { label: 'Academic Anxiety Index', value: '37.9%' },
      { label: 'Core Starter Modules', value: '5 Modules' },
    ],
    palette: [
      { name: 'Angkor Indigo', hex: '#111827', role: 'Primary Brand Solid' },
      { name: 'Mekong Ochre', hex: '#D97706', role: 'Focal Accent' },
      { name: 'Lotus Jade', hex: '#0D9488', role: 'Growth & Trust' },
      { name: 'Krama Silk Ivory', hex: '#F8FAFC', role: 'Neutral Canvas' },
      { name: 'Slate Charcoal', hex: '#1E293B', role: 'Structural Surface' },
    ],
    typography: [
      { role: 'Display & Identity', family: 'Plus Jakarta Sans Bold', note: 'Authoritative, balanced neo-grotesque geometry' },
      { role: 'Khmer Monograph', family: 'Siemreap & Battambang', note: 'Culturally grounded Khmer typographic baseline' },
      { role: 'Interface & Numerical', family: 'JetBrains Mono & Tabular', note: 'Precise financial exchange and booking slots' },
    ],
    overview: 'KhmerTutorial Online (KTO) is a pioneering EdTech platform designed to resolve the acute work-study conflict faced by Cambodian university undergraduates while fulfilling global demand for conversational Khmer language fluency. As lead designer, I formulated the comprehensive brand identity, starter curriculum materials, mobile-first design tokens, and authored the 22-page research publication.',
    challenge: 'Cambodian undergraduate students face severe academic anxiety due to rigid 8-hour shift work in retail and hospitality that forces lecture absenteeism (37.9% reported anxiety, 34.5% requiring flexible remote earnings). Meanwhile, expatriates and NGO personnel encounter severe search friction finding native conversational Khmer tutors on global platforms like Preply.',
    solution: 'Designed a high-trust, culturally authentic brand identity paired with an ergonomic mobile-first web interface. The system integrates 1-hour micro-tutoring schedule synchronization, localized dual-currency settlement badges (ABA PayWay, Bakong, Stripe), and 5 high-utility starter learning modules designed for instant practical usage.',
    deliverables: [
      'Master Brand Logomark & Usage Guidelines',
      '22-Page Published Academic & Operational Research Paper',
      'Mobile-First Web Application UI/UX System (Figma Blueprint)',
      '5 Starter Curriculum Module Flashcards & Presentation Decks',
      'Cross-Border Financial Payment Component Library',
      'Marketing Landing Page & Tutor Onboarding Collateral',
    ],
    mockupType: 'kto',
  },
  {
    id: 'kroma-studio',
    title: 'Kroma Studio — Bilingual Typography',
    subtitle: 'Contemporary Khmer-Latin Type System & Exhibition Identity',
    category: 'Editorial & Print',
    year: '2025',
    client: 'Kroma Cultural Foundation',
    role: 'Graphic Designer & Typographer',
    summary: 'A curated visual identity and experimental poster exhibition pairing heritage Khmer script glyphs with modernist Swiss grid systems, culminating in a limited-edition risograph monograph.',
    featured: true,
    tags: ['Bilingual Typography', 'Editorial Design', 'Screenprinting', 'Grid Systems'],
    metrics: [
      { label: 'Exhibition Posters', value: '24 Works' },
      { label: 'Monograph Edition', value: '500 Copies' },
      { label: 'Custom Glyph Pairs', value: '140+' },
    ],
    palette: [
      { name: 'Vermilion Red', hex: '#DC2626', role: 'Primary Accent' },
      { name: 'Deep Asphalt', hex: '#18181B', role: 'Base Background' },
      { name: 'Paper White', hex: '#FAFAF9', role: 'Canvas Surface' },
      { name: 'Raw Ochre', hex: '#CA8A04', role: 'Secondary Accent' },
    ],
    typography: [
      { role: 'Primary Title', family: 'Bricolage Grotesque & Khmer Display', note: 'Harmonious optical baseline alignment' },
      { role: 'Body Monograph', family: 'Playfair Display Serif', note: 'Curated editorial commentary' },
    ],
    overview: 'Kroma Studio celebrates the intersection of classical Khmer calligraphy with contemporary international typographic layout. The project delivered 24 large-format screenprinted posters, typographic specimen sheets, and a bound editorial catalog.',
    challenge: 'Khmer script has distinct vertical rhythm, conjunct consonants, and vowel signs that historically clashed with rigid Latin baseline grids.',
    solution: 'Engineered a proportional 8pt baseline grid that allows fluid descenders and subscript consonants while preserving modern architectural symmetry.',
    deliverables: [
      'Exhibition Visual Identity & Wayfinding',
      'Bilingual Type Specimen Publication (84 pages)',
      'Silkscreen Poster Series on 300gsm Cotton Stock',
      'Custom Digital Glyphs & OpenType Features',
    ],
    mockupType: 'kroma',
  },
  {
    id: 'mekong-roasters',
    title: 'Mekong Roasters Coffee Co.',
    subtitle: 'Artisan Packaging System & Sustainable Brand Collateral',
    category: 'Packaging',
    year: '2025',
    client: 'Mekong Roasters Artisans',
    role: 'Packaging Designer & Brand Strategist',
    summary: 'Sustainable compostable coffee packaging featuring topographical river contour patterns, cold-foil metallic batch stamps, and an intuitive sensory flavor wheel.',
    featured: true,
    tags: ['Packaging Design', 'Foil Stamping', 'Pattern Systems', 'Retail Identity'],
    metrics: [
      { label: 'Product SKU Range', value: '8 Blends' },
      { label: 'Biodegradable Substrate', value: '100% PCR' },
      { label: 'Retail Retailers', value: '35 Stores' },
    ],
    palette: [
      { name: 'Espresso Dark', hex: '#1C1917', role: 'Outer Substrate' },
      { name: 'Terracotta Gold', hex: '#D97706', role: 'Foil Stamped Embellishment' },
      { name: 'Almond Warm', hex: '#F5F5F4', role: 'Sensory Badge' },
      { name: 'Forest Moss', hex: '#15803D', role: 'Single-Origin Mark' },
    ],
    typography: [
      { role: 'Header Typography', family: 'Plus Jakarta Sans Extrabold', note: 'Bold artisanal presence on shelf' },
      { role: 'Tasting Notes', family: 'JetBrains Mono', note: 'Technical roast level, elevation and notes' },
    ],
    overview: 'Mekong Roasters crafts specialty single-origin coffees sourced from high-altitude Cambodian and regional estates. The packaging needed to position the brand against premium international imports while celebrating local terroir.',
    challenge: 'Standing out in competitive boutique grocery aisles with eco-friendly unbleached substrates without looking dull or utilitarian.',
    solution: 'Designed tactile kraft pouches with a custom topographic contour map of the upper Mekong River, accented with precise copper foil stamping and color-coded roast tags.',
    deliverables: [
      'Bespoke Gusseted Coffee Pouch System (250g & 1kg)',
      'Cold-Foil Stamped Single-Origin Adhesive Labels',
      'Boutique Cafe Menu Board & Retail Takeaway Cups',
      'Roaster Tasting Guide & Interactive Flavor Wheel',
    ],
    mockupType: 'mekong',
  },
  {
    id: 'phnom-penh-art-week',
    title: 'Phnom Penh Art Week 2026',
    subtitle: 'Festival Brand Identity, Wayfinding & Spatial Graphics',
    category: 'Brand Identity',
    year: '2026',
    client: 'Ministry of Culture & Fine Arts Partner',
    role: 'Creative Director & Identity Designer',
    summary: 'A dynamic visual identity program spanning 14 historical venue spaces across Phnom Penh, featuring kinetic typography, environmental wayfinding banners, and digital schedules.',
    featured: false,
    tags: ['Festival Identity', 'Environmental Graphics', 'Spatial Signage', 'Motion Typography'],
    metrics: [
      { label: 'Venues Mapped', value: '14 Hubs' },
      { label: 'Attendees Reached', value: '18,500+' },
      { label: 'Collateral Assets', value: '120+' },
    ],
    palette: [
      { name: 'Electric Cobalt', hex: '#2563EB', role: 'Primary Vibrant Field' },
      { name: 'Solar Sun', hex: '#FBBF24', role: 'Dynamic Beacon' },
      { name: 'Obsidian Black', hex: '#09090B', role: 'Contrasting Void' },
      { name: 'Pure White', hex: '#FFFFFF', role: 'Information Clarity' },
    ],
    typography: [
      { role: 'Headline Master', family: 'Outfit Heavy', note: 'Architectural impact visible from 30 meters' },
      { role: 'Schedule Guide', family: 'DM Sans Medium', note: 'Clean multi-venue schedule readability' },
    ],
    overview: 'Phnom Penh Art Week connects classical heritage structures with contemporary avant-garde installations. The identity needed to feel vibrant, international, and deeply localized.',
    challenge: 'Unifying disparate exhibition hubs—from traditional French colonial villas to contemporary warehouse galleries—under one cohesive wayfinding language.',
    solution: 'Developed an adaptive geometric framing motif inspired by traditional Khmer architectural pediments, executed in high-contrast electric cobalt and warm solar yellow.',
    deliverables: [
      'Comprehensive Visual Identity Manual',
      'Environmental Wayfinding Banners & Pillar Wraps',
      '128-Page Bilingual Exhibition Program & Map',
      'Staff & Artist Credential Passes and Lanyards',
    ],
    mockupType: 'artweek',
  },
  {
    id: 'aura-botanicals',
    title: 'Aura Botanicals Skincare',
    subtitle: 'Luxury Organic Cosmetics Packaging & Art Direction',
    category: 'Packaging',
    year: '2025',
    client: 'Aura Natural Labs',
    role: 'Lead Visual & Packaging Designer',
    summary: 'Minimalist luxury skincare identity featuring direct-to-glass ceramic screenprinted bottles, FSC-certified blind embossed unboxing cartons, and calm neutral art direction.',
    featured: false,
    tags: ['Luxury Packaging', 'Brand Guidelines', 'Cosmetics', 'Embossing'],
    metrics: [
      { label: 'Product Formulations', value: '12 Items' },
      { label: 'Packaging Waste Reduction', value: '45%' },
      { label: 'E-commerce Conversion Lift', value: '+38%' },
    ],
    palette: [
      { name: 'Travertine Sand', hex: '#E7E5E4', role: 'Neutral Ground' },
      { name: 'Eucalyptus Muted', hex: '#3F6212', role: 'Botanical Accent' },
      { name: 'Warm Charcoal', hex: '#292524', role: 'Screenprinted Text' },
      { name: 'Linen Warmth', hex: '#FAF8F5', role: 'Outer Box Stock' },
    ],
    typography: [
      { role: 'Wordmark & Hero', family: 'Playfair Display Light', note: 'Quiet, understated high-luxury elegance' },
      { role: 'Ingredient Formulas', family: 'Plus Jakarta Sans Regular', note: 'Clean dermatological clarity' },
    ],
    overview: 'Aura Botanicals produces small-batch active botanical facial oils and serums using sustainable wild-harvested regional flora.',
    challenge: 'Avoid standard generic greenwashing aesthetics while communicating high scientific efficacy and understated luxury.',
    solution: 'Combined medicinal amber glass dropper bottles with minimalist single-color ceramic screenprinting, packaged in tactile unbleached paperboard cartons with subtle blind debossing.',
    deliverables: [
      'Bespoke Cosmetic Vessel Screenprint Specifications',
      'Blind Debossed Rigid Unboxing Gift Boxes',
      'Editorial Lookbook & Art Direction Standards',
      'Digital E-Commerce Brand Asset Suite',
    ],
    mockupType: 'aura',
  },
  {
    id: 'bakong-pay-system',
    title: 'Bakong Pay — UI & Design Language',
    subtitle: 'Cross-Border Financial Payment Component System',
    category: 'UI/UX & Systems',
    year: '2025',
    client: 'Fintech Innovation Studio',
    role: 'Design Systems Architect & UI Designer',
    summary: 'A robust, accessible UI component system and iconography kit for next-generation mobile banking, QR settlements, and instant dual-currency exchange interfaces.',
    featured: false,
    tags: ['Design Systems', 'Fintech UI', 'Mobile-First', 'Accessibility WCAG AA'],
    metrics: [
      { label: 'Design Tokens', value: '240+ Tokens' },
      { label: 'Touch Target Minimum', value: '48px' },
      { label: 'Component Library', value: '64 Units' },
    ],
    palette: [
      { name: 'National Ruby', hex: '#BE123C', role: 'Primary Security Action' },
      { name: 'Deep Midnight', hex: '#0F172A', role: 'High-Contrast Ground' },
      { name: 'Emerald Settlement', hex: '#059669', role: 'Success Rail' },
      { name: 'Neutral Slate', hex: '#64748B', role: 'Muted Hierarchy' },
    ],
    typography: [
      { role: 'Financial Figures', family: 'JetBrains Mono Bold', note: 'Zero-ambiguity currency & transaction numbers' },
      { role: 'Interface Labels', family: 'Plus Jakarta Sans', note: 'Optically optimized micro-text' },
    ],
    overview: 'As mobile payments in Southeast Asia surge, financial interfaces need supreme clarity, high legibility in direct sunlight, and instant recognition across literacy levels.',
    challenge: 'Designing an interface that handles dual simultaneous currencies (USD and KHR) without visual clutter or arithmetic misinterpretation.',
    solution: 'Engineered a split numerical token system with instant auto-conversion displays, clear color-coded confirmation micro-interactions, and 48px touch ergonomic targets.',
    deliverables: [
      'Figma Token Library & Component Architecture',
      'Custom Financial Iconography Set (80 vector icons)',
      'Merchant QR Standee & Physical Point-of-Sale Collateral',
      'Interactive Onboarding & Transfer Flow Prototypes',
    ],
    mockupType: 'bakong',
  },
  {
    id: 'bokor-mist-vinyl',
    title: 'Bokor Mist — Ambient Sound Identity',
    subtitle: 'Gatefold Vinyl Record Packaging & Generative Visuals',
    category: 'Editorial & Print',
    year: '2024',
    client: 'Echo Plateau Records',
    role: 'Art Director & Illustrator',
    summary: 'Art direction and physical packaging for an experimental ambient album capturing the mist-shrouded ruins of Bokor Mountain through abstract topography and typography.',
    featured: false,
    tags: ['Record Sleeve', 'Album Art', 'Generative Art', 'Print Finishing'],
    metrics: [
      { label: 'Vinyl Pressing', value: '1,000 LPs' },
      { label: 'Format', value: 'Heavyweight 180g' },
      { label: 'Insert Booklet', value: '16 Pages' },
    ],
    palette: [
      { name: 'Fog White', hex: '#F1F5F9', role: 'Atmospheric Canvas' },
      { name: 'Mist Slate', hex: '#334155', role: 'Shadow Contours' },
      { name: 'Pine Spruce', hex: '#064E3B', role: 'Elevation Line' },
      { name: 'Charcoal Black', hex: '#020617', role: 'Heavy Vinyl Base' },
    ],
    typography: [
      { role: 'Album Title', family: 'Cormorant Garamond Italic', note: 'Haunting, delicate atmospheric serifs' },
      { role: 'Track Listing', family: 'Space Mono', note: 'Precise acoustic duration timestamps' },
    ],
    overview: 'Bokor Mist is a sonic narrative exploring memory, climate, and historical resonance. The visual design needed to translate delicate acoustic drones into physical paper artifacts.',
    challenge: 'Creating a cover that feels like an artifact discovered in an abandoned hill station, without resorting to clichéd spooky photography.',
    solution: 'Generated abstract topological contour gradients overlaid with precise silver-ink screenprinting on heavyweight uncoated fibrous paperboard.',
    deliverables: [
      '12-Inch Gatefold Vinyl Jacket with Matte Varnish',
      '16-Page Lyric & Photography Monograph Insert',
      'Limited-Edition Cassette Tape J-Card & Shell Print',
      'Digital Streaming Canvas & Animated Cover Art',
    ],
    mockupType: 'bokor',
  },
  {
    id: 'sovann-silk-atelier',
    title: 'Sovann Silk — Heritage Luxury Identity',
    subtitle: 'High-Fashion Atelier Brand Mark, Lookbook & Packaging',
    category: 'Brand Identity',
    year: '2024',
    client: 'Sovann Silk Studio',
    role: 'Identity Designer & Brand Consultant',
    summary: 'A refined visual identity and artisanal packaging suite for a master silk weaving atelier, honoring centuries-old golden silk heritage through minimalist modern luxury.',
    featured: false,
    tags: ['Luxury Brand', 'Embossed Stationery', 'Lookbook Design', 'Custom Monogram'],
    metrics: [
      { label: 'Lookbook Edition', value: '300 Bound' },
      { label: 'Bespoke Monograms', value: 'Gold Foiled' },
      { label: 'Heritage Weavers', value: '28 Artisans' },
    ],
    palette: [
      { name: 'Golden Silk Ochre', hex: '#B45309', role: 'Heritage Metallic' },
      { name: 'Deep Mulberry', hex: '#262626', role: 'Rich Text Field' },
      { name: 'Raw Cocoon Cream', hex: '#FEF3C7', role: 'Soft Canvas' },
      { name: 'Charcoal Stone', hex: '#1C1917', role: 'Stationery Ground' },
    ],
    typography: [
      { role: 'Atelier Monogram', family: 'Playfair Display Bold', note: 'Timeless haute-couture weight' },
      { role: 'Editorial Prose', family: 'Plus Jakarta Sans Light', note: 'Unobtrusive, breathable white space' },
    ],
    overview: 'Sovann Silk preserves the rare golden cocoon silk weaving methods of Cambodia. The brand required an identity that commands international luxury status in Paris, Tokyo, and New York while celebrating indigenous artisanal mastery.',
    challenge: 'Distinguishing authentic master craft from mass-produced souvenir silk through tactile, museum-grade visual presentation.',
    solution: 'Created an interlocking SS ligature inspired by the loom shuttle movement, paired with unbleached handmade mulberry paper packaging and wax-sealed certificates of provenance.',
    deliverables: [
      'Atelier Master Wordmark & Custom Emblem',
      'Hardcover Seasonal Collection Lookbook',
      'Numbered Certificate of Authenticity with Gold Seal',
      'Textile Garment Hangtags & Fabric Care Booklets',
    ],
    mockupType: 'sovann',
  },
];

export const SERVICES = [
  {
    number: '01',
    title: 'Brand Identity & Visual Systems',
    description: 'Distinctive brand marks, color mathematics, comprehensive guidelines, and adaptive design systems that scale seamlessly across tactile print and digital surfaces.',
    deliverables: ['Logo & Monogram Suite', 'Color Harmony & Token Specifications', 'Brand Style Guide (PDF)', 'Typography Pairing Matrix', 'Vector Asset Package'],
    timeline: '3–6 Weeks',
  },
  {
    number: '02',
    title: 'Editorial & Publication Design',
    description: 'Thoughtful typography and layout architecture for art monographs, research publications, exhibition catalogs, and annual reports designed for effortless readability.',
    deliverables: ['Bespoke Editorial Grid System', 'Typesetting (Bilingual Khmer/Latin)', 'Cover Design & Print Finishing Specs', 'Print-Ready Prepress Files', 'Interactive Digital PDF Edition'],
    timeline: '2–4 Weeks',
  },
  {
    number: '03',
    title: 'Packaging & Tactile Collateral',
    description: 'High-impact retail packaging, sustainable substrates, cold-foil embossing specifications, and tactile unboxing experiences that command attention on store shelves.',
    deliverables: ['Structural Box & Pouch Diellines', 'Foil & Emboss Tooling Blueprints', '3D Photorealistic Mockup Renders', 'Regulatory Ingredient Layouts', 'Vendor Pre-Flight Proofing'],
    timeline: '3–5 Weeks',
  },
  {
    number: '04',
    title: 'UI/UX & Design Systems',
    description: 'Ergonomic, accessible digital interfaces built on systematic component libraries, WCAG AA contrast standards, and seamless cross-device responsiveness.',
    deliverables: ['Figma Master Component Library', 'Design Tokens & State Variants', 'Interactive Clickable Prototypes', 'Developer Handoff Documentation', 'Micro-Interactions & Motion Specs'],
    timeline: '4–8 Weeks',
  },
];

export const TESTIMONIALS = [
  {
    quote: 'Soeun Kongsovann bridged complex academic research and elegant commercial visual design with exceptional maturity. The KhmerTutorial Online brand and system blueprint established our credibility with international partners from day one.',
    author: 'Dr. V. Rathana',
    title: 'Academic Advisor & EdTech Research Director',
    organization: 'Southeast Asian Education Initiative',
  },
  {
    quote: 'The packaging and bilingual typography Soeun designed for Mekong Roasters transformed our brand perception. Customers constantly photograph the bags on boutique shelves, and our wholesale distribution expanded across 35 new stores.',
    author: 'Chhay Bunleng',
    title: 'Founder & Head Roaster',
    organization: 'Mekong Roasters Co.',
  },
  {
    quote: 'Working with Soeun on Phnom Penh Art Week was a masterclass in calm visual precision. Managing 14 venues and 120+ assets could have been chaos, but his systematic wayfinding made navigation effortless for over 18,000 visitors.',
    author: 'Elena Moreau',
    title: 'Curator & Festival Director',
    organization: 'Phnom Penh Contemporary Cultural Arts',
  },
];
