import express from 'express'
import authRoutes from './authRoutes.js'
import sessionsRoutes from './sessionsRoutes.js'

const router = express.Router()

router.use('/auth', authRoutes)
router.use('/sessions', sessionsRoutes)

export default router