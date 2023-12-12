const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const {
  salesMock,
  salesWithIdOne,
  insertIdDB,
  insertIdModel,
} = require('../../mock/sales.mocks');
const { salesModel } = require('../../../src/models');

describe('Realizando testes - SALES MODEL:', function () {
  it('Verifica se é retornado todas as vendas', async function () {
    sinon.stub(connection, 'execute').resolves([salesMock]);

    const sales = await salesModel.findAllSales();
    expect(sales).to.be.deep.equal(salesMock);
  });
  it('Verifica se é possivel filtrar por somente uma venda', async function () {
    sinon.stub(connection, 'execute').resolves([salesWithIdOne]);

    const sales = await salesModel.findSalesById(1);

    expect(sales).to.be.deep.equal(salesWithIdOne);
  });
  it('Verifica se é possivel cadastrar produtos', async function () {
    sinon
      .stub(connection, 'execute')
      .onFirstCall()
      .resolves([insertIdDB])
      .onSecondCall()
      .resolves(null);

    const inputData = [
      {
        productId: 1,
        quantity: 1,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ];
    const insertId = await salesModel.insertNewSales(inputData);
    expect(insertId).to.be.an('number');
    expect(insertId).to.be.equal(insertIdModel);
  });
  afterEach(function () {
    sinon.restore();
  });
});
