"use strict";
module.exports = (sequelize, DataTypes) => {
  const news = sequelize.define(
    "news",
    {
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
      createdBy: DataTypes.INTEGER
    },
    {}
  );
  news.associate = function(models) {
    news.hasMany(models.file, {
      foreignKey: "newsId"
    });

    news.belongsToMany(models.user, {
      through: "shares",
      foreignKey: "newsId"
    });

    news.belongsToMany(models.portal, {
      through: "shares",
      foreignKey: "newsId"
    });
  };
  return news;
};
