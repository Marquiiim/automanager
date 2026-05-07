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

router.get('/in-stock', listItems)
router.get('/fetch', validateGetItem, getItem)

router.patch('/movement/input', validateStockMovement, moveStock)
router.patch('/movement/output', validateStockMovement, moveStock)

export default router