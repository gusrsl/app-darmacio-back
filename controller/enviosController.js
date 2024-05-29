const shippingService = require('../service/enviosService')

const getAllShippings = async (_req, res) => {
  try {
    const shippings = await shippingService.getAllShippings()

    res.json(shippings)
  } catch (error) {
    next(error)
  }
}

const getShippingById = async (req, res, next) => {
  try {
    const { id } = req.params
    const shipping = await shippingService.getShippingById(id)

    if (!shipping) {
      res.status(404).json({ message: 'Envío no encontrado' })
      return
    }

    res.status(200).json(shipping)
  } catch (error) {
    next(error)
  }
}

const createShipping = async (req, res, next) => {
  try {
    const { ...newShipping } = req.body
    await shippingService.createShipping(newShipping)

    res.status(201).json({
      message: 'Envío creado exitosamente',
    })
  } catch (error) {
    next(error)
  }
}

const updateShipping = async (req, res, next) => {
  try {
    const { id } = req.params
    const { ...updatedShipping } = req.body
    await shippingService.updateShipping(id, updatedShipping)

    res.status(204).json({
      message: 'Envío actualizado exitosamente',
    })
  } catch (error) {
    next(error)
  }
}

const deleteShipping = async (req, res, next) => {
  try {
    const { id } = req.params
    await shippingService.deleteShipping(id)

    res.status(204).json({
      message: 'Envío eliminado exitosamente',
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAllShippings,
  getShippingById,
  createShipping,
  updateShipping,
  deleteShipping,
}
