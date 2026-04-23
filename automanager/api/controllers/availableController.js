import { getFilters } from '../services/availableService.js'

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
        console.log('CHEGOU NO CONTROLLER')

        return res.status(200).json({
            success: true,
            items: ''
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