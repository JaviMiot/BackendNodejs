'use strict';
const { DataTypes } = require('sequelize');

const { USER_TABLE } = require('../models/user.model');

module.exports = {
  up: async (queryInterface) => {
    queryInterface.addColumn(USER_TABLE, 'recovery_token',
      {
        allowNull: true,
        field: 'recovery_token',
        type: DataTypes.STRING,
      });
  },

  down: async (queryInterface) => {
    queryInterface.removeColumn(USER_TABLE, 'recovery_token');
  }
};
