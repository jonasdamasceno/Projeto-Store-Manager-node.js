const { Router } = require('express');
const { salesController } = require('../controllers');
const { verifySaleExists } = require('../middlewares/verificySaleById');

const router = Router();

router.get('/', salesController.getAllSales);
router.get('/:id', salesController.getSaleById);
router.post('/', salesController.handleSalesInsertion);
router.delete('/:id', verifySaleExists, salesController.removesale);

module.exports = router;