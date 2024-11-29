'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('listings', [{
      name: 'Starbucks Mid Valley',
      latitude: 3.11803,
      longitude: 101.676845,
      user_id: 2
    },
    {
      name: 'Burger King',
      latitude: 3.11856,
      longitude: 101.676861,
      user_id: 2
    },
    {
      name: 'Pizza Hut',
      latitude: 3.11706,
      longitude: 101.677287,
      user_id: 2
    },
    {
      name: 'Jolibee, Sunway Velocity',
      latitude: 3.13011,
      longitude: 101.724305,
      user_id: 3
    },
    {
      name: 'Sunway Pyramid',
      latitude: 3.07229,
      longitude: 101.606431,
      user_id: 2
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('listings', null, {});
  }
};
