import { userSchema, forgetPasswordSchema, changePasswordSchema } from "../schemas/user.schema.js"

async function loginMiddleware(req, res, next) {
    try {
        req.cookiesExisting = !!(req.cookies?.access_token && req.cookies?.refresh_token)

        if (!req.body?.signData) return res.status(400).json({
            success: false,
            message: 'Preencha todos os campos'
        })

        userSchema.parse(req.body.signData)
        next()
    } catch (error) {
        return res.status(422).json({
            success: false,
            message: error.issues[0]?.message || 'Erro ao validar dados enviados'
        })
    }
}

async function forgetPasswordMiddleware(req, res, next) {
    try {
        forgetPasswordSchema.parse(req.body.forgetData)
        next()
    } catch (error) {
        res.status(422).json({
            success: false,
            message: error.issues[0]?.message || 'Erro ao validar dados enviados'
        })
    }
}

async function changePasswordMiddleware(req, res, next) {
    try {
        changePasswordSchema.parse(req.body.changePasswordData)
        next()
    } catch (error) {
        res.status(422).json({
            success: false,
            message: error.issues[0]?.message || 'Erro ao validar dados enviados'
        })
    }
}

export {
    loginMiddleware,
    forgetPasswordMiddleware,
    changePasswordMiddleware
}
