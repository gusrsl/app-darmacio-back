const colorService = require('../service/coloresService')

const getAllColors = async (_req, res, next) => {
  try {
    const colors = await colorService.getAllColors()

    res.status(200).json(colors)
  } catch (error) {
    next(error)
  }
}

const getColorById = async (req, res, next) => {
  try {
    const { id } = req.params
    const color = await colorService.getColorById(id)

    if (!color) {
      res.status(404).json({ message: 'Color not found' })
      return
    }

    res.status(200).json(color)
  } catch (error) {
    next(error)
  }
}

const createColor = async (req, res, next) => {
  try {
    const { ...newColor } = req.body
    await colorService.createColor(newColor)

    res.status(201).json(newColor)
  } catch (error) {
    next(error)
  }
}

module.exports = { getAllColors, getColorById, createColor }
