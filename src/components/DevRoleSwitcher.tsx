import React, { useState, useRef, useEffect } from 'react';
import { ChevronUp, ChevronDown, Check, LogOut, User, Shield, GraduationCap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const DevRoleSwitcher: React.FC<{
  onNavigate?: (view: any) => void;
}> = ({ onNavigate }) => {
  // Strictly strip from production builds: never render when !import.meta.env.DEV
  if (!import.meta.env.DEV) {
    return null;
  }
  return <DevRoleSwitcherInner onNavigate={onNavigate} />;
};

const DevRoleSwitcherInner: React.FC<{
  onNavigate?: (view: any) => void;
}> = ({ onNavigate }) => {
  const { user, isAuthenticated, activeRole, switchDemoUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const isPendingTutor = user?.tutorProfile?.approval_status === 'pending';
  const isDualRole = user && user.roles.includes('STUDENT') && user.roles.includes('TUTOR');

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getRoleLabel = () => {
    if (!isAuthenticated) return 'Logged Out';
    if (activeRole === 'ADMIN') return 'Admin';
    if (activeRole === 'TUTOR') return isPendingTutor ? 'Tutor (Pending)' : 'Tutor';
    if (isDualRole) return 'Dual Role';
    return 'Student';
  };

  return (
    <div className="bg-[#14213D] border-t border-white/10 text-white py-2.5 px-4 sm:px-6">
      <div
        className="max-w-[1280px] w-full mx-auto flex flex-wrap items-center justify-between gap-3 relative"
        ref={menuRef}
      >
        <div className="flex items-center gap-2 text-xs">
          <span className="px-2 py-0.5 rounded bg-[#F2A531] text-[#14213D] font-mono font-bold text-[10px] uppercase">
            DEV ONLY
          </span>
          <span className="text-slate-300">
            Role switcher is stripped automatically from production builds and sits inline here so it never covers content.
          </span>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3.5 py-1.5 bg-white/10 hover:bg-white/15 text-white text-xs font-semibold rounded-xl border border-white/15 transition-colors cursor-pointer"
          aria-label="Developer Role Switcher"
          aria-expanded={isOpen}
        >
          <span className="text-slate-300 font-medium">Active Role:</span>
          <span className="font-bold text-[#F2A531]">{getRoleLabel()}</span>
          {isOpen ? (
            <ChevronDown className="w-3.5 h-3.5 text-slate-300" />
          ) : (
            <ChevronUp className="w-3.5 h-3.5 text-slate-300" />
          )}
        </button>

        {isOpen && (
          <div className="absolute bottom-11 right-0 w-72 max-w-[calc(100vw-32px)] bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 text-xs text-[#14213D] z-50">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
              <span className="font-bold text-[#14213D]">Switch Test Account</span>
              <span className="text-[10px] text-slate-400 font-mono">DEV BUILD</span>
            </div>

            <div className="space-y-1">
              <button
                onClick={() => {
                  switchDemoUser('student');
                  if (onNavigate) onNavigate('browse');
                  setIsOpen(false);
                }}
                className={`w-full text-left p-2 rounded-xl flex items-center justify-between transition-colors cursor-pointer ${
                  isAuthenticated && activeRole === 'STUDENT' && !isDualRole
                    ? 'bg-[#2445C8]/10 text-[#2445C8] font-bold'
                    : 'hover:bg-[#F7F6F2]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-[#2445C8]" />
                  <div>
                    <div className="font-bold">Student (Alex Morgan)</div>
                    <div className="text-[10px] text-slate-500">Expat learner · $24 balance</div>
                  </div>
                </div>
                <span className="text-[10px] bg-[#2445C8]/10 text-[#2445C8] px-1.5 py-0.5 rounded font-bold">
                  STUDENT
                </span>
              </button>

              <button
                onClick={() => {
                  switchDemoUser('tutor-approved');
                  if (onNavigate) onNavigate('tutor-dashboard');
                  setIsOpen(false);
                }}
                className={`w-full text-left p-2 rounded-xl flex items-center justify-between transition-colors cursor-pointer ${
                  isAuthenticated && activeRole === 'TUTOR' && !isPendingTutor
                    ? 'bg-[#2445C8]/10 text-[#2445C8] font-bold'
                    : 'hover:bg-[#F7F6F2]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-[#2445C8]" />
                  <div>
                    <div className="font-bold">Tutor (Sreynoch Keo)</div>
                    <div className="text-[10px] text-slate-500">RUPP Verified Tutor</div>
                  </div>
                </div>
                <span className="text-[10px] bg-[#2445C8]/10 text-[#2445C8] px-1.5 py-0.5 rounded font-bold">
                  TUTOR
                </span>
              </button>

              <button
                onClick={() => {
                  switchDemoUser('tutor-pending');
                  if (onNavigate) onNavigate('tutor-dashboard');
                  setIsOpen(false);
                }}
                className={`w-full text-left p-2 rounded-xl flex items-center justify-between transition-colors cursor-pointer ${
                  isAuthenticated && activeRole === 'TUTOR' && isPendingTutor
                    ? 'bg-[#F2A531]/20 text-[#14213D] font-bold'
                    : 'hover:bg-[#F7F6F2]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-[#F2A531]" />
                  <div>
                    <div className="font-bold">Tutor Pending (Visal Rath)</div>
                    <div className="text-[10px] text-slate-500">3-step review tracker</div>
                  </div>
                </div>
                <span className="text-[10px] bg-[#F2A531]/30 text-[#14213D] px-1.5 py-0.5 rounded font-bold">
                  PENDING
                </span>
              </button>

              <button
                onClick={() => {
                  switchDemoUser('admin');
                  if (onNavigate) onNavigate('admin-portal');
                  setIsOpen(false);
                }}
                className={`w-full text-left p-2 rounded-xl flex items-center justify-between transition-colors cursor-pointer ${
                  isAuthenticated && activeRole === 'ADMIN'
                    ? 'bg-[#14213D] text-white font-bold'
                    : 'hover:bg-[#F7F6F2]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#F2A531]" />
                  <div>
                    <div className="font-bold">Admin (Dara Sovann)</div>
                    <div className="text-[10px] opacity-75">Approvals, leaderboard, payouts</div>
                  </div>
                </div>
                <span className="text-[10px] bg-[#F2A531] text-[#14213D] px-1.5 py-0.5 rounded font-bold">
                  ADMIN
                </span>
              </button>

              <div className="pt-1.5 border-t border-slate-100">
                <button
                  onClick={() => {
                    switchDemoUser('logged-out');
                    if (onNavigate) onNavigate('browse');
                    setIsOpen(false);
                  }}
                  className={`w-full text-left p-2 rounded-xl flex items-center justify-between transition-colors cursor-pointer ${
                    !isAuthenticated
                      ? 'bg-rose-50 text-rose-700 font-bold'
                      : 'hover:bg-rose-50/60 text-rose-600'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <LogOut className="w-4 h-4 text-rose-500" />
                    <span className="font-bold">Logged-Out (Visitor)</span>
                  </div>
                  {!isAuthenticated && <Check className="w-4 h-4 text-rose-600" />}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
