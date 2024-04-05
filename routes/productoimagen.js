const express = require('express');
const router = express.Router();
const productImageService = require('../service/productoimagenesService');

router.get('/', async (req, res) => {
    const productImages = await productImageService.getAllProductImages();
    res.json(productImages);
});

router.get('/:id', async (req, res) => {
    const productImage = await productImageService.getProductImageById(req.params.id);
    if (productImage) {
        res.json(productImage);
    } else {
        res.status(404).send('Product image not found');
    }
});

router.post('/', async (req, res) => {
    const newProductImage = req.body;
    const createdProductImage = await productImageService.createProductImage(newProductImage);
    res.status(201).json(createdProductImage);
});

module.exports = router;