const bcrypt = require("bcryptjs");

const AppError = require("../helper/appErrorClass");
const sendErrorMessage = require("../helper/sendError");
const { verifyToken } = require("../helper/verifyJwtToken");

//model
const Users = require("../models/users");

const checkRequestBody = (req, res, next) => {
  let validationArray;
  switch (req.url) {
    case "/signup":
      validationArray = [
        "email",
        "password",
        "confirmPassword",
        "firstName",
        "lastName",
        "username",
      ];
      break;
    case "/login":
      validationArray = ["email", "password"];
      break;
    default:
      return sendErrorMessage(
        new AppError(404, "unsuccessful", "Invalid url requested"),
        req,
        res
      );
  }
  let result = validationArray.every((key) => {
    return req.body[key] && req.body[key].trim().length;
  });

  if (!result) {
    return sendErrorMessage(
      new AppError(400, "unsuccessful", "invalid body"),
      req,
      res
    );
  }
  next();
};
