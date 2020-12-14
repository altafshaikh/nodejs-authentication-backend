const fs = require("fs");
const path = require("path");

const AppError = require("../helper/appErrorClass");
const sendErrorMessage = require("../helper/sendError");
const { verifyToken } = require("../helper/verifyJwtToken");

let fileName = path.join(__dirname, "../data", "users.json");
let users = JSON.parse(fs.readFileSync(fileName, "utf-8"));

const isEmailUnique = (req, res, next) => {
  const user = users.find((user) => {
    return user.email == req.body.email;
  });

  if (user) {
    return sendErrorMessage(
      new AppError(400, "unsuccessful", "User already registered"),
      req,
      res
    );
  }
  next();
};

const isUsernameUnique = (req, res, next) => {
  const user = users.find((user) => {
    return user.username == req.body.username;
  });

  if (user) {
    return sendErrorMessage(
      new AppError(400, "unsuccessful", "username already talken"),
      req,
      res
    );
  }
  next();
};

const isUserRegistered = (req, res, next) => {
  const { email } = req.body;
  const user = users.find((user) => {
    return user.email == email;
  });

  if (!user) {
    return sendErrorMessage(
      new AppError(400, "unsuccessful", "User not found with this email"),
      req,
      res
    );
  }
  req.currentUser = user;
  next();
};

const authUser = async (req, res, next) => {
  let authHeader;
  if (req.headers.authorization) {
    authHeader = req.headers.authorization;
  } else if (req.body.authorization) {
    authHeader = req.body.authorization;
  } else {
    return sendErrorMessage(
      new AppError(401, "Unsuccessful", "Please login or signup"),
      req,
      res
    );
  }
  // if headers are there
  let jwtToken = authHeader.split(" ")[1];
  let payload;
  try {
    payload = await verifyToken(jwtToken, process.env.JWT_SECRET);
  } catch (err) {
    return sendErrorMessage(
      new AppError(401, "Unsuccesssul", "Invalid Token"),
      req,
      res
    );
  }

  //added alias to email
  let { email: currentUser, firstName } = users.find((user) => {
    return user.email == payload.email;
  });

  if (!currentUser) {
    return sendErrorMessage(
      new AppError(401, "Unsuccesssul", "User not registered"),
      req,
      res
    );
  }
  req.currentUser = { email: currentUser, firstName: firstName };
  // give access
  next();
};

module.exports.isEmailUnique = isEmailUnique;
module.exports.isUsernameUnique = isUsernameUnique;
module.exports.isUserRegistered = isUserRegistered;
module.exports.authUser = authUser;
