'use strict';

const { PRODUCT_TABLE, ProductSchema } = require('../models/product.model');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn(PRODUCT_TABLE, 'Price', 'price');
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
