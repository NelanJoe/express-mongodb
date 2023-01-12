const { body } = require("express-validator");

exports.validateLecturer = [
  body("nama").notEmpty().withMessage("Nama tidak boleh kosong"),
  body("nidn").notEmpty().withMessage("NIDN tidak boleh kosong"),
  body("email").notEmpty().isEmail().withMessage("Email harus sesuai"),
];
