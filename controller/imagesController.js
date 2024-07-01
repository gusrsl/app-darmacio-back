const {
  uploadImage,
  deleteImage,
  getImageById,
  getProductImages,
} = require('../service/imagenesService');
const multer = require('multer');
const path = require('path');

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

async function handleUpload(req, res) {
  upload(req, res, async (uploadError) => {
    if (uploadError) {
      return res.status(400).send({ status: false, message: uploadError.message });
    }

    try {
      const result = await uploadImage(req);
      res.send({
        status: true,
        message: 'Archivo subido y relacionado exitosamente',
        data: result
      });
    } catch (err) {
      console.error('Error al procesar la solicitud:', err);
      res.status(500).send({ status: false, message: 'Error al procesar la solicitud', error: err.message });
    }
  });
}

async function handleDelete(req, res) {
  try {
    await deleteImage(req.params.id);
    res.send({
      status: true,
      message: 'Imagen eliminada exitosamente',
    });
  } catch (err) {
    console.error('Error al eliminar la imagen:', err);
    res.status(500).send({
      status: false,
      message: 'Error al eliminar la imagen',
      error: err.message
    });
  }
}

async function handleGetImage(req, res) {
  try {
    const filePath = await getImageById(req.params.id);
    res.sendFile(filePath);
  } catch (err) {
    console.error('Error al consultar la imagen:', err);
    res.status(500).send({ status: false, message: 'Error al procesar la solicitud', error: err.message });
  }
}

async function handleGetProductImages(req, res) {
  try {
    const imagesUrls = await getProductImages(req);
    res.send({ status: true, images: imagesUrls });
  } catch (err) {
    console.error('Error al consultar las imágenes del producto:', err);
    res.status(500).send({ status: false, message: 'Error al procesar la solicitud', error: err.message });
  }
}

module.exports = {
  handleUpload,
  handleDelete,
  handleGetImage,
  handleGetProductImages,
};
