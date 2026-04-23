import { z } from 'zod'

export const filterSchema = z.array(
    z.object({
        id: z.string().or(z.number()).transform(Number),
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