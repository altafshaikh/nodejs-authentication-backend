const User = require("../models/user");
const util = require("util");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");

let fileName = path.join(__dirname, "../data", "users.json");
let users = JSON.parse(fs.readFileSync(fileName, "utf-8"));

const checkRequestBody = (req, res, next) => {
  let validationArray = ["email", "password", "confirmPassword"];
  let result = validationArray.every((key) => {
    return req.body[key] && req.body[key].trim().length;
  });

  if (!result) {
    res.status(400).json({ message: "Invalid Request" });
    return err;
  }
  next();
};

const checkConfirmPassword = (req, res, next) => {
  if (req.body.password !== req.body.confirmPassword) {
    res
      .status(400)
      .json({ message: "Password and Confirm password not match" });
    return err;
  }
  next();
};

const isEmailValid = (req, res, next) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const isValid = re.test(req.body.email.toLowerCase());

  if (!isValid) {
    res.status(400).json({ message: "Email is not valid" });
    return err;
  }
  next();
};

const isEmailUnique = (req, res, next) => {
  const user = users.find((user) => {
    return user.email == req.body.email;
  });

  if (user) {
    res.status(400).json({ message: "User already registered" });
    return err;
  }
  next();
};

module.exports.checkRequestBody = checkRequestBody;
module.exports.checkConfirmPassword = checkConfirmPassword;
module.exports.isEmailUnique = isEmailUnique;
module.exports.isEmailValid = isEmailValid;
