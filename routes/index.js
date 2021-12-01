const express = require('express');
const productsRouter = require('./productsRouter');
const usersRouter = require('./usersRouter');
const categoryRouter = require('./categoriesRouter')
const customerRouter = require('./customerRouter')

const routerApi = (app) => {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', productsRouter); //* aqui agregas el router
  router.use('/users', usersRouter);
  router.use('/categories', categoryRouter);
  router.use('/customers', customerRouter);
};

module.exports = routerApi;
