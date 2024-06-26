const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { poolPromise } = require('../config/db');

const router = express.Router();

// Configuración de almacenamiento de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Renombrar el archivo con la fecha actual
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Error: Solo imágenes (jpeg, jpg, png) son permitidas'));
    }
  }
}).single('image');

// Ruta para subir imágenes y guardar información en la base de datos
router.post('/upload', (req, res) => {
  upload(req, res, async (uploadError) => {
    if (uploadError) {
      return res.status(400).send({ status: false, message: uploadError.message });
    }

    const client = await poolPromise.connect();
    try {
      const { productId } = req.body; // Suponiendo que el ID del producto se envía en el cuerpo de la solicitud
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

      res.send({
        status: true,
        message: 'Archivo subido y relacionado exitosamente',
        data: {
          imageId: imageId,
          productId: productId
        }
      });
    } catch (err) {
      client.release();
      console.error('Error al procesar la solicitud:', err);
      res.status(500).send({ status: false, message: 'Error al procesar la solicitud', error: err.message });
    }
  });
});
// Ruta para eliminar una imagen
router.delete('/delete/:id', async (req, res) => {
  const client = await poolPromise.connect();
  try {
    await client.query('BEGIN'); // Iniciar transacción
    const { id } = req.params;

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
    fs.unlink(filePath, (err) => {
      if (err) {
        throw err; // Lanzar error para manejarlo en el catch
      }
    });

    await client.query('COMMIT'); // Confirmar transacción
    client.release();

    res.send({
      status: true,
      message: 'Imagen eliminada exitosamente',
    });
  } catch (err) {
    await client.query('ROLLBACK'); // Revertir transacción
    client.release();
    console.error('Error al eliminar la imagen:', err);
    res.status(500).send({
      status: false,
      message: 'Error al eliminar la imagen',
      error: err.message
    });
  }
});


// Ruta para consultar y enviar una imagen
router.get('/image/:id', async (req, res) => {
  const client = await poolPromise.connect();
  try {
    const { id } = req.params;

    // Consultar la ubicación (nombre del archivo) de la imagen en la base de datos
    const selectImageQuery = `
      SELECT nombre_archivo
      FROM prm_imagenes
      WHERE id = $1;
    `;
    const result = await client.query(selectImageQuery, [id]);

    if (result.rows.length === 0) {
      return res.status(404).send({ status: false, message: 'Imagen no encontrada' });
    }

    const fileName = result.rows[0].nombre_archivo;
    const filePath = path.join(__dirname, '../uploads', fileName);

    // Verificar si el archivo existe
    if (fs.existsSync(filePath)) {
      // Enviar el archivo de la imagen
      res.sendFile(filePath);
    } else {
      res.status(404).send({ status: false, message: 'Archivo de imagen no encontrado' });
    }
  } catch (err) {
    console.error('Error al consultar la imagen:', err);
    res.status(500).send({ status: false, message: 'Error al procesar la solicitud', error: err.message });
  } finally {
    client.release();
  }
});


// Ruta para consultar y enviar las imágenes asociadas a un producto
router.get('/product-images/:productId', async (req, res) => {
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
      // Mensaje modificado para indicar que el producto no tiene imágenes asociadas
      return res.status(404).send({ status: false, message: 'El producto no tiene asociada ninguna imagen' });
    }

    // Construir las URLs de las imágenes
    const imagesUrls = result.rows.map(row => {
      const idimagen = row.id;
      const fileName = row.nombre_archivo;
      const imageUrl = `${req.protocol}://${req.get('host')}/imagenes/image/${idimagen}`;
      return imageUrl;
    });

    // Enviar las URLs de las imágenes
    res.send({ status: true, images: imagesUrls });
  } catch (err) {
    console.error('Error al consultar las imágenes del producto:', err);
    res.status(500).send({ status: false, message: 'Error al procesar la solicitud', error: err.message });
  } finally {
    client.release();
  }
});

module.exports = router;