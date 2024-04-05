const db = require('../db');

async function createImage(image) {
    const pool = await db;
    const request = pool.request();
    await request.query(`INSERT INTO prm_imagenes (id, binario_img, ruta_img, descripcion, valido, idestado) VALUES (${image.id}, ${image.binario_img}, '${image.ruta_img}', '${image.descripcion}', ${image.valido}, ${image.idestado})`);
}

async function getAllImages() {
    const pool = await db;
    const request = pool.request();
    const result = await request.query('SELECT * FROM prm_imagenes');
    return result.recordset;
}

async function getImageById(id) {
    const pool = await db;
    const request = pool.request();
    const result = await request.query(`SELECT * FROM prm_imagenes WHERE id = ${id}`);
    return result.recordset[0];
}

module.exports = {
    createImage,
    getAllImages,
    getImageById
};