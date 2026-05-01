import { jwttokens } from '../utils/jwt.js'

export async function validateSession(access_token, refresh_token) {
    try {
        await jwttokens.verifyAccessToken(access_token)
        return { validAccess: true }
    } catch (accessError) {
        try {
            const refreshPayload = await jwttokens.verifyRefreshToken(refresh_token)

            if (!refreshPayload || !refreshPayload.id) throw new Error('Sessão expirada')

            const newAccessToken = await jwttokens.generateAccessToken({
                userId: refreshPayload.id,
                name: refreshPayload.name,
                email: refreshPayload.email,
                role: refreshPayload.role
            })

            return {
                validRefresh: true,
                newAccessToken
            }
        } catch (refreshError) {
            throw new Error('Sessão expirada. Faça login novamente')
        }
    }
}