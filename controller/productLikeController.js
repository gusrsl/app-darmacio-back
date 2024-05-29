const productLikeService = require('../service/megustasproductoService')

const getAllProductLikes = async (_req, res, next) => {
  try {
    const productLikes = await productLikeService.getAllProductLikes()

    res.status(200).json(productLikes)
  } catch (error) {
    next(error)
  }
}

const getProductLikeById = async (req, res, next) => {
  try {
    const { id } = req.params
    const productLike = await productLikeService.getProductLikeById(id)

    if (!productLike) {
      res.status(404).json({ message: 'Product Like not found' })
      return
    }

    res.status(200).json(productLike)
  } catch (error) {
    next(error)
  }
}

const createProductLike = async (req, res, next) => {
  try {
    const { ...productLike } = req.body
    await productLikeService.createProductLike(productLike)

    res.status(201).json({
      message: 'Product Like created successfully',
    })
  } catch (error) {
    next(error)
  }
}

const updateProductLike = async (req, res, next) => {
  try {
    const { id } = req.params
    const { ...productLike } = req.body
    await productLikeService.updateProductLike(id, productLike)

    res.status(204).json({
      message: 'Product Like updated successfully',
    })
  } catch (error) {
    next(error)
  }
}

const deleteProductLike = async (req, res, next) => {
  try {
    const { id } = req.params
    await productLikeService.deleteProductLike(id)

    res.status(204).json({
      message: 'Product Like deleted successfully',
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAllProductLikes,
  getProductLikeById,
  createProductLike,
  updateProductLike,
  deleteProductLike,
}
