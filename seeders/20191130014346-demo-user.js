"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("users", [
      {
        name: "Nur",
        email: "nurmuhamadrum@gmail.com",
        password: "1234",
        role: 1
      },
      {
        name: "Rum",
        email: "nurmuhamadrum16@gmail.com",
        password: "1234",
        role: 2
      },
      {
        name: "Muhamad",
        email: "nurmuhamadrum02@gmail.com",
        password: "1234",
        role: 3
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  }
};
