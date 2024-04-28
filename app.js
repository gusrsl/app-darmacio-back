require('dotenv').config({ path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env' });

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authController = require('./service/auth/authController');
const productController = require('./routes/productos'); // Asegúrate de que esta ruta sea correcta
const imagenproductController = require('./routes/productoimagen'); // Asegúrate de que esta ruta sea correcta

const app = express();

// Habilita CORS para todas las rutas
app.use(cors());

app.use(bodyParser.json());
app.use('/auth', authController);
app.use('/productos', productController); // Agrega el controlador de productos
app.use('/imagen', imagenproductController); // Agrega el controlador de productos

app.listen(3000);

//$env:NODE_ENV="development"; node app.js

//$env:NODE_ENV="production"; node app.js