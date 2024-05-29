const productService = require('../service/productoService')

const getAllProducts = async (_req, res, next) => {
  try {
    const products = await productService.getAllProducts()

    res.status(200).json(products)
  } catch (error) {
    next(error)
  }
}

const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params
    const product = await productService.getProductById(id)

    if (!product) {
      res.status(404).json({ message: 'Product not found' })
      return
    }

    res.status(200).json(product)
  } catch (error) {
    next(error)
  }
}

const getAllHighlightedProducts = async (_req, res, next) => {
  try {
    const products = await productService.getDestacProducts()

    res.status(200).json(products)
  } catch (error) {
    next(error)
  }
}

const createProduct = async (req, res, next) => {
  try {
    const newProduct = req.body
    await productService.createProduct(newProduct)

    res.status(201).json({
      message: 'Product created successfully',
    })
  } catch (error) {
    next(error)
  }
}

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params
    const product = req.body
    await productService.updateProduct(id, product)

    res.status(204).json({
      message: 'Product updated successfully',
    })
  } catch (error) {
    next(error)
  }
}

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params
    await productService.deleteProduct(id)

    res.status(204).json({
      message: 'Product deleted successfully',
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  getAllHighlightedProducts,
  createProduct,
  updateProduct,
  deleteProduct,
}
