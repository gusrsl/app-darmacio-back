require('dotenv').config()
//.config({ path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env' });

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const { configEnv } = require('./config')

const authRoutes = require('./routes/auth')
const productRoutes = require('./routes/productos') // Asegúrate de que esta ruta sea correcta
const imagenproductRoutes = require('./routes/productoimagen') // Asegúrate de que esta ruta sea correcta
const coloresRoutes = require('./routes/colores')
const comentariosProductosRoutes = require('./routes/comentariosproductos')
const enviosRoutes = require('./routes/envios')
const imagesRoutes = require('./routes/imagenes')
const measureRoutes = require('./routes/medidas')
const porductLikeRoutes = require('./routes/megustasproducto')
const offerRoutes = require('./routes/ofertas')
const productMeasuresRoutes = require('./routes/productosmedidas')
const userRoutes = require('./routes/users')
const productRatingRoutes = require('./routes/valoracionesproducto')
const productViewRoutes = require('./routes/vistasproducto')

const { handleErrors, notFound, securityPolicy } = require('./middleware')

const app = express()
const port = configEnv.PORT

// Middlewares
app.use(cors({ origin: '*' }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.disable('x-powered-by')
app.use(securityPolicy)

// Routes
app.use('/auth', authRoutes)
app.use('/productos', productRoutes) // Agrega el controlador de productos
app.use('/imagen', imagenproductRoutes) // Agrega el controlador de productos
app.use('/colores', coloresRoutes)
app.use('/comentarios-productos', comentariosProductosRoutes)
app.use('/envios', enviosRoutes)
app.use('/imagenes', imagesRoutes)
app.use('/medidas', measureRoutes)
app.use('/megusta-producto', porductLikeRoutes)
app.use('/ofertas', offerRoutes)
app.use('/productos-medidas', productMeasuresRoutes)
app.use('/users', userRoutes)
app.use('/valoraciones-producto', productRatingRoutes)
app.use('/vistas-producto', productViewRoutes)

// Handle errors
app.use(notFound)
app.use(handleErrors)

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`)
})

//$env:NODE_ENV="development"; node app.js

//$env:NODE_ENV="production"; node app.js
