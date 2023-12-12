const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productsModel } = require('../../../src/models');
const { mockProducts, insertIdFromDB } = require('../../mock/products.mock');

describe('Realizando testes - PRODUCTS MODEL:', function () {
  it('Listando todas os produtos', async function () {
    sinon.stub(connection, 'execute').resolves([mockProducts]);
    const products = await productsModel.findAll();
    expect(products).to.be.an('array');
    expect(products).to.be.deep.equal(mockProducts);
  });
  it('Listando apenas um produto', async function () {
    sinon.stub(connection, 'execute').resolves([[mockProducts[0]]]);
    const product = await productsModel.findById(1);
    expect(product).to.be.an('object');
    expect(product).to.be.deep.equal(mockProducts[0]);
  });
  it('Inserindo um novo produto', async function () {
    sinon.stub(connection, 'execute').resolves([insertIdFromDB]);
    const inputProduct = { name: 'Marreta 25kg' };
    const insertId = await productsModel.insertNewProduct(inputProduct);
    expect(insertId).to.be.a('number');
    expect(insertId).to.equal(1);
  });
  afterEach(function () {
    sinon.restore();
  });
});
