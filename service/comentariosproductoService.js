const db = require('../db');

async function createProductComment(productComment) {
    const pool = await db;
    const request = pool.request();
    await request.query(`INSERT INTO prd_comentarios_producto (id, id_producto, comentario, idestado) VALUES (${productComment.id}, ${productComment.id_producto}, '${productComment.comentario}', ${productComment.idestado})`);
}

async function getAllProductComments() {
    const pool = await db;
    const request = pool.request();
    const result = await request.query('SELECT * FROM prd_comentarios_producto');
    return result.recordset;
}

async function getProductCommentById(id) {
    const pool = await db;
    const request = pool.request();
    const result = await request.query(`SELECT * FROM prd_comentarios_producto WHERE id = ${id}`);
    return result.recordset[0];
}

async function updateProductComment(id, productComment) {
    const pool = await db;
    const request = pool.request();
    await request.query(`UPDATE prd_comentarios_producto SET id_producto = ${productComment.id_producto}, comentario = '${productComment.comentario}', idestado = ${productComment.idestado} WHERE id = ${id}`);
}

async function deleteProductComment(id) {
    const pool = await db;
    const request = pool.request();
    await request.query(`DELETE FROM prd_comentarios_producto WHERE id = ${id}`);
}

module.exports = {
    createProductComment,
    getAllProductComments,
    getProductCommentById,
    updateProductComment,
    deleteProductComment
};