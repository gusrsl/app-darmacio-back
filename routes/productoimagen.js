const express = require('express')
const router = express.Router()
const productImageController = require('../controller/productImageController')

router.get('/', productImageController.getAllProductImages)

router.get('/:id', productImageController.getProductImageById)

router.post('/', productImageController.createProductImage)

module.exports = router
