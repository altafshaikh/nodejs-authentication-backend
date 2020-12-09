const express = require("express");
const {
  signUpUser,
  loginUser,
  generatePassHash,
} = require("../controllers/userController");

const userRoute = express.Router();

userRoute.route("/signup").post(generatePassHash, signUpUser);
userRoute.route("/login").post(loginUser);

module.exports = userRoute;
