const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./routes/api");

const {
  validateLogin,
  validateSignup,
  protect,
} = require("./middlewares/AuthMiddleware");

const AuthController = require("./controllers/AuthController");
const { connectToMongoDB } = require("./config/db");

const app = express();
const PORT = process.env.PORT || 8000;

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

// Connect MongoDB Atlas
connectToMongoDB();

// application listening
app.listen(PORT, () => {
  console.log(`Server listen on http://localhost:${PORT}`);
});
