const express = require('express')

const userController = require('./user.controller')

//
//
//

const router = express.Router()

router.get('/', userController.findUserAll)
router.get('/:userId', userController.findUserByUserId)
router.post('/', userController.saveUser)
router.delete('/:userId', userController.deleteUserByUserId)
router.put('/:userId', userController.saveUserByUserId)

//
//
//

module.exports = router
