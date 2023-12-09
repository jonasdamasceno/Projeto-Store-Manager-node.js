const { Router } = require('express');
const { getProductsById, getAllProducts, 
  create } = require('../controllers/product.controller');

const router = Router();

router.get('/', getAllProducts);
router.get('/:id', getProductsById);
router.post('/', create);

module.exports = router;
