const { expect } = require('chai');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const {
  validateQuantity,
  validateSale,
} = require('../../../src/middlewares/validateQuatity');
const { salesModel } = require('../../../src/models');
const { salesMock } = require('../../mock/sales.mocks');

chai.use(sinonChai);

describe('testa as validações dos middlewares', function () {
  let res;
  beforeEach(function () {
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
  });
  afterEach(function () {
    sinon.restore();
  });
  it('testa se a validação de quantidade', async function () {
    const req = {
      body: {},
      params: { productId: 1, saleId: 1 },
    };
    const messageQuantityIsRequired = { message: '"quantity" is required' };
    const next = sinon.stub().returns();
    validateQuantity(req, res, next);
    expect(res.json).to.have.calledWith(messageQuantityIsRequired);
  });
  it('testa o funcionamento da validação quando a quantidade é <= 0', async function () {
    const req = {
      body: { quantity: 0 },
      params: { productId: 1, saleId: 1 },
    };
    const messageQuantityIsPositive = {
      message: '"quantity" must be greater than or equal to 1',
    };
    const next = sinon.stub().returns();
    validateQuantity(req, res, next);
    expect(res.json).to.have.calledWith(messageQuantityIsPositive);
  });
  it('testa se é possivel a atualização da quantidade do produto', async function () {
    sinon.stub(salesModel, 'getAllSales').resolves(salesMock);
    const req = {
      body: { quantity: 1 },
      params: { productId: 1, saleId: 10 },
    };
    const messageSaleNotFound = {
      message: 'Sale not found',
    };
    const next = sinon.stub().returns();
    await validateSale(req, res, next);
    expect(res.json).to.have.calledWith(messageSaleNotFound);
  });
  it('testa a existencia do productId', async function () {
    sinon.stub(salesModel, 'getAllSales').resolves(salesMock);
    const req = {
      body: { quantity: 1 },
      params: { productId: 999, saleId: 1 },
    };
    const messageProductNotFound = {
      message: 'Product not found in sale',
    };
    const next = sinon.stub().returns();
    await validateSale(req, res, next);
    expect(res.json).to.have.calledWith(messageProductNotFound);
  });
  it('testa o funcionamento das validaçẽos corretamente', async function () {
    sinon.stub(salesModel, 'getAllSales').resolves(salesMock);
    const req = {
      body: { quantity: 1 },
      params: { productId: 1, saleId: 1 },
    };
    // const messageProductNotFound = {
    //   message: 'Product not found in sale',
    // }
    const next = sinon.stub().returns();
    await validateSale(req, res, next);
    expect(next).to.have.calledWith();
  });
});
