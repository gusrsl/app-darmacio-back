const express = require('express')
const router = express.Router()
const productImageController = require('../controller/productImageController')

router.get('/', productImageController.getAllProductImages)

router.get('/:id', productImageController.getProductImageById)

router.post('/', productImageController.createProductImage)

module.exports = router


/**
 * @swagger
 * tags:
 *   name: ProductImages
 *   description: API para gestionar imágenes de productos
 */

/**
 * @swagger
 * /product-images:
 *   get:
 *     summary: Obtiene todas las imágenes de productos
 *     tags: [ProductImages]
 *     responses:
 *       200:
 *         description: Lista de imágenes de productos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProductImage'
 */

/**
 * @swagger
 * /product-images/{id}:
 *   get:
 *     summary: Obtiene una imagen de producto por su ID
 *     tags: [ProductImages]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la imagen del producto
 *     responses:
 *       200:
 *         description: Detalles de la imagen del producto
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductImage'
 *       404:
 *         description: Imagen del producto no encontrada
 */

/**
 * @swagger
 * /product-images:
 *   post:
 *     summary: Crea una nueva imagen de producto
 *     tags: [ProductImages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductImage'
 *     responses:
 *       201:
 *         description: Imagen del producto creada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductImage'
 */