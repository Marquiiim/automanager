const express = require('express')
const router = express.Router()

const { controllerLogin } = require('../controllers/controllerLogin')
const { middlewareLogin } = require('../middlewares/middlewareLogin')

router.post('/login', middlewareLogin, controllerLogin)

module.exports = router