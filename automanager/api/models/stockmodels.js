import { query } from "../config/database/database.js"

const stock = {

    findById: async (id) => {
        const rows = await query(
            `SELECT p.*,
                c.name AS category_name,
                c.low_stock_threshold
            FROM stock p
                LEFT JOIN categories c ON p.category_id = c.id
            WHERE p.id = ? `, [id]
        )

        if (rows.affectedRows === 0) throw new Error('Item não encontrado')

        return rows[0] || null
    },

    findByPagination: async (limit, offset) => {
        const rows = await query(
            `SELECT p.*,
                c.name AS category_name
            FROM stock p
                LEFT JOIN categories c ON p.category_id = c.id
            ORDER BY p.id LIMIT ? OFFSET ?`, [limit, offset]
        )

        if (rows.affectedRows === 0) throw new Error('Nenhum item encontrado')

        return rows || null
    },

    findByMetrics: async () => {
        const rows = await query(
            `SELECT p.*,
                c.name AS category_name, 
                c.low_stock_threshold
            FROM stock p
                LEFT JOIN categories c ON p.category_id = c.id`
        )

        const totalRows = await query(
            `SELECT * FROM stock`
        )

        return {
            rows: rows || null,
            totalItems: totalRows.length
        }
    },

    updateItem: async (itemData) => {
        const { id, ...updateData } = itemData

        const rows = await query(
            `UPDATE stock SET ${Object.keys(updateData)
                .filter(key => key !== 'id')
                .map(key => `${key} = ?`).join(', ')} 
            WHERE id = ?`, [...Object.values(updateData), id]
        )

        if (rows.affectedRows === 0) throw new Error('Não foi possível alterar o item')

        return rows[0] || null
    },

    stockMovement: async (itemData, userId) => {
        let newQuantity

        const currentStock = await query(
            `SELECT current_stock FROM stock WHERE id = ?`, [itemData.id]
        )

        if (itemData.type === 'input') {
            newQuantity = currentStock[0].current_stock + itemData.quantity
        } else if (itemData.type === 'output') {
            if (currentStock[0].current_stock < itemData.quantity)
                throw new Error('Quantidade insuficiente em estoque')
            newQuantity = currentStock[0].current_stock - itemData.quantity
        } else {
            throw new Error('Tipo de movimentação inválida')
        }

        const movement = await query(
            `INSERT INTO stock_movement (item_id, type_movement, quantity, user_id, notes)
            VALUES (?, ?, ?, ?, ?)`, [itemData.id, itemData.type, itemData.quantity, userId, itemData.reason]
        )

        if (movement.affectedRows === 0) throw new Error('Não foi possível fazer essa movimentação do item')

        const itemMoved = await query(
            `UPDATE stock SET current_stock = ?
            WHERE id = ?`, [newQuantity, itemData.id]
        )

        if (itemMoved.affectedRows === 0) throw new Error('Não foi possível fazer essa movimentação do item')

        return {
            success: true,
        }
    },
}

export default stock