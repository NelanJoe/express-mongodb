const { User } = require("../models/User");
const { check } = require("express-validator");
const { errorAuth } = require("../helpers/ApiFormatter");
const jwt = require("jsonwebtoken");

exports.validateSignup = [
  check("username", "Nama tidak boleh kosong").notEmpty(),
  check("email", "Email tidak boleh kosong")
    .notEmpty()
    .custom((value) => {
      return User.findOne({
        email: value,
      }).then((user) => {
        if (user) {
          return Promise.reject("E-mail sudah digunakan");
        }
      });
    }),
  check("password", "Password tidak boleh kosong").notEmpty().isLength({
    min: 6,
  }),
];

exports.validateLogin = [
  check("email", "Email tidak boleh kosong").notEmpty(),
  check("password", "Password tidak boleh kosong").notEmpty(),
];

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
