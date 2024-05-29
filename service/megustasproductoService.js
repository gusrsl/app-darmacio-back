const {
  executeQuery,
  searchAll,
  searchOne,
  update,
  deleteOne,
} = require('../config/db')

async function createProductLike(productLike) {
  try {
    const query = `
        INSERT INTO prd_megusta_producto
        (id_producto, contador, idestado)
        VALUES ($1, $2, $3)
    `

    await executeQuery(query, [
      productLike.id_producto,
      productLike.contador,
      productLike.idestado,
    ])
  } catch (error) {
    console.error('Error creating product like:', error)
    throw error
  }
}

async function getAllProductLikes() {
  try {
    const query = `SELECT * FROM prd_megusta_producto`
    const result = await searchAll(query)

    return result
  } catch (error) {
    console.error('Error getting all product likes:', error)
    throw error
  }
}

async function getProductLikeById(id) {
  try {
    const query = `SELECT * FROM prd_megusta_producto WHERE id = $1`
    const result = await searchOne(query, [id])

    return result
  } catch (error) {
    console.error('Error getting product like by id:', error)
    throw error
  }
}

async function updateProductLike(id, productLike) {
  try {
    const query = `
        UPDATE prd_megusta_producto
        SET id_producto = $1,
            contador = $2,
            idestado = $3
        WHERE id = $4`

    await update(query, [
      productLike.id_producto,
      productLike.contador,
      productLike.idestado,
      id,
    ])
  } catch (error) {
    console.error('Error updating product like:', error)
    throw error
  }
}

async function deleteProductLike(id) {
  try {
    const query = `DELETE FROM prd_megusta_producto WHERE id = $1`

    await deleteOne(query, [id])
  } catch (error) {
    console.error('Error deleting product like:', error)
    throw error
  }
}

module.exports = {
  createProductLike,
  getAllProductLikes,
  getProductLikeById,
  updateProductLike,
  deleteProductLike,
}
