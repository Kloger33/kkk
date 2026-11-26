import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

export type UserRole = 'STUDENT' | 'TUTOR' | 'ADMIN';

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  phone?: string;
  roles: UserRole[];
  status: 'active' | 'suspended' | 'banned';
  email_verified: boolean;
  avatar?: string;
  tutorProfile?: {
    university: string;
    major: string;
    year: string;
    bio: string;
    focus_tags: string;
    trial_price: number;
    hourly_price: number;
    approval_status: 'pending' | 'approved' | 'rejected';
    rating: number;
    reviews_count: number;
    is_super_tutor: number;
    lessons_taught: number;
    payout_account: string;
  };
  studentProfile?: {
    goal: string;
    level: string;
    wallet_balance: number;
    streak_days: number;
    total_hours_learned: number;
  };
}

export type ToastVariant = 'default' | 'saved' | 'removed';

export interface ToastOptions {
  variant?: ToastVariant;
  actionLabel?: string;
  onAction?: () => void;
  durationMs?: number;
}

export interface ToastPayload {
  id: number;
  message: string;
  variant: ToastVariant;
  actionLabel?: string;
  onAction?: () => void;
}

interface AuthContextType {
  user: UserProfile | null;
  token: string | null;
  isAuthenticated: boolean;
  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
  login: (emailOrPhone: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string, role: UserRole, phone?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  switchDemoUser: (userType: 'admin' | 'tutor-approved' | 'tutor-pending' | 'student' | 'dual' | 'logged-out') => void;
  updateWalletBalance: (delta: number) => void;
  updateTutorApproval: (userId: number, status: 'approved' | 'rejected') => void;
  toast: string | null;
  toastDetail: ToastPayload | null;
  showToast: (msg: string, options?: ToastOptions) => void;
  dismissToast: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Initial default user for seamless experience (Alex Morgan - Student)
const SEED_USERS: Record<string, UserProfile> = {
  admin: {
    id: 1,
    name: 'Dara Sovann (Admin)',
    email: 'admin@khmertutors.com',
    phone: '+855 12 888 001',
    roles: ['ADMIN'],
    status: 'active',
    email_verified: true,
  },
  'tutor-approved': {
    id: 2,
    name: 'Sreynoch Keo',
    email: 'sreynoch@khmertutors.com',
    phone: '+855 98 456 789',
    roles: ['TUTOR'],
    status: 'active',
    email_verified: true,
    tutorProfile: {
      university: 'Royal University of Phnom Penh (RUPP)',
      major: 'Khmer Linguistics & Foreign Language Pedagogy',
      year: 'Year 3 (Honor Student)',
      bio: 'Passionate university tutor specializing in daily conversational Khmer for foreign expats.',
      focus_tags: JSON.stringify(['Conversational', 'Travel Khmer']),
      trial_price: 3.0,
      hourly_price: 8.0,
      approval_status: 'approved',
      rating: 5.0,
      reviews_count: 48,
      is_super_tutor: 1,
      lessons_taught: 142,
      payout_account: 'ABA Bank: 001 556 990',
    },
  },
  'tutor-pending': {
    id: 4,
    name: 'Visal Rath',
    email: 'visal.pending@khmertutors.com',
    phone: '+855 85 999 333',
    roles: ['TUTOR'],
    status: 'active',
    email_verified: true,
    tutorProfile: {
      university: 'National University of Management (NUM)',
      major: 'Business Management & Hospitality',
      year: 'Year 2',
      bio: 'Certified student ID uploaded. Eager to start teaching beginner tourists and expats conversational Khmer.',
      focus_tags: JSON.stringify(['Conversational', 'Travel Khmer']),
      trial_price: 3.5,
      hourly_price: 8.5,
      approval_status: 'pending',
      rating: 0.0,
      reviews_count: 0,
      is_super_tutor: 0,
      lessons_taught: 0,
      payout_account: 'Wing Money: 085 999 333',
    },
  },
  student: {
    id: 5,
    name: 'Alex Morgan',
    email: 'alex@expatphnompenh.com',
    phone: '+855 10 234 567',
    roles: ['STUDENT'],
    status: 'active',
    email_verified: true,
    studentProfile: {
      goal: 'Career & Business',
      level: 'Intermediate (B1)',
      wallet_balance: 24.0,
      streak_days: 7,
      total_hours_learned: 18.0,
    },
  },
  dual: {
    id: 7,
    name: 'John Doe',
    email: 'john.dual@khmertutors.com',
    phone: '+855 16 888 777',
    roles: ['STUDENT', 'TUTOR'],
    status: 'active',
    email_verified: true,
    studentProfile: {
      goal: 'Conversational Khmer',
      level: 'Elementary (A2)',
      wallet_balance: 35.0,
      streak_days: 4,
      total_hours_learned: 12.0,
    },
    tutorProfile: {
      university: 'Paññāsāstra University of Cambodia (PUC)',
      major: 'International Relations & Khmer History',
      year: 'Year 3',
      bio: 'Teaching conversational Khmer with a cultural emphasis on Angkorian history and modern living.',
      focus_tags: JSON.stringify(['Conversational', 'Travel Khmer']),
      trial_price: 3.0,
      hourly_price: 7.5,
      approval_status: 'approved',
      rating: 4.8,
      reviews_count: 19,
      is_super_tutor: 0,
      lessons_taught: 45,
      payout_account: 'ABA Bank: 003 445 110',
    },
  },
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    // Start logged out unless a saved session exists; the session is re-checked with the server below.
    const saved = localStorage.getItem('kto_auth_user');
    const savedToken = localStorage.getItem('kto_auth_token');
    if (saved && savedToken) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null;
  });

