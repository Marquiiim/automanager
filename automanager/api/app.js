import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { globalLimiter, authLimiter } from './middlewares/rateLimiters.js'
import routes from './routes/index.js'

const app = express()

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())

app.use(globalLimiter)
app.use('/api/auth/login', authLimiter)

app.use('/api', routes)

export default app