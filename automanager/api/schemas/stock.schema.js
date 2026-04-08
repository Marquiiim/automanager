import { z } from 'zod'

export const updateStockSchema = z.object({
    name: z.string()
        .min(3, 'Nome deve ter pelo menos 3 caracteres')
        .max(70, 'Nome deve ter no máximo 70 caracteres')
        .trim()
        .optional(),

    category: z.enum([
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
    }).optional(),

    supplier: z.string()
        .min(2, 'Nome do fornecedor deve ter pelo menos 2 caracteres')
        .max(100, 'Nome do fornecedor muito longo')
        .optional(),

    sale_price: z.coerce.number()
        .positive('Preço de venda deve ser positivo')
        .min(0.01, 'Preço deve ser no mínimo R$0,01')
        .multipleOf(0.01, 'Preço deve ter no máximo 2 casas decimais')
        .optional(),

    minimum_stock: z.coerce.number()
        .int('Estoque mínimo deve ser um número inteiro')
        .min(0, 'Estoque não pode ser negativo')
        .default(0)
        .optional()
})

export const fetchStockSchema = z.coerce.number({
    required_error: 'Identificação é obrigatório',
    invalid_type_error: 'Id deve ser um número'
})
    .int('Identificação do item deve ser um número')
    .positive('Identificação do item deve ser positivo')
    .min(1, 'Identificação inválida')