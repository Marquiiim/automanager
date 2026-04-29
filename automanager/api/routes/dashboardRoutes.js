import express from 'express'

import {
    getKpi,
    getChart
} from '../controllers/dashboardController.js'

const router = express.Router()

router.get('/kpis', getKpi)
router.get('/charts', getChart)
//router.get('/activy', activyUsersController)

export default router