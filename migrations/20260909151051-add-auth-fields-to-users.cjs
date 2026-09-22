'use strict';

module.exports = {

  async up(queryInterface, Sequelize) {

    await queryInterface.changeColumn('Users', 'email', {
      type: Sequelize.STRING,
      allowNull: false
    });

    await queryInterface.addConstraint('Users', {
      fields: ['email'],
      type: 'unique',
      name: 'Users_email_key'
    });

    await queryInterface.addColumn('Users', 'password', {
      type: Sequelize.STRING,
      allowNull: false
    });

    await queryInterface.addColumn('Users', 'role', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'member'
    });

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.removeColumn('Users', 'role');

    await queryInterface.removeColumn('Users', 'password');

    await queryInterface.removeConstraint(
      'Users',
      'Users_email_key'
    );

    await queryInterface.changeColumn('Users', 'email', {
      type: Sequelize.STRING,
      allowNull: true
    });

  }

};