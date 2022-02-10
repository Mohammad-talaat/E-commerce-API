const express = require('express')
const router = express.Router();
const {authenicateUser,authorizePermissions} = require('../middleware/authentication')

const {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword,
}= require('../controllers/userController')

router.route('/').get(authenicateUser,authorizePermissions('admin','user'),getAllUsers)
router.route('/showMe').get(authenicateUser,showCurrentUser)
router.route('/updateUser').patch(authenicateUser,updateUser)
router.route('/updateUserPassword').patch(authenicateUser,updateUserPassword)

router.route('/:id').get(authenicateUser,getSingleUser)

module.exports = router