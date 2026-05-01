import * as stockService from '../services/stockService.js'

async function updateItem(req, res) {
    try {
        await stockService.updateItem(req.body)

        return res.status(200).json({
            success: true,
            message: 'Item atualizado com sucesso'
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

async function getItem(req, res) {
    try {
        const itemInfo = await stockService.getItem(req.body.id)

        return res.status(200).json({
            success: true,
            result: itemInfo
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

async function listItems(req, res) {
    try {
        const { page, limit } = req.body

        const itemsFound = await stockService.findAll(page, limit)

        return res.status(200).json({
            success: true,
            result: itemsFound
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

async function moveStock(req, res) {
    try {
        await stockService.moveStock(req.body, req.user)

        return res.status(200).json({
            success: true,
            message: 'Movimentação feito com sucesso'
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

async function createItem(req, res) {
    try {
        await stockService.createItem(req.body)

        return res.status(200).json({
            success: true,
            message: 'Item criado com sucesso'
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

async function removeItem(req, res) {
    try {
        await stockService.removeItem(req.body.id)

        return res.status(200).json({
            success: true,
            message: 'Item deletado com sucesso'
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export {
    updateItem,
    getItem,
    listItems,
    moveStock,
    createItem,
    removeItem
}