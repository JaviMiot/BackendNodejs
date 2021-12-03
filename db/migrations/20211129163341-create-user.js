'use strict';
const { Sequelize, DataTypes } = require('sequelize');

const { USER_TABLE } = require('../models/user.model');

const UserSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },

  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  //* field define el nombre que tendra en la bd
  createAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  }
};

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(USER_TABLE, UserSchema);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(USER_TABLE);
  }
};
