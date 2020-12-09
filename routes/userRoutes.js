const express = require("express");
const { signUpUser, loginUser } = require("../controllers/userController");

const {
  checkRequestBody,
  checkConfirmPassword,
  isEmailValid,
  isEmailUnique,
  generatePassHash,
  isUserRegistered,
} = require("../middleware/userMiddleware");

const userRoute = express.Router();

userRoute
  .route("/signup")
  .post(
    checkRequestBody,
    checkConfirmPassword,
    isEmailValid,
    isEmailUnique,
    generatePassHash,
    signUpUser
  );
userRoute.route("/login").post(checkRequestBody, isUserRegistered, loginUser);

module.exports = userRoute;
