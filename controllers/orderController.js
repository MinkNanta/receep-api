const createError = require("../utils/createError");
const { Menu, Category, Order, OrderItem } = require("../models");

exports.getAllOrder = async (req, res, next) => {
  try {
    const allOrder = await Order.findAll({
      order: [["updatedAt", "DESC"]],
      include: {
        model: OrderItem,
      },
    });

    if (!allOrder) {
      createError("no have menu", 400);
    }
    res.status(200).json(allOrder);
  } catch (error) {
    next(error);
  }
};
exports.getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);
    const orderById = await Order.findOne({
      where: { id },
      include: {
        model: OrderItem,
      },
    });

    if (!orderById) {
      createError("no have orderById ", 400);
    }
    res.status(200).json(orderById);
  } catch (error) {
    next(error);
  }
};
exports.createOrder = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { detail, total, status, orderItem } = req.body;

    console.log(req.body);
    console.log(orderItem);

    const order = await Order.create({
      detail,
      total,
      status: status ? status : "upcoming",
      userId,
    });

    const newOrderItem = [];
    for (let el of orderItem) {
      newOrderItem.push({ ...el, orderId: order.id });
    }
    const orderItem_ = await OrderItem.bulkCreate(newOrderItem);

    res.status(200).json({ order, orderItem_ });
  } catch (error) {
    next(error);
  }
};
exports.updateStatus = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { status } = req.body;

    const order = await Order.update({ status: "done" }, { where: { id } });

    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};
exports.createCategory = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { icon, name } = req.body;

    const category = await Category.create({
      icon,
      name,
      userId,
    });

    res.status(200).json({ category });
  } catch (error) {
    next(error);
  }
};
exports.getCategory = async (req, res, next) => {
  try {
    const allCategory = await Category.findAll();

    if (!allCategory) {
      createError("no allCategory", 400);
    }
    res.status(200).json(allCategory);
  } catch (error) {
    next(error);
  }
};
