import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';

export const validateRequest = (schema: AnyZodObject) => 
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('received request body:', req.body);
      await schema.parseAsync(req.body);
      return next();
    } catch (error) {
      return res.status(400).json(error);
    }
};