const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menuController");

router.get("/", menuController.getAllMenu);
router.post("/create", menuController.createMenu);
router.patch("/updateMenu/:id", menuController.updateMenu);
router.post("/createCategory", menuController.createCategory);
router.get("/getCategory", menuController.getCategory);
router.delete("/deleteCategory/:cateId", menuController.deleteCategory);
router.get("/getMenuById/:id", menuController.getMenuById);
router.delete("/:id", menuController.deleteMenu);

module.exports = router;
