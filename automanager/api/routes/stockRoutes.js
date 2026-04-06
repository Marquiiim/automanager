import express from 'express'
import { changeItemController } from '../controllers/stockController.js'
import { changeItemMiddleware } from '../middlewares/stockMiddleware.js'

const router = express.Router()

router.post('/change', changeItemMiddleware, changeItemController)
/*router.post('/fetch',)
router.post('/in-stock',)*/

export default router