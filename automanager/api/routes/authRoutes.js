import express from 'express'
const router = express.Router()

import authController from '../controllers/authController.js'
import authMiddleware from '../middlewares/authMiddleware.js'

router.post('/login', authMiddleware, authController)

export default router