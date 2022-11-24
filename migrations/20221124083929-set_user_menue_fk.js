'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('userMenus', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'userMenus_set_user_fk',
      references: {
        table: 'Users',
        field: 'id'
      }
    });


    await queryInterface.addConstraint('userMenus', {
      fields: ['menueId'],
      type: 'foreign key',
      name: 'userMenus_set_menue_fk',
      references: {
        table: 'menus',
        field: 'id'
      }
    });

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('userMenus', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'userMenus_set_user_fk',
      references: {
        table: 'Users',
        field: 'id'
      }
    });


    await queryInterface.removeConstraint('userMenus', {
      fields: ['menueId'],
      type: 'foreign key',
      name: 'userMenus_set_menue_fk',
      references: {
        table: 'menus',
        field: 'id'
      }
    });
  }
};
