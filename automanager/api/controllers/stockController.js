import { changeItem, fetchItem } from '../services/stockService.js'

async function changeItemController(req, res) {
    try {
        const changeItemInfo = await changeItem(req.body)

        return res.status(200).json({
            success: true,
            message: `Item (${changeItemInfo.id}) - ${changeItemInfo.name} atualizado com sucesso`
        })
    } catch (error) {
        return res.status(404).json({
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
            item: itemInfo
        })
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: error.message
        })
    }
}

export {
    changeItemController,
    fetchItemController
}