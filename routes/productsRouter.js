const express = require('express');

const ProductsService = require('../services/productsService');
const validatorHandle = require('../middlewares/validatorHandle');
const {
  createProductSchema,
  udpdateProductSchema,
  getProductSchema,
} = require('../schema/productSchema');

const router = express.Router(); //* generas un router
const products = new ProductsService(); //*creo una instancia

router.get('/', async (request, response) => {
  const { size } = request.query;
  const limit = size || 10;
  //* uso la instancia
  const productsLimit = await products.find();
  response.json(productsLimit.slice(0, limit));
});

router.post(
  '/',
  validatorHandle(createProductSchema, 'body'),
  async (request, response) => {
    const body = request.body;
    const newProduct = await products.create(body);
    response.status(201).json({ message: 'creacion', data: newProduct });
  }
);

//* un error comun
router.get('/filter', (req, res) => {
  res.send('soy un filter');
});

router.patch(
  '/:id',
  validatorHandle(getProductSchema, 'params'),
  validatorHandle(udpdateProductSchema,'body'),
  async (request, response, next) => {
    try {
      const { id } = request.params;
      const body = request.body;
      const updateProduct = await products.update(id, body);
      response.json({ message: 'update', data: updateProduct });
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id', async (request, response) => {
  const { id } = request.params;
  const deletedProduct = await products.delete(id);
  response.json(deletedProduct);
});

router.get(
  '/:id',
  validatorHandle(getProductSchema, 'params'),
  async (request, response, next) => {
    try {
      const product_id = request.params.id;
      const product = await products.findOne(product_id);
      if (product_id === 999) {
        response.status(404).json({ message: 'Product no fount' });
      } else {
        response.status(200).json(product);
      }
    } catch (error) {
      next(error); //! mandas el error
    }
  }
);

module.exports = router;
