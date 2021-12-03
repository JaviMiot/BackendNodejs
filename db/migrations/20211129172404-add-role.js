'use strict';
const { DataTypes } = require('sequelize');

const { USER_TABLE } = require('../models/user.model');

const role = {
  type: DataTypes.STRING,
  allowNull: false,
  defaultValue: 'customer'
};

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.addColumn(USER_TABLE, 'role', role);
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn(USER_TABLE, 'role');
  }
};
