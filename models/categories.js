'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class categories extends Model {}
  categories.init({
    name: DataTypes.STRING,
    parentId: DataTypes.INTEGER,
    storeId: DataTypes.INTEGER,
    imgUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'categories',
  });
  return categories;
};