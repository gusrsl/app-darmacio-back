const productRatingService = require('../service/valoracionesproductoService')

const getAllProductRatings = async (req, res, next) => {
  try {
    const productRatings = await productRatingService.getAllProductRatings()

    res.status(200).json(productRatings)
  } catch (error) {
    next(error)
  }
}

const getProductRatingById = async (req, res, next) => {
  try {
    const { id } = req.params
    const productRating = await productRatingService.getProductRatingById(id)

    if (!productRating) {
      res.status(404).json({ message: 'Product Rating not found' })
      return
    }

    res.status(200).json(productRating)
  } catch (error) {
    next(error)
  }
}

const createProductRating = async (req, res, next) => {
  try {
    const { ...newProductRating } = req.body
    await productRatingService.createProductRating(newProductRating)

    res.status(201).json({
      message: 'Product Rating created successfully',
    })
  } catch (error) {
    next(error)
  }
}

const updateProductRating = async (req, res, next) => {
  try {
    const { id } = req.params
    const { ...productRating } = req.body
    await productRatingService.updateProductRating(id, productRating)

    res.status(204).json({
      message: 'Product Rating updated successfully',
    })
  } catch (error) {
    next(error)
  }
}

const deleteProductRating = async (req, res, next) => {
  try {
    const { id } = req.params
    await productRatingService.deleteProductRating(id)

    res.status(204).json({
      message: 'Product Rating deleted successfully',
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAllProductRatings,
  getProductRatingById,
  createProductRating,
  updateProductRating,
  deleteProductRating,
}
