const express = require('express');
const productsRouter = require('./Router/produts.router');

const app = express();

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

app.use('/produts', productsRouter);

module.exports = app;
