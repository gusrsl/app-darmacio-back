const express = require('express')
const colorController = require('../controller/colorController')

const router = express.Router()

router
  .get('/', colorController.getAllColors)
  .get('/:id', colorController.getColorById)
  .post('/', colorController.createColor)

module.exports = router
