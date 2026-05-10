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

const router = express.Router()

router.post('/login', login, loginUser)

router.post('/forget-password/verify', validateForgetPassword, forgetPassword)
router.patch('/forget-password/change', validateChangePassword, updatePassword)


export default router