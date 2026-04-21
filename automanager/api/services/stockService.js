import stock from '../models/stockmodels.js'
import dataBaseMetrics from '../utils/databaseMetrics.js'

async function changeItem(itemData) {
    try {
        await stock.updateItem(itemData)
    } catch (error) {
        throw error
    }
}

async function fetchItem(itemId) {
    try {
        const ItemInfo = stock.findById(itemId)
        return ItemInfo
    } catch (error) {
        throw error
    }
}

async function findAll(page, limit) {
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

async function stockMovement(movementData, userId) {
    try {
        await stock.stockMovement(movementData, userId)
    } catch (error) {
        throw error
    }
}

async function createItem(itemData) {
    try {
        await stock.createItem(itemData)
    } catch (error) {
        throw error
    }
}

async function deleteItem(itemId) {
    try {
        await stock.deleteItem(itemId)
    } catch (error) {
        throw error
    }
}

export {
    changeItem,
    fetchItem,
    findAll,
    stockMovement,
    createItem,
    deleteItem
}