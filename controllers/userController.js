const User = require("../models/user");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");
const { generateToken } = require("../helper/createJwtToken");
const dontenv = require("dotenv");
dontenv.config({ path: ".env" });

const privateKey = process.env.JWT_SECRET;

const AppError = require("../helper/appErrorClass");
const sendErrorMessage = require("../helper/sendError");
const sendResponse = require("../helper/sendResponse");

let fileName = path.join(__dirname, "../data", "users.json");
let users = JSON.parse(fs.readFileSync(fileName, "utf-8"));

const signUpUser = (req, res, next) => {
  const { email, passHash } = req.body;

  const user = new User(email, passHash);
  users.push(user);
  fs.writeFile(fileName, JSON.stringify(users, null, 2), (err) => {
    if (err) {
      return sendErrorMessage(
        new AppError(500, "Internal Error", "Unable to complete the Request"),
        req,
        res
      );
    }
    sendResponse(201, "Signup successful", user, req, res);
  });
};

const loginUser = async (req, res, next) => {
  try {
    const result = await bcrypt.compare(
      req.body.password,
      req.currentUser.password
    );

    if (!result) {
      res.status(201).json({ message: "You Entered wrong Password" });

      return sendErrorMessage(
        new AppError(401, "unsuccessful", "You Entered wrong Password"),
        req,
        res
      );
    }

    try {
      let jwtToken = await generateToken(
        { email: req.currentUser.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.cookie("jwt", jwtToken);
      sendResponse(200, "Successful", { jwt: jwtToken }, req, res);
    } catch (err) {
      return sendErrorMessage(
        new AppError(500, "Internal Error", "Unable to complete the Request"),
        req,
        res
      );
    }
  } catch (error) {
    return sendErrorMessage(
      new AppError(500, "Internal Error", "Unable to complete the Request"),
      req,
      res
    );
  }
};

// export controllers
module.exports.signUpUser = signUpUser;
module.exports.loginUser = loginUser;
