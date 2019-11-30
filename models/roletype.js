'use strict';
module.exports = (sequelize, DataTypes) => {
  const roletype = sequelize.define('roletype', {
    permission: DataTypes.STRING
  }, {});
  roletype.associate = function(models) {
    // associations can be defined here
  };
  return roletype;
};