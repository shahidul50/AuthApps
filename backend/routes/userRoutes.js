const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const {protect} = require('../middlewares/requireAuth')

router.post('/', userController.registerUser )
router.post('/login', userController.loginUser )
router.get('/dashboard', protect ,userController.dashboard )

module.exports = router