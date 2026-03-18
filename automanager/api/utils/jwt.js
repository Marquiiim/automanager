import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const JWT_CONFIG = {
    accessToken: {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN || '15m',
        issuer: process.env.JWT_ISSUER,
        audience: process.env.JWT_AUDIENCE
    },
    refreshToken: {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
        issuer: process.env.JWT_ISSUER,
        audience: process.env.JWT_AUDIENCE
    }
}

export const jwttokens = {
    generateAccessToken: async (payload) => {
        return jwt.sign(payload, JWT_CONFIG.accessToken.secret, {
            expiresIn: JWT_CONFIG.accessToken.expiresIn,
            issuer: JWT_CONFIG.accessToken.issuer,
            audience: JWT_CONFIG.accessToken.audience
        })
    },

    generateRefreshToken: async (payload) => {
        return jwt.sign(payload, JWT_CONFIG.refreshToken.secret, {
            expiresIn: JWT_CONFIG.refreshToken.expiresIn,
            issuer: JWT_CONFIG.refreshToken.issuer,
            audience: JWT_CONFIG.refreshToken.audience
        })
    },

    verifyAccessToken: async (token) => {
        try {
            return jwt.verify(token, JWT_CONFIG.accessToken.secret, {
                issuer: JWT_CONFIG.accessToken.issuer,
                audience: JWT_CONFIG.accessToken.audience
            })
        } catch (error) {
            throw new Error('Sessão expirada, tente novamente.')
        }
    },

    verifyRefreshToken: async (token) => {
        try {
            return jwt.verify(token, JWT_CONFIG.refreshToken.secret, {
                issuer: JWT_CONFIG.refreshToken.issuer,
                audience: JWT_CONFIG.refreshToken.audience
            })
        } catch (error) {
            throw new Error('Sessão expirada, tente novamente.')
        }
    }
}