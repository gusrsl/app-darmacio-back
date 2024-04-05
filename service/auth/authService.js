const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userService = require('../userService');

async function login(nombreUsuario, contrasena) {
    const usuario = await userService.findUser(nombreUsuario);
    if (!usuario || !await bcrypt.compare(contrasena, usuario.Contrasena)) {
        throw new Error('Credenciales inválidas');
    }
    const token = jwt.sign({ id: usuario.Id }, 'secret');
    return { auth: true, token: token };
}

module.exports = {
    login
};