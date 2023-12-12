const { expect, use } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { salesService } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');
const {
  salesMock,
  saleFromModelSucces,
  expectedResultById,
  saleIdFromModelSucces,
  statusNotFoundSale,
  insertSalesSucces,
} = require('../../mock/sales.mocks');
// const { getAllSalesService } = require('../../../src/services/sales.service');

use(sinonChai);

describe('testa a camada controller do endpoint sales', function () {
  // let res;
  // beforeEach(function () {
  //   res = {
  //     status: sinon.stub().returnsThis(),
  //     json: sinon.stub(),
  //   };
  // });

  it('testa o returno da função getAllSales camada controller', async function () {
    sinon
      .stub(salesService, 'getAllSalesService')
      .resolves(saleFromModelSucces);
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
  it('testa o funcionamento da função getById da camada controller', async function () {
    sinon
      .stub(salesService, 'getSaleByIdService')
      .resolves(saleIdFromModelSucces);
    const req = {
      body: {},
      params: { id: 1 },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.getSaleById(req, res);
    expect(res.status).to.have.calledWith();
    expect(res.json).to.have.calledWith(expectedResultById);
  });
  it('testa o funcionamento da função getById da erro com um id inexistente', async function () {
    sinon.stub(salesService, 'getSaleByIdService').resolves(statusNotFoundSale);
    const req = {
      body: {},
      params: { id: 999 },
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
    sinon.stub(salesService, 'createAndInsertSales').resolves(insertSalesSucces);

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
    await salesController.handleSalesInsertion(req, res);
    expect(res.status).to.have.calledWith(201);
  });
  // it('Deve retornar o status 204 ao deletar uma venda com sucesso', async function () {
  //   const req = {
  //     params: {
  //       id: 1,
  //     },
  //   };
  //   const res = { sendStatus: sinon.stub().returnsThis(), json: sinon.stub() };
  //   await salesController.removesale(req, res);
  //   expect(res.sendStatus.calledWith(204)).to.be.equal(true);
  // });

  afterEach(sinon.restore);
});
