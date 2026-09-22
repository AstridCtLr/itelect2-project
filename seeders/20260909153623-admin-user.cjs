'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    const hashedPassword = await bcrypt.hash('admin12345', 10);

    await queryInterface.bulkInsert('Users', [
      {
        name: 'Admin User',
        email: 'admin@itelect.test',
        password: hashedPassword,
        role: 'admin',
        createdAt: now,
        updatedAt: now
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', { email: 'admin@itelect.test' }, {});
  }
};