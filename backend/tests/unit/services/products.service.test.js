const { expect, use } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const models = require('../../../src/models');
const {
  allProducts,
  batmanHammer,
  batmanHammerWithId,
} = require('../../mock/mocks');
// const { responseService } = require('../../../src/services');
const {
  getAllProducts,
  getProductsById,
} = require('../../../src/services/products.service');
const { products } = require('../../../src/services');

use(sinonChai);

describe('testa as funçoes da camada service', function () {
  it('testa a função getAllProducts da camada service', async function () {
    sinon.stub(models.products, 'getAllProducts').resolves(allProducts);
    const result = await getAllProducts();
    expect(result).to.be.deep.equal(allProducts);
  });
  it('testa a função getProductsById com o status de SUCCESS', async function () {
    sinon.stub(models.products, 'getProductsById').resolves(allProducts);
    const result = await getProductsById(1);
    expect(result.status).to.equal('SUCCESS');
    expect(result.data).to.be.deep.equal(allProducts);
  });
  it('testa a função getProductsById quando o id nao é encontrado', async function () {
    sinon.stub(models.products, 'getProductsById').resolves();
    const result = await getProductsById(999);
    expect(result.status).to.equal('NOT_FOUND');
    expect(result.data.message).to.be.deep.equal('Product not found');
  });
  it('testa o funcionamento da atulização da tabela products', async function () {
    sinon.stub(models.products, 'getAllProducts').resolves(allProducts);
    sinon.stub(models.products, 'updateProduct').resolves();
    const productIdToUpdate = 1;
    const serviceLayerResponse = await products.updateProductService(
      batmanHammer,
      productIdToUpdate,
    );
    expect(serviceLayerResponse.status).to.equal('SUCCESS');
    expect(serviceLayerResponse.data).to.deep.equal(batmanHammerWithId);
  });
  it('testa a condição de que o nome tem que ter mais de 5 letras', async function () {
    sinon.stub(models.products, 'getAllProducts').resolves(allProducts);
    sinon.stub(models.products, 'updateProduct').resolves();
    const newProduct = { name: 'teia' };
    const productIdToUpdate = 1;
    const serviceLayerResponse = await products.updateProductService(
      newProduct,
      productIdToUpdate,
    );
    const message = '"name" length must be at least 5 characters long';
    expect(serviceLayerResponse.status).to.equal('INVALID_VALUE');
    expect(serviceLayerResponse.data.message).to.equal(message);
  });
  it('testa a atualização do produto sem a chave name', async function () {
    sinon.stub(models.products, 'getAllProducts').resolves(allProducts);
    sinon.stub(models.products, 'updateProduct').resolves();
    const productIdToUpdate = 1;
    const message = '"name" is required';

    const serviceLayerResponse = await products.updateProductService({}, productIdToUpdate);
    expect(serviceLayerResponse.status).to.equal('BAD_REQUEST');
    expect(serviceLayerResponse.data.message).to.equal(message);
  });
  it('testa se nao é possivel atualizar um produto sem id no BD', async function () {
    sinon.stub(models.products, 'getAllProducts').resolves(allProducts);
    sinon.stub(models.products, 'updateProduct').resolves();
    const message = 'Product not found';
    
    const serviceLayerResponse = await products.updateProductService(batmanHammer, 999);
    expect(serviceLayerResponse.status).to.equal('NOT_FOUND');
    expect(serviceLayerResponse.data.message).to.equal(message);
  });
  afterEach(function () {
    sinon.restore();
  });
});
