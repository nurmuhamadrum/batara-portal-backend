"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("roletypes", [
      {
        permission: "admin"
      },
      {
        permission: "narator"
      },
      {
        permission: "buzzer"
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("roletypes", null, {});
  }
};
