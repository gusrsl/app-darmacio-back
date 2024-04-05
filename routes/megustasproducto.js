const express = require('express');
const router = express.Router();
const productLikeService = require('../service/megustasproductoService');

// Obtener todos los "me gusta" de productos
router.get('/', async (req, res) => {
    const productLikes = await productLikeService.getAllProductLikes();
    res.json(productLikes);
});

// Obtener un "me gusta" de producto por ID
router.get('/:id', async (req, res) => {
    const productLike = await productLikeService.getProductLikeById(req.params.id);
    if (productLike) {
        res.json(productLike);
    } else {
        res.status(404).send('Me gusta de producto no encontrado');
    }
});

// Crear un nuevo "me gusta" de producto
router.post('/', async (req, res) => {
    const newProductLike = req.body;
    const createdProductLike = await productLikeService.createProductLike(newProductLike);
    res.status(201).json(createdProductLike);
});

// Actualizar un "me gusta" de producto
router.put('/:id', async (req, res) => {
    const updatedProductLike = req.body;
    const result = await productLikeService.updateProductLike(req.params.id, updatedProductLike);
    if (result) {
        res.json(result);
    } else {
        res.status(404).send('Me gusta de producto no encontrado');
    }
});

// Eliminar un "me gusta" de producto
router.delete('/:id', async (req, res) => {
    const result = await productLikeService.deleteProductLike(req.params.id);
    if (result) {
        res.json(result);
    } else {
        res.status(404).send('Me gusta de producto no encontrado');
    }
});

module.exports = router;