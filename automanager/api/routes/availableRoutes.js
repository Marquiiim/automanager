import express from 'express'

import { filteredItemsMiddleware } from '../middlewares/availableMiddleware.js'
import { getFiltersController, filteredItemsController } from '../controllers/availableController.js'

const router = express.Router()

router.get('/getfilters', getFiltersController)
router.get('/filtered-items', filteredItemsMiddleware, filteredItemsController)

export default router