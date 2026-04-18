import express from 'express'
import { changeItemController, fetchItemController, fetchAllController, stockMovementController, createItemController } from '../controllers/stockController.js'
import { changeItemMiddleware, fetchItemMiddleware, stockMovementMiddleware, createItemMiddleware } from '../middlewares/stockMiddleware.js'

const router = express.Router()

router.post('/create', createItemMiddleware, createItemController)
router.post('/change', changeItemMiddleware, changeItemController)
router.post('/fetch', fetchItemMiddleware, fetchItemController)
router.post('/in-stock', fetchAllController)

router.post('/movement/input', stockMovementMiddleware, stockMovementController)
router.post('/movement/output', stockMovementMiddleware, stockMovementController)

export default router