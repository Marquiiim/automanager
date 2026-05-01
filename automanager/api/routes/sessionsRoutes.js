import express from 'express'
import {
    validateSession,
    destroySession
} from '../controllers/sessionsController.js'

const router = express.Router()

router.post('/private-routes', validateSession)
router.post('/logout', destroySession)

export default router