//app.js 

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const itemsRouter = require('./Routes/itemsRoutes');

const app = express();
const PORT = process.env.PORT || 3000;
const fs = require('fs');
app.use(bodyParser.json());
app.use(cors());

// Rutas
// Lee el contenido del archivo products.json
fs.readFile('src/products.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo products.json:', err);
      return;
    }
  
    try {
      // Parsea el contenido como un objeto JSON
      const products = JSON.parse(data);
      console.log('Productos cargados correctamente:', products);
  
      // Se pasa la lista de productos al enrutador de items
      app.use((req, res, next) => {
        req.products = products.products;
        next();
      });
  
      // Se monta el enrutador de items
      app.use(itemsRouter);
    } catch (error) {
      console.error('Error al parsear el contenido de products.json:', error);
    }
  });
  
  app.listen(PORT, () => {
    console.log(`Servidor en ejecución en el puerto ${PORT}`);
  });