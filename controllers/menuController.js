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
exports.getMenuById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const menuById = await Menu.findOne({ where: { id } });

    if (!menuById) {
      createError("no have menu", 400);
    }
    res.status(200).json(menuById);
  } catch (error) {
    next(error);
  }
};
exports.deleteMenu = async (req, res, next) => {
  try {
    const { id } = req.params;
    const menu_ = await Menu.findOne({ where: { id } });

    if (!menu_) {
      createError("no have menu", 400);
    }
    if (menu_.userId !== req.user.id) {
      createError("you have no permission", 403);
    }
    await Menu.destroy({ where: { id } });

    res.status(204).json();
  } catch (error) {
    next(error);
  }
};
exports.deleteCategory = async (req, res, next) => {
  try {
    const { cateId } = req.params;

    console.log(cateId);
    const category_ = await Category.findOne({ where: { id: cateId } });

    if (!category_) {
      createError("have no this category", 400);
    }
    if (category_.userId !== req.user.id) {
      createError("you have no permission", 403);
    }
    await Category.destroy({ where: { id: cateId } });

    res.status(204).json();
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
exports.updateMenu = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { category, title, description, price } = req.body;

    const menu = await Menu.update(
      {
        category,
        title,
        description,
        price,
        userId,
      },
      { where: { id } }
    );

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
