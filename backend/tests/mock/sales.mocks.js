const data = '2023-11-21T19:11:33.000Z';
const salesMock = [
  {
    saleId: 1,
    productId: 1,
    quantity: 5,
    date: data,
  },
  {
    saleId: 1,
    productId: 2,
    quantity: 10,
    date: data,
  },
  {
    saleId: 2,
    productId: 3,
    quantity: 15,
    date: data,
  },
];

const salesWithIdOne = [
  {
    saleId: 1,
    quantity: 5,
    date: data,
  },
  {
    saleId: 1,
    quantity: 10,
    date: '2023-11-21T19:11:33.000Z',
  },
];

const saleFromModelSucces = { status: 'SUCCES', data: salesMock };
const saleIdFromModelSucces = { status: 'SUCCES', data: salesWithIdOne };
const saleFromModelNotFound = {
  status: 'NOT_FOUND',
  data: { message: 'Sale not found' },
};

const insertIdDB = { insertId: 1 };
const insertIdModel = 1;
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
  salesWithIdOne,
  saleFromModelSucces,
  saleIdFromModelSucces,
  saleFromModelNotFound,
  insertIdDB,
  insertIdModel,
  inputAddSales,
  responseSalesData,
  insertSalesSucces,
};
