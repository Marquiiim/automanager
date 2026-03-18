import authService from "../services/authService.js"
import { cookies_options } from '../config/cookies/cookies.js'
import { jwttokens } from '../utils/jwt.js'

async function controllerLogin(req, res) {
    try {
        const user = await authService(req.body.signData)

        /*if (!req.cookiesExisting) {
            const accessToken = jwttokens.generateAccessToken({
                userId: user.id,
                email: user.email,
                role: user.role
            })

            const refreshToken = jwttokens.generateRefreshToken({
                userId: user.id,
                email: user.email,
                role: user.role
            })

            res.cookie('access_token', accessToken, cookies_options.access_token)
            res.cookie('refresh_token', refreshToken, cookies_options.refresh_token)
        }*/

        res.status(200).json({ success: true, message: 'Login realizado com sucesso' })
    } catch (error) {
        console.log(error)
        res.status(401).json({
            success: false,
            message: message.error
        })
    }
}

export default controllerLogin
