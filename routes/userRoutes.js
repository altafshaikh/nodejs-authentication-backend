const express = require("express");
const storageAdapter = require("../adapter/storageAdapter");

const userRoute = express.Router();

userRoute
  .route("/signup")
  .post(
    storageAdapter.middlewares.checkRequestBody,
    storageAdapter.middlewares.checkConfirmPassword,
    storageAdapter.middlewares.validatePassword,
    storageAdapter.middlewares.isEmailValid,
    storageAdapter.middlewares.isEmailUnique,
    storageAdapter.middlewares.isUsernameUnique,
    storageAdapter.middlewares.generatePassHash,
    storageAdapter.signUpUser
  );
userRoute
  .route("/login")
  .post(
    storageAdapter.middlewares.checkRequestBody,
    storageAdapter.middlewares.isUserRegistered,
    storageAdapter.loginUser
  );

userRoute
  .route("/login/username")
  .post(
    storageAdapter.middlewares.checkRequestBody,
    storageAdapter.middlewares.isUserRegistered,
    storageAdapter.loginUser
  );

module.exports = userRoute;
