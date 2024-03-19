
//Controlador::itemProductController
const products = require('../products.json');

// Controlador para buscar productos
exports.searchProducts = (req, res) => {
  const query = req.query.q;
  const filteredProducts = req.products.filter(product =>
    product.title.toLowerCase().includes(query.toLowerCase())
  );
  res.json(filteredProducts);
};

// Controlador para obtener detalles de un producto específico
exports.getProductDetails = (req, res) => {
  
  const productId = parseInt(req.params.id);
  const product = req.products.find(product => product.id === productId);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
}