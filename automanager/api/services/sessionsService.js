import { jwttokens } from '../utils/jwt.js'

export async function validate(access_token, refresh_token) {
    try {
        await jwttokens.verifyAccessToken(access_token)
        return { validAccess: true }
    } catch (accessError) {
        try {
            const isValidRefresh = await jwttokens.verifyRefreshToken(refresh_token)

            if (!isValidRefresh) throw new Error('Sessão expirada')

            const newAccess = await jwttokens.generateAccessToken({
                userId: isValidRefresh.id,
                name: isValidRefresh.name,
                email: isValidRefresh.email,
                role: isValidRefresh.role
            })

            return {
                validRefresh: true,
                newAccess
            }
        } catch (refreshError) {
            throw new Error('Sessão expirada')
        }
    }
}