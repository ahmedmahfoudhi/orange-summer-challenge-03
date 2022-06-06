const { registerUser, loginUser, getUser, updateUser, getManagers, deleteUser } = require('../controllers/AuthController')

const router = require('express').Router()
const {checkLoggedIn, checkAdmin} = require('./../middlewares/verify-token')


router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/all',checkLoggedIn,checkAdmin,getManagers)
router.get('/:id',checkLoggedIn,checkAdmin,getUser)
router.patch('/:id',checkLoggedIn,checkAdmin,updateUser)
router.delete('/:id',checkLoggedIn,checkAdmin,deleteUser)





module.exports = router

