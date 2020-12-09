const express = require("express");
const { signUpUser, loginUser } = require("../controllers/userController");

const userRoute = express.Router();

userRoute.route("/signup").post(signUpUser);
userRoute.route("/login").post(loginUser);

module.exports = userRoute;
