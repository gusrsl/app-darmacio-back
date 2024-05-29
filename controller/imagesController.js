const imageService = require('../service/imagenesService')

const getAllImages = async (_req, res, next) => {
  try {
    const images = await imageService.getAllImages()

    res.status(200).json(images)
  } catch (error) {
    next(error)
  }
}

const getImageById = async (req, res, next) => {
  try {
    const { id } = req.params
    const image = await imageService.getImageById(id)

    if (!image) {
      res.status(404).json({ message: 'Image not found' })
      return
    }

    res.status(200).json(image)
  } catch (error) {
    next(error)
  }
}

const createImage = async (req, res, next) => {
  try {
    const { file } = req
    const { ...newImage } = req.body

    const image = {
      ...newImage,
      binario_img: file.buffer,

      ruta_img: file.originalname,
    }
    await imageService.createImage(image)

    res.status(201).json({
      message: 'Image created successfully',
    })
  } catch (error) {
    next(error)
  }
}

module.exports = { getAllImages, getImageById, createImage }
