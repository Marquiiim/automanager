import { validate } from '../services/sessionsService.js'
import { cookies_options } from '../config/cookies/cookies.js'

async function validateSessionController(req, res) {
    try {
        const { access_token, refresh_token } = req.cookies

        if (!access_token || !refresh_token) throw new Error('Sessão inválida')
        const isValid = await validate(access_token, refresh_token)

        if (isValid?.newAccess) res.cookie('access_token', isValid.newAccess, cookies_options.access_token)

        return res.status(200).json({
            success: true,
            valid: true
        })
    } catch (error) {
        res.clearCookie('access_token', cookies_options.clear_options)
        res.clearCookie('refresh_token', cookies_options.clear_options)
        return res.status(400).json({
            success: false,
            valid: false,
            message: error.message || 'Sessão inválida'
        })
    }
}

async function destroySessionController(req, res) {
    try {
        const { access_token, refresh_token } = req.cookies

        if (!access_token || !refresh_token) throw new Error('Sessão inválida')

        res.clearCookie('access_token', cookies_options.clear_options)
        res.clearCookie('refresh_token', cookies_options.clear_options)

        return res.status(200).json({
            success: true,
            message: 'Logout realizado com sucesso'
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message || 'Erro ao deslogar'
        })
    }
}

export {
    validateSessionController,
    destroySessionController
}