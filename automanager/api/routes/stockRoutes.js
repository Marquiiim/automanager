import express from 'express'
import { changeItemController, fetchItemController, fetchAllController, stockMovementController } from '../controllers/stockController.js'
import { changeItemMiddleware, fetchItemMiddleware, stockMovementMiddleware } from '../middlewares/stockMiddleware.js'

const router = express.Router()

router.post('/change', changeItemMiddleware, changeItemController)
router.post('/fetch', fetchItemMiddleware, fetchItemController)
router.post('/in-stock', fetchAllController)

router.post('/movement/input', stockMovementMiddleware, stockMovementController)
router.post('/movement/output', stockMovementMiddleware, stockMovementController)

export default router