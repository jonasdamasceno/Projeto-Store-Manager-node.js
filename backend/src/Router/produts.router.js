const { Router } = require('express');
const { getProductsById, getAllProducts } = require('../controllers/product.controller');

const router = Router();

router.get('/', getAllProducts);
router.get('/:id', getProductsById);

module.exports = router;
