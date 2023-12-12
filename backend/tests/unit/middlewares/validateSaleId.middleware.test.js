const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { validateSaleId } = require('../../../src/middlewares');
const { salesModel } = require('../../../src/models');
const { salesMock } = require('../../mock/sales.mocks');

const { expect } = chai;

chai.use(sinonChai);
describe('Realizando testes - MIDDLEWARES: validateSaleId:', function () {
  it('Verifica quando é passado um ID existente', async function () {
    sinon.stub(salesModel, 'findAllSales').resolves(salesMock);
    const req = {
      body: {},
      params: { id: 1 },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub().returns();

    await validateSaleId.validateSaleId(req, res, next);
    expect(next).to.have.calledWith();
  });
  it('Verifica quando é passado um não existente', async function () {
    sinon.stub(salesModel, 'findAllSales').resolves(salesMock);
    const req = {
      body: {},
      params: { id: 10 },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub().returns();

    await validateSaleId.validateSaleId(req, res, next);
    expect(res.json).to.have.calledWith({ message: 'Sale not found' });
  });
  afterEach(function () {
    sinon.restore();
  });
});
