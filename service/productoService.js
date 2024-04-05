const db = require('../db');

async function createProduct(product) {
    const pool = await db;
    const request = pool.request();
    await request.query(`INSERT INTO prm_producto (uu_id, codigo_alfa, descripcion, precio, graba_iva, marca, color_1, color_2, valido, dias_entrega, id_envio, id_cat_niv3, fecha_creacion, producto_destacado, idestado) VALUES (NEWID(), '${product.codigo_alfa}', '${product.descripcion}', ${product.precio}, ${product.graba_iva}, '${product.marca}', '${product.color_1}', '${product.color_2}', ${product.valido}, ${product.dias_entrega}, ${product.id_envio}, ${product.id_cat_niv3}, '${product.fecha_creacion}', ${product.producto_destacado}, ${product.idestado})`);
}

async function getAllProducts() {
    try {
        const pool = await db;
        const request = pool.request();
        const result = await request.query('SELECT * FROM prm_producto where producto_destacado = 0');
        return result.recordset;
    } catch (error) {
        console.error('Error al obtener todos los productos:', error);
        throw error;
    }
}

async function getDestacProducts() {
    try {
        const pool = await db;
        const request = pool.request();
        const result = await request.query('SELECT * FROM prm_producto where producto_destacado = 1');
        return result.recordset;
    } catch (error) {
        console.error('Error al obtener todos los productos:', error);
        throw error;
    }
}

async function getProductById(id) {
    const pool = await db;
    const request = pool.request();
    const result = await request.query(`SELECT * FROM prm_producto WHERE uu_id = '${id}'`);
    return result.recordset[0];
}

async function updateProduct(id, product) {
    const pool = await db;
    const request = pool.request();
    await request.query(`UPDATE prm_producto SET codigo_alfa = '${product.codigo_alfa}', descripcion = '${product.descripcion}', precio = ${product.precio}, graba_iva = ${product.graba_iva}, marca = '${product.marca}', color_1 = '${product.color_1}', color_2 = '${product.color_2}', valido = ${product.valido}, dias_entrega = ${product.dias_entrega}, id_envio = ${product.id_envio}, id_cat_niv3 = ${product.id_cat_niv3}, fecha_creacion = '${product.fecha_creacion}', producto_destacado = ${product.producto_destacado}, idestado = ${product.idestado} WHERE uu_id = '${id}'`);
}

async function deleteProduct(id) {
    const pool = await db;
    const request = pool.request();
    await request.query(`DELETE FROM prm_producto WHERE uu_id = '${id}'`);
}

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getDestacProducts
};