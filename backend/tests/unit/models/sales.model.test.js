const { expect, use } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const connection = require('../../../src/connection/connection');
const { salesModel } = require('../../../src/models');
// const { getAllSales } = require('../../../src/models/sales.model');
const { salesMock, expectedResultById, insertIdDB, insertIdModel } = require('../../mock/sales.mocks');

use(sinonChai);

describe('testa as funçoes sales da camada model', function () {
  it('Verifica se é retornado todas as vendas', async function () {
    sinon.stub(connection, 'execute').resolves([salesMock]);

    const sales = await salesModel.getAllSales();
    expect(sales).to.be.deep.equal(salesMock);
  });
  it('verifica o retorno de uma venda atraves do id', async function () {
    sinon.stub(connection, 'execute').resolves([expectedResultById]);
    const resultModel = await salesModel.getSalesById(1);
    expect(resultModel).to.be.deep.equal(expectedResultById);
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
    const insertId = await salesModel.createAndSaveNewSale(inputData);
    expect(insertId).to.be.an('number');
    expect(insertId).to.be.equal(insertIdModel);
  });

  afterEach(sinon.restore);
});
