const db = require('../db');

async function createProductImage(productImage) {
    try {
        const pool = await db;
        const request = pool.request();
        await request.query(`INSERT INTO prd_producto_imagenes (id, id_producto, id_imagen, valido, idestado) VALUES (${productImage.id}, ${productImage.id_producto}, ${productImage.id_imagen}, ${productImage.valido}, ${productImage.idestado})`);
    } catch (error) {
        console.error('Error creating product image:', error);
    }
}

async function getAllProductImages() {
    try {
        const pool = await db;
        const request = pool.request();
        const result = await request.query('SELECT * FROM prd_producto_imagenes');
        return result.recordset;
    } catch (error) {
        console.error('Error getting all product images:', error);
    }
}

async function getProductImageById(id) {
    try {
        const pool = await db;
        const request = pool.request();
        const result = await request.query(`
        SELECT 
        i.* 
        FROM prd_producto_imagenes pi 
        inner join prm_imagenes i on i.id = pi.id_imagen WHERE id_producto = '${id}'`);
        if (result.recordset.length > 0) {
            return result.recordset[0];
        } else {
            console.error(`No image found for product id (${id})`);
            return { ruta_img: 'noimage.jpg' };
        }
    } catch (error) {
        console.error(`Error getting product image by id (${id}):`, error);
        return { ruta_img: 'noimage.jpg' };
    }
}

module.exports = {
    createProductImage,
    getAllProductImages,
    getProductImageById
};