const express = require('express')
const router = express.Router()
const productLikeController = require('../controller/productLikeController')

// Obtener todos los "me gusta" de productos
router.get('/', productLikeController.getAllProductLikes)

// Obtener un "me gusta" de producto por ID
router.get('/:id', productLikeController.getProductLikeById)

// Crear un nuevo "me gusta" de producto
router.post('/', productLikeController.createProductLike)

// Actualizar un "me gusta" de producto
router.put('/:id', productLikeController.updateProductLike)

// Eliminar un "me gusta" de producto
router.delete('/:id', productLikeController.deleteProductLike)

module.exports = router
