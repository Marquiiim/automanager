import {
    getFilters,
    fetchItemsFilter
} from '../services/availableService.js'

async function getFiltersController(req, res) {
    try {
        const filters = await getFilters()

        return res.status(200).json({
            success: true,
            filters: filters.found
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

async function filteredItemsController(req, res) {
    try {
        const filteredItems = await fetchItemsFilter(req.query.selectedFilters)

        return res.status(200).json({
            success: true,
            items: filteredItems.found
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export {
    getFiltersController,
    filteredItemsController
}