const faker = require('faker');

class ProductsService {
  constructor() {
    this.products = [];
    this.generateData();
  }

  generateData() {
    for (let i = 0; i < 100; i++) {
      this.products.push({
        id: i,
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.abstract(),
      });
    }
  }

  async create(data) {
    const newProduct = { ...data, id: this.products.length };
    this.products.push(newProduct);
    return this.products.find((product) => product.id === newProduct.id);
  }

  find() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products);
      }, 5000);
    });
  }

  async findOne(id) {
    return this.products.find((product) => product.id === id);
  }

  async update(id, data) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index === -1) {
      throw new Error('product not fount');
    }

    return (this.products[index] = { ...this.products[index], ...data });
  }

  async delete(id) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index === -1) {
      throw new Error('product not fount');
    }

    this.products.splice(index, 1);

    return { message: 'deleted', id };
  }
}

module.exports = ProductsService;
