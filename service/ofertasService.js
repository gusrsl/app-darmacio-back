const { executeQuery, searchAll, searchOne } = require('../config/db')

async function createOffer(offer) {
  try {
    const query = `
        INSERT INTO prc_ofertas
        (id_producto, fechayhora_creacion, fechayhora_desde,
        fechayhora_hasta, valido, porcentaje_descuento, idestado)
        VALUES ($1, $2, $3, $4, $5, $6, $7)`

    await executeQuery(query, [
      offer.id_producto,
      offer.fechayhora_creacion,
      offer.fechayhora_desde,
      offer.fechayhora_hasta,
      offer.valido,
      offer.porcentaje_descuento,
      offer.idestado,
    ])
  } catch (error) {
    console.error('Error creating offer:', error)
    throw error
  }
}

async function getAllOffers() {
  try {
    const query = `SELECT * FROM prc_ofertas`
    const result = await searchAll(query)

    return result
  } catch (error) {
    console.error('Error getting all offers:', error)
    throw error
  }
}

async function getOfferById(id) {
  try {
    const query = `SELECT * FROM prc_ofertas WHERE id = $1`
    const result = await searchOne(query, [id])

    return result
  } catch (error) {
    console.error('Error getting offer by id:', error)
    throw error
  }
}

module.exports = {
  createOffer,
  getAllOffers,
  getOfferById,
}
