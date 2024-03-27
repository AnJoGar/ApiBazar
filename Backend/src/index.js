const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const productsFilePath = path.resolve(__dirname, 'products.json');
console.log('Ruta del archivo products.json:', productsFilePath);

const products = require('./products.json');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

// Controlador para buscar productos
app.get('/api/items', (req, res) => {
  const query = req.query.q;
  const filteredProducts = products.products.filter(product =>
    product.title.toLowerCase().includes(query.toLowerCase())
  );
  res.json(filteredProducts);
});

// Controlador para obtener detalles de un producto específico
app.get('/api/items/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.products.find(product => product.id === productId);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});