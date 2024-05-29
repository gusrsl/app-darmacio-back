const { executeQuery, searchAll, searchOne } = require('../config/db')

async function createColor(color) {
  const query = `
    INSERT INTO prm_colores
  (descripcion, valido, idestado)
  VALUES ($1, $2, $3)`

  try {
    await executeQuery(query, [color.descripcion, color.valido, color.idestado])
  } catch (error) {
    console.error('Error creating color:', error)
    throw error
  }
}

async function getAllColors() {
  try {
    const query = `SELECT * FROM prm_colores`
    const result = await searchAll(query)

    return result
  } catch (error) {
    console.error('Error getting all colors:', error)
    throw error
  }
}

async function getColorById(id) {
  try {
    const query = `SELECT * FROM prm_colores WHERE id = $1`
    const result = await searchOne(query, [id])

    return result
  } catch (error) {
    console.error('Error getting color by id:', error)
    throw error
  }
}

module.exports = {
  createColor,
  getAllColors,
  getColorById,
}
