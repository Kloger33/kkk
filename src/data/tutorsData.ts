export interface Tutor {
  id: string;
  name: string;
  avatarBg: string;
  initials: string;
  university: string;
  year: string;
  rating: number;
  reviewsCount: number;
  activeStudents: number;
  lessonsTaught: number;
  hourlyRate: number;
  trialPrice: number;
  languages: { language: string; level: string }[];
  focusAreas: ('Conversational' | 'Business Khmer' | 'Script & Reading' | 'Travel Khmer')[];
  headline: string;
  bio: string;
  teachingExperience: string;
  responseRate: string;
  superTutor: boolean;
  videoUrl?: string;
  videoDuration?: string;
  availability: {
    day: string;
    slots: string[];
  }[];
  reviews: {
    id: string;
    studentName: string;
    studentCountry: string;
    rating: number;
    date: string;
    comment: string;
  }[];
}

export interface CurriculumModule {
  id: string;
  moduleNumber: string;
  title: string;
  objective: string;
  phrases: {
    khmer: string;
    phonetic: string;
    english: string;
    culturalNote?: string;
    audioUrl: string;
  }[];
}

export interface Booking {
  id: string;
  tutorId: string;
  tutorName: string;
  tutorUniversity: string;
  lessonType: 'Trial Lesson (30 min)' | 'Full Lesson (60 min)';
  date: string;
  timeSlot: string;
  price: number;
  paymentMethod: 'Credit Card (Stripe)' | 'ABA PayWay' | 'Bakong KHQR' | 'PayPal';
  meetingLink: string;
  status: 'Confirmed' | 'Completed' | 'Upcoming';
}

export interface MessageThread {
  id: string;
  tutorId: string;
  tutorName: string;
  lastMessage: string;
  lastTimestamp: string;
  unreadCount: number;
  messages: {
    id: string;
    sender: 'user' | 'tutor';
    text: string;
    timestamp: string;
  }[];
}

