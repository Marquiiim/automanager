import { stockSchema } from "../schemas/stock.schema.js";

async function changeItemMiddleware(req, res, next) {
    try {
        stockSchema.parse(req.body)
        next()
    } catch (error) {
        return res.status(422).json({
            success: false,
            message: error.issues[0]?.message || 'Erro ao alterar informações do produto'
        })
    }
}

export {
    changeItemMiddleware
}