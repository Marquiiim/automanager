const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const rateLimiters = require('./middlewares/rateLimiters')
const routes = require('./routes/index')

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

module.exports = app