export const MOCK_TUTORS: Tutor[] = [
  {
    id: 'tutor-1',
    name: 'Bopha Seng',
    avatarBg: 'from-amber-600 to-amber-400',
    initials: 'BS',
    university: 'Royal University of Phnom Penh (RUPP)',
    year: 'Year 3, English Literature',
    rating: 5.0,
    reviewsCount: 48,
    activeStudents: 14,
    lessonsTaught: 182,
    hourlyRate: 8,
    trialPrice: 4,
    languages: [
      { language: 'Khmer', level: 'Native' },
      { language: 'English', level: 'Fluent (IELTS 7.5)' },
    ],
    focusAreas: ['Conversational', 'Travel Khmer', 'Script & Reading'],
    headline: 'Native Khmer tutor · Specialized in practical expat survival phrases & relaxed conversation',
    bio: 'Soursdey! I am Bopha, a 3rd-year student at RUPP. I have helped over 30 foreign expatriates, digital nomads, and NGO workers feel confident speaking daily Khmer on the streets of Phnom Penh. We focus on real-life dialogues: negotiating with tuk-tuk drivers, ordering local market delicacies, and respectful greetings.',
    teachingExperience: '3 years of peer tutoring and language coaching for foreign researchers and volunteers.',
    responseRate: 'Under 15 minutes',
    superTutor: true,
    videoDuration: '1:12',
    availability: [
      { day: 'Mon', slots: ['08:00 AM', '10:00 AM', '02:00 PM', '04:00 PM', '07:00 PM'] },
      { day: 'Tue', slots: ['09:00 AM', '11:00 AM', '03:00 PM', '05:00 PM'] },
      { day: 'Wed', slots: ['08:00 AM', '10:00 AM', '01:00 PM', '04:00 PM', '06:00 PM'] },
      { day: 'Thu', slots: ['10:00 AM', '02:00 PM', '04:00 PM', '07:00 PM'] },
      { day: 'Fri', slots: ['09:00 AM', '01:00 PM', '03:00 PM', '05:00 PM'] },
      { day: 'Sat', slots: ['08:00 AM', '10:00 AM', '01:00 PM', '03:00 PM', '05:00 PM'] },
      { day: 'Sun', slots: ['09:00 AM', '11:00 AM', '02:00 PM'] },
    ],
    reviews: [
      {
        id: 'rev-1',
        studentName: 'Julian Miller',
        studentCountry: 'United States',
        rating: 5,
        date: 'Oct 14, 2026',
        comment: 'Bopha is remarkable. Within 3 lessons I was directing PassApp tuk-tuks and ordering iced coffee with zero hesitation. Her starter module flashcards are super helpful!',
      },
      {
        id: 'rev-2',
        studentName: 'Claire Laurent',
        studentCountry: 'France',
        rating: 5,
        date: 'Oct 02, 2026',
        comment: 'Patient, warm, and very clear pronunciation. She explains the cultural context behind polite pronouns that standard textbooks never teach.',
      },
    ],
  },
  {
    id: 'tutor-2',
    name: 'Sokha Rith',
    avatarBg: 'from-blue-600 to-indigo-500',
    initials: 'SR',
    university: 'Institute of Technology of Cambodia (ITC)',
    year: 'Year 4, Telecommunications',
    rating: 4.9,
    reviewsCount: 36,
    activeStudents: 11,
    lessonsTaught: 145,
    hourlyRate: 9,
    trialPrice: 4,
    languages: [
      { language: 'Khmer', level: 'Native' },
      { language: 'English', level: 'Fluent' },
      { language: 'French', level: 'Intermediate (B1)' },
    ],
    focusAreas: ['Conversational', 'Business Khmer'],
    headline: 'Structured & practical lessons for professionals, diplomats, and NGO directors',
    bio: 'Hello! I am Sokha. I specialize in teaching conversational and professional Khmer for foreign professionals working with local government bodies, community teams, and microfinance institutions. My methodology balances vocabulary with situational listening.',
    teachingExperience: '2.5 years tutoring foreign embassy staff and international development analysts.',
    responseRate: 'Under 30 minutes',
    superTutor: true,
    videoDuration: '1:45',
    availability: [
      { day: 'Mon', slots: ['06:00 PM', '07:00 PM', '08:00 PM'] },
      { day: 'Tue', slots: ['06:00 PM', '07:00 PM'] },
      { day: 'Thu', slots: ['05:00 PM', '07:00 PM', '08:00 PM'] },
      { day: 'Sat', slots: ['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM'] },
      { day: 'Sun', slots: ['09:00 AM', '10:00 AM', '01:00 PM', '03:00 PM'] },
    ],
    reviews: [
      {
        id: 'rev-3',
        studentName: 'Marcus Bennett',
        studentCountry: 'United Kingdom',
        rating: 5,
        date: 'Sep 28, 2026',
        comment: 'Sokha helped me prepare for community field visits. His structured notes on formal address and provincial dialects made a massive difference.',
      },
    ],
  },
  {
    id: 'tutor-3',
    name: 'Chanthy Keo',
    avatarBg: 'from-emerald-600 to-teal-400',
    initials: 'CK',
    university: 'Paññāsāstra University of Cambodia (PUC)',
    year: 'Year 3, International Relations',
    rating: 4.9,
    reviewsCount: 29,
    activeStudents: 9,
    lessonsTaught: 98,
    hourlyRate: 7,
    trialPrice: 3,
    languages: [
      { language: 'Khmer', level: 'Native' },
      { language: 'English', level: 'Fluent' },
    ],
    focusAreas: ['Conversational', 'Travel Khmer'],
    headline: 'Friendly, zero-pressure speaking practice · Fun cultural immersion for beginners',
    bio: 'Choum reap sour! Learning a new language should feel like chatting with a good friend over coconut water. In our sessions, we simulate market bargaining at Psar Thmei, ordering nom banh chok, and making Khmer friends.',
    teachingExperience: '2 years coaching backpackers, digital nomads, and volunteer teachers.',
    responseRate: 'Under 10 minutes',
    superTutor: false,
    videoDuration: '0:55',
    availability: [
      { day: 'Mon', slots: ['10:00 AM', '01:00 PM', '03:00 PM'] },
      { day: 'Wed', slots: ['10:00 AM', '11:00 AM', '02:00 PM', '04:00 PM'] },
      { day: 'Fri', slots: ['01:00 PM', '03:00 PM', '05:00 PM'] },
      { day: 'Sat', slots: ['08:00 AM', '10:00 AM', '01:00 PM'] },
    ],
    reviews: [
      {
        id: 'rev-4',
        studentName: 'Hannah Krause',
        studentCountry: 'Germany',
        rating: 5,
        date: 'Oct 09, 2026',
        comment: 'Chanthy is so encouraging! As a complete beginner with zero tonal experience, she made me feel comfortable from minute one.',
      },
    ],
  },
  {
    id: 'tutor-4',
    name: 'Vannak Ouk',
    avatarBg: 'from-purple-600 to-indigo-600',
    initials: 'VO',
    university: 'Royal University of Law and Economics (RULE)',
    year: 'Year 4, International Business Law',
    rating: 5.0,
    reviewsCount: 42,
    activeStudents: 15,
    lessonsTaught: 210,
    hourlyRate: 11,
    trialPrice: 5,
    languages: [
      { language: 'Khmer', level: 'Native' },
      { language: 'English', level: 'Fluent' },
      { language: 'Mandarin', level: 'Conversational' },
    ],
    focusAreas: ['Business Khmer', 'Script & Reading'],
    headline: 'High-level business Khmer, formal contractual terminology & reading mastery',
    bio: 'Greetings. I specialize in teaching reading, writing, and formal business Khmer for entrepreneurs, investors, and corporate professionals operating in Phnom Penh. Learn to read street signs, menus, and official correspondence.',
    teachingExperience: '4 years of specialized language training for international business operators.',
    responseRate: 'Under 20 minutes',
    superTutor: true,
    videoDuration: '2:05',
    availability: [
      { day: 'Tue', slots: ['07:00 AM', '08:00 AM', '06:00 PM', '08:00 PM'] },
      { day: 'Thu', slots: ['07:00 AM', '08:00 AM', '06:00 PM'] },
      { day: 'Sat', slots: ['08:00 AM', '10:00 AM', '01:00 PM', '03:00 PM', '05:00 PM'] },
      { day: 'Sun', slots: ['08:00 AM', '10:00 AM', '02:00 PM'] },
    ],
    reviews: [
      {
        id: 'rev-5',
        studentName: 'Kenji Takahashi',
        studentCountry: 'Japan',
        rating: 5,
        date: 'Oct 11, 2026',
        comment: 'Vannak demystified the Khmer script for me. In 6 weeks I can now sound out consonants and read real business cards.',
      },
    ],
  },
  {
    id: 'tutor-5',
    name: 'Dany Meas',
    avatarBg: 'from-rose-600 to-amber-500',
    initials: 'DM',
    university: 'Royal University of Fine Arts (RUFA)',
    year: 'Year 2, Traditional Arts & Heritage',
    rating: 4.8,
    reviewsCount: 19,
    activeStudents: 7,
    lessonsTaught: 64,
    hourlyRate: 6,
    trialPrice: 3,
    languages: [
      { language: 'Khmer', level: 'Native' },
      { language: 'English', level: 'Conversational' },
    ],
    focusAreas: ['Conversational', 'Travel Khmer'],
    headline: 'Passionate about Khmer art, traditional culture & everyday street dialogue',
    bio: 'Hi! I am Dany from RUFA. If you love traditional Khmer culture, Angkor history, and everyday warm conversation, join my class. Great for budget travelers and cultural enthusiasts.',
    teachingExperience: '1.5 years of informal tutoring and cultural workshops.',
    responseRate: 'Under 1 hour',
    superTutor: false,
    videoDuration: '1:10',
    availability: [
      { day: 'Wed', slots: ['01:00 PM', '03:00 PM', '05:00 PM'] },
      { day: 'Fri', slots: ['01:00 PM', '03:00 PM', '05:00 PM'] },
      { day: 'Sat', slots: ['09:00 AM', '11:00 AM', '02:00 PM'] },
      { day: 'Sun', slots: ['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM'] },
    ],
    reviews: [
      {
        id: 'rev-6',
        studentName: 'Sophie Van Der Meer',
        studentCountry: 'Netherlands',
        rating: 5,
        date: 'Sep 19, 2026',
        comment: 'Dany brings so much joy and cultural depth to every lesson. Outstanding value.',
      },
    ],
  },
  {
    id: 'tutor-6',
    name: 'Visal Chan',
    avatarBg: 'from-cyan-600 to-blue-600',
    initials: 'VC',
    university: 'Norton University Phnom Penh',
    year: 'Year 3, Hospitality & Tourism',
    rating: 4.9,
    reviewsCount: 31,
    activeStudents: 10,
    lessonsTaught: 120,
    hourlyRate: 8,
    trialPrice: 4,
    languages: [
      { language: 'Khmer', level: 'Native' },
      { language: 'English', level: 'Fluent' },
    ],
    focusAreas: ['Travel Khmer', 'Conversational'],
    headline: 'Expat Survival Specialist · Dining out, night markets & provincial travel',
    bio: 'Soursdey everyone! Studying tourism in Cambodia gives me unique insight into the real expressions travelers and expats need. No boring grammar drills—we roleplay real situations with recorded audio snippets.',
    teachingExperience: '2 years hospitality trainer and conversational guide.',
    responseRate: 'Under 15 minutes',
    superTutor: true,
    videoDuration: '1:20',
    availability: [
      { day: 'Mon', slots: ['09:00 AM', '11:00 AM', '04:00 PM', '06:00 PM'] },
      { day: 'Tue', slots: ['09:00 AM', '11:00 AM', '04:00 PM', '06:00 PM'] },
      { day: 'Thu', slots: ['09:00 AM', '02:00 PM', '05:00 PM'] },
      { day: 'Sat', slots: ['10:00 AM', '01:00 PM', '03:00 PM'] },
    ],
    reviews: [
      {
        id: 'rev-7',
        studentName: 'Liam O’Connor',
        studentCountry: 'Australia',
        rating: 5,
        date: 'Oct 04, 2026',
        comment: 'Visal is top-notch! The market shopping roleplay we did saved me 30% on my grocery budget at Russian Market the next day.',
      },
    ],
  },
  {
    id: 'tutor-7',
    name: 'Theary Heng',
    avatarBg: 'from-amber-700 to-rose-600',
    initials: 'TH',
    university: 'Royal University of Phnom Penh (RUPP)',
    year: 'Year 4, Linguistics & Translation',
    rating: 5.0,
    reviewsCount: 54,
    activeStudents: 18,
    lessonsTaught: 240,
    hourlyRate: 10,
    trialPrice: 5,
    languages: [
      { language: 'Khmer', level: 'Native' },
      { language: 'English', level: 'Fluent (IELTS 8.0)' },
    ],
    focusAreas: ['Script & Reading', 'Conversational', 'Business Khmer'],
    headline: 'Master degree candidate in Khmer linguistics · Precision pronunciation & grammar',
    bio: 'Hello! I am Theary. With my linguistics background, I can explain the phonetic mechanics of Khmer vowels, chest-register vs head-register tones, and help you speak with natural Cambodian cadence.',
    teachingExperience: '4 years of professional foreign instruction and translation.',
    responseRate: 'Under 10 minutes',
    superTutor: true,
    videoDuration: '1:50',
    availability: [
      { day: 'Mon', slots: ['07:00 AM', '08:00 AM', '01:00 PM', '05:00 PM'] },
      { day: 'Wed', slots: ['07:00 AM', '08:00 AM', '01:00 PM', '05:00 PM'] },
      { day: 'Fri', slots: ['07:00 AM', '08:00 AM', '01:00 PM', '05:00 PM'] },
      { day: 'Sun', slots: ['08:00 AM', '10:00 AM', '02:00 PM', '04:00 PM'] },
    ],
    reviews: [
      {
        id: 'rev-8',
        studentName: 'David Zhang',
        studentCountry: 'Canada',
        rating: 5,
        date: 'Sep 30, 2026',
        comment: 'If you want to actually master authentic accent and avoid foreign phonetic habits, Theary is the absolute best.',
      },
    ],
  },
  {
    id: 'tutor-8',
    name: 'Piseth Roeun',
    avatarBg: 'from-teal-600 to-emerald-700',
    initials: 'PR',
    university: 'ITC Engineering School',
    year: 'Year 2, Computer Science',
    rating: 4.8,
    reviewsCount: 14,
    activeStudents: 6,
    lessonsTaught: 52,
    hourlyRate: 7,
    trialPrice: 3,
    languages: [
      { language: 'Khmer', level: 'Native' },
      { language: 'English', level: 'Fluent' },
    ],
    focusAreas: ['Conversational', 'Travel Khmer'],
    headline: 'Casual conversational practice for tech expats, remote workers & nomads',
    bio: 'Hi there! I am Piseth. I love meeting remote workers and programmers living in Phnom Penh. We talk about tech, daily life, local food hotspots, and everyday Khmer humor.',
    teachingExperience: '1 year peer coaching in university English/Khmer club.',
    responseRate: 'Under 40 minutes',
    superTutor: false,
    videoDuration: '0:50',
    availability: [
      { day: 'Tue', slots: ['04:00 PM', '06:00 PM', '08:00 PM'] },
      { day: 'Thu', slots: ['04:00 PM', '06:00 PM', '08:00 PM'] },
      { day: 'Sat', slots: ['01:00 PM', '03:00 PM', '06:00 PM'] },
      { day: 'Sun', slots: ['01:00 PM', '03:00 PM', '06:00 PM'] },
    ],
    reviews: [
      {
        id: 'rev-9',
        studentName: 'Alex Thorne',
        studentCountry: 'Ireland',
        rating: 5,
        date: 'Oct 07, 2026',
        comment: 'Super relaxed lessons after a long workday. Great conversational pace and practical tips on Phnom Penh cafes.',
      },
    ],
  },
];

