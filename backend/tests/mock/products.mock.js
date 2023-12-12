const mockProducts = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
  {
    id: 3,
    name: 'Escudo do Capitão América',
  },
];
const product = {
  id: 1,
  name: 'Martelo de Thor',
};

const productFromModelSucces = { status: 'SUCCES', data: product };

const insertIdFromDB = { insertId: 1 };
const productIdFromModel = 5;
const insertProduct = { name: 'Marreta', id: 1 };
const updateProduct = { name: 'Martelo do batman' };
const updatedProductService = { name: 'Martelo do batman', id: 1 };

const inserProductModelSucces = { status: 'CREATED', data: insertProduct };
const inserProductModelNoName = {
  status: 'BAD_REQUEST',
  data: { message: '"name" is required' },
};

const updateProductServiceSucces = {
  status: 'SUCCES',
  data: updatedProductService,
};
const updateProductServiceNameFiveCharacter = {
  status: 'INVALID_VALUE',
  data: { message: '"name" length must be at least 5 characters long' },
};

const updateProductServiceSuccesWithoutName = {
  status: 'BAD_REQUEST',
  data: { message: '"name" is required' },
};
const updateProductServiceInvalidId = {
  status: 'NOT_FOUND',
  data: { message: 'Product not found' },
};

module.exports = {
  mockProducts,
  product,
  productFromModelSucces,
  insertIdFromDB,
  productIdFromModel,
  inserProductModelSucces,
  insertProduct,
  inserProductModelNoName,
  updateProduct,
  updatedProductService,
  updateProductServiceSucces,
  updateProductServiceNameFiveCharacter,
  updateProductServiceSuccesWithoutName,
  updateProductServiceInvalidId,
};
