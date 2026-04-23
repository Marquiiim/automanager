import { query } from '../config/database/database.js'

const available = {
    getFilters: async () => {
        const foundFilters = await query(
            `SELECT id, name FROM categories`
        )

        if (foundFilters === 0) throw new Error('Não foi encontrado nenhum filtro')

        return foundFilters
    }
}

export default available