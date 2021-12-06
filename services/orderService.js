const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class OrderService {

  constructor() {
  }

  async findAll() {
    const orders = await models.Order.findAll();
    return orders;
  }

  async create(data) {
    const newOrder = await models.Order.create(data);
    return newOrder;
  }

  async addItem(data) {
    const newItem = await models.OrderProduct.create(data);
    return newItem;
  }

  async find() {
    return [];
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: ['user']
        },
        'items'
      ]
    });

    if (!order) {
      throw boom.notFound(`order ${id} not found`);
    }
    return order;
  }

  async update(id, changes) {
    return { id, changes };
  }

  async deleteOrder(id) {
    const orderDeleted = await this.findOne(id);
    await orderDeleted.destroy({
      truncate: true
    });
    return { id };
  }

  async findOneItem(orderId, productId) {

    const item = await models.OrderProduct.findOne(
      {
        where: {
          orderId: orderId,
          productId: productId
        }
      }
    );

    if (!item) {
      throw boom.notFound(`Item that reference to order id:${orderId} and product id:${productId} not found`);
    }

    return item;
  }

  async deleteItem(orderId, productId) {
    const item = await this.findOneItem(orderId, productId);
    await item.destroy();
    return { itemId: item.id };
  }

}

module.exports = OrderService;
