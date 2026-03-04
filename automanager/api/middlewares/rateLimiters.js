const rateLimit = require('express-rate-limit')

const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Muitas requisições, tente novamente mais tarde'
})

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    skipSuccessfulRequests: true,
    message: 'Muitas tentativas de login, aguarde alguns minutos.'
})

module.exports = {
    globalLimiter,
    authLimiter
}