export const STARTER_CURRICULUM: CurriculumModule[] = [
  {
    id: 'mod-1',
    moduleNumber: '01',
    title: 'Greetings & Social Protocol',
    objective: 'Master polite respectful greetings, formal address titles, and social body etiquette (Sampeah).',
    phrases: [
      { khmer: 'ជំរាបសួរ', phonetic: 'Choum reap sour', english: 'Hello (Formal / Respectful)', culturalNote: 'Used with elders, teachers, or professional contacts with palms pressed together.', audioUrl: '/assets/audio/khmer/mod1_0.mp3' },
      { khmer: 'សួស្តី', phonetic: 'Soursdey', english: 'Hi / Hello (Casual / Peer)', culturalNote: 'Everyday casual greeting among peers and friends.', audioUrl: '/assets/audio/khmer/mod1_1.mp3' },
      { khmer: 'សុខសប្បាយជាទេ?', phonetic: 'Sok sabay chea te?', english: 'How are you?', culturalNote: 'Literally asks: "Are you healthy and happy?"', audioUrl: '/assets/audio/khmer/mod1_2.mp3' },
      { khmer: 'ខ្ញុំសុខសប្បាយ', phonetic: 'Knhom sok sabay', english: 'I am fine / well', culturalNote: 'Standard polite reply.', audioUrl: '/assets/audio/khmer/mod1_3.mp3' },
      { khmer: 'អរគុណច្រើន', phonetic: 'Orkun chreun', english: 'Thank you very much', culturalNote: 'Essential expression of gratitude across all daily exchanges.', audioUrl: '/assets/audio/khmer/mod1_4.mp3' },
      { khmer: 'ជំរាបលា', phonetic: 'Choum reap lea', english: 'Goodbye (Formal)', culturalNote: 'Polite farewell accompanied by a gentle nod.', audioUrl: '/assets/audio/khmer/mod1_5.mp3' },
    ],
  },
  {
    id: 'mod-2',
    moduleNumber: '02',
    title: 'Transportation & Directions',
    objective: 'Direct tuk-tuk & PassApp drivers confidently, read landmarks, and navigate Phnom Penh streets.',
    phrases: [
      { khmer: 'ទៅ... ប៉ុន្មាន?', phonetic: 'Tov... ponman?', english: 'How much to go to...?', culturalNote: 'Specify destination like Psar Thmei, Riverside, or BKK1.', audioUrl: '/assets/audio/khmer/mod2_0.mp3' },
      { khmer: 'បត់ឆ្វេង', phonetic: 'Bot chhveng', english: 'Turn left', culturalNote: 'Key direction for street navigation.', audioUrl: '/assets/audio/khmer/mod2_1.mp3' },
      { khmer: 'បត់ស្តាំ', phonetic: 'Bot sdam', english: 'Turn right', culturalNote: 'Key direction for intersections.', audioUrl: '/assets/audio/khmer/mod2_2.mp3' },
      { khmer: 'ទៅត្រង់', phonetic: 'Tov trong', english: 'Go straight', culturalNote: 'Keep going ahead.', audioUrl: '/assets/audio/khmer/mod2_3.mp3' },
      { khmer: 'ឈប់នៅទីនេះ', phonetic: 'Chhob nov tinih', english: 'Stop here please', culturalNote: 'Signal when you have arrived at your destination.', audioUrl: '/assets/audio/khmer/mod2_4.mp3' },
      { khmer: 'ជិតដល់ហើយ', phonetic: 'Jit dol heuy', english: 'Almost there', culturalNote: 'Indicates nearing the landmark.', audioUrl: '/assets/audio/khmer/mod2_5.mp3' },
    ],
  },
  {
    id: 'mod-3',
    moduleNumber: '03',
    title: 'Market Shopping & Bargaining',
    objective: 'Inquire prices in USD and KHR (Riel), negotiate politely, and count Cambodian currency.',
    phrases: [
      { khmer: 'នេះថ្លៃប៉ុន្មាន?', phonetic: 'Nih thlay ponman?', english: 'How much is this?', culturalNote: 'Pointing politely with full hand, not single index finger.', audioUrl: '/assets/audio/khmer/mod3_0.mp3' },
      { khmer: 'ថ្លៃបន្តិចហើយ', phonetic: 'Thlay bontich heuy', english: 'A bit expensive', culturalNote: 'Gentle opening phrase to start friendly bargaining.', audioUrl: '/assets/audio/khmer/mod3_1.mp3' },
      { khmer: 'ចុះថ្លៃបានទេ?', phonetic: 'Choh thlay ban te?', english: 'Can you lower the price?', culturalNote: 'Friendly negotiation ask at traditional markets.', audioUrl: '/assets/audio/khmer/mod3_2.mp3' },
      { khmer: 'មួយម៉ឺនរៀល', phonetic: 'Muoy meun riel', english: '10,000 Riel (~$2.50)', culturalNote: 'Core currency denomination.', audioUrl: '/assets/audio/khmer/mod3_3.mp3' },
      { khmer: 'បង់លុយតាម ABA បានទេ?', phonetic: 'Bong luy tam ABA ban te?', english: 'Can I pay via ABA QR?', culturalNote: '95% of vendors in Phnom Penh accept digital KHQR payments.', audioUrl: '/assets/audio/khmer/mod3_4.mp3' },
      { khmer: 'យកមួយនេះ', phonetic: 'Yok muoy nih', english: 'I will take this one', culturalNote: 'Final purchase confirmation.', audioUrl: '/assets/audio/khmer/mod3_5.mp3' },
    ],
  },
  {
    id: 'mod-4',
    moduleNumber: '04',
    title: 'Dining & Food Hospitality',
    objective: 'Order Khmer dishes, specify dietary preferences (less sugar, no ice), and ask for the bill.',
    phrases: [
      { khmer: 'សុំកាហ្វេទឹកដោះគោទឹកកកមួយ', phonetic: 'Som cafe teuk dah ko teuk kok muoy', english: 'One iced milk coffee please', culturalNote: 'The iconic Cambodian sweet morning beverage.', audioUrl: '/assets/audio/khmer/mod4_0.mp3' },
      { khmer: 'ផ្អែមតិចតួច', phonetic: 'Pha-em tech tech', english: 'A little sweet (less sugar)', culturalNote: 'Crucial for Western palates who prefer mild sweetness.', audioUrl: '/assets/audio/khmer/mod4_1.mp3' },
      { khmer: 'អត់ដាក់ស្ករ', phonetic: 'Ot dak skor', english: 'No sugar please', culturalNote: 'Zero sugar request.', audioUrl: '/assets/audio/khmer/mod4_2.mp3' },
      { khmer: 'អត់ម្ទេស', phonetic: 'Ot mtes', english: 'Not spicy (no chili)', culturalNote: 'Useful when ordering stir fries and soups.', audioUrl: '/assets/audio/khmer/mod4_3.mp3' },
      { khmer: 'ឆ្ងាញ់ណាស់!', phonetic: 'Chnganh nas!', english: 'Very delicious!', culturalNote: 'High praise that brings huge smiles to Cambodian chefs.', audioUrl: '/assets/audio/khmer/mod4_4.mp3' },
      { khmer: 'គិតលុយ', phonetic: 'Kit luy', english: 'Check please / Bill please', culturalNote: 'Standard polite phrase to ask for the bill.', audioUrl: '/assets/audio/khmer/mod4_5.mp3' },
    ],
  },
  {
    id: 'mod-5',
    moduleNumber: '05',
    title: 'Essential Vocabulary & Assistance',
    objective: 'Ask for emergency help, find restrooms, express needs, and clarify communication.',
    phrases: [
      { khmer: 'បន្ទប់ទឹកនៅឯណា?', phonetic: 'Bontoap teuk nov e-na?', english: 'Where is the restroom?', culturalNote: 'Universal practical question.', audioUrl: '/assets/audio/khmer/mod5_0.mp3' },
      { khmer: 'ជួយខ្ញុំផង!', phonetic: 'Chuoy knhom phorng!', english: 'Please help me!', culturalNote: 'Emergency call for assistance.', audioUrl: '/assets/audio/khmer/mod5_1.mp3' },
      { khmer: 'ខ្ញុំមិនយល់ទេ', phonetic: 'Knhom min yul te', english: 'I do not understand', culturalNote: 'Signals the speaker to slow down or rephrase.', audioUrl: '/assets/audio/khmer/mod5_2.mp3' },
      { khmer: 'សូមនិយាយយឺតៗ', phonetic: 'Som niyay yeut yeut', english: 'Please speak slowly', culturalNote: 'Very effective when practicing with native speakers.', audioUrl: '/assets/audio/khmer/mod5_3.mp3' },
      { khmer: 'អត់ទោស', phonetic: 'Ot-tohs', english: 'Excuse me / Sorry', culturalNote: 'Polite apology or getting attention.', audioUrl: '/assets/audio/khmer/mod5_4.mp3' },
      { khmer: 'មិនអីទេ', phonetic: 'Min ey te', english: 'No problem / It is okay', culturalNote: 'The classic Cambodian relaxed reassurance.', audioUrl: '/assets/audio/khmer/mod5_5.mp3' },
    ],
  },
  {
    id: 'mod-6',
    moduleNumber: '06',
    title: 'Trending Khmer Slang & Street Talk',
    objective: 'Speak like modern Cambodian youth & Gen-Z with viral slang, casual reactions, and street expressions.',
    phrases: [
      {
        khmer: 'ហត់មេស',
        phonetic: 'Hot mes',
        english: 'So tired! / Exhausted!',
        culturalNote: 'Hyper-popular everyday youth slang. "Mes" is the modern phonetic contraction of "mles" (so much). Used after long study shifts, work, or traffic.',
        audioUrl: '/assets/audio/khmer/mod6_0.mp3'
      },
      {
        khmer: 'ធុញមេស',
        phonetic: 'Thunh mes',
        english: 'So bored! / So annoyed / Sick of it!',
        culturalNote: 'Everyday expression when frustrated, stuck in Phnom Penh traffic, or tired of waiting.',
        audioUrl: '/assets/audio/khmer/mod6_1.mp3'
      },
      {
        khmer: 'កប់សារី',
        phonetic: 'Kop sarei',
        english: 'Awesome! / Mind-blowing! / Sick!',
        culturalNote: 'Legendary Cambodian pop-culture slang for something that is 10/10, top tier, or overwhelmingly cool.',
        audioUrl: '/assets/audio/khmer/mod6_2.mp3'
      },
      {
        khmer: 'អេម',
        phonetic: 'Em',
        english: 'Sweet! / Smooth! / Delicious / Perfect!',
        culturalNote: 'One of the most viral modern words in Cambodia. Used to describe tasty food, a great outfit, a smooth deal, or positive vibe.',
        audioUrl: '/assets/audio/khmer/mod6_3.mp3'
      },
      {
        khmer: 'លើសខ្លាំង',
        phonetic: 'Leus klang',
        english: 'Way too much! / Over the top! / Extra!',
        culturalNote: 'Used playfully when someone is being overly dramatic, exaggerating, or doing too much.',
        audioUrl: '/assets/audio/khmer/mod6_4.mp3'
      },
    ],
  },
];

