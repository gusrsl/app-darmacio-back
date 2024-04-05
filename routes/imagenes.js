const express = require('express');
const router = express.Router();
const imageService = require('../service/imagenesService');

router.get('/', async (req, res) => {
    const images = await imageService.getAllImages();
    res.json(images);
});

router.get('/:id', async (req, res) => {
    const image = await imageService.getImageById(req.params.id);
    if (image) {
        res.json(image);
    } else {
        res.status(404).send('Image not found');
    }
});

router.post('/', async (req, res) => {
    const newImage = req.body;
    const createdImage = await imageService.createImage(newImage);
    res.status(201).json(createdImage);
});

module.exports = router;