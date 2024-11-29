const express = require('express')
const { login, index} = require('../controllers/authController')
const router = express.Router()

router.get('/', index)
router.post('/auth/login', login)

module.exports = router