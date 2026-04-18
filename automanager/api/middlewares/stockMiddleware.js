import { jwttokens } from '../utils/jwt.js'
import { updateStockSchema, fetchStockSchema, stockMovementSchema, createItemSchema } from "../schemas/stock.schema.js";

async function changeItemMiddleware(req, res, next) {
    try {
        const { id, ...data } = req.body

        updateStockSchema.parse(data)
        next()
    } catch (error) {
        return res.status(422).json({
            success: false,
            message: error.issues[0]?.message || 'Erro ao alterar informações do produto'
        })
    }
}

async function fetchItemMiddleware(req, res, next) {
    try {
        fetchStockSchema.parse(req.body.id)
        next()
    } catch (error) {
        return res.status(422).json({
            success: false,
            message: error.issues[0]?.message || 'Erro ao alterar informações do produto'
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
        return res.status(422).json({
            success: false,
            message: error.issues[0]?.message || 'Erro ao alterar informações do produto'
        })
    }
}

async function createItemMiddleware(req, res, next) {
    try {
        createItemSchema.parse(req.body)
        next()
    } catch (error) {
        return res.status(422).json({
            success: false,
            message: error.issues[0]?.message || 'Erro ao alterar informações do produto'
        })
    }
}

export {
    changeItemMiddleware,
    fetchItemMiddleware,
    stockMovementMiddleware,
    createItemMiddleware
}