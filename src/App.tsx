/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { PreplyNavbar } from './components/PreplyNavbar';
import { PreplyFilters } from './components/PreplyFilters';
import { PreplyTutorCard } from './components/PreplyTutorCard';
import { BookingModal } from './components/BookingModal';
import { TutorProfileModal } from './components/TutorProfileModal';
import { ChatModal } from './components/ChatModal';
import { CurriculumModal } from './components/CurriculumModal';
import { MyLessonsView } from './components/MyLessonsView';
import { TutorDashboardView } from './components/TutorDashboardView';
import { PdfViewerModal } from './components/PdfViewerModal';
import { KhmerArtHeader } from './components/KhmerArtHeader';
import { DesignSystem } from './components/DesignSystem';
import { LandingHero } from './components/LandingHero';
import { ToastProvider } from './components/ui';
import { 
  MOCK_TUTORS, 
  INITIAL_USER_BOOKINGS, 
  INITIAL_MESSAGES, 
  Tutor, 
  Booking, 
  MessageThread 
} from './data/tutorsData';
import { DESIGNER_INFO } from './data/portfolioData';
import { 
  ShieldCheck, 
  Sparkles, 
  FileText, 
  CheckCircle2, 
  Mail, 
  ArrowRight,
  Info,
  Calendar,
  X
} from 'lucide-react';

