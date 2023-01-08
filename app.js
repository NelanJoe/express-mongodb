const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const router = require("./routes/api");
const {
  protect,
  validateSignup,
  validateLogin,
} = require("./helpers/AuthHelpers");
const AuthController = require("./controllers/AuthController");

const app = express();
const PORT = process.env.PORT || 8000;

const { MONGO_URI } = process.env;

//Adding middleware
app.use(cors());

// parse express to application/json
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Hello, Express ✌️",
  });
});

/**
 * Auth Routes
 * */
app.post("/signup", validateSignup, AuthController.signup);
app.post("/login", validateLogin, AuthController.login);

// add router
app.use("/api", protect, router);

mongoose.set("strictQuery", true);
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, () => {
  console.log(`Server listen on http://localhost:${PORT}`);
});
