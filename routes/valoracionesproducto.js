const express = require('express')
const router = express.Router()
const productRatingController = require('../controller/productRatingController')

// Obtener todas las valoraciones de productos
router.get('/', productRatingController.getAllProductRatings)

// Obtener una valoración de producto por ID
router.get('/:id', productRatingController.getProductRatingById)

// Crear una nueva valoración de producto
router.post('/', productRatingController.createProductRating)

// Actualizar una valoración de producto
router.put('/:id', productRatingController.updateProductRating)

// Eliminar una valoración de producto
router.delete('/:id', productRatingController.deleteProductRating)

module.exports = router
