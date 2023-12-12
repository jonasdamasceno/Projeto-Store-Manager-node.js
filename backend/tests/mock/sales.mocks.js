const dataAtual = new Date();
const dataAtualFormatada = dataAtual.toISOString();
const salesMock = [
  {
    saleId: 1,
    productId: 1,
    quantity: 5,
    date: dataAtualFormatada,
  },
  {
    saleId: 1,
    productId: 2,
    quantity: 10,
    date: dataAtualFormatada,
  },
  {
    saleId: 2,
    productId: 3,
    quantity: 15,
    date: dataAtualFormatada,
  },
];

const expectedResultById = [
  {
    saleId: 1,
    quantity: 5,
    date: dataAtualFormatada,
  },
  {
    saleId: 1,
    quantity: 10,
    date: '2023-11-21T19:11:33.000Z',
  },
];

const insertIdDB = { insertId: 1 };
const insertIdModel = 1;
const saleFromModelSucces = { status: 'SUCCESS', data: salesMock };
const saleIdFromModelSucces = { status: 'SUCCESs', data: expectedResultById };
const statusNotFoundSale = {
  status: 'NOT_FOUND',
  data: { message: 'Sale not found' },
};
const inputAddSales = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const responseSalesData = {
  id: 1,
  itemsSold: [
    {
      productId: 1,
      quantity: 1,
    },
    {
      productId: 2,
      quantity: 5,
    },
  ],
};
const insertSalesSucces = {
  status: 'CREATED',
  data: { id: insertIdModel, itemsSold: inputAddSales },
};

module.exports = {
  salesMock,
  expectedResultById,
  insertIdDB,
  insertIdModel,
  saleFromModelSucces,
  saleIdFromModelSucces,
  statusNotFoundSale,
  responseSalesData,
  insertSalesSucces,
};
