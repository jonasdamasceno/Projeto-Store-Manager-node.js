const route = require('express').Router();
const { salesController } = require('../controllers');
const { validateSaleId, validateQuantity } = require('../middlewares');

route.put(
  '/:saleId/products/:productId/quantity', 
  validateQuantity.validateQuantity,
  validateQuantity.validateSale,
  salesController.updateQuantity,
);
route.get('/', salesController.getAllSales);
route.post('/', salesController.insertNewSales);
route.delete('/:id', validateSaleId.validateSaleId, salesController.deleteSales);
route.get('/:id', salesController.getSaleById);

module.exports = route;

// falta testes delete, e put