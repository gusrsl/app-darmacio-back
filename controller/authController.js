const authService = require('../service/auth/authService')

const loginUser = async (req, res, next) => {
  const { nombreUsuario, contrasena } = req.body
  try {
    const response = await authService.login(nombreUsuario, contrasena)

    res.status(200).json(response)
  } catch (err) {
    next(err)
  }
}

module.exports = { loginUser }
