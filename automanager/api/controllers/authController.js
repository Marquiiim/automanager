import * as authService from "../services/authService.js"
import { cookies_options } from '../config/cookies/cookies.js'
import { jwttokens } from '../utils/jwt.js'

async function loginUser(req, res) {
    try {
        const user = await authService.login(req.body.signData, req.cookies)

        if (!req.cookiesExisting) {
            const accessToken = await jwttokens.generateAccessToken({
                userId: user.info.id,
                name: user.info.name,
                email: user.info.email,
                role: user.info.role
            })

            const refreshToken = await jwttokens.generateRefreshToken({
                userId: user.info.id,
                name: user.info.name,
                email: user.info.email,
                role: user.info.role
            })

            res.cookie('access_token', accessToken, cookies_options.access_token)
            res.cookie('refresh_token', refreshToken, cookies_options.refresh_token)
        }

        return res.status(200).json({
            success: true,
            message: 'Login realizado com sucesso'
        })
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: error.message
        })
    }
}

async function forgetPassword(req, res) {
    try {
        await authService.forgetPassword(req.body.forgetData)

        return res.status(200).json({
            success: true,
            message: 'Credenciais validadas, redefina sua senha'
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

async function updatePassword(req, res) {
    try {
        await authService.changePassword(req.body.changePasswordData)

        return res.status(200).json({
            success: true,
            message: 'Senha alterada com sucesso'
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export {
    loginUser,
    forgetPassword,
    updatePassword
}
