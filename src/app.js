import express, { json } from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import logger from './utils/logger.js'
import authRouter from './routes/auth.routes.js'
dotenv.config()

const app = express()
connectDB()

app.use(express.json());

const apiPrefix = '/api/v1';

app.get('/', (req, res) => {
    logger.info('GET / request received')
    res.status(200).send('auth microservices are running')
})

app.use(`${apiPrefix}/auth`, authRouter);

export default app