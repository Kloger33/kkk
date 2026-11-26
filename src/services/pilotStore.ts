/**
 * KhmerTutors Online - Pilot Mode Store & State Manager
 * Handles invite codes, feedback submissions, in-app micro-surveys,
 * test sandbox credits, refunds, and pilot KPIs.
 */

export interface InviteCode {
  code: string;
  targetRole: 'STUDENT' | 'TUTOR' | 'ANY';
  maxUses: number;
  usedCount: number;
  isActive: boolean;
  notes: string;
  createdAt: string;
}

export interface FeedbackReport {
  id: string;
  type: 'bug' | 'idea' | 'confusing' | 'praise';
  severity: 'low' | 'medium' | 'high' | 'blocker';
  title: string;
  message: string;
  pageUrl: string;
  userRole: string;
  userId?: string | number;
  userEmail?: string;
  deviceInfo: string;
  screenSize: string;
  status: 'new' | 'in_progress' | 'fixed' | 'wont_fix';
  adminNotes?: string;
  createdAt: string;
}

export interface SurveyResponse {
  id: string;
  surveyType: 'booking_ease' | 'post_lesson' | 'nps_7day' | 'tutor_experience';
  rating: number; // 1-5 or 0-10 for NPS
  wouldBookAgain?: boolean;
  comment?: string;
  userRole: string;
  userId?: string | number;
  tutorId?: string;
  createdAt: string;
}

const STORAGE_KEY_INVITES = 'kto_pilot_invite_codes';
const STORAGE_KEY_FEEDBACK = 'kto_pilot_feedback';
const STORAGE_KEY_SURVEYS = 'kto_pilot_surveys';
const STORAGE_KEY_PILOT_BANNER = 'kto_pilot_banner_dismissed';

export const INITIAL_INVITE_CODES: InviteCode[] = [
  {
    code: 'PILOT-STU-01',
    targetRole: 'STUDENT',
    maxUses: 15,
    usedCount: 11,
    isActive: true,
    notes: 'Expat community Phnom Penh (BKK1 / Tonle Bassac)',
    createdAt: '2026-11-01',
  },
  {
    code: 'PILOT-EXPATS-PP',
    targetRole: 'STUDENT',
    maxUses: 20,
    usedCount: 13,
    isActive: true,
    notes: 'Foreign NGO & Embassy staff pilot group',
    createdAt: '2026-11-02',
  },
  {
    code: 'RUPP-TUTOR-2026',
    targetRole: 'TUTOR',
    maxUses: 6,
    usedCount: 4,
    isActive: true,
    notes: 'Royal University of Phnom Penh (IFL Khmer Linguistics)',
    createdAt: '2026-11-01',
  },
  {
    code: 'ITC-TUTOR-2026',
    targetRole: 'TUTOR',
    maxUses: 5,
    usedCount: 3,
    isActive: true,
    notes: 'Institute of Technology of Cambodia engineering tutors',
    createdAt: '2026-11-02',
  },
  {
    code: 'PUC-KHMER-2026',
    targetRole: 'TUTOR',
    maxUses: 5,
    usedCount: 2,
    isActive: true,
    notes: 'Paññāsāstra University of Cambodia English-Khmer bilinguals',
    createdAt: '2026-11-03',
  },
  {
    code: 'VIP-PILOT-2026',
    targetRole: 'ANY',
    maxUses: 50,
    usedCount: 6,
    isActive: true,
    notes: 'Core testing team & design reviewers',
    createdAt: '2026-11-01',
  },
];

