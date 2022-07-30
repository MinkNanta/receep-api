module.exports = (sequelize, DataTypes) => {
  const Menu = sequelize.define(
    "Menu",
    {
      title: {
        type: DataTypes.STRING,
      },
      category: {
        type: DataTypes.STRING,
      },
      icon: {
        type: DataTypes.STRING,
      },
    },
    {
      underscored: true,
    }
  );

  Menu.associate = (models) => {
    Menu.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });
  };

  return Menu;
};
