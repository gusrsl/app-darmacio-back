const offerService = require('../service/ofertasService')

const getAllOffers = async (_req, res, next) => {
  try {
    const offers = await offerService.getAllOffers()

    res.status(200).json(offers)
  } catch (error) {
    next(error)
  }
}

const getOfferById = async (req, res, next) => {
  try {
    const { id } = req.params
    const offer = await offerService.getOfferById(id)

    if (!offer) {
      res.status(404).json({ message: 'Offer not found' })
      return
    }

    res.status(200).json(offer)
  } catch (error) {
    next(error)
  }
}

const createOffer = async (req, res, next) => {
  try {
    const { ...newOffer } = req.body
    await offerService.createOffer(newOffer)

    res.status(201).json({
      message: 'Offer created successfully',
    })
  } catch (error) {
    next(error)
  }
}

module.exports = { getAllOffers, getOfferById, createOffer }
