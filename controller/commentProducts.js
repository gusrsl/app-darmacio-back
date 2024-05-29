const productCommentService = require('../service/comentariosproductoService')

const getAllProductComments = async (_req, res, next) => {
  try {
    const productComments = await productCommentService.getAllProductComments()

    res.status(200).json(productComments)
  } catch (error) {
    next(error)
  }
}

const getProductCommentById = async (req, res, next) => {
  try {
    const { id } = req.params
    const productComment = await productCommentService.getProductCommentById(id)

    if (!productComment) {
      res.status(404).json({
        message: 'Comentario de producto no encontrado',
      })
      return
    }

    res.status(200).json(productComment)
  } catch (error) {
    next(error)
  }
}

const createProductComment = async (req, res, next) => {
  try {
    const { ...productComment } = req.body
    await productCommentService.createProductComment(productComment)

    res.status(201).json({
      message: 'Comentario de producto creado exitosamente',
    })
  } catch (error) {
    next(error)
  }
}

const updateProductComment = async (req, res, next) => {
  try {
    const { id } = req.params
    const { ...productComment } = req.body
    await productCommentService.updateProductComment(id, productComment)

    res.status(204).json({
      message: 'Comentario de producto actualizado exitosamente',
    })
  } catch (error) {
    next(error)
  }
}

const deleteProductComment = async (req, res, next) => {
  try {
    const { id } = req.params
    await productCommentService.deleteProductComment(id)

    res.status(204).json({
      message: 'Comentario de producto eliminado exitosamente',
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAllProductComments,
  getProductCommentById,
  createProductComment,
  updateProductComment,
  deleteProductComment,
}
