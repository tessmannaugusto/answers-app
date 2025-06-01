import { Request, Response } from 'express';
import { AnswerRepository } from '../repositories/answer.repository.js';
import { UpdateAnswerInput } from '../schemas/answer.schema.js';
import { AuthenticatedRequest } from '../middleware/auth.middleware.js';


export class AdminAnswerController {

  async createAnswer(req: AuthenticatedRequest, res: Response) {
    try {
      const { method, response, statusCode } = req.body;
      const userId = req.userId || '0';
      
      console.log(`User ID from token: ${userId}`);

      const answer = AnswerRepository.create({
        method,
        response,
        statusCode,
        userId: parseInt(userId, 10)
      });
      await AnswerRepository.save(answer);

      return res.status(201).json({ status: 'success', id: answer.id });
    } catch (error) {
      return res.status(500).json({ status: 'error', error: `Failed to create message. Error: ${error}` });
    }
  }

  async getAnswers(req: Request, res: Response) {
    try {
      const userId = req.params.userId;
      if (!userId) {
        return res.status(400).json({ error: 'UserId ID is required' });
      }
      const id = parseInt(userId);
      const answer = await AnswerRepository.find({ where: {} });
      return res.status(200).json({ message: `Answer retrieved successfully: ${JSON.stringify(answer)}` });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch answers' });
    }
  }

  async readAnswer(req: Request, res: Response) {
    try {
      const answerId = req.params.answerId;
      if (!answerId) {
        return res.status(400).json({ error: 'Answer ID is required' });
      }
      const id = parseInt(answerId);
      const answer = await AnswerRepository.findOne({ where: { id } });
      return res.status(200).json({ message: `Answer retrieved successfully: ${JSON.stringify(answer)}` });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch answers' });
    }
  }

  async updateAnswer(req: Request<{}, {}, UpdateAnswerInput>, res: Response) {
    try {

      return res.status(200).json({ message: 'Answer updated successfully' });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to update answer' });
    }
  }

  async deleteAnswer(req: Request, res: Response) {
    try {

      return res.status(200).json({ message: 'Answer deleted successfully' });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to delete answer' });
    }
  }
}