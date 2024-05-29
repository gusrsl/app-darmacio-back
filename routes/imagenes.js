const express = require('express')
const router = express.Router()
const imageController = require('../controller/imagesController')
const { upload } = require('../middleware/multer')

router.get('/', imageController.getAllImages)

router.get('/:id', imageController.getImageById)

router.post('/', upload.single('file'), imageController.createImage)

module.exports = router
