const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authenticate = require("../middlewares/authenticate");

router.get("/", authenticate, authController.getUser);
router.post("/signin", authController.signin);
router.post("/signup", authController.signup);

module.exports = router;
