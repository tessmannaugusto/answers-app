import { Request, Response } from 'express';
import { AnswerRepository } from '../repositories/answer.repository.js';
import { MockAnswerService } from '../services/mockAnswer.service.js';

export class MockAnswerController {

  private mockAnswerService = new MockAnswerService(AnswerRepository);

  mockAnswer = async (req: Request, res: Response) => {
    try {
      const { answerId }  = req.params;
      if (!answerId) {
        return res.status(400).json({ error: 'AnswerId is required' });
      }
      const mockAnswer = await this.mockAnswerService.getAnswerInfo(parseInt(answerId));
      if (!mockAnswer) {
        return res.status(404).json({ error: `Answer with ID ${answerId} not found` });
      }
      const { statusCode, response } = mockAnswer
      return res.status(statusCode).json(response);
    } catch (error: any) {
      return res.status(500).json({ error: `Failed to generate mock answer, error: ${error}` });
    }
  }
}