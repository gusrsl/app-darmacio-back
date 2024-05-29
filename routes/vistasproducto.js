const express = require('express')
const router = express.Router()
const productViewController = require('../controller/productViewController')

// Obtener todas las vistas de productos
router.get('/', productViewController.getAllProductViews)

// Obtener una vista de producto por ID
router.get('/:id', productViewController.getProductViewById)

// Crear una nueva vista de producto
router.post('/', productViewController.createProductView)

// Actualizar una vista de producto
router.put('/:id', productViewController.updateProductView)

// Eliminar una vista de producto
router.delete('/:id', productViewController.deleteProductView)

module.exports = router
