import {
    filterSchema
} from "../schemas/available.schema.js";
import { z } from 'zod'

async function validateFilters(req, res, next) {
    try {
        filterSchema.parse(req.query.selectedFilters)
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
    validateFilters
}