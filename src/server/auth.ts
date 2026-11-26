import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { userRepo, UserRecord, UserRole } from './database';

export const JWT_SECRET = process.env.JWT_SECRET || 'khmer-tutors-online-production-secret-key-2026';
export const JWT_EXPIRES_IN = '7d';

export interface AuthenticatedUser {
  id: number;
  name: string;
  email: string;
  roles: UserRole[];
  status: string;
}

export interface AuthRequest extends Request {
  user?: AuthenticatedUser;
}

/**
 * Hash a plain text password using bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

/**
 * Compare plain text password against stored hash
 */
export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Generate a signed JSON Web Token including user roles
 */
export function generateToken(user: { id: number; email: string; name: string; roles: UserRole[] }): string {
  return jwt.sign(
    { 
      id: user.id, 
      email: user.email,
      name: user.name,
      roles: user.roles 
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
}

/**
 * Authentication Middleware
 * Validates JWT from the Authorization header and attaches the user to req.user
 */
export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({
      success: false,
      error: 'Authentication required. Missing or malformed Bearer token in Authorization header.',
    });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { 
      id: number; 
      email: string; 
      name: string; 
      roles: UserRole[] 
    };
    
    // Verify that the user still exists in the live database
    const user = userRepo.findById(decoded.id);
    if (!user) {
      res.status(401).json({
        success: false,
        error: 'Unauthorized: User account no longer exists in database.',
      });
      return;
    }

    if (user.status === 'banned') {
      res.status(403).json({
        success: false,
        error: 'Access denied: This account has been banned by an administrator.',
      });
      return;
    }

    let parsedRoles: UserRole[] = ['STUDENT'];
    try {
      parsedRoles = JSON.parse(user.roles);
    } catch {
      parsedRoles = [user.roles as UserRole];
    }

    req.user = { 
      id: user.id, 
      email: user.email, 
      name: user.name, 
      roles: parsedRoles,
      status: user.status 
    };
    next();
  } catch (err: any) {
    if (err.name === 'TokenExpiredError') {
      res.status(401).json({
        success: false,
        error: 'Unauthorized: Token has expired. Please log in again.',
      });
      return;
    }

    res.status(401).json({
      success: false,
      error: 'Unauthorized: Invalid token signature.',
    });
  }
}

/**
 * Role-Based Access Control (RBAC) Middleware
 * Enforces that user possesses at least one of the required roles
 */
export function requireRoles(allowedRoles: UserRole[]) {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        error: 'Authentication required.',
      });
      return;
    }

    const hasPermission = req.user.roles.some((role) => allowedRoles.includes(role));
    if (!hasPermission) {
      res.status(403).json({
        success: false,
        error: `Forbidden: Access requires one of the following roles: [${allowedRoles.join(', ')}].`,
      });
      return;
    }

    next();
  };
}
