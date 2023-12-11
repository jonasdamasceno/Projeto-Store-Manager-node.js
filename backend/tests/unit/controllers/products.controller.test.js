const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const services = require('../../../src/services');
const {
  getAllProducts,
  getProductsById,
} = require('../../../src/controllers/product.controller');
// const { products } = require('../../../src/models');

const { expect } = chai;
chai.use(sinonChai);

describe('testa as funçoes da camada controller', function () {
  let res;
  beforeEach(function () {
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
  });
  afterEach(function () {
    sinon.restore();
  });

  it('testa o retorno da função getAllProducts na camada controller', async function () {
    const expectedResult = [
      { id: 1, name: 'Product 1' },
      { id: 2, name: 'Product 2' },
    ];
    sinon.stub(services.products, 'getAllProducts').resolves(expectedResult);
    await getAllProducts(undefined, res);
    expect(res.status).to.have.been.calledOnceWith(200);
    expect(res.json).to.have.been.calledOnceWith(expectedResult);
  });
  it('testa o retorno da função getProductsById na camada controller', async function () {
    const product = { id: 1, name: 'Martelo de Thor' };
    sinon
      .stub(services.products, 'getProductsById')
      .resolves({ status: 'SUCCESS', data: product });
    const req = { params: { id: 1 }, body: {} };
    await getProductsById(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(product);
  });
});
