'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class menu extends Model {}
  menu.init({
    name: DataTypes.STRING,
    parentId: DataTypes.INTEGER,
    imgUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'menu',
  });
  return menu;
};