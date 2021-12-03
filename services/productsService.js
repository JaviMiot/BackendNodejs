const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');
const { Op } = require("sequelize");
class ProductsService {
  constructor() {
    this.products = [];
    this.generateData();
  }

  generateData() {

  }

  async create(data) {
    const newProduct = models.Product.create(data);
    return newProduct;
  }

  async find(query) {
    const options = {
      include: ['category'],
      where: {}
    };

    const { limit, offset } = query;

    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }

    const { price } = query;

    if (price) {
      options.where.price = price;
    }

    const { price_min, price_max } = query;

    if (price_min && price_max) {
      options.where.price = {
        [Op.gte]: price_min,
        [Op.lte]: price_max
      };
    }

    const rta = await models.Product.findAll(options);
    return rta;
  }

  async findOne(id) {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      throw boom.notFound('product not fount');
    }

    if (!product.isBlock) {
      throw boom.conflict('the product is block');
    }
    return product;
  }

  async update(id, data) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index === -1) {
      throw boom.notFound('product not fount');
    }

    return (this.products[index] = { ...this.products[index], ...data });
  }

  async delete(id) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index === -1) {
      throw boom.notFound('product not fount');
    }

    this.products.splice(index, 1);

    return { message: 'deleted', id };
  }
}

module.exports = ProductsService;
