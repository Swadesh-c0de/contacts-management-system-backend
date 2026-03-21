import express from 'express';
import { registerUser, loginUser, currentUser, updateProfile, changePassword, logoutUser, deleteUser } from '../controllers/userControllers.js';
import validateToken from '../middleware/validateTokenHandler.js';
import { strictLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.post('/register', strictLimiter, registerUser);

router.post('/login', strictLimiter, loginUser)

router.get('/profile', validateToken, currentUser)

router.put('/profile', validateToken, updateProfile)

router.delete('/profile', validateToken, deleteUser)

router.put('/change-password', validateToken, strictLimiter, changePassword)

router.get('/logout', validateToken, logoutUser)

export default router;