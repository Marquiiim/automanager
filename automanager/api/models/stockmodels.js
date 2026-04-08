import { query } from "../config/database/database.js"

const stock = {

    findById: async (id) => {
        const rows = await query(
            `SELECT * FROM products WHERE id = ? `, [id]
        )

        if (rows.affectedRows === 0) throw new Error('Item não encontrado')

        return rows[0] || null
    },

    updateItem: async (itemData) => {

        console.log(itemData)

        const rows = await query(
            `UPDATE products`, []
        )

        if (rows.affectedRows === 0) throw new Error('Não foi possível alterar o item')
    }

}

export default stock