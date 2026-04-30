import stock from '../models/stockmodels.js'
import dataBaseMetrics from '../utils/databaseMetrics.js'

async function changeItemService(itemData) {
    try {
        await stock.updateItem(itemData)
    } catch (error) {
        throw error
    }
}

async function fetchItemService(itemId) {
    try {
        const ItemInfo = stock.findById(itemId)
        return ItemInfo
    } catch (error) {
        throw error
    } Service
}

async function findAllService(page, limit) {
    try {
        const offset = (page - 1) * limit

        const itemsForPagination = await stock.findByPagination(limit, offset)
        const itemsForMetricsCalculation = await stock.searchForMetrics()
        const calculationsMetrics = await dataBaseMetrics(itemsForMetricsCalculation)

        return {
            paginatedItems: itemsForPagination,
            metricsResult: calculationsMetrics
        }
    } catch (error) {
        throw error
    }
}

async function stockMovementService(movementData, userId) {
    try {
        await stock.stockMovement(movementData, userId)
    } catch (error) {
        throw error
    }
}

async function createItemService(itemData) {
    try {
        await stock.createItem(itemData)
    } catch (error) {
        throw error
    }
}

async function deleteItemService(itemId) {
    try {
        await stock.deleteItem(itemId)
    } catch (error) {
        throw error
    }
}

export {
    changeItemService,
    fetchItemService,
    findAllService,
    stockMovementService,
    createItemService,
    deleteItemService
}