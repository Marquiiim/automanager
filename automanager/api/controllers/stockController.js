import { changeItem, fetchItem, findAll, inputStock, outputStock } from '../services/stockService.js'

async function changeItemController(req, res) {
    try {
        await changeItem(req.body)

        return res.status(200).json({
            success: true,
            message: `Item atualizado com sucesso`
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
        const { type, ...prev } = req.body

        type === 'input' ? await inputStock(prev) :
            type === 'output' && await outputStock(prev)

        return res.status(200).json({
            success: true,
            message: 'Movimento feito com sucesso'
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export {
    changeItemController,
    fetchItemController,
    fetchAllController,
    stockMovementController
}