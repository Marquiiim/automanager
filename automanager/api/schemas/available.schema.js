import { z } from 'zod'

export const filterSchema = z.array(
    z.enum([
        'manutencao',
        'freios',
        'suspensao',
        'motor',
        'pneus',
        'eletrica',
        'ar_condicionado',
        'carroceria',
        'acessorios',
        'ferramentas'
    ], {
        errorMap: () => ({ message: 'Selecione uma categoria válida' })
    })
)