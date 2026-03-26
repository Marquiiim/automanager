import express from 'express'
const router = express.Router()

import { loginController, forgetPasswordController, changePasswordController } from '../controllers/authController.js'
import { loginMiddleware, forgetPasswordMiddleware, changePasswordMiddleware } from '../middlewares/authMiddleware.js'

router.post('/login', loginMiddleware, loginController)

router.post('/forget-password/verify', forgetPasswordMiddleware, forgetPasswordController)
router.post('/forget-password/change', changePasswordMiddleware, changePasswordController)


export default router