import express from 'express';
import verifyToken from '../middleware/verifyToken.js';
import { register, login, me } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', verifyToken, me);

export default router;
