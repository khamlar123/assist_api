'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userMenu extends Model {}
  userMenu.init({
    userId: DataTypes.INTEGER,
    menueId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'userMenu',
  });
  return userMenu;
};