/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { PreplyNavbar } from './components/PreplyNavbar';
import { PreplyFilters } from './components/PreplyFilters';
import { PreplyTutorCard } from './components/PreplyTutorCard';
import { BookingModal } from './components/BookingModal';
import { TutorProfileModal } from './components/TutorProfileModal';
import { ChatModal } from './components/ChatModal';
import { CurriculumModal } from './components/CurriculumModal';
import { MyLessonsView } from './components/MyLessonsView';
import { TutorDashboardView } from './components/TutorDashboardView';
import { StudentDashboardView } from './components/student/StudentDashboardView';
import { TutorOnboardingModal } from './components/tutor/TutorOnboardingModal';
import { AdminPortalView } from './components/admin/AdminPortalView';
import { TeachLandingView } from './components/public/TeachLandingView';
import { AuthModal } from './components/auth/AuthModal';
import { ForbiddenView } from './components/auth/ForbiddenView';
import { PdfViewerModal } from './components/PdfViewerModal';
import { KhmerArtHeader } from './components/KhmerArtHeader';
import { ApiConsoleModal } from './components/ApiConsoleModal';
import { GoalSelectionModal, GoalPreference } from './components/GoalSelectionModal';
import { FindTutorsHero } from './components/FindTutorsHero';
import { GoalQuizBanner } from './components/GoalQuizBanner';
import { TutorLeaderboard } from './components/TutorLeaderboard';
import { WeeklyAvailabilityPanel } from './components/WeeklyAvailabilityPanel';
import { DevRoleSwitcher } from './components/DevRoleSwitcher';
import { PilotTopBanner } from './components/pilot/PilotTopBanner';
import { PilotFeedbackModal, FloatingFeedbackButton } from './components/pilot/PilotFeedbackModal';
import { PilotMicroSurveyModal, SurveyKind } from './components/pilot/PilotMicroSurveyModal';
import { PilotConsentNotice } from './components/pilot/PilotConsentNotice';
import { useAuth } from './context/AuthContext';
import { useLanguage } from './context/LanguageContext';
import {
  MOCK_TUTORS,
  INITIAL_USER_BOOKINGS,
  INITIAL_MESSAGES,
  Tutor,
  Booking,
  MessageThread,
} from './data/tutorsData';
import { Sparkles, Mail, X, Heart } from 'lucide-react';

