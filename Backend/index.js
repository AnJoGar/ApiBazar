const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const products = [
  {
    id: 1,
    title: 'Camiseta',
    price: 20.99,
    description: 'Una camiseta de algodón de alta calidad.',
  },
  {
    id: 2,
    title: 'Pantalones',
    price: 34.99,
    description: 'Pantalones vaqueros para hombres.',
  },
  {
    id: 3,
    title: 'Zapatillas deportivas',
    price: 49.99,
    description: 'Zapatillas deportivas para correr.',
  }
];

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

// Controlador para buscar productos
app.get('/api/items', (req, res) => {
  const query = req.query.q;
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(query.toLowerCase())
  );
  res.json(filteredProducts);
});

// Controlador para obtener detalles de un producto específico
app.get('/api/items/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  console.log('Solicitud GET recibida en /api/items/:id con ID:', productId);

  const product = products.find(product => product.id === productId);
  console.log('Producto encontrado:', product);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});