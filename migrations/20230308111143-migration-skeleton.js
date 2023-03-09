'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
   
    try {
        await queryInterface.addConstraint('ingatlanok', 
        {
          fields: ['kategoria'],
          type: 'foreign key',
          name: 'kategoria_fkey',
          references: {
            table: 'kategoriak',
            field: 'id'
          },
          transaction
        }
      );
      await transaction.commit();
    } catch (err) {
        await transaction.rollback();
        throw err;
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('ingatlanok', 'kategoria_fkey');

  }
};
