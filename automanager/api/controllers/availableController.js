import * as availableService from '../services/availableService.js'

async function getFilters(req, res) {
    try {
        const filters = await availableService.getFilters()

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

async function getfilteredItems(req, res) {
    try {
        const filteredItems = await availableService.filterItems(req.query.selectedFilters)

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
    getFilters,
    getfilteredItems
}