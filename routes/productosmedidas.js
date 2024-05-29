const express = require('express')
const router = express.Router()
const productMeasureController = require('../controller/productMeasureController')

router.get('/', productMeasureController.getAllProductMeasures)

router.get('/:id', productMeasureController.getProductMeasureById)

router.post('/', productMeasureController.createProductMeasure)

module.exports = router
