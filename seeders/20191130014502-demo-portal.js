"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("portals", [
      {
        name: "facebook"
      },
      {
        name: "twitter"
      },
      {
        name: "whatsapp"
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("portals", null, {});
  }
};
