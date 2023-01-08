const { User } = require("../models/User");

const {
  hashPasswords,
  comparePasswords,
  createJWT,
} = require("../helpers/AuthHelpers");

const {
  successSignIn,
  successSignUp,
  errorAuth,
} = require("../helpers/ApiFormatter");

const { validationResult } = require("express-validator");

class AuthController {
  async signup(req, res) {
    const { username, email, password } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }

    const hash = await hashPasswords(password);

    const user = await User.create({
      username,
      email,
      password: hash,
    });

    res
      .status(201)
      .json(successSignUp(201, "Succesfully created new user", user));
  }

  async login(req, res) {
    const { email, password } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }

    const user = await User.findOne({ email: email });

    const isValid = await comparePasswords(password, user.password);

    if (!isValid) {
      res.status(400).json(errorAuth(400, "Invalid email or password"));
      return;
    }

    const token = createJWT(user);

    res.status(200).json(successSignIn(200, "Succesfully login", token));
  }
}

module.exports = new AuthController();
