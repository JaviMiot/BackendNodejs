
const boom = require('@hapi/boom');
const nodemailer = require("nodemailer");

const UserService = require('../services/userServices');
const { verifyPassword } = require('../libs/auth');
const { signToken } = require('../utils/jwtLib');
const config = require('../config/config');

const service = new UserService();

class AuthService {
  async getUser(email, password) {
    const user = await service.findOneByEmail(email);

    if (!user) {
      throw boom.unauthorized();
    }

    const isMatch = verifyPassword(password, user.password);

    if (!isMatch) {
      throw boom.unauthorized();
    }

    delete user.dataValues.password;

    return user;

  }

  singToken(user) {
    const payload = {
      sub: user.id,
      role: user.role
    };
    const token = signToken(payload, config.secret_key);
    return token;
  }

  async sendEmail(emailUser) {

    const user = await service.findOneByEmail(emailUser);

    if (!user) {
      throw boom.unauthorized();
    }

    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      secure: true,
      port: 465,
      auth: {
        user: config.emailAddress,
        pass: config.emailPassword
      }
    });

    await transporter.sendMail({
      from: config.emailAddress, // sender address
      to: user.email, // list of receivers
      subject: "Hello ✔ es un nuevo correo", // Subject line
      text: "Hello world? hola javi", // plain text body
      html: "<b>Hello world?</b>", // html body
    });

    return { message: 'mail sent' };
  }
}

module.exports = AuthService;
