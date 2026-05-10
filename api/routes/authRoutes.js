import express from 'express'
import {
    loginUser,
    forgetPassword,
    updatePassword
} from '../controllers/authController.js'
import {
    login,
    validateForgetPassword,
    validateChangePassword
} from '../middlewares/authMiddleware.js'
import { authLimiter } from '../middlewares/rateLimiters.js'

const router = express.Router()

router.use(authLimiter)

router.post('/login', login, loginUser)

router.post('/forget-password/verify', validateForgetPassword, forgetPassword)
router.patch('/forget-password/change', validateChangePassword, updatePassword)


export default router