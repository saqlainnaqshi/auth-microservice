import nodemailer from 'nodemailer'
import ejs from 'ejs'
import path from 'path'
import logger from './logger.js'

export const sendEmail = async (to, subject, templateName, data) => {

    try {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            // logger: true,
            // debug: true
        });

        const templatePath = path.join(process.cwd(), `src/templates/${templateName}.ejs`)
        const html = await ejs.renderFile(templatePath, data)
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            html,
        }
        await transporter.sendMail(mailOptions)
        logger.info(`Email sent to ${to}`)
    } catch (error) {
        logger.error(`Failed to send email to ${to}: ${error.message}`)
        throw error
    }
}