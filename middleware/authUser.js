const fs = require("fs");
const path = require("path");

const { verifyToken } = require("../helper/verifyJwtToken");
const sendErrorMessage = require("../helper/sendError");
const AppError = require("../helper/appErrorClass");

const fileName = path.join(__dirname, "..", "data", "users.json");
const users = JSON.parse(fs.readFileSync(fileName, "utf-8"));

const authUser = async (req, res, next) => {
  if (!req.body.authorization) {
    return sendErrorMessage(
      new AppError(401, "Unsuccessful", "Please login or signup"),
      req,
      res
    );
  }
  // if headers are there
  let jwtToken = req.body.authorization.split(" ")[1];
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
  let { email: currentUser } = users.find((user) => {
    return user.email == payload.email;
  });

  if (!currentUser) {
    return sendErrorMessage(
      new AppError(401, "Unsuccesssul", "User not registered"),
      req,
      res
    );
  }
  // check verification
  req.currentUser = currentUser;
  // give access
  next();
};
module.exports = authUser;
