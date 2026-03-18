import { z } from 'zod'

export const userSchema = z.object({
    email: z.email('Email inválido')
        .max(255, 'Email está muito longo')
        .transform(email => email.toLowerCase().trim())
        .refine(
            (email) => {
                const domain = email.split('@')[1]
                return domain === 'automanager.com'
            },
            {
                message: 'Domínio de email não permitido'
            }
        ),

    password: z.string({
        required_error: 'Senha é obrigatória',
        invalid_type_error: 'Senha deve ser uma string'
    })
        .min(6, 'Senha inválida')
        .max(50, 'Senha inválida')
        .refine(
            (password) => {
                const hasUpperCase = /[A-Z]/.test(password)
                const hasLowerCase = /[a-z]/.test(password)
                const hasNumbers = /\d/.test(password)
                return hasUpperCase && hasLowerCase && hasNumbers
            },
            {
                message: 'Senha não atende as regras do sistema.'
            }
        )
})