import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { globalLimiter, authLimiter } from './middlewares/rateLimiters.js'
import routes from './routes/index.js'
import qs from 'qs'

const app = express()

app.set('query parser', (str) => {
    return qs.parse(str, {
        allowPrototypes: false,
        depth: 10,
        arrayLimit: 100,
        parameterLimit: 1000
    });
});

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())

app.use(globalLimiter)
app.use('/api/auth/login', authLimiter)
app.use('/api/auth/register', authLimiter)

app.use('/api', routes)

export default app