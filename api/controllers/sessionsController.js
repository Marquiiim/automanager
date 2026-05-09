import * as sessionsService from '../services/sessionsService.js'
import { cookies_options } from '../config/cookies/cookies.js'
import { SessionError } from '../utils/erros.js'

async function validateSession(req, res) {
    try {
        const { access_token, refresh_token } = req.cookies

        const result = await sessionsService.validateSession(access_token, refresh_token)

        if (result.newAccessToken) res.cookie('access_token', result.newAccessToken, cookies_options.access_token)

        return res.status(200).json({
            success: true,
            valid: true
        })
    } catch (error) {
        res.clearCookie('access_token', cookies_options.clear_options)
        res.clearCookie('refresh_token', cookies_options.clear_options)
        return res.status(error.statusCode).json({
            success: false,
            valid: false,
            message: error.message
        })
    }
}

async function destroySession(req, res) {
    try {
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
    validateSession,
    destroySession
}