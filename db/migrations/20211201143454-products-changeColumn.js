'use strict';

const { PRODUCT_TABLE } = require('../models/product.model');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn(PRODUCT_TABLE, 'Price', 'price');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn(PRODUCT_TABLE, 'price', 'Price');
  }
};
