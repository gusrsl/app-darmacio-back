const db = require('../db');

async function createProductMeasure(productMeasure) {
    const pool = await db;
    const request = pool.request();
    await request.query(`INSERT INTO prd_productos_medidas (id, id_producto, id_medida, valido, existencia, idestado) VALUES (${productMeasure.id}, ${productMeasure.id_producto}, ${productMeasure.id_medida}, ${productMeasure.valido}, ${productMeasure.existencia}, ${productMeasure.idestado})`);
}

async function getAllProductMeasures() {
    const pool = await db;
    const request = pool.request();
    const result = await request.query('SELECT * FROM prd_productos_medidas');
    return result.recordset;
}

async function getProductMeasureById(id) {
    const pool = await db;
    const request = pool.request();
    const result = await request.query(`SELECT * FROM prd_productos_medidas WHERE id = ${id}`);
    return result.recordset[0];
}

module.exports = {
    createProductMeasure,
    getAllProductMeasures,
    getProductMeasureById
};