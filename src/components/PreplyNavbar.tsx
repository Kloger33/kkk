import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  BookOpen,
  Calendar,
  MessageSquare,
  Menu,
  X,
  LogOut,
  ArrowRightLeft,
  ShieldAlert,
  Bell,
  Plus,
  LayoutDashboard,
  Clock,
  GraduationCap,
  ChevronDown,
  Globe,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export type NavView =
  | 'browse'
  | 'lessons'
  | 'curriculum'
  | 'tutor-dashboard'
  | 'student-dashboard'
  | 'admin-portal'
  | 'teach';

interface PreplyNavbarProps {
  activeView: NavView;
  setActiveView: (view: NavView) => void;
  tutorSubTab?: 'overview' | 'schedule' | 'lessons' | 'students' | 'earnings';
  setTutorSubTab?: (tab: 'overview' | 'schedule' | 'lessons' | 'students' | 'earnings') => void;
  unreadCount: number;
  upcomingCount: number;
  savedTutorsCount?: number;
  onOpenPdf: () => void;
  onOpenMessages: () => void;
  onOpenApiConsole?: () => void;
  onOpenGoalModal?: () => void;
  activeGoalTitle?: string;
  onOpenAuthModal?: (initialTab?: 'login' | 'signup') => void;
  onOpenTutorOnboarding?: () => void;
}

