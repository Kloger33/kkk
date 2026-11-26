import { Router, Response } from 'express';
import { 
  userRepo, 
  tutorRepo, 
  studentRepo, 
  bookingRepo, 
  auditRepo,
  UserRole,
  db
} from './database.js';
import { 
  hashPassword, 
  comparePassword, 
  generateToken, 
  authMiddleware, 
  requireRoles,
  AuthRequest 
} from './auth.js';

export const apiRouter = Router();

// ==========================================
// 1. HEALTH & METRICS
// ==========================================
apiRouter.get('/health', (_req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    database: 'SQLite (Connected & WAL active)',
    engine: 'Express TypeScript Live Server with RBAC',
    userCount: userRepo.count(),
  });
});

// ==========================================
// 2. AUTHENTICATION (Register, Login, Me, Reset)
// ==========================================

/**
 * POST /api/auth/register
 * Only 'STUDENT' or 'TUTOR' roles can be chosen by users.
 * Admin accounts CANNOT be created from sign up.
 */
apiRouter.post('/auth/register', async (req, res): Promise<void> => {
  try {
    const { name, email, password, role = 'STUDENT', phone } = req.body;

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      res.status(400).json({ success: false, error: 'Please provide a valid full name.' });
      return;
    }

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      res.status(400).json({ success: false, error: 'Please provide a valid email address.' });
      return;
    }

    if (!password || typeof password !== 'string' || password.length < 8) {
      res.status(400).json({ success: false, error: 'Password must be at least 8 characters long.' });
      return;
    }

    // Prohibit Admin creation from registration
    const chosenRole: UserRole = role === 'TUTOR' ? 'TUTOR' : 'STUDENT';

    const existingUser = userRepo.findByEmail(email);
    if (existingUser) {
      res.status(409).json({ success: false, error: 'An account with this email address already exists.' });
      return;
    }

    const passwordHash = await hashPassword(password);
    const newUser = userRepo.create(name, email, passwordHash, chosenRole, phone);

    const roles: UserRole[] = JSON.parse(newUser.roles);
    const token = generateToken({
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      roles,
    });

    auditRepo.log(newUser.id, newUser.name, 'USER_REGISTER', `Registered new account with role [${chosenRole}].`);

    res.status(201).json({
      success: true,
      message: 'Account created successfully.',
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        roles,
        status: newUser.status,
        email_verified: Boolean(newUser.email_verified),
        tutorProfile: chosenRole === 'TUTOR' ? tutorRepo.getByUserId(newUser.id) : undefined,
        studentProfile: chosenRole === 'STUDENT' ? studentRepo.getByUserId(newUser.id) : undefined,
      },
    });
  } catch (err: any) {
    console.error('[API Register Error]:', err);
    res.status(500).json({ success: false, error: 'Internal database error during registration.' });
  }
});

/**
 * POST /api/auth/login
 * Validates email/phone and password, returns JWT token with role information
 */
apiRouter.post('/auth/login', async (req, res): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ success: false, error: 'Email and password are required.' });
      return;
    }

    const user = userRepo.findByEmail(email);
    if (!user) {
      res.status(401).json({ success: false, error: 'Invalid email or password.' });
      return;
    }

    if (user.status === 'banned') {
      res.status(403).json({ success: false, error: 'This account has been banned. Please contact support.' });
      return;
    }

    const isMatch = await comparePassword(password, user.password_hash);
    if (!isMatch) {
      res.status(401).json({ success: false, error: 'Invalid email or password.' });
      return;
    }

    const roles: UserRole[] = JSON.parse(user.roles);
    const token = generateToken({
      id: user.id,
      email: user.email,
      name: user.name,
      roles,
    });

    auditRepo.log(user.id, user.name, 'USER_LOGIN', `Logged in from IP/session.`);

    res.json({
      success: true,
      message: 'Login successful.',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        roles,
        status: user.status,
        email_verified: Boolean(user.email_verified),
        tutorProfile: roles.includes('TUTOR') ? tutorRepo.getByUserId(user.id) : undefined,
        studentProfile: roles.includes('STUDENT') ? studentRepo.getByUserId(user.id) : undefined,
      },
    });
  } catch (err: any) {
    console.error('[API Login Error]:', err);
    res.status(500).json({ success: false, error: 'Internal database error during login.' });
  }
});

