const express = require('express');
const router = express.Router();
const measureService = require('../service/medidasService');

router.get('/', async (req, res) => {
    const measures = await measureService.getAllMeasures();
    res.json(measures);
});

router.get('/:id', async (req, res) => {
    const measure = await measureService.getMeasureById(req.params.id);
    if (measure) {
        res.json(measure);
    } else {
        res.status(404).send('Measure not found');
    }
});

router.post('/', async (req, res) => {
    const newMeasure = req.body;
    const createdMeasure = await measureService.createMeasure(newMeasure);
    res.status(201).json(createdMeasure);
});

module.exports = router;