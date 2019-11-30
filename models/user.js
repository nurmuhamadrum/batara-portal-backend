"use strict";
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.INTEGER
    },
    {}
  );
  user.associate = function(models) {
    user.belongsToMany(models.portal, {
      through: { model: models.share },
      foreignKey: "userId"
    });

    user.belongsToMany(models.news, {
      through: "shares",
      foreignKey: "userId",
      as: "news"
    });
  };
  return user;
};