  const [token, setToken] = useState<string | null>(() => localStorage.getItem('kto_auth_token'));
  const [activeRole, setActiveRole] = useState<UserRole>(() => {
    return user ? user.roles[0] : 'STUDENT';
  });

  const [toastDetail, setToastDetail] = useState<ToastPayload | null>(null);
  const toastTimerRef = useRef<number | null>(null);

  const dismissToast = () => {
    if (toastTimerRef.current !== null) {
      window.clearTimeout(toastTimerRef.current);
      toastTimerRef.current = null;
    }
    setToastDetail(null);
  };

  const showToast = (msg: string, options?: ToastOptions) => {
    if (toastTimerRef.current !== null) {
      window.clearTimeout(toastTimerRef.current);
    }
    const id = Date.now() + Math.random();
    setToastDetail({
      id,
      message: msg,
      variant: options?.variant || 'default',
      actionLabel: options?.actionLabel,
      onAction: options?.onAction,
    });
    const duration = options?.durationMs ?? 3000;
    toastTimerRef.current = window.setTimeout(() => {
      setToastDetail(null);
      toastTimerRef.current = null;
    }, duration);
  };

  useEffect(() => {
    return () => {
      if (toastTimerRef.current !== null) {
        window.clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('kto_auth_user', JSON.stringify(user));
      if (!user.roles.includes(activeRole)) {
        setActiveRole(user.roles[0]);
      }
    } else {
      localStorage.removeItem('kto_auth_user');
      localStorage.removeItem('kto_auth_token');
    }
  }, [user]);

  // Clear every trace of the session in this browser.
  const clearSession = () => {
    setUser(null);
    setToken(null);
    setActiveRole('STUDENT');
    localStorage.removeItem('kto_auth_user');
    localStorage.removeItem('kto_auth_token');
    localStorage.removeItem('kto_jwt_token');
  };

  // On page load, confirm the saved token with the server. Expired or forged tokens log the user out.
  useEffect(() => {
    const savedToken = localStorage.getItem('kto_auth_token');
    if (!savedToken) {
      if (user) clearSession();
      return;
    }
    if (import.meta.env.DEV && savedToken.startsWith('demo-token-')) return;

    let cancelled = false;
    fetch('/api/auth/me', { headers: { Authorization: `Bearer ${savedToken}` } })
      .then(async (res) => {
        if (cancelled) return;
        if (res.status === 401 || res.status === 403 || res.status === 404) {
          clearSession();
          return;
        }
        const data = await res.json().catch(() => null);
        if (data?.success && data.user) setUser(data.user);
      })
      .catch(() => {
        /* Network error: keep the cached session; protected calls will still be checked by the server. */
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Any API call that comes back 401 (see src/services/api.ts) logs the user out.
  useEffect(() => {
    const onUnauthorized = () => {
      clearSession();
      showToast('Your session has ended. Please log in again.');
    };
    window.addEventListener('kto:unauthorized', onUnauthorized);
    return () => window.removeEventListener('kto:unauthorized', onUnauthorized);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async (emailOrPhone: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailOrPhone, password }),
      });
      const data = await res.json();

      if (data.success && data.user) {
        setUser(data.user);
        setToken(data.token);
        setActiveRole(data.user.roles[0]);
        localStorage.setItem('kto_auth_token', data.token);
        showToast(`Welcome back, ${data.user.name}!`);
        return { success: true };
      }

      return { success: false, error: data.error || 'Invalid email or password.' };
    } catch {
      // Offline demo fallback is for local development only: it skips the password check.
      if (!import.meta.env.DEV) {
        return { success: false, error: 'Cannot reach the server. Please check your connection and try again.' };
      }
      const matched = Object.values(SEED_USERS).find(
        (u) => u.email.toLowerCase() === emailOrPhone.toLowerCase() || u.phone === emailOrPhone
      );
      if (matched) {
        setUser(matched);
        setToken('demo-token-' + matched.id);
        setActiveRole(matched.roles[0]);
        showToast(`Logged in as ${matched.name}`);
        return { success: true };
      }
      return { success: false, error: 'User account not found.' };
    }
  };

  const register = async (
    name: string, 
    email: string, 
    password: string, 
    role: UserRole, 
    phone?: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role, phone }),
      });
      const data = await res.json();

      if (data.success && data.user) {
        setUser(data.user);
        setToken(data.token);
        setActiveRole(role);
        localStorage.setItem('kto_auth_token', data.token);
        showToast(`Account created! Welcome to KhmerTutors Online.`);
        return { success: true };
      }

      return { success: false, error: data.error || 'Registration failed.' };
    } catch {
      if (!import.meta.env.DEV) {
        return { success: false, error: 'Cannot reach the server. Please check your connection and try again.' };
      }
      const newUser: UserProfile = {
        id: Date.now(),
        name,
        email,
        phone,
        roles: [role],
        status: 'active',
        email_verified: true,
        studentProfile: role === 'STUDENT' ? {
          goal: 'Conversational Khmer',
          level: 'Beginner (A1)',
          wallet_balance: 10.0,
          streak_days: 1,
          total_hours_learned: 0,
        } : undefined,
        tutorProfile: role === 'TUTOR' ? {
          university: 'Royal University of Phnom Penh (RUPP)',
          major: 'General Studies',
          year: 'Year 1',
          bio: 'Welcome to my Khmer tutoring profile.',
          focus_tags: JSON.stringify(['Conversational']),
          trial_price: 3.0,
          hourly_price: 8.0,
          approval_status: 'pending',
          rating: 5.0,
          reviews_count: 0,
          is_super_tutor: 0,
          lessons_taught: 0,
          payout_account: 'ABA Bank: Pending',
        } : undefined,
      };

      setUser(newUser);
      setActiveRole(role);
      showToast(`Account created as ${role}!`);
      return { success: true };
    }
  };

  const logout = () => {
    clearSession();
    showToast('You have been logged out.');
  };

  const switchDemoUser = (userType: 'admin' | 'tutor-approved' | 'tutor-pending' | 'student' | 'dual' | 'logged-out') => {
    if (userType === 'logged-out') {
      logout();
      return;
    }
    // Demo accounts bypass the server: never allow them in production builds.
    if (!import.meta.env.DEV) return;
    const target = SEED_USERS[userType];
    if (target) {
      setUser(target);
      setToken('demo-token-' + target.id);
      setActiveRole(target.roles[0]);
      showToast(`Switched to demo user: ${target.name} [${target.roles.join(', ')}]`);
    }
  };

  const updateWalletBalance = (delta: number) => {
    if (!user || !user.studentProfile) return;
    const newBal = +(user.studentProfile.wallet_balance + delta).toFixed(2);
    setUser({
      ...user,
      studentProfile: {
        ...user.studentProfile,
        wallet_balance: newBal,
      },
    });
  };

  const updateTutorApproval = (userId: number, status: 'approved' | 'rejected') => {
    if (user && user.id === userId && user.tutorProfile) {
      setUser({
        ...user,
        tutorProfile: {
          ...user.tutorProfile,
          approval_status: status,
        },
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        activeRole,
        setActiveRole,
        login,
        register,
        logout,
        switchDemoUser,
        updateWalletBalance,
        updateTutorApproval,
        toast: toastDetail?.message ?? null,
        toastDetail,
        showToast,
        dismissToast,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
