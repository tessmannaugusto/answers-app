import { Request, Response } from 'express';
import { AnswerRepository } from '../repositories/answer.repository.js';
import { CreateAnswerInput, UpdateAnswerInput } from '../schemas/answer.schema.js';

export class AdminAnswerController {
  async createAnswer(req: Request<{}, {}, CreateAnswerInput>, res: Response) {
    try {
      const { method, response, statusCode } = req.body;
      const answer = AnswerRepository.create({ method, response, statusCode });
      await AnswerRepository.save(answer);

      return res.status(201).json({ status: 'success', id: answer.id });
    } catch (error) {
      return res.status(500).json({ status: 'error', error: `Failed to create message. Error: ${error}` });
    }
  }

  async readAnswer(req: Request, res: Response) {
    try {
      const answerId  = req.params.answerId;
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