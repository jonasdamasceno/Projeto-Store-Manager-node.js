const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const {
  salesMock,
  salesWithIdOne,
  insertIdModel,
  inputAddSales,
  responseSalesData,
} = require('../../mock/sales.mocks');
const { salesService } = require('../../../src/services');
const { productsModel } = require('../../../src/models');
const { mockProducts } = require('../../mock/products.mock');

describe('Realizando testes - SALES SERVICES:', function () {
  it('Verifica o sucesso da busca de todas SALES', async function () {
    sinon.stub(salesModel, 'findAllSales').resolves(salesMock);
    const serviceResponse = await salesService.findAllSales();

    expect(serviceResponse.status).to.equal('SUCCES');
    expect(serviceResponse.data).to.deep.equal(salesMock);
  });
  it('Verifica o sucesso da busca de SALES por ID', async function () {
    sinon.stub(salesModel, 'findSalesById').resolves(salesWithIdOne);

    const serviceResponse = await salesService.findSalesById(1);

    expect(serviceResponse.status).to.equal('SUCCES');
    expect(serviceResponse.data).to.deep.equal(salesWithIdOne);
  });
  it('Verifica o sucesso da busca de SALES por ID Falhar', async function () {
    sinon.stub(salesModel, 'findAllSales');
    sinon.stub(salesModel, 'findSalesById').resolves([]);

    const serviceResponse = await salesService.findSalesById(40000);

    expect(serviceResponse.status).to.equal('NOT_FOUND');
    expect(serviceResponse.data.message).to.deep.equal('Sale not found');
  });
  it('Verifica se é possivel adicionar novas compras', async function () {
    sinon.stub(productsModel, 'findAll').resolves(mockProducts);
    sinon.stub(salesModel, 'insertNewSales').resolves(insertIdModel);
    const serviceResponse = await salesService.insertSales(inputAddSales);

    expect(serviceResponse.status).to.be.equal('CREATED');
    expect(serviceResponse.data).to.be.deep.equal(responseSalesData);
  });
  it('Verifica se não é possivel adicionar novas compras sem productId', async function () {
    sinon.stub(productsModel, 'findAll').resolves(mockProducts);
    sinon.stub(salesModel, 'insertNewSales').resolves(insertIdModel);
    const inputWithoutProductId = [
      {
        quantity: 1,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ];
    const serviceResponse = await salesService.insertSales(
      inputWithoutProductId,
    );

    expect(serviceResponse.status).to.be.equal('BAD_REQUEST');
    expect(serviceResponse.data.message).to.be.equal('"productId" is required');
  });
  it('Verifica se não é possivel adicionar com um produto que não exista', async function () {
    sinon.stub(productsModel, 'findAll').resolves(mockProducts);
    sinon.stub(salesModel, 'insertNewSales').resolves(insertIdModel);
    const inputWithoutProductId = [
      {
        productId: 30,
        quantity: 1,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ];
    const serviceResponse = await salesService.insertSales(
      inputWithoutProductId,
    );

    expect(serviceResponse.status).to.be.equal('NOT_FOUND');
    expect(serviceResponse.data.message).to.be.equal('Product not found');
  });
  it('Verifica se não é possivel adicionar com quantidade igual ou menor que 0', async function () {
    sinon.stub(productsModel, 'findAll').resolves(mockProducts);
    sinon.stub(salesModel, 'insertNewSales').resolves(insertIdModel);
    const inputWithoutProductId = [
      {
        productId: 1,
        quantity: 0,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ];
    const serviceResponse = await salesService.insertSales(
      inputWithoutProductId,
    );

    expect(serviceResponse.status).to.be.equal('INVALID_VALUE');
    expect(serviceResponse.data.message).to.be.equal(
      '"quantity" must be greater than or equal to 1',
    );
  });
  it('Verifica se não é possivel adicionar sem a chave quantidade', async function () {
    sinon.stub(productsModel, 'findAll').resolves(mockProducts);
    sinon.stub(salesModel, 'insertNewSales').resolves(insertIdModel);
    const inputWithoutProductId = [
      {
        productId: 1,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ];
    const serviceResponse = await salesService.insertSales(
      inputWithoutProductId,
    );

    expect(serviceResponse.status).to.be.equal('BAD_REQUEST');
    expect(serviceResponse.data.message).to.be.equal('"quantity" is required');
  });
  afterEach(function () {
    sinon.restore();
  });
});
