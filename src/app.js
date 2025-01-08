import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import logger from './utils/logger.js'
import authRouter from './routes/auth.routes.js'
import path from 'path'

dotenv.config()

const app = express()
connectDB()

app.use(express.json())

app.set('view engine', 'ejs')
app.set('views', path.join(process.cwd(), 'src', 'views'))

const apiPrefix = '/api/v1'

app.get('/', (req, res) => {
    logger.info('GET / request received')
    res.render('index')
})

app.use(`${apiPrefix}/auth`, authRouter)

export default app