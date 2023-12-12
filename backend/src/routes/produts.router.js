const route = require('express').Router();
const { productsModel } = require('../models');
const { productController } = require('../controllers');
const { verifyProductId } = require('../middlewares');

route.get('/', async (req, res) => {
  const products = await productsModel.findAll();
  return res.status(200).json(products);
});
route.get('/search', productController.filterProducts);
route.post('/', productController.insertNewProduct);
route.delete('/:id', verifyProductId.verifyIdExist, productController.productDelete);

route.get('/:id', productController.findById);
route.put('/:id', productController.updateProductName);

module.exports = route;

// falta testes delete