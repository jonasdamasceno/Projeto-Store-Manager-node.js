const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const { productService } = require('../../../src/services');
const {
  product,
  productIdFromModel,
  mockProducts,
  updateProduct,
  updatedProductService,
} = require('../../mock/products.mock');

describe('Realizando testes - PRODUCTS SERVICES:', function () {
  it('Verifica findById com sucesso', async function () {
    sinon.stub(productsModel, 'findById').resolves(product);

    const serviceResponse = await productService.findById(1);

    expect(serviceResponse.status).to.equal('SUCCES');
    expect(serviceResponse.data).to.be.deep.equal(product);
  });
  it('Verifica findById com falha', async function () {
    sinon.stub(productsModel, 'findById').resolves();

    const serviceResponse = await productService.findById(1);

    expect(serviceResponse.status).to.equal('NOT_FOUND');
    expect(serviceResponse.data.message).to.be.deep.equal('Product not found');
  });
  it('Verifica se é possivel inserir um produto corretamente', async function () {
    sinon.stub(productsModel, 'insertNewProduct').resolves(productIdFromModel);
    const inputData = { name: 'Marreta 25kg' };

    const serviceResponse = await productService.createNewProduct(inputData);
    expect(serviceResponse.status).to.be.equal('CREATED');
    expect(serviceResponse.data).to.be.deep.equal({
      id: 5,
      name: 'Marreta 25kg',
    });
  });
  it('Verifica se o nome não existir', async function () {
    sinon.stub(productsModel, 'insertNewProduct').resolves(productIdFromModel);
    // const inputData = { namee: 'Marreta 25kg' };
    const serviceResponse = await productService.createNewProduct({});
    expect(serviceResponse.status).to.be.equal('BAD_REQUEST');
    expect(serviceResponse.data.message).to.be.deep.equal('"name" is required');
  });
  it('Verifica se o nome for menor que 5 letras', async function () {
    sinon.stub(productsModel, 'insertNewProduct').resolves(productIdFromModel);
    const inputData = { name: 'abc' };
    const serviceResponse = await productService.createNewProduct(inputData);
    expect(serviceResponse.status).to.be.equal('INVALID_VALUE');
    expect(serviceResponse.data.message).to.be.deep.equal(
      '"name" length must be at least 5 characters long',
    );
  });
  it('Verfica se é possivel atualizar um produto com sucesso', async function () {
    sinon.stub(productsModel, 'findAll').resolves(mockProducts);
    sinon.stub(productsModel, 'updateNewProduct').resolves();

    const serviceResponse = await productService.updateProduct(
      updateProduct,
      1,
    );
    expect(serviceResponse.status).to.equal('SUCCES');
    expect(serviceResponse.data).to.deep.equal(updatedProductService);
  });
  it('Verfica se é não possivel atualizar sem a chave name', async function () {
    sinon.stub(productsModel, 'findAll').resolves(mockProducts);
    sinon.stub(productsModel, 'updateNewProduct').resolves();

    const serviceResponse = await productService.updateProduct({}, 1);
    expect(serviceResponse.status).to.equal('BAD_REQUEST');
    expect(serviceResponse.data.message).to.equal('"name" is required');
  });
  it('Verfica se é não possivel atualizar nome menor que 5 letras', async function () {
    sinon.stub(productsModel, 'findAll').resolves(mockProducts);
    sinon.stub(productsModel, 'updateNewProduct').resolves();
    const inputProduct = { name: 'Jet' };
    const serviceResponse = await productService.updateProduct(inputProduct, 1);
    expect(serviceResponse.status).to.equal('INVALID_VALUE');
    expect(serviceResponse.data.message).to.equal(
      '"name" length must be at least 5 characters long',
    );
  });
  it('Verfica se é não possivel atualizar nome com id Inexistente', async function () {
    sinon.stub(productsModel, 'findAll').resolves(mockProducts);
    sinon.stub(productsModel, 'updateNewProduct').resolves();
    const serviceResponse = await productService.updateProduct(
      updateProduct,
      10,
    );
    expect(serviceResponse.status).to.equal('NOT_FOUND');
    expect(serviceResponse.data.message).to.equal('Product not found');
  });

  afterEach(function () {
    sinon.restore();
  });
});
