const bcrypt = require('bcrypt')
const { executeQuery, searchOne, searchAll } = require('../config/db')

async function createUser(user) {
  try {
    const contrasenaHashed = await bcrypt.hash(user.contrasena, 10)

    const query = `INSERT INTO Usuarios
    (NombreUsuario, Contrasena, Correo, Nombre, Apellido, Direccion,
    Ciudad, Pais, CodigoPostal, Telefono, FechaCreacion, EstaActivo)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW(), true)`

    await executeQuery(query, [
      user.nombreUsuario,
      contrasenaHashed,
      user.correo,
      user.nombre,
      user.apellido,
      user.direccion,
      user.ciudad,
      user.pais,
      user.codigoPostal,
      user.telefono,
    ])
  } catch (err) {
    console.error('Error creating user:', err)
    throw err
  }
}

async function findUser(nombreUsuario) {
  try {
    const query = `SELECT * FROM Usuarios WHERE NombreUsuario = $1`

    const result = await searchOne(query, [nombreUsuario])

    return result
  } catch (err) {
    console.error('Error finding user:', err)
    throw err
  }
}

async function getAllUsers() {
  try {
    const query = `SELECT * FROM Usuarios`

    const result = await searchAll(query)

    return result
  } catch (err) {
    console.error('Error getting all users:', err)
    throw err
  }
}

module.exports = {
  createUser,
  findUser,
  getAllUsers,
}
