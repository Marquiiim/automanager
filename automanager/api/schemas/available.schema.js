import { z } from 'zod'

export const filterSchema = z.array(
    z.object({
        id: z.coerce.number({
            required_error: 'Identificação é obrigatório',
            invalid_type_error: 'Identificação deve ser um número'
        })
            .int('Identificação do item deve ser um número')
            .positive('Identificação do item deve ser positivo')
            .min(1, 'Identificação inválida'),

        name: z.enum([
            'Acessorios',
            'Ar Condicionado',
            'Carroceria',
            'Eletrica',
            'Ferramentas',
            'Freios',
            'Manutencao',
            'Motor',
            'Pneus',
            'Suspensao',
        ], {
            errorMap: () => ({ message: 'Selecione uma categoria válida' })
        })
    })).optional()
    .default([])