const express = require('express');
const router = express.Router();
const productRatingService = require('../service/valoracionesproductoService');

// Obtener todas las valoraciones de productos
router.get('/', async (req, res) => {
    const productRatings = await productRatingService.getAllProductRatings();
    res.json(productRatings);
});

// Obtener una valoración de producto por ID
router.get('/:id', async (req, res) => {
    const productRating = await productRatingService.getProductRatingById(req.params.id);
    if (productRating) {
        res.json(productRating);
    } else {
        res.status(404).send('Valoración de producto no encontrada');
    }
});

// Crear una nueva valoración de producto
router.post('/', async (req, res) => {
    const newProductRating = req.body;
    const createdProductRating = await productRatingService.createProductRating(newProductRating);
    res.status(201).json(createdProductRating);
});

// Actualizar una valoración de producto
router.put('/:id', async (req, res) => {
    const updatedProductRating = req.body;
    const result = await productRatingService.updateProductRating(req.params.id, updatedProductRating);
    if (result) {
        res.json(result);
    } else {
        res.status(404).send('Valoración de producto no encontrada');
    }
});

// Eliminar una valoración de producto
router.delete('/:id', async (req, res) => {
    const result = await productRatingService.deleteProductRating(req.params.id);
    if (result) {
        res.json(result);
    } else {
        res.status(404).send('Valoración de producto no encontrada');
    }
});

module.exports = router;