const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.get("/", orderController.getAllOrder);
router.get("/:id", orderController.getOrderById);
router.post("/create", orderController.createOrder);
router.patch("/update/:id", orderController.updateStatus);
// router.post("/createCategory", orderController.createCategory);
// router.get("/getCategory", orderController.getCategory);

module.exports = router;
