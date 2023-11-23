const { expect, use } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const models = require('../../../src/models');
const allProducts = require('../../mock');
const {
  getAllProducts,
  getProductsById,
} = require('../../../src/services/products.service');

use(sinonChai);

describe('testa as funçoes da camada service', function () {
  afterEach(sinon.restore);
  it('testa a função getAllProducts da camada service', async function () {
    sinon.stub(models.products, 'getAllProducts').resolves(allProducts);
    const result = await getAllProducts();
    expect(result).to.be.deep.equal(allProducts);
  });
});