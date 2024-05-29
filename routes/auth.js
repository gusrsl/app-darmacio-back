const express = require('express')
const authController = require('../controller/authController')
const userController = require('../controller/userController')

const router = express.Router()

router
  .post('/register', userController.registerUser)
  .post('/login', authController.loginUser)

module.exports = router
