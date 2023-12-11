const { Router } = require('express');
const { getProductsById, getAllProducts, 
  create, 
  removeProduct, 
  updateProductController } = require('../controllers/product.controller');
const { verifyProductExists } = require('../middlewares/verificyId');

const router = Router();

router.get('/', getAllProducts);
router.get('/:id', getProductsById);
router.post('/', create);
router.put('/:id', updateProductController);
router.delete('/:id', verifyProductExists, removeProduct);

module.exports = router;
