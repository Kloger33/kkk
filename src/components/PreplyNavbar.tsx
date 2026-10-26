import React from 'react';
import { 
  Search, 
  BookOpen, 
  Calendar, 
  MessageSquare, 
  FileText, 
  UserCheck, 
  Sparkles,
  ArrowRightLeft,
  Palette
} from 'lucide-react';
import { DESIGNER_INFO } from '../data/portfolioData';

interface PreplyNavbarProps {
  activeView: 'browse' | 'lessons' | 'curriculum' | 'tutor-dashboard' | 'design';
  setActiveView: (view: 'browse' | 'lessons' | 'curriculum' | 'tutor-dashboard' | 'design') => void;
  unreadCount: number;
  upcomingCount: number;
  onOpenPdf: () => void;
  onOpenMessages: () => void;
}

export const PreplyNavbar: React.FC<PreplyNavbarProps> = ({
  activeView,
  setActiveView,
  unreadCount,
  upcomingCount,
  onOpenPdf,
  onOpenMessages,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-6">
        
        {/* Brand Lockup */}
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setActiveView('browse')}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-700 to-teal-500 flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105 border border-teal-600/30">
              {/* Refined Lotus Emblem */}
              <svg className="w-6 h-6 text-amber-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2.5C12 2.5 14.5 7 14.5 11C14.5 14 13.5 16.5 12 17.5C10.5 16.5 9.5 14 9.5 11C9.5 7 12 2.5 12 2.5Z" fill="currentColor" fillOpacity="0.25" />
                <path d="M12 8C8.5 8 5 11 6.5 15C8 17 10.5 17 12 17.5C10.5 14.5 10.5 11 12 8Z" />
                <path d="M12 8C15.5 8 19 11 17.5 15C16 17 13.5 17 12 17.5C13.5 14.5 13.5 11 12 8Z" />
                <path d="M7 19.5C9.5 20.5 14.5 20.5 17 19.5" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-slate-900 text-lg tracking-tight">KhmerTutorial</span>
                <span className="text-[10px] font-bold font-mono bg-teal-50 text-teal-700 px-1.5 py-0.5 rounded border border-teal-200">
                  ONLINE
                </span>
              </div>
              <div className="text-[11px] text-slate-500 font-normal">
                Cambodia's Micro-Tutoring Marketplace
              </div>
            </div>
          </button>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 ml-4 text-sm font-medium">
            <button
              onClick={() => setActiveView('browse')}
              className={`px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                activeView === 'browse'
                  ? 'text-teal-700 bg-teal-50 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Search className="w-4 h-4 text-teal-600" />
              <span>Find Tutors</span>
            </button>

            <button
              onClick={() => setActiveView('curriculum')}
              className={`px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                activeView === 'curriculum'
                  ? 'text-teal-700 bg-teal-50 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <BookOpen className="w-4 h-4 text-amber-600" />
              <span>Starter Curriculum (6 Modules)</span>
            </button>

            <button
              onClick={() => setActiveView('lessons')}
              className={`px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1.5 relative ${
                activeView === 'lessons'
                  ? 'text-teal-700 bg-teal-50 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Calendar className="w-4 h-4 text-slate-500" />
              <span>My Lessons</span>
              {upcomingCount > 0 && (
                <span className="w-5 h-5 bg-teal-600 text-white text-[11px] font-bold rounded-full flex items-center justify-center">
                  {upcomingCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveView('design')}
              className={`px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                activeView === 'design'
                  ? 'text-teal-700 bg-teal-50 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Palette className="w-4 h-4 text-teal-600" />
              <span>Design System</span>
            </button>
          </nav>
        </div>

        {/* Right Zone: Role Switcher & Actions */}
        <div className="flex items-center gap-3">
          
          {/* Research Paper PDF Viewer Button */}
          <button
            onClick={onOpenPdf}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200"
            title="Read 22-page research document"
          >
            <FileText className="w-3.5 h-3.5 text-amber-600" />
            <span>Research Paper (22p)</span>
          </button>

          {/* Messages Button */}
          <button
            onClick={onOpenMessages}
            className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            title="Open messages"
          >
            <MessageSquare className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Toggle Role: Learner vs Tutor Dashboard View */}
          <button
            onClick={() => {
              if (activeView === 'tutor-dashboard') {
                setActiveView('browse');
              } else {
                setActiveView('tutor-dashboard');
              }
            }}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg transition-all border ${
              activeView === 'tutor-dashboard'
                ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-sm'
                : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300'
            }`}
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {activeView === 'tutor-dashboard' ? 'Back to Learner View' : 'Switch to Tutor View'}
            </span>
            <span className="sm:hidden">
              {activeView === 'tutor-dashboard' ? 'Learner' : 'Tutor'}
            </span>
          </button>

          {/* User Profile Pill */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
            <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
              AM
            </div>
            <div className="hidden sm:block text-left text-xs leading-tight">
              <div className="font-semibold text-slate-900">Alex Morgan</div>
              <div className="text-[11px] text-teal-600 font-mono font-medium">$24.00 balance</div>
            </div>
          </div>

        </div>

      </div>

      {/* Mobile Submenu */}
      <div className="md:hidden flex items-center justify-between border-t border-slate-100 px-2.5 py-1.5 bg-slate-50 text-caption overflow-x-auto whitespace-nowrap gap-1">
        <button
          onClick={() => setActiveView('browse')}
          className={`py-1 px-2 rounded-md font-medium ${activeView === 'browse' ? 'text-teal-700 bg-teal-50 font-bold' : 'text-slate-600'}`}
        >
          Find Tutors
        </button>
        <button
          onClick={() => setActiveView('curriculum')}
          className={`py-1 px-2 rounded-md font-medium ${activeView === 'curriculum' ? 'text-teal-700 bg-teal-50 font-bold' : 'text-slate-600'}`}
        >
          Curriculum
        </button>
        <button
          onClick={() => setActiveView('lessons')}
          className={`py-1 px-2 rounded-md font-medium ${activeView === 'lessons' ? 'text-teal-700 bg-teal-50 font-bold' : 'text-slate-600'}`}
        >
          Lessons ({upcomingCount})
        </button>
        <button
          onClick={() => setActiveView('design')}
          className={`py-1 px-2 rounded-md font-medium ${activeView === 'design' ? 'text-teal-700 bg-teal-50 font-bold' : 'text-slate-600'}`}
        >
          Tokens
        </button>
      </div>
    </header>
  );
};
