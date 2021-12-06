const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class CategoryService {

  constructor() {
  }
  async create(data) {
    const newCategory = await models.Category.create(data);
    return newCategory;
  }

  async find() {
    const categories = await models.Category.findAll();
    return categories;
  }

  async findOne(id) {
    const category = await models.Category.findByPk(id, { include: ['products'] });
    if (!category) {
      throw boom.notFound(`category ${id} not found`);
    }
    return category;
  }

  async update(id, changes) {

    const updateCategory = await this.findOne(id);
    updateCategory.update(changes);
    return updateCategory;
  }

  async delete(id) {
    const deleteCategory = await this.findOne(id);
    await deleteCategory.destroy();
    return { id };
  }

}

module.exports = CategoryService;
