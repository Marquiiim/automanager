import { z } from 'zod'

export const stockSchema = z.object({
    name: z.string()
        .min(3, 'Nome deve ter pelo menos 3 caracteres')
        .max(70, 'Nome deve ter no máximo 70 caracteres')
        .trim(),

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
    }),

    supplier: z.string()
        .min(2, 'Nome do fornecedor deve ter pelo menos 2 caracteres')
        .max(100, 'Nome do fornecedor muito longo'),

    sale_price: z.coerce.number()
        .positive('Preço de venda deve ser positivo')
        .min(0.01, 'Preço deve ser no mínimo R$0,01')
        .multipleOf(0.01, 'Preço deve ter no máximo 2 casas decimais'),

    minimum_stock: z.coerce.number()
        .int('Estoque mínimo deve ser um número inteiro')
        .min(0, 'Estoque não pode ser negativo')
        .default(0)
})