const { body } = require("express-validator");

exports.validateStudent = [
  body("nama").notEmpty().withMessage("Nama tidak boleh kosong"),
  body("nim").notEmpty().withMessage("NIM tidak boleh kosong"),
  body("email").notEmpty().isEmail().withMessage("Email harus sesuai"),
  body("jurusan").notEmpty().withMessage("Jurusan tidak boleh kosong"),
];
