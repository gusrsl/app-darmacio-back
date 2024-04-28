const poolPromise = require('../db');

async function createProduct(product) {
    const query = `
        INSERT INTO prm_producto (uu_id, codigo_alfa, descripcion, precio, graba_iva, marca, color_1, color_2, valido, dias_entrega, id_envio, id_cat_niv3, fecha_creacion, producto_destacado, idestado)
        VALUES (uuid_generate_v4(), $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
    `;
    const values = [product.codigo_alfa, product.descripcion, product.precio, product.graba_iva, product.marca, product.color_1, product.color_2, product.valido, product.dias_entrega, product.id_envio, product.id_cat_niv3, product.fecha_creacion, product.producto_destacado, product.idestado];
    await poolPromise.query(query, values);
}

async function getAllProducts() {
    const result = await poolPromise.query('SELECT * FROM prm_producto where producto_destacado = false');
    return result.rows;
}

async function getDestacProducts() {
    const result = await poolPromise.query('SELECT * FROM prm_producto where producto_destacado = true');
    return result.rows;
}

async function getProductById(id) {
    const result = await poolPromise.query('SELECT * FROM prm_producto WHERE uu_id = $1', [id]);
    return result.rows[0];
}

async function updateProduct(id, product) {
    const query = `
        UPDATE prm_producto SET codigo_alfa = $1, descripcion = $2, precio = $3, graba_iva = $4, marca = $5, color_1 = $6, color_2 = $7, valido = $8, dias_entrega = $9, id_envio = $10, id_cat_niv3 = $11, fecha_creacion = $12, producto_destacado = $13, idestado = $14 WHERE uu_id = $15
    `;
    const values = [product.codigo_alfa, product.descripcion, product.precio, product.graba_iva, product.marca, product.color_1, product.color_2, product.valido, product.dias_entrega, product.id_envio, product.id_cat_niv3, product.fecha_creacion, product.producto_destacado, product.idestado, id];
    await poolPromise.query(query, values);
}

async function deleteProduct(id) {
    await poolPromise.query('DELETE FROM prm_producto WHERE uu_id = $1', [id]);
}

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getDestacProducts
};