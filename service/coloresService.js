const db = require('../db');

async function createColor(color) {
    const pool = await db;
    const request = pool.request();
    await request.query(`INSERT INTO prm_colores (id, descripcion, valido, idestado) VALUES (${color.id}, '${color.descripcion}', ${color.valido}, ${color.idestado})`);
}

async function getAllColors() {
    const pool = await db;
    const request = pool.request();
    const result = await request.query('SELECT * FROM prm_colores');
    return result.recordset;
}

async function getColorById(id) {
    const pool = await db;
    const request = pool.request();
    const result = await request.query(`SELECT * FROM prm_colores WHERE id = ${id}`);
    return result.recordset[0];
}

module.exports = {
    createColor,
    getAllColors,
    getColorById
};