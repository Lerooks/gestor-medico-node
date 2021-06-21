'use strict';

const bcrypt = require('bcryptjs')

function generatePassword(password){
  const salt = bcrypt.genSaltSync(12); // sequencia aleatoria de letra e caracteres
  const hash = bcrypt.hashSync(password, salt);
  return hash
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Physicians",
      [
        {
          name: "flavia freitas",
          email: "flavia@email.com",
          password: generatePassword("senha123"),
        },
        {
          name: "gabriel ramos",
          email: "gabriel_ramos123@email.com",
          password: generatePassword("gasydafdyaugsd"),
        },
        {
          name: "Jose Carlos",
          email: "jose_carlos@meail.com",
          password: generatePassword("$3nH4&@#!"),
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
