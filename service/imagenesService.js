const { executeQuery, searchAll, searchOne } = require('../config/db')

async function createImage(image) {
  try {
    const query = `
        INSERT INTO prm_imagenes
        (binario_img, ruta_img, descripcion, valido, idestado)
        VALUES ($1, $2, $3, $4, $5)`

    await executeQuery(query, [
      image.binario_img,
      image.ruta_img,
      image.descripcion,
      image.valido,
      image.idestado,
    ])
  } catch (error) {
    console.error('Error creating image:', error)
    throw error
  }
}

async function getAllImages() {
  try {
    const query = `SELECT * FROM prm_imagenes`
    const result = await searchAll(query)

    return result
  } catch (error) {
    console.error('Error getting images:', error)
    throw error
  }
}

async function getImageById(id) {
  try {
    const query = `SELECT * FROM prm_imagenes WHERE id = $1`
    const result = await searchOne(query, [id])

    return result
  } catch (error) {
    console.error('Error getting image by id:', error)
    throw error
  }
}

module.exports = {
  createImage,
  getAllImages,
  getImageById,
}