/**
 * GET /api/auth/me
 * Retrieves current authenticated user profile and roles
 */
apiRouter.get('/auth/me', authMiddleware, (req: AuthRequest, res): void => {
  const user = userRepo.findById(req.user!.id);
  if (!user) {
    res.status(404).json({ success: false, error: 'User not found.' });
    return;
  }

  const roles: UserRole[] = JSON.parse(user.roles);
  res.json({
    success: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      roles,
      status: user.status,
      email_verified: Boolean(user.email_verified),
      tutorProfile: roles.includes('TUTOR') ? tutorRepo.getByUserId(user.id) : undefined,
      studentProfile: roles.includes('STUDENT') ? studentRepo.getByUserId(user.id) : undefined,
    },
  });
});

/**
 * POST /api/auth/forgot-password
 */
apiRouter.post('/auth/forgot-password', (req, res) => {
  const { email } = req.body;
  res.json({
    success: true,
    message: `Password reset link sent to ${email}. Please check your inbox.`,
    demoToken: 'DEMO-RESET-98214',
  });
});

// ==========================================
// 3. STUDENT ENDPOINTS
// ==========================================

apiRouter.get('/student/dashboard', authMiddleware, requireRoles(['STUDENT', 'ADMIN']), (req: AuthRequest, res) => {
  const userId = req.user!.id;
  const student = studentRepo.getByUserId(userId);
  const bookings = bookingRepo.getByStudentId(userId);

  res.json({
    success: true,
    student,
    bookings,
    modulesProgress: [
      { moduleNumber: '1', title: 'Street Food & Coffee Ordering', progressPercent: 100 },
      { moduleNumber: '2', title: 'PassApp & Tuk-Tuk Directions', progressPercent: 85 },
      { moduleNumber: '3', title: 'Market Bargaining & Numbers', progressPercent: 50 },
      { moduleNumber: '4', title: 'Emergency & Pharmacy Phrases', progressPercent: 20 },
      { moduleNumber: '5', title: 'Social Courtesies & Small Talk', progressPercent: 0 },
      { moduleNumber: '6', title: 'Basic Phonetic Script Reading', progressPercent: 0 },
    ],
  });
});

apiRouter.post('/student/wallet/topup', authMiddleware, requireRoles(['STUDENT', 'ADMIN']), (req: AuthRequest, res) => {
  const { amount = 20.0, paymentMethod = 'ABA PayWay KHQR' } = req.body;
  const userId = req.user!.id;

  const newBalance = studentRepo.updateWallet(userId, Number(amount));

  db.prepare(`
    INSERT INTO wallet_transactions (user_id, type, amount, payment_method, status, reference)
    VALUES (?, 'top_up', ?, ?, 'completed', ?)
  `).run(userId, Number(amount), paymentMethod, `TXN-TOP-${Date.now()}`);

  auditRepo.log(userId, req.user!.name, 'WALLET_TOPUP', `Topped up $${amount} via ${paymentMethod}. New balance: $${newBalance}`);

  res.json({
    success: true,
    message: `Successfully topped up $${amount}.00 via ${paymentMethod}!`,
    balance: newBalance,
  });
});

apiRouter.post('/student/book-lesson', authMiddleware, requireRoles(['STUDENT', 'ADMIN']), (req: AuthRequest, res) => {
  const { tutorId, lessonType, date, timeSlot, price } = req.body;
  const studentId = req.user!.id;

  const tutor = tutorRepo.getByUserId(tutorId);
  const tutorUser = userRepo.findById(tutorId);

  const booking = bookingRepo.create({
    student_id: studentId,
    tutor_id: tutorId,
    student_name: req.user!.name,
    tutor_name: tutorUser ? tutorUser.name : 'Khmer Tutor',
    lesson_type: lessonType || 'Trial Lesson (30 min)',
    date,
    time_slot: timeSlot,
    price: Number(price) || 3.0,
    status: 'confirmed',
    meeting_link: 'https://meet.khmertutors.com/class-' + Math.floor(1000 + Math.random() * 9000),
  });

  // Deduct from wallet
  studentRepo.updateWallet(studentId, -Number(price));

  db.prepare(`
    INSERT INTO wallet_transactions (user_id, type, amount, payment_method, status, reference)
    VALUES (?, 'lesson_payment', ?, 'Wallet Balance', 'completed', ?)
  `).run(studentId, -Number(price), `TXN-BOOK-${booking.id}`);

  auditRepo.log(studentId, req.user!.name, 'BOOK_LESSON', `Booked ${lessonType} with ${booking.tutor_name} for $${price}.`);

  res.json({
    success: true,
    message: 'Lesson booked successfully!',
    booking,
  });
});

