const express = require('express');
const passport = require('passport');

const ProductsService = require('../services/productsService');
const validatorHandle = require('../middlewares/validatorHandle');
const {
  createProductSchema,
  udpdateProductSchema,
  getProductSchema,
  queryProductSchema
} = require('../schema/productSchema');
const { checkRoles } = require('../middlewares/authHandler');

const router = express.Router(); //* generas un router
const service = new ProductsService(); //*creo una instancia

router.get('/',
  validatorHandle(queryProductSchema, 'query'),
  async (request, response, next) => {

    try {
      const products = await service.find(request.query);
      response.json(products);
    } catch (error) {
      next(error);
    }

  });

router.get(
  '/:id',
  validatorHandle(getProductSchema, 'params'),
  async (request, response, next) => {
    const { id } = request.params;
    try {
      const product = await service.findOne(id);
      response.status(200).json(product);
    } catch (error) {
      next(error); //! mandas el error
    }
  }
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandle(createProductSchema, 'body'),
  async (request, response) => {
    const body = request.body;
    const newProduct = await service.create(body);
    response.status(201).json(newProduct);
  }
);

router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandle(getProductSchema, 'params'),
  validatorHandle(udpdateProductSchema, 'body'),
  async (request, response, next) => {
    try {
      const { id } = request.params;
      const body = request.body;
      const updateProduct = await service.update(id, body);
      response.json(updateProduct);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  async (request, response) => {
    const { id } = request.params;
    const deletedProduct = await service.delete(id);
    response.json(deletedProduct);
  });


module.exports = router;
