const productImageService = require('../service/productoimagenesService')

const getAllProductImages = async (_req, res, next) => {
  try {
    const productImages = await productImageService.getAllProductImages()
    res.status(200).json(productImages)
  } catch (error) {
    next(error)
  }
}

const getProductImageById = async (req, res, next) => {
  try {
    const { id } = req.params
    const productImage = await productImageService.getProductImageById(id)

    if (!productImage) {
      res.status(404).json({ message: 'Product image not found' })
      return
    }

    res.status(200).json(productImage)
  } catch (error) {
    next(error)
  }
}

const createProductImage = async (req, res, next) => {
  try {
    const { ...newProductImage } = req.body
    await productImageService.createProductImage(newProductImage)
    res.status(201).json({
      message: 'Product image created successfully',
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAllProductImages,
  getProductImageById,
  createProductImage,
}
