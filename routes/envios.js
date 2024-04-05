const express = require('express');
const router = express.Router();
const shippingService = require('../service/enviosService');

// Obtener todos los envíos
router.get('/', async (req, res) => {
    const shippings = await shippingService.getAllShippings();
    res.json(shippings);
});

// Obtener un envío por ID
router.get('/:id', async (req, res) => {
    const shipping = await shippingService.getShippingById(req.params.id);
    if (shipping) {
        res.json(shipping);
    } else {
        res.status(404).send('Envío no encontrado');
    }
});

// Crear un nuevo envío
router.post('/', async (req, res) => {
    const newShipping = req.body;
    const createdShipping = await shippingService.createShipping(newShipping);
    res.status(201).json(createdShipping);
});

// Actualizar un envío
router.put('/:id', async (req, res) => {
    const updatedShipping = req.body;
    const result = await shippingService.updateShipping(req.params.id, updatedShipping);
    if (result) {
        res.json(result);
    } else {
        res.status(404).send('Envío no encontrado');
    }
});

// Eliminar un envío
router.delete('/:id', async (req, res) => {
    const result = await shippingService.deleteShipping(req.params.id);
    if (result) {
        res.json(result);
    } else {
        res.status(404).send('Envío no encontrado');
    }
});

module.exports = router;