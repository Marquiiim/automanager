import stock from '../models/stockModels.js'

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

async function findAll() {
    try {
        const itemsFound = stock.findAll()

        return itemsFound
    } catch (error) {
        throw error
    }
}

export {
    changeItem,
    fetchItem,
    findAll
}