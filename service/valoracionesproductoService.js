const {
  executeQuery,
  searchAll,
  searchOne,
  update,
  deleteOne,
} = require('../config/db')

async function createProductRating(productRating) {
  try {
    const query = `
        INSERT INTO prd_valoraciones_producto
        (id_producto, valoracion, idestado)
        VALUES ($1, $2, $3)`

    await executeQuery(query, [
      productRating.id_producto,
      productRating.valoracion,
      productRating.idestado,
    ])
  } catch (error) {
    console.error('Error creating product rating:', error)
    throw error
  }
}

async function getAllProductRatings() {
  try {
    const query = `SELECT * FROM prd_valoraciones_producto`
    const result = await searchAll(query)

    return result
  } catch (error) {
    console.error('Error getting all product ratings:', error)
    throw error
  }
}

async function getProductRatingById(id) {
  try {
    const query = `SELECT * FROM prd_valoraciones_producto WHERE id = $1`
    const result = await searchOne(query, [id])

    return result
  } catch (error) {
    console.error('Error getting product rating by id:', error)
    throw error
  }
}

async function updateProductRating(id, productRating) {
  try {
    const query = `
        UPDATE prd_valoraciones_producto
        SET id_producto = $1,
            valoracion = $2,
            idestado = $3
        WHERE id = $4
    `

    await update(query, [
      productRating.id_producto,
      productRating.valoracion,
      productRating.idestado,
      id,
    ])
  } catch (error) {
    console.error('Error updating product rating:', error)
    throw error
  }
}

async function deleteProductRating(id) {
  try {
    const query = `DELETE FROM prd_valoraciones_producto WHERE id = $1`

    await deleteOne(query, [id])
  } catch (error) {
    console.error('Error deleting product rating:', error)
    throw error
  }
}

module.exports = {
  createProductRating,
  getAllProductRatings,
  getProductRatingById,
  updateProductRating,
  deleteProductRating,
}
