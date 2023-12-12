const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { verifyProductId } = require('../../../src/middlewares');
const { productsModel } = require('../../../src/models');
const { mockProducts } = require('../../mock/products.mock');

const { expect } = chai;

chai.use(sinonChai);

describe('Realizando testes - MIDDLEWARES: verifyProductId:', function () {
  it('Verifica quando é passado um ID existente', async function () {
    sinon.stub(productsModel, 'findAll').resolves(mockProducts);
    const req = {
      body: {},
      params: { id: 1 },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub().returns();

    await verifyProductId.verifyIdExist(req, res, next);
    expect(next).to.have.calledWith();
  });
  it('Verifica quando é passado um não existente', async function () {
    sinon.stub(productsModel, 'findAll').resolves(mockProducts);
    const req = {
      body: {},
      params: { id: 10 },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub().returns();

    await verifyProductId.verifyIdExist(req, res, next);
    expect(res.json).to.have.calledWith({ message: 'Product not found' });
  });
  afterEach(function () {
    sinon.restore();
  });
});
