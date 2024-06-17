const userService = require('../service/userService')

const registerUser = async (req, res, next) => {
  const { ...body } = req.body

  try {
    const userExists = await userService.findUser(body.nombreUsuario)

    if (userExists) {
      res.status(400).json({ error: 'El nombre de usuario ya existe' })
      return
    }

    const response = await userService.createUser(body)

    res.status(201).json({
      message: 'Usuario creado exitosamente',
      user: response,
    })
  } catch (err) {
    next(err)
  }
}

const getAllUsers = async (_req, res, next) => {
  try {
    const users = await userService.getAllUsers()

    res.status(200).json({ users })
  } catch (error) {
    next(error)
  }
}

const updateUser = async (req, res, next) => {
  const { ...body } = req.body

  try {
    const userExists = await userService.findUser(body.nombreUsuario)

    if (!userExists) {
      res.status(400).json({ error: 'El usuario no existe' })
      return
    }

    await userService.updateUser(body)

    res.status(200).json({
      message: 'Usuario actualizado exitosamente',
    })
  } catch (err) {
    next(err)
  }
}

const deleteUser = async (req, res, next) => {
  const { nombreUsuario } = req.params

  try {
    const userExists = await userService.findUser(nombreUsuario)

    if (!userExists) {
      res.status(400).json({ error: 'El usuario no existe' })
      return
    }

    await userService.deleteUser(nombreUsuario)

    res.status(200).json({
      message: 'Usuario eliminado exitosamente',
    })
  } catch (err) {
    next(err)
  }
}

module.exports = { registerUser, getAllUsers, updateUser, deleteUser }
