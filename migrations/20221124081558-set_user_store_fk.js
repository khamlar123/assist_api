'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('Users', {
      fields: ['sotreId'],
      type: 'foreign key',
      name: 'Users_set_store_fk',
      references: {
        table: 'stores',
        field: 'id'
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Users', {
      fields: ['sotreId'],
      type: 'foreign key',
      name: 'Users_set_store_fk',
      references: {
        table: 'stores',
        field: 'id'
      }
    });
  }
};
