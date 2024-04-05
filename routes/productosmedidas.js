const express = require('express');
const router = express.Router();
const productMeasureService = require('../service/productosmedidasService');

router.get('/', async (req, res) => {
    const productMeasures = await productMeasureService.getAllProductMeasures();
    res.json(productMeasures);
});

router.get('/:id', async (req, res) => {
    const productMeasure = await productMeasureService.getProductMeasureById(req.params.id);
    if (productMeasure) {
        res.json(productMeasure);
    } else {
        res.status(404).send('Product measure not found');
    }
});

router.post('/', async (req, res) => {
    const newProductMeasure = req.body;
    const createdProductMeasure = await productMeasureService.createProductMeasure(newProductMeasure);
    res.status(201).json(createdProductMeasure);
});

module.exports = router;