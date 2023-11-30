const { expect, use } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const models = require('../../../src/models');
const allProducts = require('../../mock/mocks');
// const { responseService } = require('../../../src/services');
const {
  getAllProducts,
  getProductsById,
} = require('../../../src/services/products.service');

use(sinonChai);

describe('testa as funçoes da camada service', function () {
  it('testa a função getAllProducts da camada service', async function () {
    sinon.stub(models.products, 'getAllProducts').resolves(allProducts);
    const result = await getAllProducts();
    expect(result).to.be.deep.equal(allProducts);
  });
  it('testa a função getProductsById com o status de SUCCES', async function () {
    sinon.stub(models.products, 'getProductsById').resolves(allProducts);
    const result = await getProductsById(1);
    expect(result.status).to.equal('SUCCES');
    expect(result.data).to.be.deep.equal(allProducts);
  });
  it('testa a função getProductsById', async function () {
    sinon.stub(models.products, 'getProductsById').resolves();
    const result = await getProductsById(999);
    expect(result.status).to.equal('NOT_FOUND');
    expect(result.data.message).to.be.deep.equal('Product not found');
  });
  afterEach(function () {
    sinon.restore();
  });
});
