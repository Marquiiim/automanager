import user from '../models/usermodels.js'
import bcrypt from 'bcryptjs'
import { jwttokens } from '../utils/jwt.js'

async function serviceLogin(signData, token) {
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

export default serviceLogin