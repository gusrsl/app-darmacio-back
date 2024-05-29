const productViewService = require('../service/vistasproductoService')

const getAllProductViews = async (req, res, next) => {
  try {
    const productViews = await productViewService.getAllProductViews()

    res.status(200).json(productViews)
  } catch (error) {
    next(error)
  }
}

const getProductViewById = async (req, res, next) => {
  try {
    const { id } = req.params
    const productView = await productViewService.getProductViewById(id)

    if (!productView) {
      res.status(404).json({ message: 'Product View not found' })
      return
    }

    res.status(200).json(productView)
  } catch (error) {
    next(error)
  }
}

const createProductView = async (req, res, next) => {
  try {
    const { ...newProductView } = req.body
    await productViewService.createProductView(newProductView)

    res.status(201).json({
      message: 'Product View created successfully',
    })
  } catch (error) {
    next(error)
  }
}

const updateProductView = async (req, res, next) => {
  try {
    const { id } = req.params
    const { ...productView } = req.body
    await productViewService.updateProductView(id, productView)

    res.status(204).json({
      message: 'Product View updated successfully',
    })
  } catch (error) {
    next(error)
  }
}

const deleteProductView = async (req, res, next) => {
  try {
    const { id } = req.params
    await productViewService.deleteProductView(id)

    res.status(204).json({
      message: 'Product View deleted successfully',
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAllProductViews,
  getProductViewById,
  createProductView,
  updateProductView,
  deleteProductView,
}
