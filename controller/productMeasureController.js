const productMeasureService = require('../service/productosmedidasService')

const getAllProductMeasures = async (_req, res, next) => {
  try {
    const productMeasures = await productMeasureService.getAllProductMeasures()

    res.status(200).json(productMeasures)
  } catch (error) {
    next(error)
  }
}

const getProductMeasureById = async (req, res, next) => {
  try {
    const { id } = req.params
    const productMeasure = await productMeasureService.getProductMeasureById(id)

    if (!productMeasure) {
      res.status(404).json({ message: 'Product measure not found' })
      return
    }

    res.status(200).json(productMeasure)
  } catch (error) {
    next(error)
  }
}

const createProductMeasure = async (req, res, next) => {
  try {
    const { ...newProductMeasure } = req.body
    await productMeasureService.createProductMeasure(newProductMeasure)

    res.status(201).json({
      message: 'Product measure created successfully',
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAllProductMeasures,
  getProductMeasureById,
  createProductMeasure,
}
