'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('categories', {
      fields: ['storeId'],
      type: 'foreign key',
      name: 'categories_set_store_fk',
      references: {
        table: 'stores',
        field: 'id'
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('categories', {
      fields: ['storeId'],
      type: 'foreign key',
      name: 'categories_set_store_fk',
      references: {
        table: 'stores',
        field: 'id'
      }
    });
  }
};
