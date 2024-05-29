const {
  executeQuery,
  searchAll,
  searchOne,
  update,
  deleteOne,
} = require('../config/db')

async function createProductView(productView) {
  try {
    const query = `
        INSERT INTO prd_vistas_producto
        (id_producto, contador, idestado)
        VALUES ($1, $2, $3)
    `

    await executeQuery(query, [
      productView.id_producto,
      productView.contador,
      productView.idestado,
    ])
  } catch (error) {
    console.error('Error creating product view:', error)
    throw error
  }
}

async function getAllProductViews() {
  try {
    const query = `SELECT * FROM prd_vistas_producto`
    const result = await searchAll(query)

    return result
  } catch (error) {
    console.error('Error getting all product views:', error)
    throw error
  }
}

async function getProductViewById(id) {
  try {
    const query = `SELECT * FROM prd_vistas_producto WHERE id = $1`
    const result = await searchOne(query, [id])

    return result
  } catch (error) {
    console.error('Error getting product view by id:', error)
    throw error
  }
}

async function updateProductView(id, productView) {
  try {
    const query = `
        UPDATE prd_vistas_producto
        SET id_producto = $1,
            contador = $2,
            idestado = $3
        WHERE id = $4
    `

    await update(query, [
      productView.id_producto,
      productView.contador,
      productView.idestado,
      id,
    ])
  } catch (error) {
    console.error('Error updating product view:', error)
    throw error
  }
}

async function deleteProductView(id) {
  try {
    const query = `
        DELETE FROM prd_vistas_producto
        WHERE id = $1
    `

    await deleteOne(query, [id])
  } catch (error) {
    console.error('Error deleting product view:', error)
    throw error
  }
}

module.exports = {
  createProductView,
  getAllProductViews,
  getProductViewById,
  updateProductView,
  deleteProductView,
}
