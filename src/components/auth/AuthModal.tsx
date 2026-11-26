import React, { useEffect, useState } from 'react';
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
  /** Why the dialog opened, worded for each tab. */
  contextMessage?: { signup: string; login: string } | null;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'login',
  contextMessage = null,
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
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [authMethod, setAuthMethod] = useState<'email' | 'phone'>('email');
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [inviteCode, setInviteCode] = useState(() => {
    try {
      const codeParam = new URLSearchParams(window.location.search).get('code');
      // Invite links carry ?code=...; the sample code is only pre-filled in development.
      return codeParam || (import.meta.env.DEV ? 'PILOT-STU-01' : '');
    } catch {
      return '';
    }
  });

  // Status & error handling
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      setErrorMessage(null);
      setSuccessMessage(null);
    }
  }, [isOpen, initialTab]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

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
        // Email delivery is not built yet: say so instead of pretending a link was sent.
        setSuccessMessage(
          'Password reset by email is not available yet during the pilot. Please email support@khmertutors.com from the address you signed up with, and we will reset it for you.'
        );
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

      <div
        role="dialog"
        aria-modal="true"
        aria-label={activeTab === 'signup' ? 'Create your account' : 'Log in'}
        className="relative w-full max-w-4xl bg-white rounded-[14px] shadow-2xl border border-slate-200 overflow-hidden z-10 flex flex-col md:flex-row max-h-[94vh]"
      >
        
        {/* LEFT PANE: the same voice as the home page — a Khmer word, then plain facts */}
        <div className="hidden md:flex md:w-5/12 bg-[#172033] text-white flex-col shrink-0">
          <div className="krama-band" aria-hidden="true" />
          <div className="flex-1 flex flex-col p-8">
            <div className="flex items-center gap-2.5">
              <img src="/assets/logo_kto_new.png" alt="" className="h-9 w-10 object-contain brightness-0 invert" />
              <span className="font-semibold text-lg">KhmerTutors Online</span>
            </div>

            <p lang="km" className="font-moul text-[48px] leading-[1.5] mt-10">
              សួស្តី
            </p>
            <p className="text-[15px] text-[#C9D1E3]">
              {activeTab === 'signup' ? 'Suosdei. Welcome.' : 'Suosdei. Welcome back.'}
            </p>

            <dl className="mt-auto pt-10 space-y-4 text-[15px] leading-snug">
              <div>
                <dt className="font-semibold text-white">Checked tutors</dt>
                <dd className="text-[#C9D1E3] mt-0.5">Cambodian university students. We check each student ID first.</dd>
              </div>
              <div>
                <dt className="font-semibold text-white">Short trials</dt>
                <dd className="text-[#C9D1E3] mt-0.5">30 minutes, from $3.</dd>
              </div>
              <div>
                <dt className="font-semibold text-white">Pilot version</dt>
                <dd className="text-[#C9D1E3] mt-0.5">Payments are simulated. Nothing is charged.</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* RIGHT PANE: Forms & 1-Click Role Switchers */}
        <div className="md:w-7/12 p-6 sm:p-10 overflow-y-auto flex flex-col">
          <div className="my-auto">
            
            {/* Heading: says exactly where you are; the switch link sits under the form */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-[#172033]">
                  {activeTab === 'signup'
                    ? 'Create your account'
                    : activeTab === 'forgot'
                    ? 'Reset your password'
                    : 'Log in to your account'}
                </h2>
                <p className="mt-1 text-[15px] text-[#545B70]">
                  {activeTab === 'signup'
                    ? 'It takes about a minute. You need the invite code from your invitation.'
                    : activeTab === 'forgot'
                    ? 'Enter the email address you signed up with.'
                    : 'Welcome back. Use the email and password you signed up with.'}
                </p>
              </div>
              <button
                onClick={onClose}
                className="-mr-2 -mt-1 w-10 h-10 shrink-0 rounded-[10px] flex items-center justify-center text-[#545B70] hover:text-[#172033] hover:bg-[#EEF2F7] transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {contextMessage && (activeTab === 'signup' || activeTab === 'login') && (
              <p className="mt-5 px-4 py-3 rounded-[10px] bg-[#EEF2F7] text-[15px] text-[#172033]">
                {activeTab === 'signup' ? contextMessage.signup : contextMessage.login}
              </p>
            )}

            {/* Error or Success Feedback Alert */}
            {errorMessage && (
              <div className="mt-4 p-3 rounded-[10px] bg-rose-50 border border-rose-200 text-sm text-rose-800 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {successMessage && (
              <div className="mt-4 p-3 rounded-[10px] bg-emerald-50 border border-emerald-200 text-sm text-emerald-800 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{successMessage}</span>
              </div>
            )}

            {/* FORM BODY */}
            <form onSubmit={handleSubmit} className="mt-6 space-y-5" noValidate={false}>
              
              {/* SIGN UP ROLE PICKER */}
              {activeTab === 'signup' && (
                <fieldset>
                  <legend className="block text-sm font-semibold text-[#172033] mb-1.5">I want to</legend>
                  <div className="grid grid-cols-2 gap-3" role="radiogroup">
                    {([
                      { value: 'STUDENT', title: 'Learn Khmer', hint: 'I want lessons' },
                      { value: 'TUTOR', title: 'Teach Khmer', hint: 'I study at a Cambodian university' },
                    ] as const).map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        role="radio"
                        aria-checked={role === opt.value}
                        onClick={() => setRole(opt.value)}
                        className={`px-4 py-3 rounded-[10px] border text-left transition-colors cursor-pointer ${
                          role === opt.value
                            ? 'border-[#2445C8] bg-[#2445C8]/5 shadow-[inset_0_0_0_1px_#2445C8]'
                            : 'border-[#C7D0E0] hover:border-[#9AABD6]'
                        }`}
                      >
                        <span className="block text-[15px] font-semibold text-[#172033]">{opt.title}</span>
                        <span className="block text-[13px] text-[#545B70] mt-0.5">{opt.hint}</span>
                      </button>
                    ))}
                  </div>
                </fieldset>
              )}

              {/* Full Name for Sign up */}
              {activeTab === 'signup' && (
                <div>
                  <label className="block text-sm font-semibold text-[#172033] mb-1.5">
                    Full name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      autoComplete="name"
                      placeholder={role === 'TUTOR' ? 'e.g. Sreynoch Keo' : 'e.g. Alex Morgan'}
                      className="w-full h-12 px-3.5 bg-white border border-[#C7D0E0] rounded-[10px] text-base sm:text-[15px] text-[#172033] placeholder:text-[#8A91A5] focus:outline-hidden focus:border-[#2445C8] focus:ring-2 focus:ring-[#2445C8]/25"
                    />
                  </div>
                </div>
              )}

              {/* Pilot Invite Code Input (on Sign Up) */}
              {activeTab === 'signup' && (
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-sm font-semibold text-[#172033]">Invite code</label>
                    <span className="text-[13px] text-[#545B70]">From your invitation</span>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={inviteCode}
                      onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                      placeholder="e.g. KTO-1234"
                      className="w-full h-12 px-3.5 bg-white border border-[#C7D0E0] rounded-[10px] text-base sm:text-[15px] text-[#172033] placeholder:text-[#8A91A5] focus:outline-hidden focus:border-[#2445C8] focus:ring-2 focus:ring-[#2445C8]/25 uppercase tracking-wide placeholder:normal-case placeholder:tracking-normal"
                    />
                  </div>
                  {/* Quick-fill helper test pills (development only: real invite codes arrive by link) */}
                  {import.meta.env.DEV && (
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
                  )}
                </div>
              )}

              {/* Email or Phone Input */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-sm font-semibold text-[#172033]">
                    {authMethod === 'email' ? 'Email address' : 'Phone Number (+855)'}
                  </label>
                  {/* Phone/SMS login is not implemented on the server yet, so the switch stays hidden. */}
                  <button
                    type="button"
                    hidden
                    onClick={() => setAuthMethod(authMethod === 'email' ? 'phone' : 'email')}
                    className="text-[11px] text-[#2445C8] hover:underline font-semibold"
                  >
                    Use {authMethod === 'email' ? 'Phone (SMS OTP)' : 'Email'} instead
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={authMethod === 'email' ? 'email' : 'tel'}
                    required
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    autoComplete="email"
                    placeholder={authMethod === 'email' ? 'name@example.com' : '+855 12 345 678'}
                    className="w-full h-12 px-3.5 bg-white border border-[#C7D0E0] rounded-[10px] text-base sm:text-[15px] text-[#172033] placeholder:text-[#8A91A5] focus:outline-hidden focus:border-[#2445C8] focus:ring-2 focus:ring-[#2445C8]/25"
                  />
                </div>
              </div>

              {/* Password Input with show/hide and strength meter */}
              {activeTab !== 'forgot' && (
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-sm font-semibold text-[#172033]">
                      Password
                    </label>
                    {activeTab === 'login' && (
                      <button
                        type="button"
                        onClick={() => setActiveTab('forgot')}
                        className="text-sm text-[#2445C8] hover:underline font-medium"
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete={activeTab === 'signup' ? 'new-password' : 'current-password'}
                      placeholder={activeTab === 'signup' ? 'At least 8 characters' : ''}
                      className="w-full h-12 px-3.5 bg-white border border-[#C7D0E0] rounded-[10px] text-base sm:text-[15px] text-[#172033] placeholder:text-[#8A91A5] focus:outline-hidden focus:border-[#2445C8] focus:ring-2 focus:ring-[#2445C8]/25 pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-[8px] flex items-center justify-center text-[#545B70] hover:text-[#172033] hover:bg-[#EEF2F7]"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Password Strength Meter (on Sign Up) */}
                  {activeTab === 'signup' && password.length > 0 && (
                    <div className="mt-2 space-y-1">
                      <div className="flex items-center justify-between text-[13px] text-[#545B70]">
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
                <div className="flex items-center justify-between text-sm text-[#172033]">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 accent-[#2445C8] rounded"
                    />
                    <span>Keep me logged in on this device</span>
                  </label>
                </div>
              )}

              {activeTab === 'signup' && (
                <label className="flex items-start gap-2.5 text-sm text-[#172033] cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="w-4 h-4 accent-[#2445C8] rounded mt-0.5"
                  />
                  <span>
                    I agree to the Terms of Service and the pilot privacy notice.
                  </span>
                </label>
              )}

              {/* Primary Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-[#2445C8] hover:bg-[#1c37a4] disabled:opacity-60 text-white font-semibold text-base rounded-[10px] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <span>
                      {activeTab === 'login'
                        ? 'Log in'
                        : activeTab === 'signup'
                        ? role === 'TUTOR'
                          ? 'Create tutor account'
                          : 'Create account'
                        : 'Get help resetting it'}
                    </span>
                  </>
                )}
              </button>

            </form>

            <p className="mt-6 text-[15px] text-[#545B70] text-center">
              {activeTab === 'signup' ? (
                <>
                  Already have an account?{' '}
                  <button type="button" onClick={() => { setActiveTab('login'); setErrorMessage(null); }} className="font-semibold text-[#2445C8] hover:underline cursor-pointer">
                    Log in
                  </button>
                </>
              ) : activeTab === 'forgot' ? (
                <button type="button" onClick={() => { setActiveTab('login'); setSuccessMessage(null); }} className="font-semibold text-[#2445C8] hover:underline cursor-pointer">
                  Back to log in
                </button>
              ) : (
                <>
                  Don't have an account?{' '}
                  <button type="button" onClick={() => { setActiveTab('signup'); setErrorMessage(null); }} className="font-semibold text-[#2445C8] hover:underline cursor-pointer">
                    Sign up
                  </button>
                </>
              )}
            </p>

            {/* Social Google Login Button */}
            {import.meta.env.DEV && (
            <div className="mt-4 pt-4 border-t border-slate-100 text-center">
              <button
                type="button"
                onClick={() => {
                  switchDemoUser('student');
                  onClose();
                }}
                className="w-full py-2.5 px-4 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded-[10px] border border-slate-200 transition-colors flex items-center justify-center gap-2.5 shadow-2xs cursor-pointer"
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
              <span className="text-[11px] font-bold text-slate-600 flex items-center gap-1">
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
