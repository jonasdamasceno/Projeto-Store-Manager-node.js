const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');
const { salesMock, expectedResultById } = require('../../mock/sales.mocks');

describe('testa o endpoint de vendas na camada service', function () {
  afterEach(sinon.restore);
  it('testa a função getAllSalesService', async function () {
    sinon.stub(salesModel, 'getAllSales').resolves(salesMock);
    const responseService = await salesService.getAllSalesService();
    expect(responseService.status).to.equal('SUCCES');
    expect(responseService.data).to.deep.equal(salesMock);
  });
  it('testa o retorno de uma busca feita atraves do id', async function () {
    sinon.stub(salesModel, 'getSalesById').resolves(expectedResultById);
    const responseServiceById = await salesService.getSaleByIdService(1);
    expect(responseServiceById.status).to.equal('SUCCES');
    expect(responseServiceById.data).to.deep.equal(expectedResultById);
  });
  it('testa a falha na busca por um id inexistente', async function () {
    sinon.stub(salesModel, 'getSalesById').resolves([]);
    const responseServiceById = await salesService.getSaleByIdService(999);
    expect(responseServiceById).to.deep.include({
      status: 'NOT_FOUND',
      data: { message: 'Sale not found' },
    });
  //   expect(responseServiceById.status).to.equal('NOT_FOUND');
  //   expect(responseServiceById.data).to.deep.equal('Sale not found');
  });
});