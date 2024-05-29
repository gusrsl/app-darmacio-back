const notFound = (req, res) => {
  res.status(404).json({ error: `Ruta no encontrada ${req.originalUrl}` })
}

module.exports = notFound
