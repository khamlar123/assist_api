'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model { }
  User.init({
    userName: DataTypes.STRING,
    password: DataTypes.STRING,
    displayName: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    storeId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};