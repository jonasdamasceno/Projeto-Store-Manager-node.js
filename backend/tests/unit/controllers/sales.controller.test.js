const { expect } = require('chai');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { salesService } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');
const {
  saleFromModelSucces,
  salesMock,
  saleIdFromModelSucces,
  salesWithIdOne,
  saleFromModelNotFound,
  insertSalesSucces,
} = require('../../mock/sales.mocks');

chai.use(sinonChai);

describe('Realizando testes - SALES CONTROLLER:', function () {
  it('Verifica AllSales retorna corretamente', async function () {
    sinon.stub(salesService, 'findAllSales').resolves(saleFromModelSucces);
    const req = {
      body: {},
      params: {},
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await salesController.getAllSales(req, res);

    expect(res.status).to.have.calledWith(200);
    expect(res.json).to.have.calledWith(salesMock);
  });
  it('Verifica SUCCES salesById', async function () {
    sinon.stub(salesService, 'findSalesById').resolves(saleIdFromModelSucces);
    const req = {
      body: {},
      params: { id: 1 },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await salesController.getSaleById(req, res);

    expect(res.status).to.have.calledWith(200);
    expect(res.json).to.have.calledWith(salesWithIdOne);
  });
  it('Verifica se for solicitado um Id de venda não existente', async function () {
    sinon.stub(salesService, 'findSalesById').resolves(saleFromModelNotFound);
    const req = {
      body: {},
      params: { id: 99999 },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.getSaleById(req, res);
    expect(res.status).to.have.calledWith(404);
    expect(res.json).to.have.calledWith(sinon.match.has('message'));
  });
  it('Verifica se é possivel criar novas vendas', async function () {
    sinon.stub(salesService, 'insertSales').resolves(insertSalesSucces);

    const req = {
      body: [
        {
          productId: 1,
          quantity: 1,
        },
        {
          productId: 2,
          quantity: 5,
        },
      ],
      params: {},
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await salesController.insertNewSales(req, res);
    expect(res.status).to.have.calledWith(201);
  });

  afterEach(function () {
    sinon.restore();
  });
});
