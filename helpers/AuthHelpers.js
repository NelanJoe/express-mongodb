const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { errorAuth } = require("./ApiFormatter");
const { check, body } = require("express-validator");

require("dotenv").config();

exports.createJWT = (user) => {
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET
  );

  return token;
};

exports.hashPasswords = (password) => {
  return bcrypt.hash(password, 5);
};

exports.comparePasswords = (password, hash) => {
  return bcrypt.compare(password, hash);
};

exports.protect = (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401).json(errorAuth(401, "Not authorized"));
    return;
  }

  const [, token] = bearer.split(" ");
  if (!token) {
    res.status(401).json(errorAuth(401, "Not authorized"));
    return;
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    console.log(payload);
    next();
    return;
  } catch (e) {
    console.error(e);
    res.status(401).json(errorAuth(401, "Not authorized"));
    return;
  }
};

/**
 * Helpers Validation
 * */

exports.validateSignup = [
  body("username").notEmpty().isString().withMessage("Username must be string"),
  body("email").isEmail().withMessage("Email must be valid"),
  body("password")
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage("Password min 6 character"),
];

exports.validateLogin = [
  body("email").isEmail().withMessage("Email must be valid"),
  body("password").notEmpty().withMessage("Password must be filled"),
];
