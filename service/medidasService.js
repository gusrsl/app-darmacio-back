const db = require('../db');

async function createMeasure(measure) {
    const pool = await db;
    const request = pool.request();
    await request.query(`INSERT INTO prm_medidas (id, descripcion, abreviatura, valido, idestado) VALUES (${measure.id}, '${measure.descripcion}', '${measure.abreviatura}', ${measure.valido}, ${measure.idestado})`);
}

async function getAllMeasures() {
    const pool = await db;
    const request = pool.request();
    const result = await request.query('SELECT * FROM prm_medidas');
    return result.recordset;
}

async function getMeasureById(id) {
    const pool = await db;
    const request = pool.request();
    const result = await request.query(`SELECT * FROM prm_medidas WHERE id = ${id}`);
    return result.recordset[0];
}

module.exports = {
    createMeasure,
    getAllMeasures,
    getMeasureById
};