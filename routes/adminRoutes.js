const express = require('express')
const { index, store, edit, update, destroy } = require('../controllers/adminController')
const { verifyToken, verifyAdmin } = require("../middlewares/authMiddleware")
const router = express.Router()

router.get('/listing', verifyToken, verifyAdmin, index)
router.post('/listing', verifyToken, verifyAdmin, store)
router.get('/listing/:id', verifyToken, verifyAdmin, edit)
router.patch('/listing/:id', verifyToken, verifyAdmin, update)
router.delete('/listing/:id', verifyToken, verifyAdmin, destroy)

module.exports = router