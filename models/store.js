'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class store extends Model {}
  store.init({
    name: DataTypes.STRING,
    active: DataTypes.INTEGER, // 0 not active, 1 active
    imgUrl: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'store',
  });
  return store;
};