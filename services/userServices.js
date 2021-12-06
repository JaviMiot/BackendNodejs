const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class UserService {
  constructor() { }

  async create(data) {
    const newUser = await models.User.create(data);
    return newUser;
  }

  async find() {
    const rta = await models.User.findAll({
      include: ['customer']
    });

    return rta;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound(`User ${id} no found`);;
    }
    return user;
  }

  async update(id, changes) {
    const updateUser = await this.findOne(id);
    updateUser.update(changes);
    return updateUser;
  }

  async delete(id) {
    const deleteUser = await this.findOne(id);
    deleteUser.destroy();
    return { id };
  }
}

module.exports = UserService;
