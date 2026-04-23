import {
    filterSchema
} from "../schemas/available.schema.js";

async function filteredItemsMiddleware(req, res, next) {
    try {
        filterSchema.parse(req.query.selectedFilters)
        next()
    } catch (error) {
        return res.status(422).json({
            success: false,
            message: error.issues[0]?.message || 'Erro ao buscar itens'
        })
    }
}

export {
    filteredItemsMiddleware
}