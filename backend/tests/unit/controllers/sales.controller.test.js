// const { expect, use } = require('chai');
// const sinon = require('sinon');
// const sinonChai = require('sinon-chai');
// const { salesService } = require('../../../src/services');
// const { salesController } = require('../../../src/controllers');
// const { salesMock } = require('../../mock/sales.mocks');
// // const { getAllSalesService } = require('../../../src/services/sales.service');

// use(sinonChai);

// describe('testa a camada controller do endpoint sales', function () {
//   let res;
//   beforeEach(function () {
//     res = {
//       status: sinon.stub().returnsThis(),
//       json: sinon.stub(),
//     };
//   });
//   afterEach(sinon.restore);

//   it('testa o returno da função getAllSales da camada controller', async function () {
//     const expectedResult = [
//       { saleId: 1, name: 'Sale 1' },
//       { saleId: 2, name: 'Sale 2' },
//     ];
//     sinon.stub(salesService, 'getAllSalesService').resolves(expectedResult);
//     await salesController.getAllSales(undefined, res);
//     expect(res.status).to.have.been.calledWith(200);
//     expect(res.json).to.have.been.calledWith(expectedResult);
//   });
//   // it('deve chamar o serviço corretamente e retornar o resultado', async function () {
//   //   const serviceResponse = {
//   //     status: '200',
//   //     data: { sales: [{ id: '123', amount: 50 }] },
//   //   };
//   //   sinon.stub(salesService, getAllSalesService).resolves(serviceResponse);

//   //   await salesController.getAllSales(req, res);

//   //   sinon.assert.calledOnce(salesService.getAllSalesService);
//   //   sinon.assert.calledOnceWithExactly(res.status, 200);
//   //   sinon.assert.calledOnceWithExactly(res.json, serviceResponse.data);
//   // });
//   it('testa o returno da função getAllSales camada controller', async function () {
//     await salesController.getAllSales(req, res);
//     expect(res.status).to.have.calledWith(200);
//     expect(res.json).to.have.calledWith(salesMock);
//   });
// });
