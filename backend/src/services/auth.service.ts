import jwt from 'jsonwebtoken';
import { User } from '../entity/user.entity.js';
import { Repository } from 'typeorm';


export class AuthService {
  private readonly jwtSecret = process.env.JWT_SECRET || 'your-secret-key';

  private repository;
  
  constructor(repository: Repository<User>) {
    this.repository = repository;
  }

  async register(email: string, password: string): Promise<User> {
    const existingUser = await this.repository.findOne({ where: { email } });
    if (existingUser) {
      throw new Error('User already exists');
    }

    const user = this.repository.create({ email, password });
    await this.repository.save(user);
    return user;
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.repository.findOne({ where: { email } });
    if (user && await user.validatePassword(password)) {
      return user;
    }
    return null;
  }

  generateToken(user: User): string {
    return jwt.sign(
      { userId: user.id, email: user.email },
      this.jwtSecret,
      { expiresIn: '24h' }
    );
  }
}