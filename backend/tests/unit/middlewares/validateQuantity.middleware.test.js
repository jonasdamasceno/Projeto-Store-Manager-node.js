const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { validateQuantity } = require('../../../src/middlewares');
const { salesModel } = require('../../../src/models');
const { salesMock } = require('../../mock/sales.mocks');

const { expect } = chai;

chai.use(sinonChai);

describe('Realizando testes - MIDDLEWARES: validateQuantity:', function () {
  it('Verifica se não for passado quantity', async function () {
    const req = {
      body: {},
      params: { productId: 1, saleId: 1 },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub().returns();
    validateQuantity.validateQuantity(req, res, next);

    expect(res.json).to.have.calledWith({ message: '"quantity" is required' });
  });
  it('Verifica se quantity for menor ou igual a 0', async function () {
    const req = {
      body: { quantity: 0 },
      params: { productId: 1, saleId: 1 },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub().returns();
    validateQuantity.validateQuantity(req, res, next);

    expect(res.json).to.have.calledWith({
      message: '"quantity" must be greater than or equal to 1',
    });
  });
  it('Verifica sucesso para atualizar quantity', async function () {
    const req = {
      body: { quantity: 1 },
      params: { productId: 1, saleId: 1 },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub().returns();
    validateQuantity.validateQuantity(req, res, next);

    expect(next).to.have.calledWith();
  });
  it('Verifica saleId não existir em sales', async function () {
    sinon.stub(salesModel, 'findAllSales').resolves(salesMock);
    const req = {
      body: { quantity: 1 },
      params: { productId: 1, saleId: 10 },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub().returns();
    await validateQuantity.validateSale(req, res, next);

    expect(res.json).to.have.calledWith({ message: 'Sale not found' });
  });
  it('Verifica productId não existir em sales', async function () {
    sinon.stub(salesModel, 'findAllSales').resolves(salesMock);
    const req = {
      body: { quantity: 1 },
      params: { productId: 100, saleId: 1 },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub().returns();
    await validateQuantity.validateSale(req, res, next);

    expect(res.json).to.have.calledWith({
      message: 'Product not found in sale',
    });
  });
  it('Verifica validateSale com sucesso', async function () {
    sinon.stub(salesModel, 'findAllSales').resolves(salesMock);
    const req = {
      body: { quantity: 1 },
      params: { productId: 1, saleId: 1 },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub().returns();
    await validateQuantity.validateSale(req, res, next);

    expect(next).to.have.calledWith();
  });

  afterEach(function () {
    sinon.restore();
  });
});
