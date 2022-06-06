const { addProduct, getOneProduct, getAllProducts, updateProduct, deleteProduct } = require('../controllers/productController');

const router = require('express').Router();
const {checkLoggedIn} = require('./../middlewares/verify-token')

router.post('',checkLoggedIn,addProduct)
router.get('/all',checkLoggedIn,getAllProducts)
router.patch('/:id',checkLoggedIn,updateProduct)
router.delete('/:id',checkLoggedIn,deleteProduct)
router.get('/:id',checkLoggedIn,getOneProduct)

module.exports = router;