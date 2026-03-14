import express from 'express';
import { registerUser, loginUser, currentUser, logoutUser } from '../controllers/userControllers.js';
import validateToken from '../middleware/validateTokenHandler.js';

const router = express.Router();

router.post('/register', registerUser);

router.post('/login', loginUser)

router.get('/profile', validateToken, currentUser)

router.get('/logout', validateToken, logoutUser)

export default router;