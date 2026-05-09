import { query } from '../config/database/database.js'
import { AppError } from '../utils/erros.js'

const user = {
    findByEmail: async (email) => {
        const rows = await query(
            `SELECT * FROM users WHERE email = ?`, [email]
        )

        if (rows.length === 0) return null

        return rows[0]
    },

    findById: async (id) => {
        const rows = await query(
            `SELECT * FROM users WHERE id = ?`, [id]
        )

        if (rows.length === 0) throw new AppError('Usuário não encontrado', 401)
        if (rows[0].status === 'inativo') throw new AppError('Conta inativa', 403)

        return rows[0]
    },

    updatePassword: async (email, password_hash) => {
        const rows = await query(
            `UPDATE users SET password_hash = ? WHERE email = ?`, [password_hash, email]
        )

        if (rows.affectedRows === 0) throw new AppError('Não foi possível fazer a alteração da senha', 400)

        return rows[0]
    }
}

export default user