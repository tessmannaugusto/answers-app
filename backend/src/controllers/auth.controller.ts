import { Request, Response } from 'express';
import { UserRepository } from '../repositories/auth.repository.js';
import { AuthService } from '../services/auth.service.js';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService(UserRepository);
  }

  register = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = await this.authService.register(email, password);
      const token = this.authService.generateToken(user);
      res.json({ token });
    } catch (error) {
      console.log('Error during registration:', error);
      if (error instanceof Error && error.message === 'User already exists') {
        return res.status(409).json({ message: error.message });
      }
      res.status(400).json({ message: 'Registration failed' });
    }
  }

  login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = await this.authService.validateUser(email, password);
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      const token = this.authService.generateToken(user);
      res.json({ token });
    } catch (error) {
      res.status(400).json({ message: 'Login failed' });
    }
  }

  validateToken = (req: Request, res: Response) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
    try {
      const isValid = this.authService.validateToken(token);
      if (isValid) {
        return res.json({ valid: true });
      } else {
        return res.status(401).json({ valid: false });
      }
    }
    catch (error) {
      console.error('Token validation error:', error);
      return res.status(500).json({ message: 'Token validation failed' });
    }
  }
}