export const INITIAL_USER_BOOKINGS: Booking[] = [
  {
    id: 'bkg-101',
    tutorId: 'tutor-1',
    tutorName: 'Bopha Seng',
    tutorUniversity: 'Royal University of Phnom Penh (RUPP)',
    lessonType: 'Trial Lesson (30 min)',
    date: 'Tomorrow, Oct 21',
    timeSlot: '02:00 PM (ICT)',
    price: 4,
    paymentMethod: 'Credit Card (Stripe)',
    meetingLink: 'https://meet.google.com/kto-demo-bopha',
    status: 'Upcoming',
  },
  {
    id: 'bkg-102',
    tutorId: 'tutor-2',
    tutorName: 'Sokha Rith',
    tutorUniversity: 'ITC Cambodia',
    lessonType: 'Full Lesson (60 min)',
    date: 'Friday, Oct 24',
    timeSlot: '06:00 PM (ICT)',
    price: 9,
    paymentMethod: 'ABA PayWay',
    meetingLink: 'https://meet.google.com/kto-demo-sokha',
    status: 'Confirmed',
  },
];

export const INITIAL_MESSAGES: MessageThread[] = [
  {
    id: 'thread-1',
    tutorId: 'tutor-1',
    tutorName: 'Bopha Seng',
    lastMessage: 'Soursdey! Looking forward to our trial lesson tomorrow! I prepared some market dialogues for you.',
    lastTimestamp: '10:15 AM',
    unreadCount: 1,
    messages: [
      { id: 'm1', sender: 'user', text: 'Hi Bopha! Excited for our session. I really want to learn how to direct tuk-tuks and order food.', timestamp: '09:40 AM' },
      { id: 'm2', sender: 'tutor', text: 'Soursdey! Looking forward to our trial lesson tomorrow! I prepared some market dialogues for you.', timestamp: '10:15 AM' },
    ],
  },
  {
    id: 'thread-2',
    tutorId: 'tutor-4',
    tutorName: 'Vannak Ouk',
    lastMessage: 'Hello! Yes, we can certainly focus on reading Cambodian street signs and bank apps.',
    lastTimestamp: 'Yesterday',
    unreadCount: 0,
    messages: [
      { id: 'm3', sender: 'user', text: 'Hi Vannak, do you teach reading for beginners?', timestamp: 'Yesterday' },
      { id: 'm4', sender: 'tutor', text: 'Hello! Yes, we can certainly focus on reading Cambodian street signs and bank apps.', timestamp: 'Yesterday' },
    ],
  },
];
