const db = require('../db');

async function createProductView(productView) {
    const pool = await db;
    const request = pool.request();
    await request.query(`INSERT INTO prd_vistas_producto (id, id_producto, contador, idestado) VALUES (${productView.id}, ${productView.id_producto}, ${productView.contador}, ${productView.idestado})`);
}

async function getAllProductViews() {
    const pool = await db;
    const request = pool.request();
    const result = await request.query('SELECT * FROM prd_vistas_producto');
    return result.recordset;
}

async function getProductViewById(id) {
    const pool = await db;
    const request = pool.request();
    const result = await request.query(`SELECT * FROM prd_vistas_producto WHERE id = ${id}`);
    return result.recordset[0];
}

async function updateProductView(id, productView) {
    const pool = await db;
    const request = pool.request();
    await request.query(`UPDATE prd_vistas_producto SET id_producto = ${productView.id_producto}, contador = ${productView.contador}, idestado = ${productView.idestado} WHERE id = ${id}`);
}

async function deleteProductView(id) {
    const pool = await db;
    const request = pool.request();
    await request.query(`DELETE FROM prd_vistas_producto WHERE id = ${id}`);
}

module.exports = {
    createProductView,
    getAllProductViews,
    getProductViewById,
    updateProductView,
    deleteProductView
};