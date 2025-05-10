import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req: any, res: Response, next: NextFunction) => {
  try {
    const secret = process.env.JWT_SECRET || 'your-secret-key';
    const authHeader = req.headers.authorization;
    console.log('Auth header received:', authHeader);
    
    if (!authHeader) {
      console.log('No authorization header found');
      return res.status(401).json({ message: 'Authentication header missing' });
    }

    const token = authHeader.split(' ')[1];
    console.log('Token extracted:', token.substring(0, 10) + '...');
    
    
    console.log('Secret being used (first 4 chars):', secret.substring(0, 4));
    
    const decoded = jwt.verify(token, secret);
    console.log('Token successfully verified:', decoded);
    
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Token verification failed:', error);
    return res.status(401).json({ message: 'Invalid token' });
  }
};