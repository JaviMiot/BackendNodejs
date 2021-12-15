const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');
const { hashPassword } = require('../libs/auth');
class UserService {
  constructor() { }

  async create(data) {

    const getHashPassword = await hashPassword(data.password);

    const userData = {
      ...data,
      password: getHashPassword
    };

    const newUser = await models.User.create(userData);

    return this.deleteAuthData(newUser);
  }

  async find() {
    const rta = await models.User.findAll({
      attributes: { exclude: ['password', 'recoveryToken'] },
      include: ['customer']
    });

    return rta;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound(`User ${id} no found`);
    }

    return this.deleteAuthData(user);
  }

  async findOneByEmail(email) {

    const user = await models.User.findOne(
      {
        where: { email },
      }
    );

    if (!user) {
      throw boom.notFound(`User ${email} no found`);
    }

    return user;
  }

  deleteAuthData(user) {
    delete user.dataValues.password;
    delete user.dataValues.recoveryToken;
    return user;
  }

  async update(id, changes) {
    const updateUser = await this.findOne(id);
    try {
      await updateUser.update(changes);
    } catch (error) {
      throw boom.notAcceptable(error);
    }
    return updateUser;
  }

  async delete(id) {
    const deleteUser = await this.findOne(id);
    deleteUser.destroy();
    return { id };
  }
}

module.exports = UserService;
