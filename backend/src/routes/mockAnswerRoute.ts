import { Router } from 'express';
import { MockAnswerController } from '../controllers/mockAnswerController.js';

const router = Router();

const mockAnswersController = new MockAnswerController()

router.post('/:answerId', mockAnswersController.createAnswer);

router.get('/:answerId', mockAnswersController.readAnswer);

router.put('/:answerId', mockAnswersController.updateAnswer);

router.delete('/:answerId', mockAnswersController.deleteAnswer);

export default router;