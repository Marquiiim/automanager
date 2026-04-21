import {
    changeItem,
    fetchItem,
    findAll,
    stockMovement,
    createItem,
    deleteItem
} from '../services/stockService.js'

async function updateItemController(req, res) {
    try {
        await changeItem(req.body)

        return res.status(200).json({
            success: true,
            message: 'Item atualizado com sucesso'
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

async function fetchItemController(req, res) {
    try {
        const itemInfo = await fetchItem(req.body.id)

        return res.status(200).json({
            success: true,
            result: itemInfo
        })
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: error.message
        })
    }
}

async function fetchAllController(req, res) {
    try {
        const { page, limit } = req.body

        const itemsFound = await findAll(page, limit)

        return res.status(200).json({
            success: true,
            result: itemsFound
        })
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: error.message
        })
    }
}

async function stockMovementController(req, res) {
    try {
        await stockMovement(req.body, req.user)

        return res.status(200).json({
            success: true,
            message: 'Movimentação feito com sucesso'
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

async function createItemController(req, res) {
    try {
        await createItem(req.body)

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

async function deleteItemController(req, res) {
    try {
        await deleteItem(req.body.id)

        return res.status(200).json({
            success: true,
            message: 'Item deletado com sucesso'
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export {
    updateItemController,
    fetchItemController,
    fetchAllController,
    stockMovementController,
    createItemController,
    deleteItemController
}