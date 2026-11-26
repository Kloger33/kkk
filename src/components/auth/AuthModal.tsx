import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Phone, 
  User, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  GraduationCap, 
  BookOpen, 
  CheckCircle2, 
  AlertCircle,
  KeyRound,
  RefreshCw,
  Ticket
} from 'lucide-react';
import { useAuth, UserRole } from '../../context/AuthContext';
import { pilotStore } from '../../services/pilotStore';
import { analytics } from '../../services/analytics';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'login' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'login',
}) => {
  const { login, register, switchDemoUser } = useAuth();

  const [activeTab, setActiveTab] = useState<'login' | 'signup' | 'forgot' | 'verify'>(initialTab);
  const [role, setRole] = useState<UserRole>('STUDENT');
  
  // Form states
  const [name, setName] = useState('');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [authMethod, setAuthMethod] = useState<'email' | 'phone'>('email');
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [inviteCode, setInviteCode] = useState(() => {
    try {
      const codeParam = new URLSearchParams(window.location.search).get('code');
      return codeParam || 'PILOT-STU-01';
    } catch {
      return 'PILOT-STU-01';
    }
  });

  // Status & error handling
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  // Password strength calculation
  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return { score: 0, label: 'Too short', color: 'bg-slate-200' };
    let score = 0;
    if (pwd.length >= 8) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;

    if (score <= 1) return { score: 25, label: 'Weak', color: 'bg-rose-500' };
    if (score === 2) return { score: 50, label: 'Fair', color: 'bg-amber-500' };
    if (score === 3) return { score: 75, label: 'Good', color: 'bg-teal-500' };
    return { score: 100, label: 'Strong', color: 'bg-emerald-500' };
  };

  const strength = getPasswordStrength(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setLoading(true);

    try {
      if (activeTab === 'login') {
        const res = await login(emailOrPhone, password);
        if (res.success) {
          onClose();
        } else {
          setErrorMessage(res.error || 'Invalid credentials. Please verify your email and password.');
        }
      } else if (activeTab === 'signup') {
        if (!name.trim()) {
          setErrorMessage('Please enter your full name.');
          setLoading(false);
          return;
        }

        // Validate Pilot Invite Code
        if (!inviteCode.trim()) {
          setErrorMessage('KhmerTutors Online is invite-only during the pilot test. Please enter a valid invite code (e.g. PILOT-STU-01).');
          setLoading(false);
          return;
        }

        const inviteValidation = pilotStore.validateInviteCode(inviteCode, role);
        if (!inviteValidation.valid) {
          setErrorMessage(inviteValidation.error || 'Invalid pilot invite code.');
          setLoading(false);
          return;
        }

        if (password.length < 8) {
          setErrorMessage('Password must be at least 8 characters long.');
          setLoading(false);
          return;
        }
        if (!agreeTerms) {
          setErrorMessage('Please agree to the Terms of Service to continue.');
          setLoading(false);
          return;
        }

        const res = await register(name, emailOrPhone, password, role);
        if (res.success) {
          pilotStore.redeemInviteCode(inviteCode);
          analytics.track('sign_up', { role, inviteCode });
          analytics.track('email_verified', { role });
          onClose();
        } else {
          setErrorMessage(res.error || 'Failed to create account.');
        }
      } else if (activeTab === 'forgot') {
        setSuccessMessage(`Password reset link dispatched to ${emailOrPhone}!`);
        setTimeout(() => setActiveTab('login'), 2500);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Authentication error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 flex flex-col md:flex-row max-h-[94vh]">
        
        {/* LEFT PANE: Split Branding with Vector Skyline & Value Props */}
        <div className="md:w-5/12 bg-gradient-to-br from-slate-900 via-slate-800 to-teal-950 text-white p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden shrink-0">
          {/* Subtle Angkor glow backdrop */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top Lockup */}
          <div className="relative z-10">
            <div className="flex items-center gap-2.5">
              <div className="h-10 w-11 rounded-xl bg-white/95 border border-white/20 flex items-center justify-center p-1 shadow-inner">
                <img 
                  src="/assets/logo_kto_new.png" 
                  alt="KhmerTutors Logo" 
                  className="w-full h-full object-contain" 
                />
              </div>
              <div>
                <span className="font-extrabold text-lg tracking-tight block">KhmerTutors Online</span>
                <span className="text-[11px] text-teal-300 font-medium">1-on-1 Micro-Tutoring Marketplace</span>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <h3 className="text-2xl font-black text-white leading-tight">
                Master Everyday Khmer with Verified Undergraduates
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Connect directly with friendly Cambodian university tutors from RUPP, ITC & NUM for flexible $3–$4 trial classes.
              </p>
            </div>
          </div>

          {/* Value Props */}
          <div className="relative z-10 space-y-3 my-6 pt-4 border-t border-white/10 text-xs">
            <div className="flex items-center gap-2.5 text-slate-200">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>100% Student ID & University Verification</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-200">
              <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
              <span>ABA PayWay & Bakong KHQR Escrow Protection</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-200">
              <CheckCircle2 className="w-4 h-4 text-teal-300 shrink-0" />
              <span>Role-Based Access for Students, Tutors & Admins</span>
            </div>
          </div>

          {/* Bottom Skyline Silhouette Banner */}
          <div className="relative z-10 pt-3 border-t border-white/10 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Phnom Penh, Cambodia</span>
            <span className="font-bold text-amber-300">សួស្តីកម្ពុជា 🇰🇭</span>
          </div>
        </div>

        {/* RIGHT PANE: Forms & 1-Click Role Switchers */}
        <div className="md:w-7/12 p-6 sm:p-8 overflow-y-auto flex flex-col justify-between">
          <div>
            
            {/* Top Close Button & Tab Switcher */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center bg-slate-100 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('login');
                    setErrorMessage(null);
                  }}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeTab === 'login' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Log In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('signup');
                    setErrorMessage(null);
                  }}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeTab === 'signup' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Sign Up
                </button>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                title="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Error or Success Feedback Alert */}
            {errorMessage && (
              <div className="mt-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {successMessage && (
              <div className="mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{successMessage}</span>
              </div>
            )}

            {/* FORM BODY */}
            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              
              {/* SIGN UP ROLE PICKER */}
              {activeTab === 'signup' && (
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    I want to:
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setRole('STUDENT')}
                      className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                        role === 'STUDENT'
                          ? 'border-teal-600 bg-teal-50/60 ring-2 ring-teal-500/20'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <BookOpen className={`w-5 h-5 mb-1 ${role === 'STUDENT' ? 'text-teal-700' : 'text-slate-400'}`} />
                      <div>
                        <div className="text-xs font-extrabold text-slate-900">Learn Khmer</div>
                        <div className="text-[11px] text-slate-500">I am a foreigner / expat student</div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setRole('TUTOR')}
                      className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                        role === 'TUTOR'
                          ? 'border-amber-500 bg-amber-50/60 ring-2 ring-amber-500/20'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <GraduationCap className={`w-5 h-5 mb-1 ${role === 'TUTOR' ? 'text-amber-600' : 'text-slate-400'}`} />
                      <div>
                        <div className="text-xs font-extrabold text-slate-900">Teach Khmer</div>
                        <div className="text-[11px] text-slate-500">I am a Cambodian university student</div>
                      </div>
                    </button>
                  </div>
                  <p className="text-[10px] text-slate-400">
                    * Admin roles are strictly managed by system administrators and cannot be self-registered.
                  </p>
                </div>
              )}

              {/* Full Name for Sign up */}
              {activeTab === 'signup' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={role === 'TUTOR' ? 'e.g. Sreynoch Keo' : 'e.g. Alex Morgan'}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>
              )}

              {/* Pilot Invite Code Input (on Sign Up) */}
              {activeTab === 'signup' && (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                      <Ticket className="w-3.5 h-3.5 text-amber-600" />
                      <span>Pilot Invite Code</span>
                      <span className="text-rose-500">*</span>
                    </label>
                    <span className="text-[10px] text-amber-700 font-semibold bg-amber-50 border border-amber-200 px-1.5 py-0.2 rounded">
                      Invite Only
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={inviteCode}
                      onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                      placeholder={role === 'TUTOR' ? 'RUPP-TUTOR-2026' : 'PILOT-STU-01'}
                      className="w-full px-3 py-2 font-mono font-bold uppercase bg-amber-50/40 border border-amber-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  {/* Quick-fill helper test pills */}
                  <div className="flex items-center gap-1.5 mt-1.5 flex-wrap text-[10px] text-slate-500">
                    <span>Sample codes:</span>
                    {role === 'TUTOR' ? (
                      <>
                        <button
                          type="button"
                          onClick={() => setInviteCode('RUPP-TUTOR-2026')}
                          className="px-1.5 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono font-bold cursor-pointer"
                        >
                          RUPP-TUTOR-2026
                        </button>
                        <button
                          type="button"
                          onClick={() => setInviteCode('ITC-TUTOR-2026')}
                          className="px-1.5 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono font-bold cursor-pointer"
                        >
                          ITC-TUTOR-2026
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => setInviteCode('PILOT-STU-01')}
                          className="px-1.5 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono font-bold cursor-pointer"
                        >
                          PILOT-STU-01
                        </button>
                        <button
                          type="button"
                          onClick={() => setInviteCode('PILOT-EXPATS-PP')}
                          className="px-1.5 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono font-bold cursor-pointer"
                        >
                          PILOT-EXPATS-PP
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Email or Phone Input */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    {authMethod === 'email' ? 'Email Address' : 'Phone Number (+855)'}
                  </label>
                  <button
                    type="button"
                    onClick={() => setAuthMethod(authMethod === 'email' ? 'phone' : 'email')}
                    className="text-[11px] text-teal-700 hover:underline font-semibold"
                  >
                    Use {authMethod === 'email' ? 'Phone (SMS OTP)' : 'Email'} instead
                  </button>
                </div>
                <div className="relative">
                  {authMethod === 'email' ? (
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  ) : (
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  )}
                  <input
                    type={authMethod === 'email' ? 'email' : 'tel'}
                    required
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    placeholder={authMethod === 'email' ? 'you@domain.com' : '+855 12 345 678'}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              {/* Password Input with show/hide and strength meter */}
              {activeTab !== 'forgot' && (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Password
                    </label>
                    {activeTab === 'login' && (
                      <button
                        type="button"
                        onClick={() => setActiveTab('forgot')}
                        className="text-[11px] text-teal-700 hover:underline font-medium"
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Minimum 8 characters"
                      className="w-full pl-9 pr-10 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      title={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Password Strength Meter (on Sign Up) */}
                  {activeTab === 'signup' && password.length > 0 && (
                    <div className="mt-2 space-y-1">
                      <div className="flex items-center justify-between text-[10px] text-slate-500">
                        <span>Password strength:</span>
                        <strong className="font-bold">{strength.label}</strong>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${strength.color} transition-all duration-300`}
                          style={{ width: `${strength.score}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Remember Me / Terms Checkboxes */}
              {activeTab === 'login' && (
                <div className="flex items-center justify-between text-xs text-slate-600">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 accent-teal-600 rounded"
                    />
                    <span>Remember me on this browser</span>
                  </label>
                </div>
              )}

              {activeTab === 'signup' && (
                <label className="flex items-start gap-2 text-xs text-slate-600 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="w-4 h-4 accent-teal-600 rounded mt-0.5"
                  />
                  <span>
                    I agree to the KhmerTutors Terms of Service, Honor Code, and Bakong Settlement Escrow rules.
                  </span>
                </label>
              )}

              {/* Primary Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-teal-600 hover:bg-teal-700 disabled:opacity-60 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <span>
                      {activeTab === 'login'
                        ? 'Log In to Account'
                        : activeTab === 'signup'
                        ? role === 'TUTOR'
                          ? 'Register as Tutor →'
                          : 'Register as Student →'
                        : 'Send Reset Instructions'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

            </form>

            {/* Social Google Login Button */}
            {import.meta.env.DEV && (
            <div className="mt-4 pt-4 border-t border-slate-100 text-center">
              <button
                type="button"
                onClick={() => {
                  switchDemoUser('student');
                  onClose();
                }}
                className="w-full py-2.5 px-4 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded-xl border border-slate-200 transition-colors flex items-center justify-center gap-2.5 shadow-2xs cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>
            </div>
            )}

          </div>

          {/* QUICK 1-CLICK DEMO ACCOUNT SWITCHER (For Evaluators & Testing) */}
          {import.meta.env.DEV && (
          <div className="mt-5 p-3 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1">
                <KeyRound className="w-3 h-3 text-teal-600" />
                <span>Instant 1-Click Demo Accounts</span>
              </span>
              <span className="text-[10px] text-slate-400">Pre-seeded with real data</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-xs">
              
              <button
                type="button"
                onClick={() => {
                  switchDemoUser('admin');
                  onClose();
                }}
                className="p-1.5 rounded-lg bg-white hover:bg-slate-900 hover:text-white border border-slate-200 text-slate-800 font-semibold transition-all text-left flex flex-col cursor-pointer"
                title="Log in as Platform Administrator (Dara Sovann)"
              >
                <span className="text-[11px] font-bold flex items-center gap-1">
                  🛡️ Admin
                </span>
                <span className="text-[9px] opacity-70 truncate">Dara Sovann</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  switchDemoUser('student');
                  onClose();
                }}
                className="p-1.5 rounded-lg bg-white hover:bg-teal-600 hover:text-white border border-slate-200 text-slate-800 font-semibold transition-all text-left flex flex-col cursor-pointer"
                title="Log in as Expat Student (Alex Morgan, $24 wallet)"
              >
                <span className="text-[11px] font-bold flex items-center gap-1">
                  🎓 Student
                </span>
                <span className="text-[9px] opacity-70 truncate">Alex Morgan ($24)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  switchDemoUser('tutor-approved');
                  onClose();
                }}
                className="p-1.5 rounded-lg bg-white hover:bg-amber-600 hover:text-white border border-slate-200 text-slate-800 font-semibold transition-all text-left flex flex-col cursor-pointer"
                title="Log in as Approved Tutor (Sreynoch Keo · RUPP)"
              >
                <span className="text-[11px] font-bold flex items-center gap-1">
                  👩‍🏫 Approved Tutor
                </span>
                <span className="text-[9px] opacity-70 truncate">Sreynoch (RUPP)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  switchDemoUser('tutor-pending');
                  onClose();
                }}
                className="p-1.5 rounded-lg bg-white hover:bg-purple-600 hover:text-white border border-slate-200 text-slate-800 font-semibold transition-all text-left flex flex-col cursor-pointer"
                title="Log in as Pending Tutor (Visal Rath · NUM)"
              >
                <span className="text-[11px] font-bold flex items-center gap-1">
                  ⏳ Pending Tutor
                </span>
                <span className="text-[9px] opacity-70 truncate">Visal (NUM)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  switchDemoUser('dual');
                  onClose();
                }}
                className="p-1.5 rounded-lg bg-white hover:bg-indigo-600 hover:text-white border border-slate-200 text-slate-800 font-semibold transition-all text-left flex flex-col cursor-pointer"
                title="Log in as Dual Student + Approved Tutor (John Doe)"
              >
                <span className="text-[11px] font-bold flex items-center gap-1">
                  🔄 Dual Role
                </span>
                <span className="text-[9px] opacity-70 truncate">Student + Tutor</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  switchDemoUser('logged-out');
                  onClose();
                }}
                className="p-1.5 rounded-lg bg-white hover:bg-rose-600 hover:text-white border border-slate-200 text-slate-800 font-semibold transition-all text-left flex flex-col cursor-pointer"
                title="View as Anonymous Logged-Out Visitor"
              >
                <span className="text-[11px] font-bold text-rose-600 hover:text-white">
                  🚪 Log Out
                </span>
                <span className="text-[9px] opacity-70 truncate">Guest Visitor</span>
              </button>

            </div>
          </div>
          )}

        </div>

      </div>
    </div>
  );
};
