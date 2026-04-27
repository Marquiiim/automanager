import { query } from "../config/database/database.js"

const stock = {
    findById: async (itemId) => {
        const result = await query(
            `SELECT p.*,
                c.name AS category_name,
                c.low_stock_threshold
            FROM stock p
                LEFT JOIN categories c ON p.category_id = c.id
            WHERE p.id = ? `, [itemId]
        )

        if (result.length === 0) throw new Error('Item não encontrado')

        return result[0]
    },

    findByPagination: async (limit, offset) => {
        const result = await query(
            `SELECT p.*,
                c.name AS category_name
            FROM stock p
                LEFT JOIN categories c ON p.category_id = c.id
            WHERE p.status = 'ativo'
            ORDER BY p.id LIMIT ? OFFSET ?`, [limit, offset]
        )

        if (result.length === 0) throw new Error('Nenhum item encontrado')

        return result
    },

    searchForMetrics: async () => {
        const result = await query(
            `SELECT p.*,
                c.name AS category_name, 
                c.low_stock_threshold
            FROM stock p
                LEFT JOIN categories c ON p.category_id = c.id
            WHERE status = 'ativo'`
        )

        const totalRows = await query(
            `SELECT * FROM stock`
        )

        return {
            result: result,
            totalItems: totalRows.length
        }
    },

    updateItem: async (itemData) => {
        const { id, ...updateData } = itemData

        const getLocation = await query(
            `SELECT location FROM stock
            WHERE id = ?`, [id]
        )

        const locationVerify = await query(
            `SELECT COUNT(*) FROM stock
            WHERE location = ?`, [getLocation[0].location]
        )

        if (locationVerify > 0) throw new Error('Localização já ocupada por um item')

        const result = await query(
            `UPDATE stock SET ${Object.keys(updateData)
                .filter(key => key !== 'id')
                .map(key => `${key} = ?`).join(', ')} 
            WHERE id = ?`, [...Object.values(updateData), id]
        )

        if (result.affectedRows === 0) throw new Error('Não foi possível alterar o item')

        return result[0]
    },

    stockMovement: async (itemData, userId) => {
        let newQuantity

        const itemInformation = await query(
            `SELECT current_stock, cost, sale_price  FROM stock WHERE id = ?`, [itemData.id]
        )

        if (itemData.type === 'input') {
            newQuantity = itemInformation[0].current_stock + itemData.quantity
        } else if (itemData.type === 'output') {
            if (itemInformation[0].current_stock < itemData.quantity)
                throw new Error('Quantidade insuficiente em estoque')
            newQuantity = itemInformation[0].current_stock - itemData.quantity
        } else {
            throw new Error('Tipo de movimentação inválida')
        }

        const movement = await query(
            `INSERT INTO stock_movement (item_id, type_movement, quantity, cost, unit_value, user_id, notes)
            VALUES (?, ?, ?, ?, ?, ?, ?)`, [itemData.id, itemData.type, itemData.quantity, itemInformation[0].cost, itemInformation[0].sale_price, userId, itemData.reason]
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

    createItem: async (itemData) => {
        const itemExisting = await query(
            `SELECT COUNT(*) as total 
            FROM stock s
            JOIN categories c ON s.category_id = c.id
            WHERE s.name = ? AND s.supplier = ? AND c.name = ?`, [itemData.name, itemData.supplier, itemData.category_name]
        )

        if (itemExisting[0].total > 0) throw new Error('Item já existente no sistema, faça uma busca e verifique')

        const locationVerify = await query(
            `SELECT COUNT(*) FROM stock
            WHERE location = ?`, [itemData.location]
        )

        if (locationVerify > 0) throw new Error('Localização já ocupada por um item')

        const createItem = await query(
            `INSERT INTO stock (name, category_id, supplier, sale_price, current_stock, location)
            SELECT ?, c.id, ?, ?, ?, ?
            FROM categories c
            WHERE c.name = ?`, [itemData.name, itemData.supplier, itemData.sale_price, itemData.current_stock, itemData.location, itemData.category_name]
        )

        if (createItem.affectedRows === 0) throw new Error('Não foi possível criar este item')

        return createItem[0]
    },

    deleteItem: async (itemId) => {
        const check = await query(
            `SELECT status, deleted_in FROM stock
            WHERE id = ?`, [itemId]
        )

        if (!check || check.lenght === 0) throw new Error('Item não encontrado')
        if (check[0].status !== 'ativo') throw new Error('Item já está inativo')
        if (check[0].deleted_in !== null) throw new Error('Item já foi deletado anteriormente')

        const result = await query(
            `UPDATE stock
                SET status = 'inativo',
                    deleted_in = NOW(),
                    location = null
            WHERE id = ?
                AND status = 'ativo'
                AND deleted_in IS NULL`, [itemId]
        )

        if (result.affectedRows === 0) throw new Error('Não foi possível deletar este item')

        return result
    }
}

export default stock