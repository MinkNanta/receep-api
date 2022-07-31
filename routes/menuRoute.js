const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menuController");

router.get("/", menuController.getAllMenu);
router.post("/create", menuController.createMenu);
router.post("/createCategory", menuController.createCategory);
router.get("/getCategory", menuController.getCategory);

module.exports = router;
