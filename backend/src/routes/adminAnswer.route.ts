import { Router } from 'express';
import { AdminAnswerController } from '../controllers/adminAnswer.controller.js';
import { validateRequest } from '../middleware/validateRequest.middleware.js';
import { createAnswerSchema, updateAnswerSchema } from '../schemas/answer.schema.js';

const router = Router();

const adminAnswersController = new AdminAnswerController()

router.post('/', 
  validateRequest(createAnswerSchema), 
  adminAnswersController.createAnswer
);

router.get('/endpoints', adminAnswersController.getAnswers);

router.get('/:answerId', adminAnswersController.readAnswer);

router.put('/:answerId', 
  validateRequest(updateAnswerSchema), 
  adminAnswersController.updateAnswer
);

router.delete('/:answerId', adminAnswersController.deleteAnswer);

export default router;