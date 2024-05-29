const express = require('express')
const router = express.Router()
const productController = require('../controller/productController')

// Obtener todos los productos /productos
router.get('/', productController.getAllProducts)

router.get('/destacados', productController.getAllHighlightedProducts)

// Obtener un producto por ID
router.get('/:id', productController.getProductById)

// Crear un nuevo producto
router.post('/', productController.createProduct)

// Actualizar un producto
router.put('/:id', productController.updateProduct)

// Eliminar un producto
router.delete('/:id', productController.deleteProduct)

module.exports = router
