import express from 'express'
import authRoutes from './authRoutes.js'
import sessionsRoutes from './sessionsRoutes.js'
import stockRoutes from './stockRoutes.js'
import availableRoutes from './availableRoutes.js'
import dashboardRoutes from './dashboardRoutes.js'

const router = express.Router()

router.use('/auth', authRoutes)
router.use('/sessions', sessionsRoutes)
router.use('/stock', stockRoutes)
router.use('/available', availableRoutes)
router.use('/dashboard', dashboardRoutes)

export default router