export default function App() {
  const { user, isAuthenticated, activeRole, setActiveRole, toastDetail, showToast, dismissToast } =
    useAuth();
  const { t } = useLanguage();

  // Navigation View State
  const [activeView, setActiveView] = useState<
    'browse' | 'lessons' | 'curriculum' | 'tutor-dashboard' | 'student-dashboard' | 'admin-portal' | 'teach'
  >('browse');
  const [tutorSubTab, setTutorSubTab] = useState<'overview' | 'schedule' | 'lessons' | 'students' | 'earnings'>(
    'overview'
  );

  // Filter States
  const [selectedFocus, setSelectedFocus] = useState<string>('All Focuses');
  const [priceFilter, setPriceFilter] = useState<string>('all');
  const [timeFilter, setTimeFilter] = useState<string>('all');
  const [superTutorOnly, setSuperTutorOnly] = useState<boolean>(false);
  const [savedOnly, setSavedOnly] = useState<boolean>(false);
  const [savedTutorIds, setSavedTutorIds] = useState<string[]>(['tutor-1', 'tutor-3']);
  const [sortBy, setSortBy] = useState<string>('rating');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Interactive Data States
  const [tutors] = useState<Tutor[]>(MOCK_TUTORS);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_USER_BOOKINGS);
  const [threads, setThreads] = useState<MessageThread[]>(INITIAL_MESSAGES);

  // Pilot Feedback & Survey States
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isSurveyOpen, setIsSurveyOpen] = useState(false);
  const [activeSurveyKind, setActiveSurveyKind] = useState<SurveyKind>('booking_ease');
  const [surveyTutorName, setSurveyTutorName] = useState<string>('your tutor');

  // Modals & Availability Side Panel State
  const [bookingTutor, setBookingTutor] = useState<Tutor | null>(null);
  const [preselectedDay, setPreselectedDay] = useState<string | null>(null);
  const [preselectedSlot, setPreselectedSlot] = useState<string | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const [selectedPreviewTutorId, setSelectedPreviewTutorId] = useState<string>(
    MOCK_TUTORS[0]?.id || ''
  );
  const [isMobilePreviewOpen, setIsMobilePreviewOpen] = useState(false);

  const [profileTutor, setProfileTutor] = useState<Tutor | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const [chatTutor, setChatTutor] = useState<Tutor | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const [isPdfOpen, setIsPdfOpen] = useState(false);
  const [isApiConsoleOpen, setIsApiConsoleOpen] = useState(false);
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [userGoal, setUserGoal] = useState<GoalPreference | null>(null);

  // Auth & Onboarding Modals
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'signup'>('login');
  const [isTutorOnboardingOpen, setIsTutorOnboardingOpen] = useState(false);

  // Filter Logic
  const filteredTutors = useMemo(() => {
    return tutors
      .filter((tutor) => {
        if (selectedFocus !== 'All Focuses') {
          if (!tutor.focusAreas.includes(selectedFocus as any)) return false;
        }
        if (priceFilter === 'under8' && tutor.hourlyRate >= 8) return false;
        if (priceFilter === '8to10' && (tutor.hourlyRate < 8 || tutor.hourlyRate > 10)) return false;
        if (priceFilter === 'above10' && tutor.hourlyRate < 10) return false;
        if (superTutorOnly && !tutor.superTutor) return false;
        if (savedOnly && !savedTutorIds.includes(tutor.id)) return false;

        if (timeFilter !== 'all') {
          const hasTimeSlot = tutor.availability.some((day) =>
            day.slots.some((slot) => {
              const hour = parseInt(slot.split(':')[0]);
              const isPM = slot.includes('PM');
              if (timeFilter === 'morning') return !isPM || hour === 12;
              if (timeFilter === 'afternoon') return isPM && hour !== 12 && hour < 5;
              if (timeFilter === 'evening') return isPM && (hour >= 5 || hour === 12);
              return true;
            })
          );
          if (!hasTimeSlot) return false;
        }

        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchName = tutor.name.toLowerCase().includes(q);
          const matchUni = tutor.university.toLowerCase().includes(q);
          const matchHeadline = tutor.headline.toLowerCase().includes(q);
          const matchBio = tutor.bio.toLowerCase().includes(q);
          const matchFocus = tutor.focusAreas.some((f) => f.toLowerCase().includes(q));
          if (!matchName && !matchUni && !matchHeadline && !matchBio && !matchFocus) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'price-asc') return a.hourlyRate - b.hourlyRate;
        if (sortBy === 'price-desc') return b.hourlyRate - a.hourlyRate;
        if (sortBy === 'popular') return b.lessonsTaught - a.lessonsTaught;
        if (sortBy === 'students') return b.activeStudents - a.activeStudents;
        return 0;
      });
  }, [tutors, selectedFocus, priceFilter, timeFilter, superTutorOnly, savedOnly, savedTutorIds, sortBy, searchQuery]);

  // Handlers
  const handleOpenBooking = (tutor: Tutor, day?: string, slot?: string) => {
    if (!isAuthenticated) {
      setAuthModalTab('signup');
      setIsAuthModalOpen(true);
      return;
    }
    setPreselectedDay(day || null);
    setPreselectedSlot(slot || null);
    setBookingTutor(tutor);
    setIsMobilePreviewOpen(false);
    setIsBookingOpen(true);
  };

  const handlePreviewTutor = (tutor: Tutor) => {
    setSelectedPreviewTutorId(tutor.id);
    if (window.innerWidth < 1024) {
      setIsMobilePreviewOpen(true);
    }
  };

  const handleOpenProfile = (tutor: Tutor) => {
    setProfileTutor(tutor);
    setIsProfileOpen(true);
  };

  const handleOpenChat = (tutor: Tutor) => {
    if (!isAuthenticated) {
      setAuthModalTab('login');
      setIsAuthModalOpen(true);
      return;
    }
    setChatTutor(tutor);
    const existing = threads.find((th) => th.tutorId === tutor.id);
    if (!existing) {
      const newThread: MessageThread = {
        id: `thread-${Date.now()}`,
        tutorId: tutor.id,
        tutorName: tutor.name,
        lastMessage: 'Soursdey! How can I help you learn Khmer today?',
        lastTimestamp: 'Just now',
        unreadCount: 0,
        messages: [
          {
            id: `m-${Date.now()}`,
            sender: 'tutor',
            text: `Soursdey! I am ${tutor.name}. Let me know if you would like to practice market dialogues, transport directions, or conversational fluency!`,
            timestamp: 'Just now',
          },
        ],
      };
      setThreads((prev) => [newThread, ...prev]);
    }
    setIsChatOpen(true);
  };

  const handleBookingConfirmed = (newBooking: Booking) => {
    setBookings((prev) => [newBooking, ...prev]);
  };

  const handleCancelBooking = (bookingId: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== bookingId));
  };

  const handleSendMessage = (threadId: string, text: string) => {
    const userMsg = {
      id: `usr-${Date.now()}`,
      sender: 'user' as const,
      text,
      timestamp: 'Just now',
    };

    setThreads((prev) =>
      prev.map((thread) =>
        thread.id === threadId
          ? {
              ...thread,
              lastMessage: text,
              lastTimestamp: 'Just now',
              messages: [...thread.messages, userMsg],
            }
          : thread
      )
    );

    setTimeout(() => {
      const replies = [
        'Orkun chreun! (Thank you very much). That sounds great! Looking forward to our next practice session.',
        'Soursdey! Yes, absolutely! I will prepare custom dialogue notes on that topic for our 1-hour slot.',
        'No problem at all! We will go slowly so you can practice natural native pronunciation without any rush.',
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      const tutorMsg = {
        id: `tut-${Date.now()}`,
        sender: 'tutor' as const,
        text: randomReply,
        timestamp: 'Just now',
      };

      setThreads((prev) =>
        prev.map((thread) =>
          thread.id === threadId
            ? {
                ...thread,
                lastMessage: randomReply,
                lastTimestamp: 'Just now',
                messages: [...thread.messages, tutorMsg],
              }
            : thread
        )
      );
    }, 800);
  };

  const handleToggleSaveTutor = (tutor: Tutor) => {
    const exists = savedTutorIds.includes(tutor.id);
    setSavedTutorIds((prev) =>
      exists ? prev.filter((id) => id !== tutor.id) : [...prev, tutor.id]
    );

    if (exists) {
      showToast(t('toast.tutorRemoved').replace('{name}', tutor.name), {
        variant: 'removed',
        actionLabel: t('toast.undo'),
        onAction: () => {
          setSavedTutorIds((prev) => (prev.includes(tutor.id) ? prev : [...prev, tutor.id]));
        },
        durationMs: 3200,
      });
    } else {
      showToast(t('toast.tutorSaved').replace('{name}', tutor.name), {
        variant: 'saved',
        actionLabel: !savedOnly ? t('toast.viewSaved') : undefined,
        onAction: !savedOnly
          ? () => {
              setSavedOnly(true);
              document.getElementById('tutors-grid')?.scrollIntoView({ behavior: 'smooth' });
            }
          : undefined,
        durationMs: 3000,
      });
    }
  };

  const handleResetFilters = () => {
    setSelectedFocus('All Focuses');
    setPriceFilter('all');
    setTimeFilter('all');
    setSuperTutorOnly(false);
    setSavedOnly(false);
    setSearchQuery('');
    setUserGoal(null);
  };

  const handleSelectGoal = (goal: GoalPreference) => {
    setUserGoal(goal);
    setSelectedFocus(goal.suggestedFocus);
  };

  const handleClearGoal = () => {
    setUserGoal(null);
    setSelectedFocus('All Focuses');
  };

  const totalUnread = threads.reduce((acc, thread) => acc + thread.unreadCount, 0);

  const selectedPreviewTutor = useMemo(() => {
    return (
      filteredTutors.find((item) => item.id === selectedPreviewTutorId) ||
      tutors.find((item) => item.id === selectedPreviewTutorId) ||
      filteredTutors[0] ||
      tutors[0] ||
      null
    );
  }, [filteredTutors, tutors, selectedPreviewTutorId]);

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#F7F6F2] text-[#14213D] flex flex-col selection:bg-[#2445C8]/20">
      {/* Pilot Mode Banner */}
      <PilotTopBanner onOpenFeedback={() => setIsFeedbackOpen(true)} />

      {/* Traditional Signature of Khmer Art Header Strip (Public Homepage Only) */}
      {!isAuthenticated && activeView === 'browse' && <KhmerArtHeader />}

      {/* Role-Aware Top Navigation */}
      <PreplyNavbar
        activeView={activeView}
        setActiveView={setActiveView}
        tutorSubTab={tutorSubTab}
        setTutorSubTab={setTutorSubTab}
        unreadCount={totalUnread}
        upcomingCount={bookings.length}
        onOpenPdf={() => setIsPdfOpen(true)}
        onOpenMessages={() => {
          if (!isAuthenticated) {
            setAuthModalTab('login');
            setIsAuthModalOpen(true);
          } else {
            setIsChatOpen(true);
          }
        }}
        onOpenApiConsole={() => setIsApiConsoleOpen(true)}
        onOpenGoalModal={() => setIsGoalModalOpen(true)}
        activeGoalTitle={userGoal?.title}
        onOpenAuthModal={(tab = 'login') => {
          setAuthModalTab(tab);
          setIsAuthModalOpen(true);
        }}
        onOpenTutorOnboarding={() => setIsTutorOnboardingOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeView === 'browse' && (
          <div>
            <FindTutorsHero
              onFindTutorClick={() => {
                const el = document.getElementById('tutors-grid');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onBookTrialClick={() => {
                if (tutors.length > 0) handleOpenBooking(tutors[0]);
              }}
              featuredTutor={tutors[0]}
            />

            <GoalQuizBanner
              userGoal={userGoal}
              onOpenGoalModal={() => setIsGoalModalOpen(true)}
              onClearGoal={handleClearGoal}
              onSelectQuickGoal={(_title, focus) => {
                setSelectedFocus(focus);
                const el = document.getElementById('tutors-grid');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            <TutorLeaderboard
              tutors={tutors}
              onSelectTutor={(tutor) => {
                setSelectedPreviewTutorId(tutor.id);
                const el = document.getElementById('tutors-grid');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            <PreplyFilters
              selectedFocus={selectedFocus}
              setSelectedFocus={setSelectedFocus}
              priceFilter={priceFilter}
              setPriceFilter={setPriceFilter}
              timeFilter={timeFilter}
              setTimeFilter={setTimeFilter}
              superTutorOnly={superTutorOnly}
              setSuperTutorOnly={setSuperTutorOnly}
              savedOnly={savedOnly}
              setSavedOnly={setSavedOnly}
              savedCount={savedTutorIds.length}
              sortBy={sortBy}
              setSortBy={setSortBy}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              totalResults={filteredTutors.length}
              onResetFilters={handleResetFilters}
            />

            <div
              id="tutors-grid"
              className="max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 scroll-mt-28 sm:scroll-mt-36"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-4 text-xs text-slate-500 font-medium">
                <span>
                  Showing <strong className="text-[#14213D] font-mono">{filteredTutors.length}</strong> available Khmer tutors
                </span>
                <span className="hidden sm:inline">Protected by ABA Pay & KHQR (Bakong)</span>
              </div>

              {filteredTutors.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  <div className="lg:col-span-8 space-y-4">
                    {filteredTutors.map((tutor) => (
                      <PreplyTutorCard
                        key={tutor.id}
                        tutor={tutor}
                        onBook={(item) => handleOpenBooking(item)}
                        onPreview={handlePreviewTutor}
                        isSelectedForPreview={selectedPreviewTutor?.id === tutor.id}
                        isSaved={savedTutorIds.includes(tutor.id)}
                        onToggleSave={handleToggleSaveTutor}
                      />
                    ))}
                  </div>

                  <div className="lg:col-span-4">
                    <WeeklyAvailabilityPanel
                      tutor={selectedPreviewTutor}
                      onBookSlot={(tutor, day, slot) => handleOpenBooking(tutor, day, slot)}
                      onOpenFullProfile={handleOpenProfile}
                      isMobileDrawerOpen={isMobilePreviewOpen}
                      onCloseMobileDrawer={() => setIsMobilePreviewOpen(false)}
                    />
                  </div>
                </div>
              ) : (
                <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-4">
                  {savedOnly ? (
                    <>
                      <div className="w-12 h-12 rounded-full bg-[#F2A531]/20 text-[#14213D] mx-auto flex items-center justify-center">
                        <Heart className="w-6 h-6 stroke-[2]" />
                      </div>
                      <h3 className="font-display text-base font-bold text-[#14213D]">
                        No saved tutors found
                      </h3>
                      <p className="text-slate-600 text-xs max-w-md mx-auto">
                        You do not have any tutors saved matching your current filters. Click Save on any tutor card to keep them here.
                      </p>
                      <button
                        onClick={() => setSavedOnly(false)}
                        className="px-5 py-2.5 bg-[#2445C8] hover:bg-[#1c37a4] text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                      >
                        Show All Tutors
                      </button>
                    </>
                  ) : (
                    <>
                      <p className="text-slate-600 text-sm">
                        No tutors found matching your current filter criteria.
                      </p>
                      <button
                        onClick={handleResetFilters}
                        className="px-5 py-2.5 bg-[#2445C8] hover:bg-[#1c37a4] text-white font-bold text-xs rounded-xl shadow-sm transition-colors cursor-pointer"
                      >
                        Reset All Filters
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {activeView === 'curriculum' && (
          <CurriculumModal
            onSelectPracticeModule={() => {
              setActiveView('browse');
              setSelectedFocus('Conversational');
            }}
            onOpenPdf={() => setIsPdfOpen(true)}
          />
        )}

        {activeView === 'lessons' && (
          <MyLessonsView
            bookings={bookings}
            onMessageTutor={(tutorId) => {
              const tutor = tutors.find((item) => item.id === tutorId) || tutors[0];
              handleOpenChat(tutor);
            }}
            onBrowseTutors={() => setActiveView('browse')}
            onCancelBooking={handleCancelBooking}
          />
        )}

        {activeView === 'student-dashboard' && (
          isAuthenticated ? (
            <StudentDashboardView
              onFindTutors={() => setActiveView('browse')}
              onOpenCurriculum={() => setActiveView('curriculum')}
              onOpenMessages={() => setIsChatOpen(true)}
              onBookTutor={handleOpenBooking}
              featuredTutors={tutors}
            />
          ) : (
            <ForbiddenView
              requiredRole="STUDENT"
              onGoHome={() => {
                setAuthModalTab('login');
                setIsAuthModalOpen(true);
              }}
            />
          )
        )}

        {activeView === 'tutor-dashboard' && (
          user && user.roles.includes('TUTOR') ? (
            <TutorDashboardView
              activeSubTab={tutorSubTab}
              onSubTabChange={(tab) => setTutorSubTab(tab)}
              onBackToLearner={() => {
                setActiveRole('STUDENT');
                setActiveView('browse');
              }}
              onOpenMessages={() => setIsChatOpen(true)}
              onViewPublicProfile={() => setActiveView('browse')}
            />
          ) : (
            <ForbiddenView
              requiredRole="TUTOR"
              onGoHome={() => setActiveView(user?.roles.includes('ADMIN') ? 'admin-portal' : 'browse')}
            />
          )
        )}

        {activeView === 'admin-portal' && (
          user && user.roles.includes('ADMIN') ? (
            <AdminPortalView />
          ) : (
            <ForbiddenView
              requiredRole="ADMIN"
              onGoHome={() => setActiveView(user?.roles.includes('TUTOR') ? 'tutor-dashboard' : 'browse')}
            />
          )
        )}

        {activeView === 'teach' && (
          <TeachLandingView
            onApplyToTeach={() => {
              if (!isAuthenticated) {
                setAuthModalTab('signup');
                setIsAuthModalOpen(true);
              } else {
                setIsTutorOnboardingOpen(true);
              }
            }}
            onBrowseTutors={() => setActiveView('browse')}
          />
        )}
      </main>

      {/* Clean Footer */}
      <footer className="bg-white border-t border-slate-200 text-slate-500 py-8 sm:py-10 text-xs">
        <div className="max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <img
                src="/assets/logo_kto_new.png"
                alt="KhmerTutors Online Logo"
                className="h-9 w-auto object-contain"
              />
              <span className="font-display font-extrabold text-[#14213D] text-sm">
                KhmerTutors Online
              </span>
              <span className="text-slate-300">·</span>
              <span className="text-slate-500">Cambodia's 1-on-1 Micro-Tutoring Platform</span>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="mailto:support@khmertutors.com"
                className="text-[#14213D] hover:text-[#2445C8] flex items-center gap-1 font-semibold"
              >
                <Mail className="w-3.5 h-3.5 text-[#2445C8]" />
                <span>support@khmertutors.com</span>
              </a>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-slate-500 border-t border-slate-100 pt-4">
            <span>KhmerTutors Online Pilot · Phnom Penh, Cambodia</span>
            <span>
              Student Checkout: ABA Pay · KHQR (Bakong) · Card | Tutor Payouts: ABA · Wing
            </span>
          </div>
        </div>
      </footer>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialTab={authModalTab}
      />

      <TutorOnboardingModal
        isOpen={isTutorOnboardingOpen}
        onClose={() => setIsTutorOnboardingOpen(false)}
        onComplete={() => {
          setIsTutorOnboardingOpen(false);
          setActiveView('tutor-dashboard');
        }}
      />

      <BookingModal
        tutor={bookingTutor}
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        onBookingConfirmed={handleBookingConfirmed}
        preselectedDay={preselectedDay}
        preselectedSlot={preselectedSlot}
        onTriggerSurvey={() => {
          if (bookingTutor) setSurveyTutorName(bookingTutor.name);
          setActiveSurveyKind('booking_ease');
          setIsSurveyOpen(true);
        }}
      />

      <TutorProfileModal
        tutor={profileTutor}
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onBook={handleOpenBooking}
        onMessage={handleOpenChat}
      />

      <ChatModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        threads={threads}
        activeTutor={chatTutor}
        onSendMessage={handleSendMessage}
        onBook={handleOpenBooking}
      />

      <PdfViewerModal isOpen={isPdfOpen} onClose={() => setIsPdfOpen(false)} />

      {(import.meta.env.DEV || user?.roles.includes('ADMIN')) && (
        <ApiConsoleModal isOpen={isApiConsoleOpen} onClose={() => setIsApiConsoleOpen(false)} />
      )}

      <GoalSelectionModal
        isOpen={isGoalModalOpen}
        onClose={() => setIsGoalModalOpen(false)}
        onSelectGoal={handleSelectGoal}
        currentGoalId={userGoal?.goalId}
      />

      {/* Subtle Floating Toast Notification (positioned clear of Feedback FAB) */}
      {toastDetail && (
        <div
          key={toastDetail.id}
          role="status"
          aria-live="polite"
          className="fixed top-[72px] left-1/2 -translate-x-1/2 w-[calc(100%-32px)] max-w-sm sm:top-auto sm:bottom-6 sm:left-6 sm:translate-x-0 sm:w-auto sm:max-w-md z-50 bg-[#14213D]/95 backdrop-blur-md text-white px-3.5 py-2.5 rounded-2xl shadow-[0_10px_28px_rgba(20,33,61,0.18)] border border-white/12 text-xs font-medium flex items-center gap-2.5 animate-toast-in"
        >
          <span
            className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
              toastDetail.variant === 'saved'
                ? 'bg-[#F2A531]/18 text-[#F2A531]'
                : toastDetail.variant === 'removed'
                ? 'bg-white/10 text-slate-300'
                : 'bg-[#F2A531]/15 text-[#F2A531]'
            }`}
          >
            {toastDetail.variant === 'saved' ? (
              <Heart className="w-3.5 h-3.5 fill-[#F2A531] text-[#F2A531]" />
            ) : toastDetail.variant === 'removed' ? (
              <Heart className="w-3.5 h-3.5 text-slate-300" />
            ) : (
              <Sparkles className="w-3.5 h-3.5 text-[#F2A531] fill-[#F2A531]" />
            )}
          </span>

          <span className="flex-1 min-w-0 truncate">{toastDetail.message}</span>

          {toastDetail.actionLabel && toastDetail.onAction && (
            <button
              type="button"
              onClick={() => {
                toastDetail.onAction?.();
                dismissToast();
              }}
              className="text-[#F2A531] hover:text-amber-300 font-bold text-xs whitespace-nowrap px-1.5 py-0.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer shrink-0"
            >
              {toastDetail.actionLabel}
            </button>
          )}

          <button
            type="button"
            onClick={dismissToast}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
            aria-label="Dismiss notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {import.meta.env.DEV && <DevRoleSwitcher onNavigate={(view) => setActiveView(view)} />}

      <FloatingFeedbackButton onOpen={() => setIsFeedbackOpen(true)} />

      <PilotFeedbackModal
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
        currentPageUrl={activeView}
      />

      <PilotMicroSurveyModal
        isOpen={isSurveyOpen}
        onClose={() => setIsSurveyOpen(false)}
        surveyType={activeSurveyKind}
        tutorName={surveyTutorName}
      />

      <PilotConsentNotice />
    </div>
  );
}
