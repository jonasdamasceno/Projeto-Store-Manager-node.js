const { expect } = require('chai');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const connection = require('../../../src/connection/connection');
const { allProducts } = require('../../mock/mocks');
const {
  getAllProducts,
  getProductsById,
} = require('../../../src/models/products.model');

chai.use(sinonChai);

describe('testa as funçes da camada model', function () {
  afterEach(sinon.restore);
  it('testa o retorno da função getAllProducts da camada model', async function () {
    sinon.stub(connection, 'execute').resolves([allProducts]);

    const result = await getAllProducts();
    expect(result).to.be.deep.equal(allProducts);
  });
  it('testa o retorno da função getAllProducts na camada controller', async function () {
    sinon.stub(connection, 'execute').resolves([[allProducts]]);

    const result = await getProductsById(3);
    expect(result).to.be.deep.equal(allProducts);
  });
  // it('should create a product', async function () {
  //   sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
  //   const result = await create('Product 1');
  //   expect(result).to.equal(1);
  // });
});
