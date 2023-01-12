const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
