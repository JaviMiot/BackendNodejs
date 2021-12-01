const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');
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

  async find() {
    const rta = await models.Product.findAll({ include: ['category'] });
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
