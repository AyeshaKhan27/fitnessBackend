const productController = require('../controllers/productsController.js')
const router = require('express').Router()


router.post('/addProduct', productController.addProduct)
router.get('/getAllproduct', productController.getAllproduct)

router.put('/:id', productController. updateProduct)
router.delete('/:id', productController.deleteProduct)

module.exports = router