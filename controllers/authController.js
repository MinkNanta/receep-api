const validator = require("validator");
const createError = require("../utils/createError");
const bcrypt = require("bcryptjs");
const { User } = require("../models");
const jwt = require("jsonwebtoken");

const genToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: "30d",
  });

exports.getUser = async (req, res, next) => {
  try {
    const user = JSON.parse(JSON.stringify(req.user));
    res.json({ user });
  } catch (error) {
    next(error);
  }
};

exports.signup = async (req, res, next) => {
  try {
    const { email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      createError("Password & ConfirmPassword did not match ", 400);
    }

    if (!validator.isEmail(email + "")) {
      createError("Email is required", 400);
    }

    if (validator.isEmpty(password)) {
      createError("Password is required", 400);
    }

    if (!validator.isStrongPassword(password)) {
      createError("Password must be Strong Password", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      email: email,
      password: hashedPassword,
    });
    const token = genToken({ id: user.id });
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

exports.signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: { email: email },
    });

    if (!user) {
      createError("invalid credential", 400);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      createError("invalid credential", 400);
    }

    const token = genToken({ id: user.id });
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};