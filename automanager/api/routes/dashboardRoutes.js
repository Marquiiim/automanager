import express from 'express'
import {
    getKpi,
    getChart,
    listUsers,
    removeUser
} from '../controllers/dashboardController.js'

import { validateDeleteUser } from '../middlewares/dashboardMiddleware.js'

const router = express.Router()

router.get('/kpis', getKpi)
router.get('/charts', getChart)

router.post('/users', listUsers)
router.delete('/users/delete', validateDeleteUser, removeUser)

//router.patch('/users/change/role', CONTROLLER)
//router.patch('/users/change/status', CONTROLLER)

//router.get('/activy', activyUsersController)

export default router