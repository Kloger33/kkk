import React, { createContext, useContext, useState, useEffect } from 'react';

export type AppLanguage = 'en' | 'km';

export interface TranslationSample {
  key: string;
  en: string;
  km: string;
  reviewed: boolean;
}

export interface TranslationNamespace {
  id: string;
  name: string;
  totalKeys: number;
  translatedKeys: number;
  reviewStatus: 'Needs native review' | 'Reviewed';
  samples: TranslationSample[];
}

const DICTIONARY: Record<AppLanguage, Record<string, string>> = {
  en: {
    'brand.name': 'KhmerTutors Online',
    'brand.short': 'KhmerTutors',
    'brand.tagline': 'Micro-Tutoring Marketplace · Cambodia',
    'nav.findTutors': 'Find Tutors',
    'nav.curriculum': 'Curriculum',
    'nav.myDashboard': 'My Dashboard',
    'nav.myLessons': 'My Lessons',
    'nav.becomeTutor': 'Become a Tutor',
    'nav.login': 'Log In',
    'nav.signup': 'Sign Up',
    'nav.adminPortal': 'Admin Portal',
    'nav.tutorPortal': 'Tutor Workspace',
    'nav.marketplace': 'Marketplace',
    'nav.logout': 'Log out',
    'lang.notice': 'Khmer copy is draft machine/team translation and needs native-speaker review.',

    'hero.kicker': 'Verified Cambodian University Tutors',
    'hero.title': '1-on-1 Online Khmer Tutors for Foreigners & Expats',
    'hero.subtitle':
      'Learn conversational Khmer with verified undergraduate tutors from RUPP, ITC, and PUC. Book flexible 1-hour lessons or trial sessions starting at $3.',
    'hero.ctaPrimary': 'Find a Tutor',
    'hero.ctaSecondary': 'Book a Trial Lesson',
    'hero.guarantee1': 'Free to sign up · pay per lesson',
    'hero.guarantee2': 'No subscription',
    'hero.stat1': 'Tutors',
    'hero.stat2': 'Trials from',
    'hero.stat3': 'Private lessons',
    'hero.stat4': 'Universities',

    'leaderboard.title': 'Tutor Leaderboard',
    'leaderboard.subtitle': 'Top 3 verified tutors across quality, teaching volume, and hourly rate.',
    'leaderboard.bestRated': 'Best rated',
    'leaderboard.mostLessons': 'Most lessons',
    'leaderboard.topRate': 'Top rate/hr',
    'leaderboard.lessonsUnit': 'lessons',

    'filters.allFocuses': 'All Focuses',
    'filters.searchPlaceholder': 'Search tutor, university, topic...',
    'filters.superTutors': 'Super Tutors',
    'filters.savedTutors': 'Saved Tutors',
    'filters.reset': 'Reset',
    'filters.foundSuffix': 'tutors found',

    'card.nativeKhmer': 'Native Khmer',
    'card.bookTrial': 'Book trial',
    'card.preview': 'Preview',
    'card.save': 'Save',
    'card.saved': 'Saved',
    'card.perHour': '/ 60-min lesson',
    'toast.tutorSaved': 'Saved {name}',
    'toast.tutorRemoved': 'Removed {name} from saved tutors',
    'toast.viewSaved': 'View saved',
    'toast.undo': 'Undo',

    'panel.title': 'Weekly Availability',
    'panel.subtitle': 'Select any tutor card to inspect their 7-day Phnom Penh (GMT+7) slots.',
    'panel.openFull': 'Video & Full Profile',
    'panel.clickSlot': 'Click an open time slot to book directly',
    'panel.noSlots': 'No open slots',

    'booking.title': 'Book with',
    'booking.payMethods': 'Select Payment Method',
    'booking.abaPay': 'ABA Pay',
    'booking.khqr': 'KHQR (Bakong)',
    'booking.card': 'Credit / Debit Card',

    'tutor.overview': 'Overview',
    'tutor.schedule': 'Schedule',
    'tutor.lessons': 'Lessons',
    'tutor.students': 'Students',
    'tutor.earnings': 'Earnings & Payouts',
    'tutor.trackerTitle': 'Application Verification Tracker',
    'tutor.payoutTitle': 'Withdraw Earnings (ABA / Wing)',
  },
  km: {
    'brand.name': 'KhmerTutors Online',
    'brand.short': 'KhmerTutors',
    'brand.tagline': 'ទីផ្សារបង្រៀនភាសាខ្មែរ · កម្ពុជា',
    'nav.findTutors': 'ស្វែងរកគ្រូ',
    'nav.curriculum': 'កម្មវិធីសិក្សា',
    'nav.myDashboard': 'ផ្ទាំងគ្រប់គ្រង',
    'nav.myLessons': 'មេរៀនរបស់ខ្ញុំ',
    'nav.becomeTutor': 'ក្លាយជាគ្រូបង្រៀន',
    'nav.login': 'ចូលគណនី',
    'nav.signup': 'ចុះឈ្មោះ',
    'nav.adminPortal': 'ផ្ទាំងអ្នកគ្រប់គ្រង',
    'nav.tutorPortal': 'កន្លែងធ្វើការគ្រូ',
    'nav.marketplace': 'ទីផ្សារគ្រូ',
    'nav.logout': 'ចាកចេញ',
    'lang.notice': 'អត្ថបទភាសាខ្មែរកំពុងរង់ចាំការត្រួតពិនិត្យដោយអ្នកនិយាយដើមកំណើត (Needs native-speaker review)។',

    'hero.kicker': 'គ្រូនិស្សិតសាកលវិទ្យាល័យកម្ពុជា ដែលបានផ្ទៀងផ្ទាត់',
    'hero.title': 'រៀនភាសាខ្មែរតាមអនឡាញ ១-ទល់-១ សម្រាប់ជនបរទេស',
    'hero.subtitle':
      'រៀនសន្ទនាភាសាខ្មែរជាមួយគ្រូនិស្សិតពី RUPP, ITC និង PUC។ កក់មេរៀនសាកល្បងចាប់ពី $3 ឡើងទៅ។',
    'hero.ctaPrimary': 'ស្វែងរកគ្រូបង្រៀន',
    'hero.ctaSecondary': 'កក់មេរៀនសាកល្បង',
    'hero.guarantee1': 'ចុះឈ្មោះឥតគិតថ្លៃ · បង់តាមមេរៀន',
    'hero.guarantee2': 'គ្មានការជាវប្រចាំ',
    'hero.stat1': 'គ្រូបង្រៀន',
    'hero.stat2': 'សាកល្បងចាប់ពី',
    'hero.stat3': 'មេរៀនផ្ទាល់ខ្លួន',
    'hero.stat4': 'សាកលវិទ្យាល័យ',

    'leaderboard.title': 'តារាងចំណាត់ថ្នាក់គ្រូ',
    'leaderboard.subtitle': 'គ្រូកំពូលទាំង ៣ តាមពិន្ទុវាយតម្លៃ ចំនួនមេរៀន និងតម្លៃក្នុងមួយម៉ោង។',
    'leaderboard.bestRated': 'ពិន្ទុខ្ពស់បំផុត',
    'leaderboard.mostLessons': 'មេរៀនច្រើនបំផុត',
    'leaderboard.topRate': 'តម្លៃ/ម៉ោងខ្ពស់បំផុត',
    'leaderboard.lessonsUnit': 'មេរៀន',

    'filters.allFocuses': 'គ្រប់ផ្នែកទាំងអស់',
    'filters.searchPlaceholder': 'ស្វែងរកឈ្មោះគ្រូ សាកលវិទ្យាល័យ...',
    'filters.superTutors': 'គ្រូឆ្នើម',
    'filters.savedTutors': 'គ្រូដែលបានរក្សាទុក',
    'filters.reset': 'កំណត់ឡើងវិញ',
    'filters.foundSuffix': 'គ្រូត្រូវបានរកឃើញ',

    'card.nativeKhmer': 'ភាសាខ្មែរដើមកំណើត',
    'card.bookTrial': 'កក់សាកល្បង',
    'card.preview': 'មើលជាមុន',
    'card.save': 'រក្សាទុក',
    'card.saved': 'បានរក្សាទុក',
    'card.perHour': '/ ៦០ នាទី',
    'toast.tutorSaved': 'បានរក្សាទុក {name}',
    'toast.tutorRemoved': 'បានដក {name} ចេញពីបញ្ជីរក្សាទុក',
    'toast.viewSaved': 'មើលបញ្ជី',
    'toast.undo': 'ត្រឡប់វិញ',

    'panel.title': 'កាលវិភាគប្រចាំសប្តាហ៍',
    'panel.subtitle': 'ជ្រើសរើសគ្រូណាម្នាក់ដើម្បីមើលម៉ោងទំនេរ ៧ ថ្ងៃ (ម៉ោងភ្នំពេញ GMT+7)។',
    'panel.openFull': 'មើលវីដេអូ និងប្រវត្តិរូបពេញ',
    'panel.clickSlot': 'ចុចលើម៉ោងទំនេរដើម្បីកក់ភ្លាមៗ',
    'panel.noSlots': 'គ្មានម៉ោងទំនេរ',

    'booking.title': 'កក់មេរៀនជាមួយ',
    'booking.payMethods': 'ជ្រើសរើសវិធីទូទាត់',
    'booking.abaPay': 'ABA Pay',
    'booking.khqr': 'KHQR (បាគង)',
    'booking.card': 'កាតឥណទាន / ឥណពន្ធ',

    'tutor.overview': 'ទិដ្ឋភាពទូទៅ',
    'tutor.schedule': 'កាលវិភាគ',
    'tutor.lessons': 'មេរៀន',
    'tutor.students': 'សិស្ស',
    'tutor.earnings': 'ប្រាក់ចំណូល និងដកប្រាក់',
    'tutor.trackerTitle': 'ដំណើរការផ្ទៀងផ្ទាត់ពាក្យសុំ',
    'tutor.payoutTitle': 'ដកប្រាក់ចំណូល (ABA / Wing)',
  },
};

