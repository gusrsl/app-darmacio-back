const db = require('../db');

async function createOffer(offer) {
    const pool = await db;
    const request = pool.request();
    await request.query(`INSERT INTO prc_ofertas (id, id_producto, fechayhora_creacion, fechayhora_desde, fechayhora_hasta, valido, porcentaje_descuento, idestado) VALUES (${offer.id}, ${offer.id_producto}, '${offer.fechayhora_creacion}', '${offer.fechayhora_desde}', '${offer.fechayhora_hasta}', ${offer.valido}, ${offer.porcentaje_descuento}, ${offer.idestado})`);
}

async function getAllOffers() {
    const pool = await db;
    const request = pool.request();
    const result = await request.query('SELECT * FROM prc_ofertas');
    return result.recordset;
}

async function getOfferById(id) {
    const pool = await db;
    const request = pool.request();
    const result = await request.query(`SELECT * FROM prc_ofertas WHERE id = ${id}`);
    return result.recordset[0];
}

module.exports = {
    createOffer,
    getAllOffers,
    getOfferById
};