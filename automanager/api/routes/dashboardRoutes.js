import express from 'express'

import {
    getKpi,
    getChart,
    getUsers,
    deleteUser
} from '../controllers/dashboardController.js'

import { deleteUserMiddleware } from '../middlewares/dashboardMiddleware.js'

const router = express.Router()

router.get('/kpis', getKpi)
router.get('/charts', getChart)

router.post('/users', getUsers)
router.delete('/users/delete', deleteUserMiddleware, deleteUser)

//router.patch('/users/change/role', CONTROLLER)
//router.patch('/users/change/status', CONTROLLER)

//router.get('/activy', activyUsersController)

export default router