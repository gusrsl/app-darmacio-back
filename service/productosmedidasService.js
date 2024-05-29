const { executeQuery, searchAll, searchOne } = require('../config/db')

async function createProductMeasure(productMeasure) {
  try {
    const query = `
        INSERT INTO prd_productos_medidas
        (id_producto, id_medida, valido, existencia, idestado)
        VALUES ($1, $2, $3, $4, $5)
    `

    await executeQuery(query, [
      productMeasure.id_producto,
      productMeasure.id_medida,
      productMeasure.valido,
      productMeasure.existencia,
      productMeasure.idestado,
    ])
  } catch (error) {
    console.error('Error creating product measure:', error)
    throw error
  }
}

async function getAllProductMeasures() {
  try {
    const query = `SELECT * FROM prd_productos_medidas`
    const result = await searchAll(query)

    return result
  } catch (error) {
    console.error('Error getting all product measures:', error)
    throw error
  }
}

async function getProductMeasureById(id) {
  try {
    const query = `SELECT * FROM prd_productos_medidas WHERE id = $1`
    const result = await searchOne(query, [id])

    return result
  } catch (error) {
    console.error('Error getting product measure by id:', error)
    throw error
  }
}

module.exports = {
  createProductMeasure,
  getAllProductMeasures,
  getProductMeasureById,
}
