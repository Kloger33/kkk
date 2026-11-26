import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import os from 'os';
import bcrypt from 'bcryptjs';

// Use /tmp on serverless read-only environments (e.g. Vercel), local ./data otherwise
function resolveDataDir(): string {
  const localDir = path.resolve(process.cwd(), 'data');
  if (process.env.VERCEL === '1' || process.env.AWS_LAMBDA_FUNCTION_NAME) {
    const tmpDir = path.join(os.tmpdir(), 'kto-data');
    if (!fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir, { recursive: true });
    }
    return tmpDir;
  }
  try {
    if (!fs.existsSync(localDir)) {
      fs.mkdirSync(localDir, { recursive: true });
    }
    fs.accessSync(localDir, fs.constants.W_OK);
    return localDir;
  } catch {
    const tmpDir = path.join(os.tmpdir(), 'kto-data');
    if (!fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir, { recursive: true });
    }
    return tmpDir;
  }
}

const dataDir = resolveDataDir();
const dbPath = path.join(dataDir, 'app.sqlite');
export const db = new Database(dbPath);

// Enable WAL mode and foreign key enforcement
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

export type UserRole = 'STUDENT' | 'TUTOR' | 'ADMIN';
export type UserStatus = 'active' | 'suspended' | 'banned';
export type TutorApprovalStatus = 'pending' | 'approved' | 'rejected';

export interface UserRecord {
  id: number;
  name: string;
  email: string;
  phone?: string;
  password_hash: string;
  avatar?: string;
  roles: string; // JSON array of UserRole
  status: UserStatus;
  email_verified: number; // 0 or 1
  timezone: string;
  language: 'en' | 'km';
  created_at: string;
}

export interface TutorProfileRecord {
  user_id: number;
  university: string;
  major: string;
  year: string;
  student_id_doc?: string;
  bio: string;
  video_url?: string;
  focus_tags: string; // JSON array
  trial_price: number;
  hourly_price: number;
  approval_status: TutorApprovalStatus;
  rejection_reason?: string;
  rating: number;
  reviews_count: number;
  is_super_tutor: number;
  lessons_taught: number;
  payout_method: string;
  payout_account: string;
}

export interface StudentProfileRecord {
  user_id: number;
  goal: string;
  level: string;
  wallet_balance: number;
  streak_days: number;
  total_hours_learned: number;
}

export interface BookingRecord {
  id: number;
  student_id: number;
  tutor_id: number;
  student_name: string;
  tutor_name: string;
  lesson_type: string;
  date: string;
  time_slot: string;
  price: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'disputed';
  meeting_link?: string;
  created_at: string;
}

export interface WalletTransactionRecord {
  id: number;
  user_id: number;
  type: 'top_up' | 'lesson_payment' | 'tutor_payout' | 'referral_credit' | 'refund';
  amount: number;
  payment_method: string;
  status: 'completed' | 'pending' | 'failed';
  reference: string;
  created_at: string;
}

export interface PayoutRequestRecord {
  id: number;
  tutor_id: number;
  tutor_name: string;
  amount: number;
  method: 'ABA' | 'Wing';
  account_info: string;
  status: 'pending' | 'approved' | 'paid' | 'rejected';
  created_at: string;
}

export interface ReviewRecord {
  id: number;
  student_id: number;
  tutor_id: number;
  student_name: string;
  student_country: string;
  rating: number;
  comment: string;
  flagged: number;
  created_at: string;
}

export interface AuditLogRecord {
  id: number;
  actor_id: number;
  actor_name: string;
  action: string;
  details: string;
  created_at: string;
}

/**
 * Initialize Database Schema with Full RBAC & Seed Data
 */
let schemaInitialized = false;

