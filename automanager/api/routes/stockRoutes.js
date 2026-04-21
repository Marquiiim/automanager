import express from 'express'
import {
    updateItemController,
    fetchItemController,
    fetchAllController,
    stockMovementController,
    createItemController,
    deleteItemController
} from '../controllers/stockController.js'
import {
    updateItemMiddleware,
    fetchItemMiddleware,
    stockMovementMiddleware,
    createItemMiddleware,
    deleteItemMiddleware
} from '../middlewares/stockMiddleware.js'

const router = express.Router()

router.post('/create', createItemMiddleware, createItemController)
router.post('/delete', deleteItemMiddleware, deleteItemController)
router.post('/change', updateItemMiddleware, updateItemController)
router.post('/fetch', fetchItemMiddleware, fetchItemController)
router.post('/in-stock', fetchAllController)

router.post('/movement/input', stockMovementMiddleware, stockMovementController)
router.post('/movement/output', stockMovementMiddleware, stockMovementController)

export default router