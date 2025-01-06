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


// export const matchedPassword = async (enteredPassword, storedPassword) => {
//     return await bcrypt.compare(enteredPassword, storedPassword)
// }