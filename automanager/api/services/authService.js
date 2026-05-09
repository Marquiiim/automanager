import user from '../models/usermodels.js'
import bcrypt from 'bcryptjs'
import { jwttokens } from '../utils/jwt.js'
import { AuthError } from '../utils/erros.js'

async function login(signData, token) {
    const { email, password } = signData

    const userInfo = await user.findByEmail(email)

    const passwordValidate = await bcrypt.compare(password, userInfo?.password_hash)
    if (!passwordValidate) throw new AuthError('Credenciais inválidas', 401)

    if (token && Object.keys(token).length > 0) {
        const { access_token, refresh_token } = token

        if (access_token && refresh_token) {
            const AccessToken = await jwttokens.verifyAccessToken(access_token)
            if (!AccessToken) throw new AuthError('Sessão expírada, tente novamente', 401)

            const RefreshToken = await jwttokens.verifyRefreshToken(refresh_token)
            if (!RefreshToken) throw new AuthError('Sessão expirada, tente novamente', 401)
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

async function forgetPassword(forgetData) {
    const { fullName, email, cpf, birthDate } = forgetData

    const userInfo = await user.findByEmail(email)

    if (fullName !== userInfo.name ||
        email !== userInfo.email ||
        cpf !== userInfo.cpf ||
        birthDate !== new Date(userInfo.date_of_birth).toISOString().split('T')[0]) throw new AuthError('Não foi possível processar solicitação', 401)
}

async function changePassword(changePasswordData) {
    const { email, password } = changePasswordData

    const userFound = await user.findByEmail(email)
    if (!userFound) throw new AuthError('Usuário não encontrado', 404)

    const passwordValidate = await bcrypt.compare(password, userFound.password_hash)
    if (passwordValidate) throw new AuthError('A senha não pode coincidir com a atual', 400)

    const password_hash = await bcrypt.hash(password, 10)
    await user.updatePassword(email, password_hash)
}

export {
    login,
    forgetPassword,
    changePassword
}