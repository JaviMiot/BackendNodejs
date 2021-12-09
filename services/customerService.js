const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

const { hashPassword } = require(`../libs/auth`);
class CustomerService {

  constructor() { }

  async find() {
    const rta = await models.Customer.findAll({
      include: ['user']
    });
    return rta;
  }

  async findOne(id) {
    const user = await models.Customer.findByPk(id, { include: ['user'] });
    if (!user) {
      throw boom.notFound('customer not found');
    }
    return user;
  }

  async create(data) {

    const getHashPassword = await hashPassword(data.user.password);

    const newUser = {
      ...data.user,
      password: getHashPassword
    };

    const customerData = {
      ...data,
      user: newUser
    };

    const newCustomer = await models.Customer.create(customerData, {
      include: ['user']
    });

    delete newCustomer.dataValues.user.dataValues.password;

    return newCustomer;
  }

  async update(id, changes) {
    const model = await this.findOne(id);
    const rta = await model.update(changes);
    return rta;
  }

  async delete(id) {
    const model = await this.findOne(id);
    await model.destroy();
    return { id };
  }

}

module.exports = CustomerService;
