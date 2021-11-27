const faker = require('faker');
const boom = require('@hapi/boom');

const pool = require('../libs/postgres.pool');
class ProductsService {
  constructor() {
    this.products = [];
    this.generateData();
    this.pool = pool;
    this.pool.on('error', err => console.error(err));
  }

  generateData() {
    for (let i = 0; i < 100; i++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.abstract(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(data) {
    const newProduct = { ...data, id: faker.datatype.uuid(), isBlock: true };
    this.products.push(newProduct);
    return this.products.find((product) => product.id === newProduct.id);
  }

  async find() {
    const query = 'SELECT * FROM task';
    const rta = await this.pool.query(query);
    return rta.rows;
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