export const INITIAL_FEEDBACK: FeedbackReport[] = [
  {
    id: 'fb-101',
    type: 'bug',
    severity: 'medium',
    title: 'Trial price displayed $3 instead of $4 on tutor card',
    message: 'On Pich’s card, the button said Book $3 Trial but Pich has a $4 trial price set in her profile.',
    pageUrl: '/browse',
    userRole: 'STUDENT',
    userId: '5',
    userEmail: 'alex@expatphnompenh.com',
    deviceInfo: 'Mac OS X Chrome 124',
    screenSize: '1440x900',
    status: 'fixed',
    adminNotes: 'Resolved dynamic trial price mapping in PreplyTutorCard.',
    createdAt: '2026-11-04 14:20',
  },
  {
    id: 'fb-102',
    type: 'idea',
    severity: 'low',
    title: 'Add Khmer phonetic pronunciation audio for beginner greetings',
    message: 'Having audio clips right inside the trial lesson prep would help before meeting my RUPP tutor.',
    pageUrl: '/curriculum',
    userRole: 'STUDENT',
    userId: '6',
    userEmail: 'sarah.ngo@phnompenh.org',
    deviceInfo: 'iOS Safari 17.4 (iPhone 14)',
    screenSize: '390x844',
    status: 'fixed',
    adminNotes: 'Added 6 audio-guided starter modules in CurriculumModal.',
    createdAt: '2026-11-05 09:12',
  },
  {
    id: 'fb-103',
    type: 'confusing',
    severity: 'medium',
    title: 'Time slot timezone clarification for expat students',
    message: 'Wanted to make sure 10:00 AM was Phnom Penh time (ICT GMT+7). A small GMT+7 badge helps!',
    pageUrl: '/browse#booking',
    userRole: 'STUDENT',
    userId: '5',
    userEmail: 'alex@expatphnompenh.com',
    deviceInfo: 'Windows 11 Edge',
    screenSize: '1920x1080',
    status: 'fixed',
    adminNotes: 'Added explicit GMT+7 Indochina Time indicator in BookingModal.',
    createdAt: '2026-11-06 18:30',
  },
  {
    id: 'fb-104',
    type: 'praise',
    severity: 'low',
    title: 'Seamless Bakong KHQR checkout!',
    message: 'Scanned with my ABA app and it confirmed within seconds. Fantastic experience.',
    pageUrl: '/booking',
    userRole: 'STUDENT',
    userId: '7',
    userEmail: 'john.dual@khmertutors.com',
    deviceInfo: 'Android Chrome 123',
    screenSize: '412x915',
    status: 'fixed',
    adminNotes: 'Documented for pilot success report.',
    createdAt: '2026-11-07 10:15',
  },
];

export const INITIAL_SURVEYS: SurveyResponse[] = [
  {
    id: 'sv-1',
    surveyType: 'booking_ease',
    rating: 5,
    comment: 'Very straightforward, liked the 1-click time slot selection.',
    userRole: 'STUDENT',
    userId: '5',
    createdAt: '2026-11-04 15:30',
  },
  {
    id: 'sv-2',
    surveyType: 'post_lesson',
    rating: 5,
    wouldBookAgain: true,
    comment: 'Sreynoch from RUPP was patient and taught me market numbers perfectly!',
    userRole: 'STUDENT',
    userId: '5',
    tutorId: 'tutor-1',
    createdAt: '2026-11-05 11:00',
  },
  {
    id: 'sv-3',
    surveyType: 'nps_7day',
    rating: 9,
    comment: 'Best way for expats in Phnom Penh to learn conversational Khmer without expensive agency fees.',
    userRole: 'STUDENT',
    userId: '6',
    createdAt: '2026-11-06 16:45',
  },
  {
    id: 'sv-4',
    surveyType: 'tutor_experience',
    rating: 5,
    comment: 'Connecting my ABA account took 1 minute. Very glad to earn while studying at RUPP.',
    userRole: 'TUTOR',
    userId: '2',
    createdAt: '2026-11-07 08:30',
  },
];

