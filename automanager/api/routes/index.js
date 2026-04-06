import express from 'express'
import authRoutes from './authRoutes.js'
import sessionsRoutes from './sessionsRoutes.js'
import stockRoutes from './stockRoutes.js'

const router = express.Router()

router.use('/auth', authRoutes)
router.use('/sessions', sessionsRoutes)
router.use('/stock', stockRoutes)

export default router