import User from "../models/User.js";
import { registerUser } from "../services/auth.service.js";
import { sendEmail } from "../utils/email.js";
import logger from "../utils/logger.js";
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {

    const { email, password, role, firstName, lastName, phoneNumber } = req.body

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' })
    }

    try {
        const user = await registerUser({ email, password, role, firstName, lastName, phoneNumber })

        const token = jwt.sign(
            { userId: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        )

        const verificationUrl = `${process.env.BASE_URL}/api/v1/auth/verify-email?token=${token}`

        await sendEmail(
            user.email,
            'Welcome to Our Service!',
            'verifyEmail',
            { firstName: user.firstName, verificationUrl }
        )

        res.status(201).json({
            message: 'User registered successfully. Please verify your email.',
            user: {
                email: user.email,
                role: user.role
            },
            token: token
        })
        logger.info(`User registered: ${email}`)

    } catch (error) {
        logger.error(`Error registering user ${error.message}`)
        res.status(500).json({ message: `Error registering user: ${error.message}` })
    }
}


export const verifyEmail = async (req, res) => {

    const { token } = req.query
    if (!token) {
        return res.status(400).render('emailVerified', { success: false, message: 'Invalid or missing token.' })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.userId)

        if (!user) {
            return res.status(404).render('emailVerified', { success: false, message: 'User not found.' });
        }

        user.isVerified = true
        await user.save()

        res.status(200).render('emailVerified', { success: true, message: 'Your email has been successfully verified!' });

    } catch (error) {
        res.status(400).render('emailVerified', { success: false, message: 'Invalid or expired token.' });
    }
}