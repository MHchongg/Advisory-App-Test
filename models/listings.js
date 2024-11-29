'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class listings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  listings.init({
    name: DataTypes.STRING,
    latitude: DataTypes.DOUBLE(20, 6),
    longitude: DataTypes.DOUBLE(20, 6),
    user_id: DataTypes.BIGINT.UNSIGNED
  }, {
    sequelize,
    modelName: 'listings',
  });
  return listings;
};