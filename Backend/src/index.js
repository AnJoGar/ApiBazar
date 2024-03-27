//index.js
const path = require('path');

// Obtener la ruta completa del archivo products.json
const productsFilePath = path.resolve(__dirname, 'products.json');


console.log('Ruta del archivo products.json:', productsFilePath);
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const itemsRouter = require('./itemsRoutes');
const products = require('./products.json');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

// Asigna la lista de productos al objeto req
app.use((req, res, next) => {
  req.products = products.products;
  next();
});

// Monta el enrutador de items
app.use(itemsRouter);

app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
