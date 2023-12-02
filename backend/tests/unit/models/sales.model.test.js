const { expect, use } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const connection = require('../../../src/connection/connection');
const { getAllSales } = require('../../../src/models/sales.model');
const { salesMock } = require('../../mock/sales.mocks');

use(sinonChai);

describe('testa as funçoes sales da camada model', function () {
  afterEach(sinon.restore);
  it('testa a função getAllSales da camada model', async function () {
    // const expectedResult = [
    //   { id: 1, name: 'Sales 1' },
    //   { id: 2, name: 'Sales 2' },
    // ];
    sinon.stub(connection, 'execute').resolves(salesMock);
    const result = await getAllSales();
    expect(result).to.be.deep.equal(salesMock);
  });
});
