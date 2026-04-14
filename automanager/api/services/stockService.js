import stock from '../models/stockmodels.js'
import dataBaseMetrics from '../utils/databaseMetrics.js'

async function changeItem(itemData) {
    try {
        await stock.updateItem(itemData)

        return {
            id: itemData.id,
            name: itemData.name
        }

    } catch (error) {
        throw error
    }
}

async function fetchItem(id) {
    try {
        const ItemInfo = stock.findById(id)
        return ItemInfo
    } catch (error) {
        throw error
    }
}

async function findAll(page, limit) {
    try {
        const offset = (page - 1) * limit

        const itemsForPagination = await stock.findByPagination(limit, offset)
        const itemsForMetricsCalculation = await stock.findByMetrics()

        const calculationsMetrics = await dataBaseMetrics(itemsForMetricsCalculation)

        return {
            paginatedItems: itemsForPagination,
            metricsResult: calculationsMetrics
        }
    } catch (error) {
        throw error
    }
}

async function inputStock(inputData) {
    try {
        console.log('CHEGOU AQUI NO INPUTSTOCK!!!')
        console.log('Informações coletadas pelo service:', inputData)
    } catch (error) {
        throw error
    }
}

async function outputStock(outputData) {
    try {
        console.log('CHEGOU AQUI NO OUTPUTSTOCK!!!')
        console.log('Informações coletadas pelo service:', outputData)
    } catch (error) {
        throw error
    }
}

export {
    changeItem,
    fetchItem,
    findAll,
    inputStock,
    outputStock
}