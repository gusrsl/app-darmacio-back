const express = require('express');
const router = express.Router();
const colorService = require('../services/colorService');

router.get('/', async (req, res) => {
    const colors = await colorService.getAllColors();
    res.json(colors);
});

router.get('/:id', async (req, res) => {
    const color = await colorService.getColorById(req.params.id);
    if (color) {
        res.json(color);
    } else {
        res.status(404).send('Color not found');
    }
});

router.post('/', async (req, res) => {
    const newColor = req.body;
    const createdColor = await colorService.createColor(newColor);
    res.status(201).json(createdColor);
});

module.exports = router;