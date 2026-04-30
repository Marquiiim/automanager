import { z } from 'zod'
import { idGlobalSchema } from '../schemas/global.schema.js';

async function deleteUserMiddleware(req, res, next) {
    try {
        idGlobalSchema.parse(req.body.user)
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
    deleteUserMiddleware
}