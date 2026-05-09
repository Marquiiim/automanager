import { SessionError, AppError } from '../utils/erros.js'
import { jwttokens } from '../utils/jwt.js'
import user from '../models/usermodels.js'

export async function validateSession(access_token, refresh_token) {
    if (!access_token && !refresh_token) throw new SessionError('Token não fornecido', 401)

    if (access_token) {
        try {
            const decoded = await jwttokens.verifyAccessToken(access_token)

            const userFound = await user.findById(decoded.userId)

            if (!userFound) throw new AppError('Usuário não encontrado', 401)
            if (userFound.status === 'inativo') throw new AppError('Conta inativa', 403)

            return {
                valid: true,
                newAccessToken: null
            }
        } catch (accessError) {
            throw accessError
        }
    }

    try {
        const refreshPayload = await jwttokens.verifyRefreshToken(refresh_token)

        const userId = refreshPayload.userId

        if (!userId) throw new SessionError('Token inválido', 401)

        const userFound = await user.findById(userId)

        if (!userFound) throw new AppError('Usuário não encontrado', 401)
        if (userFound.status === 'inativo') throw new AppError('Conta inativa', 403)

        const newAccessToken = await jwttokens.generateAccessToken({
            userId: userFound.id,
            name: userFound.name,
            email: userFound.email,
            role: userFound.role
        })

        return { valid: true, newAccessToken }

    } catch (refreshError) {
        throw refreshError
    }
}