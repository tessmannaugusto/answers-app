import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
}

export interface AuthenticatedRequest extends Request {
  userId?: string;
  user?: JwtPayload;
}

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const secret = process.env.JWT_SECRET || 'your-secret-key';
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('No authorization header found');
      return res.status(401).json({ message: 'Authentication header missing' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, secret) as JwtPayload;

    console.log('Token successfully verified:', decoded);

    req.user = decoded;       
    req.userId = decoded.userId;

    next();
  } catch (error) {
    console.error('Token verification failed:', error);
    return res.status(401).json({ message: 'Invalid token' });
  }
};