class PilotStore {
  // Invites
  getInviteCodes(): InviteCode[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY_INVITES);
      if (data) return JSON.parse(data);
    } catch {}
    return INITIAL_INVITE_CODES;
  }

  saveInviteCodes(codes: InviteCode[]) {
    try {
      localStorage.setItem(STORAGE_KEY_INVITES, JSON.stringify(codes));
    } catch {}
  }

  validateInviteCode(codeStr: string, role?: string): { valid: boolean; error?: string; codeObj?: InviteCode } {
    const codes = this.getInviteCodes();
    const found = codes.find((c) => c.code.trim().toUpperCase() === codeStr.trim().toUpperCase());
    if (!found) {
      return { valid: false, error: 'Invalid invite code. Pilot testing is invite-only.' };
    }
    if (!found.isActive) {
      return { valid: false, error: 'This pilot invite code has been paused by the admin.' };
    }
    if (found.usedCount >= found.maxUses) {
      return { valid: false, error: 'This pilot invite code has reached its maximum user limit.' };
    }
    if (role && found.targetRole !== 'ANY' && found.targetRole !== role) {
      return { valid: false, error: `This invite code is reserved for ${found.targetRole.toLowerCase()}s.` };
    }
    return { valid: true, codeObj: found };
  }

  redeemInviteCode(codeStr: string): boolean {
    const codes = this.getInviteCodes();
    const index = codes.findIndex((c) => c.code.trim().toUpperCase() === codeStr.trim().toUpperCase());
    if (index >= 0) {
      codes[index].usedCount += 1;
      this.saveInviteCodes(codes);
      return true;
    }
    return false;
  }

  addInviteCode(code: Omit<InviteCode, 'usedCount' | 'createdAt'>): InviteCode {
    const codes = this.getInviteCodes();
    const newCode: InviteCode = {
      ...code,
      code: code.code.trim().toUpperCase(),
      usedCount: 0,
      createdAt: new Date().toISOString().split('T')[0],
    };
    codes.unshift(newCode);
    this.saveInviteCodes(codes);
    return newCode;
  }

  toggleInviteCode(codeStr: string): boolean {
    const codes = this.getInviteCodes();
    const index = codes.findIndex((c) => c.code === codeStr);
    if (index >= 0) {
      codes[index].isActive = !codes[index].isActive;
      this.saveInviteCodes(codes);
      return codes[index].isActive;
    }
    return false;
  }

  // Feedback & Bugs
  getFeedback(): FeedbackReport[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY_FEEDBACK);
      if (data) return JSON.parse(data);
    } catch {}
    return INITIAL_FEEDBACK;
  }

  saveFeedback(reports: FeedbackReport[]) {
    try {
      localStorage.setItem(STORAGE_KEY_FEEDBACK, JSON.stringify(reports));
    } catch {}
  }

  submitFeedback(report: Omit<FeedbackReport, 'id' | 'createdAt' | 'status'>): FeedbackReport {
    const reports = this.getFeedback();
    const newReport: FeedbackReport = {
      ...report,
      id: `fb-${Date.now()}`,
      status: 'new',
      createdAt: new Date().toLocaleString('en-US', { timeZone: 'Asia/Phnom_Penh' }),
    };
    reports.unshift(newReport);
    this.saveFeedback(reports);
    return newReport;
  }

  updateFeedbackStatus(id: string, status: FeedbackReport['status'], adminNotes?: string) {
    const reports = this.getFeedback();
    const index = reports.findIndex((r) => r.id === id);
    if (index >= 0) {
      reports[index].status = status;
      if (adminNotes !== undefined) reports[index].adminNotes = adminNotes;
      this.saveFeedback(reports);
    }
  }

  // Surveys
  getSurveys(): SurveyResponse[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY_SURVEYS);
      if (data) return JSON.parse(data);
    } catch {}
    return INITIAL_SURVEYS;
  }

  submitSurvey(survey: Omit<SurveyResponse, 'id' | 'createdAt'>): SurveyResponse {
    const surveys = this.getSurveys();
    const newSurvey: SurveyResponse = {
      ...survey,
      id: `sv-${Date.now()}`,
      createdAt: new Date().toLocaleString('en-US', { timeZone: 'Asia/Phnom_Penh' }),
    };
    surveys.unshift(newSurvey);
    try {
      localStorage.setItem(STORAGE_KEY_SURVEYS, JSON.stringify(surveys));
    } catch {}
    return newSurvey;
  }

  // Pilot Top Banner Dismissal
  isBannerDismissed(): boolean {
    try {
      return localStorage.getItem(STORAGE_KEY_PILOT_BANNER) === 'true';
    } catch {
      return false;
    }
  }

  dismissBanner() {
    try {
      localStorage.setItem(STORAGE_KEY_PILOT_BANNER, 'true');
    } catch {}
  }
}

export const pilotStore = new PilotStore();
