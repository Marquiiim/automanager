import { z } from 'zod'

export const idGlobalSchema = z.number({
    required_error: 'Identificação é obrigatório',
    invalid_type_error: 'Identificação deve ser um número'
})
    .int('Identificação do item deve ser um número')
    .positive('Identificação do item deve ser positivo')
    .min(1, 'Identificação inválida')