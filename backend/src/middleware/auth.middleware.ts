import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req: any, res: Response, next: NextFunction) => {
  try {
    const secret = process.env.JWT_SECRET || 'your-secret-key';
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      console.log('No authorization header found');
      return res.status(401).json({ message: 'Authentication header missing' });
    }
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, secret);
    console.log('Token successfully verified:', decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Token verification failed:', error);
    return res.status(401).json({ message: 'Invalid token' });
  }
};