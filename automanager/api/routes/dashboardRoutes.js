import express from 'express'
import {
    getKpi,
    getChart,
    listUsers,
    removeUser,
    disableUser,
    getUsersActivity
} from '../controllers/dashboardController.js'

import { globalValidateUser } from '../middlewares/dashboardMiddleware.js'
import { validateSession } from '../middlewares/validateSessionMiddleware.js'

const router = express.Router()

router.use(validateSession)

router.get('/kpis', getKpi)
router.get('/charts', getChart)

router.post('/users', listUsers)

router.delete('/users/delete/:id', globalValidateUser, removeUser)
router.patch('/users/disable/:id', globalValidateUser, disableUser)

router.get('/users/activity', getUsersActivity)

export default router