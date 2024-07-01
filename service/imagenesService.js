const path = require('path');
const fs = require('fs');
const { poolPromise } = require('../config/db');

// Subir imagen y guardar información en la base de datos
async function uploadImage(req) {
  const client = await poolPromise.connect();
  try {
    const { productId } = req.body;
    if (!productId) {
      throw new Error('El ID del producto es requerido');
    }

    // Insertar la imagen en la tabla prm_imagenes
    const imageInsertQuery = `
      INSERT INTO prm_imagenes (nombre_archivo, tipo_mime, tamaño)
      VALUES ($1, $2, $3)
      RETURNING id;
    `;
    const imageInsertValues = [req.file.filename, req.file.mimetype, req.file.size];
    const result = await client.query(imageInsertQuery, imageInsertValues);
    const imageId = result.rows[0].id;

    // Insertar la relación en la tabla intermedia prd_producto_imagenes
    const relationInsertQuery = `
      INSERT INTO prd_producto_imagenes (id_producto, id_imagen, valido, idestado)
      VALUES ($1, $2, true, 0);
    `;
    const relationInsertValues = [productId, imageId];
    await client.query(relationInsertQuery, relationInsertValues);

    client.release();
    return { imageId, productId };
  } catch (err) {
    client.release();
    throw err;
  }
}

// Eliminar imagen
async function deleteImage(id) {
  const client = await poolPromise.connect();
  try {
    await client.query('BEGIN'); // Iniciar transacción

    // Verificar si la imagen existe
    const selectImageQuery = `
      SELECT nombre_archivo
      FROM prm_imagenes
      WHERE id = $1;
    `;
    const selectResult = await client.query(selectImageQuery, [id]);
    if (selectResult.rows.length === 0) {
      throw new Error('Imagen no encontrada');
    }
    const fileName = selectResult.rows[0].nombre_archivo;

    // Eliminar la relación en la tabla intermedia prd_producto_imagenes
    const deleteRelationQuery = `
      DELETE FROM prd_producto_imagenes
      WHERE id_imagen = $1;
    `;
    await client.query(deleteRelationQuery, [id]);

    // Eliminar la imagen de la tabla prm_imagenes
    const deleteImageQuery = `
      DELETE FROM prm_imagenes
      WHERE id = $1;
    `;
    await client.query(deleteImageQuery, [id]);

    // Eliminar el archivo de la carpeta 'uploads'
    const filePath = path.join(__dirname, '../uploads', fileName);
    fs.unlinkSync(filePath);

    await client.query('COMMIT'); // Confirmar transacción
    client.release();
  } catch (err) {
    await client.query('ROLLBACK'); // Revertir transacción
    client.release();
    throw err;
  }
}

// Consultar y enviar una imagen
async function getImageById(id) {
  const client = await poolPromise.connect();
  try {
    const selectImageQuery = `
      SELECT nombre_archivo
      FROM prm_imagenes
      WHERE id = $1;
    `;
    const result = await client.query(selectImageQuery, [id]);

    if (result.rows.length === 0) {
      throw new Error('Imagen no encontrada');
    }

    const fileName = result.rows[0].nombre_archivo;
    const filePath = path.join(__dirname, '../uploads', fileName);

    if (!fs.existsSync(filePath)) {
      throw new Error('Archivo de imagen no encontrado');
    }

    client.release();
    return filePath;
  } catch (err) {
    client.release();
    throw err;
  }
}

// Consultar y enviar las imágenes asociadas a un producto
async function getProductImages(req) {
  const client = await poolPromise.connect();
  try {
    const { productId } = req.params;

    // Consultar las imágenes asociadas al producto en la base de datos
    const selectImagesQuery = `
      SELECT 
      i.id,
      i.nombre_archivo
      FROM prm_imagenes i
      INNER JOIN prd_producto_imagenes pip ON i.id = pip.id_imagen
      WHERE pip.id_producto = $1;
    `;
    const result = await client.query(selectImagesQuery, [productId]);

    if (result.rows.length === 0) {
      throw new Error('El producto no tiene asociada ninguna imagen');
    }

    const imagesUrls = result.rows.map(row => {
      const idimagen = row.id;
      const imageUrl = `${req.protocol}://${req.get('host')}/imagenes/image/${idimagen}`;
      return imageUrl;
    });

    client.release();
    return imagesUrls;
  } catch (err) {
    client.release();
    throw err;
  }
}

module.exports = {
  uploadImage,
  deleteImage,
  getImageById,
  getProductImages,
};
