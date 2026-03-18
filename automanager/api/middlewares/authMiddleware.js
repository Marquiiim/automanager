import { userSchema } from "../schemas/user.schema.js"

async function middlewareLogin(req, res, next) {
    try {
        req.cookiesExisting = req.cookies.access_token || req.cookies.refresh_token

        if (!req.body?.signData) return res.status(400).json({
            success: false,
            message: 'Preencha todos os campos'
        })

        userSchema.parse(req.body.signData)
        next()
    } catch (error) {
        return res.status(422).json({
            success: false,
            message: error.issues[0].message
        })
    }
}

export default middlewareLogin
