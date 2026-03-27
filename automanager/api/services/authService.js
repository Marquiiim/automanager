import user from '../models/usermodels.js'
import bcrypt from 'bcryptjs'
import { jwttokens } from '../utils/jwt.js'

async function loginService(signData, token) {
    const { email, password } = signData

    const userInfo = await user.findByEmail(email)

    const passwordValidate = await bcrypt.compare(password, userInfo?.password_hash)
    if (!passwordValidate) throw new Error('Senha inválida')

    if (token && Object.keys(token).length > 0) {
        const { access_token, refresh_token } = token

        if (access_token && refresh_token) {
            const AccessToken = await jwttokens.verifyAccessToken(access_token)
            if (!AccessToken) throw new Error('Sessão expírada, tente novamente')

            const RefreshToken = await jwttokens.verifyRefreshToken(refresh_token)
            if (!RefreshToken) throw new Error('Sessão expirada, tente novamente')
        }
    }

    return {
        success: true,
        info: {
            id: userInfo.id,
            name: userInfo.name,
            email: userInfo.email,
            role: userInfo.role
        }
    }
}

async function forgetPasswordService(forgetData) {
    const { fullName, email, cpf, birthDate } = forgetData

    const userInfo = await user.findByEmail(email)

    if (fullName !== userInfo.name ||
        email !== userInfo.email ||
        cpf !== userInfo.cpf ||
        birthDate !== new Date(userInfo.date_of_birth).toISOString().split('T')[0]) throw new Error('Credenciais inválidas, impossível redefinir senha')
}

async function changePasswordService(passwordData) {
    const { password, confirmPassword } = forgetData
}

export {
    loginService,
    forgetPasswordService,
    changePasswordService
}