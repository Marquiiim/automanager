import express from 'express'
import {
    updateItem,
    getItem,
    listItems,
    moveStock,
    createItem,
    removeItem
} from '../controllers/stockController.js'
import {
    validateUpdateItem,
    validateGetItem,
    validateStockMovement,
    validateCreateItem,
    validateDeleteItem
} from '../middlewares/stockMiddleware.js'

const router = express.Router()

router.post('/create', validateCreateItem, createItem)
router.post('/delete', validateDeleteItem, removeItem)
router.post('/change', validateUpdateItem, updateItem)

//ROTAS ABAIXO NECESSITAM SER MUDADAS PARA GET
router.post('/fetch', validateGetItem, getItem)
router.post('/in-stock', listItems)

router.post('/movement/input', validateStockMovement, moveStock)
router.post('/movement/output', validateStockMovement, moveStock)

export default router