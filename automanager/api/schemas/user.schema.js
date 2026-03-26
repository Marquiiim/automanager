import { z } from 'zod'

const isValidCPF = (cpf) => {
    const cleanCPF = cpf.replace(/\D/g, '')

    if (cleanCPF.length !== 11) return false
    if (/^(\d)\1{10}$/.test(cleanCPF)) return false

    let sum = 0
    for (let i = 0; i < 9; i++) sum += parseInt(cleanCPF.charAt(i)) * (10 - i)

    let remainder = 11 - (sum % 11)
    let digit = remainder >= 10 ? 0 : remainder
    if (digit !== parseInt(cleanCPF.charAt(9))) return false

    sum = 0
    for (let i = 0; i < 10; i++) sum += parseInt(cleanCPF.charAt(i)) * (11 - i)
    remainder = 11 - (sum % 11)
    digit = remainder >= 10 ? 0 : remainder
    if (digit !== parseInt(cleanCPF.charAt(10))) return false

    return true
}


export const userSchema = z.object({
    email: z.email('Email inválido')
        .max(255, 'Email está muito longo')
        .transform(email => email.toLowerCase().trim())
        .refine(
            (email) => {
                const domain = email.split('@')[1]
                return domain === 'automanager.com'
            }, 'Domínio de email não permitido'),

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
            }, 'Senha não atende as regras do sistema.')
})

export const forgetPasswordSchema = z.object({
    fullName: z.string()
        .min(10, 'Nome completo deve ter no mínimo 10 caracteres ')
        .max(120, 'Nome completo deve ter no máximo 120 caracteres')
        .regex(/^[a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ\s]+$/, 'Nome deve conter apenas letras e espaços')
        .refine(
            (val) => {
                const parts = val.trim().split(/\s+/)
                return parts.length >= 2
            }, 'Informe o nome completo')
        .refine(
            (val) => {
                const parts = val.trim().split(/\s+/)
                return parts.every(part => part.length >= 2)
            }, 'Cada parte do nome deve ter no mínimo 2 caracteres'),

    email: z.email('Email inválido')
        .max(255, 'Email  muito longo')
        .transform(email => email.toLowerCase().trim())
        .refine(
            (email) => {
                const domain = email.split('@')[1]
                return domain === 'automanager.com'
            }, 'Domínio de email não permitido'),

    cpf: z.string()
        .transform((val) => val.replace(/\D/g, ''))
        .refine((val) => val.length === 11, 'CPF deve conter 11 dígitos')
        .refine((val) => isValidCPF(val), 'CPF inválido'),

    birthDate: z.string()
        .min(1, 'Data de nascimento é obrigatória')
        .regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato inválido')
})

export const changePasswordSchema = z.object({
    password: z.string({
        required_error: 'Senha é obrigatória',
        invalid_type_error: 'Senha deve ser uma string'
    })
        .min(6, 'Senha muito curta')
        .max(50, 'Senha muito longa')
        .refine(
            (password) => {
                const hasUpperCase = /[A-Z]/.test(password)
                const hasLowerCase = /[a-z]/.test(password)
                const hasNumbers = /\d/.test(password)
                return hasUpperCase && hasLowerCase && hasNumbers
            }, 'Senha não atende as regras do sistema.'),

    confirmPassword: z.string({
        required_error: 'Confirmação de senha é obrigatório',
        invalid_type_error: 'Confirmação de senha deve ser uma string'
    })
        .min(6, 'Senha muito curta')
        .max(50, 'Senha muito longa')
        .refine(
            (password) => {
                const hasUpperCase = /[A-Z]/.test(password)
                const hasLowerCase = /[a-z]/.test(password)
                const hasNumbers = /\d/.test(password)
                return hasUpperCase && hasLowerCase && hasNumbers
            }, 'Senha não atende as regras do sistema.')
}).refine(
    (data) => data.password !== data.confirmPassword, 'As senha não coincidem'
)