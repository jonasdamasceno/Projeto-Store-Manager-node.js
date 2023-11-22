const { Router } = require('express');
const {
  getAllProducts,
  getProductsById,
} = require('../controllers/products.controller');

const router = Router();

router.get('/', getAllProducts);
router.get('/:id', getProductsById);

module.exports = router;
