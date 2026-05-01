import { query } from '../config/database/database.js'

const available = {
    getFilters: async () => {
        const foundFilters = await query(
            `SELECT id, name FROM categories`
        )

        if (foundFilters.length === 0) throw new Error('Não foi encontrado nenhum filtro')

        return foundFilters
    },

    filterItems: async (filters) => {
        const filtersId = filters.map(f => f.id)

        if (filtersId.length > 0) {
            const placeholders = filters.map(() => '?').join(', ')

            const foundItems = await query(
                `SELECT p.*,
                    c.name AS category_name
                FROM stock p
                    LEFT JOIN categories c ON p.category_id = c.id
                WHERE p.category_id IN (${placeholders})
                    AND p.status = 'ativo'
                    AND p.deleted_in IS null`, filtersId
            )

            if (foundItems.length === 0) throw new Error('Nenhum item encontrado com esse filtro')

            return foundItems
        }


    }
}

export default available