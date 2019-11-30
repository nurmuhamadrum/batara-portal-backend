"use strict";
module.exports = (sequelize, DataTypes) => {
  const portal = sequelize.define(
    "portal",
    {
      name: DataTypes.STRING
    },
    {}
  );
  portal.associate = function(models) {
    portal.belongsToMany(models.news, {
      through: "shares",
      foreignKey: "portalId"
    });

    portal.belongsToMany(models.user, {
      through: { model: models.share },
      foreignKey: "portalId"
    });
  };
  return portal;
};
