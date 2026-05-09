import express from 'express'
import { validateFilters } from '../middlewares/availableMiddleware.js'
import {
    getFilters,
    getfilteredItems
} from '../controllers/availableController.js'

const router = express.Router()

router.get('/getfilters', getFilters)
router.get('/filtered-items', validateFilters, getfilteredItems)

export default router