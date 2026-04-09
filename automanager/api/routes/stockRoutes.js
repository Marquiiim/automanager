import express from 'express'
import { changeItemController, fetchItemController, fetchAllController } from '../controllers/stockController.js'
import { changeItemMiddleware, fetchItemMiddleware } from '../middlewares/stockMiddleware.js'

const router = express.Router()

router.post('/change', changeItemMiddleware, changeItemController)
router.post('/fetch', fetchItemMiddleware, fetchItemController)
router.post('/in-stock', fetchAllController)
/*router.post('/new',)
router.post('/exit',)*/

export default router