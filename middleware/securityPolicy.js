const securityPolicy = (req, res, next) => {
  req.setTimeout(5000) // Set request timeout to 5 seconds
  res.setTimeout(5000) // Set response timeout to 5 seconds
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self'; font-src 'self'",
  )
  next()
}

module.exports = securityPolicy
