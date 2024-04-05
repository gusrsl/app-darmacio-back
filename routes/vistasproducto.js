const express = require('express');
const router = express.Router();
const productViewService = require('../service/vistasproductoService');

// Obtener todas las vistas de productos
router.get('/', async (req, res) => {
    const productViews = await productViewService.getAllProductViews();
    res.json(productViews);
});

// Obtener una vista de producto por ID
router.get('/:id', async (req, res) => {
    const productView = await productViewService.getProductViewById(req.params.id);
    if (productView) {
        res.json(productView);
    } else {
        res.status(404).send('Vista de producto no encontrada');
    }
});

// Crear una nueva vista de producto
router.post('/', async (req, res) => {
    const newProductView = req.body;
    const createdProductView = await productViewService.createProductView(newProductView);
    res.status(201).json(createdProductView);
});

// Actualizar una vista de producto
router.put('/:id', async (req, res) => {
    const updatedProductView = req.body;
    const result = await productViewService.updateProductView(req.params.id, updatedProductView);
    if (result) {
        res.json(result);
    } else {
        res.status(404).send('Vista de producto no encontrada');
    }
});

// Eliminar una vista de producto
router.delete('/:id', async (req, res) => {
    const result = await productViewService.deleteProductView(req.params.id);
    if (result) {
        res.json(result);
    } else {
        res.status(404).send('Vista de producto no encontrada');
    }
});

module.exports = router;