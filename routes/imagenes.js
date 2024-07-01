const express = require('express');
const {
  handleUpload,
  handleDelete,
  handleGetImage,
  handleGetProductImages,
} = require('../controller/imagesController');

const router = express.Router();

router.post('/upload', handleUpload);
router.delete('/delete/:id', handleDelete);
router.get('/image/:id', handleGetImage);
router.get('/product-images/:productId', handleGetProductImages);

module.exports = router;
