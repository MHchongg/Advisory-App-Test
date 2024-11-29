const express = require('express')
const { getList } = require('../controllers/userController')
const { verifyToken } = require('../middlewares/authMiddleware') 
const router = express.Router()

router.get('/listing/get', getList) //router.get('/listing/get', verifyToken, getList)

module.exports = router