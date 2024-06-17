const express = require('express')
const colorController = require('../controller/colorController')

const router = express.Router()

/**
 * @swagger
 * /:
 *   get:
 *     summary: Obtiene todos los colores
 *     tags: [Colors]
 *     responses:
 *       200:
 *         description: La lista de colores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 */
router.get('/', colorController.getAllColors)

/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Obtiene un color por su ID
 *     tags: [Colors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: El color encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 */
router.get('/:id', colorController.getColorById)

/**
 * @swagger
 * /:
 *   post:
 *     summary: Crea un nuevo color
 *     tags: [Colors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: El color ha sido creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 */
router.post('/', colorController.createColor)

module.exports = router