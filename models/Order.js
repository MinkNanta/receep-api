module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      detail: {
        type: DataTypes.STRING,
      },
      total: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.ENUM("upcoming", "done"),
        defaultValue: "upcoming",
      },
    },
    {
      underscored: true,
    }
  );

  Order.associate = (models) => {
    Order.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
    Order.hasMany(models.OrderItem, {
      foreignKey: {
        name: "orderId",
        allowNull: false,
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  };

  return Order;
};
