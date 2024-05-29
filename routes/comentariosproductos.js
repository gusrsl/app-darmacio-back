const express = require('express')
const router = express.Router()
const comentariosProductosController = require('../controller/commentProducts')

// Obtener todos los comentarios de productos
router.get('/', comentariosProductosController.getAllProductComments)

// Obtener un comentario de producto por ID
router.get('/:id', comentariosProductosController.getProductCommentById)

// Crear un nuevo comentario de producto
router.post('/', comentariosProductosController.createProductComment)

// Actualizar un comentario de producto
router.put('/:id', comentariosProductosController.updateProductComment)

// Eliminar un comentario de producto
router.delete('/:id', comentariosProductosController.deleteProductComment)

module.exports = router
