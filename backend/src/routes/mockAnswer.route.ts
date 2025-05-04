import { Router } from 'express';
import { MockAnswerController } from '../controllers/mockAnswer.controller.js';

const router = Router();

const mockAnswersController = new MockAnswerController()

router.all('/:answerId', mockAnswersController.mockAnswer);

export default router;