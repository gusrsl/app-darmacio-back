const measureService = require('../service/medidasService')

const getAllMeasures = async (_req, res, next) => {
  try {
    const measures = await measureService.getAllMeasures()

    res.status(200).json(measures)
  } catch (error) {
    next(error)
  }
}

const getMeasureById = async (req, res, next) => {
  try {
    const { id } = req.params
    const measure = await measureService.getMeasureById(id)

    if (!measure) {
      res.status(404).json({ message: 'Measure not found' })
      return
    }

    res.status(200).json(measure)
  } catch (error) {
    next(error)
  }
}

const createMeasure = async (req, res, next) => {
  try {
    const { ...newMeasure } = req.body
    await measureService.createMeasure(newMeasure)

    res.status(201).json({
      message: 'Measure created successfully',
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAllMeasures,
  getMeasureById,
  createMeasure,
}
