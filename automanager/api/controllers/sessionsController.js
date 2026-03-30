import { validate } from '../services/sessionsService.js'
import { cookies_options } from '../config/cookies/cookies.js'

async function validateSessionController(req, res) {
    try {
        const { access_token, refresh_token } = req.cookies

        if (!access_token || !refresh_token) throw new Error('Sessão inválida')
        const isValid = await validate(access_token, refresh_token)

        if (isValid?.newAccess) res.cookie('access_token', isValid.newAccess, cookies_options.access_token)

        res.status(200).json({ success: true })
    } catch (error) {
        res.clearCookie('access_token', cookies_options.clear_options).status(200)
        res.clearCookie('refresh_token', cookies_options.clear_options).status(200)
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

async function destroySessionController(req, res) {
    try {
        res.clearCookie('access_token', cookies_options.clear_options)
        res.clearCookie('refresh_token', cookies_options.clear_options)

        res.status(204).json({ success: true })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export {
    validateSessionController,
    destroySessionController
}