import express from 'express'
import { validateSessionController, destroySessionController } from '../controllers/sessionsController.js'

const router = express.Router()

router.post('/private-routes', validateSessionController)
router.post('/logout', destroySessionController)

export default router