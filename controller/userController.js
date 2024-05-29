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

module.exports = { registerUser, getAllUsers }
