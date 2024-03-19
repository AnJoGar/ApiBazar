//Routes:::itemsRoutes

const express = require('express');
const router = express.Router();
const itemsController = require('../Controller/itemProductController');

// Ruta para buscar productos
router.get('/api/items', itemsController.searchProducts);

// Ruta para obtener detalles de un producto específico
router.get('/api/items/:id', itemsController.getProductDetails);

module.exports = router;