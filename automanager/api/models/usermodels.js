import { query } from '../config/database/database.js'

const user = {
    findByEmail: async (email) => {
        const rows = await query(
            `SELECT * FROM users WHERE email = ?`, [email]
        )
        return rows[0] || null
    },

    findById: async (id) => {
        const rows = await query(
            `SELECT * FROM users WHERE id = ?`, [id]
        )
        return rows[0] || null
    }
}

export default user