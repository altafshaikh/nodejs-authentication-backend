const express = require("express");
const { signUpUser, loginUser } = require("../controllers/userController");

const {
  isEmailValid,
  generatePassHash,
} = require("../middleware/userMiddleware");

const userRoute = express.Router();

userRoute.route("/signup").post(generatePassHash, isEmailValid, signUpUser);
userRoute.route("/login").post(loginUser);

module.exports = userRoute;