// ==========================================
// 4. TUTOR ENDPOINTS
// ==========================================

apiRouter.get('/tutor/dashboard', authMiddleware, requireRoles(['TUTOR', 'ADMIN']), (req: AuthRequest, res) => {
  const userId = req.user!.id;
  const tutorProfile = tutorRepo.getByUserId(userId);
  const bookings = bookingRepo.getByTutorId(userId);

  res.json({
    success: true,
    tutorProfile,
    bookings,
    earningsThisMonth: 348.0,
    pendingPayout: 120.0,
    superTutorLessonsNeeded: 4,
    profileCompleteness: 95,
  });
});

apiRouter.post('/tutor/onboarding', authMiddleware, requireRoles(['TUTOR', 'ADMIN']), (req: AuthRequest, res) => {
  const userId = req.user!.id;
  const { university, major, year, bio, focusTags, trialPrice, hourlyPrice, payoutAccount } = req.body;

  tutorRepo.updateProfile(userId, {
    university: university || 'Royal University of Phnom Penh (RUPP)',
    major: major || 'Khmer Linguistics',
    year: year || 'Year 3',
    bio: bio || 'Friendly undergraduate tutor ready to teach conversational Khmer.',
    focus_tags: JSON.stringify(focusTags || ['Conversational']),
    trial_price: Number(trialPrice) || 3.0,
    hourly_price: Number(hourlyPrice) || 8.0,
    payout_account: payoutAccount || 'ABA Bank: 001 234 567',
    approval_status: 'pending',
  });

  auditRepo.log(userId, req.user!.name, 'TUTOR_ONBOARDING_SUBMIT', 'Submitted tutor application for admin review.');

  res.json({
    success: true,
    message: 'Tutor profile submitted for review! An administrator will evaluate your credentials.',
    profile: tutorRepo.getByUserId(userId),
  });
});

apiRouter.post('/tutor/request-payout', authMiddleware, requireRoles(['TUTOR', 'ADMIN']), (req: AuthRequest, res) => {
  const userId = req.user!.id;
  const { amount = 100.0, method = 'ABA' } = req.body;

  const tutor = tutorRepo.getByUserId(userId);

  db.prepare(`
    INSERT INTO payout_requests (tutor_id, tutor_name, amount, method, account_info, status)
    VALUES (?, ?, ?, ?, ?, 'pending')
  `).run(userId, req.user!.name, Number(amount), method, tutor ? tutor.payout_account : 'ABA 001 234 567');

  auditRepo.log(userId, req.user!.name, 'PAYOUT_REQUEST', `Requested payout of $${amount} via ${method}.`);

  res.json({
    success: true,
    message: `Payout request of $${amount}.00 submitted to Admin queue.`,
  });
});

// ==========================================
// 5. ADMIN ENDPOINTS (Protected: Admin Only)
// ==========================================

apiRouter.get('/admin/stats', authMiddleware, requireRoles(['ADMIN']), (_req, res) => {
  const totalUsers = userRepo.count();
  const tutors = tutorRepo.getAllWithUser();
  const pendingTutors = tutorRepo.getPending();
  const allBookings = bookingRepo.getAll();

  res.json({
    success: true,
    stats: {
      totalStudents: totalUsers - tutors.length,
      totalTutors: tutors.length,
      pendingApprovals: pendingTutors.length,
      lessonsToday: 18,
      revenueThisMonth: 4280.0,
      platformCommission: 642.0, // 15%
      activeDisputes: 1,
    },
    recentAuditLogs: auditRepo.getAll(15),
  });
});

