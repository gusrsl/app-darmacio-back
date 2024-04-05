const db = require('../db');

async function createShipping(shipping) {
    const pool = await db;
    const request = pool.request();
    await request.query(`INSERT INTO prm_envios (id, descripcion, costo_envio, valido, idestado) VALUES (${shipping.id}, '${shipping.descripcion}', ${shipping.costo_envio}, ${shipping.valido}, ${shipping.idestado})`);
}

async function getAllShippings() {
    const pool = await db;
    const request = pool.request();
    const result = await request.query('SELECT * FROM prm_envios');
    return result.recordset;
}

async function getShippingById(id) {
    const pool = await db;
    const request = pool.request();
    const result = await request.query(`SELECT * FROM prm_envios WHERE id = ${id}`);
    return result.recordset[0];
}

async function updateShipping(id, shipping) {
    const pool = await db;
    const request = pool.request();
    await request.query(`UPDATE prm_envios SET descripcion = '${shipping.descripcion}', costo_envio = ${shipping.costo_envio}, valido = ${shipping.valido}, idestado = ${shipping.idestado} WHERE id = ${id}`);
}

async function deleteShipping(id) {
    const pool = await db;
    const request = pool.request();
    await request.query(`DELETE FROM prm_envios WHERE id = ${id}`);
}

module.exports = {
    createShipping,
    getAllShippings,
    getShippingById,
    updateShipping,
    deleteShipping
};