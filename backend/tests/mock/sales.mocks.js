const dataAtual = new Date();
console.log(dataAtual);
const dataAtualFormatada = dataAtual.toISOString();
console.log(dataAtualFormatada);
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

module.exports = {
  salesMock,
  expectedResultById,
  insertIdDB,
  insertIdModel,
};
