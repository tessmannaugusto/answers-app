import { Router } from 'express';
import { validateRequest } from '../middleware/validateRequest.middleware.js';
import { loginSchema, registerSchema } from '../schemas/auth.schema.js';
import { AuthController } from '../controllers/auth.controller.js';

const router = Router();
const authController = new AuthController();

router.post('/register', 
  validateRequest(registerSchema), 
  authController.register.bind(authController)
);

router.post('/login', 
  validateRequest(loginSchema), 
  authController.login.bind(authController)
);

router.get('/validate-token',
  authController.validateToken.bind(authController)
)

export default router;