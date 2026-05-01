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

router.post('/login', loginUser, login)

router.post('/forget-password/verify', validateForgetPassword, forgetPassword)
router.post('/forget-password/change', validateChangePassword, updatePassword
)


export default router