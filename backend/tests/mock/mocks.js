const allProducts = [
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
    name: 'Escudo do Capitão América',
  },
];

const batmanHammer = { name: 'Martelo do batman' };
const batmanHammerWithId = { name: 'Martelo do batman', id: 1 };
const updateStatusSuccess = {
  status: 'SUCCESS',
  data: batmanHammerWithId,
};
const statusInvalidValueName5Character = {
  status: 'INVALID_VALUE',
  data: { message: '"name" length must be at least 5 characters long' },
};

const statusBadRequestNameRequired = {
  status: 'BAD_REQUEST',
  data: { message: '"name" is required' },
};
const statusNotFound = {
  status: 'NOT_FOUND',
  data: { message: 'Product not found' },
};

module.exports = { allProducts, 
  batmanHammer, 
  batmanHammerWithId, 
  updateStatusSuccess, 
  statusInvalidValueName5Character,
  statusBadRequestNameRequired,
  statusNotFound,
};
