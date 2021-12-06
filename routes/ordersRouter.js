const express = require('express');

const OrderService = require('../services/orderService');
const validatorHandler = require('../middlewares/validatorHandle');
const {
  getOrderSchema,
  createOrderSchema,
  addItemSchema
} = require('../schema/orderSchema');

const router = express.Router();
const service = new OrderService();

router.get(
  '/',
  async (req, res, next) => {
    try {
      const orders = await service.findAll();
      res.json(orders);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await service.findOne(id);
      res.json(order);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newOrder = await service.create(body);
      res.status(201).json(newOrder);
    } catch (error) {
      next(error);
    }
  }
);


router.delete('/:id', validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    const { id } = req.params;
    try {
      const orderDeleted = await service.deleteOrder(id);
      res.status(202).json(orderDeleted);
    } catch (error) {
      next(error);
    }
  });

router.post(
  '/add-item',
  validatorHandler(addItemSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newItem = await service.addItem(body);
      res.status(201).json(newItem);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/delete-item/:orderId/:productId',
  async (req, res, next) => {
    const { orderId, productId } = req.params;

    try {
      const item = await service.deleteItem(orderId, productId);
      res.status(200).json(item);

    } catch (error) {
      next(error);
    }

  });

module.exports = router;
