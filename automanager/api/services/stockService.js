import stock from '../models/stockModels.js'

async function changeItem(itemData) {
    try {
        console.log('CHEGOU NO SERVICE!!!')
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

export {
    changeItem,
    fetchItem
}