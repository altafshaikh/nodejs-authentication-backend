const bcrypt = require("bcryptjs");
const AppError = require("../helper/appErrorClass");
const sendErrorMessage = require("../helper/sendError");

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
    case "/login/username":
      validationArray = ["username", "password"];
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

const checkConfirmPassword = (req, res, next) => {
  if (req.body.password !== req.body.confirmPassword) {
    return sendErrorMessage(
      new AppError(
        400,
        "unsuccessful",
        "Password and Confirm password not match"
      ),
      req,
      res
    );
  }
  next();
};

const validatePassword = (req, res, next) => {
  const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
  const isValid = req.body.password.match(re);
  if (!isValid) {
    return sendErrorMessage(
      new AppError(400, "unsuccessful", "Password Validation Fail"),
      req,
      res
    );
  }
  next();
};

const isEmailValid = (req, res, next) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const isValid = re.test(req.body.email.toLowerCase());

  if (!isValid) {
    return sendErrorMessage(
      new AppError(400, "unsuccessful", "Email is not valid"),
      req,
      res
    );
  }
  next();
};

const generatePassHash = async (req, res, next) => {
  const password = req.body.password;
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  req.body.passHash = hash;
  next();
};

// export middlewares
module.exports.checkRequestBody = checkRequestBody;
module.exports.checkConfirmPassword = checkConfirmPassword;
module.exports.validatePassword = validatePassword;
module.exports.isEmailValid = isEmailValid;
module.exports.generatePassHash = generatePassHash;
