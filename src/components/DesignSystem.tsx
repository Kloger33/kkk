import React, { useState } from 'react';
import {
  Button,
  IconButton,
  Badge,
  Chip,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Avatar,
  Rating,
  Price,
  Input,
  Select,
  Sheet,
  Tabs,
  Skeleton,
  EmptyState,
  useToast,
} from './ui';
import {
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Info,
  AlertCircle,
  Search,
  Mail,
  Heart,
  Share2,
  Bookmark,
  Calendar,
  Volume2,
  ShieldCheck,
  GraduationCap,
  Layers,
  Palette,
  Type,
  Maximize2,
  Bell,
  Sliders,
  ExternalLink,
} from 'lucide-react';

interface DesignSystemProps {
  onBackToApp: () => void;
}

export const DesignSystem: React.FC<DesignSystemProps> = ({ onBackToApp }) => {
  const { addToast } = useToast();

  // Interactive States
  const [btnLoading, setBtnLoading] = useState(false);
  const [selectedChips, setSelectedChips] = useState<string[]>(['Conversational', 'Market Khmer']);
  const [interactiveRating, setInteractiveRating] = useState<number>(4.5);
  const [activeTab, setActiveTab] = useState<string>('tab-1');
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [inputError, setInputError] = useState('');
  const [selectValue, setSelectValue] = useState('conversational');

  const toggleChip = (label: string) => {
    setSelectedChips((prev) =>
      prev.includes(label) ? prev.filter((c) => c !== label) : [...prev, label]
    );
  };

  const handleSimulateLoad = () => {
    setBtnLoading(true);
    setTimeout(() => {
      setBtnLoading(false);
      addToast({
        title: 'Action Completed',
        message: 'The asynchronous task has finished successfully.',
        variant: 'success',
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 pb-24 selection:bg-teal-200">
      
      {/* Top Banner & Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4">
          <div className="flex items-center justify-between sm:justify-start gap-2.5">
            <Button
              variant="secondary"
              size="sm"
              leftIcon={<ArrowLeft className="w-4 h-4" />}
              onClick={onBackToApp}
            >
              <span className="hidden sm:inline">Back to Marketplace</span>
              <span className="sm:hidden">Back</span>
            </Button>
            <div className="h-6 w-px bg-slate-200 hidden sm:block" />
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-extrabold text-slate-900 text-small sm:text-lg tracking-tight truncate">
                  KTO Design System
                </span>
                <Badge variant="default" size="sm">
                  @theme
                </Badge>
              </div>
              <p className="text-caption text-slate-500 hidden sm:block">
                Deep Teal (#0F766E) · Angkor Gold (#D4A017) · Kantumruy Pro
              </p>
            </div>

            {/* Mobile Sheet Trigger */}
            <div className="sm:hidden ml-auto">
              <Button
                variant="gold"
                size="sm"
                leftIcon={<Sliders className="w-3.5 h-3.5" />}
                onClick={() => setIsSheetOpen(true)}
              >
                Sheet
              </Button>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <Button
              variant="gold"
              size="sm"
              leftIcon={<Sliders className="w-4 h-4" />}
              onClick={() => setIsSheetOpen(true)}
            >
              Open Sheet Demo
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">
        
        {/* Intro Hero Box */}
        <div className="bg-gradient-to-r from-teal-900 via-teal-800 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="gold" size="sm">
                Design System v1.0
              </Badge>
              <Badge variant="default" size="sm">
                WCAG 2.1 AA Compliant (5.1:1 Contrast)
              </Badge>
              <Badge variant="secondary" size="sm">
                Zero Subscript Clipping (line-height 1.7)
              </Badge>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              KhmerTutorial Online Primitives
            </h1>

            <p className="text-small sm:text-body text-teal-100 leading-relaxed font-normal">
              Every token, primitive component, and typographic rule built for the KTO micro-tutoring platform. Fully responsive across 390px mobile viewports up to 1440px desktop screens with touch-friendly 44px min-height ergonomics.
            </p>
          </div>
        </div>

        {/* 1. SEMANTIC COLOR TOKENS */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
            <Palette className="w-5 h-5 text-teal-700" />
            <h2 className="text-h2 font-bold text-slate-900">
              1. Semantic Color Tokens
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Primary Deep Teal */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-small text-slate-900">Primary Deep Teal</span>
                <span className="text-caption font-mono text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                  AA Pass (5.1:1)
                </span>
              </div>
              <div className="h-16 rounded-xl bg-[#0F766E] flex items-center justify-center text-white font-bold text-small shadow-inner">
                #0F766E
              </div>
              <div className="grid grid-cols-3 gap-1.5 text-center text-caption font-mono">
                <div className="p-2 rounded-lg bg-[#115E59] text-white">Hover<br/>#115E59</div>
                <div className="p-2 rounded-lg bg-[#134E4A] text-white">Active<br/>#134E4A</div>
                <div className="p-2 rounded-lg bg-[#F0FDFA] text-teal-900 border border-teal-200">Soft<br/>#F0FDFA</div>
              </div>
            </div>

            {/* Angkor Gold Accent */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-small text-slate-900">Angkor Gold Accent</span>
                <span className="text-caption font-mono text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  #D4A017
                </span>
              </div>
              <div className="h-16 rounded-xl bg-[#D4A017] flex items-center justify-center text-amber-950 font-bold text-small shadow-inner">
                #D4A017
              </div>
              <div className="grid grid-cols-3 gap-1.5 text-center text-caption font-mono">
                <div className="p-2 rounded-lg bg-[#B8870F] text-white">Hover<br/>#B8870F</div>
                <div className="p-2 rounded-lg bg-[#92400E] text-white">Active<br/>#92400E</div>
                <div className="p-2 rounded-lg bg-[#FEFCE8] text-amber-900 border border-amber-200">Soft<br/>#FEFCE8</div>
              </div>
            </div>

            {/* Neutral Surface Tokens */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-small text-slate-900">Surfaces & Borders</span>
                <span className="text-caption font-mono text-slate-500">Light System</span>
              </div>
              <div className="h-16 rounded-xl bg-[#f8fafc] border border-slate-200 flex items-center justify-center text-slate-700 font-bold text-small">
                bg-bg (#F8FAFC)
              </div>
              <div className="grid grid-cols-3 gap-1.5 text-center text-caption font-mono">
                <div className="p-2 rounded-lg bg-white border border-slate-200 text-slate-800">Surface<br/>#FFFFFF</div>
                <div className="p-2 rounded-lg bg-[#F1F5F9] text-slate-800">Surf-2<br/>#F1F5F9</div>
                <div className="p-2 rounded-lg bg-[#E2E8F0] text-slate-800">Border<br/>#E2E8F0</div>
              </div>
            </div>

            {/* Status Colors */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-small text-slate-900">Status Tokens</span>
                <span className="text-caption font-mono text-slate-500">Feedback</span>
              </div>
              <div className="grid grid-cols-3 gap-2 h-16">
                <div className="rounded-xl bg-[#16A34A] flex items-center justify-center text-white text-caption font-bold">
                  Success
                </div>
                <div className="rounded-xl bg-[#EAB308] flex items-center justify-center text-amber-950 text-caption font-bold">
                  Warning
                </div>
                <div className="rounded-xl bg-[#DC2626] flex items-center justify-center text-white text-caption font-bold">
                  Danger
                </div>
              </div>
              <div className="grid grid-cols-3 gap-1.5 text-center text-caption font-mono">
                <div className="p-2 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">#F0FDF4</div>
                <div className="p-2 rounded-lg bg-yellow-50 text-yellow-800 border border-yellow-200">#FEFCE8</div>
                <div className="p-2 rounded-lg bg-red-50 text-red-800 border border-red-200">#FEF2F2</div>
              </div>
            </div>

          </div>
        </section>

        {/* 2. TYPOGRAPHY & AUTHENTIC KHMER SUBSCRIPTS */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
            <Type className="w-5 h-5 text-teal-700" />
            <h2 className="text-h2 font-bold text-slate-900">
              2. Typography Scale & Khmer Script (Kantumruy Pro, line-height 1.7)
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Latin Type Scale */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
              <span className="text-caption font-mono text-teal-700 uppercase font-bold tracking-wider">
                Fluid Latin Type Scale (Plus Jakarta Sans)
              </span>
              <div className="space-y-3">
                <div className="border-b border-slate-100 pb-2">
                  <div className="text-caption font-mono text-slate-400">text-display (clamp 36-56px)</div>
                  <div className="text-display font-extrabold text-slate-900 tracking-tight leading-none mt-1">
                    Display Title
                  </div>
                </div>
                <div className="border-b border-slate-100 pb-2">
                  <div className="text-caption font-mono text-slate-400">text-h1 (clamp 30-40px)</div>
                  <div className="text-h1 font-bold text-slate-900 tracking-tight mt-1">
                    Heading 1 Section
                  </div>
                </div>
                <div className="border-b border-slate-100 pb-2">
                  <div className="text-caption font-mono text-slate-400">text-h2 (clamp 22-30px)</div>
                  <div className="text-h2 font-bold text-slate-900 tracking-tight mt-1">
                    Heading 2 Subtitle
                  </div>
                </div>
                <div className="border-b border-slate-100 pb-2">
                  <div className="text-caption font-mono text-slate-400">text-h3 (clamp 18-22px)</div>
                  <div className="text-h3 font-semibold text-slate-900 mt-1">
                    Heading 3 Component Title
                  </div>
                </div>
                <div className="border-b border-slate-100 pb-2">
                  <div className="text-caption font-mono text-slate-400">text-body (16px, iOS Safe)</div>
                  <div className="text-body text-slate-700 mt-1">
                    Body text for tutor bios, dialogue explanations, and descriptions.
                  </div>
                </div>
                <div className="border-b border-slate-100 pb-2">
                  <div className="text-caption font-mono text-slate-400">text-small (14px) & text-caption (12px)</div>
                  <div className="text-small text-slate-600 mt-1">
                    Secondary labels (14px) and <span className="text-caption text-slate-400 font-medium">micro metadata (12px)</span>. No 10px/11px text used.
                  </div>
                </div>
              </div>
            </div>

            {/* Khmer Subscripts Test Card */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-caption font-mono text-amber-700 uppercase font-bold tracking-wider">
                  Khmer Script Validation (Kantumruy Pro · line-height 1.7)
                </span>
                <span className="text-caption font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                  Zero Subscript Clipping
                </span>
              </div>

              <div className="space-y-4">
                
                {/* Decorative Khmer Header (Moul) */}
                <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/80">
                  <div className="text-caption font-mono text-amber-900 font-bold">
                    font-khmer-heading (Moul Decorative Calligraphy)
                  </div>
                  <div className="font-khmer-heading text-2xl sm:text-3xl text-amber-950 mt-1">
                    សួស្តីព្រះរាជាណាចក្រកម្ពុជា
                  </div>
                  <div className="text-caption text-amber-800 mt-0.5">
                    "Soursdey Preah Reacheanachak Kampuchea" (Hello Kingdom of Cambodia)
                  </div>
                </div>

                {/* Complex Stacked Subscript Clusters */}
                <div className="space-y-2">
                  <div className="text-caption font-mono text-slate-500 font-semibold">
                    Stacked Consonants & Dependent Vowel Height Test:
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-small">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 font-khmer">
                      <div className="text-lg font-bold text-teal-900 leading-[1.7]">
                        ក្បាច់ខ្មែរ
                      </div>
                      <div className="text-caption text-slate-500 font-sans">
                        Subscript: ្ច + Vowel ែ
                      </div>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 font-khmer">
                      <div className="text-lg font-bold text-teal-900 leading-[1.7]">
                        ខ្ញុំឈ្មោះ បុប្ផា
                      </div>
                      <div className="text-caption text-slate-500 font-sans">
                        Subscript: ្ញ + ្ម + ្ផ
                      </div>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 font-khmer">
                      <div className="text-lg font-bold text-teal-900 leading-[1.7]">
                        កិត្តិនាមសិល្បៈ
                      </div>
                      <div className="text-caption text-slate-500 font-sans">
                        Subscript: ្ត + Vowel ិ + ្ប
                      </div>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 font-khmer">
                      <div className="text-lg font-bold text-teal-900 leading-[1.7]">
                        រាជធានីភ្នំពេញ
                      </div>
                      <div className="text-caption text-slate-500 font-sans">
                        Subscript: ្ន + Vowel ំ + េ + ញ
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* 3. BUTTONS & ICON BUTTONS */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
            <Layers className="w-5 h-5 text-teal-700" />
            <h2 className="text-h2 font-bold text-slate-900">
              3. Button & IconButton Primitives (44px Mobile Ergonomics)
            </h2>
          </div>

          <Card padding="md">
            <div className="space-y-6">
              
              {/* Variants */}
              <div className="space-y-2">
                <span className="text-caption font-mono text-slate-400 font-bold uppercase">
                  Variants (Primary, Secondary, Ghost, Gold)
                </span>
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="primary" leftIcon={<Sparkles className="w-4 h-4" />}>
                    Primary Action
                  </Button>
                  <Button variant="secondary" leftIcon={<Calendar className="w-4 h-4" />}>
                    Secondary Outline
                  </Button>
                  <Button variant="ghost" leftIcon={<Mail className="w-4 h-4" />}>
                    Ghost Link
                  </Button>
                  <Button variant="gold" leftIcon={<GraduationCap className="w-4 h-4" />}>
                    Angkor Gold CTA
                  </Button>
                </div>
              </div>

              {/* Sizes */}
              <div className="space-y-2">
                <span className="text-caption font-mono text-slate-400 font-bold uppercase">
                  Sizes (sm: 36px/44px touch, md: 44px, lg: 48px)
                </span>
                <div className="flex flex-wrap items-center gap-3">
                  <Button size="sm">Small Button (sm)</Button>
                  <Button size="md">Medium Standard (md)</Button>
                  <Button size="lg">Large Prominent (lg)</Button>
                </div>
              </div>

              {/* Loading & Disabled States */}
              <div className="space-y-2">
                <span className="text-caption font-mono text-slate-400 font-bold uppercase">
                  States: Interactive Loading & Disabled
                </span>
                <div className="flex flex-wrap items-center gap-3">
                  <Button
                    loading={btnLoading}
                    onClick={handleSimulateLoad}
                  >
                    Click to Test Loading
                  </Button>
                  <Button disabled variant="primary">
                    Disabled Primary
                  </Button>
                  <Button disabled variant="secondary">
                    Disabled Secondary
                  </Button>
                  <Button disabled variant="gold">
                    Disabled Gold
                  </Button>
                </div>
              </div>

              {/* IconButtons with required aria-label */}
              <div className="space-y-2">
                <span className="text-caption font-mono text-slate-400 font-bold uppercase">
                  IconButton (Requires mandatory aria-label for accessibility)
                </span>
                <div className="flex flex-wrap items-center gap-3">
                  <IconButton aria-label="Add to bookmarks" variant="primary">
                    <Bookmark className="w-5 h-5" />
                  </IconButton>
                  <IconButton aria-label="Favorite tutor" variant="secondary">
                    <Heart className="w-5 h-5 text-rose-500" />
                  </IconButton>
                  <IconButton aria-label="Send direct message" variant="ghost">
                    <Mail className="w-5 h-5" />
                  </IconButton>
                  <IconButton aria-label="Share profile" variant="gold">
                    <Share2 className="w-5 h-5" />
                  </IconButton>
                  <IconButton aria-label="Play native audio" variant="secondary" size="sm">
                    <Volume2 className="w-4 h-4 text-teal-600" />
                  </IconButton>
                  <IconButton aria-label="Search curriculum" variant="ghost" size="lg">
                    <Search className="w-6 h-6" />
                  </IconButton>
                </div>
              </div>

            </div>
          </Card>
        </section>

        {/* 4. BADGES & SELECTABLE CHIPS */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
            <CheckCircle2 className="w-5 h-5 text-teal-700" />
            <h2 className="text-h2 font-bold text-slate-900">
              4. Badges & Selectable Chips (aria-pressed)
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Badges */}
            <Card padding="md" className="space-y-4">
              <CardTitle>Badge Primitives</CardTitle>
              <CardDescription>
                Compact pill markers for tutor verification, ratings, and statuses.
              </CardDescription>

              <div className="flex flex-wrap items-center gap-2 pt-2">
                <Badge variant="default" dot>
                  Verified Tutor
                </Badge>
                <Badge variant="gold" icon={<Sparkles className="w-3.5 h-3.5 mr-1" />}>
                  Super Tutor
                </Badge>
                <Badge variant="success" dot>
                  Online Now
                </Badge>
                <Badge variant="warning">
                  Limited Slots
                </Badge>
                <Badge variant="danger">
                  Booking Full
                </Badge>
                <Badge variant="secondary">
                  Royal Univ.
                </Badge>
                <Badge variant="outline">
                  Conversational
                </Badge>
              </div>
            </Card>

            {/* Selectable Chips */}
            <Card padding="md" className="space-y-4">
              <CardTitle>Selectable Chips</CardTitle>
              <CardDescription>
                Clickable chips with aria-pressed state for instant filtering.
              </CardDescription>

              <div className="flex flex-wrap items-center gap-2 pt-2">
                {[
                  'Conversational',
                  'Market Khmer',
                  'Tuk-Tuk Directions',
                  'Alphabet & Script',
                  'Business Khmer',
                  'Kids & Beginners',
                ].map((chip) => (
                  <Chip
                    key={chip}
                    selected={selectedChips.includes(chip)}
                    onToggle={() => toggleChip(chip)}
                  >
                    {chip}
                  </Chip>
                ))}
              </div>

              <p className="text-caption text-slate-500 pt-2 border-t border-slate-100">
                Selected: <strong className="text-slate-800">{selectedChips.join(', ') || 'None'}</strong>
              </p>
            </Card>

          </div>
        </section>

        {/* 5. CARDS, AVATARS, RATINGS & PRICES */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
            <Sparkles className="w-5 h-5 text-teal-700" />
            <h2 className="text-h2 font-bold text-slate-900">
              5. Cards, Avatars, Ratings & Price Tokens
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Standard Card */}
            <Card variant="default" hoverable padding="md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="default">Micro-Lesson</Badge>
                  <Rating value={4.9} reviewsCount={48} size="sm" />
                </div>
                <CardTitle className="mt-2">1-on-1 Practice Card</CardTitle>
                <CardDescription>
                  Custom compound card with soft low-opacity shadow and subtle hover lift.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <Avatar name="Sophea Rath" size="lg" status="online" />
                  <div>
                    <div className="font-bold text-slate-900 text-small">Sophea Rath</div>
                    <div className="text-caption text-slate-500">Royal Univ. of Law & Econ.</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-between">
                <Price amount={8} period="/hr" khrEquivalent={true} size="sm" />
                <Button size="sm" variant="primary">Book Slot</Button>
              </CardFooter>
            </Card>

            {/* Trial Offer Card (Surface-2) */}
            <Card variant="surface-2" padding="md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="gold">Starter Promo</Badge>
                  <span className="text-caption font-mono text-teal-700 font-semibold">15-min Trial</span>
                </div>
                <CardTitle className="mt-2">Introductory Trial</CardTitle>
                <CardDescription>
                  Affordable test lesson to meet your Cambodian university tutor.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-white p-3 rounded-xl border border-slate-200/80 flex items-center justify-between">
                  <div>
                    <div className="text-caption text-slate-400">Regular price: $5.00</div>
                    <Price amount={3} originalAmount={5} period="/trial" size="md" highlight />
                  </div>
                  <Avatar name="Channak Dy" size="md" status="online" />
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="gold" fullWidth size="sm">Claim $3 Trial</Button>
              </CardFooter>
            </Card>

            {/* Interactive Rating & Avatar Fallback Card */}
            <Card variant="bordered" padding="md">
              <CardHeader>
                <CardTitle>Interactive Widgets</CardTitle>
                <CardDescription>
                  Testing initials fallback & interactive star picker.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                
                {/* Avatar Fallback Row */}
                <div>
                  <div className="text-caption font-semibold text-slate-600 mb-2">
                    Avatar Sizes & Fallback Initials:
                  </div>
                  <div className="flex items-center gap-2">
                    <Avatar name="Alex Morgan" size="sm" status="online" />
                    <Avatar name="Bunheng Sok" size="md" status="busy" />
                    <Avatar name="Kosal Vanna" size="lg" status="offline" />
                    <Avatar name="Chenda Keo" size="xl" status="online" />
                  </div>
                </div>

                {/* Interactive Star Rating */}
                <div className="pt-2 border-t border-slate-100">
                  <div className="text-caption font-semibold text-slate-600 mb-1">
                    Click Star to Rate (Interactive):
                  </div>
                  <Rating
                    value={interactiveRating}
                    interactive
                    onChange={(r) => {
                      setInteractiveRating(r);
                      addToast({
                        title: `Rating selected: ${r} stars`,
                        variant: 'info',
                      });
                    }}
                    size="lg"
                  />
                </div>

              </CardContent>
            </Card>

          </div>
        </section>

        {/* 6. FORM INPUTS & SELECT (16px Mobile Safe) */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
            <Mail className="w-5 h-5 text-teal-700" />
            <h2 className="text-h2 font-bold text-slate-900">
              6. Form Controls: Input & Select (16px Font Prevents iOS Zoom)
            </h2>
          </div>

          <Card padding="md">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Standard Input */}
              <Input
                label="Learner Full Name"
                placeholder="e.g. Alex Morgan"
                required
                leftIcon={<Mail className="w-4 h-4" />}
                helperText="Displayed to your Cambodian tutor upon booking."
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  if (inputError) setInputError('');
                }}
              />

              {/* Error Input */}
              <Input
                label="Student Email Address"
                placeholder="alex@domain.com"
                required
                error={inputError || 'Please enter a valid email format'}
                value="alex-invalid-email"
                onChange={() => {}}
              />

              {/* Select */}
              <Select
                label="Learning Focus Area"
                value={selectValue}
                onChange={(e) => setSelectValue(e.target.value)}
                options={[
                  { value: 'conversational', label: 'Conversational Fluency' },
                  { value: 'market', label: 'Market Shopping & Bargaining' },
                  { value: 'transport', label: 'Tuk-Tuk Directions & Map' },
                  { value: 'business', label: 'Formal Business Khmer' },
                ]}
                helperText="Select module curriculum focus."
              />

            </div>
          </Card>
        </section>

        {/* 7. TABS, SKELETONS & EMPTY STATE */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
            <Layers className="w-5 h-5 text-teal-700" />
            <h2 className="text-h2 font-bold text-slate-900">
              7. Tabs, Skeletons & Empty State
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Tabs & Skeletons */}
            <Card padding="md" className="space-y-6">
              <CardTitle>Animated Tabs & Shimmer Skeletons</CardTitle>

              {/* Tabs Component */}
              <Tabs
                tabs={[
                  { id: 'tab-1', label: 'All Tutors', badge: 8 },
                  { id: 'tab-2', label: 'Conversational', badge: 5 },
                  { id: 'tab-3', label: 'Super Tutors', badge: 3 },
                ]}
                activeId={activeTab}
                onChange={setActiveTab}
                variant="pills"
              />

              {/* Underline Variant */}
              <Tabs
                tabs={[
                  { id: 'tab-1', label: 'Overview' },
                  { id: 'tab-2', label: 'Curriculum' },
                  { id: 'tab-3', label: 'Reviews' },
                ]}
                activeId={activeTab}
                onChange={setActiveTab}
                variant="underline"
              />

              {/* Skeletons */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <span className="text-caption font-mono text-slate-400 font-bold uppercase">
                  Skeleton Loading Placeholders
                </span>
                <div className="flex items-center gap-3">
                  <Skeleton variant="circular" width={48} height={48} />
                  <div className="flex-1 space-y-2">
                    <Skeleton variant="text" width="60%" />
                    <Skeleton variant="text" width="90%" />
                  </div>
                </div>
                <Skeleton variant="rectangular" height={54} />
              </div>
            </Card>

            {/* Empty State */}
            <EmptyState
              icon={<Search className="w-8 h-8" />}
              title="No Lessons Scheduled Yet"
              description="Browse our verified undergraduate Cambodian tutors to book your first $3 introductory trial or regular 1-hour practice session."
              action={{
                label: 'Find a Khmer Tutor',
                onClick: onBackToApp,
                variant: 'primary',
              }}
              secondaryAction={{
                label: 'Explore 6-Module Curriculum',
                onClick: onBackToApp,
              }}
            />

          </div>
        </section>

        {/* 8. INTERACTIVE TOAST DISPATCHER */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
            <Bell className="w-5 h-5 text-teal-700" />
            <h2 className="text-h2 font-bold text-slate-900">
              8. Toast Notification System
            </h2>
          </div>

          <Card padding="md">
            <CardDescription className="mb-4">
              Trigger animated feedback alerts with auto-dismiss timers and action buttons.
            </CardDescription>

            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant="primary"
                onClick={() =>
                  addToast({
                    title: 'Trial Lesson Booked!',
                    message: 'Your 1-on-1 slot with Sophea Rath on Tue at 9:00 AM has been confirmed.',
                    variant: 'success',
                    action: {
                      label: 'View in My Lessons',
                      onClick: onBackToApp,
                    },
                  })
                }
              >
                Trigger Success Toast
              </Button>

              <Button
                variant="secondary"
                onClick={() =>
                  addToast({
                    title: 'Audio Download Complete',
                    message: 'MP3 recording cached for offline practice.',
                    variant: 'info',
                  })
                }
              >
                Trigger Info Toast
              </Button>

              <Button
                variant="gold"
                onClick={() =>
                  addToast({
                    title: 'Slot Filling Up Fast',
                    message: 'Only 2 available afternoon timeslots remain for this tutor.',
                    variant: 'warning',
                  })
                }
              >
                Trigger Warning Toast
              </Button>

              <Button
                variant="secondary"
                className="text-red-700 border-red-200 hover:bg-red-50"
                onClick={() =>
                  addToast({
                    title: 'Payment Incomplete',
                    message: 'The ABA PayWay checkout was cancelled.',
                    variant: 'danger',
                  })
                }
              >
                Trigger Danger Toast
              </Button>
            </div>
          </Card>
        </section>

      </div>

      {/* 9. INTERACTIVE SHEET / DRAWER DEMO */}
      <Sheet
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        title="Interactive Sheet Primitive"
        description="Swipe down to dismiss on mobile (< md), or use Esc / close button."
      >
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 text-teal-900 space-y-1">
            <div className="font-bold text-small flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-teal-700" />
              <span>Responsive Sheet Behavior Verified</span>
            </div>
            <p className="text-caption text-teal-800">
              On screen widths below 768px (like iPhone 390px), this component mounts as a bottom sheet with drag-to-dismiss gesture handling. On tablet/desktop screens (≥ 768px), it displays as an accessible dialog with backdrop blur.
            </p>
          </div>

          <Input
            label="Trial Practice Focus"
            placeholder="e.g. Tuk-Tuk bargaining dialogue"
            helperText="What would you like to focus on?"
          />

          <div className="space-y-2">
            <label className="text-small font-semibold text-slate-800">
              Select Preferred Duration:
            </label>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="secondary" size="sm">
                15-Min Trial ($3)
              </Button>
              <Button variant="primary" size="sm">
                60-Min Standard ($8)
              </Button>
            </div>
          </div>

          <div className="pt-4 flex items-center gap-3">
            <Button
              variant="primary"
              fullWidth
              onClick={() => {
                setIsSheetOpen(false);
                addToast({
                  title: 'Sheet Form Submitted',
                  variant: 'success',
                });
              }}
            >
              Confirm Selection
            </Button>
            <Button variant="ghost" onClick={() => setIsSheetOpen(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </Sheet>

    </div>
  );
};
