const express = require("express");

const userRoute = express.Router();

userRoute.route("/signup").post();
userRoute.route("/login").post();

module.exports = userRoute;
