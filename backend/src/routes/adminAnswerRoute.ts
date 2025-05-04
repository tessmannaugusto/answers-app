import { Router } from 'express';
import { AdminAnswerController } from '../controllers/adminAnswerController copy.js';

const router = Router();

const adminAnswersController = new AdminAnswerController()

router.post('/', adminAnswersController.createAnswer);

router.get('/:answerId', adminAnswersController.readAnswer);

router.put('/:answerId', adminAnswersController.updateAnswer);

router.delete('/:answerId', adminAnswersController.deleteAnswer);

export default router;