var express = require('express')
var router = express.Router()
var userController = require('../controller/userController')

/**
 * @swagger
 * /:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: La lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/', userController.getAllUsers)


/**
 * @swagger
 * /:
 *   post:
 *     summary: Registra un nuevo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.post('/', userController.registerUser)

/**
 * @swagger
 * /:
 *   put:
 *     summary: Actualiza un usuario existente
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.put('/', userController.updateUser)

/**
 * @swagger
 * /{nombreUsuario}:
 *   delete:
 *     summary: Elimina un usuario existente
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: nombreUsuario
 *         schema:
 *           type: string
 *         required: true
 *         description: Nombre de usuario del usuario a eliminar
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 */
router.delete('/:nombreUsuario', userController.deleteUser)

module.exports = router