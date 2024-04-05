const express = require('express');
const router = express.Router();
const productCommentService = require('../service/comentariosproductoService');

// Obtener todos los comentarios de productos
router.get('/', async (req, res) => {
    const productComments = await productCommentService.getAllProductComments();
    res.json(productComments);
});

// Obtener un comentario de producto por ID
router.get('/:id', async (req, res) => {
    const productComment = await productCommentService.getProductCommentById(req.params.id);
    if (productComment) {
        res.json(productComment);
    } else {
        res.status(404).send('Comentario de producto no encontrado');
    }
});

// Crear un nuevo comentario de producto
router.post('/', async (req, res) => {
    const newProductComment = req.body;
    const createdProductComment = await productCommentService.createProductComment(newProductComment);
    res.status(201).json(createdProductComment);
});

// Actualizar un comentario de producto
router.put('/:id', async (req, res) => {
    const updatedProductComment = req.body;
    const result = await productCommentService.updateProductComment(req.params.id, updatedProductComment);
    if (result) {
        res.json(result);
    } else {
        res.status(404).send('Comentario de producto no encontrado');
    }
});

// Eliminar un comentario de producto
router.delete('/:id', async (req, res) => {
    const result = await productCommentService.deleteProductComment(req.params.id);
    if (result) {
        res.json(result);
    } else {
        res.status(404).send('Comentario de producto no encontrado');
    }
});

module.exports = router;