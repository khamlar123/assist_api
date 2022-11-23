'use strict';
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
    "sql12579385",  //database name
    "sql12579385", // user name 
    "5x53BsBwim", // password
    {
        host: "sql12.freemysqlhosting.net",
        dialect: 'mysql',
        operatorsAliases: 0,
        logging: true,
        dialectOptions: {
        options: {
            encrypt: false,
        },
        },
    }
);
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to Database has been established successfuly');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();
module.exports = { sequelize, DataTypes };