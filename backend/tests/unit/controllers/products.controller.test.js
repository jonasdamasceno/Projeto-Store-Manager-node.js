const { expect, use } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const services = require('../../../src/services');
const {
  getAllProducts,
  getProductsById,
} = require('../../../src/controllers/products.controller');

use(sinonChai);

describe('products.controller()', function () {
  let res;
  beforeEach(function () {
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
  });
  afterEach(sinon.restore);

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
    const expectedResult = { id: 3, name: 'Product 3' };
    sinon.stub(services.products, 'getProductsById').resolves(expectedResult);
    const req = { params: { id: 3 } };
    await getProductsById(req, res);
    expect(res.status).to.have.been.calledOnceWith(200);
    expect(res.json).to.have.been.calledOnceWith(expectedResult);
  });
  it('testa se o status 404 é exibido se a função nao encontra um id', async function () {
    sinon.stub(services.products, 'getProductsById').resolves(undefined);
    const req = { params: { id: 999 } };
    await getProductsById(req, res);
    expect(res.status).to.have.been.calledOnceWith(404);
    expect(res.json).to.have.been.calledOnceWith({
      message: 'Product not found',
    });
  });
});
