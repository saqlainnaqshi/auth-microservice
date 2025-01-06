import { registerUser } from "../services/auth.service.js";
import logger from "../utils/logger.js";
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'aomxheutoopp!29'

export const register = async (req, res) => {
    const { email, password, role, firstName, lastName, phoneNumber } = req.body

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' })
    }

    try {
        const user = await registerUser({ email, password, role, firstName, lastName, phoneNumber })

        const token = jwt.sign(
            { userId: user._id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: '1h' }
        )

        res.status(201).json({
            message: 'User registered successfully',
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