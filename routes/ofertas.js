const express = require('express');
const router = express.Router();
const offerService = require('../service/ofertasService');

router.get('/', async (req, res) => {
    const offers = await offerService.getAllOffers();
    res.json(offers);
});

router.get('/:id', async (req, res) => {
    const offer = await offerService.getOfferById(req.params.id);
    if (offer) {
        res.json(offer);
    } else {
        res.status(404).send('Offer not found');
    }
});

router.post('/', async (req, res) => {
    const newOffer = req.body;
    const createdOffer = await offerService.createOffer(newOffer);
    res.status(201).json(createdOffer);
});

module.exports = router;