export function initDatabase() {
  if (schemaInitialized) return;
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      phone TEXT,
      password_hash TEXT NOT NULL,
      avatar TEXT,
      roles TEXT NOT NULL DEFAULT '["STUDENT"]',
      status TEXT NOT NULL DEFAULT 'active',
      email_verified INTEGER NOT NULL DEFAULT 1,
      timezone TEXT NOT NULL DEFAULT 'Asia/Phnom_Penh (GMT+7)',
      language TEXT NOT NULL DEFAULT 'en',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS tutor_profiles (
      user_id INTEGER PRIMARY KEY,
      university TEXT NOT NULL,
      major TEXT NOT NULL,
      year TEXT NOT NULL,
      student_id_doc TEXT,
      bio TEXT NOT NULL,
      video_url TEXT,
      focus_tags TEXT NOT NULL DEFAULT '["Conversational"]',
      trial_price REAL NOT NULL DEFAULT 3.0,
      hourly_price REAL NOT NULL DEFAULT 8.0,
      approval_status TEXT NOT NULL DEFAULT 'pending',
      rejection_reason TEXT,
      rating REAL NOT NULL DEFAULT 5.0,
      reviews_count INTEGER NOT NULL DEFAULT 0,
      is_super_tutor INTEGER NOT NULL DEFAULT 0,
      lessons_taught INTEGER NOT NULL DEFAULT 0,
      payout_method TEXT NOT NULL DEFAULT 'ABA Bank',
      payout_account TEXT NOT NULL DEFAULT '001 234 567 (USD)',
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS student_profiles (
      user_id INTEGER PRIMARY KEY,
      goal TEXT NOT NULL DEFAULT 'Career & Business',
      level TEXT NOT NULL DEFAULT 'Beginner (A1)',
      wallet_balance REAL NOT NULL DEFAULT 24.0,
      streak_days INTEGER NOT NULL DEFAULT 5,
      total_hours_learned REAL NOT NULL DEFAULT 14.5,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      student_id INTEGER NOT NULL,
      tutor_id INTEGER NOT NULL,
      student_name TEXT NOT NULL,
      tutor_name TEXT NOT NULL,
      lesson_type TEXT NOT NULL,
      date TEXT NOT NULL,
      time_slot TEXT NOT NULL,
      price REAL NOT NULL,
      status TEXT NOT NULL DEFAULT 'confirmed',
      meeting_link TEXT DEFAULT 'https://meet.khmertutors.com/class-live',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS wallet_transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      type TEXT NOT NULL,
      amount REAL NOT NULL,
      payment_method TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'completed',
      reference TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS payout_requests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      tutor_id INTEGER NOT NULL,
      tutor_name TEXT NOT NULL,
      amount REAL NOT NULL,
      method TEXT NOT NULL DEFAULT 'ABA',
      account_info TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (tutor_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS reviews (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      student_id INTEGER NOT NULL,
      tutor_id INTEGER NOT NULL,
      student_name TEXT NOT NULL,
      student_country TEXT NOT NULL DEFAULT 'Cambodia',
      rating REAL NOT NULL,
      comment TEXT NOT NULL,
      flagged INTEGER NOT NULL DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS audit_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      actor_id INTEGER NOT NULL,
      actor_name TEXT NOT NULL,
      action TEXT NOT NULL,
      details TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS data_store (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      payload TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
    CREATE INDEX IF NOT EXISTS idx_bookings_student ON bookings(student_id);
    CREATE INDEX IF NOT EXISTS idx_bookings_tutor ON bookings(tutor_id);
  `);

  // Seed Required Accounts if database is empty
  seedDatabase();
  schemaInitialized = true;
  console.log(`[Database] SQLite database initialized and seeded at ${dbPath}`);
}

/**
 * Seed 1 Admin, 3 Tutors (1 pending), 3 Students (1 dual)
 */
function seedDatabase() {
  const userCount = (db.prepare(`SELECT COUNT(*) as count FROM users`).get() as { count: number }).count;
  if (userCount > 0) return;

  const adminHash = bcrypt.hashSync('AdminPass123!', 10);
  const tutorHash = bcrypt.hashSync('TutorPass123!', 10);
  const studentHash = bcrypt.hashSync('StudentPass123!', 10);
  const dualHash = bcrypt.hashSync('DualPass123!', 10);

  // 1. ADMIN USER
  const insertUser = db.prepare(`
    INSERT INTO users (name, email, phone, password_hash, roles, status, email_verified, timezone, language)
    VALUES (?, ?, ?, ?, ?, ?, 1, 'Asia/Phnom_Penh (GMT+7)', 'en')
  `);

  const adminInfo = insertUser.run(
    'Dara Sovann (Admin)',
    'admin@khmertutors.com',
    '+855 12 888 001',
    adminHash,
    JSON.stringify(['ADMIN']),
    'active'
  );
  const adminId = Number(adminInfo.lastInsertRowid);

  // 2. TUTOR 1: Sreynoch Keo (Approved, Super Tutor)
  const t1Info = insertUser.run(
    'Sreynoch Keo',
    'sreynoch@khmertutors.com',
    '+855 98 456 789',
    tutorHash,
    JSON.stringify(['TUTOR']),
    'active'
  );
  const t1Id = Number(t1Info.lastInsertRowid);

  db.prepare(`
    INSERT INTO tutor_profiles (user_id, university, major, year, bio, focus_tags, trial_price, hourly_price, approval_status, rating, reviews_count, is_super_tutor, lessons_taught, payout_account)
    VALUES (?, ?, ?, ?, ?, ?, 3.0, 8.0, 'approved', 5.0, 48, 1, 142, 'ABA Bank: 001 556 990')
  `).run(
    t1Id,
    'Royal University of Phnom Penh (RUPP)',
    'Khmer Linguistics & Foreign Language Pedagogy',
    'Year 3 (Honor Student)',
    'Passionate university tutor specializing in daily conversational Khmer for foreign expats,PassApp tuk-tuk navigation, and street food bargaining.',
    JSON.stringify(['Conversational', 'Travel Khmer'])
  );

  // 3. TUTOR 2: Chamroeun Thearith (Approved)
  const t2Info = insertUser.run(
    'Chamroeun Thearith',
    'chamroeun@khmertutors.com',
    '+855 77 123 456',
    tutorHash,
    JSON.stringify(['TUTOR']),
    'active'
  );
  const t2Id = Number(t2Info.lastInsertRowid);

  db.prepare(`
    INSERT INTO tutor_profiles (user_id, university, major, year, bio, focus_tags, trial_price, hourly_price, approval_status, rating, reviews_count, is_super_tutor, lessons_taught, payout_account)
    VALUES (?, ?, ?, ?, ?, ?, 4.0, 9.0, 'approved', 4.9, 36, 1, 98, 'ABA Bank: 002 998 112')
  `).run(
    t2Id,
    'Institute of Technology of Cambodia (ITC)',
    'Civil Engineering & Technical Translation',
    'Year 4',
    'Experienced engineering undergraduate helping NGO and diplomatic staff master formal workplace Khmer and contractual vocabulary.',
    JSON.stringify(['Business Khmer', 'Script & Reading'])
  );

  // 4. TUTOR 3: Visal Rath (Pending Approval - for Admin Queue Testing)
  const t3Info = insertUser.run(
    'Visal Rath',
    'visal.pending@khmertutors.com',
    '+855 85 999 333',
    tutorHash,
    JSON.stringify(['TUTOR']),
    'active'
  );
  const t3Id = Number(t3Info.lastInsertRowid);

  db.prepare(`
    INSERT INTO tutor_profiles (user_id, university, major, year, student_id_doc, bio, focus_tags, trial_price, hourly_price, approval_status, rating, reviews_count, is_super_tutor, lessons_taught, payout_account)
    VALUES (?, ?, ?, ?, ?, ?, 3.5, 8.5, 'pending', 0.0, 0, 0, 0, 'Wing Money: 085 999 333')
  `).run(
    t3Id,
    'National University of Management (NUM)',
    'Business Management & Hospitality',
    'Year 2',
    'Certified student ID uploaded. Eager to start teaching beginner tourists and expats conversational Khmer.',
    JSON.stringify(['Conversational', 'Travel Khmer'])
  );

  // 5. STUDENT 1: Alex Morgan (Active student with $24 wallet)
  const s1Info = insertUser.run(
    'Alex Morgan',
    'alex@expatphnompenh.com',
    '+855 10 234 567',
    studentHash,
    JSON.stringify(['STUDENT']),
    'active'
  );
  const s1Id = Number(s1Info.lastInsertRowid);

  db.prepare(`
    INSERT INTO student_profiles (user_id, goal, level, wallet_balance, streak_days, total_hours_learned)
    VALUES (?, 'Career & Business', 'Intermediate (B1)', 24.0, 7, 18.0)
  `).run(s1Id);

  // 6. STUDENT 2: Sarah Jenkins ($45 wallet)
  const s2Info = insertUser.run(
    'Sarah Jenkins',
    'sarah.ngo@phnompenh.org',
    '+855 12 345 678',
    studentHash,
    JSON.stringify(['STUDENT']),
    'active'
  );
  const s2Id = Number(s2Info.lastInsertRowid);

  db.prepare(`
    INSERT INTO student_profiles (user_id, goal, level, wallet_balance, streak_days, total_hours_learned)
    VALUES (?, 'Travel & Culture', 'Beginner (A1)', 45.0, 3, 6.0)
  `).run(s2Id);

  // 7. STUDENT + TUTOR (Dual Role): John Doe
  const dualInfo = insertUser.run(
    'John Doe',
    'john.dual@khmertutors.com',
    '+855 16 888 777',
    dualHash,
    JSON.stringify(['STUDENT', 'TUTOR']),
    'active'
  );
  const dualId = Number(dualInfo.lastInsertRowid);

  db.prepare(`
    INSERT INTO student_profiles (user_id, goal, level, wallet_balance, streak_days, total_hours_learned)
    VALUES (?, 'Conversational Khmer', 'Elementary (A2)', 35.0, 4, 12.0)
  `).run(dualId);

  db.prepare(`
    INSERT INTO tutor_profiles (user_id, university, major, year, bio, focus_tags, trial_price, hourly_price, approval_status, rating, reviews_count, is_super_tutor, lessons_taught, payout_account)
    VALUES (?, ?, ?, ?, ?, ?, 3.0, 7.5, 'approved', 4.8, 19, 0, 45, 'ABA Bank: 003 445 110')
  `).run(
    dualId,
    'Paññāsāstra University of Cambodia (PUC)',
    'International Relations & Khmer History',
    'Year 3',
    'Teaching conversational Khmer with a cultural emphasis on Angkorian history and modern living.',
    JSON.stringify(['Conversational', 'Travel Khmer'])
  );

  // Seed sample initial bookings
  const insertBooking = db.prepare(`
    INSERT INTO bookings (student_id, tutor_id, student_name, tutor_name, lesson_type, date, time_slot, price, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertBooking.run(s1Id, t1Id, 'Alex Morgan', 'Sreynoch Keo', 'Full Lesson (60 min)', 'Tomorrow', '10:00 AM – 11:00 AM', 8.0, 'confirmed');
  insertBooking.run(s1Id, t2Id, 'Alex Morgan', 'Chamroeun Thearith', 'Trial Lesson (30 min)', 'Friday', '02:00 PM – 02:30 PM', 4.0, 'confirmed');
  insertBooking.run(s2Id, t1Id, 'Sarah Jenkins', 'Sreynoch Keo', 'Full Lesson (60 min)', 'Saturday', '04:00 PM – 05:00 PM', 8.0, 'confirmed');

  // Seed sample transactions
  const insertTx = db.prepare(`
    INSERT INTO wallet_transactions (user_id, type, amount, payment_method, status, reference)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  insertTx.run(s1Id, 'top_up', 20.0, 'ABA PayWay KHQR', 'completed', 'TXN-ABA-98214');
  insertTx.run(s1Id, 'lesson_payment', -8.0, 'Wallet Balance', 'completed', 'TXN-LES-44102');
  insertTx.run(s1Id, 'referral_credit', 5.0, 'Friend Referral Bonus', 'completed', 'TXN-REF-11902');

  // Seed sample audit log
  db.prepare(`
    INSERT INTO audit_logs (actor_id, actor_name, action, details)
    VALUES (?, ?, ?, ?)
  `).run(adminId, 'Dara Sovann (Admin)', 'SYSTEM_INIT', 'Seeded initial platform users and verified tutor records.');
}

// User Repository Functions
export const userRepo = {
  create: (name: string, email: string, passwordHash: string, role: UserRole, phone?: string): UserRecord => {
    const stmt = db.prepare(`
      INSERT INTO users (name, email, phone, password_hash, roles, status, email_verified)
      VALUES (?, ?, ?, ?, ?, 'active', 1)
    `);
    const rolesJson = JSON.stringify([role]);
    const info = stmt.run(name.trim(), email.toLowerCase().trim(), phone || null, passwordHash, rolesJson);
    const userId = Number(info.lastInsertRowid);

    if (role === 'TUTOR') {
      db.prepare(`
        INSERT INTO tutor_profiles (user_id, university, major, year, bio, focus_tags, approval_status)
        VALUES (?, 'Royal University of Phnom Penh (RUPP)', 'General Studies', 'Year 1', 'Welcome to my Khmer tutoring profile.', '["Conversational"]', 'pending')
      `).run(userId);
    } else {
      db.prepare(`
        INSERT INTO student_profiles (user_id, goal, level, wallet_balance)
        VALUES (?, 'Conversational Khmer', 'Beginner (A1)', 10.0)
      `).run(userId);
    }

    return userRepo.findById(userId)!;
  },

  findByEmail: (email: string): UserRecord | undefined => {
    return db.prepare(`SELECT * FROM users WHERE email = ?`).get(email.toLowerCase().trim()) as UserRecord | undefined;
  },

  findById: (id: number): UserRecord | undefined => {
    return db.prepare(`SELECT * FROM users WHERE id = ?`).get(id) as UserRecord | undefined;
  },

  getAll: (): UserRecord[] => {
    return db.prepare(`SELECT * FROM users ORDER BY id DESC`).all() as UserRecord[];
  },

  updateStatus: (id: number, status: UserStatus): boolean => {
    const res = db.prepare(`UPDATE users SET status = ? WHERE id = ?`).run(status, id);
    return res.changes > 0;
  },

  updateRoles: (id: number, roles: UserRole[]): boolean => {
    const res = db.prepare(`UPDATE users SET roles = ? WHERE id = ?`).run(JSON.stringify(roles), id);
    return res.changes > 0;
  },

  count: (): number => {
    return (db.prepare(`SELECT COUNT(*) as count FROM users`).get() as { count: number }).count;
  }
};

// Tutor Profiles Repository
export const tutorRepo = {
  getByUserId: (userId: number): TutorProfileRecord | undefined => {
    return db.prepare(`SELECT * FROM tutor_profiles WHERE user_id = ?`).get(userId) as TutorProfileRecord | undefined;
  },

  getAllWithUser: () => {
    return db.prepare(`
      SELECT t.*, u.name, u.email, u.phone, u.avatar, u.status as user_status
      FROM tutor_profiles t
      JOIN users u ON t.user_id = u.id
      ORDER BY t.rating DESC, t.lessons_taught DESC
    `).all();
  },

  getPending: () => {
    return db.prepare(`
      SELECT t.*, u.name, u.email, u.phone, u.avatar, u.created_at as registered_at
      FROM tutor_profiles t
      JOIN users u ON t.user_id = u.id
      WHERE t.approval_status = 'pending'
      ORDER BY t.user_id ASC
    `).all();
  },

  updateApproval: (userId: number, status: TutorApprovalStatus, reason?: string): boolean => {
    const res = db.prepare(`
      UPDATE tutor_profiles 
      SET approval_status = ?, rejection_reason = ?
      WHERE user_id = ?
    `).run(status, reason || null, userId);
    return res.changes > 0;
  },

  updateProfile: (userId: number, data: Partial<TutorProfileRecord>): boolean => {
    const fields: string[] = [];
    const values: any[] = [];
    for (const [k, v] of Object.entries(data)) {
      fields.push(`${k} = ?`);
      values.push(v);
    }
    values.push(userId);
    const res = db.prepare(`UPDATE tutor_profiles SET ${fields.join(', ')} WHERE user_id = ?`).run(...values);
    return res.changes > 0;
  }
};

// Student Profiles Repository
export const studentRepo = {
  getByUserId: (userId: number): StudentProfileRecord | undefined => {
    return db.prepare(`SELECT * FROM student_profiles WHERE user_id = ?`).get(userId) as StudentProfileRecord | undefined;
  },

  updateWallet: (userId: number, delta: number): number => {
    db.prepare(`UPDATE student_profiles SET wallet_balance = wallet_balance + ? WHERE user_id = ?`).run(delta, userId);
    const updated = studentRepo.getByUserId(userId);
    return updated ? updated.wallet_balance : 0;
  },

  updateGoal: (userId: number, goal: string, level: string): boolean => {
    const res = db.prepare(`UPDATE student_profiles SET goal = ?, level = ? WHERE user_id = ?`).run(goal, level, userId);
    return res.changes > 0;
  }
};

// Bookings Repository
export const bookingRepo = {
  create: (data: Omit<BookingRecord, 'id' | 'created_at'>): BookingRecord => {
    const res = db.prepare(`
      INSERT INTO bookings (student_id, tutor_id, student_name, tutor_name, lesson_type, date, time_slot, price, status, meeting_link)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      data.student_id,
      data.tutor_id,
      data.student_name,
      data.tutor_name,
      data.lesson_type,
      data.date,
      data.time_slot,
      data.price,
      data.status || 'confirmed',
      data.meeting_link || 'https://meet.khmertutors.com/live-room'
    );
    const id = Number(res.lastInsertRowid);
    return db.prepare(`SELECT * FROM bookings WHERE id = ?`).get(id) as BookingRecord;
  },

  getByStudentId: (studentId: number): BookingRecord[] => {
    return db.prepare(`SELECT * FROM bookings WHERE student_id = ? ORDER BY id DESC`).all(studentId) as BookingRecord[];
  },

  getByTutorId: (tutorId: number): BookingRecord[] => {
    return db.prepare(`SELECT * FROM bookings WHERE tutor_id = ? ORDER BY id DESC`).all(tutorId) as BookingRecord[];
  },

  getAll: (): BookingRecord[] => {
    return db.prepare(`SELECT * FROM bookings ORDER BY id DESC`).all() as BookingRecord[];
  },

  updateStatus: (id: number, status: string): boolean => {
    const res = db.prepare(`UPDATE bookings SET status = ? WHERE id = ?`).run(status, id);
    return res.changes > 0;
  }
};

// Audit Log Repository
export const auditRepo = {
  log: (actorId: number, actorName: string, action: string, details: string) => {
    db.prepare(`
      INSERT INTO audit_logs (actor_id, actor_name, action, details)
      VALUES (?, ?, ?, ?)
    `).run(actorId, actorName, action, details);
  },

  getAll: (limit = 50): AuditLogRecord[] => {
    return db.prepare(`SELECT * FROM audit_logs ORDER BY id DESC LIMIT ?`).all(limit) as AuditLogRecord[];
  }
};
