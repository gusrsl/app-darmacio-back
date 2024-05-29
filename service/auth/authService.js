const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userService = require('../userService')
const { configEnv } = require('../../config')

async function login(nombreUsuario, contrasena) {
  try {
    const usuario = await userService.findUser(nombreUsuario)

    if (!usuario) {
      throw new Error('User not found')
    }
    const passwordMatch = await bcrypt.compare(contrasena, usuario.contrasena)

    if (!passwordMatch) {
      throw new Error('Credenciales inválidas')
    }

    const token = jwt.sign({ id: String(usuario.id) }, configEnv.JWT_SECRET, {
      expiresIn: '1d',
      subject: String(usuario.id),
      issuer: 'app-darmacio',
    })

    return { auth: true, token: token }
  } catch (err) {
    console.error('Error logging in:', err)
    throw err
  }
}

module.exports = {
  login,
}
