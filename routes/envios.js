const express = require('express')
const router = express.Router()
const shippingService = require('../service/enviosService')
const shippingsController = require('../controller/enviosController')

// Obtener todos los envíos
router.get('/', shippingsController.getAllShippings)

// Obtener un envío por ID
router.get('/:id', shippingsController.getShippingById)

// Crear un nuevo envío
router.post('/', shippingsController.createShipping)

// Actualizar un envío
router.put('/:id', shippingsController.updateShipping)

// Eliminar un envío
router.delete('/:id', shippingsController.deleteShipping)

module.exports = router
