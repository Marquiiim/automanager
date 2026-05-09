import { AppError } from '../utils/erros.js'
import { jwttokens } from '../utils/jwt.js'

export async function validateSession(req, res, next) {
    try {
        const { access_token } = req.cookies

        if (!access_token) throw new AppError('Você não está autenticado', 401)

        const payload = await jwttokens.verifyAccessToken(access_token)
        if (!payload?.userId) throw new AppError('Sessão inválida', 401)

        next()
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Sessão inválida ou expirada' })
    }
}