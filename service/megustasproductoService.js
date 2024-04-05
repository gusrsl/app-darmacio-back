const db = require('../db');

async function createProductLike(productLike) {
    const pool = await db;
    const request = pool.request();
    await request.query(`INSERT INTO prd_megusta_producto (id, id_producto, contador, idestado) VALUES (${productLike.id}, ${productLike.id_producto}, ${productLike.contador}, ${productLike.idestado})`);
}

async function getAllProductLikes() {
    const pool = await db;
    const request = pool.request();
    const result = await request.query('SELECT * FROM prd_megusta_producto');
    return result.recordset;
}

async function getProductLikeById(id) {
    const pool = await db;
    const request = pool.request();
    const result = await request.query(`SELECT * FROM prd_megusta_producto WHERE id = ${id}`);
    return result.recordset[0];
}

async function updateProductLike(id, productLike) {
    const pool = await db;
    const request = pool.request();
    await request.query(`UPDATE prd_megusta_producto SET id_producto = ${productLike.id_producto}, contador = ${productLike.contador}, idestado = ${productLike.idestado} WHERE id = ${id}`);
}

async function deleteProductLike(id) {
    const pool = await db;
    const request = pool.request();
    await request.query(`DELETE FROM prd_megusta_producto WHERE id = ${id}`);
}

module.exports = {
    createProductLike,
    getAllProductLikes,
    getProductLikeById,
    updateProductLike,
    deleteProductLike
};