export default function App() {
  // Navigation View State with /design route support
  const [activeView, setActiveView] = useState<'browse' | 'lessons' | 'curriculum' | 'tutor-dashboard' | 'design'>(() => {
    if (typeof window !== 'undefined') {
      if (window.location.pathname === '/design' || window.location.hash === '#design') {
        return 'design';
      }
    }
    return 'browse';
  });

  // URL sync for /design route
  useEffect(() => {
    const handleUrlChange = () => {
      if (window.location.pathname === '/design' || window.location.hash === '#design') {
        setActiveView('design');
      } else if (activeView === 'design') {
        setActiveView('browse');
      }
    };

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, [activeView]);

  const handleNavigateView = (view: 'browse' | 'lessons' | 'curriculum' | 'tutor-dashboard' | 'design') => {
    setActiveView(view);
    if (view === 'design') {
      if (window.location.pathname !== '/design') {
        window.history.pushState(null, '', '/design');
      }
    } else {
      if (window.location.pathname === '/design') {
        window.history.pushState(null, '', '/');
      }
    }
  };

  // Filter States
  const [selectedFocus, setSelectedFocus] = useState<string>('All Focuses');
  const [priceFilter, setPriceFilter] = useState<string>('all');
  const [timeFilter, setTimeFilter] = useState<string>('all');
  const [superTutorOnly, setSuperTutorOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('rating');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Interactive Data States
  const [tutors, setTutors] = useState<Tutor[]>(MOCK_TUTORS);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_USER_BOOKINGS);
  const [threads, setThreads] = useState<MessageThread[]>(INITIAL_MESSAGES);

  // Modals
  const [bookingTutor, setBookingTutor] = useState<Tutor | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const [profileTutor, setProfileTutor] = useState<Tutor | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const [chatTutor, setChatTutor] = useState<Tutor | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const [isPdfOpen, setIsPdfOpen] = useState(false);

  // Filter Logic
  const filteredTutors = useMemo(() => {
    return tutors
      .filter((tutor) => {
        // Focus filter
        if (selectedFocus !== 'All Focuses') {
          if (!tutor.focusAreas.includes(selectedFocus as any)) return false;
        }

        // Price filter
        if (priceFilter === 'under8' && tutor.hourlyRate >= 8) return false;
        if (priceFilter === '8to10' && (tutor.hourlyRate < 8 || tutor.hourlyRate > 10)) return false;
        if (priceFilter === 'above10' && tutor.hourlyRate < 10) return false;

        // Super Tutor filter
        if (superTutorOnly && !tutor.superTutor) return false;

        // Time availability filter
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

        // Search Query
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
  }, [tutors, selectedFocus, priceFilter, timeFilter, superTutorOnly, sortBy, searchQuery]);

  // Handlers
  const handleOpenBooking = (tutor: Tutor) => {
    setBookingTutor(tutor);
    setIsBookingOpen(true);
  };

  const handleOpenProfile = (tutor: Tutor) => {
    setProfileTutor(tutor);
    setIsProfileOpen(true);
  };

  const handleOpenChat = (tutor: Tutor) => {
    setChatTutor(tutor);
    // Ensure thread exists
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
      prev.map((t) => {
        if (t.id === threadId) {
          return {
            ...t,
            lastMessage: text,
            lastTimestamp: 'Just now',
            messages: [...t.messages, userMsg],
          };
        }
        return t;
      })
    );

    // Realistic simulated tutor response after 800ms
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
        prev.map((t) => {
          if (t.id === threadId) {
            return {
              ...t,
              lastMessage: randomReply,
              lastTimestamp: 'Just now',
              messages: [...t.messages, tutorMsg],
            };
          }
          return t;
        })
      );
    }, 800);
  };

  const handleResetFilters = () => {
    setSelectedFocus('All Focuses');
    setPriceFilter('all');
    setTimeFilter('all');
    setSuperTutorOnly(false);
    setSearchQuery('');
  };

  const totalUnread = threads.reduce((acc, t) => acc + t.unreadCount, 0);

  return (
    <ToastProvider>
      <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-display flex flex-col selection:bg-teal-200">
      
      {/* Traditional Signature of Khmer Art Header Strip on Top */}
      <KhmerArtHeader />

      {/* Preply Top Navigation */}
      <PreplyNavbar
        activeView={activeView}
        setActiveView={handleNavigateView}
        unreadCount={totalUnread}
        upcomingCount={bookings.length}
        onOpenPdf={() => setIsPdfOpen(true)}
        onOpenMessages={() => setIsChatOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* VIEW 1: BROWSE & FIND TUTORS */}
        {activeView === 'browse' && (
          <div>
            {/* Benefit-led Hero, Trust Row, How it Works & Focus Shortcuts */}
            <LandingHero
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedFocus={selectedFocus}
              setSelectedFocus={setSelectedFocus}
              sortBy={sortBy}
              setSortBy={setSortBy}
              totalTutors={filteredTutors.length}
              onFindTutor={() => {
                const el = document.getElementById('tutors-section');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              onTryFreeLesson={() => {
                handleNavigateView('curriculum');
              }}
              tutors={tutors}
            />

            {/* Filter Bar */}
            <PreplyFilters
              selectedFocus={selectedFocus}
              setSelectedFocus={setSelectedFocus}
              priceFilter={priceFilter}
              setPriceFilter={setPriceFilter}
              timeFilter={timeFilter}
              setTimeFilter={setTimeFilter}
              superTutorOnly={superTutorOnly}
              setSuperTutorOnly={setSuperTutorOnly}
              sortBy={sortBy}
              setSortBy={setSortBy}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              totalResults={filteredTutors.length}
              onResetFilters={handleResetFilters}
            />

            {/* Tutor List */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="flex items-center justify-between mb-4 text-xs text-slate-500 font-medium">
                <span>Showing <strong>{filteredTutors.length}</strong> available Khmer tutors</span>
                <span className="hidden sm:inline">Protected by ABA PayWay & Bakong Settlement</span>
              </div>

              {filteredTutors.length > 0 ? (
                <div className="space-y-4">
                  {filteredTutors.map((tutor) => (
                    <PreplyTutorCard
                      key={tutor.id}
                      tutor={tutor}
                      onBook={handleOpenBooking}
                      onMessage={handleOpenChat}
                      onViewProfile={handleOpenProfile}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-4">
                  <p className="text-slate-600 text-sm">
                    No tutors found matching your current filter criteria.
                  </p>
                  <button
                    onClick={handleResetFilters}
                    className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-sm transition-colors"
                  >
                    Reset All Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* VIEW 2: STARTER CURRICULUM */}
        {activeView === 'curriculum' && (
          <CurriculumModal
            onSelectPracticeModule={(moduleTitle) => {
              setActiveView('browse');
              setSelectedFocus('Conversational');
            }}
            onOpenPdf={() => setIsPdfOpen(true)}
          />
        )}

        {/* VIEW 3: MY LESSONS */}
        {activeView === 'lessons' && (
          <MyLessonsView
            bookings={bookings}
            onMessageTutor={(tutorId) => {
              const tutor = tutors.find((t) => t.id === tutorId) || tutors[0];
              handleOpenChat(tutor);
            }}
            onBrowseTutors={() => setActiveView('browse')}
            onCancelBooking={handleCancelBooking}
          />
        )}

        {/* VIEW 4: TUTOR DASHBOARD (TUTOR PERSPECTIVE) */}
        {activeView === 'tutor-dashboard' && (
          <TutorDashboardView
            onBackToLearner={() => setActiveView('browse')}
          />
        )}

        {/* VIEW 5: DESIGN SYSTEM SHOWCASE */}
        {activeView === 'design' && (
          <DesignSystem onBackToApp={() => handleNavigateView('browse')} />
        )}

      </main>

      {/* Clean Footer */}
      <footer className="bg-white border-t border-slate-200 text-slate-500 py-10 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 text-sm">KhmerTutorial Online (KTO)</span>
              <span className="text-slate-300">·</span>
              <span>Based on the Seven-Chapter Research Framework</span>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsPdfOpen(true)}
                className="text-teal-700 hover:underline font-semibold flex items-center gap-1"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>View Research Publication (PDF)</span>
              </button>
              <a
                href={`mailto:${DESIGNER_INFO.email}`}
                className="text-slate-600 hover:text-slate-900 flex items-center gap-1"
              >
                <Mail className="w-3.5 h-3.5 text-teal-600" />
                <span>{DESIGNER_INFO.email}</span>
              </a>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-slate-400 border-t border-slate-100 pt-4">
            <span>Designed & Engineered by Soeun Kongsovann · Phnom Penh, Cambodia</span>
            <span>Escrow Rails: Stripe · ABA PayWay · NBC Bakong</span>
          </div>
        </div>
      </footer>

      {/* Interactive Booking Modal */}
      <BookingModal
        tutor={bookingTutor}
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        onBookingConfirmed={handleBookingConfirmed}
      />

      {/* Full Tutor Profile Modal */}
      <TutorProfileModal
        tutor={profileTutor}
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onBook={handleOpenBooking}
        onMessage={handleOpenChat}
      />

      {/* Simulated Live Chat Modal */}
      <ChatModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        threads={threads}
        activeTutor={chatTutor}
        onSendMessage={handleSendMessage}
        onBook={handleOpenBooking}
      />

      {/* Research Paper PDF Viewer */}
      <PdfViewerModal
        isOpen={isPdfOpen}
        onClose={() => setIsPdfOpen(false)}
      />

      </div>
    </ToastProvider>
  );
}