apiRouter.get('/admin/users', authMiddleware, requireRoles(['ADMIN']), (_req, res) => {
  const users = userRepo.getAll().map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    phone: u.phone,
    roles: JSON.parse(u.roles),
    status: u.status,
    email_verified: Boolean(u.email_verified),
    created_at: u.created_at,
  }));

  res.json({ success: true, users });
});

apiRouter.post('/admin/users/:id/status', authMiddleware, requireRoles(['ADMIN']), (req: AuthRequest, res) => {
  const targetId = Number(req.params.id);
  const { status } = req.body; // 'active' | 'suspended' | 'banned'

  userRepo.updateStatus(targetId, status);
  auditRepo.log(req.user!.id, req.user!.name, 'UPDATE_USER_STATUS', `Set user #${targetId} status to '${status}'.`);

  res.json({ success: true, message: `User status updated to ${status}.` });
});

apiRouter.post('/admin/users/:id/roles', authMiddleware, requireRoles(['ADMIN']), (req: AuthRequest, res) => {
  const targetId = Number(req.params.id);
  const { roles } = req.body; // array of UserRole

  userRepo.updateRoles(targetId, roles);
  auditRepo.log(req.user!.id, req.user!.name, 'UPDATE_USER_ROLES', `Updated user #${targetId} roles to [${roles.join(', ')}].`);

  res.json({ success: true, message: `User roles updated to [${roles.join(', ')}].` });
});

apiRouter.get('/admin/tutors/pending', authMiddleware, requireRoles(['ADMIN']), (_req, res) => {
  // `id` is the tutor's user id, which the approval route below expects.
  const pending = (tutorRepo.getPending() as Array<Record<string, unknown>>).map((row) => ({ ...row, id: row.user_id }));
  res.json({ success: true, pending, tutors: pending });
});

apiRouter.post('/admin/tutors/:userId/approval', authMiddleware, requireRoles(['ADMIN']), (req: AuthRequest, res) => {
  const targetId = Number(req.params.userId);
  // Accept { status: 'approved' | 'rejected' } or the admin page's { action: 'approve' | 'reject' }.
  const { action, reason } = req.body;
  const status =
    req.body.status ?? (action === 'approve' ? 'approved' : action === 'reject' ? 'rejected' : undefined);
  if (!Number.isInteger(targetId) || (status !== 'approved' && status !== 'rejected')) {
    res.status(400).json({ success: false, error: "Provide a valid tutor id and status 'approved' or 'rejected'." });
    return;
  }

  const updated = tutorRepo.updateApproval(targetId, status, reason);
  if (!updated) {
    res.status(404).json({ success: false, error: 'Tutor profile not found.' });
    return;
  }
  auditRepo.log(
    req.user!.id, 
    req.user!.name, 
    status === 'approved' ? 'TUTOR_APPROVE' : 'TUTOR_REJECT',
    `${status === 'approved' ? 'Approved' : 'Rejected'} tutor profile for user #${targetId}.${reason ? ` Reason: ${reason}` : ''}`
  );

  res.json({
    success: true,
    message: `Tutor application ${status} successfully.`,
  });
});

apiRouter.get('/admin/bookings', authMiddleware, requireRoles(['ADMIN']), (_req, res) => {
  const bookings = bookingRepo.getAll();
  res.json({ success: true, bookings });
});

apiRouter.get('/admin/payouts', authMiddleware, requireRoles(['ADMIN']), (_req, res) => {
  const payouts = db.prepare(`SELECT * FROM payout_requests ORDER BY id DESC`).all();
  res.json({ success: true, payouts });
});

apiRouter.post('/admin/payouts/:id/status', authMiddleware, requireRoles(['ADMIN']), (req: AuthRequest, res) => {
  const payoutId = Number(req.params.id);
  const { status } = req.body; // 'approved' | 'paid' | 'rejected'

  db.prepare(`UPDATE payout_requests SET status = ? WHERE id = ?`).run(status, payoutId);
  auditRepo.log(req.user!.id, req.user!.name, 'UPDATE_PAYOUT_STATUS', `Set payout request #${payoutId} status to '${status}'.`);

  res.json({ success: true, message: `Payout request marked as ${status}.` });
});

apiRouter.get('/admin/audit-logs', authMiddleware, requireRoles(['ADMIN']), (_req, res) => {
  const logs = auditRepo.getAll(50);
  res.json({ success: true, logs });
});
