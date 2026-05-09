import available from '../models/availablemodels.js'

async function getFilters() {
    try {
        const data = await available.getFilters()

        return {
            found: data
        }
    } catch (error) {
        throw error
    }
}

async function filterItems(filters) {
    try {
        const data = await available.filterItems(filters)

        return {
            found: data
        }
    } catch (error) {
        throw error
    }
}

export {
    getFilters,
    filterItems
}