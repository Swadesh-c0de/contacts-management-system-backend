import express from 'express';
import { getContacts, createContact, getContact, updateContact, deleteContact } from '../controllers/contactControllers.js';
import validateToken from '../middleware/validateTokenHandler.js';
import { strictLimiter } from '../middleware/rateLimiter.js';
const router = express.Router();

router.use(validateToken);

router.route("/").get(getContacts).post(strictLimiter, createContact);

router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

export default router;