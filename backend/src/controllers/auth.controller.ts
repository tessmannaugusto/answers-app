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
}