import React from 'react';
import { ShieldAlert, ArrowLeft, Home, Lock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface ForbiddenViewProps {
  requiredRole: string;
  onGoHome: () => void;
}

export const ForbiddenView: React.FC<ForbiddenViewProps> = ({
  requiredRole,
  onGoHome,
}) => {
  const { user, activeRole } = useAuth();

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6 bg-slate-50">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 text-center shadow-xl space-y-5">
        <div className="w-16 h-16 rounded-3xl bg-rose-50 text-rose-600 border border-rose-200 mx-auto flex items-center justify-center shadow-inner">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div>
          <span className="text-[11px] font-bold text-rose-700 uppercase tracking-wider bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
            403 · Access Restricted
          </span>
          <h2 className="text-2xl font-black text-slate-900 mt-2 tracking-tight">
            You Don't Have Access to this Area
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
            This module requires <strong>{requiredRole}</strong> permissions. Your current active role is <strong>{activeRole}</strong> ({user?.name}).
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 text-left space-y-1.5">
          <div className="font-bold text-slate-800 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-slate-500" />
            <span>Role-Based Security Policy:</span>
          </div>
          <p className="text-[11px]">
            • <strong>Student Accounts:</strong> Can browse tutors, book lessons, and access the curriculum.
          </p>
          <p className="text-[11px]">
            • <strong>Tutor Accounts:</strong> Can set availability, teach, manage lesson schedules, and receive payouts.
          </p>
          <p className="text-[11px]">
            • <strong>Admin Accounts:</strong> Oversee platform approvals, user moderation, and financial settlement.
          </p>
        </div>

        <div className="pt-2">
          <button
            onClick={onGoHome}
            className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Your {activeRole === 'ADMIN' ? 'Admin Portal' : activeRole === 'TUTOR' ? 'Tutor Dashboard' : 'Student Dashboard'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
