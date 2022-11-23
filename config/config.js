"use strict";
require('dotenv').config();
module.exports = {
  "development": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": "mysql",
    "dialectOptions": {
      "options": {
        "encrypt": false
      }
    }
  },
  "test": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": "mysql",
    "dialectOptions": {
      "options": {
        "encrypt": false
      }
    }
  },
  "production": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": "mysql",
    "dialectOptions": {
      "options": {
        "encrypt": false
      }
    }
  }
}
