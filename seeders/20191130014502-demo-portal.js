"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("portals", [
      {
        name: "instagram"
      },
      {
        name: "whatsapp"
      },
      {
        name: "sms"
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("portals", null, {});
  }
};
