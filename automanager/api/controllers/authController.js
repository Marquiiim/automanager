import { login, forgetPassword, changePassword } from "../services/authService.js"
import { cookies_options } from '../config/cookies/cookies.js'
import { jwttokens } from '../utils/jwt.js'

async function loginController(req, res) {
    try {
        const user = await login(req.body.signData, req.cookies)

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

        res.status(200).json({
            success: true,
            message: 'Login realizado com sucesso'
        })
    } catch (error) {
        res.status(401).json({
            success: false,
            message: error.message
        })
    }
}

async function forgetPasswordController(req, res) {
    try {
        await forgetPassword(req.body.forgetData)

        res.status(200).json({
            success: true,
            message: 'Credenciais validadas, redefina sua senha'
        })
    } catch (error) {
        res.status(422).json({
            success: false,
            message: error.message
        })
    }
}

async function changePasswordController(req, res) {
    try {
        await changePassword(req.body.changePasswordData)

        res.status(200).json({
            success: true,
            message: 'Senha alterada com sucesso'
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export {
    loginController,
    forgetPasswordController,
    changePasswordController
}
