'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Appointments",
      [
        {
          physicianId: 1,
          patientId: 1,
          appointmentDate: Sequelize.literal("CURRENT_TIMESTAMP"),
          description: "Dor nas costas, aiaiai..."
        },
        {
          physicianId: 1,
          patientId: 2,
          appointmentDate: Sequelize.literal("CURRENT_TIMESTAMP"),
          description: "Dor na cadeira, aiaiai..."
        },
        {
          physicianId: 2,
          patientId: 3,
          appointmentDate: Sequelize.literal("CURRENT_TIMESTAMP"),
          description: "Quebrei a bacia, aiaiai..."
        },
        {
          physicianId: 2,
          patientId: 4,
          appointmentDate: Sequelize.literal("CURRENT_TIMESTAMP"),
          description: "Dor no cabelo, aiaiai..."
        },
        {
          physicianId: 3,
          patientId: 5,
          appointmentDate: Sequelize.literal("CURRENT_TIMESTAMP"),
          description: "Dor nos olhos, aiaiai..."
        },
        {
          physicianId: 3,
          patientId: 6,
          appointmentDate: Sequelize.literal("CURRENT_TIMESTAMP"),
          description: "Sinto um vazio no coracao"
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete
      ("Appointments", null, {});
  },
};
