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

async function inputStock(inputData) {
    try {
        console.log('CHEGOU AQUI AQUI NO INPUTSTOCK!!!')
        console.log('Informações coletadas pelo service:', inputData)
    } catch (error) {
        throw error
    }
}

async function outputStock(outputData) {
    try {
        console.log('CHEGOU AQUI AQUI NO OUTPUTSTOCK!!!')
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