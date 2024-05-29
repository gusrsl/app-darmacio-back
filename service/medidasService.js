const { executeQuery, searchAll, searchOne } = require('../config/db')

async function createMeasure(measure) {
  try {
    const query = `
        INSERT INTO prm_medidas
        (descripcion, abreviatura, valido, idestado)
        VALUES ($1, $2, $3, $4)`

    await executeQuery(query, [
      measure.descripcion,
      measure.abreviatura,
      measure.valido,
      measure.idestado,
    ])
  } catch (error) {
    console.error('Error creating measure:', error)
    throw error
  }
}

async function getAllMeasures() {
  try {
    const query = `SELECT * FROM prm_medidas`
    const result = await searchAll(query)

    return result
  } catch (error) {
    console.error('Error getting all measures:', error)
    throw error
  }
}

async function getMeasureById(id) {
  try {
    const query = `SELECT * FROM prm_medidas WHERE id = $1`
    const result = await searchOne(query, [id])

    return result
  } catch (error) {
    console.error('Error getting measure by id:', error)
    throw error
  }
}

module.exports = {
  createMeasure,
  getAllMeasures,
  getMeasureById,
}
