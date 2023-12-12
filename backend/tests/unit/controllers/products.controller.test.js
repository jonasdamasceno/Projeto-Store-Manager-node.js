const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const services = require('../../../src/services');
const {
  getAllProducts,
  getProductsById,
  updateProductController,
  create,
  // productDelete,
} = require('../../../src/controllers/product.controller');
const {
  statusInvalidValueName5Character,
  // statusBadRequestNameRequired,
  // statusNotFound,
  standardProduct,
  statusCreateNewProduct,
  statusBadRequestNameRequired,
} = require('../../mock/mocks');
const { products } = require('../../../src/models');
// const { productsController } = require('../../../src/controllers');
// const { products } = require('../../../src/models');

const { expect } = chai;
chai.use(sinonChai);

describe('testa as funçoes da camada controller', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('testa o retorno da função getAllProducts na camada controller', async function () {
    const expectedResult = [
      { id: 1, name: 'Product 1' },
      { id: 2, name: 'Product 2' },
    ];
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

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

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const req = { params: { id: 1 }, body: {} };
    await getProductsById(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(product);
  });
  it('testa a condição de que o nome tem que ter mais de 5 letras', async function () {
    sinon
      .stub(services.products, 'updateProductService')
      .resolves(statusInvalidValueName5Character);
    const req = {
      params: { id: '1' },
      body: { name: 'teia' },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await updateProductController(req, res);
    expect(res.status).to.have.calledWith(422);
    expect(res.json).to.have.calledWith(sinon.match.has('message'));
  });
  // it('Testando para atualizar um sem a chave name', async function () {
  //   sinon
  //     .stub(services.products, 'create')
  //     .resolves(statusBadRequestNameRequired);
  //   const req = {
  //     params: { id: '1' },
  //     body: { name: 'Marreta' },
  //   };

  //   const res = {
  //     status: sinon.stub().returnsThis(),
  //     json: sinon.stub(),
  //   };

  //   await productsController.updateProductController(req, res);
  //   expect(res.status).to.have.calledWith(400);
  //   expect(res.json).to.have.calledWith(sinon.match.has('message'));
  // });
  it('testa se é possivel atualizar um produto com id invalida', async function () {
    sinon
      .stub(products, 'getAllProducts')
      .resolves([]);
    const req = {
      params: { id: '999' },
      body: { name: 'Marreta' },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await updateProductController(req, res);
    expect(res.status).to.have.calledWith(404);
    expect(res.json).to.have.calledWith(sinon.match.has('message'));
  });
  it('testa o endpoint de cadastrar um novo produto', async function () {
    sinon.stub(services.products, 'create').resolves(statusCreateNewProduct);
    const req = {
      params: {},
      body: { name: 'Marreta' },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await create(req, res);
    expect(res.status).to.have.calledWith(201);
    expect(res.json).to.have.calledWith(standardProduct);
  });
  it('testa a falha ao tentar criar um novo produto', async function () {
    sinon
      .stub(services.products, 'create')
      .resolves(statusBadRequestNameRequired);
    const req = {
      params: {},
      body: { name: 'Marreta' },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await create(req, res);
    expect(res.status).to.have.calledWith(400);
    expect(res.json).to.have.calledWith(sinon.match.has('message'));
  });
  it('testa a atualização de um produto', async function () {
    sinon
      .stub(services.products, 'create')
      .resolves(statusBadRequestNameRequired);
    const req = {
      params: {},
      body: { name: 'Marreta' },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await create(req, res);
    expect(res.status).to.have.calledWith(400);
    expect(res.json).to.have.calledWith(sinon.match.has('message'));
  });
  // it('Função remove', async function () {
  //   const req = {
  //     params: { id: 2 },
  //   };
  //   sinon.stub(services.products, 'deleteProductById').resolves(testeRemove);
  //   await productsController.productDelete(req, res);

  //   expect(res.status).to.have.been.calledWith(204);
  //   expect(res.json).to.have.been.calledWith(true);
  // });
});
