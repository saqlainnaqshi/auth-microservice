import express from 'express'
import { login, register, verifyEmail } from '../controllers/auth.controller.js'

const router = express.Router()


router.post('/register', register)
router.get('/verify-email', verifyEmail);
router.post('/login', login)

export default router