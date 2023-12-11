const { Router } = require('express');
const { getProductsById, getAllProducts, 
  create, 
  updateProductController, 
  productDelete } = require('../controllers/product.controller');
const { verifyIdExist } = require('../middlewares/verificyId');

const router = Router();

router.get('/', getAllProducts);
router.get('/:id', getProductsById);
router.post('/', create);
router.put('/:id', updateProductController);
router.delete('/:id', verifyIdExist, productDelete);

module.exports = router;
