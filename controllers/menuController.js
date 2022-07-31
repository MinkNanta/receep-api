const createError = require("../utils/createError");
const { Menu, Category } = require("../models");

exports.getAllMenu = async (req, res, next) => {
  try {
    const allMenu = await Menu.findAll();

    if (!allMenu) {
      createError("no have menu", 400);
    }
    res.status(200).json(allMenu);
  } catch (error) {
    next(error);
  }
};
exports.createMenu = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { category, title, description, price } = req.body;

    const menu = await Menu.create({
      category,
      title,
      description,
      price,
      userId,
    });

    res.status(200).json({ menu });
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
