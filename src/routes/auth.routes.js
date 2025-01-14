import express from 'express'
import { getProfile, login, logout, refreshAccessToken, register, verifyEmail } from '../controllers/auth.controller.js'
import { authenticate } from '../middlewares/auth.middleware.js';

const router = express.Router()


router.post('/register', register)
router.get('/verify-email', verifyEmail)
router.post('/login', login)
router.get('/me', authenticate, getProfile)
router.post('/refresh-token', refreshAccessToken)
router.post('/logout', logout)
export default router