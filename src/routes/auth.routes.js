import express from 'express'
import { getProfile, login, register, verifyEmail } from '../controllers/auth.controller.js'
import { authenticate } from '../middlewares/auth.middleware.js';

const router = express.Router()


router.post('/register', register)
router.get('/verify-email', verifyEmail);
router.post('/login', login)
router.get('/me', authenticate, getProfile)
export default router