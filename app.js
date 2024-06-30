const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

const { configEnv } = require('./config');

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/productos');
const imagenproductRoutes = require('./routes/productoimagen');
const coloresRoutes = require('./routes/colores');
const comentariosProductosRoutes = require('./routes/comentariosproductos');
const enviosRoutes = require('./routes/envios');
const imagesRoutes = require('./routes/imagenes'); // Aquí se importa la nueva ruta
const measureRoutes = require('./routes/medidas');
const porductLikeRoutes = require('./routes/megustasproducto');
const offerRoutes = require('./routes/ofertas');
const productMeasuresRoutes = require('./routes/productosmedidas');
const userRoutes = require('./routes/users');
const productRatingRoutes = require('./routes/valoracionesproducto');
const productViewRoutes = require('./routes/vistasproducto');
const emailRoutes = require('./routes/sendmail');
const pedidoRoutes = require('./routes/pedidos'); // Añade esta línea para incluir las rutas de pedidos


const { handleErrors, notFound, securityPolicy } = require('./middleware');

const paymentRoutes = require('./routes/paymentRoutes');

const app = express();
const port = configEnv.PORT;

// Swagger options
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API de mi aplicación',
      version: '1.0.0',
      description: 'Esta es la documentación de la API de mi aplicación',
    },
    servers: [
      {
        url: `https://api.gustavo-rodriguez.tech:${port}`,
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(swaggerOptions);

// Middlewares
app.use(cors({ origin: '*' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.disable('x-powered-by');
app.use(securityPolicy);

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Servir imágenes de la carpeta 'uploads'
app.use('/images', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/payments', paymentRoutes);
app.use('/auth', authRoutes);
app.use('/productos', productRoutes);
app.use('/imagen', imagenproductRoutes);
app.use('/colores', coloresRoutes);
app.use('/comentarios-productos', comentariosProductosRoutes);
app.use('/envios', enviosRoutes);

app.use('/imagenes', imagesRoutes); // Aquí se usa la nueva ruta
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/medidas', measureRoutes);
app.use('/megusta-producto', porductLikeRoutes);
app.use('/ofertas', offerRoutes);
app.use('/productos-medidas', productMeasuresRoutes);
app.use('/users', userRoutes);
app.use('/valoraciones-producto', productRatingRoutes);
app.use('/vistas-producto', productViewRoutes);
app.use('/email', emailRoutes);
app.use(pedidoRoutes); // Añade esta línea para incluir las rutas de pedidos


// Handle errors
app.use(notFound);
app.use(handleErrors);

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});