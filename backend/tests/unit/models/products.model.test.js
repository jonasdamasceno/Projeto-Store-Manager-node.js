const { expect } = require('chai');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const connection = require('../../../src/models/connection');
const {
  allProducts,
  productDBUpdate,
  // idForDelete,
} = require('../../mock/products.mock');
const {
  getAllProducts,
  getProductsById,
  create,
} = require('../../../src/models/products.model');
const { products } = require('../../../src/models');
// const { products } = require('../../../src/models');

// const getByIdremove = [
//   [
//     {
//       id: 2,
//       name: 'Traje de encolhimento',
//     },
//   ],
// ];

chai.use(sinonChai);

describe('testa as funçes da camada model', function () {
  afterEach(sinon.restore);

  it('testa o retorno da função getAllProducts da camada model', async function () {
    sinon.stub(connection, 'execute').resolves([allProducts]);

    const result = await getAllProducts();
    expect(result).to.be.deep.equal(allProducts);
  });
  it('testa o retorno da função getAllProducts na camada controller', async function () {
    sinon.stub(connection, 'execute').resolves([[allProducts]]);

    const result = await getProductsById(3);
    expect(result).to.be.deep.equal(allProducts);
  });
  it('should create a product', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
    const result = await create('Product 1');
    expect(result).to.equal(1);
  });
  it('Inserindo um novo produto', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
    const inputProduct = { name: 'Marreta 25kg' };
    const insertId = await create(inputProduct);
    expect(insertId).to.be.a('number');
    expect(insertId).to.equal(1);
  });
  it('Deve retornar o status 204 caso o delete seja bem sucedido', async function () {
    const productIdToDelete = 1;
    const productDbDelete = [
      {
        id: 2,
        name: 'Traje de encolhimento',
      },
    ];

    sinon.stub(products, 'deleteProductById').resolves(productDbDelete);

    const deleted = await products.deleteProductById(productIdToDelete);
    expect(deleted).to.deep.equal(productDbDelete);
  });

  it('Deve atualizar o produto pelo ID', async function () {
    sinon.stub(products, 'updateProduct').resolves(productDBUpdate);

    const updatedProduct = await products.updateProduct(productDBUpdate[0]);
    expect(updatedProduct).to.be.an('array');
    expect(productDBUpdate).to.deep.equal(updatedProduct);
  });
  beforeEach(function () {
    sinon.restore();
  });
});
