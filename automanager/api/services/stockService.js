import stock from '../models/stockmodels.js'
import dataBaseMetrics from '../utils/databaseMetrics.js'

async function updateItem(itemData) {
    try {
        await stock.update(itemData)
    } catch (error) {
        throw error
    }
}

async function getItem(itemId) {
    try {
        const ItemInfo = stock.findById(itemId)
        return ItemInfo
    } catch (error) {
        throw error
    } Service
}

async function findAll(page, limit) {
    try {
        const offset = (page - 1) * limit

        const itemsForPagination = await stock.findAll(limit, offset)
        const itemsForMetricsCalculation = await stock.getMetrics()
        const calculationsMetrics = await dataBaseMetrics(itemsForMetricsCalculation)

        return {
            paginatedItems: itemsForPagination,
            metricsResult: calculationsMetrics
        }
    } catch (error) {
        throw error
    }
}

async function moveStock(movementData, userId) {
    try {
        await stock.move(movementData, userId)
    } catch (error) {
        throw error
    }
}

async function createItem(itemData) {
    try {
        await stock.create(itemData)
    } catch (error) {
        throw error
    }
}

async function removeItem(itemId) {
    try {
        await stock.remove(itemId)
    } catch (error) {
        throw error
    }
}

export {
    updateItem,
    getItem,
    findAll,
    moveStock,
    createItem,
    removeItem
}