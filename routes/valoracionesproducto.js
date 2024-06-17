const express = require('express')
const router = express.Router()
const productRatingController = require('../controller/productRatingController')

/**
 * @swagger
 * /:
 *   get:
 *     summary: Obtiene todas las valoraciones de productos
 *     tags: [ProductRatings]
 *     responses:
 *       200:
 *         description: La lista de valoraciones de productos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProductRating'
 */
router.get('/', productRatingController.getAllProductRatings)

/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Obtiene una valoración de producto por su ID
 *     tags: [ProductRatings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: La valoración de producto encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductRating'
 */
router.get('/:id', productRatingController.getProductRatingById)

/**
 * @swagger
 * /:
 *   post:
 *     summary: Crea una nueva valoración de producto
 *     tags: [ProductRatings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductRating'
 *     responses:
 *       200:
 *         description: La valoración de producto ha sido creada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductRating'
 */
router.post('/', productRatingController.createProductRating)

/**
 * @swagger
 * /{id}:
 *   put:
 *     summary: Actualiza una valoración de producto
 *     tags: [ProductRatings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductRating'
 *     responses:
 *       200:
 *         description: La valoración de producto ha sido actualizada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductRating'
 */
router.put('/:id', productRatingController.updateProductRating)

/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Elimina una valoración de producto
 *     tags: [ProductRatings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: La valoración de producto ha sido eliminada correctamente
 */
router.delete('/:id', productRatingController.deleteProductRating)

module.exports = router