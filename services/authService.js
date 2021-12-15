
const boom = require('@hapi/boom');
const nodemailer = require("nodemailer");

const UserService = require('../services/userServices');
const { verifyPassword, hashPassword } = require('../libs/auth');
const { signToken, verifyToken } = require('../utils/jwtLib');
const config = require('../config/config');

const service = new UserService();

class AuthService {

  async getUserByEmail(email) {
    const user = await service.findOneByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    return user;
  }
  async getUser(email, password) {
    const user = await this.getUserByEmail(email);
    const isMatch = await verifyPassword(password, user.password);
    if (!isMatch) {
      throw boom.unauthorized();
    }

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

  async sendEmail(infoMail) {

    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      secure: true,
      port: 465,
      auth: {
        user: config.emailAddress,
        pass: config.emailPassword
      }
    });

    await transporter.sendMail(infoMail);

    return { message: 'mail sent' };
  }



  async sendRecovery(email) {
    const user = await this.getUserByEmail(email);

    const payload = {
      sub: user.id,
      expiresIn: '15min'
    };


    const token = signToken(payload, config.secret_key);
    await service.update(user.id, { recoveryToken: token });

    const link = `http://myfrondend.com/recovery?token=${token}`;
    const mail = {
      from: config.emailAddress, // sender address
      to: user.email, // list of receivers
      subject: "Email para recuperar Contraseña", // Subject line
      html: `<b>Ingresa en este link ==> <a>${link}</a></b>`, // html body
    };

    const rta = await this.sendEmail(mail);
    return rta;
  }

  async changePassword(token, newPassword) {
    try {
      const payload = verifyToken(token, config.secret_key);
      const user = await service.findOne(payload.sub);
      if (user.recoveryToken != token) {
        throw boom.unauthorized();
      }

      const hash = await hashPassword(newPassword);

      await service.update(user.id,
        {
          recoveryToken: null,
          password: hash
        });

      return { message: 'password changed' };
    } catch (error) {
      throw boom.unauthorized();
    }
  }

}

module.exports = AuthService;
