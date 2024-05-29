const express = require('express')
const router = express.Router()
const offerController = require('../controller/offerController')

router
  .get('/', offerController.getAllOffers)
  .get('/:id', offerController.getOfferById)
  .post('/', offerController.createOffer)

module.exports = router
