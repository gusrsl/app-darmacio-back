const express = require('express');
const router = express.Router();
const productService = require('../service/productoService');

// Obtener todos los productos /productos
router.get('/', async (req, res) => {
    const products = await productService.getAllProducts();
    res.json(products);
});

router.get('/destacados', async (req, res) => {
    const products = await productService.getDestacProducts();
    res.json(products);
});

// Obtener un producto por ID
router.get('/:id', async (req, res) => {
    const product = await productService.getProductById(req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).send('Producto no encontrado');
    }
});

// Crear un nuevo producto
router.post('/', async (req, res) => {
    const newProduct = req.body;
    const createdProduct = await productService.createProduct(newProduct);
    res.status(201).json(createdProduct);
});

// Actualizar un producto
router.put('/:id', async (req, res) => {
    const updatedProduct = req.body;
    const result = await productService.updateProduct(req.params.id, updatedProduct);
    if (result) {
        res.json(result);
    } else {
        res.status(404).send('Producto no encontrado');
    }
});

// Eliminar un producto
router.delete('/:id', async (req, res) => {
    const result = await productService.deleteProduct(req.params.id);
    if (result) {
        res.json(result);
    } else {
        res.status(404).send('Producto no encontrado');
    }
});

module.exports = router;