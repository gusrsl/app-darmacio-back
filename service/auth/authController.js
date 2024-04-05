const express = require('express');
const authService = require('./authService');
const userService = require('../userService');

const router = express.Router();

router.post('/register', async (req, res) => {
    console.log(req.body);
    const { nombreUsuario, contrasena, correo, nombre, apellido, direccion, ciudad, pais, codigoPostal, telefono } = req.body;
    try {
        const response = await userService.register(nombreUsuario, contrasena, correo, nombre, apellido, direccion, ciudad, pais, codigoPostal, telefono);
        res.status(201).json(response);
    } catch (err) {
        console.log(err);
        if (err.message === 'El nombre de usuario ya existe') {
            res.status(400).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
});

router.post('/login', async (req, res) => {
    console.log(req.body); // Agrega esta línea para depurar
    const { nombreUsuario, contrasena } = req.body;
    try {
        const response = await authService.login(nombreUsuario, contrasena);
        res.json(response);
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
}); 

module.exports = router;