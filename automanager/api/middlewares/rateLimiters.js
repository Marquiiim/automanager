import rateLimit from 'express-rate-limit'

export const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Muitas requisições, tente novamente mais tarde'
})

export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    skipSuccessfulRequests: true,
    message: 'Muitas tentativas de login, aguarde alguns minutos.'
})