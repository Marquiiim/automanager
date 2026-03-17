import { userSchema } from "../schemas/user.schema.js"

async function middlewareLogin(req, res, next) {
    const { email, password, type } = req.body.signData

    const validatedData = userSchema.parse(req.body)

    console.log(validatedData)
    res.status(200).json({ success: true, message: 'TESTE' })
}

export {
    middlewareLogin
}