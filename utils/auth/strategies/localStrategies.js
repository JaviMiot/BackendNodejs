const { Strategy } = require('passport-local');
const AuthService = require('../../../services/authService');

const service = new AuthService();

const localStrategy = new Strategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  async (email, password, done) => {

    try {
      const user = await service.getUser(email, password);
      done(null, user); //! envia ok y el usuario

    } catch (error) {
      done(error, false); //! envia error y falso
    }
  }

);

module.exports = localStrategy;
