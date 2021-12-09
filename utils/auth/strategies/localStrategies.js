const { Strategy } = require('passport-local');
const boom = require('@hapi/boom');
const { verifyPassword } = require('../../../libs/auth');

const UserService = require('../../../services/userServices');

const service = new UserService();

const localStrategy = new Strategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  async (email, password, done) => {

    try {
      const user = await service.findOneByEmail(email);

      if (!user) {
        done(boom.unauthorized(), false);
      }

      const isMatch = verifyPassword(password, user.password);

      if (!isMatch) {
        done(boom.unauthorized(), false);
      }

      delete user.dataValues.password;

      done(null, user); //! envia ok y el usuario

    } catch (error) {
      done(error, false); //! envia error y falso
    }
  }

);

module.exports = localStrategy;
