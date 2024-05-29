const {
  executeQuery,
  searchAll,
  searchOne,
  update,
  deleteOne,
} = require('../config/db')

async function createShipping(shipping) {
  try {
    const query = `
        INSERT INTO prm_envios
        (descripcion, costo_envio, valido, idestado)
        VALUES ($1, $2, $3, $4)
    `

    await executeQuery(query, [
      shipping.descripcion,
      shipping.costo_envio,
      shipping.valido,
      shipping.idestado,
    ])
  } catch (error) {
    console.error('Error creating shipping:', error)
    throw error
  }
}

async function getAllShippings() {
  try {
    const query = `SELECT * FROM prm_envios`
    const result = await searchAll(query)

    return result
  } catch (error) {
    console.error('Error getting all shippings:', error)
    throw error
  }
}

async function getShippingById(id) {
  try {
    const query = `SELECT * FROM prm_envios WHERE id = $1`
    const result = await searchOne(query, [id])

    return result
  } catch (error) {
    console.error('Error getting shipping by id:', error)
    throw error
  }
}

async function updateShipping(id, shipping) {
  try {
    const query = `
    UPDATE prm_envios
    SET descripcion = $1,
        costo_envio = $2,
        valido = $3,
        idestado = $4
    WHERE id = $5`

    await update(query, [
      shipping.descripcion,
      shipping.costo_envio,
      shipping.valido,
      shipping.idestado,
      id,
    ])
  } catch (error) {
    console.error('Error updating shipping:', error)
    throw error
  }
}

async function deleteShipping(id) {
  try {
    const query = `DELETE FROM prm_envios WHERE id = $1`

    await deleteOne(query, [id])
  } catch (error) {
    console.error('Error deleting shipping:', error)
    throw error
  }
}

module.exports = {
  createShipping,
  getAllShippings,
  getShippingById,
  updateShipping,
  deleteShipping,
}
