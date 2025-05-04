import { Request, Response } from 'express';
import { AnswerRepository } from '../repositories/answerRepository.js';

export class MockAnswerController {

  async createAnswer(req: Request, res: Response) {
    try {
      const { method, response } = req.body;
      if (!method || !response) {
        return res.status(400).json({ error: 'Method and response are required' });
      }
      const answer = AnswerRepository.create({ method, response });
      await AnswerRepository.save(answer);

      return res.status(201).json({ message: `Answer created successfully, id: ${answer.id}` });
    } catch (error: any) {
      console.error('Error creating answer:', error.message);
      return res.status(500).json({ error: `Failed to create answer, error: ${error}` });
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

  async updateAnswer(req: Request, res: Response) {
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