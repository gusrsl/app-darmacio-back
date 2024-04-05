const db = require('../db');

async function createProductRating(productRating) {
    const pool = await db;
    const request = pool.request();
    await request.query(`INSERT INTO prd_valoraciones_producto (id, id_producto, valoracion, idestado) VALUES (${productRating.id}, ${productRating.id_producto}, ${productRating.valoracion}, ${productRating.idestado})`);
}

async function getAllProductRatings() {
    const pool = await db;
    const request = pool.request();
    const result = await request.query('SELECT * FROM prd_valoraciones_producto');
    return result.recordset;
}

async function getProductRatingById(id) {
    const pool = await db;
    const request = pool.request();
    const result = await request.query(`SELECT * FROM prd_valoraciones_producto WHERE id = ${id}`);
    return result.recordset[0];
}

async function updateProductRating(id, productRating) {
    const pool = await db;
    const request = pool.request();
    await request.query(`UPDATE prd_valoraciones_producto SET id_producto = ${productRating.id_producto}, valoracion = ${productRating.valoracion}, idestado = ${productRating.idestado} WHERE id = ${id}`);
}

async function deleteProductRating(id) {
    const pool = await db;
    const request = pool.request();
    await request.query(`DELETE FROM prd_valoraciones_producto WHERE id = ${id}`);
}

module.exports = {
    createProductRating,
    getAllProductRatings,
    getProductRatingById,
    updateProductRating,
    deleteProductRating
};