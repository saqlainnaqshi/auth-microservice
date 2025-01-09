import bcrypt from 'bcryptjs'
import User from "../models/User.js";

export const registerUser = async ({ firstName, lastName, email, password, role, phoneNumber }) => {

    const existingUser = await User.findOne({ email })
    if (existingUser) {
        throw new Error("User already exists");
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new User({
        firstName,
        lastName,
        email,
        phoneNumber,
        role,
        password: hashedPassword
    })

    await newUser.save()
    return newUser
}

export const loginUser = async ({ email, password }) => {
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error("User doesn't exist");
    }

    const validPassword = await bcrypt.compare(password, user.password)

    if (!validPassword) {
        throw new Error("Incorrect password");
    }

    return user
}