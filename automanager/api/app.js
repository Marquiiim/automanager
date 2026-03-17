import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import rateLimiters from './middlewares/rateLimiters.js'
import routes from './routes/index.js'

const app = express()

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

app.use(cookieParser())
app.use(express.json())

app.use(rateLimiters.globalLimiter)
app.use('/api/auth/login', rateLimiters.authLimiter)

app.use('/api', routes)

export default app