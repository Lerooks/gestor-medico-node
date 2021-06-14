'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Patients",
      [
        {
          name: "bob bobo",
          email: "bob_bobo@email.com",
          phone: "123",
        },
        {
          name: "maria bonita",
          email: "maria_bonita@meail.com",
          phone: "231",
        },
        {
          name: "y2k",
          email: "y2k@email.com",
          phone: "321",
        },
        {
          name: "clara da luz",
          email: "clara_luz@email.com",
          phone: "421",
        },
        {
          name: "joana silva",
          email: "joana_silva@email.com",
          phone: "512",
        },
        {
          name: "fausto coelho",
          email: "oloko_meu@email.com",
          phone: "612",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Patients", null, {});
  },
};
