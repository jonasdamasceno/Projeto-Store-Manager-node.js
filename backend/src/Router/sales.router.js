const { Router } = require('express');
const { salesController } = require('../controllers');
const { verifySaleExists } = require('../middlewares/verificySaleById');
const { validateQuantity, validateSale } = require('../middlewares/validateQuatity');
const { updateSalesProductQuantityHandler } = require('../controllers/sales.controller');

const router = Router();

router.get('/', salesController.getAllSales);
router.get('/:id', salesController.getSaleById);
router.post('/', salesController.handleSalesInsertion);
router.put(
  '/:saleId/products/:productId/quantity', 
  validateQuantity,
  validateSale,
  updateSalesProductQuantityHandler,
);

router.delete('/:id', verifySaleExists, salesController.removesale);

module.exports = router;