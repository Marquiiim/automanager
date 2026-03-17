import { z } from 'zod'

export const userSchema = z.object({
    email: z.email('Email inválido')
        .and(z.string().max(255))
        .transform(email => email.toLowerCase().trim()),

    password: z.string()
        .min(6, 'Senha inválida')
        .max(50, 'Senha inválida')
})