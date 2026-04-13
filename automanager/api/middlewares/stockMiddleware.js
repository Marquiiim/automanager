import { updateStockSchema, fetchStockSchema, stockMovementSchema } from "../schemas/stock.schema.js";

async function changeItemMiddleware(req, res, next) {
    try {
        const { id, ...prev } = req.body

        updateStockSchema.parse(prev)
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
        const { id, ...prev } = req.body

        stockMovementSchema.parse(prev)
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
    stockMovementMiddleware
}