const { expect, use } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const connection = require('../../../src/connection/connection');
const { salesModel } = require('../../../src/models');
// const { getAllSales } = require('../../../src/models/sales.model');
const { salesMock, expectedResultById } = require('../../mock/sales.mocks');

describe('testa o endpoint de vendas na camada service', function () {
  afterEach(sinon.restore);
  it('testa a função getAllSalesService', async function () {
    sinon.stub(connection, 'execute').resolves(salesMock);
    const responseService = await 
  });  
});
