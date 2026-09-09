'use strict';

const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    const [astridPassword, jamesPassword, mariaPassword] = await Promise.all([
      bcrypt.hash('astrid123', 10),
      bcrypt.hash('james1234', 10),
      bcrypt.hash('maria1234', 10)
    ]);

    await queryInterface.bulkInsert('Users', [
      { name: 'Astrid Cruz', email: 'astrid@itelect.test', password: astridPassword, role: 'member',
        createdAt: now, updatedAt: now },
      { name: 'James Carandang', email: 'james@itelect.test', password: jamesPassword, role: 'member',
        createdAt: now, updatedAt: now },
      { name: 'Maria Santos', email: 'maria@itelect.test', password: mariaPassword, role: 'member',
        createdAt: now, updatedAt: now }
    ]);

    const users = await queryInterface.sequelize.query(
      'SELECT id, name FROM "Users";',
      { type: Sequelize.QueryTypes.SELECT }
    );
    const idOf = (name) => users.find((u) => u.name === name).id;

    await queryInterface.bulkInsert('Tasks', [
      { title: 'Set up project repository', dueDate: new Date('2026-08-25'), completed: true,
        userId: idOf('Astrid Cruz'), createdAt: now, updatedAt: now },
      { title: 'Write GT8 migrations', dueDate: new Date('2026-08-26'), completed: true,
        userId: idOf('Astrid Cruz'), createdAt: now, updatedAt: now },
      { title: 'Wire up Sequelize associations', dueDate: new Date('2026-08-26'), completed: false,
        userId: idOf('James Carandang'), createdAt: now, updatedAt: now },
      { title: 'Test all API routes in Postman', dueDate: new Date('2026-08-27'), completed: false,
        userId: idOf('James Carandang'), createdAt: now, updatedAt: now },
      { title: 'Update README screenshots', dueDate: new Date('2026-08-27'), completed: false,
        userId: idOf('Maria Santos'), createdAt: now, updatedAt: now }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tasks', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  }
};
