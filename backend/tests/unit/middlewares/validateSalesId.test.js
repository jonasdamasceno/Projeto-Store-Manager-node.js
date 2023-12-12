const { expect } = require('chai');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { salesModel } = require('../../../src/models');
const { salesMock } = require('../../mock/sales.mocks');
const { verifyIdExist } = require('../../../src/middlewares/verificyId');

chai.use(sinonChai);

describe('testa a validação de vendas', function () {
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
    sinon.stub(salesModel, 'getAllSales').resolves(salesMock);
    const req = {
      body: {},
      params: { id: 1 },
    };
    // const messageQuantityIsRequired = { message: '"quantity" is required' };
    const next = sinon.stub().returns();
    await verifyIdExist(req, res, next);
    expect(next).to.have.calledWith();
  });
  it('testa a validação quando é passado um id falso', async function () {
    sinon.stub(salesModel, 'getAllSales').resolves(salesMock);
    const req = {
      body: {},
      params: { id: 999 },
    };
    const messageProductNotFound = {
      message: 'Product not found',
    };
    const next = sinon.stub().returns();
    await verifyIdExist(req, res, next);
    expect(res.json).to.have.calledWith(messageProductNotFound);
  });
});
