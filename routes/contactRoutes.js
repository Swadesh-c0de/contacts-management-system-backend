import express from 'express';
import { getContacts, createContact, getContact, updateContact, deleteContact } from '../controllers/contactControllers.js';
import validateToken from '../middleware/validateTokenHandler.js';
import { strictLimiter } from '../middleware/rateLimiter.js';
const router = express.Router();

router.route("/").get(validateToken, getContacts).post(strictLimiter, validateToken, createContact);

router.route("/:id").get(validateToken, getContact).put(strictLimiter, validateToken, updateContact).delete(strictLimiter, validateToken, deleteContact);

export default router;