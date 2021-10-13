const express = require('express');
const ProductsService = require('../services/productsService');

const router = express.Router(); //* generas un router

const products = new ProductsService(); //*creo una instancia

router.get('/', async (request, response) => {
  const { size } = request.query;
  const limit = size || 10;
  //* uso la instancia
  const productsLimit = await products.find();
  response.json(productsLimit.slice(0, limit));
});

router.post('/', async (request, response) => {
  const body = request.body;
  const newProduct = await products.create(body);
  response.status(201).json({ message: 'creacion', data: newProduct });
});

//* un error comun
router.get('/filter', (req, res) => {
  res.send('soy un filter');
});

router.patch('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const body = request.body;
    const updateProduct = await products.update(parseInt(id), body);
    response.json({ message: 'update', data: updateProduct });
  } catch (error) {
    response.status('404').json({ message: error.message});
  }
});

router.delete('/:id', async (request, response) => {
  const { id } = request.params;
  const deletedProduct = await products.delete(parseInt(id));
  response.json(deletedProduct);
});

router.get('/:product_id', async (request, response) => {
  const product_id = parseInt(request.params.product_id);
  const product = await products.findOne(product_id);
  if (product_id === 999) {
    response.status(404).json({ message: 'Product no fount' });
  } else {
    response.status(200).json(product);
  }
});

module.exports = router;
