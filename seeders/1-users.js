'use strict';
const bcrypt = require("bcrypt")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const admin_password = await bcrypt.hash('adminPassword', 10);
    const user1_password = await bcrypt.hash('test1234', 10);
    const user2_password = await bcrypt.hash('test5678', 10);
    await queryInterface.bulkInsert('users', [{
      id: 1,
      name: 'admin',
      email: 'admin@gmail.com',
      role_type: 'a',
      password: admin_password
    },
    {
      id: 2,
      name: 'test40',
      email: 'test40@gmail.com',
      role_type: 'u',
      password: user1_password
    },
    {
      id: 3,
      name: 'test41',
      email: 'test41@gmail.com',
      role_type: 'u',
      password: user2_password
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
