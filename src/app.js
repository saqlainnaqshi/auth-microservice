import express, { json } from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import logger from './utils/logger.js'
dotenv.config()

const app = express()
connectDB()

app.use(express.json());

app.get('/', (req, res) => {
    logger.info('GET / request received')
    res.status(200).send('auth microservices are running')
})

export default app