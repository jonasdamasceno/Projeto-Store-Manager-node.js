const { expect } = require('chai');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { productService } = require('../../../src/services');
const { productController } = require('../../../src/controllers');
const {
  productFromModelSucces,
  product,
  inserProductModelSucces,
  insertProduct,
  inserProductModelNoName,
  updateProductServiceSucces,
  updatedProductService,
  updateProductServiceNameFiveCharacter,
  updateProductServiceSuccesWithoutName,
  updateProductServiceInvalidId,
} = require('../../mock/products.mock');

chai.use(sinonChai);

describe('Realizando testes - PRODUCTS CONTROLLER:', function () {
  it('Testando findById retornado com SUCESS', async function () {
    sinon.stub(productService, 'findById').resolves(productFromModelSucces);
    const req = {
      params: { id: 1 },
      body: {},
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await productController.findById(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(product);
  });
  it('Testando para inserir um novo produto com sucesso', async function () {
    sinon
      .stub(productService, 'createNewProduct')
      .resolves(inserProductModelSucces);
    const req = {
      params: {},
      body: { name: 'Marreta' },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await productController.insertNewProduct(req, res);
    expect(res.status).to.have.calledWith(201);
    expect(res.json).to.have.calledWith(insertProduct);
  });
  it('Testando para inserir um novo produto com Fracasso', async function () {
    sinon
      .stub(productService, 'createNewProduct')
      .resolves(inserProductModelNoName);
    const req = {
      params: {},
      body: { namee: 'Marreta' },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await productController.insertNewProduct(req, res);
    expect(res.status).to.have.calledWith(400);
    expect(res.json).to.have.calledWith(sinon.match.has('message'));
  });
  it('Testando para atualizar um produto com sucesso', async function () {
    sinon
      .stub(productService, 'createNewProduct')
      .resolves(updateProductServiceSucces);
    const req = {
      params: { id: '1' },
      body: { name: 'Marreta' },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await productController.insertNewProduct(req, res);
    expect(res.status).to.have.calledWith(200);
    expect(res.json).to.have.calledWith(updatedProductService);
  });
  it('Testando para atualizar um com nome menor que 5 caracteres', async function () {
    sinon
      .stub(productService, 'createNewProduct')
      .resolves(updateProductServiceNameFiveCharacter);
    const req = {
      params: { id: '1' },
      body: { name: 'Jet' },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await productController.insertNewProduct(req, res);
    expect(res.status).to.have.calledWith(422);
    expect(res.json).to.have.calledWith(sinon.match.has('message'));
  });
  it('Testando para atualizar um sem a chave name', async function () {
    sinon
      .stub(productService, 'createNewProduct')
      .resolves(updateProductServiceSuccesWithoutName);
    const req = {
      params: { id: '1' },
      body: { name: 'Marreta' },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await productController.insertNewProduct(req, res);
    expect(res.status).to.have.calledWith(400);
    expect(res.json).to.have.calledWith(sinon.match.has('message'));
  });
  it('Testando para atualizar um produto com id Invalido', async function () {
    sinon
      .stub(productService, 'createNewProduct')
      .resolves(updateProductServiceInvalidId);
    const req = {
      params: { id: '10' },
      body: { name: 'Marreta' },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await productController.insertNewProduct(req, res);
    expect(res.status).to.have.calledWith(404);
    expect(res.json).to.have.calledWith(sinon.match.has('message'));
  });

  afterEach(function () {
    sinon.restore();
  });
});
