const express = require('express')
const router = express.Router()
const comentariosProductosController = require('../controller/commentProducts')

/**
 * @swagger
 * /:
 *   get:
 *     summary: Obtiene todos los comentarios de productos
 *     tags: [ProductComments]
 *     responses:
 *       200:
 *         description: La lista de comentarios de productos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   comment:
 *                     type: string
 */
router.get('/', comentariosProductosController.getAllProductComments)

/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Obtiene un comentario de producto por su ID
 *     tags: [ProductComments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: El comentario de producto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 comment:
 *                   type: string
 */
router.get('/:id', comentariosProductosController.getProductCommentById)

/**
 * @swagger
 * /:
 *   post:
 *     summary: Crea un nuevo comentario de producto
 *     tags: [ProductComments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *     responses:
 *       200:
 *         description: El comentario de producto ha sido creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 comment:
 *                   type: string
 */
router.post('/', comentariosProductosController.createProductComment)

/**
 * @swagger
 * /{id}:
 *   put:
 *     summary: Actualiza un comentario de producto
 *     tags: [ProductComments]
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
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *     responses:
 *       200:
 *         description: El comentario de producto ha sido actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 comment:
 *                   type: string
 */
router.put('/:id', comentariosProductosController.updateProductComment)

/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Elimina un comentario de producto
 *     tags: [ProductComments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: El comentario de producto ha sido eliminado correctamente
 */
router.delete('/:id', comentariosProductosController.deleteProductComment)

module.exports = router