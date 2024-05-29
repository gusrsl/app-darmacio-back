const express = require('express')
const router = express.Router()
const measureController = require('../controller/measureController')

router.get('/', measureController.getAllMeasures)

router.get('/:id', measureController.getMeasureById)

router.post('/', measureController.createMeasure)

module.exports = router
