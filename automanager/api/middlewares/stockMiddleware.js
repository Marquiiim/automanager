import { jwttokens } from '../utils/jwt.js'
import {
    updateStockSchema,
    stockMovementSchema,
    createItemSchema
} from "../schemas/stock.schema.js";
import { idGlobalSchema } from '../schemas/global.schema.js';
import { z } from 'zod'

async function updateItemMiddleware(req, res, next) {
    try {
        const { id, ...data } = req.body

        updateStockSchema.parse(data)
        next()
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(422).json({
                success: false,
                message: error.issues[0]?.message || 'Erro de validação',
                details: error.issues
            });
        }

        return res.status(500).json({
            success: false,
            message: error.message || 'Erro interno do servidor'
        })
    }
}

async function fetchItemMiddleware(req, res, next) {
    try {
        idGlobalSchema.parse(req.body.id)
        next()
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(422).json({
                success: false,
                message: error.issues[0]?.message || 'Erro de validação',
                details: error.issues
            });
        }

        return res.status(500).json({
            success: false,
            message: error.message || 'Erro interno do servidor'
        })
    }
}

async function stockMovementMiddleware(req, res, next) {
    try {
        const { id, ...data } = req.body
        const { access_token } = req.cookies

        if (!access_token) return res.status(401).json({ success: false, message: 'Você não está autenticado' })

        const payload = await jwttokens.verifyAccessToken(access_token)
        if (!payload?.userId) return res.status(401).json({ success: false, message: 'Sessão inválida' })
        req.user = payload.userId

        stockMovementSchema.parse(data)
        next()
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(422).json({
                success: false,
                message: error.issues[0]?.message || 'Erro de validação',
                details: error.issues
            });
        }

        return res.status(500).json({
            success: false,
            message: error.message || 'Erro interno do servidor'
        })
    }
}

async function createItemMiddleware(req, res, next) {
    try {
        createItemSchema.parse(req.body)
        next()
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(422).json({
                success: false,
                message: error.issues[0]?.message || 'Erro de validação',
                details: error.issues
            });
        }

        return res.status(500).json({
            success: false,
            message: error.message || 'Erro interno do servidor'
        })
    }
}

async function deleteItemMiddleware(req, res, next) {
    try {
        idGlobalSchema.parse(req.body.id)
        next()
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(422).json({
                success: false,
                message: error.issues[0]?.message || 'Erro de validação',
                details: error.issues
            });
        }

        return res.status(500).json({
            success: false,
            message: error.message || 'Erro interno do servidor'
        })
    }
}

export {
    updateItemMiddleware,
    fetchItemMiddleware,
    stockMovementMiddleware,
    createItemMiddleware,
    deleteItemMiddleware
}