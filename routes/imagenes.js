// const express = require('express')
// const router = express.Router()
// const imageController = require('../controller/imagesController')
// const { upload } = require('../middleware/multer')

// router.get('/', imageController.getAllImages)

// router.get('/:id', imageController.getImageById)

// router.post('/', upload.single('file'), imageController.createImage)

// module.exports = router

const express = require('express');
const multer = require('multer');
const path = require('path');

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
      cb('Error: Solo imágenes (jpeg, jpg, png) son permitidas');
    }
  }
});

// Ruta para subir imágenes
router.post('/upload', upload.single('image'), (req, res) => {
  try {
    res.send({
      status: true,
      message: 'Archivo subido exitosamente',
      data: {
        name: req.file.filename,
        mimetype: req.file.mimetype,
        size: req.file.size
      }
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;