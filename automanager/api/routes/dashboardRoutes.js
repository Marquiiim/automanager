import express from 'express'

import { getMetrics } from '../controllers/dashboardController.js'

const router = express.Router()

router.get('/kpi', getMetrics)
/*router.get('/charts', chartsMetricsController)
router.get('/activy', activyUsersController)*/

export default router