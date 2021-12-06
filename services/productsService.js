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
    const product = await models.Product.findByPk(id);
    if (!product) {
      throw boom.notFound('product not fount');
    }
    return product;
  }

  async update(id, data) {
    const productUpdated = await this.findOne(id);
    productUpdated.update(data);
    return productUpdated;
  }

  async delete(id) {
    const product = await this.findOne(id);
    await product.destroy();

    return { id };
  }
}

module.exports = ProductsService;
