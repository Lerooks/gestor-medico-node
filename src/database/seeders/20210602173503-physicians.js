'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Physicians",
      [
        {
          name: "flavia freitas",
          email: "flavia@email.com",
          password: "senha123",
        },
        {
          name: "gabriel ramos",
          email: "gabriel_ramos123@email.com",
          password: "gasydafdyaugsd",
        },
        {
          name: "Jose Carlos",
          email: "jose_carlos@meail.com",
          password: "$3nH4&@#!",
        },
      ],
      {}
    );
  },
  
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete
      ("Physicians", null, {});
  },
};