export const PreplyNavbar: React.FC<PreplyNavbarProps> = ({
  activeView,
  setActiveView,
  unreadCount,
  upcomingCount,
  onOpenMessages,
  onOpenAuthModal,
  onOpenTutorOnboarding,
}) => {
  const { user, isAuthenticated, activeRole, setActiveRole, logout, updateWalletBalance, showToast } =
    useAuth();
  const { language, toggleLanguage, t } = useLanguage();

  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [walletDropdownOpen, setWalletDropdownOpen] = useState(false);

  const userMenuRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const walletRef = useRef<HTMLDivElement>(null);

  const isDualRole = Boolean(user && user.roles.includes('STUDENT') && user.roles.includes('TUTOR'));

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifDropdownOpen(false);
      }
      if (walletRef.current && !walletRef.current.contains(e.target as Node)) {
        setWalletDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const initials = user
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'GU';

  const handleQuickTopUp = (amount: number) => {
    updateWalletBalance(amount);
    setWalletDropdownOpen(false);
    showToast(`+$${amount}.00 added to your KhmerTutors wallet.`);
  };

  const handleToggleLanguage = () => {
    const next = language === 'en' ? 'km' : 'en';
    toggleLanguage();
    if (next === 'km') {
      showToast('ភាសាខ្មែរត្រូវបានបើក (Draft copy — needs native-speaker review)');
    } else {
      showToast('Switched interface language to English');
    }
  };

  const LanguagePillSwitcher = ({ compact = false }: { compact?: boolean }) => (
    <button
      type="button"
      onClick={handleToggleLanguage}
      className={`inline-flex items-center rounded-full border border-slate-200 bg-white p-0.5 text-xs font-bold shadow-2xs transition-colors hover:border-[#2445C8]/40 cursor-pointer shrink-0 ${
        compact ? 'h-9' : 'h-9 sm:h-10'
      }`}
      aria-label="Switch Language EN / ខ្មែរ"
      title={t('lang.notice')}
    >
      <span
        className={`px-2.5 py-1 rounded-full transition-colors ${
          language === 'en' ? 'bg-[#14213D] text-white' : 'text-slate-600'
        }`}
      >
        EN
      </span>
      <span
        className={`px-2.5 py-1 rounded-full transition-colors ${
          language === 'km' ? 'bg-[#2445C8] text-white' : 'text-slate-600'
        }`}
      >
        ខ្មែរ
      </span>
    </button>
  );

  return (
    <>
      <header className="sticky top-0 z-40 w-full h-[64px] lg:h-[72px] bg-[#F7F6F2]/95 backdrop-blur-md border-b border-slate-200/90 transition-all duration-150">
        <div className="max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between gap-3 lg:gap-6">
          {/* LEFT: Logo & Role Marker */}
          <div className="flex items-center shrink-0 min-w-0">
            <button
              onClick={() => {
                if (activeRole === 'ADMIN') setActiveView('admin-portal');
                else if (activeRole === 'TUTOR') setActiveView('tutor-dashboard');
                else setActiveView('browse');
              }}
              className="flex items-center gap-2 sm:gap-2.5 text-left group rounded-xl p-1 min-h-[44px] cursor-pointer transition-all duration-150 focus-visible:ring-2 focus-visible:ring-[#2445C8] focus-visible:outline-none"
              aria-label="KhmerTutors Online Home"
            >
              <div className="h-9 w-10 sm:h-10 sm:w-11 rounded-xl bg-white border border-slate-200 flex items-center justify-center p-1 transition-transform duration-150 group-hover:scale-105 shadow-2xs shrink-0">
                <img
                  src="/assets/logo_kto_new.png"
                  alt="KhmerTutors Online Logo"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="truncate">
                <div className="font-display font-extrabold text-[#14213D] text-base sm:text-lg lg:text-xl tracking-tight leading-tight group-hover:text-[#2445C8] transition-colors duration-150 whitespace-nowrap flex items-center gap-2">
                  <span className="lg:hidden">{t('brand.short')}</span>
                  <span className="hidden lg:inline">{t('brand.name')}</span>
                  {activeRole === 'TUTOR' ? (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#2445C8]/10 text-[#2445C8] border border-[#2445C8]/20 font-mono">
                      Tutor
                    </span>
                  ) : activeRole === 'ADMIN' ? (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#14213D] text-[#F2A531] font-mono">
                      Admin
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#F2A531] text-[#14213D] font-mono">
                      Beta
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-slate-500 font-normal hidden xl:block leading-none mt-0.5 whitespace-nowrap">
                  {t('brand.tagline')}
                </div>
              </div>
            </button>
          </div>

          {/* CENTER: Role-Appropriate Navigation */}
          <nav
            className="hidden lg:flex items-center gap-1 xl:gap-1.5 text-sm font-semibold shrink-0"
            aria-label="Main Navigation"
          >
            {isAuthenticated && activeRole === 'TUTOR' ? (
              <>
                <button
                  onClick={() => setActiveView('tutor-dashboard')}
                  className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                    activeView === 'tutor-dashboard'
                      ? 'text-[#2445C8] bg-[#2445C8]/10 font-bold'
                      : 'text-slate-600 hover:text-[#14213D] hover:bg-white'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4 stroke-[2]" />
                  <span>{t('nav.tutorPortal')}</span>
                </button>
                <button
                  onClick={() => setActiveView('browse')}
                  className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                    activeView === 'browse'
                      ? 'text-[#2445C8] bg-[#2445C8]/10 font-bold'
                      : 'text-slate-600 hover:text-[#14213D] hover:bg-white'
                  }`}
                >
                  <Search className="w-4 h-4 stroke-[2]" />
                  <span>{t('nav.marketplace')}</span>
                </button>
              </>
            ) : isAuthenticated && activeRole === 'ADMIN' ? (
              <>
                <button
                  onClick={() => setActiveView('admin-portal')}
                  className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                    activeView === 'admin-portal'
                      ? 'text-[#14213D] bg-[#F2A531]/25 font-bold'
                      : 'text-slate-600 hover:text-[#14213D] hover:bg-white'
                  }`}
                >
                  <ShieldAlert className="w-4 h-4 stroke-[2]" />
                  <span>{t('nav.adminPortal')}</span>
                </button>
                <button
                  onClick={() => setActiveView('browse')}
                  className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                    activeView === 'browse'
                      ? 'text-[#2445C8] bg-[#2445C8]/10 font-bold'
                      : 'text-slate-600 hover:text-[#14213D] hover:bg-white'
                  }`}
                >
                  <Search className="w-4 h-4 stroke-[2]" />
                  <span>{t('nav.marketplace')}</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setActiveView('browse')}
                  className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                    activeView === 'browse'
                      ? 'text-[#2445C8] bg-[#2445C8]/10 font-bold'
                      : 'text-slate-600 hover:text-[#14213D] hover:bg-white'
                  }`}
                >
                  <Search className="w-4 h-4 stroke-[2]" />
                  <span>{t('nav.findTutors')}</span>
                </button>

                <button
                  onClick={() => setActiveView('curriculum')}
                  className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                    activeView === 'curriculum'
                      ? 'text-[#2445C8] bg-[#2445C8]/10 font-bold'
                      : 'text-slate-600 hover:text-[#14213D] hover:bg-white'
                  }`}
                >
                  <BookOpen className="w-4 h-4 stroke-[2]" />
                  <span>{t('nav.curriculum')}</span>
                </button>

                {isAuthenticated && (
                  <>
                    <button
                      onClick={() => setActiveView('student-dashboard')}
                      className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                        activeView === 'student-dashboard'
                          ? 'text-[#2445C8] bg-[#2445C8]/10 font-bold'
                          : 'text-slate-600 hover:text-[#14213D] hover:bg-white'
                      }`}
                    >
                      <LayoutDashboard className="w-4 h-4 stroke-[2]" />
                      <span>{t('nav.myDashboard')}</span>
                    </button>

                    <button
                      onClick={() => setActiveView('lessons')}
                      className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                        activeView === 'lessons'
                          ? 'text-[#2445C8] bg-[#2445C8]/10 font-bold'
                          : 'text-slate-600 hover:text-[#14213D] hover:bg-white'
                      }`}
                    >
                      <Calendar className="w-4 h-4 stroke-[2]" />
                      <span>{t('nav.myLessons')}</span>
                      {upcomingCount > 0 && (
                        <span className="w-5 h-5 bg-[#2445C8] text-white text-[11px] font-bold rounded-full flex items-center justify-center font-mono">
                          {upcomingCount}
                        </span>
                      )}
                    </button>
                  </>
                )}

                {(!isAuthenticated || !user?.roles.includes('TUTOR')) && (
                  <button
                    onClick={() => setActiveView('teach')}
                    className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                      activeView === 'teach'
                        ? 'text-[#2445C8] bg-[#2445C8]/10 font-bold'
                        : 'text-slate-600 hover:text-[#14213D] hover:bg-white'
                    }`}
                  >
                    <GraduationCap className="w-4 h-4 stroke-[2]" />
                    <span>{t('nav.becomeTutor')}</span>
                  </button>
                )}
              </>
            )}
          </nav>

          {/* RIGHT: EN / ខ្មែរ Pill Switcher + Account Actions */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            <LanguagePillSwitcher />

            {isAuthenticated && (
              <div className="flex items-center gap-1.5">
                {/* Notifications */}
                <div className="relative" ref={notifRef}>
                  <button
                    onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                    className="relative w-10 h-10 rounded-xl flex items-center justify-center text-slate-600 hover:text-[#14213D] hover:bg-white border border-transparent hover:border-slate-200 transition-colors cursor-pointer"
                    aria-label="Notifications"
                  >
                    <Bell className="w-5 h-5 stroke-[2]" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-[#F2A531] rounded-full ring-2 ring-[#F7F6F2]" />
                  </button>

                  {notifDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-2xl shadow-xl border border-slate-200 p-3 z-50 text-xs">
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                        <span className="font-bold text-[#14213D] text-sm">Notifications</span>
                        <button
                          onClick={() => showToast('All notifications marked as read')}
                          className="text-[11px] text-[#2445C8] hover:underline font-semibold cursor-pointer"
                        >
                          Mark read
                        </button>
                      </div>
                      <div className="space-y-1.5">
                        <div className="p-2.5 rounded-xl bg-[#2445C8]/5 border border-[#2445C8]/15 flex items-start gap-2.5">
                          <Clock className="w-4 h-4 text-[#2445C8] shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold text-[#14213D]">Upcoming Khmer session</p>
                            <p className="text-[11px] text-slate-600">Review your GMT+7 schedule before class.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Messages */}
                <button
                  onClick={onOpenMessages}
                  className="relative w-10 h-10 rounded-xl flex items-center justify-center text-slate-600 hover:text-[#14213D] hover:bg-white border border-transparent hover:border-slate-200 transition-colors cursor-pointer"
                  aria-label="Open messages"
                >
                  <MessageSquare className="w-5 h-5 stroke-[2]" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 min-w-[16px] h-4 px-1 bg-[#2445C8] text-white text-[10px] font-bold rounded-full flex items-center justify-center font-mono">
                      {unreadCount}
                    </span>
                  )}
                </button>
              </div>
            )}

            {isAuthenticated && activeRole === 'STUDENT' && (
              <div className="relative hidden sm:block" ref={walletRef}>
                <button
                  onClick={() => setWalletDropdownOpen(!walletDropdownOpen)}
                  className="flex items-center gap-1.5 px-3 py-1.5 min-h-[40px] rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-bold text-[#14213D] transition-all cursor-pointer shadow-2xs"
                >
                  <span className="text-[11px] text-slate-500 font-medium">Wallet</span>
                  <span className="font-mono text-[#2445C8] tabular-nums">
                    ${user?.studentProfile?.wallet_balance.toFixed(2) || '24.00'}
                  </span>
                </button>

                {walletDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 z-50 text-xs space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <span className="font-bold text-[#14213D] text-sm">Student Wallet</span>
                      <span className="text-[11px] bg-[#2445C8]/10 text-[#2445C8] px-2 py-0.5 rounded font-bold">
                        ABA · KHQR
                      </span>
                    </div>
                    <div className="p-3 bg-[#14213D] rounded-xl text-white flex items-center justify-between">
                      <div>
                        <div className="text-[11px] text-slate-300">Available Credit</div>
                        <div className="text-xl font-black font-mono text-[#F2A531]">
                          ${user?.studentProfile?.wallet_balance.toFixed(2) || '24.00'}
                        </div>
                      </div>
                      <button
                        onClick={() => handleQuickTopUp(20)}
                        className="px-3 py-1.5 bg-[#2445C8] hover:bg-[#1c37a4] text-white font-bold rounded-lg text-[11px] flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add $20</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {isAuthenticated && user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1 pr-2 rounded-full bg-white hover:bg-slate-50 border border-slate-200 transition-colors cursor-pointer min-h-[42px]"
                  aria-label="User Account Menu"
                  aria-expanded={userDropdownOpen}
                >
                  <div className="w-8 h-8 rounded-full bg-[#14213D] text-white font-bold text-xs flex items-center justify-center shrink-0">
                    {initials}
                  </div>
                  <div className="hidden xl:block text-left leading-tight max-w-[110px]">
                    <div className="text-xs font-bold text-[#14213D] truncate">{user.name}</div>
                    <div className="text-[10px] text-[#2445C8] font-mono font-bold truncate">
                      {activeRole}
                    </div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 text-xs">
                    <div className="px-4 py-2.5 border-b border-slate-100">
                      <div className="font-bold text-[#14213D] text-sm truncate">{user.name}</div>
                      <div className="text-[11px] text-slate-500 truncate">{user.email}</div>
                    </div>

                    <div className="p-1.5 space-y-0.5">
                      {activeRole === 'TUTOR' && (
                        <>
                          <button
                            onClick={() => {
                              setActiveView('tutor-dashboard');
                              setUserDropdownOpen(false);
                            }}
                            className="w-full text-left px-3 py-2 rounded-xl hover:bg-[#F7F6F2] text-[#14213D] font-semibold flex items-center gap-2 cursor-pointer"
                          >
                            <LayoutDashboard className="w-4 h-4 text-[#2445C8]" />
                            <span>{t('nav.tutorPortal')}</span>
                          </button>
                          <button
                            onClick={() => {
                              setActiveRole('STUDENT');
                              setActiveView('browse');
                              setUserDropdownOpen(false);
                              showToast('Switched to Learner View');
                            }}
                            className="w-full text-left px-3 py-2 rounded-xl hover:bg-[#F7F6F2] text-[#14213D] font-semibold flex items-center gap-2 cursor-pointer"
                          >
                            <ArrowRightLeft className="w-4 h-4 text-[#2445C8]" />
                            <span>Switch to Learner View</span>
                          </button>
                        </>
                      )}

                      {activeRole === 'STUDENT' && (
                        <>
                          <button
                            onClick={() => {
                              setActiveView('student-dashboard');
                              setUserDropdownOpen(false);
                            }}
                            className="w-full text-left px-3 py-2 rounded-xl hover:bg-[#F7F6F2] text-[#14213D] font-semibold flex items-center gap-2 cursor-pointer"
                          >
                            <LayoutDashboard className="w-4 h-4 text-[#2445C8]" />
                            <span>{t('nav.myDashboard')}</span>
                          </button>
                          <button
                            onClick={() => {
                              setActiveView('lessons');
                              setUserDropdownOpen(false);
                            }}
                            className="w-full text-left px-3 py-2 rounded-xl hover:bg-[#F7F6F2] text-[#14213D] font-semibold flex items-center gap-2 cursor-pointer"
                          >
                            <Calendar className="w-4 h-4 text-[#2445C8]" />
                            <span>{t('nav.myLessons')}</span>
                          </button>
                          {isDualRole && (
                            <button
                              onClick={() => {
                                setActiveRole('TUTOR');
                                setActiveView('tutor-dashboard');
                                setUserDropdownOpen(false);
                                showToast('Switched to Tutor Workspace');
                              }}
                              className="w-full text-left px-3 py-2 rounded-xl hover:bg-[#F7F6F2] text-[#14213D] font-semibold flex items-center gap-2 cursor-pointer"
                            >
                              <ArrowRightLeft className="w-4 h-4 text-[#2445C8]" />
                              <span>Switch to Tutor Workspace</span>
                            </button>
                          )}
                        </>
                      )}

                      {activeRole === 'ADMIN' && (
                        <button
                          onClick={() => {
                            setActiveView('admin-portal');
                            setUserDropdownOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 rounded-xl hover:bg-[#F7F6F2] text-[#14213D] font-semibold flex items-center gap-2 cursor-pointer"
                        >
                          <ShieldAlert className="w-4 h-4 text-[#F2A531]" />
                          <span>{t('nav.adminPortal')}</span>
                        </button>
                      )}

                      <button
                        onClick={() => {
                          handleToggleLanguage();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl hover:bg-[#F7F6F2] text-[#14213D] font-semibold flex items-center justify-between cursor-pointer"
                      >
                        <span className="flex items-center gap-2">
                          <Globe className="w-4 h-4 text-slate-500" />
                          <span>Language</span>
                        </span>
                        <span className="font-mono text-[11px] font-bold text-[#2445C8]">
                          {language === 'en' ? 'EN → ខ្មែរ' : 'ខ្មែរ → EN'}
                        </span>
                      </button>

                      <div className="border-t border-slate-100 mt-1 pt-1">
                        <button
                          onClick={() => {
                            logout();
                            setUserDropdownOpen(false);
                            setActiveView('browse');
                          }}
                          className="w-full text-left px-3 py-2 rounded-xl hover:bg-rose-50 text-rose-600 font-semibold flex items-center gap-2 cursor-pointer"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>{t('nav.logout')}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden lg:flex items-center gap-2">
                <button
                  onClick={() => onOpenAuthModal && onOpenAuthModal('login')}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold text-[#14213D] hover:bg-white border border-slate-200 transition-colors whitespace-nowrap cursor-pointer"
                >
                  {t('nav.login')}
                </button>
                <button
                  onClick={() => onOpenAuthModal && onOpenAuthModal('signup')}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#2445C8] hover:bg-[#1c37a4] shadow-xs transition-colors whitespace-nowrap cursor-pointer"
                >
                  {t('nav.signup')}
                </button>
              </div>
            )}

            <button
              onClick={() => setMobileDrawerOpen(true)}
              className="lg:hidden w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#14213D] hover:bg-slate-50 cursor-pointer"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE SLIDE-IN DRAWER (<1024px) */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-[#14213D]/60 backdrop-blur-xs lg:hidden">
          <div className="fixed inset-0" onClick={() => setMobileDrawerOpen(false)} />

          <div className="relative w-full max-w-xs bg-[#F7F6F2] h-full shadow-2xl flex flex-col z-10 overflow-y-auto">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-white min-h-[56px]">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center p-1">
                  <img
                    src="/assets/logo_kto_new.png"
                    alt="KhmerTutors Online Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <div className="font-display font-extrabold text-sm text-[#14213D]">
                    {t('brand.name')}
                  </div>
                  <div className="text-[10px] text-[#2445C8] font-bold">
                    {isAuthenticated ? `Role: ${activeRole}` : 'Micro-Tutoring · Cambodia'}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setMobileDrawerOpen(false)}
                className="w-11 h-11 min-w-[44px] rounded-xl flex items-center justify-center text-slate-500 hover:text-[#14213D] hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-5 h-5 stroke-[2]" />
              </button>
            </div>

            <div className="p-4 border-b border-slate-200 bg-white flex items-center justify-between">
              <span className="text-xs font-bold text-[#14213D]">Language / ភាសា</span>
              <LanguagePillSwitcher compact />
            </div>

            <div className="p-3 space-y-1 flex-1">
              <button
                onClick={() => {
                  setActiveView('browse');
                  setMobileDrawerOpen(false);
                }}
                className={`w-full h-12 px-4 rounded-xl font-bold text-sm flex items-center gap-3 transition-colors ${
                  activeView === 'browse' ? 'bg-[#2445C8]/10 text-[#2445C8]' : 'text-[#14213D] hover:bg-white'
                }`}
              >
                <Search className="w-5 h-5 stroke-[2]" />
                <span>{t('nav.findTutors')}</span>
              </button>

              <button
                onClick={() => {
                  setActiveView('curriculum');
                  setMobileDrawerOpen(false);
                }}
                className={`w-full h-12 px-4 rounded-xl font-bold text-sm flex items-center gap-3 transition-colors ${
                  activeView === 'curriculum'
                    ? 'bg-[#2445C8]/10 text-[#2445C8]'
                    : 'text-[#14213D] hover:bg-white'
                }`}
              >
                <BookOpen className="w-5 h-5 stroke-[2]" />
                <span>{t('nav.curriculum')}</span>
              </button>

              {isAuthenticated ? (
                <>
                  {activeRole === 'TUTOR' && (
                    <button
                      onClick={() => {
                        setActiveView('tutor-dashboard');
                        setMobileDrawerOpen(false);
                      }}
                      className="w-full h-12 px-4 rounded-xl font-bold text-sm flex items-center gap-3 text-[#14213D] hover:bg-white"
                    >
                      <LayoutDashboard className="w-5 h-5 text-[#2445C8]" />
                      <span>{t('nav.tutorPortal')}</span>
                    </button>
                  )}
                  {activeRole === 'ADMIN' && (
                    <button
                      onClick={() => {
                        setActiveView('admin-portal');
                        setMobileDrawerOpen(false);
                      }}
                      className="w-full h-12 px-4 rounded-xl font-bold text-sm flex items-center gap-3 text-[#14213D] hover:bg-white"
                    >
                      <ShieldAlert className="w-5 h-5 text-[#F2A531]" />
                      <span>{t('nav.adminPortal')}</span>
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setActiveView('lessons');
                      setMobileDrawerOpen(false);
                    }}
                    className="w-full h-12 px-4 rounded-xl font-bold text-sm flex items-center gap-3 text-[#14213D] hover:bg-white"
                  >
                    <Calendar className="w-5 h-5 text-[#2445C8]" />
                    <span>{t('nav.myLessons')}</span>
                  </button>
                </>
              ) : (
                <div className="pt-3 space-y-2">
                  <button
                    onClick={() => {
                      setMobileDrawerOpen(false);
                      onOpenAuthModal && onOpenAuthModal('login');
                    }}
                    className="w-full h-11 rounded-xl border border-slate-300 bg-white font-bold text-xs text-[#14213D]"
                  >
                    {t('nav.login')}
                  </button>
                  <button
                    onClick={() => {
                      setMobileDrawerOpen(false);
                      onOpenAuthModal && onOpenAuthModal('signup');
                    }}
                    className="w-full h-11 rounded-xl bg-[#2445C8] text-white font-bold text-xs"
                  >
                    {t('nav.signup')}
                  </button>
                  <button
                    onClick={() => {
                      setMobileDrawerOpen(false);
                      if (onOpenTutorOnboarding) onOpenTutorOnboarding();
                      else setActiveView('teach');
                    }}
                    className="w-full h-11 rounded-xl bg-[#F2A531]/20 text-[#14213D] font-bold text-xs"
                  >
                    {t('nav.becomeTutor')}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
