const { Sequelize, DataTypes, Model } = require("sequelize");

const PRODUCT_TABLE = 'products';

const ProductSchema = {
  name: {
    unique: true,
    allowNull: false,
    type: DataTypes.STRING
  },
  Price: {
    allowNull: false,
    type: DataTypes.FLOAT(10, 2)
  },
  createAt: {
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: DataTypes.NOW
  }
};


class Product extends Model {
  static config(sequelize) {
    return {
      sequelize,
      modelName: 'Product',
      tableName: PRODUCT_TABLE,
      timestamps: false
    };
  }
}

module.exports = { Product, ProductSchema };
