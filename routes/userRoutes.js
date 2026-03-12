import express from 'express';
import { registerUser, loginUser, currentUser } from '../controllers/userControllers.js';
import validateToken from '../middleware/validateTokenHandler.js';

const router = express.Router();

router.post('/register', registerUser);

router.post('/login', loginUser)

router.get('/profile', validateToken, currentUser)

export default router;