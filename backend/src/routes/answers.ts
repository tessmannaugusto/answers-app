import { Router } from 'express';
import { AnswersController } from '../controllers/answers.js';

const router = Router();

const answersController = new AnswersController()

router.post('/', answersController.createAnswer);

router.get('/', answersController.readAnswer);

router.put('/', answersController.updateAnswer);

router.delete('/', answersController.deleteAnswer);

export default router;