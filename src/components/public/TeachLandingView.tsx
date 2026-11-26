import React from 'react';
import { 
  GraduationCap, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  ShieldCheck, 
  DollarSign, 
  BookOpen, 
  Building2, 
  Star, 
  Users,
  QrCode,
  HelpCircle
} from 'lucide-react';

interface TeachLandingViewProps {
  onApplyToTeach: () => void;
  onBrowseTutors: () => void;
}

export const TeachLandingView: React.FC<TeachLandingViewProps> = ({
  onApplyToTeach,
  onBrowseTutors,
}) => {
  return (
    <div className="bg-[#f8fafc] text-slate-900 font-display pb-24">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-teal-900 via-slate-900 to-slate-950 text-white pt-14 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1280px] w-full mx-auto relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-300 text-xs font-bold tracking-wide uppercase">
            <GraduationCap className="w-4 h-4 text-amber-400" />
            <span>For Cambodian University Students · RUPP · ITC · PUC · NUM</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight max-w-3xl mx-auto leading-[1.12]">
            Teach Khmer 1-on-1 to Foreigners & Expats in Phnom Penh
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Earn <strong>$6–$10 / hour</strong> between your university lectures. Teach conversational Khmer online from your dorm or home. Zero agency deductions, and instant domestic settlement straight to your ABA Bank or Bakong KHQR.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onApplyToTeach}
              className="w-full sm:w-auto px-7 py-3.5 bg-teal-500 hover:bg-teal-400 active:bg-teal-600 text-slate-950 font-black text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Apply to Teach (7-Step Wizard)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onBrowseTutors}
              className="w-full sm:w-auto px-6 py-3.5 bg-white/10 hover:bg-white/15 text-white font-semibold text-sm rounded-xl border border-white/20 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Explore Marketplace as Student</span>
            </button>
          </div>

          {/* Quick trust metrics */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-slate-400 border-t border-slate-800/80 max-w-3xl mx-auto">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-400" />
              <span>Verified Cambodian University ID</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>1-Hour Flexible Micro-Slots</span>
            </div>
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-emerald-400" />
              <span>Instant ABA / Bakong Payouts</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4 CORE ADVANTAGES */}
      <section className="max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
            Why Teach on KhmerTutors Online?
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Designed Specifically for College Students in Cambodia
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Traditional tutoring centers demand rigid 4-hour evening shifts and charge 30–50% agency fees. KTO lets you teach on your schedule.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Clock,
              title: 'Flexible 1-Hour Micro-Slots',
              desc: 'Open hours between classes, in the evening, or on weekends. Close slots during midterm and exam weeks with 1 tap.',
              tag: 'Your Schedule',
              color: 'text-amber-600 bg-amber-50 border-amber-200',
            },
            {
              icon: Users,
              title: 'Respectful Expat Learners',
              desc: 'Connect with motivated embassy staff, NGO directors, foreign teachers, and digital nomads living in Phnom Penh.',
              tag: 'Motivated Students',
              color: 'text-teal-600 bg-teal-50 border-teal-200',
            },
            {
              icon: BookOpen,
              title: 'Pre-Made Starter Curriculum',
              desc: 'Never stress over lesson plans. Access 6 ready-made interactive modules covering greetings, tuk-tuk navigation, markets, and food.',
              tag: 'Zero Lesson Prep',
              color: 'text-sky-600 bg-sky-50 border-sky-200',
            },
            {
              icon: QrCode,
              title: 'Instant Domestic Settlement',
              desc: 'Earnings settle directly to your ABA Bank or Bakong KHQR with minimal local clearing costs. Zero international wire fees.',
              tag: 'ABA & Bakong',
              color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${item.color}`}>
                    <Icon className="w-6 h-6 stroke-[2]" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
                <div className="pt-3 border-t border-slate-100">
                  <span className="text-[11px] font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full">
                    {item.tag}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1280px] w-full mx-auto space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">
              Simple 4-Step Process
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              From Application to Your First Paid Lesson
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Apply with Student ID',
                desc: 'Upload proof of enrollment from RUPP, ITC, PUC, NUM, or another recognized Cambodian institution.',
              },
              {
                step: '02',
                title: 'Quick Verification (<24h)',
                desc: 'Our academic review team confirms your profile, bio, and English fluency.',
              },
              {
                step: '03',
                title: 'Set Your Hourly Rate',
                desc: 'Choose your trial rate ($3–$4) and hourly rate ($6–$10). Toggle your open timetable slots.',
              },
              {
                step: '04',
                title: 'Teach & Receive Earnings',
                desc: 'Meet your foreign student on Google Meet. Withdraw directly to ABA or Bakong after every completed session.',
              },
            ].map((step, idx) => (
              <div key={idx} className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 relative">
                <span className="text-4xl font-black text-slate-800 block font-mono mb-3">
                  {step.step}
                </span>
                <h3 className="font-bold text-white text-base mb-2">{step.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <button
              onClick={onApplyToTeach}
              className="px-8 py-3.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-sm rounded-xl shadow-md transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Start Your Tutor Application</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* STUDENT TUTOR TESTIMONIALS */}
      <section className="max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Loved by University Tutors in Phnom Penh
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Hear how Cambodian students are supporting their living expenses while practicing English with foreign professionals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              quote: 'KhmerTutors Online lets me earn $150/month while studying Linguistics at RUPP. My expat students are so respectful and genuinely eager to learn authentic everyday Khmer.',
              name: 'Sreynoch Keo',
              university: 'RUPP · Year 3 Khmer Linguistics',
              rating: 5.0,
              lessons: '142 lessons taught',
            },
            {
              quote: 'I teach 5 hours on weekends. The instant ABA PayWay payout means I have spending money for university textbooks and coffee right after finishing a class.',
              name: 'Chamroeun Thearith',
              university: 'ITC · Year 4 Engineering',
              rating: 5.0,
              lessons: '98 lessons taught',
            },
            {
              quote: 'The 6 starter modules make teaching effortless. Even beginner expats quickly learn how to order iced coffee and direct tuk-tuks in their first trial lesson!',
              name: 'Bopha Seng',
              university: 'RUPP · Year 3 English Pedagogy',
              rating: 4.9,
              lessons: '86 lessons taught',
            },
          ].map((t, idx) => (
            <div key={idx} className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-500" />
                  ))}
                </div>
                <p className="text-xs text-slate-700 leading-relaxed italic">
                  “{t.quote}”
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100">
                <div className="font-bold text-slate-900 text-sm">{t.name}</div>
                <div className="text-xs text-teal-700 font-semibold">{t.university}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">{t.lessons}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="max-w-[840px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="text-center space-y-2">
          <HelpCircle className="w-6 h-6 text-teal-600 mx-auto" />
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Frequently Asked Questions by Student Tutors
          </h2>
        </div>

        <div className="space-y-3 text-xs">
          {[
            {
              q: 'Do I need prior professional teaching experience?',
              a: 'No prior formal experience is necessary. As long as you are a native Khmer speaker currently enrolled at a recognized Cambodian university, have good conversational English, and enjoy helping people learn, we provide starter curriculum materials to guide your sessions.',
            },
            {
              q: 'How much can I charge per 1-hour lesson?',
              a: 'Student tutors typically start at $3–$4 for a 30-minute trial lesson and $6–$10 for standard 60-minute classes. As you earn 5-star student reviews and achieve Super Tutor status, you can increase your hourly rate.',
            },
            {
              q: 'How and when do I get paid?',
              a: 'Payments are held securely in Cambodian escrow until each lesson completes. As soon as the lesson ends, funds appear in your tutor balance. You can withdraw instantly to your ABA Bank account or Bakong KHQR with zero wire transfer deductions.',
            },
            {
              q: 'What equipment do I need?',
              a: 'A smartphone or laptop with a working front camera, a stable internet connection (Smart or Cellcard 4G or WiFi), and a quiet place to conduct your video sessions via Google Meet.',
            },
          ].map((faq, i) => (
            <div key={i} className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 space-y-1.5">
              <h3 className="font-bold text-slate-900 text-sm">{faq.q}</h3>
              <p className="text-slate-600 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
