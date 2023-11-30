const { Router } = require('express');
const { getProductsById, getAllProducts } = require('../controllers/product.controller');

const router = Router();

router.get('/', getAllProducts);
// router.get('/', async (req, res) => {
//   const products = await productsModel.getAllProducts();
//   return res.status(200).json(products);
// });
// router.get('/:id', getProductsById);
router.get('/:id', getProductsById);

module.exports = router;
