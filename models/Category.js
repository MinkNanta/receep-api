module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "Category",
    {
      icon: {
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
      },
    },
    {
      underscored: true,
    }
  );

  Category.associate = (models) => {
    Category.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  };

  return Category;
};