export const INITIAL_TRANSLATION_NAMESPACES: TranslationNamespace[] = [
  {
    id: 'nav',
    name: 'Navigation & Header Chrome',
    totalKeys: 13,
    translatedKeys: 13,
    reviewStatus: 'Needs native review',
    samples: [
      { key: 'nav.findTutors', en: 'Find Tutors', km: 'ស្វែងរកគ្រូ', reviewed: true },
      { key: 'nav.curriculum', en: 'Curriculum', km: 'កម្មវិធីសិក្សា', reviewed: false },
      { key: 'nav.becomeTutor', en: 'Become a Tutor', km: 'ក្លាយជាគ្រូបង្រៀន', reviewed: false },
    ],
  },
  {
    id: 'marketplace',
    name: 'Hero, Leaderboard & Filters',
    totalKeys: 18,
    translatedKeys: 18,
    reviewStatus: 'Needs native review',
    samples: [
      { key: 'hero.title', en: '1-on-1 Online Khmer Tutors for Foreigners & Expats', km: 'រៀនភាសាខ្មែរតាមអនឡាញ ១-ទល់-១ សម្រាប់ជនបរទេស', reviewed: false },
      { key: 'leaderboard.bestRated', en: 'Best rated', km: 'ពិន្ទុខ្ពស់បំផុត', reviewed: true },
      { key: 'leaderboard.mostLessons', en: 'Most lessons', km: 'មេរៀនច្រើនបំផុត', reviewed: false },
    ],
  },
  {
    id: 'cards_availability',
    name: 'Tutor Cards & Weekly Availability Grid',
    totalKeys: 10,
    translatedKeys: 10,
    reviewStatus: 'Needs native review',
    samples: [
      { key: 'card.bookTrial', en: 'Book trial', km: 'កក់សាកល្បង', reviewed: false },
      { key: 'card.preview', en: 'Preview', km: 'មើលជាមុន', reviewed: false },
      { key: 'panel.title', en: 'Weekly Availability', km: 'កាលវិភាគប្រចាំសប្តាហ៍', reviewed: false },
    ],
  },
  {
    id: 'booking_payments',
    name: 'Checkout (ABA Pay / KHQR / Card)',
    totalKeys: 6,
    translatedKeys: 6,
    reviewStatus: 'Needs native review',
    samples: [
      { key: 'booking.abaPay', en: 'ABA Pay', km: 'ABA Pay', reviewed: true },
      { key: 'booking.khqr', en: 'KHQR (Bakong)', km: 'KHQR (បាគង)', reviewed: true },
      { key: 'booking.card', en: 'Credit / Debit Card', km: 'កាតឥណទាន / ឥណពន្ធ', reviewed: false },
    ],
  },
  {
    id: 'tutor_admin',
    name: 'Tutor Dashboard & Admin Operations',
    totalKeys: 9,
    translatedKeys: 9,
    reviewStatus: 'Needs native review',
    samples: [
      { key: 'tutor.trackerTitle', en: 'Application Verification Tracker', km: 'ដំណើរការផ្ទៀងផ្ទាត់ពាក្យសុំ', reviewed: false },
      { key: 'tutor.payoutTitle', en: 'Withdraw Earnings (ABA / Wing)', km: 'ដកប្រាក់ចំណូល (ABA / Wing)', reviewed: false },
    ],
  },
];

interface LanguageContextType {
  language: AppLanguage;
  setLanguage: (lang: AppLanguage) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<AppLanguage>(() => {
    try {
      const saved = localStorage.getItem('kto_lang');
      return saved === 'km' ? 'km' : 'en';
    } catch {
      return 'en';
    }
  });

  const setLanguage = (lang: AppLanguage) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('kto_lang', lang);
    } catch {}
  };

  useEffect(() => {
    document.documentElement.lang = language === 'km' ? 'km' : 'en';
  }, [language]);

  const toggleLanguage = () => setLanguage(language === 'en' ? 'km' : 'en');

  const t = (key: string): string => {
    return DICTIONARY[language][key] || DICTIONARY.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return ctx;
};
