import { query } from '../config/database/database.js'

const user = {
    findByEmail: async (email) => {
        const rows = await query(
            `SELECT * FROM users WHERE email = ?`, [email]
        )

        if (rows.length === 0) throw new Error('Usuário não encontrado')

        return rows[0]
    },

    findById: async (id) => {
        const rows = await query(
            `SELECT * FROM users WHERE id = ?`, [id]
        )

        if (rows.length === 0) throw new Error('Usuário não encontrado')

        return rows[0]
    },

    updatePassword: async (email, password_hash) => {
        const rows = await query(
            `UPDATE users SET password_hash = ? WHERE email = ?`, [password_hash, email]
        )

        if (rows.affectedRows === 0) throw new Error('Não foi possível fazer a alteração da senha')

        return rows[0]
    }
}

export default user