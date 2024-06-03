const { executeQuery, searchAll, searchOne } = require('../config/db')

async function createProductImage(productImage) {
  try {
    const query = `
    INSERT INTO prd_producto_imagenes
    (id_producto, id_imagen, valido, idestado)
    VALUES ($1, $2, $3, $4) `

    await executeQuery(query, [
      productImage.id_producto,
      productImage.id_imagen,
      productImage.valido,
      productImage.idestado,
    ])
  } catch (error) {
    console.error('Error creating product image:', error)
    throw error
  }
}

async function getAllProductImages() {
  try {
    const query = `SELECT * FROM prd_producto_imagenes`
    const result = await searchAll(query)

    return result
  } catch (error) {
    console.error('Error getting all product images:', error)
    throw error
  }
}

async function getProductImageById(id) {
  try {
    const query = `
      SELECT
        i.*
      FROM prd_producto_imagenes pi
      inner join prm_imagenes i on i.id = pi.id_imagen
      WHERE id_producto = $1
    `
    const result = await searchAll(query, [id])
    console.log(result)
    if (result) return result

    console.error(`No image found for product id (${id})`)
    return { ruta_img: 'noimage.jpg' }
  } catch (error) {
    console.error(`Error getting product image by id (${id}):`, error)
    throw error
  }
}

module.exports = {
  createProductImage,
  getAllProductImages,
  getProductImageById,
}
