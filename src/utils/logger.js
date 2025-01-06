import winston from "winston";

const logger = winston.createLogger({
    level: 'info', //it can be debug , info, warn or error
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level}]: ${message}`;
        })
    ),
    transports: [
        new winston.transports.Console({ format: winston.format.simple() }),

        new winston.transports.File({ filename: 'app.log' })
    ]
})

export default logger